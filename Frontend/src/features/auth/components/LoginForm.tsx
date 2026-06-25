import { useState, useEffect } from "react";
import { useAuth } from "../hooks/auth.hook";
import { Eye, EyeOff, Loader2 } from "lucide-react"; // Soft modern UI icons

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const { loginError, loginIsSubmitting, handleLoginSubmit } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-transparent px-4 select-none antialiased relative z-10">
      {/* Static Backdrop Card Container — prevents a blocky layout shift */}
      <div className="w-full max-w-[420px] bg-white/60 backdrop-blur-md border border-neutral-200/50 rounded-2xl p-8 sm:p-10 shadow-[0_8px_32px_rgba(27,27,27,0.02)]">
        {/* 
        LAYER 1: Brand Wordmark & Main Headers
        Enters first with a fast, snappy pull-in that smoothly settles
      */}
        <div
          className="flex flex-col items-center text-center mb-8 transition-all duration-[700ms]"
          style={{
            transform: isMounted
              ? "translateY(0) scale(1)"
              : "translateY(8px) scale(0.99)",
            opacity: isMounted ? 1 : 0,
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <h1 className="font-['Syne'] text-2xl font-medium tracking-tight text-neutral-900 mb-1.5">
            Welcome back
          </h1>
          <p className="font-['Plus_Jakarta_Sans'] text-xs text-neutral-400">
            Sign in to continue your workspace
          </p>
        </div>

        {/* 
        LAYER 2: Input Field Blocks
        Slightly delayed by 120ms to separate visually from the headers
      */}
        <form
          className="flex flex-col gap-5 transition-all duration-[850ms]"
          onSubmit={(e) => handleLoginSubmit(e, email, password)}
          style={{
            transform: isMounted ? "translateY(0)" : "translateY(12px)",
            opacity: isMounted ? 1 : 0,
            transitionDelay: "120ms",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Email Input */}
          <div className="flex flex-col gap-1.5">
            <label className="font-['Plus_Jakarta_Sans'] text-[11px] font-medium text-neutral-500 px-0.5">
              Email address
            </label>
            <input
              type="email"
              required
              autoComplete="email"
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/50 border border-neutral-200 rounded-xl px-4 py-2.5 font-['Plus_Jakarta_Sans'] text-sm font-normal text-neutral-900 placeholder-neutral-300 outline-none transition-all duration-200 focus:border-neutral-400 focus:bg-white focus:ring-0"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center px-0.5">
              <label className="font-['Plus_Jakarta_Sans'] text-[11px] font-medium text-neutral-500">
                Password
              </label>
            </div>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/50 border border-neutral-200 rounded-xl pl-4 pr-10 py-2.5 font-['Plus_Jakarta_Sans'] text-sm font-normal text-neutral-900 placeholder-neutral-300 outline-none transition-all duration-200 focus:border-neutral-400 focus:bg-white focus:ring-0"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-neutral-400 hover:text-neutral-600 focus:outline-none transition-colors duration-150 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 stroke-[1.5]" />
                ) : (
                  <Eye className="h-4 w-4 stroke-[1.5]" />
                )}
              </button>
            </div>
          </div>

          {/* 
          LAYER 3: Submit Action & Redirection Options
          Delayed by 200ms, drifting upward into place with elegant physics
        */}
          <div
            className="flex flex-col gap-4 mt-2 transition-all duration-[900ms]"
            style={{
              transform: isMounted ? "translateY(0)" : "translateY(16px)",
              opacity: isMounted ? 1 : 0,
              transitionDelay: "200ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Elegant Call to Action Button */}
            <button
              type="submit"
              disabled={loginIsSubmitting}
              className="h-11 w-full flex justify-center items-center rounded-xl bg-neutral-900 font-['Plus_Jakarta_Sans'] text-xs font-medium text-white shadow-xs transition-all duration-300 hover:bg-neutral-800 active:scale-98 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              {loginIsSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-3.5 w-3.5 animate-spin stroke-[2.5]" />
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Subtle Error Banner */}
            {loginError && (
              <div className="rounded-lg bg-red-50/60 border border-red-100 px-3.5 py-2 mt-1">
                <p className="font-['Plus_Jakarta_Sans'] text-[11px] font-medium text-red-600/90 leading-normal">
                  {loginError}
                </p>
              </div>
            )}

            {/* Bottom Link Layer */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="font-['Plus_Jakarta_Sans'] text-xs text-neutral-400 hover:text-neutral-700 focus:outline-none transition-colors duration-150 cursor-pointer"
              >
                Don’t have an account?{" "}
                <span className="text-neutral-600 font-medium hover:underline underline-offset-4">
                  Create account
                </span>
              </button>
            </div>
          </div>
        </form>

        {/* 
        LAYER 4: Micro-System Metadata Footer
        Appears at the very end with a gentle 350ms opacity fade
      */}
        <div
          className="text-center mt-10 transition-opacity duration-[1000ms]"
          style={{
            opacity: isMounted ? 1 : 0,
            transitionDelay: "350ms",
          }}
        >
          <span className="font-['JetBrains_Mono'] text-[9px] uppercase tracking-widest text-neutral-300">
            v1.0.0 // notebook_core
          </span>
        </div>
      </div>
    </div>
  );
}
