---
layout: default
title: Machine Learning in Bioinformatics
description: Core machine learning concepts and applications in omics research.
permalink: /machine-learning/
---

# Machine Learning in Bioinformatics

![Machine Learning in Bioinformatics banner]({{ '/assets/banners/machine-learning.svg' | relative_url }})

Machine learning helps detect patterns in high-dimensional biological data and build predictive models for diagnosis, prognosis, and discovery.

## Learning Goals

<section class="learning-goals-card" markdown="1">
By the end of this chapter, you should be able to:

1. Explain key ML concepts with bioinformatics examples.
2. Distinguish supervised and unsupervised learning.
3. Choose suitable evaluation metrics.
4. Identify overfitting, data leakage, and class imbalance issues.
</section>

## When to Use Machine Learning

Use ML when:

- You have many features (for example, thousands of genes).
- Relationships are complex or non-linear.
- Prediction is an explicit goal.

Do not use ML if a simple statistical model answers the question more clearly.

## End-to-End ML Workflow

<p align="center">
  <img src="{{ '/assets/images/ml-workflow.svg' | relative_url }}" alt="Machine Learning Workflow" style="max-width: 100%; height: auto;">
</p>

1. Define prediction target (for example, disease vs. control).
2. Split data into train/validation/test sets.
3. Preprocess features (missing values, scaling, encoding).
4. Train baseline and advanced models.
5. Evaluate with appropriate metrics.
6. Interpret model outputs biologically.
7. Validate on external data when possible.

## Supervised Learning

Used when labels are known.

Tasks:

- Classification: tumor subtype, responder/non-responder
- Regression: continuous outcomes (for example, survival risk score)

Common algorithms:

- Logistic Regression
- Random Forest
- Support Vector Machine
- Gradient Boosting
- Neural Networks

### Complete Classification Pipeline

```python
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, StratifiedKFold, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.svm import SVC
from sklearn.metrics import classification_report, roc_auc_score, roc_curve
import matplotlib.pyplot as plt

# Load data
X = pd.read_csv("expression_matrix.csv", index_col=0)  # genes x samples
y = pd.read_csv("labels.csv")["condition"].values  # 0/1 labels

# CORRECT: Split BEFORE any preprocessing
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Build pipeline (scaling inside CV loop prevents leakage)
pipelines = {
    "Logistic Regression": Pipeline([
        ("scaler", StandardScaler()),
        ("clf", LogisticRegression(penalty="l1", solver="saga", max_iter=1000))
    ]),
    "Random Forest": Pipeline([
        ("clf", RandomForestClassifier(n_estimators=200, random_state=42))
    ]),
    "SVM": Pipeline([
        ("scaler", StandardScaler()),
        ("clf", SVC(kernel="rbf", probability=True))
    ]),
    "Gradient Boosting": Pipeline([
        ("clf", GradientBoostingClassifier(n_estimators=100, random_state=42))
    ])
}

# Cross-validation comparison
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

results = {}
for name, pipeline in pipelines.items():
    scores = cross_val_score(pipeline, X_train, y_train, cv=cv, scoring="roc_auc")
    results[name] = scores
    print(f"{name}: AUC = {scores.mean():.3f} ± {scores.std():.3f}")

# Train best model on full training set
best_model = pipelines["Random Forest"]
best_model.fit(X_train, y_train)

# Evaluate on held-out test set
y_pred = best_model.predict(X_test)
y_proba = best_model.predict_proba(X_test)[:, 1]

print("\nTest Set Performance:")
print(classification_report(y_test, y_pred))
print(f"ROC-AUC: {roc_auc_score(y_test, y_proba):.3f}")

# Plot ROC curve
fpr, tpr, _ = roc_curve(y_test, y_proba)
plt.figure(figsize=(6, 6))
plt.plot(fpr, tpr, label=f"AUC = {roc_auc_score(y_test, y_proba):.3f}")
plt.plot([0, 1], [0, 1], "k--")
plt.xlabel("False Positive Rate")
plt.ylabel("True Positive Rate")
plt.title("ROC Curve - Disease Classification")
plt.legend()
plt.savefig("roc_curve.png", dpi=150)
```

### Regression Example: Predicting Drug Response

```python
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
from scipy.stats import spearmanr

# IC50 prediction from gene expression
X_train, X_test, y_train, y_test = train_test_split(
    expression, ic50_values, test_size=0.2, random_state=42
)

model = RandomForestRegressor(n_estimators=200, random_state=42)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)

print(f"RMSE: {np.sqrt(mean_squared_error(y_test, y_pred)):.3f}")
print(f"R²: {r2_score(y_test, y_pred):.3f}")
print(f"Spearman ρ: {spearmanr(y_test, y_pred)[0]:.3f}")
```

## Unsupervised Learning

Used when labels are unknown.

Common uses in bioinformatics:

- Discovering cell populations in single-cell data
- Patient stratification by molecular profile
- Detecting hidden batch effects

Common methods:

- Clustering (k-means, hierarchical, Leiden)
- Dimensionality reduction (PCA, UMAP, t-SNE)

## Feature Engineering and Selection

Biological datasets often contain noise and redundant variables.

Practical steps:

- Remove near-zero variance genes
- Select highly variable genes
- Use regularization (L1/L2)
- Consider pathway-level features for interpretability

### Feature Selection Pipeline

```python
from sklearn.feature_selection import (
    VarianceThreshold, SelectKBest, f_classif, RFE
)
from sklearn.preprocessing import StandardScaler
import numpy as np

# Step 1: Remove near-zero variance genes
var_threshold = VarianceThreshold(threshold=0.01)
X_var = var_threshold.fit_transform(X_train)
selected_genes = X_train.columns[var_threshold.get_support()]
print(f"After variance filter: {len(selected_genes)} genes")

# Step 2: Univariate feature selection (ANOVA F-test)
selector = SelectKBest(f_classif, k=1000)
X_selected = selector.fit_transform(X_var, y_train)
top_genes = selected_genes[selector.get_support()]

# Step 3: Recursive Feature Elimination with CV
from sklearn.feature_selection import RFECV
from sklearn.ensemble import RandomForestClassifier

rfe = RFECV(
    estimator=RandomForestClassifier(n_estimators=100, random_state=42),
    step=0.1,  # Remove 10% of features each iteration
    cv=5,
    scoring="roc_auc",
    min_features_to_select=10
)
rfe.fit(X_train[top_genes], y_train)

final_genes = top_genes[rfe.support_]
print(f"RFE selected {len(final_genes)} genes")

# Plot feature importance
importances = rfe.estimator_.feature_importances_
indices = np.argsort(importances)[-20:]  # Top 20

plt.figure(figsize=(10, 8))
plt.barh(range(20), importances[indices])
plt.yticks(range(20), final_genes[indices])
plt.xlabel("Feature Importance")
plt.title("Top 20 Predictive Genes")
plt.tight_layout()
plt.savefig("feature_importance.png", dpi=150)
```

### L1 Regularization for Sparse Selection

```python
from sklearn.linear_model import LogisticRegressionCV

# L1 penalty automatically selects features
logreg_l1 = LogisticRegressionCV(
    penalty="l1",
    solver="saga",
    cv=5,
    Cs=np.logspace(-4, 4, 20),
    max_iter=1000,
    random_state=42
)
logreg_l1.fit(X_train_scaled, y_train)

# Non-zero coefficients = selected features
selected_mask = logreg_l1.coef_[0] != 0
l1_genes = X_train.columns[selected_mask]
print(f"L1 selected {len(l1_genes)} genes")
```

### Dealing with Highly Correlated Features

```python
# Remove highly correlated genes (keep one representative)
def remove_correlated(X, threshold=0.95):
    corr_matrix = X.corr().abs()
    upper = corr_matrix.where(
        np.triu(np.ones(corr_matrix.shape), k=1).astype(bool)
    )
    to_drop = [col for col in upper.columns if any(upper[col] > threshold)]
    return X.drop(columns=to_drop)

X_uncorrelated = remove_correlated(X_train, threshold=0.95)
print(f"After correlation filter: {X_uncorrelated.shape[1]} genes")
```

## Evaluation Metrics That Matter

For classification:

- Accuracy
- Precision, recall, F1-score
- ROC-AUC
- PR-AUC (important for class imbalance)

For regression:

- MAE
- RMSE
- R-squared

## Critical Pitfalls

### Overfitting

Model performs well on training data but poorly on unseen data.

### Data Leakage

Information from test data accidentally influences training.

Examples:

- Normalizing the full dataset before train-test split
- Selecting features using all samples before cross-validation

### Class Imbalance

If one class dominates, accuracy can be misleading.

Use:

- Stratified split
- Class weights
- Balanced metrics (F1, PR-AUC)

### Handling Class Imbalance

```python
from sklearn.utils.class_weight import compute_class_weight
from imblearn.over_sampling import SMOTE
from imblearn.pipeline import Pipeline as ImbPipeline
from sklearn.metrics import precision_recall_curve, average_precision_score

# Check class distribution
print(f"Class distribution: {np.bincount(y_train)}")
# Example: [950, 50] - highly imbalanced!

# Method 1: Class weights
class_weights = compute_class_weight("balanced", classes=np.unique(y_train), y=y_train)
weight_dict = dict(zip(np.unique(y_train), class_weights))

model = RandomForestClassifier(
    n_estimators=200,
    class_weight=weight_dict,  # or "balanced"
    random_state=42
)

# Method 2: SMOTE oversampling
pipeline = ImbPipeline([
    ("scaler", StandardScaler()),
    ("smote", SMOTE(random_state=42)),
    ("clf", LogisticRegression(max_iter=1000))
])
pipeline.fit(X_train, y_train)

# Method 3: Threshold tuning
y_proba = model.predict_proba(X_test)[:, 1]
precision, recall, thresholds = precision_recall_curve(y_test, y_proba)

# Find threshold that maximizes F1
f1_scores = 2 * (precision * recall) / (precision + recall + 1e-10)
best_threshold = thresholds[np.argmax(f1_scores[:-1])]
print(f"Optimal threshold: {best_threshold:.3f}")

y_pred_tuned = (y_proba >= best_threshold).astype(int)

# Always plot PR curve for imbalanced data
plt.figure(figsize=(6, 6))
plt.plot(recall, precision)
plt.xlabel("Recall")
plt.ylabel("Precision")
plt.title(f"PR Curve (AP = {average_precision_score(y_test, y_proba):.3f})")
plt.savefig("pr_curve.png", dpi=150)
```

## Model Interpretation in Biology

Interpretability is important for translational use.

Useful tools:

- Feature importance (tree-based models)
- SHAP values
- Coefficient inspection in linear models

Biological sanity check:

- Do top features map to known pathways?
- Are findings stable across cohorts?

### SHAP Values for Explainable ML

```python
import shap

# Train model
model = RandomForestClassifier(n_estimators=200, random_state=42)
model.fit(X_train, y_train)

# Create SHAP explainer
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)

# Summary plot: global feature importance
shap.summary_plot(shap_values[1], X_test, plot_type="bar", max_display=20)
plt.savefig("shap_importance.png", dpi=150, bbox_inches="tight")

# Beeswarm plot: feature impact direction
shap.summary_plot(shap_values[1], X_test, max_display=20)
plt.savefig("shap_beeswarm.png", dpi=150, bbox_inches="tight")

# Individual prediction explanation
sample_idx = 0
shap.force_plot(
    explainer.expected_value[1],
    shap_values[1][sample_idx],
    X_test.iloc[sample_idx],
    matplotlib=True
)
plt.savefig("shap_individual.png", dpi=150, bbox_inches="tight")

# Dependence plot: one gene's effect
shap.dependence_plot("TP53", shap_values[1], X_test)
```

### Pathway-Level Feature Aggregation

```python
import gseapy as gp

# Get gene importance
importances = pd.Series(model.feature_importances_, index=X_train.columns)
ranked_genes = importances.sort_values(ascending=False)

# Run enrichment on top genes
top_genes = ranked_genes.head(100).index.tolist()

enrichment = gp.enrichr(
    gene_list=top_genes,
    gene_sets=["KEGG_2021_Human", "GO_Biological_Process_2021"],
    organism="human"
)

# View results
enrichment.results.head(20)
```

## Minimal Python Example

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, roc_auc_score

# X: features (for example gene expression); y: labels
X = pd.read_csv("X_expression.csv")
y = pd.read_csv("y_labels.csv").values.ravel()

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

model = RandomForestClassifier(n_estimators=300, random_state=42)
model.fit(X_train, y_train)

pred = model.predict(X_test)
proba = model.predict_proba(X_test)[:, 1]

print(classification_report(y_test, pred))
print("ROC-AUC:", roc_auc_score(y_test, proba))
```

## Deep Learning in Bioinformatics

Deep learning is useful when data is large and structure-rich.

Examples:

- CNNs for sequence motif learning
- Transformers for protein language modeling
- Graph neural networks for molecular interaction modeling

It often requires more data, compute resources, and careful regularization.

### Neural Network for Gene Expression Classification

```python
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset
from sklearn.preprocessing import StandardScaler

# Prepare data
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

X_train_tensor = torch.FloatTensor(X_train_scaled)
y_train_tensor = torch.LongTensor(y_train)
X_test_tensor = torch.FloatTensor(X_test_scaled)
y_test_tensor = torch.LongTensor(y_test)

train_dataset = TensorDataset(X_train_tensor, y_train_tensor)
train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)

# Define network
class GeneExpressionNet(nn.Module):
    def __init__(self, n_genes, n_classes=2):
        super().__init__()
        self.model = nn.Sequential(
            nn.Linear(n_genes, 512),
            nn.BatchNorm1d(512),
            nn.ReLU(),
            nn.Dropout(0.3),
            
            nn.Linear(512, 128),
            nn.BatchNorm1d(128),
            nn.ReLU(),
            nn.Dropout(0.3),
            
            nn.Linear(128, 32),
            nn.ReLU(),
            
            nn.Linear(32, n_classes)
        )
    
    def forward(self, x):
        return self.model(x)

# Training
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = GeneExpressionNet(n_genes=X_train.shape[1]).to(device)
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3, weight_decay=1e-4)

for epoch in range(50):
    model.train()
    total_loss = 0
    for X_batch, y_batch in train_loader:
        X_batch, y_batch = X_batch.to(device), y_batch.to(device)
        
        optimizer.zero_grad()
        outputs = model(X_batch)
        loss = criterion(outputs, y_batch)
        loss.backward()
        optimizer.step()
        total_loss += loss.item()
    
    if (epoch + 1) % 10 == 0:
        print(f"Epoch {epoch+1}, Loss: {total_loss/len(train_loader):.4f}")

# Evaluation
model.eval()
with torch.no_grad():
    outputs = model(X_test_tensor.to(device))
    _, predicted = torch.max(outputs, 1)
    accuracy = (predicted.cpu() == y_test_tensor).float().mean()
    print(f"Test Accuracy: {accuracy:.3f}")
```

### CNN for DNA Sequence Classification

```python
import torch
import torch.nn as nn

# One-hot encode DNA sequences
def one_hot_encode(seq):
    mapping = {"A": 0, "C": 1, "G": 2, "T": 3}
    encoded = torch.zeros(4, len(seq))
    for i, base in enumerate(seq):
        if base in mapping:
            encoded[mapping[base], i] = 1
    return encoded

# Example: classify promoter sequences
class SequenceCNN(nn.Module):
    def __init__(self, seq_length=1000, n_classes=2):
        super().__init__()
        self.conv1 = nn.Conv1d(4, 64, kernel_size=15, padding=7)
        self.conv2 = nn.Conv1d(64, 128, kernel_size=15, padding=7)
        self.pool = nn.MaxPool1d(4)
        self.dropout = nn.Dropout(0.25)
        
        # Calculate flattened size
        conv_out_size = seq_length // 16  # After 2 pooling layers
        self.fc1 = nn.Linear(128 * conv_out_size, 256)
        self.fc2 = nn.Linear(256, n_classes)
    
    def forward(self, x):
        x = self.pool(torch.relu(self.conv1(x)))
        x = self.pool(torch.relu(self.conv2(x)))
        x = self.dropout(x)
        x = x.view(x.size(0), -1)
        x = torch.relu(self.fc1(x))
        x = self.fc2(x)
        return x

# Usage
sequences = ["ATCGATCG" * 125, "GCTAGCTA" * 125]  # 1000bp each
X = torch.stack([one_hot_encode(seq) for seq in sequences])
model = SequenceCNN()
outputs = model(X)
```

### Transfer Learning with Pre-trained Protein Language Models

```python
# Using ESM (Evolutionary Scale Modeling) for protein representations
import torch
from transformers import EsmModel, EsmTokenizer

# Load pre-trained ESM model
tokenizer = EsmTokenizer.from_pretrained("facebook/esm2_t6_8M_UR50D")
model = EsmModel.from_pretrained("facebook/esm2_t6_8M_UR50D")

# Get embeddings for a protein sequence
sequence = "MKTVRQERLKSIVRILERSKEPVSGAQLAEELSVSRQVIVQDIAYLRSLGYNIVATPRGYVLAGG"
inputs = tokenizer(sequence, return_tensors="pt")

with torch.no_grad():
    outputs = model(**inputs)
    embeddings = outputs.last_hidden_state
    
# Use mean pooling for sequence-level representation
protein_embedding = embeddings.mean(dim=1)  # Shape: (1, hidden_dim)

# Now use this as input to your downstream classifier
```

### Autoencoder for Dimensionality Reduction

```python
class GeneExpressionAutoencoder(nn.Module):
    def __init__(self, n_genes, latent_dim=32):
        super().__init__()
        
        # Encoder
        self.encoder = nn.Sequential(
            nn.Linear(n_genes, 256),
            nn.ReLU(),
            nn.Linear(256, 64),
            nn.ReLU(),
            nn.Linear(64, latent_dim)
        )
        
        # Decoder
        self.decoder = nn.Sequential(
            nn.Linear(latent_dim, 64),
            nn.ReLU(),
            nn.Linear(64, 256),
            nn.ReLU(),
            nn.Linear(256, n_genes)
        )
    
    def forward(self, x):
        latent = self.encoder(x)
        reconstructed = self.decoder(latent)
        return reconstructed, latent
    
    def get_latent(self, x):
        return self.encoder(x)

# Train autoencoder
autoencoder = GeneExpressionAutoencoder(n_genes=5000, latent_dim=32)
criterion = nn.MSELoss()
optimizer = torch.optim.Adam(autoencoder.parameters(), lr=1e-3)

for epoch in range(100):
    autoencoder.train()
    for X_batch, _ in train_loader:
        optimizer.zero_grad()
        reconstructed, _ = autoencoder(X_batch)
        loss = criterion(reconstructed, X_batch)
        loss.backward()
        optimizer.step()

# Use latent representations for clustering or classification
latent_repr = autoencoder.get_latent(X_test_tensor).detach().numpy()
```

## Hyperparameter Tuning

```python
from sklearn.model_selection import GridSearchCV, RandomizedSearchCV
from scipy.stats import randint, uniform

# Grid search (exhaustive)
param_grid = {
    "n_estimators": [100, 200, 500],
    "max_depth": [5, 10, 20, None],
    "min_samples_split": [2, 5, 10]
}

grid_search = GridSearchCV(
    RandomForestClassifier(random_state=42),
    param_grid,
    cv=5,
    scoring="roc_auc",
    n_jobs=-1
)
grid_search.fit(X_train, y_train)
print(f"Best params: {grid_search.best_params_}")

# Random search (more efficient for large spaces)
param_dist = {
    "n_estimators": randint(50, 500),
    "max_depth": randint(3, 30),
    "min_samples_split": randint(2, 20),
    "max_features": uniform(0.1, 0.9)
}

random_search = RandomizedSearchCV(
    RandomForestClassifier(random_state=42),
    param_dist,
    n_iter=100,
    cv=5,
    scoring="roc_auc",
    random_state=42,
    n_jobs=-1
)
random_search.fit(X_train, y_train)

# Optuna for advanced tuning
import optuna

def objective(trial):
    params = {
        "n_estimators": trial.suggest_int("n_estimators", 50, 500),
        "max_depth": trial.suggest_int("max_depth", 3, 30),
        "min_samples_split": trial.suggest_int("min_samples_split", 2, 20),
    }
    
    model = RandomForestClassifier(**params, random_state=42)
    scores = cross_val_score(model, X_train, y_train, cv=5, scoring="roc_auc")
    return scores.mean()

study = optuna.create_study(direction="maximize")
study.optimize(objective, n_trials=100)
print(f"Best params: {study.best_params}")
```

## Summary

Machine learning is powerful in bioinformatics, but success depends on correct validation, robust preprocessing, and biologically meaningful interpretation, not just model complexity.
