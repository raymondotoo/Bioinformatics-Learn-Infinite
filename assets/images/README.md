# Bioinformatics Learning Path Illustrations

This folder contains educational SVG illustrations for the bioinformatics tutorial site. All diagrams are designed to be clear, colorful, and practical for learners.

## Illustration Inventory

| Filename | Description | Used In |
|----------|-------------|---------|
| `central-dogma.svg` | DNA → RNA → Protein flow with transcription and translation | Biology Fundamentals |
| `mutation-types.svg` | SNP, insertion, deletion, and CNV with effects | Biology Fundamentals |
| `bioinformatics-workflow.svg` | 6-step analysis workflow from question to report | Introduction to Bioinformatics |
| `file-formats.svg` | FASTA, FASTQ, BAM, VCF, GTF, BED, count matrices | Core Skills |
| `project-structure.svg` | Recommended directory layout for reproducibility | Core Skills |
| `ngs-pipeline.svg` | DNA-seq vs RNA-seq pipeline comparison | NGS Data Analysis |
| `fdr-correction.svg` | Multiple testing problem and FDR vs naive p-values | Statistics |
| `pca-concept.svg` | PCA dimensionality reduction with cluster visualization | Statistics |
| `ml-workflow.svg` | End-to-end ML workflow with supervised/unsupervised comparison | Machine Learning |
| `multiomics-integration.svg` | Early, intermediate, and late integration strategies | Multi-Omics Integration |
| `single-cell-workflow.svg` | scRNA-seq analysis pipeline with QC metrics | Single-Cell Analysis |

## Design Principles

- **Clean SVG format**: Scalable vector graphics for crisp rendering at any size
- **Consistent color palette**: Harmonized with the site's green/blue/purple theme
- **Educational focus**: Key concepts highlighted with annotations
- **Accessibility**: Alt text and ARIA labels included

## Usage

In markdown files, reference images using Jekyll's `relative_url` filter:

```markdown
<p align="center">
  <img src="{{ '/assets/images/FILENAME.svg' | relative_url }}" alt="Description" style="max-width: 100%; height: auto;">
</p>
```

## Contributing

When adding new illustrations:
1. Use SVG format for scalability
2. Include `role="img"` and `aria-label` attributes
3. Use the site's color palette for consistency
4. Add the illustration to this README
