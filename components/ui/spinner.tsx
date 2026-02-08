export default function SpinnerLoader() {
  return (
    <div className=" bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center p-8">
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 w-32 h-32">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#gradient1)"
              strokeWidth="2"
              strokeDasharray="70 200"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Middle pulsing hexagon */}
        <div className="absolute inset-0 w-32 h-32 flex items-center justify-center">
          <div className="hexagon-pulse">
            <svg viewBox="0 0 100 100" className="w-20 h-20">
              <polygon
                points="50,10 90,30 90,70 50,90 10,70 10,30"
                fill="none"
                stroke="url(#gradient2)"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Inner rotating triangle */}
        <div className="absolute inset-0 w-32 h-32 flex items-center justify-center">
          <div className="animate-spin-reverse">
            <svg viewBox="0 0 100 100" className="w-10 h-10">
              <polygon
                points="50,20 80,70 20,70"
                fill="none"
                stroke="url(#gradient3)"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Central dot with scale pulse */}
        <div className="absolute inset-0 w-32 h-32 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-linear-to-br from-pink-400 to-purple-600 animate-pulse-scale shadow-lg shadow-purple-500/50"></div>
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 w-32 h-32 blur-xl opacity-40">
          <div className="w-full h-full rounded-full bg-linear-to-br from-pink-500 via-purple-500 to-cyan-500 animate-pulse"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes pulse-scale {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.6;
          }
        }

        @keyframes hexagon-pulse {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(0.85) rotate(30deg);
            opacity: 0.7;
          }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 2s linear infinite;
        }

        .animate-pulse-scale {
          animation: pulse-scale 1.5s ease-in-out infinite;
        }

        .hexagon-pulse {
          animation: hexagon-pulse 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}