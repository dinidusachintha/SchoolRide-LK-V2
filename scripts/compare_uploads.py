import numpy as np
from PIL import Image

im_current = Image.open(r'C:\Users\user\.gemini\antigravity\brain\31fcfa2f-ba26-47d7-9f8b-9b344e2094ae\.user_uploaded\media_1794199524164_49fda30c.png')
im_prev = Image.open(r'C:\Users\user\.gemini\antigravity\brain\31fcfa2f-ba26-47d7-9f8b-9b344e2094ae\.user_uploaded\media_1794117255183_b0dc01e9.png')

print('Current upload size:', im_current.size)
print('Previous upload (b0dc01e9) size:', im_prev.size)

