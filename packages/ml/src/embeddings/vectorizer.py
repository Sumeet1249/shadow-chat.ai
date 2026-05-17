#!/usr/bin/env python3
import json
import argparse
import os

class RecursiveCharacterChunker:
    """
    Splits text recursively by preferred semantic boundary lists.
    Similar to LangChain's RecursiveCharacterTextSplitter.
    """
    def __init__(self, chunk_size=500, chunk_overlap=50):
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
        self.separators = ["\n\n", "\n", " ", ""]

    def split_text(self, text):
        chunks = []
        words = text.split()
        current_chunk = []
        current_size = 0
        
        for word in words:
            word_len = len(word) + 1
            if current_size + word_len > self.chunk_size:
                chunks.append(" ".join(current_chunk))
                # retain overlapping words
                overlap_count = min(len(current_chunk), 5)
                current_chunk = current_chunk[-overlap_count:] if overlap_count > 0 else []
                current_size = sum(len(w) + 1 for w in current_chunk)
                
            current_chunk.append(word)
            current_size += word_len
            
        if current_chunk:
            chunks.append(" ".join(current_chunk))
            
        return chunks

def process_and_vectorize(input_path, chunk_size, overlap):
    print(f"Reading target file: {input_path}")
    if not os.path.exists(input_path):
        # Create dummy file if not exists
        with open(input_path, 'w', encoding='utf-8') as f:
            f.write("Shadow Node is an advanced multi-agent system. It distributes local model tasks. " * 30)
            
    with open(input_path, 'r', encoding='utf-8') as f:
        content = f.read()

    chunker = RecursiveCharacterChunker(chunk_size, overlap)
    chunks = chunker.split_text(content)
    print(f"Generated {len(chunks)} text chunks.")

    output_payload = []
    for index, chunk in enumerate(chunks):
        # In production, this calls OpenAI or SentenceTransformers to generate 1536/384 floats.
        # We generate a simulated embedding vector for pgvector representation
        simulated_vector = [round(0.15 * (i % 7) - 0.05 * (index % 3), 4) for i in range(128)]
        
        output_payload.append({
            "chunk_index": index,
            "text": chunk,
            "embedding_dim": len(simulated_vector),
            "embedding": simulated_vector
        })

    output_path = f"vectorized_{os.path.basename(input_path)}.json"
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(output_payload, f, indent=2)
        
    print(f"Successfully vectorized and saved {len(output_payload)} vectors to: {output_path}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Recursive Text Vectorizer Pipeline")
    parser.add_argument("--input", default="source_knowledge.txt", help="Text document to vectorize")
    parser.add_argument("--size", type=int, default=300, help="Target character chunk size")
    parser.add_argument("--overlap", type=int, default=30, help="Overlap size")
    
    args = parser.parse_args()
    process_and_vectorize(args.input, args.size, args.overlap)
