import json

with open(r'C:\Users\user\.gemini\antigravity\brain\31fcfa2f-ba26-47d7-9f8b-9b344e2094ae\.system_generated\logs\transcript_full.jsonl', 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        try:
            obj = json.loads(line)
            idx = obj.get('step_index', 0)
            if idx in (1749, 1751, 1753):
                print(f"=== STEP {idx} ===")
                print(obj.get('thinking', ''))
        except Exception:
            pass

