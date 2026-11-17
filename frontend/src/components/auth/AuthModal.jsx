import { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contact: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs px-4">
      <div className="relative w-full max-w-md bg-vedic-cream border border-vedic-gold/40 p-8 shadow-2xl">
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 text-vedic-muted hover:text-vedic-charcoal"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <img src="/assets/logo.webp" alt="Vedic Nature" className="h-14 mx-auto mb-3 object-contain" />
          <h2 className="font-serif text-3xl text-vedic-green">
            {isLogin ? 'Welcome Back' : 'Join Vedic Nature'}
          </h2>
          <p className="text-xs uppercase tracking-widest text-vedic-muted mt-1">
            {isLogin ? 'Sign in to your account' : 'Create your botanical luxury account'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-xs uppercase tracking-wider text-vedic-muted mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full border border-vedic-gold/40 bg-white px-3 py-2.5 text-sm focus:outline-hidden focus:border-vedic-green"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-vedic-muted mb-1">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  name="contact"
                  required
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full border border-vedic-gold/40 bg-white px-3 py-2.5 text-sm focus:outline-hidden focus:border-vedic-green"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs uppercase tracking-wider text-vedic-muted mb-1">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full border border-vedic-gold/40 bg-white px-3 py-2.5 text-sm focus:outline-hidden focus:border-vedic-green"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-vedic-muted mb-1">
              Password *
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full border border-vedic-gold/40 bg-white px-3 py-2.5 text-sm focus:outline-hidden focus:border-vedic-green"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-vedic-green hover:bg-vedic-green-dark text-white py-3 text-xs uppercase tracking-[0.2em] transition cursor-pointer"
          >
            {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-vedic-muted">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-vedic-green font-semibold underline cursor-pointer"
          >
            {isLogin ? 'Register Now' : 'Login Here'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;