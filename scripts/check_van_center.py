from PIL import Image

im = Image.open('SchoolRide-LK-V2/apps/web/public/images/vango-hero-right-2x.png')
print('Size:', im.size)

# Let's check colors in the center:
print('Center pixel:', im.getpixel((im.width//2, im.height//2)))
print('Center-left pixel:', im.getpixel((im.width//4, im.height//2)))
print('Center-right pixel:', im.getpixel((3*im.width//4, im.height//2)))

