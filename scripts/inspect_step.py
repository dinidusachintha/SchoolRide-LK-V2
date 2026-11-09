import json

with open(r'C:\Users\user\.gemini\antigravity\brain\31fcfa2f-ba26-47d7-9f8b-9b344e2094ae\.system_generated\logs\transcript_full.jsonl', 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        if '"step_index": 1749' in line or '"step_index":1749' in line:
            obj = json.loads(line)
            print('Thinking:', obj.get('thinking', '')[:1200])
            break

