"use client";
import { useState } from "react";
import { useAuthStore } from "../../../store/authStore";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const { resetPasswordRequest, isLoading } = useAuthStore();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await resetPasswordRequest(email);
      setSuccess(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || "비밀번호 재설정 요청에 실패했습니다.");
      } else {
        setError("비밀번호 재설정 요청에 실패했습니다.");
      }
    }
  };

  if (success) {
    return (
      <div className="min-h-screen relative flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwZWE1ZTkiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2djhoOHYtOGgtOHpNMjggMjR2OGg4di04aC04ek0yMCA0djhoOFY0aC04eiIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-xl shadow-large rounded-2xl p-8 sm:p-10 border border-white/20 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-4 shadow-medium">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-dark-900 mb-2">
              이메일을 확인하세요
            </h2>
            <p className="text-dark-600 mb-4">
              비밀번호 재설정 링크를 <strong>{email}</strong>로 전송했습니다.
            </p>
            <p className="text-sm text-dark-500 mb-6">
              이메일을 확인하고 링크를 클릭하여 비밀번호를 재설정하세요.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 transition-all duration-200"
            >
              로그인 페이지로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwZWE1ZTkiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2djhoOHYtOGgtOHpNMjggMjR2OGg4di04aC04ek0yMCA0djhoOFY0aC04eiIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Forgot Password Card */}
      <div className="relative w-full max-w-md animate-fade-in">
        <div className="bg-white/80 backdrop-blur-xl shadow-large rounded-2xl p-8 sm:p-10 border border-white/20">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-2xl mb-4 shadow-medium">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-dark-900 gradient-text mb-2">
              비밀번호 찾기
            </h1>
            <p className="text-sm text-dark-500 font-medium">
              등록된 이메일로 비밀번호 재설정 링크를 보내드립니다
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-dark-700"
              >
                이메일 주소
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-dark-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="example@addeep.co.kr"
                  className="block w-full pl-12 pr-4 py-3 border border-dark-200 rounded-xl text-dark-900 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/50"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center px-4 py-3.5 border border-transparent rounded-xl shadow-medium text-base font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed btn-ripple"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    전송 중...
                  </>
                ) : (
                  <>
                    비밀번호 재설정 링크 전송
                    <svg
                      className="ml-2 -mr-1 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-dark-600">
              <Link
                href="/"
                className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
              >
                로그인 페이지로 돌아가기
              </Link>
            </p>
            <p className="text-sm text-dark-600">
              계정이 없으신가요?{" "}
              <Link
                href="/signup"
                className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
              >
                회원가입
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
