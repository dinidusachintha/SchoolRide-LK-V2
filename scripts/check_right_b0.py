import numpy as np
from PIL import Image

im = Image.open('SchoolRide-LK-V2/apps/web/public/images/right_media_1794117255183_b0dc01e9.png')
arr = np.array(im)
print('Right half size:', im.size)
# Check non-white pixels
mask = (arr[:,:,0] < 245) | (arr[:,:,1] < 245) | (arr[:,:,2] < 245)
print('Non-white percentage in right half:', mask.mean() * 100)
# Check average color of non-white
if mask.any():
    print('Average color of non-white in right half:', arr[mask].mean(axis=0))

