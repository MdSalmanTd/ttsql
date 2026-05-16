import React, { useEffect, useState } from 'react';
import API from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { LuDownload, LuSearch } from "react-icons/lu";

const PAGE_SIZE = 10;

function tripsToCSV(trips) {
  const headers = [
    'Driver', 'Vehicle', 'Date', 'From', 'To', 'Deposit', 'Cost', 'Comments'
  ];
  const rows = trips.map(trip => [
    trip.driver?.fullname || 'N/A',
    trip.vehicle,
    trip.date ? new Date(trip.date).toLocaleDateString() : '',
    trip.fromLocation,
    trip.toLocation,
    trip.deposit,
    trip.cost,
    trip.comments
  ]);
  const csvContent = [headers, ...rows]
    .map(row => row.map(field => '"' + String(field).replace(/"/g, '""') + '"').join(','))
    .join('\n');
  return csvContent;
}

const AllTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await API.get('/trips/all');
        setTrips(res.data);
      } catch (err) {
        setError('Failed to fetch trips');
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  const totalCost = trips.reduce((sum, trip) => sum + (parseFloat(trip.cost) || 0), 0);
  const totalDeposit = trips.reduce((sum, trip) => sum + (parseFloat(trip.deposit) || 0), 0);

  // Search filter
  const filteredTrips = trips.filter(trip => 
    (trip.driver?.fullname || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (trip.vehicle || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (trip.fromLocation || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (trip.toLocation || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (trip.comments || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredTrips.length / PAGE_SIZE) || 1;
  const paginatedTrips = filteredTrips.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);


  const handleEdit = (id) => {
    navigate(`/edit-trip/${id}`);
  };

  const handleDownloadCSV = () => {
    const csv = tripsToCSV(paginatedTrips);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'trips.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 md:p-10 w-full min-h-screen overflow-y-auto bg-black text-white">
      <div className="mb-6 flex justify-between">
      <h1 className="text-2xl font-bold">All Trips</h1>
        <button
          onClick={handleDownloadCSV}
          className="bg-white text-black px-4 py-3 flex items-center gap-2 rounded shadow hover:bg-gray-200 transition"
        >
          <LuDownload className="h-5 w-5 hidden sm:block" />
          <span className="hidden sm:inline">Download CSV</span>
          <LuDownload className="h-5 w-5 sm:hidden" />
        </button>
      </div>

      {!loading && !error && (
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg text-gray-500 font-semibold mb-2">Total Cost</h2>
            <p className="text-3xl font-bold text-gray-900">${totalCost.toFixed(2)}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg text-gray-500 font-semibold mb-2">Total Deposit</h2>
            <p className="text-3xl font-bold text-gray-900">${totalDeposit.toFixed(2)}</p>
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className="mb-6 flex justify-end">
          <div className="relative w-full sm:w-1/2 md:w-1/3">
            <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search trips..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-black border border-white/20 text-white focus:outline-none focus:border-white transition"
            />
          </div>
        </div>
      )}

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-white">{error}</div>
      ) : (
        <>
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full text-center bg-black border border-white/10">
            <thead>
              <tr className="bg-white/10">
                <th className="px-4 py-2 border-b border-white/10">Driver</th>
                <th className="px-4 py-2 border-b border-white/10">Vehicle</th>
                <th className="px-4 py-2 border-b border-white/10">Date</th>
                <th className="px-4 py-2 border-b border-white/10">From</th>
                <th className="px-4 py-2 border-b border-white/10">To</th>
                <th className="px-4 py-2 border-b border-white/10">Deposit</th>
                <th className="px-4 py-2 border-b border-white/10">Cost</th>
                <th className="px-4 py-2 border-b border-white/10">Comments</th>
                <th className="px-4 py-2 border-b border-white/10">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTrips.map((trip) => (
                <tr key={trip.id ?? trip._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-2 border-b border-white/10">{trip.driver?.fullname || 'N/A'}</td>
                  <td className="px-4 py-2 border-b border-white/10">{trip.vehicle}</td>
                  <td className="px-4 py-2 border-b border-white/10">{trip.date ? new Date(trip.date).toLocaleDateString() : ''}</td>
                  <td className="px-4 py-2 border-b border-white/10">{trip.fromLocation}</td>
                  <td className="px-4 py-2 border-b border-white/10">{trip.toLocation}</td>
                  <td className="px-4 py-2 border-b border-white/10">{trip.deposit}</td>
                  <td className="px-4 py-2 border-b border-white/10">{trip.cost}</td>
                  <td className="px-4 py-2 border-b border-white/10">{trip.comments}</td>
                  <td className="px-4 py-2 border-b border-white/10">
                    <button
                      onClick={() => handleEdit(trip.id ?? trip._id)}
                      className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200 transition"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-white/10 text-white border border-white/20 disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded border border-white/20 ${currentPage === i + 1 ? 'bg-white text-black' : 'bg-white/10 text-white'}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-white/10 text-white border border-white/20 disabled:opacity-50"
          >
            Next
          </button>
        </div>
        </>
      )}
    </div>
  );
};

export default AllTrips;