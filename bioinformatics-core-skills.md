---
layout: default
title: Bioinformatics Core Skills
description: Practical command-line, programming, and reproducibility foundations.
permalink: /bioinformatics-core-skills/
---

# Bioinformatics Core Skills

This chapter covers the practical technical skills every bioinformatics learner needs to move from theory to real analysis.

## Learning Goals

<section class="learning-goals-card" markdown="1">
By the end of this chapter, you should be able to:

1. Navigate Linux confidently.
2. Inspect and transform text-based biological files.
3. Write simple scripts in Python and R.
4. Use Git for version control and collaboration.
5. Build reproducible workflows.
</section>

## Linux Command Line Essentials

Most bioinformatics tools run on Linux or Linux-like systems.

Core commands:

- Navigation: `pwd`, `ls`, `cd`
- File operations: `cp`, `mv`, `rm`, `mkdir`, `touch`
- Viewing files: `cat`, `less`, `head`, `tail`
- Search/filter: `grep`, `cut`, `sort`, `uniq`, `awk`, `sed`
- Process management: `ps`, `top`, `kill`

### Example: Inspect a FASTQ File

```bash
zcat sample_R1.fastq.gz | head -n 8
```

This shows two reads (4 lines per read in FASTQ format).

## Working with Bioinformatics File Formats

You should know what each format represents:

- FASTA: sequence only
- FASTQ: sequence + quality scores
- SAM/BAM/CRAM: read alignments
- VCF: variants
- GTF/GFF: genomic features
- BED: genomic intervals

### Example: Count Reads in a FASTQ

```bash
zcat sample_R1.fastq.gz | wc -l
```

Divide by 4 to estimate number of reads.

## Shell Scripting for Automation

If you repeat a task more than once, script it.

```bash
#!/usr/bin/env bash
for f in data/*.fastq.gz; do
  echo "Processing $f"
  zcat "$f" | head -n 4
done
```

Benefits:

- Saves time
- Reduces manual mistakes
- Makes steps reproducible

## Python for Data Processing

Python is useful for parsing files and building analysis utilities.

Core libraries:

- `pandas` for tables
- `numpy` for arrays
- `matplotlib` / `seaborn` for plotting
- `biopython` for sequence operations

### Example: Read a Tabular Result

```python
import pandas as pd

df = pd.read_csv("deseq_results.csv")
print(df.head())
print(df[df["padj"] < 0.05].shape)
```

## R for Statistics and Visualization

R is widely used in transcriptomics and differential analysis.

Core ecosystem:

- `tidyverse` for data wrangling
- `ggplot2` for plotting
- `Bioconductor` for omics packages
- `DESeq2`, `edgeR`, `limma` for expression analysis

## Version Control with Git

Git is required for tracking, sharing, and reviewing analysis changes.

Essential workflow:

```bash
git status
git add .
git commit -m "Add RNA-seq QC script"
git push origin main
```

Best practices:

- Write meaningful commit messages.
- Commit logical units of work.
- Keep analysis notebooks and scripts under version control.

## Reproducible Research Principles

A result is reproducible when someone else can regenerate it using your code, inputs, and parameters.

Checklist:

- Record software versions.
- Save raw and processed data separately.
- Keep metadata organized.
- Parameterize scripts.
- Use a consistent folder structure.

Example project layout:

```text
project/
  data_raw/
  data_processed/
  scripts/
  results/
  figures/
  README.md
```

## Environments and Dependency Management

Tool version mismatch is a common failure point.

Recommended options:

- `conda` / `mamba` for scientific packages
- `venv` / `pip` for Python projects
- Docker/Singularity for portable environments

## Workflow Systems (Next Step)

For medium and large projects, use pipeline managers:

- Snakemake
- Nextflow
- CWL/WDL

They improve scalability, reproducibility, and cluster execution.

## Summary

Strong command-line, scripting, version control, and reproducibility habits are the foundation of professional bioinformatics. These skills will make every downstream analysis faster and more reliable.
