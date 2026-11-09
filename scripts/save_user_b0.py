from PIL import Image

im = Image.open(r'C:\Users\user\.gemini\antigravity\brain\31fcfa2f-ba26-47d7-9f8b-9b344e2094ae\.user_uploaded\media_1794117255183_b0dc01e9.png')
print('media_1794117255183_b0dc01e9 size:', im.size)

# Let's save a clear webp or png to apps/web/public so we can check it
im.save('SchoolRide-LK-V2/apps/web/public/images/user_upload_b0dc01e9.png')
print('Saved user_upload_b0dc01e9.png')

