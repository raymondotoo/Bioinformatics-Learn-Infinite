---
layout: default
title: Bioinformatics Data Analysis Focused (NGS)
description: NGS workflows, QC, and sequencing analysis pipelines.
permalink: /bioinformatics-data-analysis-focused-ngs/
---

# Bioinformatics Data Analysis Focused (NGS)

Next-Generation Sequencing (NGS) allows high-throughput measurement of genomes, transcriptomes, and epigenomes. This chapter focuses on practical analysis steps and how to avoid common mistakes.

## Learning Goals

<section class="learning-goals-card" markdown="1">
By the end of this chapter, you should be able to:

1. Describe the NGS pipeline from raw reads to biological interpretation.
2. Perform core quality checks before downstream analysis.
3. Distinguish DNA-seq and RNA-seq workflows.
4. Understand common outputs and quality metrics.
</section>

## NGS Platforms and Data Types

- **Illumina**: high accuracy, short reads (most common)
- **PacBio / Oxford Nanopore**: long reads, useful for structural variants and isoforms

Common file formats:

- FASTQ: raw reads + quality
- BAM/CRAM: alignments
- VCF: variants
- GTF/GFF: annotations
- Count matrix: expression tables

## Typical NGS Workflow

1. Experimental design and metadata planning
2. Sequencing and FASTQ generation
3. Raw read quality control
4. Trimming/filtering
5. Alignment or pseudo-alignment
6. Quantification or variant calling
7. Statistical analysis
8. Functional interpretation and reporting

## Experimental Design Essentials

Good design matters more than fancy tools.

- Include biological replicates (minimum 3 per group when possible).
- Balance batches across conditions.
- Record covariates (sex, age, tissue, run, lane).
- Define the primary endpoint before analysis.

## Raw Read Quality Control

Tools: FastQC, MultiQC

Key metrics:

- Per-base quality score
- Adapter contamination
- Overrepresented sequences
- GC distribution
- Sequence duplication levels

Typical actions:

- Trim adapters (Cutadapt/Trimmomatic)
- Remove low-quality tails
- Re-check QC after trimming

## DNA-Seq: Variant Calling Workflow

### Step 1: Alignment

Map reads to a reference genome (for example with BWA-MEM).

### Step 2: Post-processing

- Sort BAM
- Mark duplicates
- Index files
- Optional: base quality recalibration

### Step 3: Variant Calling

Call SNPs and indels using tools like GATK HaplotypeCaller or FreeBayes.

### Step 4: Filtering and Annotation

- Filter by depth, quality, allele balance
- Annotate functional effects with SnpEff or ANNOVAR

## RNA-Seq: Differential Expression Workflow

### Step 1: Alignment/Quantification

- Alignment-based: STAR/HISAT2 + featureCounts/HTSeq
- Alignment-free: Salmon/Kallisto

### Step 2: Normalize Counts

Use methods that account for library size and composition.

### Step 3: Differential Expression

Use DESeq2, edgeR, or limma-voom.

### Step 4: Biological Interpretation

- Pathway enrichment (GSEA, GO)
- Gene set interpretation
- Visualization (volcano plot, heatmap, PCA)

## Core Quality Checks Before Interpretation

- Are replicates clustering by condition?
- Any obvious outliers?
- Are batch effects dominating PCA?
- Is sequencing depth sufficient for the question?

## Common Pitfalls in NGS Analysis

- Treating technical replicates as biological replicates
- Ignoring sample swaps or contamination
- Using uncorrected p-values across thousands of tests
- Over-interpreting low-depth variants
- Skipping metadata quality checks

## Minimal Command-line Example

```bash
# 1) Run FastQC on all reads
fastqc data/*.fastq.gz -o qc/

# 2) Aggregate reports
multiqc qc/ -o qc_summary/

# 3) Example alignment (RNA-seq with STAR)
STAR --genomeDir ref/star_index \
     --readFilesIn sample_R1.fastq.gz sample_R2.fastq.gz \
     --readFilesCommand zcat \
     --outFileNamePrefix results/sample_
```

## Beyond Bulk NGS

Other important analysis areas:

- Single-cell RNA-seq
- ChIP-seq and ATAC-seq
- Metagenomics and microbiome profiling
- Long-read isoform analysis

## Summary

Reliable NGS analysis depends on design quality, robust QC, and careful interpretation. If QC and metadata are handled well, downstream statistical findings become far more trustworthy.
