import numpy as np
from PIL import Image

for name in ['vango-hero-full.jpg', 'vango-hero-split-right.jpg', 'vango-van-kids.jpg', 'fleet-van-wide.jpg']:
    p = 'SchoolRide-LK-V2/apps/web/public/images/' + name
    im = Image.open(p)
    print(f"{name}: size={im.size}")
    # sample corner and center
    print("  corners:", im.getpixel((0,0)), im.getpixel((im.width-1, 0)), im.getpixel((0, im.height-1)), im.getpixel((im.width-1, im.height-1)))

