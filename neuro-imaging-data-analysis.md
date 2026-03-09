---
layout: default
title: Neuro-imaging Data Analysis
description: Core neuroinformatics modalities, preprocessing, and analysis basics.
permalink: /neuro-imaging-data-analysis/
---

# Neuro-imaging Data Analysis

![Neuro-imaging Data Analysis banner]({{ '/assets/banners/neuroimaging.svg' | relative_url }})

Neuro-imaging analysis combines neuroscience, statistics, and computing to understand brain structure and function.

## Learning Goals

<section class="learning-goals-card" markdown="1">
By the end of this chapter, you should be able to:

1. Distinguish major imaging modalities and use cases.
2. Understand data standards and preprocessing steps.
3. Interpret common statistical outputs.
4. Recognize major quality control and reproducibility issues.
</section>

## Major Imaging Modalities

- **Structural MRI (T1/T2)**: anatomy, cortical thickness, regional volumes
- **fMRI**: task or resting-state brain activity (BOLD signal)
- **DTI/DSI**: white matter tract properties and connectivity
- **PET**: metabolism, receptor binding, and molecular imaging

Each modality answers different biological questions and needs different preprocessing.

## Data Standards and Organization

### DICOM

Raw scanner output with acquisition metadata.

### NIfTI

Common research format for volumetric imaging.

### BIDS

Standardized directory and naming convention that improves reproducibility and tool compatibility.

## Typical Preprocessing Pipeline

1. Convert DICOM to NIfTI
2. Brain extraction (skull stripping)
3. Motion correction
4. Slice-timing correction (fMRI)
5. Spatial normalization to template space (MNI)
6. Smoothing
7. Artifact regression and denoising

Common tools:

- FSL
- SPM
- AFNI
- FreeSurfer
- fMRIPrep
- nilearn (Python)

## Quality Control Essentials

- Check head motion metrics (for example framewise displacement)
- Inspect registration quality (subject to template)
- Flag signal dropout and scanner artifacts
- Verify temporal signal-to-noise ratio (tSNR)

Poor QC can produce false connectivity or activation patterns.

## Statistical Analysis Basics

### GLM (General Linear Model)

Used to model signal changes related to tasks or conditions.

Outputs include:

- Beta maps (effect estimates)
- Contrast maps
- Statistical maps (t/z values)

### Multiple Comparisons

Voxel-wise testing requires correction:

- FDR
- Family-wise error (for example random field theory, permutation)

## Connectivity Analysis

- **Functional connectivity**: temporal correlation between brain regions
- **Effective connectivity**: directed influence between regions
- **Structural connectivity**: white matter pathways from diffusion imaging

## Neuroimaging + Machine Learning

Common applications:

- Disease classification
- Cognitive score prediction
- Biomarker discovery

Important cautions:

- Leakage is easy (subject-level splits required)
- Site/scanner effects can dominate biological signal
- External validation is critical

## Minimal Python Example (nilearn)

```python
from nilearn import plotting
from nilearn.image import load_img

img = load_img("group_zmap.nii.gz")
plotting.plot_stat_map(img, threshold=3.1, title="Group Activation")
plotting.show()
```

## Common Pitfalls

- Ignoring motion confounds
- Mixing preprocessing strategies across groups
- Not harmonizing multisite datasets
- Over-interpreting small, uncorrected clusters

## Reproducibility Checklist

- Use BIDS-compliant datasets
- Record preprocessing version and parameters
- Keep code under Git
- Store QC reports with outputs
- Separate exploratory vs. confirmatory analyses

## Summary

Neuro-imaging analysis is powerful but sensitive to preprocessing and QC decisions. Reliable results come from standardized data organization, rigorous artifact control, and careful statistical inference.
