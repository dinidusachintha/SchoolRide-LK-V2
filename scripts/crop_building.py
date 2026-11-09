from PIL import Image

im = Image.open(r'C:\Users\user\.gemini\antigravity\brain\31fcfa2f-ba26-47d7-9f8b-9b344e2094ae\.user_uploaded\media_1794200556684_47982229.jpg')
print('Template image size:', im.size)

# The building is in the upper right quadrant of the image
# Let's inspect coordinates of the building rectangle
# In the template, the building top-left is around x=580, y=190
# Top-right is around x=950, y=190
# Bottom-right is around x=950, y=600
# Bottom-left is around x=580, y=600

building_crop = im.crop((580, 190, 950, 600))
building_crop.save('SchoolRide-LK-V2/apps/web/public/images/architectural-backdrop.jpg')
print('Saved architectural-backdrop.jpg:', building_crop.size)

