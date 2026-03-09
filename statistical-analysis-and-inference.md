---
layout: default
title: Statistical Analysis and Inference
description: Hypothesis testing and statistics essentials for bioinformatics.
permalink: /statistical-analysis-and-inference/
---

# 7: Statistics for Bioinformatics

## 7.1 The Language of Evidence

Bioinformatics is data-driven. When we observe a difference—say, gene A is expressed more in tumor cells than normal cells—we need to know if this difference is real or just random noise. Statistics provides the framework to quantify this uncertainty.

## 7.2 Hypothesis Testing and the P-value

The core of statistical inference is **Hypothesis Testing**.

<p align="center">
  <img src="https://placehold.co/600x300/E8F5E9/333333?text=Hypothesis+Testing+and+P-values" alt="Illustration of Hypothesis Testing">
</p>

1.  **Null Hypothesis ($H_0$):** There is no difference between the groups (e.g., Drug has no effect).
2.  **Alternative Hypothesis ($H_1$):** There is a difference.

### What is a P-value?
The **p-value** is one of the most misunderstood concepts in science.
*   **Definition:** The probability of observing your data (or something more extreme) *assuming the Null Hypothesis is true*.
*   **It is NOT:** The probability that the Null Hypothesis is true.
*   **Interpretation:** A low p-value (typically < 0.05) means the data is very surprising if there were no real effect. Therefore, we reject the Null Hypothesis.

### Common Tests
*   **Student's t-test:** Compares the means of two groups (e.g., Treated vs. Control).
*   **ANOVA:** Compares means of 3+ groups.
*   **Fisher's Exact Test:** Tests associations between categorical variables (e.g., Gene Set Enrichment).

## 7.3 The Z-Score (Standard Score)

Often in bioinformatics (especially for heatmaps), we need to compare genes that have vastly different expression levels.

The **Z-score** standardizes data by centering it around 0 and scaling it by the variance.
$$ Z = \frac{x - \mu}{\sigma} $$
Where $\mu$ is the mean and $\sigma$ is the standard deviation.

*   **Z = 0:** The value is exactly average.
*   **Z = +2:** The value is 2 standard deviations above average (highly expressed).
*   **Z = -2:** The value is 2 standard deviations below average (low expression).

This allows us to see relative patterns of "up" and "down" regulation across all genes simultaneously.

## 7.4 The Multiple Testing Problem & FDR

In bioinformatics, we often test thousands of genes simultaneously (e.g., in RNA-Seq or GWAS).

If you test 20,000 genes with a p-value cutoff of 0.05, you expect $20,000 \times 0.05 = 1,000$ false positives by chance alone!

### False Discovery Rate (FDR)
To fix this, we apply **Multiple Testing Correction**. The standard method in omics is controlling the **FDR**.

*   **Bonferroni Correction:** Very strict. Tries to prevent *any* false positives. (Cutoff becomes $0.05 / 20,000$). Often too strict for biology, causing us to miss real discoveries (False Negatives).
*   **FDR (Benjamini-Hochberg):** Less strict. It controls the *proportion* of false discoveries. An FDR of 0.05 means "Of all the genes we call significant, we expect 5% to be false positives." This is the gold standard for high-throughput data.

## 7.5 Dimensionality Reduction: PCA

Omics data is high-dimensional (thousands of genes per sample). **Principal Component Analysis (PCA)** reduces this complexity by finding new axes (Principal Components) that capture the most variance in the data.

<p align="center">
  <img src="https://placehold.co/600x400/E8F5E9/333333?text=PCA:+Principal+Component+Analysis" alt="Illustration of PCA">
</p>

*   **PC1:** Captures the most variation.
*   **PC2:** Captures the second most.

Plotting samples on PC1 vs. PC2 allows us to see clusters, batch effects, or outliers instantly.

## 7.6 Bioinformatics in Action: Stats with R

R is the language of statistics. Let's simulate a gene expression experiment and see the difference between raw p-values and FDR correction.

```r
# 1. Simulate Data
# 1000 genes, 2 groups (Control, Treatment)
set.seed(42)
p_values <- numeric(1000)

for (i in 1:1000) {
  # Generate random data for Control group (Mean=10)
  control <- rnorm(10, mean = 10, sd = 2)
  
  # For the first 50 genes, make treatment different (True Positives, Mean=14)
  if (i <= 50) {
    treatment <- rnorm(10, mean = 14, sd = 2)
  } else {
    # For the rest, no difference (Null cases, Mean=10)
    treatment <- rnorm(10, mean = 10, sd = 2) 
  }
  
  # Perform t-test
  test_result <- t.test(control, treatment)
  p_values[i] <- test_result$p.value
}

# 2. Naive P-value counting
# How many "significant" genes if we just use p < 0.05?
significant_naive <- sum(p_values < 0.05)
print(paste("Significant genes (p < 0.05):", significant_naive))

# 3. FDR Correction (Benjamini-Hochberg)
# Adjust the p-values
p_adjusted <- p.adjust(p_values, method = "BH")
significant_fdr <- sum(p_adjusted < 0.05)

print(paste("Significant genes (FDR < 0.05):", significant_fdr))
```

**Output:**
```text
Significant genes (p < 0.05): 93
Significant genes (FDR < 0.05): 48
```
*Notice how the naive method found 93 significant genes (many false positives), while FDR correction narrowed it down to 48 (closer to the true 50).*

## Summary

Statistics allows us to separate signal from noise. In bioinformatics, understanding **p-values**, **multiple testing correction (FDR)**, and exploratory techniques like **PCA** is essential for interpreting high-throughput data correctly.
