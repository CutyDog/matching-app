'use client';

import { TextField, TextArea, SelectField } from "@/components/forms";
import { SubmitButton } from '@/components/buttons';
import { AvatarImage } from "@/components/images";

type ProfileRegisterFormProps = {
  birthday: string;
  setBirthday: (birthday: string) => void;
  gender: string;
  setGender: (gender: string) => void;
  introduction: string;
  setIntroduction: (introduction: string) => void;
  avatarUrl: string;
  handleAvatarClick: () => void;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement> | null;
  error: string;
  handleProfileRegister: (e: React.FormEvent) => void;
  isSubmitting: boolean;
};

export const ProfileRegisterForm = ({
  birthday,
  setBirthday,
  gender,
  setGender,
  introduction,
  setIntroduction,
  avatarUrl,
  handleAvatarClick,
  handleFileSelect,
  uploading,
  fileInputRef,
  error,
  handleProfileRegister,
  isSubmitting,
}: ProfileRegisterFormProps) => {

  return (
    <form className="space-y-6" onSubmit={handleProfileRegister}>
      <div className="mt-2 flex items-center justify-center">
        <AvatarImage
          avatarUrl={avatarUrl}
          size={128}
          onClick={handleAvatarClick}
          label="編集"
          isUploading={uploading}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      <TextField
        label="誕生日"
        name="birthday"
        type="date"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        required
        disabled={false}
      />

      <SelectField
        label="性別"
        name="gender"
        value={gender}
        onChange={setGender}
        options={[
          { label: "男性", value: "MALE" },
          { label: "女性", value: "FEMALE" },
          { label: "その他", value: "OTHER" }
        ]}
        required
      />

      <TextArea
        label="自己紹介"
        name="introduction"
        rows={3}
        value={introduction}
        onChange={(e) => setIntroduction(e.target.value)}
        disabled={false}
      />

      {error && <div className="text-sm text-error">{error}</div>}

      <div className="mt-12">
        <SubmitButton isSubmitting={isSubmitting}>
        プロフィール登録
        </SubmitButton>
      </div>
    </form>
  )
}