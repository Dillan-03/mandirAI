'use client';
import { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [matches, setMatches] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const webcamRef = useRef<Webcam>(null); // Reference to the webcam component

  // Function to capture a photo from the webcam
  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setImage(imageSrc);
      }
    }
  }, [webcamRef]);

  // Handle uploading a file (kept for flexibility, but can be removed if not needed)
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!image) return;
    setLoading(true);

    const blob = await fetch(image).then((res) => res.blob());
    const formData = new FormData();
    formData.append('image', blob, 'photo.jpg');

    // Replace 'http://YOUR_SERVER_IP:5000/match' with your actual backend endpoint
    const res = await fetch('http://YOUR_SERVER_IP:5000/match', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setMatches(data.matches);
    setLoading(false);
  };

  // Video constraints for the webcam (e.g., front camera)
  const videoConstraints = {
    facingMode: 'user', // 'user' for front camera, 'environment' for back camera
  };

  return (
    <div className="min-h-screen p-10 bg-gray-100 text-center">
      <h1 className="text-3xl font-bold mb-4">Face Matcher</h1>

      {/* Webcam display and capture button */}
      {!image ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="mx-auto w-full md:w-96 mb-4 border rounded shadow-md"
          />
          <button
            onClick={capture}
            className="bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-400 mb-4"
          >
            Take Photo
          </button>
        </>
      ) : (
        <>
          {/* Display captured image or uploaded image */}
          <img src={image} alt="Captured or Uploaded" className="mx-auto w-60 mb-4 border rounded shadow-md" />
          <button
              onClick={setImage(null); 
            setLoading(false)} // Allows retaking the photo
            className="bg-yellow-600 text-white px-4 py-2 rounded mb-4 mr-2"
          >
            Retake Photo
          </button>
        </>
      )}

      {/* File upload input (optional, uncomment if you want to keep both options) */}
      {/* <input type="file" onChange={handleUpload} className="mb-4" /> */}

      <button
        onClick={handleSubmit}
        disabled={loading || !image}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {loading ? 'Matching...' : 'Find Matches'}
      </button>

      {/* Display matches */}
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {matches.map((img, i) => (
          <img
            key={i}
            src={`data:image/jpeg;base64,${img}`}
            alt={`Match ${i}`}
            className="border rounded shadow"
          />
        ))}
      </div>
    </div>
  );
}