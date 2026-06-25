import { useState, useEffect } from "react";
import { useAuth } from '../hooks/auth.hook'

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
    <div className="w-full max-w-sm mx-auto px-6 select-none relative z-10">
      {/* PURE FLOATING CONTENT: No container divs, no backgrounds, no shadows */}
      <div
        className={`w-full flex flex-col gap-10 transition-all duration-1000 ease-out transform ${
          isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Editorial Heading Panel */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono font-black text-slate-900 uppercase tracking-[0.3em]">
            login
          </span>
        </div>

        <form className="flex flex-col gap-8" onSubmit={(e) => handleLoginSubmit(e, email, password)}>
          {/* Frameless Input Section */}
          <div className="flex flex-col gap-6">
            {/* Email Field Line */}
            <div className="flex flex-col gap-1 relative border-b-2 border-slate-900 pb-1 focus-within:border-black transition-colors duration-300">
              <label className="text-[10px] font-mono font-black text-slate-900 uppercase tracking-widest">
                user_id // email
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full bg-transparent text-base font-sans font-medium text-slate-950 placeholder-slate-500/70 focus:outline-none py-1 tracking-wide"
              />
            </div>

            {/* Password Field Line */}
            <div className="flex flex-col gap-1 relative border-b-2 border-slate-900 pb-1 focus-within:border-black transition-colors duration-300">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-mono font-black text-slate-900 uppercase tracking-widest">
                  passkey // security
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[10px] font-mono font-black text-slate-600 hover:text-black tracking-wide uppercase focus:outline-none transition-colors duration-150 cursor-pointer"
                >
                  {showPassword ? "[hide]" : "[show]"}
                </button>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder={showPassword ? "password_string" : "••••••••••••"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                /* FIX: Dynamic tracking classes prevent typed characters from clipping off-screen when revealed */
                className={`block w-full bg-transparent text-base font-mono font-bold text-slate-950 placeholder-slate-500/70 focus:outline-none py-1 ${
                  showPassword ? "tracking-normal" : "tracking-widest"
                }`}
              />
            </div>
          </div>

          {/* Action Infrastructure */}
          <div className="flex flex-col gap-5 mt-4">
            {/* Frameless Border Button */}
            <button
              type="submit"
              disabled={loginIsSubmitting}
              className="h-12 w-full flex justify-center items-center px-8 text-xs font-mono font-black tracking-widest uppercase rounded-full border border-slate-900/20 text-slate-950 bg-slate-900/5 backdrop-blur-[2px] hover:bg-gradient-to-r hover:from-slate-900 hover:to-slate-800 hover:text-white hover:border-transparent hover:shadow-[0_4px_20px_rgba(15,23,42,0.15)] transition-all duration-500 ease-out disabled:opacity-40 cursor-pointer"
            >
              {loginIsSubmitting ? (
                <div className="flex items-center gap-3">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
                  </span>
                  <span className="tracking-[0.15em] font-bold lowercase">
                    initializing vault...
                  </span>
                </div>
              ) : (
                "Initaialize workspace"
              )}
            </button>

            {/* Clean Vertical Switch Text */}
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-xs font-mono text-slate-800 hover:text-black focus:outline-none cursor-pointer group relative py-0.5"
              >
                New here?{" "}
                <span className="underline underline-offset-4 font-black">
                  Create Credentials
                </span>
              </button>
            </div>

            {/* Error messaging footprint row */}
            {loginError && (
              <div className="flex items-start gap-2 border-l-2 border-rose-700 pl-3 py-0.5 mt-1 transition-all duration-300">
                <p className="text-sm font-mono font-bold text-rose-950 tracking-wide leading-relaxed lowercase">
                  fault: {loginError.toLowerCase()}
                </p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
