// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCooperativeDetails } from '../../Redux/Slices/cooperative/coop_details';

// const CooperativeProfilePage = () => {
//   const dispatch = useDispatch();
//   const { cooperativeDetails, isLoading, error } = useSelector((state) => state.cooperative);

//   const userId = localStorage.getItem('user_id');

//   useEffect(() => {
//     if (userId) {
//       dispatch(fetchCooperativeDetails(userId));
//     }
//   }, [dispatch, userId]);

//   if (isLoading) {
//     return <p className="text-center text-green-700 font-bold">Loading...</p>;
//   }

//   if (error) {
//     return <p className="text-center text-red-700 font-bold">Failed to load cooperative details: {error}</p>;
//   }

//   if (!cooperativeDetails) {
//     return <p className="text-center text-gray-700 font-bold">No profile details available.</p>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Profile Header */}
//       <div className="bg-green-600 text-white py-10">
//         <div className="container mx-auto text-center">
//           <div className="inline-block w-32 h-32 rounded-full bg-white overflow-hidden mb-4">
//             <img
//               src={cooperativeDetails.logo || `${process.env.PUBLIC_URL}/imgs/default-logo.png`}
//               alt="Cooperative Logo"
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <h1 className="text-3xl font-bold">{cooperativeDetails.name || 'Cooperative Name'}</h1>
//           <p className="text-lg font-semibold">{cooperativeDetails.specialization || 'Specialization not provided'}</p>
//         </div>
//       </div>

//       {/* Profile Content */}
//       <div className="container mx-auto mt-10 p-6">
//         <div className="bg-white shadow-lg rounded-lg p-6 border">
//           <h2 className="text-2xl font-bold text-green-700 mb-6">About the Cooperative</h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/* Description */}
//             <div>
//               <h3 className="text-lg font-semibold text-green-600 mb-2">Description</h3>
//               <p className="text-gray-700">{cooperativeDetails.description || 'No description provided.'}</p>
//             </div>

//             {/* Document */}
//             {cooperativeDetails.document && (
//               <div>
//                 <h3 className="text-lg font-semibold text-green-600 mb-2">Supporting Document</h3>
//                 <a
//                   href={cooperativeDetails.document}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 hover:underline"
//                 >
//                   View Document
//                 </a>
//               </div>
//             )}
//           </div>

//           {/* Location Details */}
//           <div className="mt-8">
//             <h3 className="text-lg font-semibold text-green-600 mb-2">Location</h3>
//             <p className="text-gray-700">
//               <strong>Street:</strong> {cooperativeDetails.street || 'Not provided'}
//             </p>
//             <p className="text-gray-700">
//               <strong>Province:</strong> {cooperativeDetails.province || 'Not provided'}
//             </p>
//             <p className="text-gray-700">
//               <strong>District:</strong> {cooperativeDetails.district || 'Not provided'}
//             </p>
//             <p className="text-gray-700">
//               <strong>Sector:</strong> {cooperativeDetails.sector || 'Not provided'}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Profile Footer */}
//       <div className="container mx-auto mt-10 p-6">
//         <div className="flex justify-center">
//           <button
//             className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all"
//             onClick={() => alert('Edit Profile')}
//           >
//             Edit Profile
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CooperativeProfilePage;



import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCooperativeDetails, createCooperativeDetails } from '../../Redux/Slices/cooperative/coop_details';

const CooperativeProfilePage = () => {
  const dispatch = useDispatch();
  const { cooperativeDetails, isLoading } = useSelector((state) => state.cooperative);

  const userId = localStorage.getItem('user_id');

  const [formData, setFormData] = useState({
    name: '',
    user_id: userId,
    specialization: '',
    description: '',
    street: '',
    province: '',
    district: '',
    sector: '',
    document: null,
  });

  const [locations, setLocations] = useState({
    provinces: [],
    districts: [],
    sectors: [],
  });

  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  useEffect(() => {
    if (userId) {
      dispatch(fetchCooperativeDetails(userId));
    }

    // Load location data (replace with actual data fetching logic)
    setLocations({
      provinces: [
        { name: 'Province1', districts: [{ name: 'District1', sectors: ['Sector1', 'Sector2'] }] },
        { name: 'Province2', districts: [{ name: 'District2', sectors: ['Sector3', 'Sector4'] }] },
      ],
    });
  }, [dispatch, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDocumentChange = (e) => {
    setFormData((prev) => ({ ...prev, document: e.target.files[0] }));
  };

  const handleProvinceChange = (e) => {
    const provinceName = e.target.value;
    const province = locations.provinces.find((prov) => prov.name === provinceName);
    setSelectedProvince(provinceName);
    setFormData((prev) => ({ ...prev, province: provinceName, district: '', sector: '' }));
    setLocations((prev) => ({ ...prev, districts: province?.districts || [] }));
  };

  const handleDistrictChange = (e) => {
    const districtName = e.target.value;
    const district = locations.districts.find((dist) => dist.name === districtName);
    setSelectedDistrict(districtName);
    setFormData((prev) => ({ ...prev, district: districtName, sector: '' }));
    setLocations((prev) => ({ ...prev, sectors: district?.sectors || [] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object for the request
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    dispatch(createCooperativeDetails(data));
  };

  if (isLoading) {
    return <p className="text-center text-green-700 font-bold">Loading...</p>;
  }

  if (!cooperativeDetails) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-green-600 text-center mb-6">Set Up Your Cooperative Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-5 max-w-lg mx-auto">
            <input
              type="text"
              name="name"
              placeholder="Cooperative Name"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
              onChange={handleChange}
              value={formData.name}
            />
            <input
              type="hidden"
              name="user_id"
              value={formData.user_id}
              readOnly
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 bg-gray-100"
            />
            <input
              type="text"
              name="specialization"
              placeholder="Specialization (e.g., Dairy, Coffee)"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
              onChange={handleChange}
              value={formData.specialization}
            />
            <textarea
              name="description"
              placeholder="Description of your Cooperative"
              rows="4"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
              onChange={handleChange}
              value={formData.description}
            ></textarea>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                type="text"
                name="street"
                placeholder="Street Address"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
                onChange={handleChange}
                value={formData.street}
              />

              <select
  name="province"
  value={selectedProvince}
  onChange={handleProvinceChange}
  required
  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
>
  <option value="">Select Province</option>
  {locations.provinces?.map((province) => (
    <option key={province.name} value={province.name}>
      {province.name}
    </option>
  ))}
</select>

<select
  name="district"
  value={selectedDistrict}
  onChange={handleDistrictChange}
  required
  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
  disabled={!selectedProvince}
>
  <option value="">Select District</option>
  {locations.districts?.map((district) => (
    <option key={district.name} value={district.name}>
      {district.name}
    </option>
  ))}
</select>

<select
  name="sector"
  required
  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
  disabled={!selectedDistrict}
  onChange={handleChange}
  value={formData.sector}
>
  <option value="">Select Sector</option>
  {locations.sectors?.map((sector) => (
    <option key={sector} value={sector}>
      {sector}
    </option>
  ))}
</select>

            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Supporting Documents
              </label>
              <input
                type="file"
                name="document"
                onChange={handleDocumentChange}
                accept=".pdf,.doc,.docx,.jpg,.png"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 mt-2"
              />
              <p className="text-xs text-gray-500 mt-1">
                Accepted formats: .pdf, .doc, .docx, .jpg, .png
              </p>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300"
            >
              Save Profile
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-green-600 text-white py-10">
        <div className="container mx-auto text-center">
          <div className="inline-block w-32 h-32 rounded-full bg-white overflow-hidden mb-4">
            <img
              src={cooperativeDetails.logo || `${process.env.PUBLIC_URL}/imgs/default-logo.png`}
              alt="Cooperative Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold">{cooperativeDetails.name}</h1>
          <p className="text-lg font-semibold">{cooperativeDetails.specialization}</p>
        </div>
      </div>
      <div className="container mx-auto mt-10 p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 border">
          <h2 className="text-2xl font-bold text-green-700 mb-6">About the Cooperative</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-green-600 mb-2">Description</h3>
              <p className="text-gray-700">{cooperativeDetails.description}</p>
            </div>
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
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-green-600 mb-2">Location</h3>
            <p className="text-gray-700">
              <strong>Street:</strong> {cooperativeDetails.street}
            </p>
            <p className="text-gray-700">
              <strong>Province:</strong> {cooperativeDetails.province}
            </p>
            <p className="text-gray-700">
              <strong>District:</strong> {cooperativeDetails.district}
            </p>
            <p className="text-gray-700">
              <strong>Sector:</strong> {cooperativeDetails.sector}
            </p>
          </div>
        </div>
      </div>
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
