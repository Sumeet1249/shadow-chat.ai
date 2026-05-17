#!/usr/bin/env python3
import re
import json
import argparse
import os

class DataSanitizer:
    """
    Cleans raw dialogue logs and redacts sensitive PII (emails, telephone numbers, api keys)
    prior to submitting logs to public AI fine-tuning runs.
    """
    def __init__(self):
        self.email_regex = re.compile(r'[\w\.-]+@[\w\.-]+\.\w+')
        self.phone_regex = re.compile(r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b')
        self.apikey_regex = re.compile(r'(sk-[a-zA-Z0-9]{32,})|(key-[a-zA-Z0-9]{32,})')

    def sanitize(self, text):
        if not isinstance(text, str):
            return text
        
        # Redact emails
        text = self.email_regex.sub("[REDACTED_EMAIL]", text)
        # Redact phones
        text = self.phone_regex.sub("[REDACTED_PHONE]", text)
        # Redact api keys
        text = self.apikey_regex.sub("[REDACTED_ACCESS_KEY]", text)
        
        return text.strip()

def run_sanitization(input_path, output_path):
    if not os.path.exists(input_path):
        # Create dummy dirty log
        mock_dirty = [
            {"prompt": "Call me at 555-123-4567 or email Caleb at caleb@shadow.ai", "response": "Acknowledged. API key is sk-1234567890abcdef1234567890abcdef"}
        ]
        with open(input_path, 'w', encoding='utf-8') as f:
            json.dump(mock_dirty, f, indent=2)

    with open(input_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    sanitizer = DataSanitizer()
    sanitized_data = []

    for item in data:
        sanitized_item = {}
        for key, value in item.items():
            sanitized_item[key] = sanitizer.sanitize(value)
        sanitized_data.append(sanitized_item)

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(sanitized_data, f, indent=2)

    print(f"PII Sanitization complete. Cleaned data written to: {output_path}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Raw Data Sanitizer Pipeline")
    parser.add_argument("--input", default="dirty_logs.json", help="Path to input json")
    parser.add_argument("--output", default="clean_logs.json", help="Path to write output")
    
    args = parser.parse_args()
    run_sanitization(args.input, args.output)
