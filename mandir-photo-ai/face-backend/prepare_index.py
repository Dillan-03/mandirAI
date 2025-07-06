from keras_facenet import FaceNet
from PIL import Image
import numpy as np
import faiss
import os

embedder = FaceNet()
embeddings, paths = [], []

for fname in os.listdir("faces"):
    if fname.lower().endswith((".jpg", ".jpeg", ".png")):
        img = Image.open(f"faces/{fname}").convert("RGB").resize((160, 160))
        emb = embedder.embeddings([np.array(img)])[0]
        embeddings.append(emb)
        paths.append(fname)

embeddings = np.array(embeddings).astype("float32")
index = faiss.IndexFlatL2(128)
index.add(embeddings)

faiss.write_index("face_index.faiss", index)
np.save("face_paths.npy", np.array(paths))

print("Index and paths saved.")
