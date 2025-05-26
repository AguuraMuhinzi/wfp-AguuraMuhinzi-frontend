// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAcademyDetails, createAcademyDetails } from '../../Redux/Slices/academy/academy_details';

// const AcademyProfilePage = () => {
//   const dispatch = useDispatch();
//   const { academyDetails, isLoading } = useSelector((state) => state.academy);

//   const userId = localStorage.getItem('user_id');

//   const [formData, setFormData] = useState({
//     user: userId,
//     name: '',
//     school_type: '',
//     level: '',
//     description: '',
//     street: '',
//     province: '',
//     district: '',
//     sector: '',
//   });

//   const [locations, setLocations] = useState({
//     provinces: [],
//     districts: [],
//     sectors: [],
//   });

//   const [selectedProvince, setSelectedProvince] = useState('');
//   const [selectedDistrict, setSelectedDistrict] = useState('');
//   const [schoolTypes] = useState(['Public', 'Private']);
//   const [levels] = useState(['Primary', 'Secondary', 'University']);

//   useEffect(() => {
//     if (userId) {
//       dispatch(fetchAcademyDetails(userId));
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
//     dispatch(createAcademyDetails(formData));
//   };

//   if (isLoading) {
//     return <p className="text-center text-blue-700 font-bold">Loading...</p>;
//   }

//   if (!academyDetails) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">Set Up Your Academy Profile</h2>
//           <form onSubmit={handleSubmit} className="space-y-5 max-w-lg mx-auto">
//             <input
//               type="text"
//               name="name"
//               placeholder="Academy or Institution Name"
//               required
//               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
//               value={formData.name}
//               onChange={handleChange}
//             />
//             <select
//               name="level"
//               value={formData.level}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
//             >
//               <option value="">Select Level</option>
//               {levels.map((lvl) => (
//                 <option key={lvl} value={lvl}>{lvl}</option>
//               ))}
//             </select>
//             <select
//               name="school_type"
//               value={formData.school_type}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
//             >
//               <option value="">Select School Type</option>
//               {schoolTypes.map((type) => (
//                 <option key={type} value={type}>{type}</option>
//               ))}
//             </select>
//             <textarea
//               name="description"
//               placeholder="Description of the Academy"
//               rows="4"
//               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
//               onChange={handleChange}
//               value={formData.description}
//             ></textarea>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//               <input
//                 type="text"
//                 name="street"
//                 placeholder="Street Address"
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
//                 onChange={handleChange}
//                 value={formData.street}
//               />
//               <select
//                 name="province"
//                 value={selectedProvince}
//                 onChange={handleProvinceChange}
//                 required
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
//               >
//                 <option value="">Select Province</option>
//                 {locations.provinces?.map((province) => (
//                   <option key={province.name} value={province.name}>
//                     {province.name}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 name="district"
//                 value={selectedDistrict}
//                 onChange={handleDistrictChange}
//                 required
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
//                 disabled={!selectedProvince}
//               >
//                 <option value="">Select District</option>
//                 {locations.districts?.map((district) => (
//                   <option key={district.name} value={district.name}>
//                     {district.name}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 name="sector"
//                 required
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
//                 disabled={!selectedDistrict}
//                 onChange={handleChange}
//                 value={formData.sector}
//               >
//                 <option value="">Select Sector</option>
//                 {locations.sectors?.map((sector) => (
//                   <option key={sector} value={sector}>
//                     {sector}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <button
//               type="submit"
//               className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300"
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
//       <div className="bg-blue-600 text-white py-10">
//         <div className="container mx-auto text-center">
//           <h1 className="text-3xl font-bold">{academyDetails.name}</h1>
//           <p className="text-lg font-semibold">{academyDetails.level}</p>
//         </div>
//       </div>
//       <div className="container mx-auto mt-10 p-6">
//         <div className="bg-white shadow-lg rounded-lg p-6 border">
//           <h2 className="text-2xl font-bold text-blue-700 mb-6">About the Academy</h2>
//           <p className="text-gray-700 mb-4">
//             <strong>Level:</strong> {academyDetails.level}
//           </p>
//           <p className="text-gray-700 mb-4">
//             <strong>Type:</strong> {academyDetails.school_type}
//           </p>
//           <p className="text-gray-700">{academyDetails.description}</p>
//           <div className="mt-8">
//             <h3 className="text-lg font-semibold text-blue-600 mb-2">Location</h3>
//             <p className="text-gray-700">
//               <strong>Street:</strong> {academyDetails.street}
//             </p>
//             <p className="text-gray-700">
//               <strong>Province:</strong> {academyDetails.province}
//             </p>
//             <p className="text-gray-700">
//               <strong>District:</strong> {academyDetails.district}
//             </p>
//             <p className="text-gray-700">
//               <strong>Sector:</strong> {academyDetails.sector}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AcademyProfilePage;


import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAcademyDetails, createAcademyDetails,getAcademyDetails } from '../../Redux/Slices/academy/academy_details';

const AcademyProfilePage = () => {
  const dispatch = useDispatch();
  const { academyDetails, isLoading } = useSelector((state) => state.academy);

  const userId = localStorage.getItem('user_id');

  const [formData, setFormData] = useState({
    user: userId,
    name: '',
    school_type: '',
    level: '',
    description: '',
    street: '',
    province: '',
    district: '',
    sector: '',
  });

  const [locations, setLocations] = useState({
    provinces: [],
    districts: [],
    sectors: [],
  });

  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [schoolTypes] = useState(['Public', 'Private']);
  const [levels] = useState(['Primary', 'Secondary', 'University']);

  useEffect(() => {
    if (userId) {
      dispatch(getAcademyDetailsDetails(userId));
    }

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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(createAcademyDetails(formData));
  // };
const handleSubmit = (e) => {
  e.preventDefault();

  if (academyDetails === null) {
    dispatch(createAcademyDetails(formData)); // Create if nothing exists
  } else {
    dispatch(updateAcademyDetails({ userId, data: formData })); // Update
  }
};
  if (isLoading) {
    return <p className="text-center text-blue-700 font-bold">Loading...</p>;
  }

  // If academy details are available, display them
  if (academyDetails) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="bg-blue-600 text-white py-10">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl font-bold">{academyDetails.name}</h1>
            <p className="text-lg font-semibold">{academyDetails.level}</p>
          </div>
        </div>
        <div className="container mx-auto mt-10 p-6">
          <div className="bg-white shadow-lg rounded-lg p-6 border">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">About the Academy</h2>
            <p className="text-gray-700 mb-4">
              <strong>Level:</strong> {academyDetails.level}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Type:</strong> {academyDetails.school_type}
            </p>
            <p className="text-gray-700">{academyDetails.description}</p>
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-blue-600 mb-2">Location</h3>
              <p className="text-gray-700">
                <strong>Street:</strong> {academyDetails.street}
              </p>
              <p className="text-gray-700">
                <strong>Province:</strong> {academyDetails.province}
              </p>
              <p className="text-gray-700">
                <strong>District:</strong> {academyDetails.district}
              </p>
              <p className="text-gray-700">
                <strong>Sector:</strong> {academyDetails.sector}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If academy details are not found, show the form
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">Set Up Your Academy Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-5 max-w-lg mx-auto">
          <input
            type="text"
            name="name"
            placeholder="Academy or Institution Name"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
            value={formData.name}
            onChange={handleChange}
          />
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
          >
            <option value="">Select Level</option>
            {levels.map((lvl) => (
              <option key={lvl} value={lvl}>{lvl}</option>
            ))}
          </select>
          <select
            name="school_type"
            value={formData.school_type}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
          >
            <option value="">Select School Type</option>
            {schoolTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <textarea
            name="description"
            placeholder="Description of the Academy"
            rows="4"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            onChange={handleChange}
            value={formData.description}
          ></textarea>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input
              type="text"
              name="street"
              placeholder="Street Address"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              value={formData.street}
            />
            <select
              name="province"
              value={selectedProvince}
              onChange={handleProvinceChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
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
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
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
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
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
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default AcademyProfilePage;
