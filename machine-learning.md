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

## Model Interpretation in Biology

Interpretability is important for translational use.

Useful tools:

- Feature importance (tree-based models)
- SHAP values
- Coefficient inspection in linear models

Biological sanity check:

- Do top features map to known pathways?
- Are findings stable across cohorts?

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

## Summary

Machine learning is powerful in bioinformatics, but success depends on correct validation, robust preprocessing, and biologically meaningful interpretation, not just model complexity.
