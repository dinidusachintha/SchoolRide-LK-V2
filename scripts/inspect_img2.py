from PIL import Image

im = Image.open(r'C:\Users\user\.gemini\antigravity\brain\31fcfa2f-ba26-47d7-9f8b-9b344e2094ae\.user_uploaded\media_1794117255183_b0dc01e9.png')
print('Size:', im.size)

# Let's inspect where there are non-white pixels
import numpy as np
arr = np.array(im)
print('Shape:', arr.shape)

# Let's save a copy in public/images so we can inspect it or see it
im.save('SchoolRide-LK-V2/apps/web/public/images/uploaded_b0dc01e9.png')
print('Saved to public/images/uploaded_b0dc01e9.png')

