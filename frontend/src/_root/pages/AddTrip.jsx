import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';
import VehicleSelector from '../../components/VehicleSelector';
import { LuCalendarFold } from "react-icons/lu";


const AddTrip = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const dateRef = useRef(null);

  const [formData, setFormData] = useState({
    vehicle: '',
    date: '',
    fromLocation: '',
    toLocation: '',
    deposit: '',
    cost: '',
    comments: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const tripData = {
        ...formData,
        deposit: parseFloat(formData.deposit) || 0,
        cost: parseFloat(formData.cost) || 0,
        date: new Date(formData.date),
      };

      await API.post('/trips/create', tripData);
      setSuccess('Trip added successfully!');

      setFormData({
        vehicle: '',
        date: '',
        fromLocation: '',
        toLocation: '',
        deposit: '',
        cost: '',
        comments: '',
      });

      const redirectTo = user?.role === 'admin' ? '/all-trips' : '/dashboard';
      setTimeout(() => navigate(redirectTo), 1500);

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add trip');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen overflow-y-auto bg-black py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-xl shadow-lg p-6 bg-black">
          <h1 className="text-2xl font-bold text-white mb-6">Add New Trip</h1>

          {error && (
            <div className="mb-4 p-3 bg-white/20 border border-white/30 text-white rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-white/20 border border-white/30 text-white rounded-lg">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Vehicle Selection */}
            <VehicleSelector
              selected={formData.vehicle}
              onChange={handleChange}
            />


            {/* Date Input */}
            <div className="mb-6">
              <label htmlFor="date" className="block text-sm font-medium text-white mb-2">
                Trip Date *
              </label>
              <div className="relative">
                <input
                  ref={dateRef}
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/30 text-white border border-white/20 rounded-lg px-12 py-3 hover:border-white focus:border-white focus:ring-1 focus:ring-white outline-none transition-all duration-200 appearance-none cursor-pointer peer"
                />
                <div className="absolute inset-0 flex items-center pointer-events-none pl-3 text-white/80 peer-hover:text-white peer-focus:text-white transition-colors duration-200">
                  <LuCalendarFold  className="h-5 w-5" />
                </div>
                <div
                  className="absolute inset-0 cursor-pointer"
                  
                  onClick={() => dateRef.current?.showPicker?.()}
                />
              </div>
            </div>




            {/* From Location */}
            <div>
              <label htmlFor="fromLocation" className="block text-sm font-medium text-white mb-2">
                From Location
              </label>
              <input
                type="text"
                id="fromLocation"
                name="fromLocation"
                value={formData.fromLocation}
                onChange={handleChange}
                placeholder="Enter starting location"
                className="w-full px-4 py-3 rounded-lg focus:outline-none bg-black text-white border border-white/20 shadow-sm placeholder-gray-500"
              />
            </div>

            {/* To Location */}
            <div>
              <label htmlFor="toLocation" className="block text-sm font-medium text-white mb-2">
                To Location
              </label>
              <input
                type="text"
                id="toLocation"
                name="toLocation"
                value={formData.toLocation}
                onChange={handleChange}
                placeholder="Enter destination"
                className="w-full px-4 py-3 rounded-lg focus:outline-none bg-black text-white border border-white/20 shadow-sm placeholder-gray-500"
              />
            </div>

            {/* Deposit */}
            <div>
              <label htmlFor="deposit" className="block text-sm font-medium text-white mb-2">
                Deposit Amount
              </label>
              <input
                type="number"
                id="deposit"
                name="deposit"
                value={formData.deposit}
                onChange={handleChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full px-4 py-3 rounded-lg focus:outline-none bg-black text-white border border-white/20 shadow-sm placeholder-gray-500"
              />
            </div>

            {/* Cost */}
            <div>
              <label htmlFor="cost" className="block text-sm font-medium text-white mb-2">
                Trip Cost
              </label>
              <input
                type="number"
                id="cost"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full px-4 py-3 rounded-lg focus:outline-none bg-black text-white border border-white/20 shadow-sm placeholder-gray-500"
              />
            </div>

            {/* Comments */}
            <div>
              <label htmlFor="comments" className="block text-sm font-medium text-white mb-2">
                Comments
              </label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                placeholder="Add any additional comments about the trip"
                rows="4"
                className="w-full px-4 py-3 rounded-lg focus:outline-none bg-black text-white border border-white/20 shadow-sm placeholder-gray-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-white text-black py-3 px-2 rounded-xl hover:bg-gray-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg transition-all duration-200 shadow-lg"
              >
                {isLoading ? 'Adding Trip...' : 'Add Trip'}
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTrip;