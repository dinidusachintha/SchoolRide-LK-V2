from PIL import Image

for name in ['media_1794199524164_49fda30c.png', 'media_1794117255183_b0dc01e9.png']:
    im = Image.open(r'C:\Users\user\.gemini\antigravity\brain\31fcfa2f-ba26-47d7-9f8b-9b344e2094ae\.user_uploaded\\' + name)
    print(name, im.size)
    # Let's crop right half
    w, h = im.size
    right = im.crop((w//2, 0, w, h))
    right.save('SchoolRide-LK-V2/apps/web/public/images/right_' + name)
    left = im.crop((0, 0, w//2, h))
    left.save('SchoolRide-LK-V2/apps/web/public/images/left_' + name)
    print('Saved left and right crops')

