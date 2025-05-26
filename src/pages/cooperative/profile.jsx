

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCooperativeDetails,
  createCooperativeDetails,
  updateCooperativeDetails,
} from '../../Redux/Slices/cooperative/coop_details';
import { MapPin, Building2, Users, FileText, Award, Calendar, Edit3 } from 'lucide-react';

const CooperativeProfileSetupPage = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.cooperative);
  const { userInfo } = useSelector((state) => state.user);
  const userId = userInfo?.id || localStorage.getItem('user_id');

  const [showForm, setShowForm] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [document, setDocument] = useState(null);
  const [formData, setFormData] = useState({
    user_id: userId,
    name: '',
    specialization: '',
    description: '',
    street: '',
    province: '',
    district: '',
    sector: ''
  });

  const locations = {
    provinces: [
      {
        name: 'Western Province',
        districts: [
          {
            name: 'Nyabihu',
            sectors: ['Mukamira', 'Jenda', 'Jomba', 'Karago', 'Kintoye']
          }
        ]
      }
    ]
  };

  useEffect(() => {
    if (userId) dispatch(fetchCooperativeDetails(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (data) {
      setFormData({
        user_id: userId,
        name: data.name || '',
        specialization: data.specialization || '',
        description: data.description || '',
        street: data.street || '',
        province: data.province || '',
        district: data.district || '',
        sector: data.sector || ''
      });
      setSelectedProvince(data.province || '');
      setSelectedDistrict(data.district || '');
      setShowForm(false);
    } else if (!isLoading && data === null) {
      // Only show form when loading is complete and data is null
      setShowForm(true);
    }
  }, [data, userId, isLoading]);

  const handleProvinceChange = (e) => {
    const { value } = e.target;
    setSelectedProvince(value);
    setSelectedDistrict('');
    setFormData((prev) => ({ ...prev, province: value }));
  };

  const handleDistrictChange = (e) => {
    const { value } = e.target;
    setSelectedDistrict(value);
    setFormData((prev) => ({ ...prev, district: value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDocumentChange = (e) => {
    setDocument(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, val]) => form.append(key, val));
    form.append('user', userId);
    if (document) form.append('document', document);

    if (data) {
      dispatch(updateCooperativeDetails({ userId, data: form }));
    } else {
      dispatch(createCooperativeDetails(form));
    }
    setShowForm(false);
  };

  const province = locations.provinces.find((p) => p.name === selectedProvince);
  const district = province?.districts.find((d) => d.name === selectedDistrict);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex bg-gradient-to-br from-green-50 to-blue-50">
        <div className="w-full p-8 sm:p-16 bg-white flex flex-col justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Show form if no data exists or user wants to edit
  const shouldShowForm = showForm || (!data && !isLoading);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-green-50 to-blue-50">
      <div className="w-full p-8 sm:p-16 bg-white flex flex-col justify-center relative">
        {shouldShowForm ? (
          <div className="max-w-4xl mx-auto w-full">
            <h1 className="text-4xl font-bold mb-6 text-green-600 text-center">
              {data ? 'Edit Your Profile' : 'Set Up Your Profile'}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input name="name" type="text" placeholder="Cooperative Name" className="w-full border p-3 rounded" value={formData.name} onChange={handleChange} required />
              <input name="specialization" type="text" placeholder="Specialization (e.g., Coffee, Dairy)" className="w-full border p-3 rounded" value={formData.specialization} onChange={handleChange} required />
              <textarea name="description" placeholder="Describe your cooperative..." rows={4} className="w-full border p-3 rounded" value={formData.description} onChange={handleChange} required />
              <input name="street" type="text" placeholder="Street Address" className="w-full border p-3 rounded" value={formData.street} onChange={handleChange} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select name="province" value={selectedProvince} onChange={handleProvinceChange} className="border p-3 rounded" required>
                  <option value="">Select Province</option>
                  {locations.provinces.map((prov) => (
                    <option key={prov.name} value={prov.name}>{prov.name}</option>
                  ))}
                </select>
                <select name="district" value={selectedDistrict} onChange={handleDistrictChange} className="border p-3 rounded" required>
                  <option value="">Select District</option>
                  {province?.districts.map((dist) => (
                    <option key={dist.name} value={dist.name}>{dist.name}</option>
                  ))}
                </select>
                <select name="sector" value={formData.sector} onChange={handleChange} className="border p-3 rounded" required>
                  <option value="">Select Sector</option>
                  {district?.sectors.map((sector) => (
                    <option key={sector} value={sector}>{sector}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Upload Supporting Document</label>
                <input type="file" name="document" onChange={handleDocumentChange} accept=".pdf,.doc,.docx,.jpg,.png" className="block w-full border p-2 rounded" />
              </div>
              <div className="flex gap-4">
                <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition">Save Profile</button>
                {data && (
                  <button type="button" onClick={() => setShowForm(false)} className="bg-gray-400 text-white px-6 py-3 rounded hover:bg-gray-500 transition">Cancel</button>
                )}
              </div>
            </form>
          </div>
        ) : (
          data && (
            <div className="max-w-4xl mx-auto w-full">
              <div className="text-center mb-12">
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-xl">
                    <Building2 className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-3">{data.name}</h1>
                <p className="text-xl text-green-600 font-semibold">{data.specialization}</p>
                <div className="flex items-center justify-center mt-4 space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Est. {data.established || 'N/A'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{data.members || 0} Members</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-green-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">About Us</h2>
                  </div>
                  <p className="text-gray-600">{data.description}</p>
                </div>
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Location</h2>
                  </div>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>Street:</strong> {data.street}</p>
                    <p><strong>Sector:</strong> {data.sector}</p>
                    <p><strong>District:</strong> {data.district}</p>
                    <p><strong>Province:</strong> {data.province}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200 mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Supporting Documents</h3>
                      <p className="text-gray-600">Official cooperative documentation</p>
                    </div>
                  </div>
                  {data.document ? (
                    <a 
                      href={data.document} 
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition"
                      target="_blank" 
                      rel="noreferrer"
                    >
                      View Document
                    </a>
                  ) : (
                    <span className="text-gray-500 italic">No document uploaded</span>
                  )}
                </div>
              </div>

              <div className="mt-4 text-center">
                <button 
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:to-green-700 text-white px-8 py-4 rounded-xl font-semibold transition shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
                >
                  <Edit3 className="w-5 h-5" />
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CooperativeProfileSetupPage;