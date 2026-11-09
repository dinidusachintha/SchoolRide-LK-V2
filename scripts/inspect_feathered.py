import numpy as np
from PIL import Image

im = Image.open('SchoolRide-LK-V2/apps/web/public/images/vango-hero-right-feathered.png')
print('vango-hero-right-feathered size:', im.size)
arr = np.array(im)
print('Corner (0,0):', arr[0, 0])
print('Corner (0, -1):', arr[0, -1])
print('Corner (-1, 0):', arr[-1, 0])
print('Corner (-1, -1):', arr[-1, -1])

