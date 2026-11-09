from PIL import Image, ImageFilter

im = Image.open('SchoolRide-LK-V2/apps/web/public/images/architectural-backdrop.jpg')
# Crop the upper building facade (top 60% of the image which has no car)
building_facade = im.crop((0, 0, im.width, int(im.height * 0.58)))
# upscale 2.5x
w, h = building_facade.size
upscaled = building_facade.resize((w*3, h*3), Image.Resampling.LANCZOS)
upscaled = upscaled.filter(ImageFilter.UnsharpMask(radius=1.2, percent=110, threshold=3))
upscaled.save('SchoolRide-LK-V2/apps/web/public/images/modern-building-backdrop.jpg', 'JPEG', quality=95)
print('Saved modern-building-backdrop.jpg:', upscaled.size)

