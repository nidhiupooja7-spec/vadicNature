import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { name: 'Collections / Shop', path: '/collections' },
  { name: 'New Arrivals', path: '/new-arrivals' },
  { name: 'Gifting', path: '/gifting' },
  { name: 'Bulk Orders', path: '/bulk-orders' },
  { name: 'Collaboration', path: '/collaboration' },
  { name: 'Order Tracking', path: '/track-order' },
];

const iconButton =
  'flex h-10 w-10 items-center justify-center rounded-full text-vedic-cream transition-all duration-200 hover:-translate-y-px hover:bg-white/10 hover:text-vedic-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-vedic-gold/70 cursor-pointer';

const Navbar = () => {
  const { user, logout, setIsAuthModalOpen } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Elevate the header once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock page scroll and allow Escape to close while the mobile menu is open
  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setMobileOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  const handleLogin = () => {
    closeMenu();
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    closeMenu();
    logout();
  };

  const firstName = user?.fullName?.split(' ')[0] ?? 'there';
  const initial = firstName.charAt(0).toUpperCase();

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-all duration-300 ${
        scrolled
          ? 'border-transparent bg-vedic-green-dark/95 shadow-[0_12px_30px_-14px_rgba(10,20,15,0.6)]'
          : 'border-transparent bg-vedic-green-dark/90'
      }`}
    >
      {/* Gold hairline accent along the bottom edge */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-vedic-gold/70 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4 md:h-20">
          {/* Brand Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="group flex shrink-0 items-center rounded-xl bg-vedic-cream px-2 py-1 shadow-[0_6px_16px_-8px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-[1.03]"
          >
            <img
              src="/assets/logo.webp"
              alt="Vedic Nature Logo"
              className="h-9 w-auto object-contain sm:h-11 lg:h-12"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Main" className="hidden items-center xl:flex">
            <span aria-hidden="true" className="mr-4 h-8 w-px bg-vedic-gold/40" />
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="group relative whitespace-nowrap px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200"
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`transition-colors duration-200 ${
                        isActive
                          ? 'text-vedic-gold'
                          : 'text-vedic-cream/80 group-hover:text-vedic-cream'
                      }`}
                    >
                      {item.name}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-center rounded-full bg-vedic-gold transition-transform duration-300 ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {user ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 py-1 pl-1 pr-3.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-vedic-cream text-xs font-semibold text-vedic-green-dark">
                    {initial}
                  </span>
                  <span className="hidden text-xs font-medium text-vedic-cream md:inline">
                    Hi, {firstName}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  title="Logout"
                  aria-label="Logout"
                  className={`${iconButton} hover:bg-red-500/15 hover:text-red-300`}
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                aria-label="Login or register"
                className="flex h-10 items-center justify-center gap-2 rounded-full bg-vedic-cream px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-vedic-green-dark shadow-[0_6px_16px_-8px_rgba(0,0,0,0.5)] transition-all duration-200 hover:-translate-y-px hover:bg-white hover:shadow-[0_10px_20px_-10px_rgba(0,0,0,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-vedic-gold/70 sm:px-5 cursor-pointer"
              >
                <User size={16} strokeWidth={1.75} />
                <span className="hidden sm:inline">Login / Register</span>
              </button>
            )}

            <Link to="/checkout" aria-label="Cart" className={iconButton}>
              <ShoppingBag size={20} strokeWidth={1.5} />
            </Link>

            {/* Mobile / Tablet Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className={`${iconButton} xl:hidden`}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="navbar-drawer xl:hidden max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-white/10 bg-vedic-green-dark shadow-[0_30px_50px_-25px_rgba(0,0,0,0.6)]"
        >
          <nav aria-label="Mobile" className="mx-auto max-w-7xl px-3 pt-3 pb-2 sm:px-6">
            {navItems.map((item, index) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                style={{ animationDelay: `${index * 40}ms` }}
                className={({ isActive }) =>
                  `navbar-item group flex items-center justify-between rounded-xl px-4 py-3.5 text-[13px] uppercase tracking-[0.14em] transition-colors duration-200 ${
                    isActive
                      ? 'bg-white/10 font-semibold text-vedic-gold'
                      : 'text-vedic-cream/85 hover:bg-white/5 hover:text-vedic-cream'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 rounded-full bg-vedic-gold transition-opacity duration-200 ${
                          isActive ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                      {item.name}
                    </span>
                    <ChevronRight
                      size={16}
                      className={`text-vedic-gold transition-transform duration-200 group-hover:translate-x-0.5 ${
                        isActive ? 'opacity-100' : 'opacity-50'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="mx-auto max-w-7xl px-4 pb-5 pt-3 sm:px-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              {user ? (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-vedic-cream text-sm font-semibold text-vedic-green-dark">
                      {initial}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-vedic-gold/90">Signed in</p>
                      <p className="truncate text-sm font-semibold text-vedic-cream">{user.fullName}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex shrink-0 items-center gap-2 rounded-full border border-red-300/40 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-red-300 transition-colors hover:bg-red-500/15 cursor-pointer"
                  >
                    <LogOut size={15} />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <p className="text-center font-serif text-lg italic text-vedic-cream/90">
                    Welcome to Vedic Nature
                  </p>
                  <button
                    type="button"
                    onClick={handleLogin}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-vedic-cream px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-vedic-green-dark shadow-[0_8px_18px_-10px_rgba(0,0,0,0.6)] transition-colors hover:bg-white cursor-pointer"
                  >
                    <User size={16} strokeWidth={1.75} />
                    Login / Register
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
