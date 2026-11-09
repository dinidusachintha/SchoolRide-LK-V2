import os
from PIL import Image

for name in ['fleet-van-wide.jpg', 'van-vehicle-focus.jpg']:
    p = 'SchoolRide-LK-V2/apps/web/public/images/' + name
    im = Image.open(p)
    print(name, 'size:', im.size)
    # sample some pixels
    print('  top-left:', im.getpixel((10, 10)))
    print('  center:', im.getpixel((im.width//2, im.height//2)))
    print('  bottom-center:', im.getpixel((im.width//2, im.height - 20)))

