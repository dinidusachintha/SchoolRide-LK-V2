from PIL import Image

for name in ['hero-visual.jpg', 'vango-hero-full.jpg']:
    p = 'SchoolRide-LK-V2/apps/web/public/images/' + name
    im = Image.open(p)
    print(name, im.size)
    # save a smaller view
    im.resize((300, 200)).save('SchoolRide-LK-V2/apps/web/public/images/thumb_' + name)
    print('Saved thumb_' + name)

