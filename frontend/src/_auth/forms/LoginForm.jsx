import React, { useState, useContext } from 'react';
import ImgMap from '../../assets/images/pula-20000-sdb-46398d-preview-1.png';
import logo from '../../assets/images/logo3.png';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from '../../context/AuthContext';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await login(formData);
      if (result.success) {
        navigate('/dashboard'); 
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full w-full min-h-screen flex items-center justify-center p-4 bg-linear-to-l from-black to-gray-950">
      <div className="w-full h-full overflow-hidden shadow-xl flex flex-col lg:flex-row">
        
        {/* Left: Graphic Side */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-[0A0A0A] items-center justify-center relative overflow-hidden">
          <div className="w-full h-full flex items-center justify-center p-4">
            <img
              src={ImgMap}
              alt="Map Illustration"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* Top Left Logo */}
          <div className="absolute top-8 right-10 bg-black/10 rounded-md p-1 shadow-md">
            <Link to="/" className="flex items-center space-x-2">
              <span className='h-4 w-4 bg-white shadow-white/50 rounded-full animate-pulse animate-infinite animate-duration-1000'></span>
              <img src={logo} alt="TrackTruck Logo" className="h-10 w-10 rounded" />
              <span className="text-lg font-bold text-white">TrackTruck</span>
            </Link>
          </div>
        </div>

        {/* Right: Login Form */}
        <div className="w-full flex items-center justify-center lg:w-1/2 px-6 py-12 sm:py-24 bg-[0A0A0A]">
          <div className="w-full max-w-md">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
              Log in to <span className="text-white">TrackTruck</span>
            </h2>

            {/* Google Login */}
            {/* <div className="space-y-3 mb-6">
              <button className="flex items-center justify-center w-full bg-neutral-900 hover:bg-neutral-800 text-white py-2.5 rounded-lg transition text-sm font-medium">
                <FaGoogle className="mr-2" />
                Log in with Google
              </button>
            </div> */}

            {/* Divider */}
            {/* <div className="flex items-center my-4">
              <hr className="flex-grow border-neutral-700" />
              <span className="mx-2 text-sm text-neutral-500">OR</span>
              <hr className="flex-grow border-neutral-700" />
            </div> */}

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-white/10 border border-white/20 rounded-lg">
                <p className="text-white text-sm">{error}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm text-neutral-400">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your email address"
                  required
                  className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm text-neutral-400">Password</label>
                  <Link to="/forgot-password" className="text-xs text-neutral-300 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Your password"
                  required
                  className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-black font-semibold py-2.5 rounded-lg transition hover:bg-neutral-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Logging in...' : 'Log in'}
              </button>
            </form>

            <p className="text-sm text-center text-neutral-400 mt-8">
              Don't have an account?{" "}
              <Link to="/register" className="text-white hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
