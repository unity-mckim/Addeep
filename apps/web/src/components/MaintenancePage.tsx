"use client";

export default function MaintenancePage() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 z-50">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          서비스 점검 중
        </h1>

        {/* Description */}
        <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed">
          보다 나은 서비스 제공을 위해
          <br className="md:hidden" />
          시스템 점검을 진행하고 있습니다.
          <br />
          빠른 시일 내에 정상화하겠습니다.
        </p>

        {/* Info Box */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-white font-semibold mb-1">안내사항</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                점검 시간 동안 일시적으로 서비스 이용이 불가능합니다. 이용에
                불편을 드려 죄송합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
