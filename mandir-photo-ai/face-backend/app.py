from flask import Flask, request, jsonify
from keras_facenet import FaceNet
from PIL import Image
import numpy as np
import faiss
import io
import base64
import os

app = Flask(__name__)
embedder = FaceNet()
index = faiss.read_index("face_index.faiss")
paths = np.load("face_paths.npy")

def encode_image(filename):
    with open(f"faces/{filename}", "rb") as f:
        return base64.b64encode(f.read()).decode()

@app.route('/match', methods=['POST'])
def match():
    file = request.files.get("image")
    if not file:
        return jsonify({"error": "No file provided"}), 400

    img = Image.open(io.BytesIO(file.read())).convert("RGB").resize((160, 160))
    emb = embedder.embeddings([np.array(img)])[0].astype("float32")
    _, I = index.search(np.array([emb]), k=5)
    matches = [encode_image(paths[i]) for i in I[0]]
    return jsonify({"matches": matches})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
