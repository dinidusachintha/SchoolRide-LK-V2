import re

nav_path = r'C:\Users\user\Desktop\Project\SchoolRide-LK-V2\apps\web\src\components\navbar.tsx'
with open(nav_path, 'r', encoding='utf-8') as f:
    text = f.read()

# Remove the LK badge
text = re.sub(r'<span className="text-\[9px\] font-bold px-1\.5 py-0\.5 rounded bg-emerald-100[\s\S]*?LK\s*</span>', '', text)

with open(nav_path, 'w', encoding='utf-8') as f:
    f.write(text)

print('Successfully cleaned navbar.tsx!')

