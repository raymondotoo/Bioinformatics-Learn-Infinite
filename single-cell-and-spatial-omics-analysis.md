---
layout: default
title: Single-Cell and Spatial Omics Analysis
description: End-to-end practical guide for single-cell RNA-seq and spatial transcriptomics analysis.
permalink: /single-cell-and-spatial-omics-analysis/
---

# Single-Cell and Spatial Omics Analysis

![Single-Cell and Spatial Omics Analysis banner]({{ '/assets/banners/single-cell-spatial.svg' | relative_url }})

Single-cell and spatial omics let you answer two core biological questions at once: which cell states exist, and where they are located in tissue.

## Learning Goals

<section class="learning-goals-card" markdown="1">
By the end of this chapter, you should be able to:

1. Explain core concepts in single-cell and spatial omics workflows.
2. Run a basic scRNA-seq analysis pipeline from quality control to annotation.
3. Understand batch correction and integration strategies across datasets.
4. Perform differential expression and pathway interpretation by cell type.
5. Connect spatial context to cell-state biology for stronger interpretation.
</section>

## Why This Path Matters

Bulk omics averages signals across many cell types. Single-cell and spatial omics preserve heterogeneity and tissue architecture, which is critical for:

1. Tumor microenvironment profiling.
2. Immune response mapping.
3. Developmental trajectory studies.
4. Precision biomarker discovery.

## Core Data Types

### scRNA-seq
- Measures transcript abundance per individual cell.
- Typical output: gene-by-cell count matrix + metadata.

### Spatial Transcriptomics
- Measures expression in physical tissue coordinates.
- Typical output: expression matrix + spot coordinates + histology image.

### Optional companion modalities
- CITE-seq (RNA + surface proteins).
- scATAC-seq (chromatin accessibility).
- Multiome (paired RNA + ATAC).

## Recommended Analysis Workflow

## 1) Experimental Design and Metadata

Capture this before analysis:

1. Sample groups and contrasts.
2. Batch sources (patient, run date, chemistry, site).
3. Tissue region, disease stage, treatment metadata.
4. Expected cell populations and known markers.

Bad metadata design causes major downstream interpretation errors.

## 2) Quality Control (QC)

Typical QC metrics:

1. Number of detected genes per cell (`nFeature_RNA`).
2. Total counts per cell (`nCount_RNA`).
3. Mitochondrial percentage (`percent.mt`).
4. Doublet probability.

### Example (Seurat, R)

```r
library(Seurat)

obj <- CreateSeuratObject(counts = counts_matrix, project = "sc_project")
obj[["percent.mt"]] <- PercentageFeatureSet(obj, pattern = "^MT-")

# Example thresholds; tune per dataset
obj <- subset(
  obj,
  subset = nFeature_RNA > 300 &
           nFeature_RNA < 7000 &
           percent.mt < 15
)
```

## 3) Normalization and Feature Selection

Common practice:

1. Library-size normalization (`LogNormalize`) or `SCTransform`.
2. Identify highly variable genes.
3. Scale data before dimensionality reduction.

```r
obj <- NormalizeData(obj)
obj <- FindVariableFeatures(obj, selection.method = "vst", nfeatures = 3000)
obj <- ScaleData(obj)
```

## 4) Dimensionality Reduction and Clustering

1. PCA for compact representation.
2. Graph construction.
3. Cluster assignment.
4. UMAP/t-SNE visualization.

```r
obj <- RunPCA(obj, npcs = 50)
obj <- FindNeighbors(obj, dims = 1:30)
obj <- FindClusters(obj, resolution = 0.5)
obj <- RunUMAP(obj, dims = 1:30)
DimPlot(obj, reduction = "umap", label = TRUE)
```

## 5) Cell Type Annotation

Use three complementary strategies:

1. Canonical marker genes (manual curation).
2. Reference mapping (Azimuth/SingleR/celltypist).
3. Marker-driven confidence scoring.

```r
markers <- FindAllMarkers(obj, only.pos = TRUE, min.pct = 0.25, logfc.threshold = 0.25)
head(markers)
```

## 6) Batch Correction and Multi-Sample Integration

When integrating cohorts or sites, compare methods:

1. Seurat integration anchors.
2. Harmony.
3. Scanorama / BBKNN (Python ecosystem).

Goal: remove technical effects while preserving biology.

```r
# Harmony example sketch
library(harmony)
obj <- RunHarmony(obj, group.by.vars = "batch")
obj <- RunUMAP(obj, reduction = "harmony", dims = 1:30)
```

## 7) Differential Expression and Pathway Analysis

Run contrasts at the right level:

1. Cell type-specific DE (preferred).
2. Pseudobulk DE by sample and cell type for robust inference.
3. Enrichment with GO/KEGG/Reactome.

```r
Idents(obj) <- "celltype"
de_tcells <- FindMarkers(obj, ident.1 = "T_cell_treated", ident.2 = "T_cell_control")
head(de_tcells)
```

## 8) Spatial Transcriptomics Integration

Use spatial data to validate where cell states localize.

Key analyses:

1. Spatial clustering.
2. Spot deconvolution using scRNA-seq references.
3. Region-specific pathway signatures.

### Example sketch (Seurat spatial)

```r
spatial <- Load10X_Spatial(data.dir = "spatial_sample/")
spatial <- SCTransform(spatial, assay = "Spatial", verbose = FALSE)
spatial <- RunPCA(spatial)
spatial <- RunUMAP(spatial, dims = 1:30)
SpatialFeaturePlot(spatial, features = c("EPCAM", "COL1A1"))
```

## Best Practices for Reproducibility

1. Keep a sample manifest and fixed metadata schema.
2. Save intermediate objects (`.rds` or `.h5ad`) per major step.
3. Track package versions and parameters.
4. Use consistent QC thresholds with documented rationale.
5. Separate exploratory from confirmatory analyses.

## Common Pitfalls

1. Over-filtering rare but biologically important cells.
2. Calling clusters as cell types without marker validation.
3. Treating batch correction outputs as absolute truth.
4. Mixing donor/sample effects with true biological effects.
5. Ignoring spatial resolution limitations during interpretation.

## Suggested Practice Datasets

1. PBMC 3k (Seurat tutorial baseline).
2. 10x Visium public datasets for spatial workflows.
3. Multi-donor immune datasets for batch/integration practice.

## Summary

Single-cell plus spatial omics provides a high-resolution framework to discover cell states, interactions, and tissue context. Strong analysis depends on disciplined QC, robust integration, biologically grounded annotation, and reproducible reporting.
