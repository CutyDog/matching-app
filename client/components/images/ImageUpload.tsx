'use client';

import { useState } from 'react';
import Image from 'next/image';

interface UploadResponse {
  success: boolean;
  fileName: string;
  fileUrl: string;
  message: string;
}

export default function ImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result: UploadResponse = await response.json();

      if (result.success) {
        setUploadedUrl(result.fileUrl);
        setFile(null);
        // ファイル入力をリセット
        const fileInput = document.getElementById('file-input') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        setError(result.message || 'Upload failed');
      }
    } catch (err) {
      setError('Upload failed. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Image Upload</h2>

      <div className="mb-4">
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {file && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">Selected file: {file.name}</p>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {uploading ? 'Uploading...' : 'Upload Image'}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {uploadedUrl && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Uploaded Image:</h3>
          <Image
            src={uploadedUrl}
            alt="Uploaded"
            width={300}
            height={300}
          />
          <p className="text-sm text-gray-600 mt-2">
            URL: <a href={uploadedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{uploadedUrl}</a>
          </p>
        </div>
      )}
    </div>
  );
}