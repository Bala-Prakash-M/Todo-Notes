import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/auth.api";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Trigger gentle entry animation on mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Create a 2-second delay wrapper to allow the loading state to settle calmly
    const apiCall = authApi.login({ email, password });
    const delay = new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      // Wait for both the minimum 2 seconds and the API response
      const [response] = await Promise.all([apiCall, delay]);
      localStorage.setItem("token", response.token);
      navigate("/home");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Invalid email or password combination.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#e9ecf0] px-6 select-none relative">
      
      {/* Background Architectural Framing Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-25 overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="15%" y1="0" x2="15%" y2="100%" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="1 12" />
          <line x1="85%" y1="0" x2="85%" y2="100%" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="1 12" />
        </svg>
      </div>

      {/* Containing Box with Entry Animation Classes */}
      <div 
        className={`relative z-10 w-full max-w-sm flex flex-col gap-10 py-12 transition-all duration-1000 ease-out transform ${
          isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        
        {/* Editorial Heading */}
        <div className="flex flex-col gap-2 border-b border-slate-300/60 pb-6">
          <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-[0.2em]">
            The Archive
          </span>
          <h2 className="text-2xl font-normal tracking-tight text-slate-900 font-serif mt-1">
            Welcome back.
          </h2>
        </div>

        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          
          {/* Vertical Form Fields Stack */}
          <div className="flex flex-col gap-6">
            
            {/* Email Field */}
            <div className="flex flex-col gap-1.5 relative">
              <label className="text-xs font-mono font-bold text-slate-600 tracking-wide lowercase">
                email address
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full bg-transparent border-b border-slate-300 py-2 text-base font-sans font-normal text-slate-900 placeholder-slate-400/80 focus:outline-none focus:border-slate-800 transition-colors duration-300 ease-out tracking-wide"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5 relative">
              <div className="flex justify-between items-center">
                <label className="text-xs font-mono font-bold text-slate-600 tracking-wide lowercase">
                  password
                </label>
                
                {/* Minimalist Text-Based Visibility Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] font-mono font-bold text-slate-400 hover:text-slate-800 tracking-wider uppercase focus:outline-none transition-colors duration-200 cursor-pointer"
                >
                  {showPassword ? "hide" : "show"}
                </button>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder={showPassword ? "password123" : "••••••••"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full bg-transparent border-b border-slate-300 py-2 text-base font-sans font-normal text-slate-900 placeholder-slate-400/80 focus:outline-none focus:border-slate-800 transition-colors duration-300 ease-out tracking-wide font-mono"
              />
            </div>
          </div>

          {/* Action Trigger Row */}
          <div className="flex flex-col gap-5 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 flex justify-center items-center px-4 text-xs font-mono font-bold tracking-widest uppercase border border-slate-800 text-slate-900 bg-slate-200/40 hover:bg-slate-900 hover:text-white transition-all duration-300 ease-out disabled:opacity-40 disabled:hover:bg-slate-200/40 disabled:hover:text-slate-900 disabled:hover:border-slate-800 cursor-pointer relative overflow-hidden"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-3">
                  {/* Custom CSS Monochromatic Loading Pulse Indicator */}
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-800 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-900"></span>
                  </span>
                  <span className="animate-pulse tracking-[0.25em] lowercase font-normal text-slate-700">verifying connection...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Quiet Error Treatment Footnote */}
            {error && (
              <p className="text-xs font-mono font-medium text-rose-950 tracking-wide border-l-2 border-rose-800 pl-3 py-0.5 mt-1">
                ! {error.toLowerCase()}
              </p>
            )}
          </div>

          {/* Alternative Switch Navigation */}
          <div className="text-center pt-2">
            <p className="text-xs font-mono text-slate-500 tracking-normal">
              First time here?{" "}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-slate-800 hover:text-slate-950 font-bold underline underline-offset-4 decoration-slate-300 hover:decoration-slate-900 transition-colors duration-200 focus:outline-none ml-1 group relative py-0.5 cursor-pointer"
              >
                Create Credentials.
              </button>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}