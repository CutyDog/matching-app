import { NextRequest, NextResponse } from 'next/server';
import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});
const bucketName = process.env.NEXT_PUBLIC_BUCKET_NAME || '';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // ファイルの内容を取得
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ファイル名を生成（重複を避けるためタイムスタンプを追加）
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;

    // GCSのバケットにファイルをアップロード
    const bucket = storage.bucket(bucketName);
    const blob = bucket.file(fileName);

    await blob.save(buffer, {
      metadata: {
        contentType: file.type,
      },
      public: true,
    });

    // アップロードされたファイルの公開URLを返す
    const fileUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

    return NextResponse.json({
      success: true,
      fileName,
      fileUrl,
      message: 'File uploaded successfully'
    });

  } catch (error) {
    console.error('Upload error:', error);

    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}