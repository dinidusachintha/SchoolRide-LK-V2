import os

page_path = os.path.join('SchoolRide-LK-V2', 'apps', 'web', 'src', 'app', 'page.tsx')

with open(page_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add import
import_line = "import { HowItWorksSlideshow } from '@/components/how-it-works-slideshow';\n"
if "HowItWorksSlideshow" not in content:
    marker = "import { SchoolCardSkeleton } from '@/components/ui/skeleton';\n"
    content = content.replace(marker, marker + import_line, 1)

# 2. Locate #how-it-works section and replace static grid with HowItWorksSlideshow
start_str = '<section id="how-it-works"'
end_str = '</section>'

start_pos = content.find(start_str)
end_pos = content.find(end_str, start_pos) + len(end_str)

section_text = content[start_pos:end_pos]

grid_start_marker = '<div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-left">'
grid_idx = section_text.find(grid_start_marker)

if grid_idx != -1:
    # Everything before grid_idx in the section stays
    section_head = section_text[:grid_idx]
    
    # We want:
    # section_head + '<HowItWorksSlideshow />\n        </div>\n      </section>'
    new_section = section_head + '<HowItWorksSlideshow />\n        </div>\n      </section>'
    content = content[:start_pos] + new_section + content[end_pos:]
    
    with open(page_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully replaced static grid with HowItWorksSlideshow in page.tsx!")
else:
    print("Error: grid_start_marker not found in section.")

