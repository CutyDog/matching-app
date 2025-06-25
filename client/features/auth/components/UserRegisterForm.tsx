'use client';

import { TextField } from "@/components/forms";
import { SubmitButton } from '@/components/buttons';

type UserRegisterProps = {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  error: string;
  handleUserRegister: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export const UserRegisterForm = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  error,
  handleUserRegister,
  isSubmitting,
}: UserRegisterProps) => {

  return (
    <form className="space-y-6" onSubmit={handleUserRegister}>
      <TextField
        label="名前"
        name="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required={true}
        disabled={false}
      />

      <TextField
        label="メールアドレス"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required={true}
        disabled={false}
      />

      <TextField
        label="パスワード"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required={true}
        disabled={false}
      />

      {error && <div className="text-sm text-error">{error}</div>}

      <div className="mt-12">
        <SubmitButton isSubmitting={isSubmitting}>
          登録して次へ
        </SubmitButton>
      </div>
    </form>
  )
}