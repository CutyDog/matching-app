import { useState } from 'react';

interface UploadResponse {
  success: boolean;
  fileName: string;
  fileUrl: string;
  message: string;
}

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setError('');
      return selectedFile;
    }
    return null;
  };

  const handleUpload = async (fileToUpload: File): Promise<string | null> => {
    if (!fileToUpload) {
      setError('Please select a file');
      return null;
    }

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', fileToUpload);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result: UploadResponse = await response.json();

      if (result.success) {
        setUploadedUrl(result.fileUrl);
        return result.fileUrl;
      } else {
        setError(result.message || 'Upload failed');
        return null;
      }
    } catch (err) {
      setError('Upload failed. Please try again.');
      console.error('Upload error:', err);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const resetUpload = () => {
    setUploadedUrl('');
    setError('');
    setUploading(false);
  };

  return {
    uploading,
    uploadedUrl,
    error,
    handleFileChange,
    handleUpload,
    resetUpload,
  };
};