---
layout: default
title: Multi-Omics Data Integration
description: Practical concepts and workflows for integrating genomics, transcriptomics, proteomics, and metabolomics data.
permalink: /multiomics-data-integration/
---

# Multi-Omics Data Integration

![Multi-Omics Data Integration banner]({{ '/assets/banners/multiomics.svg' | relative_url }})

Multi-omics integration combines information from multiple molecular layers to provide a more complete view of biology than any single data type alone.

## Learning Goals

<section class="learning-goals-card" markdown="1">
By the end of this chapter, you should be able to:

1. Explain why multi-omics integration is useful in translational research.
2. Design a clean end-to-end integration workflow from raw data to biological interpretation.
3. Compare early, intermediate, and late integration strategies.
4. Apply practical R/Python code patterns for integration-ready datasets.
5. Identify key pitfalls such as batch effects, feature mismatch, and leakage.
</section>

## Why Multi-Omics?

Single-omics analysis answers narrow questions. Multi-omics helps answer system-level questions:

1. Why does a genomic variant change RNA, protein, and metabolite profiles differently?
2. Which molecular layer is most predictive of phenotype or clinical outcome?
3. Which pathways show consistent dysregulation across layers?

Common layers:

- **Genomics** (variants, CNVs)
- **Transcriptomics** (gene expression, isoforms)
- **Proteomics** (protein abundance, PTMs)
- **Metabolomics** (small molecules, pathway activity)
- **Epigenomics** (methylation, chromatin state)

## Core Integration Strategies

<p align="center">
  <img src="{{ '/assets/images/multiomics-integration.svg' | relative_url }}" alt="Multi-omics Integration Strategies" style="max-width: 100%; height: auto;">
</p>

### 1. Early Integration (Feature-Level)
Concatenate features from all layers into one matrix.

Use when:
1. Sample size is high enough.
2. Features are harmonized and scaled.

Risk:
High dimensionality can overfit quickly.

### 2. Intermediate Integration (Latent-Level)
Learn compact representations per omics layer, then combine the latent factors.

Use when:
1. Each omics type has very different feature spaces.
2. You want biologically meaningful hidden factors.

Common tools:
MOFA+, iCluster, DIABLO (mixOmics), autoencoders.

### 3. Late Integration (Decision-Level)
Build models per omics layer and combine predictions.

Use when:
1. Layers have missing samples.
2. Separate models are easier to interpret operationally.

## End-to-End Workflow

### Step 1. Define the Biological Question
Examples:
1. Biomarker discovery for disease subtypes.
2. Mechanistic pathway prioritization.
3. Outcome prediction (response/non-response).

### Step 2. Harmonize Samples and IDs
Create a shared sample map across omics files.

```r
# Example in R: enforce common samples across omics matrices
common_ids <- Reduce(intersect, list(colnames(rna), colnames(protein), colnames(metabolite)))
rna_common <- rna[, common_ids]
protein_common <- protein[, common_ids]
met_common <- metabolite[, common_ids]
```

### Step 3. Preprocess Each Layer Independently
Minimum checklist:
1. Normalize within each omics type.
2. Remove low-quality features.
3. Handle missing values with method-appropriate imputation.
4. Correct batch effects.

```r
# RNA-seq example pattern: log transform after size normalization
rna_log <- log2(rna_common + 1)
```

```r
# Proteomics example pattern: median center per sample
sample_medians <- apply(protein_common, 2, median, na.rm = TRUE)
global_median <- median(sample_medians, na.rm = TRUE)
protein_norm <- sweep(protein_common, 2, sample_medians - global_median, FUN = "-")
```

### Step 4. Align Features to Biological Knowledge
Link features to gene symbols, pathways, or protein complexes.

```python
# Python pattern: align by shared gene symbol index
import pandas as pd

rna_df = pd.read_csv("rna_matrix.csv", index_col=0)
protein_df = pd.read_csv("protein_matrix.csv", index_col=0)
shared = rna_df.index.intersection(protein_df.index)
rna_shared = rna_df.loc[shared]
protein_shared = protein_df.loc[shared]
```

### Step 5. Choose an Integration Model
Start with one interpretable baseline and one advanced model:
1. Baseline: correlation network + pathway enrichment.
2. Advanced: latent-factor model (for example MOFA+).

### Step 6. Validate Robustly
1. Split train/test at the **sample level**.
2. Prevent leakage from normalization/imputation across split boundaries.
3. Report external validation if possible.

## Integration Methods You Should Know

### Correlation-Based Integration
- Simple and interpretable.
- Good for first-pass biological exploration.

### Canonical Correlation Analysis (CCA)
- Finds linear relationships between two omics blocks.
- Useful for paired datasets with enough samples.

### Partial Least Squares / DIABLO (mixOmics)
- Supervised integration with feature selection.
- Strong option for multi-class biomarker tasks.

### Multi-Omics Factor Analysis (MOFA+)
- Unsupervised latent factors.
- Separates shared vs layer-specific variation.

## Practical Quality Control for Multi-Omics

1. Plot missingness by layer and sample.
2. Check per-layer variance and outlier samples.
3. Visualize batch structure with PCA/UMAP before and after correction.
4. Inspect cross-omics concordance for known biology (for example gene-protein pairs).

```r
# Quick missingness check (R)
miss_sample <- colMeans(is.na(protein_norm)) * 100
summary(miss_sample)
```

## Common Pitfalls and How to Avoid Them

1. **Feature mismatch across layers**: map IDs early and document conversion steps.
2. **Overfitting in high dimensions**: use regularization and nested validation.
3. **Ignoring batch effects**: correct per layer, then verify correction worked.
4. **Blind concatenation**: scale/transform before combining matrices.
5. **Data leakage**: preprocess inside training folds only.

## Mini Integration Example (Conceptual)

```r
# Assume rna_log, protein_norm, met_common are feature x sample
# 1) Keep common samples
ids <- Reduce(intersect, list(colnames(rna_log), colnames(protein_norm), colnames(met_common)))

X_rna <- t(scale(t(rna_log[, ids])))
X_pro <- t(scale(t(protein_norm[, ids])))
X_met <- t(scale(t(met_common[, ids])))

# 2) Simple early integration baseline
X <- rbind(X_rna, X_pro, X_met)

# 3) Dimensionality reduction and clustering
pca <- prcomp(t(X), center = TRUE, scale. = FALSE)
plot(pca$x[, 1], pca$x[, 2], pch = 19, xlab = "PC1", ylab = "PC2")
```

## Reproducibility Checklist

1. Version-control all preprocessing and integration scripts.
2. Save parameter files for normalization, imputation, and model tuning.
3. Keep a frozen metadata file with sample-to-omics mapping.
4. Export QC reports and intermediate matrices for auditability.
5. Track package versions (R `sessionInfo()`, Python `pip freeze`).

## Summary

Multi-omics integration turns disconnected molecular measurements into systems-level biological insight. Strong results depend on disciplined preprocessing, careful feature/sample alignment, robust validation, and clear biological interpretation.
