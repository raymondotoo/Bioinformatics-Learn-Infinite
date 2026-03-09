---
layout: default
title: Biology Fundamentals for Bioinformatics
description: Core molecular biology concepts every bioinformatics learner needs.
permalink: /biology-fundamentals-for-bioinformatics/
---

# Biology Fundamentals for Bioinformatics

Before analyzing real datasets, you need a clear mental model of how biological information flows in cells. This chapter introduces the concepts that repeatedly appear in genomics, transcriptomics, and proteomics analyses.

<section class="learning-goals-card">
<h2>Learning Goals</h2>
<p>By the end of this chapter, you should be able to:</p>

1. Explain DNA, RNA, genes, and proteins in simple terms.
2. Describe transcription and translation (Central Dogma).
3. Understand mutation types and their potential effects.
4. Connect biological concepts to common bioinformatics outputs.
</section>

## DNA: The Information Molecule

DNA stores hereditary information using four nucleotides: **A, T, C, G**.

- DNA is double-stranded.
- A pairs with T, and C pairs with G.
- A full organism's DNA is called its **genome**.

In bioinformatics, DNA is usually represented as strings (for example, `ATGCGT...`) and analyzed computationally.

## Genes, Chromosomes, and Genomes

- **Gene**: A DNA region that can produce a functional product (often a protein).
- **Chromosome**: A long DNA molecule containing many genes.
- **Genome**: The complete DNA content of an organism.

Not all DNA is protein-coding. Many regions regulate expression timing, location, and intensity.

## RNA and Transcription

Cells do not directly use DNA as a working copy. Instead, a gene is transcribed into RNA.

- DNA stays protected in the nucleus.
- RNA acts as an intermediate messenger.
- In RNA, **U (uracil)** replaces **T (thymine)**.

Process summary:

```text
DNA -> RNA
```

## Translation and Proteins

Ribosomes read mRNA in 3-letter units called **codons**.

- Each codon maps to an amino acid.
- Amino acids join to form proteins.
- Protein structure determines function.

Process summary:

```text
RNA -> Protein
```

## Central Dogma: Big Picture

```text
DNA -> RNA -> Protein
```

This information flow underlies most analyses in bioinformatics:

- DNA analysis asks: what can be encoded?
- RNA analysis asks: what is currently expressed?
- Protein analysis asks: what is functionally active?

## Gene Expression Basics

Gene expression is not simply ON or OFF; it is dynamic.

Key ideas:

- Different tissues express different genes.
- Expression changes with disease state, treatment, and environment.
- RNA-seq is commonly used to quantify expression.

Common output: a matrix with genes as rows and samples as columns.

## Mutations and Variation

Genetic variants are differences in DNA sequence.

Common types:

- **SNP**: Single nucleotide change
- **Insertion/Deletion (indel)**: Add/remove bases
- **Copy Number Variant (CNV)**: DNA segment duplication/deletion
- **Structural Variant**: Large rearrangements (inversion, translocation)

Possible effects:

- No effect
- Altered protein function
- Changed gene expression
- Disease risk association

## Genotype vs. Phenotype

- **Genotype**: The genetic makeup (what variants exist).
- **Phenotype**: Observable trait (for example, disease status).

A key bioinformatics goal is linking genotype to phenotype through statistics and modeling.

## Why Cell Types Matter

Bulk tissue mixes multiple cell populations. This can hide important signals.

- Bulk RNA-seq gives averaged expression.
- Single-cell RNA-seq resolves cell-specific patterns.

Interpretation always depends on biological context and sample composition.

## Biological Databases You Should Know

- **NCBI**: Sequences, publications, tools
- **Ensembl**: Genome annotations
- **UniProt**: Protein knowledgebase
- **PDB**: 3D protein structures
- **GEO/SRA**: Public omics datasets

## Practical Connection to Bioinformatics Files

- FASTA/FASTQ: raw sequences
- BAM/CRAM: aligned reads
- VCF: variants
- GTF/GFF: gene annotations
- Count matrix: expression quantification

## Summary

Bioinformatics works best when biological concepts are clear. Understanding genes, expression, and variation helps you interpret computational results correctly and avoid false conclusions.
