import subprocess

out = subprocess.check_output(['git', 'show', '380f473:apps/web/src/app/page.tsx'], cwd=r'c:\Users\user\Desktop\Project\SchoolRide-LK-V2').decode('utf-8')
idx = out.find('{/* 1. HERO SECTION')
if idx == -1:
    idx = out.find('<section')
idx2 = out.find('{/* 2. INSTANT SCHOOL')

with open(r'c:\Users\user\Desktop\Project\SchoolRide-LK-V2\scripts\split_hero_extracted.txt', 'w', encoding='utf-8') as f:
    f.write(out[idx:idx2])

print('Successfully extracted hero section, length:', idx2 - idx)

