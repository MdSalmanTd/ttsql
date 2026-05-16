import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../api/axios';
import VehicleSelector from '../../components/VehicleSelector';

const EditTrip = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vehicle: '',
    date: '',
    fromLocation: '',
    toLocation: '',
    deposit: '',
    cost: '',
    comments: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await API.get(`/trips/${id}`);
        const trip = res.data;
        setFormData({
          vehicle: trip.vehicle,
          date: trip.date ? new Date(trip.date).toISOString().split('T')[0] : '',
          fromLocation: trip.fromLocation || '',
          toLocation: trip.toLocation || '',
          deposit: trip.deposit || '',
          cost: trip.cost || '',
          comments: trip.comments || ''
        });
      } catch (err) {
        setError('Failed to fetch trip');
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      await API.put(`/trips/update/${id}`, formData);
      setSuccess('Trip updated successfully!');
      setTimeout(() => navigate('/all-trips'), 1500);
    } catch (err) {
      setError('Failed to update trip');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full overflow-y-auto min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-black rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Edit Trip</h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-white mb-4">{error}</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Vehicle Selection */}
             <VehicleSelector
              selected={formData.vehicle}
              onChange={handleChange}
            />
            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-black text-white border border-white/20 shadow-sm focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">From Location</label>
              <input
                type="text"
                name="fromLocation"
                value={formData.fromLocation}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-black text-white border border-white/20 shadow-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">To Location</label>
              <input
                type="text"
                name="toLocation"
                value={formData.toLocation}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-black text-white border border-white/20 shadow-sm focus:outline-none"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Deposit</label>
                <input
                  type="number"
                  name="deposit"
                  value={formData.deposit}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-black text-white border border-white/20 shadow-sm focus:outline-none"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Cost</label>
                <input
                  type="number"
                  name="cost"
                  value={formData.cost}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-black text-white border border-white/20 shadow-sm focus:outline-none"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Comments</label>
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-black text-white border border-white/20 shadow-sm focus:outline-none"
                rows={3}
              />
            </div>
            {success && <div className="text-white mb-2">{success}</div>}
            {error && <div className="text-white mb-2">{error}</div>}
            <div className="flex gap-4 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-white text-black py-3 px-2 rounded-xl hover:bg-gray-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg transition-all duration-200 shadow-lg"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/all-trips')}
                className="px-6 py-3 border border-white text-white rounded-xl hover:bg-white hover:text-black focus:outline-none font-semibold text-lg transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditTrip;