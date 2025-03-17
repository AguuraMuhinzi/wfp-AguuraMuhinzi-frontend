

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCooperativeDetails, createCooperativeDetails } from '../../Redux/Slices/cooperative/coop_details';

// const CooperativeProfilePage = () => {
//   const dispatch = useDispatch();
//   const { cooperativeDetails, isLoading } = useSelector((state) => state.cooperative);

//   const userId = localStorage.getItem('user_id');

//   const [formData, setFormData] = useState({
//     name: '',
//     user_id: userId,
//     specialization: '',
//     description: '',
//     street: '',
//     province: '',
//     district: '',
//     sector: '',
//     document: null,
//   });

//   const [locations, setLocations] = useState({
//     provinces: [],
//     districts: [],
//     sectors: [],
//   });

//   const [selectedProvince, setSelectedProvince] = useState('');
//   const [selectedDistrict, setSelectedDistrict] = useState('');

//   useEffect(() => {
//     if (userId) {
//       dispatch(fetchCooperativeDetails(userId));
//     }

//     setLocations({
//       provinces: [
//         { name: 'Province1', districts: [{ name: 'District1', sectors: ['Sector1', 'Sector2'] }] },
//         { name: 'Province2', districts: [{ name: 'District2', sectors: ['Sector3', 'Sector4'] }] },
//       ],
//     });
//   }, [dispatch, userId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleDocumentChange = (e) => {
//     setFormData((prev) => ({ ...prev, document: e.target.files[0] }));
//   };

//   const handleProvinceChange = (e) => {
//     const provinceName = e.target.value;
//     const province = locations.provinces.find((prov) => prov.name === provinceName);
//     setSelectedProvince(provinceName);
//     setFormData((prev) => ({ ...prev, province: provinceName, district: '', sector: '' }));
//     setLocations((prev) => ({ ...prev, districts: province?.districts || [] }));
//   };

//   const handleDistrictChange = (e) => {
//     const districtName = e.target.value;
//     const district = locations.districts.find((dist) => dist.name === districtName);
//     setSelectedDistrict(districtName);
//     setFormData((prev) => ({ ...prev, district: districtName, sector: '' }));
//     setLocations((prev) => ({ ...prev, sectors: district?.sectors || [] }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Create a FormData object for the request
//     const data = new FormData();
//     Object.keys(formData).forEach((key) => {
//       data.append(key, formData[key]);
//     });

//     dispatch(createCooperativeDetails(data));
//   };

//   if (isLoading) {
//     return <p className="text-center text-green-700 font-bold">Loading...</p>;
//   }

//   if (!cooperativeDetails) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-bold text-green-600 text-center mb-6">Set Up Your Cooperative Profile</h2>
//           <form onSubmit={handleSubmit} className="space-y-5 max-w-lg mx-auto">
//             <input
//               type="text"
//               name="name"
//               placeholder="Cooperative Name"
//               required
//               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
//               onChange={handleChange}
//               value={formData.name}
//             />
//             <input
//               type="hidden"
//               name="user_id"
//               value={formData.user_id}
//               readOnly
//               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 bg-gray-100"
//             />
//             <input
//               type="text"
//               name="specialization"
//               placeholder="Specialization (e.g., Dairy, Coffee)"
//               required
//               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
//               onChange={handleChange}
//               value={formData.specialization}
//             />
//             <textarea
//               name="description"
//               placeholder="Description of your Cooperative"
//               rows="4"
//               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
//               onChange={handleChange}
//               value={formData.description}
//             ></textarea>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//               <input
//                 type="text"
//                 name="street"
//                 placeholder="Street Address"
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
//                 onChange={handleChange}
//                 value={formData.street}
//               />

//               <select
//   name="province"
//   value={selectedProvince}
//   onChange={handleProvinceChange}
//   required
//   className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
// >
//   <option value="">Select Province</option>
//   {locations.provinces?.map((province) => (
//     <option key={province.name} value={province.name}>
//       {province.name}
//     </option>
//   ))}
// </select>

// <select
//   name="district"
//   value={selectedDistrict}
//   onChange={handleDistrictChange}
//   required
//   className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
//   disabled={!selectedProvince}
// >
//   <option value="">Select District</option>
//   {locations.districts?.map((district) => (
//     <option key={district.name} value={district.name}>
//       {district.name}
//     </option>
//   ))}
// </select>

// <select
//   name="sector"
//   required
//   className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
//   disabled={!selectedDistrict}
//   onChange={handleChange}
//   value={formData.sector}
// >
//   <option value="">Select Sector</option>
//   {locations.sectors?.map((sector) => (
//     <option key={sector} value={sector}>
//       {sector}
//     </option>
//   ))}
// </select>

//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Upload Supporting Documents
//               </label>
//               <input
//                 type="file"
//                 name="document"
//                 onChange={handleDocumentChange}
//                 accept=".pdf,.doc,.docx,.jpg,.png"
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 mt-2"
//               />
//               <p className="text-xs text-gray-500 mt-1">
//                 Accepted formats: .pdf, .doc, .docx, .jpg, .png
//               </p>
//             </div>
//             <button
//               type="submit"
//               className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300"
//             >
//               Save Profile
//             </button>
//           </form>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="bg-green-600 text-white py-10">
//         <div className="container mx-auto text-center">
//           <div className="inline-block w-32 h-32 rounded-full bg-white overflow-hidden mb-4">
//             <img
//               src={cooperativeDetails.logo || `${process.env.PUBLIC_URL}/imgs/default-logo.png`}
//               alt="Cooperative Logo"
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <h1 className="text-3xl font-bold">{cooperativeDetails.name}</h1>
//           <p className="text-lg font-semibold">{cooperativeDetails.specialization}</p>
//         </div>
//       </div>
//       <div className="container mx-auto mt-10 p-6">
//         <div className="bg-white shadow-lg rounded-lg p-6 border">
//           <h2 className="text-2xl font-bold text-green-700 mb-6">About the Cooperative</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div>
//               <h3 className="text-lg font-semibold text-green-600 mb-2">Description</h3>
//               <p className="text-gray-700">{cooperativeDetails.description}</p>
//             </div>
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
//           <div className="mt-8">
//             <h3 className="text-lg font-semibold text-green-600 mb-2">Location</h3>
//             <p className="text-gray-700">
//               <strong>Street:</strong> {cooperativeDetails.street}
//             </p>
//             <p className="text-gray-700">
//               <strong>Province:</strong> {cooperativeDetails.province}
//             </p>
//             <p className="text-gray-700">
//               <strong>District:</strong> {cooperativeDetails.district}
//             </p>
//             <p className="text-gray-700">
//               <strong>Sector:</strong> {cooperativeDetails.sector}
//             </p>
//           </div>
//         </div>
//       </div>
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
  const [activeTab, setActiveTab] = useState('profile');
  const [showEditForm, setShowEditForm] = useState(false); // state to toggle form visibility

  useEffect(() => {
    if (userId) {
      dispatch(fetchCooperativeDetails(userId));
    }

    setLocations({
      provinces: [
        { name: 'Province1', districts: [{ name: 'District1', sectors: ['Sector1', 'Sector2'] }] },
        { name: 'Province2', districts: [{ name: 'District2', sectors: ['Sector3', 'Sector4'] }] },
      ],
    });
  }, [dispatch, userId]);

  useEffect(() => {
    if (cooperativeDetails) {
      setFormData({
        ...formData,
        name: cooperativeDetails.name,
        specialization: cooperativeDetails.specialization,
        description: cooperativeDetails.description,
        street: cooperativeDetails.street,
        province: cooperativeDetails.province,
        district: cooperativeDetails.district,
        sector: cooperativeDetails.sector,
      });
    }
  }, [cooperativeDetails]);

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

    if (cooperativeDetails) {
      dispatch(createCooperativeDetails(data)); // If profile exists, update it
    } else {
      dispatch(createCooperativeDetails(data)); // If profile doesn't exist, create it
    }

    setShowEditForm(false); // Hide the form after submitting
  };

  const ProfileCard = () => {
    if (!cooperativeDetails) return null;

    return (
      <div className="bg-white rounded-lg shadow mb-5 p-5">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-green-600 rounded-full text-white flex items-center justify-center text-xl font-bold mr-4">
            {cooperativeDetails.name ? cooperativeDetails.name.charAt(0) : 'C'}
          </div>
          <div className="flex-grow">
            <h2 className="text-lg font-bold">{cooperativeDetails.name}</h2>
            <p className="text-gray-600">Member Since: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600" onClick={() => setShowEditForm(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  const AddNewButton = () => {
    return (
      <div className="bg-white rounded-lg shadow p-5">
        <button className="w-full py-2 border border-gray-300 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-50" onClick={() => setShowEditForm(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          ADD NEW SHOP
        </button>
      </div>
    );
  };

  const ProfileDetailsCard = () => {
    return (
      <div className="bg-white rounded-lg shadow p-5 mt-5">
        <h3 className="text-xl font-semibold text-gray-700">Cooperative Details</h3>
        <div className="mt-3">
          <p className="text-gray-600"><strong>Specialization:</strong> {cooperativeDetails.specialization}</p>
          <p className="text-gray-600"><strong>Description:</strong> {cooperativeDetails.description}</p>
          <p className="text-gray-600"><strong>Address:</strong> {cooperativeDetails.street}, {cooperativeDetails.district}, {cooperativeDetails.province}, {cooperativeDetails.sector}</p>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <p className="text-center text-green-700 font-bold">Loading...</p>;
  }

  // Show the form when showEditForm is true
  if (showEditForm) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-green-600 text-center mb-6">Edit Cooperative Profile</h2>
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
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Left column */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold text-gray-700 mb-2 border-b pb-2">Profiles</h3>
            <ProfileCard />
            <AddNewButton />
          </div>
          
          {/* Right column */}
          <div className="md:col-span-2">
            <ProfileDetailsCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CooperativeProfilePage;
