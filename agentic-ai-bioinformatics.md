---
layout: default
title: Agentic AI for Bioinformatics
description: Step-by-step tutorial on using AI agents to automate RNA-seq differential expression and functional analysis.
permalink: /agentic-ai-bioinformatics/
---

# Agentic AI for Bioinformatics

![Agentic AI for Bioinformatics banner]({{ '/assets/banners/agentic-ai.svg' | relative_url }})

Agentic AI represents a paradigm shift in how we approach computational biology. Instead of manually executing each analysis step, AI agents can autonomously plan and execute complex bioinformatics workflows while adapting to your data.

## Learning Goals

<section class="learning-goals-card" markdown="1">
By the end of this tutorial, you should be able to:

1. Understand what agentic AI means and how it differs from traditional automation.
2. Set up an AI agent for bioinformatics using Python and LangChain.
3. Build an end-to-end RNA-seq analysis agent that takes a count matrix to functional interpretation.
4. Create custom tools that AI agents can call for specialized analyses.
5. Implement human-in-the-loop checkpoints for critical decisions.
</section>

## What is Agentic AI?

**Traditional automation**: You write a fixed script that executes predetermined steps in order.

**Agentic AI**: An AI system that can:
- **Reason** about what analysis steps are needed
- **Plan** a workflow dynamically based on your data and questions
- **Execute** code and tools to perform analyses
- **Adapt** when unexpected results occur (e.g., batch effects, low-quality samples)
- **Interpret** results and suggest next steps

```
Traditional Pipeline:        Agentic AI:
─────────────────          ──────────────────
Step 1 → Step 2            User: "Analyze this 
    ↓                             count matrix"
Step 3 → Step 4                    ↓
    ↓                      Agent reasons: "I should
Step 5 (done)                first check quality..."
                                   ↓
                           Agent executes QC code
                                   ↓
                           Agent reasons: "Batch
                             effects detected,
                             I'll correct..."
                                   ↓
                           Agent adapts plan → DE
                                   ↓
                           Agent interprets & reports
```

## Prerequisites

```bash
# Install required packages
pip install langchain langchain-openai langchain-experimental
pip install pandas numpy scipy
pip install pydeseq2 gseapy
pip install matplotlib seaborn

# For local LLMs (optional, privacy-preserving)
pip install ollama
```

## Part 1: Simple LLM-Assisted Analysis

Before building full agents, let's start with LLM-assisted code generation.

### Using LLMs to Write Analysis Code

```python
import os
from langchain_openai import ChatOpenAI
from langchain.schema import HumanMessage, SystemMessage

# Initialize LLM (set your API key)
os.environ["OPENAI_API_KEY"] = "your-api-key-here"
llm = ChatOpenAI(model="gpt-4o", temperature=0)

# Ask LLM to generate analysis code
messages = [
    SystemMessage(content="""You are a bioinformatics expert. 
    Generate clean, well-commented Python code for RNA-seq analysis.
    Use standard libraries: pandas, numpy, pydeseq2, gseapy, matplotlib."""),
    HumanMessage(content="""
    I have an RNA-seq count matrix (counts.csv) with genes as rows and samples as columns.
    Sample names contain 'Control' or 'Treated' indicating the condition.
    Generate code to:
    1. Load and explore the data
    2. Create a DESeq2-style metadata table from column names
    3. Run differential expression analysis
    4. Make a volcano plot
    """)
]

response = llm.invoke(messages)
print(response.content)
```

### Generated Code Example

The LLM might generate something like:

```python
import pandas as pd
import numpy as np
from pydeseq2.dds import DeseqDataSet
from pydeseq2.ds import DeseqStats
import matplotlib.pyplot as plt

# 1. Load the count matrix
counts = pd.read_csv("counts.csv", index_col=0)
print(f"Shape: {counts.shape}")
print(f"Samples: {counts.columns.tolist()}")

# 2. Create metadata from sample names
metadata = pd.DataFrame({
    'sample': counts.columns,
    'condition': ['Control' if 'Control' in s else 'Treated' 
                  for s in counts.columns]
})
metadata = metadata.set_index('sample')
print(metadata.head())

# 3. Differential expression with PyDESeq2
dds = DeseqDataSet(
    counts=counts.T,  # PyDESeq2 expects samples x genes
    metadata=metadata,
    design_factors="condition"
)

# Fit the model
dds.deseq2()

# Get results
stat_res = DeseqStats(dds, contrast=["condition", "Treated", "Control"])
stat_res.summary()
results = stat_res.results_df

# 4. Volcano plot
fig, ax = plt.subplots(figsize=(10, 8))

# Significance thresholds
padj_thresh = 0.05
log2fc_thresh = 1

# Color points by significance
colors = []
for _, row in results.iterrows():
    if row['padj'] < padj_thresh and abs(row['log2FoldChange']) > log2fc_thresh:
        colors.append('red' if row['log2FoldChange'] > 0 else 'blue')
    else:
        colors.append('gray')

ax.scatter(results['log2FoldChange'], -np.log10(results['padj']), 
           c=colors, alpha=0.5, s=10)
ax.axhline(-np.log10(padj_thresh), color='black', linestyle='--', alpha=0.5)
ax.axvline(log2fc_thresh, color='black', linestyle='--', alpha=0.5)
ax.axvline(-log2fc_thresh, color='black', linestyle='--', alpha=0.5)

ax.set_xlabel('Log2 Fold Change')
ax.set_ylabel('-Log10 Adjusted P-value')
ax.set_title('Volcano Plot: Treated vs Control')
plt.savefig('volcano_plot.png', dpi=150, bbox_inches='tight')
plt.show()

# Save results
results.to_csv('de_results.csv')
print(f"Significant genes (|log2FC| > 1, padj < 0.05): {sum(colors != 'gray')}")
```

## Part 2: Building a Full RNA-seq Analysis Agent

Now let's create an autonomous agent that can perform end-to-end analysis.

### Define Analysis Tools

```python
from langchain.tools import tool
from langchain.agents import AgentExecutor, create_openai_tools_agent
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
import pandas as pd
import numpy as np

# Tool 1: Load and explore data
@tool
def load_count_matrix(file_path: str) -> str:
    """
    Load an RNA-seq count matrix from CSV and return summary statistics.
    The file should have genes as rows and samples as columns.
    """
    try:
        counts = pd.read_csv(file_path, index_col=0)
        
        # Store globally for other tools
        global COUNTS_MATRIX, SAMPLE_NAMES
        COUNTS_MATRIX = counts
        SAMPLE_NAMES = counts.columns.tolist()
        
        # Summary
        summary = f"""
        Count matrix loaded successfully!
        
        Dimensions: {counts.shape[0]} genes x {counts.shape[1]} samples
        
        Sample names: {', '.join(counts.columns[:10])}{'...' if len(counts.columns) > 10 else ''}
        
        Library sizes (total counts per sample):
        - Min: {counts.sum().min():,.0f}
        - Max: {counts.sum().max():,.0f}
        - Median: {counts.sum().median():,.0f}
        
        Genes with zero counts across all samples: {(counts.sum(axis=1) == 0).sum()}
        
        Top 5 highest expressed genes:
        {counts.sum(axis=1).nlargest(5).to_string()}
        """
        return summary
    except Exception as e:
        return f"Error loading file: {str(e)}"

# Tool 2: Create metadata from sample names
@tool
def create_metadata(pattern: str) -> str:
    """
    Create sample metadata by parsing sample names.
    Input pattern describes how to extract condition from sample names.
    Example pattern: "Control vs Treated" means samples contain these keywords.
    """
    global SAMPLE_NAMES, METADATA
    
    if 'Control' in pattern and 'Treated' in pattern:
        conditions = []
        for s in SAMPLE_NAMES:
            if 'control' in s.lower() or 'ctrl' in s.lower():
                conditions.append('Control')
            elif 'treated' in s.lower() or 'treat' in s.lower():
                conditions.append('Treated')
            else:
                conditions.append('Unknown')
        
        METADATA = pd.DataFrame({
            'sample': SAMPLE_NAMES,
            'condition': conditions
        }).set_index('sample')
        
        return f"""
        Metadata created:
        
        {METADATA.value_counts().to_string()}
        
        Sample assignments:
        {METADATA.head(10).to_string()}
        """
    else:
        return "Could not parse pattern. Please specify 'Control vs Treated' or similar."

# Tool 3: Run differential expression
@tool
def run_differential_expression(contrast: str) -> str:
    """
    Run DESeq2-style differential expression analysis.
    Input contrast should be like 'Treated vs Control'.
    Returns summary of significant genes.
    """
    global COUNTS_MATRIX, METADATA, DE_RESULTS
    
    try:
        from pydeseq2.dds import DeseqDataSet
        from pydeseq2.ds import DeseqStats
        
        # Parse contrast
        parts = contrast.split(' vs ')
        if len(parts) != 2:
            return "Invalid contrast format. Use 'Treated vs Control'"
        
        treatment, reference = parts[0].strip(), parts[1].strip()
        
        # Filter low counts
        counts_filtered = COUNTS_MATRIX.loc[COUNTS_MATRIX.sum(axis=1) >= 10]
        
        # Run DESeq2
        dds = DeseqDataSet(
            counts=counts_filtered.T,
            metadata=METADATA,
            design_factors="condition"
        )
        dds.deseq2()
        
        stat_res = DeseqStats(dds, contrast=["condition", treatment, reference])
        stat_res.summary()
        DE_RESULTS = stat_res.results_df
        
        # Summarize
        sig = DE_RESULTS[(DE_RESULTS['padj'] < 0.05) & 
                         (DE_RESULTS['log2FoldChange'].abs() > 1)]
        up = sig[sig['log2FoldChange'] > 0]
        down = sig[sig['log2FoldChange'] < 0]
        
        DE_RESULTS.to_csv('de_results.csv')
        
        return f"""
        Differential Expression Analysis Complete!
        
        Contrast: {treatment} vs {reference}
        
        Total genes tested: {len(DE_RESULTS)}
        Significant (|log2FC| > 1, padj < 0.05): {len(sig)}
        - Upregulated: {len(up)}
        - Downregulated: {len(down)}
        
        Top 10 upregulated genes:
        {up.nlargest(10, 'log2FoldChange')[['log2FoldChange', 'padj']].to_string()}
        
        Top 10 downregulated genes:
        {down.nsmallest(10, 'log2FoldChange')[['log2FoldChange', 'padj']].to_string()}
        
        Results saved to: de_results.csv
        """
    except Exception as e:
        return f"Error in DE analysis: {str(e)}"

# Tool 4: Run pathway enrichment
@tool
def run_pathway_enrichment(gene_set: str) -> str:
    """
    Run Gene Ontology and KEGG pathway enrichment on DE genes.
    Input gene_set should be 'upregulated', 'downregulated', or 'all'.
    """
    global DE_RESULTS
    
    try:
        import gseapy as gp
        
        sig = DE_RESULTS[(DE_RESULTS['padj'] < 0.05) & 
                         (DE_RESULTS['log2FoldChange'].abs() > 1)]
        
        if gene_set == 'upregulated':
            genes = sig[sig['log2FoldChange'] > 0].index.tolist()
        elif gene_set == 'downregulated':
            genes = sig[sig['log2FoldChange'] < 0].index.tolist()
        else:
            genes = sig.index.tolist()
        
        if len(genes) < 5:
            return f"Too few genes ({len(genes)}) for enrichment analysis."
        
        # Run enrichment
        enr = gp.enrichr(
            gene_list=genes,
            gene_sets=['GO_Biological_Process_2021', 'KEGG_2021_Human'],
            organism='human'
        )
        
        results = enr.results
        results.to_csv(f'enrichment_{gene_set}.csv', index=False)
        
        # Top pathways
        top_pathways = results.nsmallest(15, 'Adjusted P-value')
        
        return f"""
        Pathway Enrichment Results ({gene_set}):
        
        Input genes: {len(genes)}
        
        Top 15 enriched pathways:
        {top_pathways[['Term', 'Adjusted P-value', 'Genes']].to_string()}
        
        Full results saved to: enrichment_{gene_set}.csv
        """
    except Exception as e:
        return f"Error in enrichment: {str(e)}"

# Tool 5: Create visualizations
@tool
def create_visualization(plot_type: str) -> str:
    """
    Create visualization of DE results.
    Input plot_type should be: 'volcano', 'ma', 'heatmap', or 'pca'.
    """
    global COUNTS_MATRIX, METADATA, DE_RESULTS
    
    import matplotlib.pyplot as plt
    import seaborn as sns
    
    try:
        if plot_type == 'volcano':
            fig, ax = plt.subplots(figsize=(10, 8))
            
            # Color by significance
            sig_up = (DE_RESULTS['padj'] < 0.05) & (DE_RESULTS['log2FoldChange'] > 1)
            sig_down = (DE_RESULTS['padj'] < 0.05) & (DE_RESULTS['log2FoldChange'] < -1)
            
            ax.scatter(DE_RESULTS.loc[~(sig_up | sig_down), 'log2FoldChange'],
                      -np.log10(DE_RESULTS.loc[~(sig_up | sig_down), 'padj']),
                      c='gray', alpha=0.3, s=5, label='NS')
            ax.scatter(DE_RESULTS.loc[sig_up, 'log2FoldChange'],
                      -np.log10(DE_RESULTS.loc[sig_up, 'padj']),
                      c='red', alpha=0.5, s=10, label='Up')
            ax.scatter(DE_RESULTS.loc[sig_down, 'log2FoldChange'],
                      -np.log10(DE_RESULTS.loc[sig_down, 'padj']),
                      c='blue', alpha=0.5, s=10, label='Down')
            
            ax.set_xlabel('Log2 Fold Change')
            ax.set_ylabel('-Log10 Adjusted P-value')
            ax.legend()
            plt.savefig('volcano_plot.png', dpi=150, bbox_inches='tight')
            plt.close()
            
            return "Volcano plot saved to: volcano_plot.png"
            
        elif plot_type == 'heatmap':
            # Top DE genes heatmap
            top_genes = DE_RESULTS.nlargest(50, 'log2FoldChange').index
            
            # Z-score normalization
            log_counts = np.log2(COUNTS_MATRIX.loc[top_genes] + 1)
            z_scores = (log_counts.T - log_counts.mean(axis=1)) / log_counts.std(axis=1)
            z_scores = z_scores.T
            
            fig, ax = plt.subplots(figsize=(12, 10))
            sns.heatmap(z_scores, cmap='RdBu_r', center=0, 
                       yticklabels=True, xticklabels=True, ax=ax)
            plt.title('Top 50 Upregulated Genes (Z-score)')
            plt.tight_layout()
            plt.savefig('heatmap.png', dpi=150, bbox_inches='tight')
            plt.close()
            
            return "Heatmap saved to: heatmap.png"
            
        elif plot_type == 'pca':
            from sklearn.decomposition import PCA
            from sklearn.preprocessing import StandardScaler
            
            log_counts = np.log2(COUNTS_MATRIX + 1)
            scaler = StandardScaler()
            scaled = scaler.fit_transform(log_counts.T)
            
            pca = PCA(n_components=2)
            pcs = pca.fit_transform(scaled)
            
            pca_df = pd.DataFrame({
                'PC1': pcs[:, 0],
                'PC2': pcs[:, 1],
                'Condition': METADATA['condition'].values
            })
            
            fig, ax = plt.subplots(figsize=(8, 8))
            for condition in pca_df['Condition'].unique():
                mask = pca_df['Condition'] == condition
                ax.scatter(pca_df.loc[mask, 'PC1'], 
                          pca_df.loc[mask, 'PC2'],
                          label=condition, s=100, alpha=0.7)
            
            ax.set_xlabel(f'PC1 ({pca.explained_variance_ratio_[0]*100:.1f}%)')
            ax.set_ylabel(f'PC2 ({pca.explained_variance_ratio_[1]*100:.1f}%)')
            ax.legend()
            plt.title('PCA of Samples')
            plt.savefig('pca_plot.png', dpi=150, bbox_inches='tight')
            plt.close()
            
            return "PCA plot saved to: pca_plot.png"
        else:
            return f"Unknown plot type: {plot_type}. Use 'volcano', 'heatmap', or 'pca'."
            
    except Exception as e:
        return f"Error creating {plot_type}: {str(e)}"

# Tool 6: Generate report
@tool
def generate_summary_report() -> str:
    """
    Generate a comprehensive markdown report summarizing all analyses.
    """
    global DE_RESULTS, METADATA
    
    sig = DE_RESULTS[(DE_RESULTS['padj'] < 0.05) & 
                     (DE_RESULTS['log2FoldChange'].abs() > 1)]
    
    report = f"""
# RNA-seq Analysis Report

## Dataset Summary
- Total samples: {len(METADATA)}
- Conditions: {METADATA['condition'].value_counts().to_dict()}
- Total genes analyzed: {len(DE_RESULTS)}

## Differential Expression Results
- Significant genes (|log2FC| > 1, padj < 0.05): {len(sig)}
- Upregulated: {len(sig[sig['log2FoldChange'] > 0])}
- Downregulated: {len(sig[sig['log2FoldChange'] < 0])}

## Top Upregulated Genes
```
{sig.nlargest(10, 'log2FoldChange')[['log2FoldChange', 'padj']].to_string()}
```

## Top Downregulated Genes
```
{sig.nsmallest(10, 'log2FoldChange')[['log2FoldChange', 'padj']].to_string()}
```

## Generated Files
- de_results.csv: Full differential expression results
- volcano_plot.png: Volcano plot visualization
- heatmap.png: Top genes heatmap
- pca_plot.png: Sample PCA
- enrichment_*.csv: Pathway enrichment results

## Analysis Notes
This analysis was performed using an AI agent with the following steps:
1. Data loading and quality assessment
2. Metadata extraction from sample names
3. Differential expression (DESeq2-style)
4. Pathway enrichment (GO and KEGG)
5. Visualization generation

Report generated automatically.
    """
    
    with open('analysis_report.md', 'w') as f:
        f.write(report)
    
    return "Report saved to: analysis_report.md\n\n" + report
```

### Create the Agent

```python
# Combine tools
tools = [
    load_count_matrix,
    create_metadata,
    run_differential_expression,
    run_pathway_enrichment,
    create_visualization,
    generate_summary_report
]

# Create prompt
prompt = ChatPromptTemplate.from_messages([
    ("system", """You are an expert bioinformatics analyst specializing in RNA-seq analysis.
    
Your goal is to perform comprehensive analysis of RNA-seq data, from count matrices to biological interpretation.

When analyzing data:
1. Always start by loading and exploring the data to understand its structure
2. Check for quality issues (library sizes, zero counts, etc.)
3. Create appropriate metadata based on sample naming patterns
4. Perform differential expression analysis
5. Create visualizations (volcano plot, PCA, heatmap)
6. Run pathway enrichment on significant genes
7. Generate a summary report

Be thorough but efficient. Explain your reasoning at each step.
If you encounter errors, try to diagnose and fix them.
"""),
    MessagesPlaceholder(variable_name="chat_history", optional=True),
    ("human", "{input}"),
    MessagesPlaceholder(variable_name="agent_scratchpad")
])

# Create agent
llm = ChatOpenAI(model="gpt-4o", temperature=0)
agent = create_openai_tools_agent(llm, tools, prompt)
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)
```

### Run the Agent

```python
# Single command to run full analysis!
result = agent_executor.invoke({
    "input": """
    I have an RNA-seq count matrix at 'counts.csv'. 
    The samples are labeled with 'Control' or 'Treated' in their names.
    
    Please perform a complete differential expression analysis:
    1. Load the data and check quality
    2. Set up the comparison: Treated vs Control
    3. Find differentially expressed genes
    4. Create a volcano plot and PCA
    5. Run pathway enrichment on upregulated genes
    6. Generate a summary report
    """
})

print(result["output"])
```

## Part 3: Advanced Agent Patterns

### Human-in-the-Loop Agent

For critical decisions, involve human review:

```python
from langchain.tools import tool

@tool
def request_human_review(question: str, options: list = None) -> str:
    """
    Request human input for critical analysis decisions.
    Use this when there's ambiguity or the decision could significantly impact results.
    """
    print("\n" + "="*50)
    print("🔔 HUMAN REVIEW REQUESTED")
    print("="*50)
    print(f"\nQuestion: {question}")
    
    if options:
        print("\nOptions:")
        for i, opt in enumerate(options, 1):
            print(f"  {i}. {opt}")
        print()
    
    response = input("Your response: ")
    
    return f"Human responded: {response}"

# Example usage in agent
"""
Agent: "I detected potential batch effects in the PCA. The samples cluster by 
sequencing date rather than condition. Should I:
1. Proceed without batch correction
2. Apply ComBat batch correction
3. Include batch as covariate in the model"