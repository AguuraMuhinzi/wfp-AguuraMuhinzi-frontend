import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCooperativeDetails } from '../../Redux/Slices/cooperative/coop_details';

const CooperativeProfilePage = () => {
  const dispatch = useDispatch();
  const { cooperativeDetails, isLoading, error } = useSelector((state) => state.cooperative);

  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (userId) {
      dispatch(fetchCooperativeDetails(userId));
    }
  }, [dispatch, userId]);

  if (isLoading) {
    return <p className="text-center text-green-700 font-bold">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-700 font-bold">Failed to load cooperative details: {error}</p>;
  }

  if (!cooperativeDetails) {
    return <p className="text-center text-gray-700 font-bold">No profile details available.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Profile Header */}
      <div className="bg-green-600 text-white py-10">
        <div className="container mx-auto text-center">
          <div className="inline-block w-32 h-32 rounded-full bg-white overflow-hidden mb-4">
            <img
              src={cooperativeDetails.logo || `${process.env.PUBLIC_URL}/imgs/default-logo.png`}
              alt="Cooperative Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold">{cooperativeDetails.name || 'Cooperative Name'}</h1>
          <p className="text-lg font-semibold">{cooperativeDetails.specialization || 'Specialization not provided'}</p>
        </div>
      </div>

      {/* Profile Content */}
      <div className="container mx-auto mt-10 p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 border">
          <h2 className="text-2xl font-bold text-green-700 mb-6">About the Cooperative</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-green-600 mb-2">Description</h3>
              <p className="text-gray-700">{cooperativeDetails.description || 'No description provided.'}</p>
            </div>

            {/* Document */}
            {cooperativeDetails.document && (
              <div>
                <h3 className="text-lg font-semibold text-green-600 mb-2">Supporting Document</h3>
                <a
                  href={cooperativeDetails.document}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Document
                </a>
              </div>
            )}
          </div>

          {/* Location Details */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-green-600 mb-2">Location</h3>
            <p className="text-gray-700">
              <strong>Street:</strong> {cooperativeDetails.street || 'Not provided'}
            </p>
            <p className="text-gray-700">
              <strong>Province:</strong> {cooperativeDetails.province || 'Not provided'}
            </p>
            <p className="text-gray-700">
              <strong>District:</strong> {cooperativeDetails.district || 'Not provided'}
            </p>
            <p className="text-gray-700">
              <strong>Sector:</strong> {cooperativeDetails.sector || 'Not provided'}
            </p>
          </div>
        </div>
      </div>

      {/* Profile Footer */}
      <div className="container mx-auto mt-10 p-6">
        <div className="flex justify-center">
          <button
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all"
            onClick={() => alert('Edit Profile')}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default CooperativeProfilePage;
