
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
const navigate = useNavigate();
  const navLinkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-semibold transition ${
      isActive
        ? "bg-emerald-400/15 text-emerald-200 shadow-[inset_0_0_0_1px_rgba(110,231,183,0.12)]"
        : "text-slate-300 hover:bg-white/5 hover:text-emerald-200"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block w-full rounded-lg px-3 py-2 text-center text-sm font-medium transition ${
      isActive
        ? "bg-emerald-400/10 text-emerald-300"
        : "text-slate-300 hover:bg-white/5 hover:text-white"
    }`;
    
    const handleLogout=()=>{
      localStorage.removeItem("token");
navigate("/login", { replace: true });
setIsMenuOpen(false);
}

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-[#30443a] bg-[#17251f] shadow-[0_5px_18px_-12px_rgba(0,0,0,0.8)]">
      <div className="flex h-14 items-center justify-between px-2 sm:px-4 md:px-8">

        {/* Logo */}
        <NavLink to="/" className="shrink-0" onClick={closeMenu}>
          <h1 className="text-sm font-bold text-white sm:text-xl">
            Smart{" "}
            <span className="text-sm text-emerald-300 sm:text-xl">
              Routine Planner
            </span>
          </h1>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 sm:flex md:gap-2">
          <NavLink to="/" end className={navLinkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/routines" className={navLinkClass}>
            Routines
          </NavLink>

          <NavLink to="/ai" className={navLinkClass}>
            AI Planner
          </NavLink>

          {localStorage.getItem("token") ? (
  <button
    onClick={handleLogout}
    className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 hover:bg-white/5 hover:text-emerald-200"
  >
    Logout
  </button>
) : (
  <>
    <NavLink to="/login" className={navLinkClass}>
      Login
    </NavLink>

    <NavLink
      to="/register"
      className="rounded-lg bg-emerald-400 px-3 py-2 text-sm font-semibold text-[#17251f] hover:bg-emerald-300"
    >
      Sign Up
    </NavLink>
  </>
)}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-200 transition hover:bg-white/10 hover:text-emerald-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 sm:hidden"
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            ) : (
              <path
                d="M4 6h16M4 12h16M4 18h16"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            )}
          </svg>
        </button>

        {/* Compact Mobile Navigation */}
        {isMenuOpen && (
          <div
            id="mobile-navigation"
            className="absolute left-0 top-full w-full border-t border-[#30443a] bg-[#17251f] px-2 pb-3 pt-2 shadow-xl sm:hidden"
          >
            <div className="flex flex-col gap-0.5">

              <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Your workspace
              </p>

              <NavLink
                to="/"
                end
                className={mobileNavLinkClass}
                onClick={closeMenu}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/routines"
                className={mobileNavLinkClass}
                onClick={closeMenu}
              >
                Routines
              </NavLink>

              <NavLink
                to="/ai"
                className={mobileNavLinkClass}
                onClick={closeMenu}
              >
                AI Planner
              </NavLink>

              <div className="my-2 border-t border-[#30443a]" />

             {localStorage.getItem("token") ? (
  <button
    onClick={handleLogout}
    className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 hover:bg-white/5 hover:text-emerald-200"
  >
    Logout
  </button>
) : (
  <>
    <NavLink to="/login" className={mobileNavLinkClass}>
      Login
    </NavLink>

    <NavLink
      to="/register"
      className="block w-full rounded-lg bg-emerald-400 px-3 py-2 text-center text-sm font-semibold text-[#17251f] hover:bg-emerald-300"
    >
      Sign Up
    </NavLink>
  </>
)}

            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
