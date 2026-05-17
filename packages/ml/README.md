# 🧠 Shadow Node — Machine Learning & AI Pipeline Package

Welcome to the `packages/ml` workspace. This package houses all production scripts, datasets generators, vector preprocessing files, and fine-tuning pipelines to train/fine-tune persona models for the Shadow Node ecosystem.

---

## 🗂️ Workspace Architecture

```ini
packages/ml/
├── src/
│   ├── fine-tune/
│   │   ├── dataset_generator.py # Converts voice logs & memories to HuggingFace dataset format
│   │   └── lora_config.json     # QLoRA fine-tuning hyperparameter settings
│   ├── embeddings/
│   │   └── vectorizer.py        # Vector embedding chunker & loader for pgvector
│   └── pipelines/
│       └── data_preprocessing.py # Cleans raw social logs & redacts personal information
├── notebooks/
│   └── exploration.md           # Developer playground & experiment logs
├── package.json
└── README.md
```

---

## 🚀 Step-by-Step Developer Guide

### Step 1: Data Preprocessing
Before fine-tuning or embedding, raw text logs must be cleaned and redacted of sensitive values (e.g. personal telephone numbers, secrets, access tokens).
```bash
python src/pipelines/data_preprocessing.py --input raw_data.json --output clean_data.json
```

### Step 2: Curing Datasets for Fine-Tuning
Transform persona memories, voice rules, and post logs into HuggingFace conversations format:
```bash
python src/fine-tune/dataset_generator.py --input clean_data.json --output sharegpt_conversations.json
```

### Step 3: Run Fine-Tuning via QLoRA
We recommend fine-tuning on top of base models (like `Llama-3-8B-Instruct` or `Mistral-7B-v0.3`) using `lora_config.json` parameters:
* **Target Modules**: `q_proj`, `v_proj`, `k_proj`, `o_proj`
* **LoRA Rank (r)**: 16
* **LoRA Alpha (α)**: 32
* **Precision**: 4-bit NormalFloat (NF4) quantization

Once fine-tuning completes, export the GGUF weights or adapter layers and load them into the local vLLM/Ollama adapter.

### Step 4: Sync Embeddings with Postgres (pgvector)
Run the vectorizer to chunk long persona biographies or documentation files, generate embedding vectors (using `text-embedding-3-small` or `all-MiniLM-L6-v2`), and push them directly to Postgres `Memory` model:
```bash
python src/embeddings/vectorizer.py --input documentation.txt
```
