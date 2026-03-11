---
layout: default
title: Biology Fundamentals for Bioinformatics
description: Core molecular biology concepts every bioinformatics learner needs.
permalink: /biology-fundamentals-for-bioinformatics/
---

# Biology Fundamentals for Bioinformatics

![Biology Fundamentals banner]({{ '/assets/banners/biology-fundamentals.svg' | relative_url }})

Before analyzing real datasets, you need a clear mental model of how biological information flows in cells. This chapter introduces the concepts that repeatedly appear in genomics, transcriptomics, and proteomics analyses.

## Learning Goals

<section class="learning-goals-card" markdown="1">
By the end of this chapter, you should be able to:

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

<p align="center">
  <img src="{{ '/assets/images/central-dogma.svg' | relative_url }}" alt="Central Dogma of Molecular Biology" style="max-width: 100%; height: auto;">
</p>

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

<p align="center">
  <img src="{{ '/assets/images/mutation-types.svg' | relative_url }}" alt="Types of Genetic Variation" style="max-width: 100%; height: auto;">
</p>

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

## Protein Structure and Function

Proteins are the workhorses of the cell. Understanding their structure helps interpret many bioinformatics analyses.

### Four Levels of Protein Structure

1. **Primary structure**: Linear sequence of amino acids (what you see in FASTA files)
2. **Secondary structure**: Local folding patterns (α-helices, β-sheets)
3. **Tertiary structure**: Complete 3D shape of one polypeptide
4. **Quaternary structure**: Multiple polypeptides assembled together

### Why Structure Matters for Bioinformatics

- **Variant interpretation**: A mutation in a catalytic site is more likely damaging than one in a flexible loop
- **Drug design**: Binding pockets on proteins are drug targets
- **AlphaFold revolution**: AI can now predict 3D structures from sequence alone

```python
# Example: Fetch AlphaFold structure prediction
import requests

uniprot_id = "P04637"  # p53 tumor suppressor
url = f"https://alphafold.ebi.ac.uk/files/AF-{uniprot_id}-F1-model_v4.pdb"
response = requests.get(url)
with open(f"{uniprot_id}_alphafold.pdb", "w") as f:
    f.write(response.text)
print(f"Downloaded AlphaFold structure for {uniprot_id}")
```

## Epigenetics: Beyond the DNA Sequence

Epigenetics studies heritable changes in gene expression that don't involve DNA sequence changes.

### Key Epigenetic Mechanisms

| Mechanism | What It Does | Assay |
|-----------|--------------|-------|
| **DNA Methylation** | Adds methyl groups to cytosines (usually CpG sites), typically silences genes | Bisulfite-seq, RRBS, methylation arrays |
| **Histone Modification** | Chemical marks on histone tails affect chromatin accessibility | ChIP-seq |
| **Chromatin Accessibility** | Open vs. closed chromatin determines gene availability | ATAC-seq, DNase-seq |
| **3D Genome Organization** | Physical folding affects which genes interact | Hi-C, Capture-C |

### Practical Example: Interpreting Methylation Data

```r
# Typical methylation analysis pattern
library(minfi)

# Load methylation array data
rgSet <- read.metharray.exp("idat_folder/")

# Preprocess
mSet <- preprocessIllumina(rgSet)

# Get beta values (0-1 scale of methylation)
beta <- getBeta(mSet)

# Identify differentially methylated positions
# Beta difference > 0.2 is often biologically meaningful
dmps <- rownames(beta)[abs(rowMeans(beta[,cases]) - rowMeans(beta[,controls])) > 0.2]
```

## Cell Signaling Pathways

Cells communicate through signaling pathways. Understanding these is crucial for pathway enrichment analysis.

### Major Signaling Pathway Categories

1. **Growth factor signaling**: MAPK/ERK, PI3K/AKT, JAK/STAT
2. **Stress response**: p53, NF-κB, HIF
3. **Developmental**: Wnt, Notch, Hedgehog
4. **Immune signaling**: Toll-like receptors, interferons, cytokines
5. **Metabolic**: AMPK, mTOR, insulin signaling

### Why Pathways Matter in Bioinformatics

Individual gene changes are hard to interpret. Pathway analysis asks: "Are genes in a pathway collectively dysregulated?"

```r
# Gene Set Enrichment Analysis (GSEA) example
library(fgsea)

# Ranked gene list (e.g., by log2 fold change from DE analysis)
ranks <- setNames(de_results$log2FoldChange, de_results$gene)

# Load pathway gene sets (e.g., from MSigDB)
pathways <- gmtPathways("h.all.v2023.2.Hs.symbols.gmt")

# Run GSEA
fgseaRes <- fgsea(pathways = pathways, 
                   stats = ranks,
                   minSize = 15,
                   maxSize = 500)

# Top enriched pathways
head(fgseaRes[order(pval), ], 10)
```

## The Immune System Basics

Immunology concepts appear constantly in bioinformatics, especially in cancer and infectious disease research.

### Key Immune Cell Types

| Cell Type | Function | Key Markers |
|-----------|----------|-------------|
| **T cells (CD4+)** | Helper cells, coordinate immune response | CD3, CD4 |
| **T cells (CD8+)** | Cytotoxic cells, kill infected/cancer cells | CD3, CD8 |
| **B cells** | Produce antibodies | CD19, CD20 |
| **NK cells** | Innate killing of abnormal cells | CD56, NKG2D |
| **Macrophages** | Phagocytosis, antigen presentation | CD68, CD163 |
| **Dendritic cells** | Professional antigen presenters | CD11c, HLA-DR |

### Immune Deconvolution in Bulk RNA-seq

Single-cell is expensive. Deconvolution estimates cell type proportions from bulk data:

```r
# Using CIBERSORT-style deconvolution
library(immunedeconv)

# Your bulk expression matrix (genes × samples)
results <- deconvolute(bulk_expression, method = "cibersort_abs")

# Visualize immune composition
library(ggplot2)
ggplot(results, aes(x = sample, y = fraction, fill = cell_type)) +
  geom_bar(stat = "identity") +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))
```

## Cancer Biology Essentials

Cancer genomics is one of the largest application areas in bioinformatics.

### Hallmarks of Cancer

The "Hallmarks of Cancer" framework organizes cancer biology:

1. Sustaining proliferative signaling
2. Evading growth suppressors
3. Resisting cell death
4. Enabling replicative immortality
5. Inducing angiogenesis
6. Activating invasion and metastasis
7. Reprogramming energy metabolism
8. Evading immune destruction
9. Genome instability and mutation
10. Tumor-promoting inflammation

### Key Cancer Genomics Concepts

- **Driver vs. passenger mutations**: Drivers contribute to cancer; passengers are bystanders
- **Tumor mutational burden (TMB)**: Total mutations per megabase; predicts immunotherapy response
- **Microsatellite instability (MSI)**: DNA repair defects causing hypermutation
- **Copy number alterations**: Amplifications (oncogenes) and deletions (tumor suppressors)

```r
# Annotate variants as driver/passenger using cancer databases
library(maftools)

# Read MAF file (mutation annotation format)
maf <- read.maf("tumor_mutations.maf")

# Summary of mutation types
plotmafSummary(maf, rmOutlier = TRUE)

# Check against cancer gene census
oncoplot(maf, top = 20)
```

## RNA Biology Beyond mRNA

Not all RNA codes for proteins. Non-coding RNAs are increasingly important in bioinformatics.

### Types of Non-Coding RNA

| RNA Type | Size | Function | Relevance |
|----------|------|----------|-----------|
| **miRNA** | ~22 nt | Post-transcriptional gene silencing | Biomarkers, cancer |
| **lncRNA** | >200 nt | Diverse regulatory roles | Disease associations |
| **circRNA** | Variable | miRNA sponges, translation | Emerging biomarkers |
| **rRNA** | Large | Ribosome components | Contaminant in RNA-seq |
| **tRNA** | ~76 nt | Amino acid carriers | Fragmentation products |
| **snRNA** | ~150 nt | Splicing machinery | Splicing disorders |

### Analyzing Small RNA-seq

```bash
# Typical small RNA-seq pipeline
# 1. Trim adapters (critical for small RNAs)
cutadapt -a TGGAATTCTCGGGTGCCAAGG -m 18 -M 30 \
    -o trimmed.fastq input.fastq

# 2. Align to reference (miRBase for miRNAs)
bowtie -v 1 -a --best --strata mirbase_mature \
    trimmed.fastq aligned.sam

# 3. Count with featureCounts or specialized tools
```

## Model Organisms and Why They Matter

Different organisms are used to model human disease. Understanding their strengths helps interpret cross-species data.

| Organism | Genome Size | Strengths | Databases |
|----------|-------------|-----------|-----------|
| **Human** | 3.2 Gb | Direct relevance | UCSC, Ensembl, NCBI |
| **Mouse** | 2.7 Gb | Disease models, genetics | MGI, IMPC |
| **Zebrafish** | 1.4 Gb | Development, imaging | ZFIN |
| **Drosophila** | 180 Mb | Genetics, pathways | FlyBase |
| **C. elegans** | 100 Mb | Development, aging | WormBase |
| **Yeast** | 12 Mb | Cell biology fundamentals | SGD |
| **Arabidopsis** | 135 Mb | Plant biology | TAIR |

### Cross-Species Gene Mapping

```r
# Convert mouse genes to human orthologs
library(biomaRt)

mouse <- useMart("ensembl", dataset = "mmusculus_gene_ensembl")
human <- useMart("ensembl", dataset = "hsapiens_gene_ensembl")

# Get human orthologs
orthologs <- getLDS(
  attributes = c("mgi_symbol"),
  filters = "mgi_symbol",
  values = mouse_genes,
  mart = mouse,
  attributesL = c("hgnc_symbol"),
  martL = human
)
```

## Biological Databases Deep Dive

Knowing which databases to query accelerates every analysis.

### Sequence and Genome Databases

| Database | URL | Use Case |
|----------|-----|----------|
| **NCBI GenBank** | ncbi.nlm.nih.gov | Primary sequence repository |
| **Ensembl** | ensembl.org | Genome browser, annotations |
| **UCSC Genome Browser** | genome.ucsc.edu | Visualization, track data |
| **RefSeq** | ncbi.nlm.nih.gov/refseq | Curated reference sequences |

### Functional Annotation Databases

| Database | URL | Use Case |
|----------|-----|----------|
| **Gene Ontology (GO)** | geneontology.org | Function, process, location terms |
| **KEGG** | genome.jp/kegg | Pathways and modules |
| **Reactome** | reactome.org | Curated human pathways |
| **MSigDB** | gsea-msigdb.org | Gene sets for enrichment |
| **STRING** | string-db.org | Protein-protein interactions |

### Disease and Variant Databases

| Database | URL | Use Case |
|----------|-----|----------|
| **ClinVar** | ncbi.nlm.nih.gov/clinvar | Clinical variant significance |
| **COSMIC** | cancer.sanger.ac.uk/cosmic | Somatic mutations in cancer |
| **gnomAD** | gnomad.broadinstitute.org | Population allele frequencies |
| **OMIM** | omim.org | Mendelian disease genes |
| **DisGeNET** | disgenet.org | Gene-disease associations |

### Practical Database Query Example

```python
# Query Ensembl REST API for gene information
import requests

def get_gene_info(gene_symbol, species="homo_sapiens"):
    server = "https://rest.ensembl.org"
    ext = f"/lookup/symbol/{species}/{gene_symbol}?expand=1"
    
    r = requests.get(server + ext, headers={"Content-Type": "application/json"})
    
    if r.ok:
        return r.json()
    return None

# Get info for BRCA1
info = get_gene_info("BRCA1")
print(f"Gene: {info['display_name']}")
print(f"Location: {info['seq_region_name']}:{info['start']}-{info['end']}")
print(f"Biotype: {info['biotype']}")
print(f"Description: {info['description']}")
```

## Summary

Bioinformatics works best when biological concepts are clear. Understanding genes, expression, variation, epigenetics, pathways, and disease mechanisms helps you interpret computational results correctly and avoid false conclusions. This foundation will serve you throughout every downstream analysis.
