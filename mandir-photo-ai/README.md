# FaceMatch AI Web App

## Overview

This project is a face recognition web application that allows users to upload a photo of themselves (or their dog for testing), and the system returns visually similar matches from a large dataset. The web app is built with **Next.js** and **Tailwind CSS** on the frontend and uses **Python (Flask)** for the AI backend hosted on **Render**. It is designed to support future scaling to handle 9TB+ of facial image data using optimized AI and cloud storage.

---

## Key Features

* 📸 Upload or capture a face photo from the web app
* 🤖 AI model (FaceNet) extracts facial features (embeddings)
* ⚡ FAISS vector search returns most similar matches
* 🌐 Images are stored and referenced via URLs (e.g., AWS S3 or Wasabi)
* 🧠 Designed to scale to millions of images efficiently

---

## Technologies Used

### Frontend

* **Next.js**: Server-rendered React framework
* **Tailwind CSS**: Utility-first CSS styling

### Backend

* **Flask**: Lightweight Python web server for AI API
* **FaceNet (Keras-Facenet)**: Facial feature extractor
* **FAISS**: Fast similarity search on high-dimensional vectors

### Storage & Hosting

* **Render**: Hosts the Flask backend API
* **Vercel**: Hosts the Next.js frontend
* **S3-Compatible Cloud Storage**: Stores actual face images (planned for 9TB+)

---

## How It Works

1. **User uploads a photo** using the Next.js site
2. The image is sent to the **Flask AI backend (Render)**
3. Flask uses **FaceNet** to convert the photo into a 128D vector
4. The vector is compared using **FAISS** against an indexed dataset
5. Flask returns a list of the most visually similar matches
6. The frontend displays those images via their **image URLs**

---

## Scaling Considerations (for CEO)

* 🔄 Only facial vectors are compared in memory (tiny \~512 bytes each)
* 🌍 The actual 9TB+ image files live in cloud storage, not the app
* 🚀 FAISS is optimized for fast and scalable vector search (used by Meta, Google)
* 📤 New images can be added over time without restarting the app

---

## Example Use Cases

* Private building dog/person face recognition
* Celebrity look-alike finder
* Internal access control via face matching

---

## Future Plans

* Use camera input (not just file upload)
* Deploy with GPU inference for faster matching
* Admin dashboard to manage the image dataset
* Switch from FAISS to **Milvus** for distributed scale (if needed)

---

## Contact

For help or customization, contact the development team.
