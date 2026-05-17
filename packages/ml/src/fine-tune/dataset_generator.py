#!/usr/bin/env python3
import json
import argparse
import os

def convert_to_huggingface_format(input_path, output_path, persona_name):
    """
    Transforms raw persona logs into standard ChatML/HuggingFace conversations format
    for fine-tuning Llama/Mistral models.
    """
    if not os.path.exists(input_path):
        print(f"Error: Input file {input_path} does not exist. Creating mock dataset instead...")
        # Write dummy raw dataset for demonstration
        mock_data = [
            {"prompt": "What is the key to autonomous system scale?", "response": "Local edge coordination with zero static cold starts."},
            {"prompt": "Why decentralized networks?", "response": "Resiliency is privacy. Centralized servers are single points of failure."}
        ]
        with open(input_path, 'w', encoding='utf-8') as f:
            json.dump(mock_data, f, indent=2)
            
    with open(input_path, 'r', encoding='utf-8') as f:
        raw_entries = json.load(f)

    hf_dataset = []
    system_prompt = f"You are {persona_name}, a specialized neural agent who replies analytically and concisely. Avoid generic words."

    for index, entry in enumerate(raw_entries):
        hf_dataset.append({
            "id": f"trial_{index:04d}",
            "conversations": [
                {"from": "system", "value": system_prompt},
                {"from": "human", "value": entry.get("prompt", "")},
                {"from": "gpt", "value": entry.get("response", "")}
            ]
        })

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(hf_dataset, f, indent=2)
        print(f"Success! Saved {len(hf_dataset)} ChatML entries to: {output_path}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Shadow Node Dataset Curation Utility")
    parser.add_argument("--input", default="raw_persona_data.json", help="Path to raw json logs")
    parser.add_argument("--output", default="fine_tune_ready.json", help="Path to write formatted dataset")
    parser.add_argument("--persona", default="Caleb_Shadow", help="Target persona name")
    
    args = parser.parse_args()
    convert_to_huggingface_format(args.input, args.output, args.persona)
