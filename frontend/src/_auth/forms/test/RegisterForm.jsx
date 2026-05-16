// src/pages/Register.jsx
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const { register: authRegister } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await authRegister(data);
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full h-full space-y-8 bg-white p-8 rounded-none shadow-none flex flex-col justify-center">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create an account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="fullname"
                name="fullname"
                type="text"
                autoComplete="name"
                {...register('fullname', { required: 'Full name is required' })}
                className={`mt-1 block w-full px-3 py-2 border ${errors.fullname ? 'border-white' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-white focus:border-white`}
              />
              {errors.fullname && (
                <p className="mt-1 text-sm text-white">{errors.fullname.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: 'Please enter a valid email address',
                  },
                })}
                className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-white' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-white focus:border-white`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-white">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <input
                id="contact"
                name="contact"
                type="tel"
                autoComplete="tel"
                {...register('contact', {
                  required: 'Contact number is required',
                  pattern: {
                    value: /^01\d{9}$/,
                    message: 'Please enter a valid contact number starting with 01',
                  },
                })}
                className={`mt-1 block w-full px-3 py-2 border ${errors.contact ? 'border-white' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-white focus:border-white`}
              />
              {errors.contact && (
                <p className="mt-1 text-sm text-white">{errors.contact.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                })}
                className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-white' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-white focus:border-white`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-white">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === watch('password') || 'Passwords do not match',
                })}
                className={`mt-1 block w-full px-3 py-2 border ${errors.confirmPassword ? 'border-white' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-white focus:border-white`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-white">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-white hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              Register
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-white hover:text-white"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;