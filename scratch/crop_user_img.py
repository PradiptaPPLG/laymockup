
from PIL import Image

img_path = r'C:/Users/user/.gemini/antigravity/brain/54df6774-29a8-4939-823f-d2ebdab11d86/.user_uploaded/media_1794054992842_3bc0835c.jpg'
im = Image.open(img_path)
print("Image size:", im.size)

# Crop topbar
w, h = im.size
topbar = im.crop((0, 0, w, int(h * 0.15)))
topbar.save(r'C:/Users/user/.gemini/antigravity/brain/54df6774-29a8-4939-823f-d2ebdab11d86/scratch/user_topbar.jpg')

# Crop center
center = im.crop((int(w * 0.1), int(h * 0.15), int(w * 0.9), int(h * 0.85)))
center.save(r'C:/Users/user/.gemini/antigravity/brain/54df6774-29a8-4939-823f-d2ebdab11d86/scratch/user_center.jpg')
print("Saved crops.")
