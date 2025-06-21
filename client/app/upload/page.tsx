import ImageUpload from '../../components/images/ImageUpload';

export default function UploadPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold text-center mb-8">Image Upload Test</h1>
      <ImageUpload />
    </div>
  );
}