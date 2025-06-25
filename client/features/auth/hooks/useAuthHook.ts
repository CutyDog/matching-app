import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSignUp, useCreateProfile } from "@/features/auth/api";
import { useImageUpload } from "@/hooks/useImageUpload";

export const useAuthHook = () => {
  const router = useRouter();
  const token = localStorage.getItem('Token');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    handleFileChange,
    handleUpload,
    uploading,
    error: uploadError,
  } = useImageUpload();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("/default-avatar.png");
  const [error, setError] = useState("");
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

  const { signUp, loading: signUpLoading } = useSignUp();
  const { createProfile, loading: createProfileLoading } = useCreateProfile();

  useEffect(() => {
    if (!token) return;

    if (token && alreadyRegistered === false) {
      setAlreadyRegistered(true);
    }
  }, [token, alreadyRegistered]);

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

  const handleUserRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    signUp({ variables: { name, email, password } }).then(({ data }) => {
      if (data?.signUp?.token) {
        localStorage.setItem('Token', data.signUp.token);
      } else {
        setError('登録に失敗しました');
      }
    });
  }

  const handleProfileRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    createProfile({ variables: { birthday, gender, introduction, avatarUrl } }).then(({ data }) => {
      if (data?.createProfile?.profile) {
        router.push('/account');
      } else {
        setError('プロフィール登録に失敗しました');
      }
    });
  }

  return {
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
    setAvatarUrl,
    error,
    setError,
    handleUserRegister,
    handleProfileRegister,
    signUpLoading,
    createProfileLoading,
    alreadyRegistered,
    uploading,
    fileInputRef,
    handleAvatarClick,
    handleFileSelect,
    uploadError,
  }
}