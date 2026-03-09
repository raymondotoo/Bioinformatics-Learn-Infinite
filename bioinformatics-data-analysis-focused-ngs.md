---
layout: default
title: Bioinformatics Data Analysis Focused (NGS)
description: NGS workflows, QC, and sequencing analysis pipelines.
permalink: /bioinformatics-data-analysis-focused-ngs/
---

# Bioinformatics Data Analysis-Focused (NGS)

Next-Generation Sequencing (NGS) has revolutionized biology. This section focuses on the pipelines used to analyze high-throughput sequencing data.

## NGS Technologies

*   **Illumina**: Short-read sequencing (SBS).
*   **PacBio / Oxford Nanopore**: Long-read sequencing.
*   **File Formats**: FASTA, FASTQ, SAM/BAM/CRAM, VCF, GFF/GTF.

## Quality Control (QC)

*   **Tools**: FastQC, MultiQC.
*   **Metrics**: Per base sequence quality, GC content, adapter content.
*   **Trimming**: Trimmomatic, Cutadapt.

## DNA-Seq Analysis (Variant Calling)

1.  **Alignment**: Mapping reads to a reference genome (BWA, Bowtie2).
2.  **Post-processing**: Sorting, indexing, marking duplicates (Samtools, Picard).
3.  **Variant Calling**: Identifying SNPs and Indels (GATK HaplotypeCaller, FreeBayes).
4.  **Annotation**: Predicting the effect of variants (SnpEff, ANNOVAR).

## RNA-Seq Analysis (Transcriptomics)

1.  **Alignment**: Spliced alignment (STAR, HISAT2).
2.  **Quantification**: Counting reads per gene (HTSeq, featureCounts) or pseudo-alignment (Salmon, Kallisto).
3.  **Differential Expression**: Identifying changes in gene expression (DESeq2, edgeR, limma).
4.  **Functional Analysis**: GO enrichment, Pathway analysis (GSEA).

## Other Pipelines

*   **ChIP-Seq**: Protein-DNA interactions.
*   **ATAC-Seq**: Chromatin accessibility.
*   **Metagenomics**: Microbial community analysis.
