---
layout: default
title: "Normalization Methods in Proteomics"
description: A practical guide to common normalization methods in proteomics and their expected effects.
summary: This post explains median, quantile, variance stabilizing, and robust normalization for proteomics and when each method is most useful.
permalink: /blog/normalization-methods-in-proteomics/
---

# Normalization Methods in Proteomics

## Why Normalization Comes First
Before biological comparisons, you need to reduce technical variation from sample loading, instrument drift, and batch differences.

## Common Methods
### 1. Median Normalization
Shifts sample medians to the same level. Fast and interpretable.

### 2. Quantile Normalization
Forces all sample distributions to match. Powerful, but may over-correct when true global shifts exist.

### 3. Variance Stabilizing Normalization (VSN)
Stabilizes variance across intensity ranges. Helpful when low- and high-intensity proteins behave differently.

### 4. Robust or Reference-Based Normalization
Uses internal standards, housekeeping proteins, or pooled references for stable scaling.

## Minimal R Examples
```r
# Median normalization
sample_medians <- apply(df, 2, median, na.rm = TRUE)
global_median <- median(sample_medians, na.rm = TRUE)
df_med <- sweep(df, 2, sample_medians - global_median, FUN = "-")
```

```r
# Quantile normalization
library(preprocessCore)
df_qn <- normalize.quantiles(as.matrix(df))
colnames(df_qn) <- colnames(df)
rownames(df_qn) <- rownames(df)
```

## How to Evaluate Normalization Quality
1. Compare boxplots before and after normalization.
2. Check coefficient of variation in technical replicates.
3. Re-run PCA to inspect whether technical batch effects shrink.
4. Confirm known biological contrasts remain visible.

## Key Takeaway
Normalization should reduce technical bias without erasing biological signal. Always evaluate method impact before final analysis.
