import json

with open(r'C:\Users\user\.gemini\antigravity\brain\31fcfa2f-ba26-47d7-9f8b-9b344e2094ae\.system_generated\logs\transcript_full.jsonl', 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        try:
            obj = json.loads(line)
            idx = obj.get('step_index', 0)
            if 1748 <= idx <= 1755:
                print(f"Step {idx} ({obj.get('source')} - {obj.get('type')}):")
                if obj.get('content'):
                    print(str(obj['content'])[:300])
                if obj.get('thinking'):
                    print('THINKING:', str(obj['thinking'])[:300])
        except Exception as e:
            pass

