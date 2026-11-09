import numpy as np
from PIL import Image

im = Image.open(r'C:\Users\user\.gemini\antigravity\brain\31fcfa2f-ba26-47d7-9f8b-9b344e2094ae\.user_uploaded\media_1794199524164_49fda30c.png')
print('Current upload Size:', im.size)

w, h = im.size
q1 = im.crop((0, 0, w//2, h//2)) # Top Left
q2 = im.crop((w//2, 0, w, h//2)) # Top Right
q3 = im.crop((0, h//2, w//2, h)) # Bottom Left
q4 = im.crop((w//2, h//2, w, h)) # Bottom Right

for name, q in [('Top-Left', q1), ('Top-Right', q2), ('Bottom-Left', q3), ('Bottom-Right', q4)]:
    arr = np.array(q)
    non_white = ((arr[:,:,0] < 240) | (arr[:,:,1] < 240) | (arr[:,:,2] < 240)).mean() * 100
    print(f"{name}: non-white = {non_white:.2f}%")

