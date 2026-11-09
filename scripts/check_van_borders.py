import numpy as np
from PIL import Image

im = Image.open('SchoolRide-LK-V2/apps/web/public/images/vango-hero-right-2x.png')
w, h = im.size
arr = np.array(im)

# check right edge
right_col = arr[:, -1]
print('Right col unique alpha:', np.unique(right_col[:, 3]))
print('Right col RGB average:', right_col[:, :3].mean(axis=0))

# check top edge
top_row = arr[0, :]
print('Top row RGB average:', top_row[:, :3].mean(axis=0))

# check bottom row
bot_row = arr[-1, :]
print('Bottom row RGB average:', bot_row[:, :3].mean(axis=0))

