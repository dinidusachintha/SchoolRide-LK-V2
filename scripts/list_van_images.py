import os
from PIL import Image

img_dir = 'SchoolRide-LK-V2/apps/web/public/images'
for f in os.listdir(img_dir):
    if any(k in f.lower() for k in ['van', 'hero', 'fleet']):
        p = os.path.join(img_dir, f)
        im = Image.open(p)
        print(f"{f}: size={im.size}, mode={im.mode}")

