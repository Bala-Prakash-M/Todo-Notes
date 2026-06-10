import { useState, useEffect } from "react";
import { authApi } from "../api/auth.api";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const apiCall = authApi.register({ name, email, password });
    const delay = new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const [response] = await Promise.all([apiCall, delay]);
      console.log(response);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Account initialization failed. Check connection parameter.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto px-6 select-none relative z-10">
      {/* PURE FLOATING CONTENT */}
      <div
        className={`w-full flex flex-col gap-10 transition-all duration-1000 ease-out transform ${
          isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Minimal Context Tag */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono font-black text-slate-900 uppercase tracking-[0.3em]">
            system_registration
          </span>
        </div>

        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          {/* Frameless Input Section */}
          <div className="flex flex-col gap-6">
            {/* Preferred Name Field */}
            {/* FIX: Darkened baseline step to match login form specifications */}
            <div className="flex flex-col gap-1 relative border-b-2 border-slate-900 pb-1 focus-within:border-black transition-colors duration-300">
              <label className="text-[10px] font-mono font-black text-slate-900 uppercase tracking-widest">
                preferred name
              </label>
              <input
                type="text"
                required
                placeholder="your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full bg-transparent text-base font-sans font-medium text-slate-950 placeholder-slate-500/30 focus:outline-none py-1 tracking-wide"
              />
            </div>

            {/* Email Field Line */}
            {/* FIX: Darkened baseline step to match login form specifications */}
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
                className="block w-full bg-transparent text-base font-sans font-medium text-slate-950 placeholder-slate-500/30 focus:outline-none py-1 tracking-wide"
              />
            </div>

            {/* Password Field Line */}
            {/* FIX: Darkened baseline step to match login form specifications */}
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
                autoComplete="new-password"
                placeholder={showPassword ? "password_string" : "••••••••••••"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                /* FIX: Show password fix applied. Collapses font tracking when character output is exposed */
                className={`block w-full bg-transparent text-base font-mono font-bold text-slate-950 placeholder-slate-500/30 focus:outline-none py-1 ${
                  showPassword ? "tracking-normal" : "tracking-widest"
                }`}
              />
            </div>
          </div>

          {/* Action Infrastructure */}
          <div className="flex flex-col gap-5 mt-4">
            {/* Full-width Frameless Border Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full flex justify-center items-center px-8 text-xs font-mono font-black tracking-widest uppercase rounded-full border border-slate-900/20 text-slate-950 bg-slate-900/5 backdrop-blur-[2px] hover:bg-gradient-to-r hover:from-slate-900 hover:to-slate-800 hover:text-white hover:border-transparent hover:shadow-[0_4px_20px_rgba(15,23,42,0.15)] transition-all duration-500 ease-out disabled:opacity-40 cursor-pointer"
            >
              {isSubmitting ? (
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
                "create credentials"
              )}
            </button>

            {/* Clean Vertical Switch Text */}
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-xs font-mono text-slate-800 hover:text-black focus:outline-none cursor-pointer group relative py-0.5"
              >
                Already registered?{" "}
                <span className="underline underline-offset-4 font-black">
                  Login to space
                </span>
              </button>
            </div>

            {/* Error messaging footprint row */}
            {error && (
              <div className="flex items-start gap-2 border-l-2 border-rose-700 pl-3 py-0.5 mt-1 transition-all duration-300">
                <p className="text-sm font-mono font-bold text-rose-950 tracking-wide leading-relaxed lowercase">
                  fault: {error.toLowerCase()}
                </p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
