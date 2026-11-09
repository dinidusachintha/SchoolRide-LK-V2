import numpy as np
from PIL import Image

# Let's inspect the building crop from the template
bldg = Image.open('SchoolRide-LK-V2/apps/web/public/images/architectural-backdrop.jpg')
print('Building crop size:', bldg.size)

# The building is 370 x 410. In the template:
# The building occupies a rectangle.
# Let's upscale the building backdrop with Lanczos
w_bldg, h_bldg = 600, 650
bldg_hd = bldg.crop((0, 0, bldg.width, int(bldg.height * 0.65))).resize((w_bldg, int(h_bldg * 0.65)), Image.Resampling.LANCZOS)

# Create a clean canvas for the composite
canvas_w, canvas_h = 950, 750
canvas = Image.new('RGBA', (canvas_w, canvas_h), (255, 255, 255, 0))

# Place building box on the right
# x offset from right:
bldg_x = canvas_w - w_bldg - 20
bldg_y = 40

# Create full building with road
full_bldg = Image.new('RGBA', (w_bldg, h_bldg), (240, 242, 245, 255))
full_bldg.paste(bldg_hd, (0, 0))
# Add road asphalt at the bottom of building
road = Image.new('RGBA', (w_bldg, h_bldg - bldg_hd.height), (120, 125, 130, 255))
full_bldg.paste(road, (0, bldg_hd.height))

# Paste building onto canvas
canvas.paste(full_bldg, (bldg_x, bldg_y))

# Now paste the School Van in front, breaking out to the left!
van = Image.open('SchoolRide-LK-V2/apps/web/public/images/vango-hero-right-2x.png')
# Scale van to fit dynamically
van_scaled = van.resize((820, int(820 * van.height / van.width)), Image.Resampling.LANCZOS)

# The van will be positioned so its left side sticks out past bldg_x by ~150px
van_x = bldg_x - 180
van_y = canvas_h - van_scaled.height - 30

canvas.alpha_composite(van_scaled, (van_x, van_y))
canvas.save('SchoolRide-LK-V2/apps/web/public/images/schoolride-hero-composite.png', 'PNG')
print('Saved schoolride-hero-composite.png:', canvas.size)

