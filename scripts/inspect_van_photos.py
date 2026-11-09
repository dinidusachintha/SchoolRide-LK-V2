import os
from PIL import Image

for name in ['fleet-van-wide.jpg', 'van-vehicle-focus.jpg', 'van-front-focus.jpg', 'van-side-badge.jpg']:
    p = 'SchoolRide-LK-V2/apps/web/public/images/' + name
    if os.path.exists(p):
        im = Image.open(p)
        print(name, im.size, im.mode)

