import numpy as np
from PIL import Image

im = Image.open('SchoolRide-LK-V2/apps/web/public/images/vango-hero-right-2x.png')
arr = np.array(im)
print('Shape:', arr.shape)

# Let's inspect the colors along the top, right, and bottom edges
top_edge = arr[0, :, :3]
right_edge = arr[:, -1, :3]
bottom_edge = arr[-1, :, :3]

print('Top edge min/max:', top_edge.min(axis=0), top_edge.max(axis=0))
print('Right edge min/max:', right_edge.min(axis=0), right_edge.max(axis=0))
print('Bottom edge min/max:', bottom_edge.min(axis=0), bottom_edge.max(axis=0))

