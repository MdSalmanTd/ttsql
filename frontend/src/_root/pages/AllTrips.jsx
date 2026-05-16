import React, { useEffect, useState } from 'react';
import API from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { LuDownload } from "react-icons/lu";

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

  // Pagination logic
  const totalPages = Math.ceil(trips.length / PAGE_SIZE);
  const paginatedTrips = trips.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

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
    <div className="p-10 w-full min-h-screen overflow-y-auto bg-black text-white">
      <div className="mb-6 flex justify-between">
      <h1 className="text-2xl font-bold">All Trips</h1>
        <button
          onClick={handleDownloadCSV}
          className="bg-white text-black px-4 py-3 flex items-center gap-2 rounded shadow hover:bg-gray-200 transition"
        >
          <LuDownload className="h-5 w-5" />
          Download CSV
        </button>
      </div>
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