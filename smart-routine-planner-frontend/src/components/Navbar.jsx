import { NavLink } from "react-router-dom";

function Navbar() {
  const navLinkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-semibold transition ${
      isActive
        ? "bg-emerald-500/15 text-emerald-300"
        : "text-white hover:bg-white/5 hover:text-emerald-300"
    }`;

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-slate-800 bg-slate-900">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">

        {/* Logo */}
        <NavLink to="/" className="shrink-0">
          <h1 className="text-lg font-bold text-white sm:text-xl">
            Smart{" "}
            <span className="text-emerald-300">
              Routine Planner
            </span>
          </h1>
        </NavLink>

        {/* Navigation */}
        <div className="flex items-center gap-1 sm:gap-2">
          <NavLink to="/" className={navLinkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/routines" className={navLinkClass}>
            Routines
          </NavLink>

        
        </div>

      </div>
    </nav>
  );
}

export default Navbar;