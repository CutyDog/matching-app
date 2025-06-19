'use client';

export default function AccountPage() {
  // 仮のユーザー情報
  const user = { name: 'テストユーザー', email: 'test@example.com' };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">マイページ</h1>
      <div className="mb-2">名前: {user.name}</div>
      <div className="mb-2">メール: {user.email}</div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }}
      >
        ログアウト
      </button>
    </div>
  );
}