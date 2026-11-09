import numpy as np
from PIL import Image

im = Image.open('SchoolRide-LK-V2/apps/web/public/images/user_upload_b0dc01e9.png')
print('Size:', im.size)

# Let's crop into 4 quadrants to see where content is located
w, h = im.size
q1 = im.crop((0, 0, w//2, h//2)) # Top Left
q2 = im.crop((w//2, 0, w, h//2)) # Top Right
q3 = im.crop((0, h//2, w//2, h)) # Bottom Left
q4 = im.crop((w//2, h//2, w, h)) # Bottom Right

for name, q in [('Top-Left', q1), ('Top-Right', q2), ('Bottom-Left', q3), ('Bottom-Right', q4)]:
    arr = np.array(q)
    # non white
    non_white = ((arr[:,:,0] < 240) | (arr[:,:,1] < 240) | (arr[:,:,2] < 240)).mean() * 100
    print(f"{name}: non-white = {non_white:.2f}%")

