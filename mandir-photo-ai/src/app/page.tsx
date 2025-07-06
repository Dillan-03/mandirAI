'use client';
import { useState } from 'react';

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [matches, setMatches] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

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

    const res = await fetch('http://YOUR_SERVER_IP:5000/match', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setMatches(data.matches);
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-10 bg-gray-100 text-center">
      <h1 className="text-3xl font-bold mb-4">Face Matcher</h1>

      <input type="file" onChange={handleUpload} className="mb-4" />

      {image && <img src={image} alt="Uploaded" className="mx-auto w-60 mb-4" />}

      <button
        onClick={handleSubmit}
        disabled={loading || !image}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {loading ? 'Matching...' : 'Find Matches'}
      </button>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {matches.map((img, i) => (
          <img
            key={i}
            src={`data:image/jpeg;base64,${img}`}
            alt={`Match ${i}`}
            className="border rounded"
          />
        ))}
      </div>
    </div>
  );
}
