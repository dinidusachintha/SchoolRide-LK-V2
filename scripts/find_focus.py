with open(r'C:\Users\user\.gemini\antigravity\brain\31fcfa2f-ba26-47d7-9f8b-9b344e2094ae\.system_generated\logs\transcript.jsonl', 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        if 'van-vehicle-focus.jpg' in line:
            print(line[:300])

