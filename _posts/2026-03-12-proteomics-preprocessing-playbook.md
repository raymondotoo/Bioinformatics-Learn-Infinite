---
layout: default
title: "Proteomics Preprocessing Playbook: Missingness + Normalization"
description: A step-by-step weekly playbook for handling missing values and normalization in proteomics studies.
summary: A practical end-to-end checklist that combines missing-value handling and normalization into one reproducible preprocessing workflow.
permalink: /blog/proteomics-preprocessing-playbook/
---

# Proteomics Preprocessing Playbook: Missingness + Normalization

## A Simple End-to-End Workflow
Use this order to keep results reproducible and biologically meaningful.

## Step 1. Audit Data Quality
1. Inspect missingness per sample and per protein.
2. Remove clear outlier samples.
3. Flag proteins with very high missingness.

## Step 2. Log Transform Intensities
Log2 transform stabilizes variance and improves comparability.

```r
df_log2 <- log2(df + 1)
```

## Step 3. Normalize Across Samples
Start with median normalization and evaluate. Move to quantile/VSN if needed.

## Step 4. Impute Missing Values
Choose method based on likely mechanism:
1. MAR/MCAR: kNN or random forest.
2. MNAR (below detection): left-censored strategy.

## Step 5. Run Sensitivity Checks
Repeat differential analysis with at least two imputation approaches and compare overlap in top proteins.

```r
# Example: compare top hits across two methods
top_a <- head(results_method_a$protein[order(results_method_a$p_adj)], 50)
top_b <- head(results_method_b$protein[order(results_method_b$p_adj)], 50)
length(intersect(top_a, top_b))
```

## Step 6. Report What You Did
Document:
1. Filtering threshold(s).
2. Normalization method.
3. Imputation method and parameters.
4. Sensitivity analysis outcome.

## Key Takeaway
A transparent preprocessing pipeline is more valuable than chasing a single “perfect” method. Consistency, justification, and validation are what make findings trustworthy.
