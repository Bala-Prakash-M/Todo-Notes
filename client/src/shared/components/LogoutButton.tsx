import React, { useState, useRef, useEffect } from "react";
import { LogOut, Monitor, Globe } from "lucide-react";
import { useAuthContext } from "../../app/providers/AuthContext";

interface LogoutButtonProps {
  onLogoutThisDevice?: () => void;
  onLogoutAllDevices?: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  onLogoutThisDevice,
  onLogoutAllDevices,
}) => {
  const { logout, logoutAll } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleThisDevice = () => {
    setIsOpen(false);
    if (onLogoutThisDevice) {
      onLogoutThisDevice();
    } else {
      logout();
    }
  };

  const handleAllDevices = () => {
    setIsOpen(false);
    if (onLogoutAllDevices) {
      onLogoutAllDevices();
    } else {
      logoutAll();
    }
  };

  return (
    <div className="relative w-full" ref={popoverRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-500 hover:text-rose-600 hover:bg-rose-50/60 rounded-xl transition-all duration-200 group cursor-pointer"
      >
        <LogOut className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
        <span>Log out</span>
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-56 rounded-xl border border-slate-100 bg-white p-1.5 shadow-lg shadow-slate-900/5 z-50 animate-[fadeIn_0.15s_ease-out]">
          <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Account Actions
          </div>

          {/* Option 1: Log out in this device */}
          <button
            type="button"
            onClick={handleThisDevice}
            className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium text-slate-700 hover:text-rose-600 hover:bg-rose-50/50 rounded-lg transition-colors cursor-pointer text-left"
          >
            <Monitor className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-500" />
            <span>Log out in this device</span>
          </button>

          {/* Option 2: Log out of all devices */}
          <button
            type="button"
            onClick={handleAllDevices}
            className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50/80 rounded-lg transition-colors cursor-pointer text-left"
          >
            <Globe className="w-3.5 h-3.5 text-rose-500" />
            <span>Log out of all devices</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LogoutButton;
