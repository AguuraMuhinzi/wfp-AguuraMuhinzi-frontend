

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAcademyDetails, createAcademyDetails,getAcademyDetails } from '../../Redux/Slices/academy/academy_details';

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
//       dispatch(getAcademyDetailsDetails(userId));
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

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   dispatch(createAcademyDetails(formData));
//   // };
// const handleSubmit = (e) => {
//   e.preventDefault();

//   if (academyDetails === null) {
//     dispatch(createAcademyDetails(formData)); // Create if nothing exists
//   } else {
//     dispatch(updateAcademyDetails({ userId, data: formData })); // Update
//   }
// };
//   if (isLoading) {
//     return <p className="text-center text-blue-700 font-bold">Loading...</p>;
//   }

//   // If academy details are available, display them
//   if (academyDetails) {
//     return (
//       <div className="min-h-screen bg-gray-100">
//         <div className="bg-blue-600 text-white py-10">
//           <div className="container mx-auto text-center">
//             <h1 className="text-3xl font-bold">{academyDetails.name}</h1>
//             <p className="text-lg font-semibold">{academyDetails.level}</p>
//           </div>
//         </div>
//         <div className="container mx-auto mt-10 p-6">
//           <div className="bg-white shadow-lg rounded-lg p-6 border">
//             <h2 className="text-2xl font-bold text-blue-700 mb-6">About the Academy</h2>
//             <p className="text-gray-700 mb-4">
//               <strong>Level:</strong> {academyDetails.level}
//             </p>
//             <p className="text-gray-700 mb-4">
//               <strong>Type:</strong> {academyDetails.school_type}
//             </p>
//             <p className="text-gray-700">{academyDetails.description}</p>
//             <div className="mt-8">
//               <h3 className="text-lg font-semibold text-blue-600 mb-2">Location</h3>
//               <p className="text-gray-700">
//                 <strong>Street:</strong> {academyDetails.street}
//               </p>
//               <p className="text-gray-700">
//                 <strong>Province:</strong> {academyDetails.province}
//               </p>
//               <p className="text-gray-700">
//                 <strong>District:</strong> {academyDetails.district}
//               </p>
//               <p className="text-gray-700">
//                 <strong>Sector:</strong> {academyDetails.sector}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // If academy details are not found, show the form
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">Set Up Your Academy Profile</h2>
//         <form onSubmit={handleSubmit} className="space-y-5 max-w-lg mx-auto">
//           <input
//             type="text"
//             name="name"
//             placeholder="Academy or Institution Name"
//             required
//             className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
//             value={formData.name}
//             onChange={handleChange}
//           />
//           <select
//             name="level"
//             value={formData.level}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
//           >
//             <option value="">Select Level</option>
//             {levels.map((lvl) => (
//               <option key={lvl} value={lvl}>{lvl}</option>
//             ))}
//           </select>
//           <select
//             name="school_type"
//             value={formData.school_type}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
//           >
//             <option value="">Select School Type</option>
//             {schoolTypes.map((type) => (
//               <option key={type} value={type}>{type}</option>
//             ))}
//           </select>
//           <textarea
//             name="description"
//             placeholder="Description of the Academy"
//             rows="4"
//             className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
//             onChange={handleChange}
//             value={formData.description}
//           ></textarea>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//             <input
//               type="text"
//               name="street"
//               placeholder="Street Address"
//               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
//               onChange={handleChange}
//               value={formData.street}
//             />
//             <select
//               name="province"
//               value={selectedProvince}
//               onChange={handleProvinceChange}
//               required
//               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
//             >
//               <option value="">Select Province</option>
//               {locations.provinces?.map((province) => (
//                 <option key={province.name} value={province.name}>
//                   {province.name}
//                 </option>
//               ))}
//             </select>
//             <select
//               name="district"
//               value={selectedDistrict}
//               onChange={handleDistrictChange}
//               required
//               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
//               disabled={!selectedProvince}
//             >
//               <option value="">Select District</option>
//               {locations.districts?.map((district) => (
//                 <option key={district.name} value={district.name}>
//                   {district.name}
//                 </option>
//               ))}
//             </select>
//             <select
//               name="sector"
//               required
//               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
//               disabled={!selectedDistrict}
//               onChange={handleChange}
//               value={formData.sector}
//             >
//               <option value="">Select Sector</option>
//               {locations.sectors?.map((sector) => (
//                 <option key={sector} value={sector}>
//                   {sector}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <button
//             type="submit"
//             className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300"
//           >
//             Save Profile
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AcademyProfilePage;


"use client"

import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  createAcademyDetails,
  getAcademyDetails,
  updateAcademyDetails,
} from "../../Redux/Slices/academy/academy_details"
import {
  FiHome,
  FiMapPin,
  FiFileText,
  FiEdit3,
  FiSave,
  FiX,
  FiBook,
  FiUsers,
  FiAward,
  FiCalendar,
  FiGraduationCap,
  FiBuilding,
} from "react-icons/fi"
import { FaSchool, FaUniversity, FaBookOpen } from "react-icons/fa"

const AcademyProfilePage = () => {
  const dispatch = useDispatch()
  const { academyDetails, isLoading } = useSelector((state) => state.academy)
  const userId = localStorage.getItem("user_id")
  const [showForm, setShowForm] = useState(false)

  const [formData, setFormData] = useState({
    user: userId,
    name: "",
    school_type: "",
    level: "",
    description: "",
    street: "",
    province: "",
    district: "",
    sector: "",
  })

  const [locations, setLocations] = useState({
    provinces: [],
    districts: [],
    sectors: [],
  })

  const [selectedProvince, setSelectedProvince] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [schoolTypes] = useState(["Public", "Private"])
  const [levels] = useState(["Primary", "Secondary", "University"])

  useEffect(() => {
    if (userId) {
      dispatch(getAcademyDetails(userId))
    }
    setLocations({
      provinces: [
        {
          name: "Western Province",
          districts: [
            { name: "Nyabihu", sectors: ["Mukamira", "Jenda", "Jomba", "Karago", "Kintoye"] },
            { name: "Karongi", sectors: ["Bwishyura", "Gitesi", "Murambi", "Mutuntu"] },
          ],
        },
        {
          name: "Northern Province",
          districts: [
            { name: "Musanze", sectors: ["Cyuve", "Gacaca", "Gataraga", "Kimonyi"] },
            { name: "Burera", sectors: ["Butaro", "Cyanika", "Cyeru", "Gahunga"] },
          ],
        },
      ],
    })
  }, [dispatch, userId])

  useEffect(() => {
    if (academyDetails) {
      setFormData({
        user: userId,
        name: academyDetails.name || "",
        school_type: academyDetails.school_type || "",
        level: academyDetails.level || "",
        description: academyDetails.description || "",
        street: academyDetails.street || "",
        province: academyDetails.province || "",
        district: academyDetails.district || "",
        sector: academyDetails.sector || "",
      })
      setSelectedProvince(academyDetails.province || "")
      setSelectedDistrict(academyDetails.district || "")
      setShowForm(false)
    } else if (!isLoading && academyDetails === null) {
      setShowForm(true)
    }
  }, [academyDetails, userId, isLoading])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProvinceChange = (e) => {
    const provinceName = e.target.value
    const province = locations.provinces.find((prov) => prov.name === provinceName)
    setSelectedProvince(provinceName)
    setSelectedDistrict("")
    setFormData((prev) => ({ ...prev, province: provinceName, district: "", sector: "" }))
    setLocations((prev) => ({ ...prev, districts: province?.districts || [] }))
  }

  const handleDistrictChange = (e) => {
    const districtName = e.target.value
    const district = locations.districts.find((dist) => dist.name === districtName)
    setSelectedDistrict(districtName)
    setFormData((prev) => ({ ...prev, district: districtName, sector: "" }))
    setLocations((prev) => ({ ...prev, sectors: district?.sectors || [] }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (academyDetails === null) {
      dispatch(createAcademyDetails(formData))
    } else {
      dispatch(updateAcademyDetails({ userId, data: formData }))
    }
    setShowForm(false)
  }

  const getSchoolIcon = (level) => {
    switch (level?.toLowerCase()) {
      case "primary":
        return FaSchool
      case "secondary":
        return FaBookOpen
      case "university":
        return FaUniversity
      default:
        return FiGraduationCap
    }
  }

  const getSchoolTypeColor = (type) => {
    return type === "Public" ? "emerald" : "blue"
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 flex items-center justify-center p-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-emerald-200 p-8 flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-emerald-600 font-medium text-lg">Loading academy profile...</p>
        </div>
      </div>
    )
  }

  const shouldShowForm = showForm || (!academyDetails && !isLoading)

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 p-6">
      <div className="max-w-6xl mx-auto">
        {shouldShowForm ? (
          // Form View
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-emerald-200 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <FiGraduationCap size={32} />
                {academyDetails ? "Edit Academy Profile" : "Set Up Your Academy Profile"}
              </h1>
              <p className="text-emerald-100 mt-2">
                {academyDetails ? "Update your academy information" : "Complete your academy profile to get started"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FiHome className="text-emerald-600" />
                    Academy Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter academy name"
                    required
                    className="w-full border border-emerald-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FiBook className="text-emerald-600" />
                    Education Level
                  </label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    required
                    className="w-full border border-emerald-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                  >
                    <option value="">Select Level</option>
                    {levels.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FiBuilding className="text-emerald-600" />
                  School Type
                </label>
                <select
                  name="school_type"
                  value={formData.school_type}
                  onChange={handleChange}
                  required
                  className="w-full border border-emerald-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                >
                  <option value="">Select School Type</option>
                  {schoolTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FiFileText className="text-emerald-600" />
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Describe your academy's mission, programs, and goals..."
                  rows={4}
                  className="w-full border border-emerald-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 resize-none"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FiMapPin className="text-emerald-600" />
                  Street Address
                </label>
                <input
                  type="text"
                  name="street"
                  placeholder="Enter street address"
                  className="w-full border border-emerald-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                  value={formData.street}
                  onChange={handleChange}
                />
              </div>

              {/* Location Selectors */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
                  <select
                    name="province"
                    value={selectedProvince}
                    onChange={handleProvinceChange}
                    required
                    className="w-full border border-emerald-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                  >
                    <option value="">Select Province</option>
                    {locations.provinces?.map((province) => (
                      <option key={province.name} value={province.name}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                  <select
                    name="district"
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    required
                    className="w-full border border-emerald-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    disabled={!selectedProvince}
                  >
                    <option value="">Select District</option>
                    {locations.districts?.map((district) => (
                      <option key={district.name} value={district.name}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sector</label>
                  <select
                    name="sector"
                    required
                    className="w-full border border-emerald-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
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
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FiSave size={18} />
                  Save Profile
                </button>
                {academyDetails && (
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <FiX size={18} />
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        ) : (
          // Profile View
          academyDetails && (
            <div className="space-y-8">
              {/* Header Section */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-emerald-200 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-12 text-center relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                  <div className="relative z-10">
                    <div className="relative inline-block mb-6">
                      <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl border border-white/30">
                        {React.createElement(getSchoolIcon(academyDetails.level), {
                          className: "w-12 h-12 text-white",
                        })}
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white">
                        <FiAward className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-3">{academyDetails.name}</h1>
                    <p className="text-xl text-emerald-100 font-semibold flex items-center justify-center gap-2">
                      <FiBook />
                      {academyDetails.level} Education
                    </p>
                    <div className="flex items-center justify-center mt-6 space-x-8 text-emerald-100">
                      <div className="flex items-center space-x-2">
                        <FiBuilding className="w-5 h-5" />
                        <span>{academyDetails.school_type} School</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FiUsers className="w-5 h-5" />
                        <span>{academyDetails.students || 500}+ Students</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FiCalendar className="w-5 h-5" />
                        <span>Est. {academyDetails.established || "2010"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* About Section */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-emerald-200 p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                      <FiFileText className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">About Our Academy</h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">{academyDetails.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-emerald-600">
                      <FiBook />
                      <span className="text-sm font-medium">{academyDetails.level} Level</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600">
                      <FiBuilding />
                      <span className="text-sm font-medium">{academyDetails.school_type} Institution</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600">
                      <FiUsers />
                      <span className="text-sm font-medium">Quality Education</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600">
                      <FiAward />
                      <span className="text-sm font-medium">Excellence Focused</span>
                    </div>
                  </div>
                </div>

                {/* Location Section */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-emerald-200 p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <FiMapPin className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Location</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <FiHome className="text-gray-500" />
                      <div>
                        <span className="text-sm text-gray-500">Street:</span>
                        <p className="font-medium text-gray-800">{academyDetails.street || "Not specified"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <FiMapPin className="text-gray-500" />
                      <div>
                        <span className="text-sm text-gray-500">Sector:</span>
                        <p className="font-medium text-gray-800">{academyDetails.sector}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <FiMapPin className="text-gray-500" />
                      <div>
                        <span className="text-sm text-gray-500">District:</span>
                        <p className="font-medium text-gray-800">{academyDetails.district}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <FiMapPin className="text-gray-500" />
                      <div>
                        <span className="text-sm text-gray-500">Province:</span>
                        <p className="font-medium text-gray-800">{academyDetails.province}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics Section */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-emerald-200 p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                    <FiUsers className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">Academy Statistics</h3>
                    <p className="text-gray-600">Key metrics and achievements</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg border border-emerald-100">
                    <div className="text-3xl font-bold text-emerald-600 mb-2">{academyDetails.students || 500}+</div>
                    <div className="text-sm text-gray-600">Students</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{academyDetails.teachers || 45}+</div>
                    <div className="text-sm text-gray-600">Teachers</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                    <div className="text-3xl font-bold text-purple-600 mb-2">{academyDetails.programs || 12}+</div>
                    <div className="text-sm text-gray-600">Programs</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border border-orange-100">
                    <div className="text-3xl font-bold text-orange-600 mb-2">{academyDetails.years || 14}+</div>
                    <div className="text-sm text-gray-600">Years</div>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <div className="text-center">
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-xl hover:scale-105 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-3 mx-auto"
                >
                  <FiEdit3 className="w-5 h-5" />
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default AcademyProfilePage
