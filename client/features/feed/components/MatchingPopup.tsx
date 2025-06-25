'use client';

import { HeartPinkIcon } from "@/components/icons";

export const MatchingPopup = ({
  showMatchedPopup,
  setShowMatchedPopup,
  handleStartChat,
}: {
  showMatchedPopup: boolean;
  setShowMatchedPopup: (show: boolean) => void;
  handleStartChat: () => void;
}) => {

  return (
    <>
      {showMatchedPopup && (
        <div className="px-4 fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-sm w-full flex flex-col items-center relative animate-zoom-in">
            <div className="mb-4">
              <HeartPinkIcon />
            </div>
            <h2 className="text-3xl font-extrabold text-pink-500 mb-2">マッチング成立！</h2>
            <p className="text-lg text-gray-700 mb-4">おめでとうございます！<br />新しいトークを始めましょう。</p>
            <button
              onClick={handleStartChat}
              className="mt-2 px-8 py-3 bg-pink-500 text-white rounded-full font-bold shadow hover:bg-pink-600 transition"
            >
              トークをはじめる
            </button>
            <button
              onClick={() => setShowMatchedPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
              aria-label="閉じる"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}