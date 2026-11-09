import numpy as np
from PIL import Image

im = Image.open('SchoolRide-LK-V2/apps/web/public/images/vango-hero-right-2x.png')
print('vango-hero-right-2x size:', im.size)

# Let's inspect the background around the van in vango-hero-right-2x.png
arr = np.array(im)
# Corners
print('Corner (0,0):', arr[0, 0])
print('Corner (0, -1):', arr[0, -1])
print('Corner (-1, 0):', arr[-1, 0])
print('Corner (-1, -1):', arr[-1, -1])

