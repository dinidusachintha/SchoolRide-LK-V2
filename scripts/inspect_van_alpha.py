import numpy as np
from PIL import Image

im = Image.open('SchoolRide-LK-V2/apps/web/public/images/vango-hero-right-2x.png')
print('vango-hero-right-2x.png:', im.size, im.mode)

# Let's check the alpha channel
alpha = np.array(im.getchannel('A'))
print('Alpha min:', alpha.min(), 'max:', alpha.max())
print('Transparent pixels (%):', (alpha == 0).mean() * 100)

# Let's inspect where transparency is
print('Left edge alpha:', alpha[:, 0].mean())
print('Right edge alpha:', alpha[:, -1].mean())
print('Top edge alpha:', alpha[0, :].mean())
print('Bottom edge alpha:', alpha[-1, :].mean())

