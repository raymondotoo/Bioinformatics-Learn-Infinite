---
layout: default
---

# Neuro-imaging Data Analysis

Neuroinformatics combines neuroscience and informatics to analyze brain imaging data.

## Imaging Modalities

*   **MRI (Magnetic Resonance Imaging)**: Structural brain imaging.
*   **fMRI (functional MRI)**: Measuring brain activity via BOLD signal.
*   **DTI (Diffusion Tensor Imaging)**: Mapping white matter tracts.
*   **PET (Positron Emission Tomography)**: Metabolic processes.

## Data Formats

*   **DICOM**: Raw scanner output.
*   **NIfTI**: Standard research format.
*   **BIDS**: Brain Imaging Data Structure (standard for organizing data).

## Preprocessing Pipeline

1.  **Motion Correction**: Aligning volumes over time.
2.  **Slice Timing Correction**: Adjusting for acquisition delays.
3.  **Spatial Normalization**: Warping brains to a standard template (MNI space).
4.  **Smoothing**: Increasing signal-to-noise ratio.

## Statistical Analysis

*   **GLM (General Linear Model)**: Modeling the BOLD response.
*   **Connectivity Analysis**: Functional and effective connectivity.
*   **Tools**: SPM, FSL, AFNI, FreeSurfer, nilearn (Python).