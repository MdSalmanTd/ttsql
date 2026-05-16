import React, { useState } from 'react';
import ImgMap from '../../assets/images/pula-20000-sdb-46398d-preview-1.png';
import logo from '../../assets/images/logo3.png';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import API from '../../api/axios';

const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const tokenFromUrl = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!tokenFromUrl) {
      setError('Invalid reset link. Request a new password reset from the login page.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await API.post('/users/reset-password', {
        token: tokenFromUrl,
        password,
      });
      setSuccess(data.message || 'Password reset successfully.');
      setPassword('');
      setConfirm('');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      const msg = err.response?.data?.message || 'Could not reset password.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full w-full min-h-screen flex items-center justify-center p-4 bg-gradient-to-l from-black to-gray-950">
      <div className="w-full h-full overflow-hidden shadow-xl flex flex-col lg:flex-row">
        <div className="hidden lg:flex w-full lg:w-1/2 bg-[0A0A0A] items-center justify-center relative overflow-hidden">
          <div className="w-full h-full flex items-center justify-center p-4">
            <img src={ImgMap} alt="Map Illustration" className="w-full h-full object-cover rounded-2xl" />
          </div>
          <div className="absolute top-8 right-10 bg-black/10 rounded-md p-1 shadow-md">
            <Link to="/" className="flex items-center space-x-2">
              <span className="h-4 w-4 bg-white shadow-white/50 rounded-full animate-pulse animate-infinite animate-duration-1000" />
              <img src={logo} alt="TrackTruck Logo" className="h-10 w-10 rounded" />
              <span className="text-lg font-bold text-white">TrackTruck</span>
            </Link>
          </div>
        </div>

        <div className="w-full flex items-center justify-center lg:w-1/2 px-6 py-12 sm:py-24 bg-[0A0A0A]">
          <div className="w-full max-w-md">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
              Set new password
            </h2>
            <p className="text-sm text-neutral-500 text-center mb-8">
              Choose a strong password (at least 8 characters).
            </p>

            {!tokenFromUrl && (
              <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <p className="text-amber-200 text-sm">
                  This link is missing a token.{' '}
                  <Link to="/forgot-password" className="underline">
                    Request a new reset link
                  </Link>
                  .
                </p>
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-white/10 border border-white/20 rounded-lg">
                <p className="text-white text-sm">{error}</p>
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-white/10 border border-white/20 rounded-lg">
                <p className="text-white text-sm">{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm text-neutral-400">New password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="At least 8 characters"
                  required
                  minLength={8}
                  disabled={!tokenFromUrl}
                  className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 text-sm focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-neutral-400">Confirm password</label>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Repeat password"
                  required
                  minLength={8}
                  disabled={!tokenFromUrl}
                  className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 text-sm focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !tokenFromUrl}
                className="w-full bg-white text-black font-semibold py-2.5 rounded-lg transition hover:bg-neutral-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Updating…' : 'Update password'}
              </button>
            </form>

            <p className="text-sm text-center text-neutral-400 mt-8">
              <Link to="/login" className="text-white hover:underline">
                Back to log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
