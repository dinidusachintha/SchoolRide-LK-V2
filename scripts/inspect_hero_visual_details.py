from PIL import Image

im = Image.open('SchoolRide-LK-V2/apps/web/public/images/hero-visual.jpg')
print('hero-visual.jpg size:', im.size)
# check color distribution
import numpy as np
arr = np.array(im)
print('Average color:', arr.mean(axis=(0,1)))

