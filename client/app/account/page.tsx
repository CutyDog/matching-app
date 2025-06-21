'use client';

import { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '@/context/auth';
import { useMutation } from '@apollo/client';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { gql } from '@apollo/client';
import { Profile } from '@/graphql/graphql';
import { TextField, TextArea } from '@/components/forms';
import { ActionButton, SubmitButton } from '@/components/buttons';
import { AvatarImage } from '@/components/images';
import { useImageUpload } from '@/hooks/useImageUpload';

const UPDATE_PROFILE = gql`
  mutation updateProfile($introduction: String, $avatarUrl: String) {
    updateProfile(input: { introduction: $introduction, avatarUrl: $avatarUrl }) {
      profile {
        id
      }
    }
  }
`;

export default function AccountPage() {
  const { currentUser } = useContext(AuthContext);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    handleFileChange,
    handleUpload,
    uploading,
    error: uploadError,
  } = useImageUpload();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const [updateProfile, { loading: updatingProfile }] = useMutation<{ updateProfile: { profile: Profile } }>(UPDATE_PROFILE);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setEmail(currentUser.email || '');
      setIntroduction(currentUser.profile?.introduction || '');
      setAvatarUrl(currentUser.profile?.avatarUrl || '');
    }
  }, [currentUser]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = handleFileChange(e);

    if (file) {
      const newAvatarUrl = await handleUpload(file);
      if (newAvatarUrl) {
        setAvatarUrl(newAvatarUrl);
      }
    }
  };

  const handleCancel = () => {
    if (!currentUser) return;

    setName(currentUser.name || '');
    setEmail(currentUser.email || '');
    setIntroduction(currentUser.profile?.introduction || '');
    setAvatarUrl(currentUser.profile?.avatarUrl || '');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ variables: { introduction, avatarUrl } });
  };

  return (
    <div className="space-y-10 divide-y divide-gray-900/10 bg-muted -mx-4 px-4 sm:-mx-8 sm:px-8 py-10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
        <form onSubmit={handleSave} className="shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <div className="mt-2 flex items-center gap-x-3">
                  {avatarUrl ? (
                    <AvatarImage
                      avatarUrl={avatarUrl}
                      size={128}
                      onClick={handleAvatarClick}
                      label="編集"
                    />
                  ) : (
                    <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
                {uploadError && (
                  <div className="col-span-6 mt-2 p-3 bg-red-100 text-red-700 rounded">
                    {uploadError}
                  </div>
                )}
              </div>

              <TextField
                label="名前"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={false}
                disabled={true}
              />

              <TextField
                label="メールアドレス"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={false}
                disabled={true}
              />

              <TextArea
                label="自己紹介"
                name="introduction"
                rows={3}
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
                required={false}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <ActionButton
              style={{ backgroundColor: "oklch(44.6% 0.03 256.802)" }}
              onClick={handleCancel}
              disabled={updatingProfile || uploading}
            >
              キャンセル
            </ActionButton>

            <SubmitButton disabled={updatingProfile || uploading}>
              保存
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}