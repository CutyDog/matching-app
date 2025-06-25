"use client";

import { UserRegisterForm, ProfileRegisterForm } from "@/features/auth/components";
import { useAuthHook } from "@/features/auth/hooks";

export default function SignupPage() {
  const {
    email,
    setEmail,
    name,
    setName,
    password,
    setPassword,
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
    handleUserRegister,
    handleProfileRegister,
    signUpLoading,
    createProfileLoading,
    alreadyRegistered,
  } = useAuthHook();

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-muted min-h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
          新規登録
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-background py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {!alreadyRegistered ? (
            <UserRegisterForm
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              error={error}
              handleUserRegister={handleUserRegister}
              isSubmitting={signUpLoading}
            />
          ) : (
            <ProfileRegisterForm
              birthday={birthday}
              setBirthday={setBirthday}
              gender={gender}
              setGender={setGender}
              introduction={introduction}
              setIntroduction={setIntroduction}
              avatarUrl={avatarUrl}
              handleAvatarClick={handleAvatarClick}
              handleFileSelect={handleFileSelect}
              uploading={uploading}
              fileInputRef={fileInputRef}
              error={error}
              handleProfileRegister={handleProfileRegister}
              isSubmitting={createProfileLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}