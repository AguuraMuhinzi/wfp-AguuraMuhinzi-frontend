
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { FiEdit2, FiSave, FiX, FiPlus } from 'react-icons/fi';
// import locations from '../../components/location';

// import { getAcademyDetails, updateAcademyDetails, createAcademyDetails, clearMessages } from '../../Redux/Slices/academy/academy_details';

// const AcademyProfile = () => {
//     const dispatch = useDispatch();
//     const { userInfo } = useSelector((state) => state.user);
//     const { academyDetails, isLoading, successMessage, error } = useSelector((state) => state.academy);
    
//     const userId = userInfo?.id || localStorage.getItem('user_id');
//     const [isEditing, setIsEditing] = useState(false);
//     const [isCreating, setIsCreating] = useState(false);
//     const [displayMessage, setDisplayMessage] = useState(false);
//     const [selectedProvince, setSelectedProvince] = useState('');
//     const [selectedDistrict, setSelectedDistrict] = useState('');
//     const [profileExists, setProfileExists] = useState(false);
//     const [formData, setFormData] = useState({
//         name: '',
//         school_type: '',
//         level: '',
//         description: '',
//         street: '',
//         province: '',
//         district: '',
//         sector: '',
//         // These fields are not expected by backend but kept for UI display
//         email: userInfo?.email || '',
//         phone: userInfo?.contact_phone || '',
//         website: '',
//         founded_year: '',
//         number_of_students: '',
//         number_of_staff: ''
//     });

//     const schoolTypes = ["Public", "Private"];
//     const levels = ["Primary", "Secondary", "Higher Education"];

//     // Fetch academy details on component mount
//     useEffect(() => {
//         if (userId) {
//             dispatch(getAcademyDetails(userId));
//         }
//     }, [dispatch, userId]);

//     // Update form data when academy details are loaded or check if profile exists
//     useEffect(() => {
//         if (academyDetails) {
//             setProfileExists(true);
//             setFormData({
//                 ...formData,
//                 ...academyDetails,
//                 name: academyDetails.name || '',
//                 school_type: academyDetails.school_type || '',
//                 level: academyDetails.level || '',
//                 description: academyDetails.description || '',
//                 street: academyDetails.street || '',
//                 province: academyDetails.province || '',
//                 district: academyDetails.district || '',
//                 sector: academyDetails.sector || '',
//                 email: academyDetails.email || userInfo?.email || '',
//             });
//             setSelectedProvince(academyDetails.province || '');
//             setSelectedDistrict(academyDetails.district || '');
//         } else if (academyDetails === null && !isLoading) {
//             // No profile exists
//             setProfileExists(false);
//             setFormData({
//                 name: '',
//                 school_type: '',
//                 level: '',
//                 description: '',
//                 street: '',
//                 province: '',
//                 district: '',
//                 sector: '',
//                 email: userInfo?.email || '',
//                 phone: userInfo?.contact_phone || '',
//                 website: '',
//                 founded_year: '',
//                 number_of_students: '',
//                 number_of_staff: ''
//             });
//             setSelectedProvince('');
//             setSelectedDistrict('');
//         }
//     }, [academyDetails, userInfo, isLoading]);

//     // Handle message display and clearing
//     useEffect(() => {
//         if (successMessage || error) {
//             setDisplayMessage(true);
//             const timer = setTimeout(() => {
//                 setDisplayMessage(false);
//                 dispatch(clearMessages());
//             }, 3000);
//             return () => clearTimeout(timer);
//         }
//     }, [successMessage, error, dispatch]);

//     // Handle form field updates
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleProvinceChange = (e) => {
//         setSelectedProvince(e.target.value);
//         setSelectedDistrict('');
//         setFormData({ ...formData, province: e.target.value, district: '', sector: '' });
//     };

//     const handleDistrictChange = (e) => {
//         setSelectedDistrict(e.target.value);
//         setFormData({ ...formData, district: e.target.value, sector: '' });
//     };

//     // Handle form submission for both create and update
//     const handleSubmit = (e) => {
//         e.preventDefault();
        
//         // Only send fields that backend expects
//         const backendFields = {
//             user: userId, // Backend expects 'user', not 'user_id'
//             name: formData.name,
//             level: formData.level,
//             school_type: formData.school_type,
//             description: formData.description,
//             street: formData.street,
//             province: formData.province,
//             district: formData.district,
//             sector: formData.sector
//         };

//         if (isCreating) {
//             dispatch(createAcademyDetails(backendFields)).then((result) => {
//                 if (!result.error) {
//                     setIsCreating(false);
//                     setProfileExists(true);
//                 }
//             });
//         } else {
//             dispatch(updateAcademyDetails(backendFields)).then((result) => {
//                 if (!result.error) setIsEditing(false);
//             });
//         }
//     };

//     const toggleEditMode = () => {
//         setIsEditing(!isEditing);
//     };

//     const startCreating = () => {
//         setIsCreating(true);
//     };

//     const cancelEdit = () => {
//         // Reset form to original data
//         if (profileExists && academyDetails) {
//             setFormData({
//                 ...academyDetails,
//                 email: academyDetails.email || userInfo?.email || '',
//             });
//             setSelectedProvince(academyDetails.province || '');
//             setSelectedDistrict(academyDetails.district || '');
//         } else {
//             // Reset create form
//             setFormData({
//                 name: '',
//                 school_type: '',
//                 level: '',
//                 description: '',
//                 street: '',
//                 province: '',
//                 district: '',
//                 sector: '',
//                 email: userInfo?.email || '',
//                 phone: userInfo?.contact_phone || '',
//                 website: '',
//                 founded_year: '',
//                 number_of_students: '',
//                 number_of_staff: ''
//             });
//             setSelectedProvince('');
//             setSelectedDistrict('');
//         }
//         setIsEditing(false);
//         setIsCreating(false);
//     };

//     const province = locations.provinces.find((p) => p.name === selectedProvince);
//     const district = province?.districts.find((d) => d.name === selectedDistrict);

//     return (
//         <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-bold text-green-600">Academy Profile</h2>
//                 {!profileExists && !isCreating ? (
//                     <button 
//                         onClick={startCreating} 
//                         className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
//                     >
//                         <FiPlus className="mr-2" /> Create Profile
//                     </button>
//                 ) : !isEditing && !isCreating ? (
//                     <button 
//                         onClick={toggleEditMode} 
//                         className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300"
//                     >
//                         <FiEdit2 className="mr-2" /> Edit Profile
//                     </button>
//                 ) : (
//                     <div className="flex space-x-2">
//                         <button 
//                             onClick={cancelEdit} 
//                             className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300"
//                         >
//                             <FiX className="mr-2" /> Cancel
//                         </button>
//                         <button 
//                             onClick={handleSubmit} 
//                             className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300"
//                             disabled={isLoading}
//                         >
//                             <FiSave className="mr-2" /> {isLoading ? "Saving..." : isCreating ? "Create Profile" : "Save Changes"}
//                         </button>
//                     </div>
//                 )}
//             </div>

//             {displayMessage && successMessage && (
//                 <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
//                     {successMessage}
//                 </div>
//             )}

//             {displayMessage && error && (
//                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//                     {error}
//                 </div>
//             )}

//             {isLoading && !isEditing && !isCreating ? (
//                 <div className="text-center py-8">
//                     <p>Loading academy details...</p>
//                 </div>
//             ) : !profileExists && !isCreating ? (
//                 // No Profile State
//                 <div className="text-center py-12">
//                     <div className="mb-6">
//                         <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//                             <FiPlus className="w-12 h-12 text-gray-400" />
//                         </div>
//                         <h3 className="text-xl font-semibold text-gray-700 mb-2">No Academy Profile Found</h3>
//                         <p className="text-gray-500 mb-6">Create your academy profile to get started and showcase your institution's information.</p>
//                         <button 
//                             onClick={startCreating} 
//                             className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 font-medium"
//                         >
//                             Create Your Academy Profile
//                         </button>
//                     </div>
//                 </div>
//             ) : isEditing || isCreating ? (
//                 // Create/Edit Form
//                 <form className="space-y-6">
//                     <div className="mb-4">
//                         <h3 className="text-lg font-semibold text-gray-700">
//                             {isCreating ? "Create Academy Profile" : "Edit Academy Profile"}
//                         </h3>
//                         <p className="text-gray-500 text-sm">
//                             {isCreating ? "Fill in the details to create your academy profile." : "Update your academy information below."}
//                         </p>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                             <label className="block text-gray-700 mb-2">Institution Name *</label>
//                             <input
//                                 type="text"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-gray-700 mb-2">School Type *</label>
//                             <select
//                                 name="school_type"
//                                 value={formData.school_type}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
//                                 required
//                             >
//                                 <option value="">Select School Type</option>
//                                 {schoolTypes.map((type) => (
//                                     <option key={type} value={type}>{type}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div>
//                             <label className="block text-gray-700 mb-2">Education Level *</label>
//                             <select
//                                 name="level"
//                                 value={formData.level}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
//                                 required
//                             >
//                                 <option value="">Select Level</option>
//                                 {levels.map((lvl) => (
//                                     <option key={lvl} value={lvl}>{lvl}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div>
//                             <label className="block text-gray-700 mb-2">Email Address</label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 bg-gray-100"
//                                 disabled
//                             />
//                             <p className="text-xs text-gray-500 mt-1">Email is managed through your user account</p>
//                         </div>
//                         <div className="md:col-span-2">
//                             <label className="block text-gray-700 mb-2">Description</label>
//                             <textarea
//                                 name="description"
//                                 value={formData.description}
//                                 onChange={handleChange}
//                                 rows="4"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
//                                 placeholder="Describe your academy, its mission, and what makes it unique..."
//                             ></textarea>
//                         </div>
//                     </div>

//                     <h3 className="text-xl font-semibold text-green-600 mt-8 mb-4">Location Details</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                             <label className="block text-gray-700 mb-2">Street Address</label>
//                             <input
//                                 type="text"
//                                 name="street"
//                                 value={formData.street}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-gray-700 mb-2">Province</label>
//                             <select
//                                 name="province"
//                                 value={selectedProvince}
//                                 onChange={handleProvinceChange}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
//                             >
//                                 <option value="">Select Province</option>
//                                 {locations.provinces.map((province) => (
//                                     <option key={province.name} value={province.name}>{province.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div>
//                             <label className="block text-gray-700 mb-2">District</label>
//                             <select
//                                 name="district"
//                                 value={selectedDistrict}
//                                 onChange={handleDistrictChange}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
//                                 disabled={!selectedProvince}
//                             >
//                                 <option value="">Select District</option>
//                                 {province?.districts.map((district) => (
//                                     <option key={district.name} value={district.name}>{district.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div>
//                             <label className="block text-gray-700 mb-2">Sector</label>
//                             <select
//                                 name="sector"
//                                 value={formData.sector}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
//                                 disabled={!selectedDistrict}
//                             >
//                                 <option value="">Select Sector</option>
//                                 {district?.sectors.map((sector) => (
//                                     <option key={sector} value={sector}>{sector}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div>
//                             <label className="block text-gray-700 mb-2">Phone Number</label>
//                             <input
//                                 type="tel"
//                                 name="phone"
//                                 value={formData.phone}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 bg-gray-100"
//                                 disabled
//                             />
//                             <p className="text-xs text-gray-500 mt-1">Phone is managed through your user account</p>
//                         </div>
//                         <div>
//                             <label className="block text-gray-700 mb-2">Website</label>
//                             <input
//                                 type="url"
//                                 name="website"
//                                 value={formData.website}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 bg-gray-100"
//                                 placeholder="Feature coming soon..."
//                                 disabled
//                             />
//                             <p className="text-xs text-gray-500 mt-1">Website field will be available in future updates</p>
//                         </div>
//                         <div>
//                             <label className="block text-gray-700 mb-2">Founded Year</label>
//                             <input
//                                 type="number"
//                                 name="founded_year"
//                                 value={formData.founded_year}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 bg-gray-100"
//                                 min="1800"
//                                 max={new Date().getFullYear()}
//                                 disabled
//                             />
//                             <p className="text-xs text-gray-500 mt-1">Additional details coming in future updates</p>
//                         </div>
//                         <div>
//                             <label className="block text-gray-700 mb-2">Number of Students</label>
//                             <input
//                                 type="number"
//                                 name="number_of_students"
//                                 value={formData.number_of_students}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 bg-gray-100"
//                                 min="0"
//                                 disabled
//                             />
//                             <p className="text-xs text-gray-500 mt-1">Additional details coming in future updates</p>
//                         </div>
//                         <div>
//                             <label className="block text-gray-700 mb-2">Number of Staff</label>
//                             <input
//                                 type="number"
//                                 name="number_of_staff"
//                                 value={formData.number_of_staff}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 bg-gray-100"
//                                 min="0"
//                                 disabled
//                             />
//                             <p className="text-xs text-gray-500 mt-1">Additional details coming in future updates</p>
//                         </div>
//                     </div>
//                 </form>
//             ) : (
//                 // Display Profile
//                 <div className="space-y-8">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                         <div className="bg-gray-50 p-6 rounded-lg">
//                             <h3 className="text-xl font-semibold text-green-600 mb-4">Basic Information</h3>
//                             <div className="space-y-3">
//                                 <div>
//                                     <span className="text-gray-500">Institution Name:</span>
//                                     <p className="font-medium">{formData.name || "Not specified"}</p>
//                                 </div>
//                                 <div>
//                                     <span className="text-gray-500">School Type:</span>
//                                     <p className="font-medium">{formData.school_type || "Not specified"}</p>
//                                 </div>
//                                 <div>
//                                     <span className="text-gray-500">Education Level:</span>
//                                     <p className="font-medium">{formData.level || "Not specified"}</p>
//                                 </div>
//                                 <div>
//                                     <span className="text-gray-500">Founded Year:</span>
//                                     <p className="font-medium">{formData.founded_year || "Not specified"}</p>
//                                 </div>
//                                 <div>
//                                     <span className="text-gray-500">Number of Students:</span>
//                                     <p className="font-medium">{formData.number_of_students || "Not specified"}</p>
//                                 </div>
//                                 <div>
//                                     <span className="text-gray-500">Number of Staff:</span>
//                                     <p className="font-medium">{formData.number_of_staff || "Not specified"}</p>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="bg-gray-50 p-6 rounded-lg">
//                             <h3 className="text-xl font-semibold text-green-600 mb-4">Contact Information</h3>
//                             <div className="space-y-3">
//                                 <div>
//                                     <span className="text-gray-500">Email:</span>
//                                     <p className="font-medium">{formData.email || "Not specified"}</p>
//                                 </div>
//                                 <div>
//                                     <span className="text-gray-500">Phone:</span>
//                                     <p className="font-medium">{formData.phone || "Not specified"}</p>
//                                 </div>
//                                 <div>
//                                     <span className="text-gray-500">Website:</span>
//                                     <p className="font-medium">
//                                         {formData.website ? (
//                                             <a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
//                                                 {formData.website}
//                                             </a>
//                                         ) : "Not specified"}
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="bg-gray-50 p-6 rounded-lg">
//                         <h3 className="text-xl font-semibold text-green-600 mb-4">Description</h3>
//                         <p className="text-gray-700">{formData.description || "No description available."}</p>
//                     </div>

//                     <div className="bg-gray-50 p-6 rounded-lg">
//                         <h3 className="text-xl font-semibold text-green-600 mb-4">Location</h3>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div>
//                                 <span className="text-gray-500">Street:</span>
//                                 <p className="font-medium">{formData.street || "Not specified"}</p>
//                             </div>
//                             <div>
//                                 <span className="text-gray-500">Province:</span>
//                                 <p className="font-medium">{formData.province || "Not specified"}</p>
//                             </div>
//                             <div>
//                                 <span className="text-gray-500">District:</span>
//                                 <p className="font-medium">{formData.district || "Not specified"}</p>
//                             </div>
//                             <div>
//                                 <span className="text-gray-500">Sector:</span>
//                                 <p className="font-medium">{formData.sector || "Not specified"}</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AcademyProfile;


"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  FiEdit2,
  FiSave,
  FiX,
  FiPlus,
  FiMapPin,
  FiMail,
  FiPhone,
  FiGlobe,
  FiCalendar,
  FiUsers,
  FiUserCheck,
  FiBook,
  FiHome,
  FiAward,
  FiInfo,
} from "react-icons/fi"
import { FaGraduationCap, FaSchool, FaUniversity } from "react-icons/fa"
import locations from "../../components/location"
import {
  getAcademyDetails,
  updateAcademyDetails,
  createAcademyDetails,
  clearMessages,
} from "../../Redux/Slices/academy/academy_details"

const AcademyProfile = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.user)
  const { academyDetails, isLoading, successMessage, error } = useSelector((state) => state.academy)

  const userId = userInfo?.id || localStorage.getItem("user_id")
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [displayMessage, setDisplayMessage] = useState(false)
  const [selectedProvince, setSelectedProvince] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [profileExists, setProfileExists] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    school_type: "",
    level: "",
    description: "",
    street: "",
    province: "",
    district: "",
    sector: "",
    email: userInfo?.email || "",
    phone: userInfo?.contact_phone || "",
    website: "",
    founded_year: "",
    number_of_students: "",
    number_of_staff: "",
  })

  const schoolTypes = ["Public", "Private"]
  const levels = ["Primary", "Secondary", "Higher Education"]

  // Get appropriate icon based on education level
  const getLevelIcon = (level) => {
    switch (level) {
      case "Primary":
        return FaSchool
      case "Secondary":
        return FaGraduationCap
      case "Higher Education":
        return FaUniversity
      default:
        return FaSchool
    }
  }

  // Get school type color
  const getSchoolTypeColor = (type) => {
    return type === "Private" ? "from-purple-600 to-purple-700" : "from-emerald-600 to-emerald-700"
  }

  // Fetch academy details on component mount
  useEffect(() => {
    if (userId) {
      dispatch(getAcademyDetails(userId))
    }
  }, [dispatch, userId])

  // Update form data when academy details are loaded or check if profile exists
  useEffect(() => {
    if (academyDetails) {
      setProfileExists(true)
      setFormData({
        ...formData,
        ...academyDetails,
        name: academyDetails.name || "",
        school_type: academyDetails.school_type || "",
        level: academyDetails.level || "",
        description: academyDetails.description || "",
        street: academyDetails.street || "",
        province: academyDetails.province || "",
        district: academyDetails.district || "",
        sector: academyDetails.sector || "",
        email: academyDetails.email || userInfo?.email || "",
      })
      setSelectedProvince(academyDetails.province || "")
      setSelectedDistrict(academyDetails.district || "")
    } else if (academyDetails === null && !isLoading) {
      setProfileExists(false)
      setFormData({
        name: "",
        school_type: "",
        level: "",
        description: "",
        street: "",
        province: "",
        district: "",
        sector: "",
        email: userInfo?.email || "",
        phone: userInfo?.contact_phone || "",
        website: "",
        founded_year: "",
        number_of_students: "",
        number_of_staff: "",
      })
      setSelectedProvince("")
      setSelectedDistrict("")
    }
  }, [academyDetails, userInfo, isLoading])

  // Handle message display and clearing
  useEffect(() => {
    if (successMessage || error) {
      setDisplayMessage(true)
      const timer = setTimeout(() => {
        setDisplayMessage(false)
        dispatch(clearMessages())
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [successMessage, error, dispatch])

  // Handle form field updates
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value)
    setSelectedDistrict("")
    setFormData({ ...formData, province: e.target.value, district: "", sector: "" })
  }

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value)
    setFormData({ ...formData, district: e.target.value, sector: "" })
  }

  // Handle form submission for both create and update
  const handleSubmit = (e) => {
    e.preventDefault()

    const backendFields = {
      user: userId,
      name: formData.name,
      level: formData.level,
      school_type: formData.school_type,
      description: formData.description,
      street: formData.street,
      province: formData.province,
      district: formData.district,
      sector: formData.sector,
    }

    if (isCreating) {
      dispatch(createAcademyDetails(backendFields)).then((result) => {
        if (!result.error) {
          setIsCreating(false)
          setProfileExists(true)
        }
      })
    } else {
      dispatch(updateAcademyDetails(backendFields)).then((result) => {
        if (!result.error) setIsEditing(false)
      })
    }
  }

  const toggleEditMode = () => {
    setIsEditing(!isEditing)
  }

  const startCreating = () => {
    setIsCreating(true)
  }

  const cancelEdit = () => {
    if (profileExists && academyDetails) {
      setFormData({
        ...academyDetails,
        email: academyDetails.email || userInfo?.email || "",
      })
      setSelectedProvince(academyDetails.province || "")
      setSelectedDistrict(academyDetails.district || "")
    } else {
      setFormData({
        name: "",
        school_type: "",
        level: "",
        description: "",
        street: "",
        province: "",
        district: "",
        sector: "",
        email: userInfo?.email || "",
        phone: userInfo?.contact_phone || "",
        website: "",
        founded_year: "",
        number_of_students: "",
        number_of_staff: "",
      })
      setSelectedProvince("")
      setSelectedDistrict("")
    }
    setIsEditing(false)
    setIsCreating(false)
  }

  const province = locations.provinces.find((p) => p.name === selectedProvince)
  const district = province?.districts.find((d) => d.name === selectedDistrict)

  const LevelIcon = getLevelIcon(formData.level)

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg">
                <FaGraduationCap className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                  Academy Profile
                </h1>
                <p className="text-gray-600">Manage your institution's information and details</p>
              </div>
            </div>

            {!profileExists && !isCreating ? (
              <button
                onClick={startCreating}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
              >
                <FiPlus className="h-5 w-5" /> Create Profile
              </button>
            ) : !isEditing && !isCreating ? (
              <button
                onClick={toggleEditMode}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
              >
                <FiEdit2 className="h-5 w-5" /> Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={cancelEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg font-medium transition-all duration-300"
                >
                  <FiX className="h-4 w-4" /> Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                  disabled={isLoading}
                >
                  <FiSave className="h-5 w-5" />
                  {isLoading ? "Saving..." : isCreating ? "Create Profile" : "Save Changes"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Messages */}
        {displayMessage && successMessage && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-6 py-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-2">
              <FiAward className="h-5 w-5" />
              {successMessage}
            </div>
          </div>
        )}

        {displayMessage && error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-2">
              <FiX className="h-5 w-5" />
              {error}
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && !isEditing && !isCreating ? (
          <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200 p-12 text-center shadow-sm">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-emerald-600 font-medium">Loading academy details...</p>
          </div>
        ) : !profileExists && !isCreating ? (
          // No Profile State
          <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200 p-12 text-center shadow-sm">
            <div className="mb-8">
              <div className="mx-auto w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <FiPlus className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-3">No Academy Profile Found</h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Create your academy profile to showcase your institution's information and connect with cooperatives.
              </p>
              <button
                onClick={startCreating}
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
              >
                Create Your Academy Profile
              </button>
            </div>
          </div>
        ) : isEditing || isCreating ? (
          // Create/Edit Form
          <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-4">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <FiEdit2 />
                {isCreating ? "Create Academy Profile" : "Edit Academy Profile"}
              </h3>
              <p className="text-emerald-100 text-sm mt-1">
                {isCreating
                  ? "Fill in the details to create your academy profile."
                  : "Update your academy information below."}
              </p>
            </div>

            <form className="p-6 space-y-8">
              {/* Basic Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <FiInfo className="text-emerald-600" />
                  Basic Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                      <FiHome className="h-4 w-4 text-emerald-600" />
                      Institution Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                      placeholder="Enter institution name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                      <FiBook className="h-4 w-4 text-emerald-600" />
                      School Type *
                    </label>
                    <select
                      name="school_type"
                      value={formData.school_type}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                      required
                    >
                      <option value="">Select School Type</option>
                      {schoolTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                      <FaGraduationCap className="h-4 w-4 text-emerald-600" />
                      Education Level *
                    </label>
                    <select
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                      required
                    >
                      <option value="">Select Level</option>
                      {levels.map((lvl) => (
                        <option key={lvl} value={lvl}>
                          {lvl}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                      <FiMail className="h-4 w-4 text-gray-400" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                      disabled
                    />
                    <p className="text-xs text-gray-500 mt-1">Email is managed through your user account</p>
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-gray-700 font-medium mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                    placeholder="Describe your academy, its mission, and what makes it unique..."
                  ></textarea>
                </div>
              </div>

              {/* Location Details */}
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <FiMapPin className="text-emerald-600" />
                  Location Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Street Address</label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                      placeholder="Enter street address"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Province</label>
                    <select
                      name="province"
                      value={selectedProvince}
                      onChange={handleProvinceChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                    >
                      <option value="">Select Province</option>
                      {locations.provinces.map((province) => (
                        <option key={province.name} value={province.name}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">District</label>
                    <select
                      name="district"
                      value={selectedDistrict}
                      onChange={handleDistrictChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
                      disabled={!selectedProvince}
                    >
                      <option value="">Select District</option>
                      {province?.districts.map((district) => (
                        <option key={district.name} value={district.name}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Sector</label>
                    <select
                      name="sector"
                      value={formData.sector}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
                      disabled={!selectedDistrict}
                    >
                      <option value="">Select Sector</option>
                      {district?.sectors.map((sector) => (
                        <option key={sector} value={sector}>
                          {sector}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Information (Future Features) */}
              <div>
                <h4 className="text-lg font-semibold text-gray-400 mb-4 flex items-center gap-2">
                  <FiUsers className="text-gray-400" />
                  Additional Information (Coming Soon)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 font-medium mb-2 flex items-center gap-2">
                      <FiPhone className="h-4 w-4" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                      disabled
                    />
                    <p className="text-xs text-gray-500 mt-1">Phone is managed through your user account</p>
                  </div>
                  <div>
                    <label className="block text-gray-400 font-medium mb-2 flex items-center gap-2">
                      <FiGlobe className="h-4 w-4" />
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                      placeholder="Feature coming soon..."
                      disabled
                    />
                    <p className="text-xs text-gray-500 mt-1">Website field will be available in future updates</p>
                  </div>
                  <div>
                    <label className="block text-gray-400 font-medium mb-2 flex items-center gap-2">
                      <FiCalendar className="h-4 w-4" />
                      Founded Year
                    </label>
                    <input
                      type="number"
                      name="founded_year"
                      value={formData.founded_year}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                      min="1800"
                      max={new Date().getFullYear()}
                      disabled
                    />
                    <p className="text-xs text-gray-500 mt-1">Additional details coming in future updates</p>
                  </div>
                  <div>
                    <label className="block text-gray-400 font-medium mb-2 flex items-center gap-2">
                      <FiUsers className="h-4 w-4" />
                      Number of Students
                    </label>
                    <input
                      type="number"
                      name="number_of_students"
                      value={formData.number_of_students}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                      min="0"
                      disabled
                    />
                    <p className="text-xs text-gray-500 mt-1">Additional details coming in future updates</p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          // Display Profile
          <div className="space-y-6">
            {/* Hero Section */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className={`bg-gradient-to-r ${getSchoolTypeColor(formData.school_type)} px-6 py-8 relative`}>
                <div className="absolute top-4 right-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <FiAward className="text-yellow-800 text-xl" />
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                    <LevelIcon className="text-white text-3xl" />
                  </div>
                  <div className="text-white">
                    <h2 className="text-3xl font-bold mb-2">{formData.name || "Academy Name"}</h2>
                    <div className="flex items-center gap-4 text-sm opacity-90">
                      <span className="flex items-center gap-1">
                        <FiBook className="h-4 w-4" />
                        {formData.level || "Level"}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiHome className="h-4 w-4" />
                        {formData.school_type || "Type"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            
            </div>

            {/* Information Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <FiInfo />
                    Basic Information
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 flex items-center gap-2">
                      <FiHome className="h-4 w-4" />
                      Institution Name
                    </span>
                    <span className="font-medium text-gray-900">{formData.name || "Not specified"}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 flex items-center gap-2">
                      <FiBook className="h-4 w-4" />
                      School Type
                    </span>
                    <span className="font-medium text-gray-900">{formData.school_type || "Not specified"}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 flex items-center gap-2">
                      <FaGraduationCap className="h-4 w-4" />
                      Education Level
                    </span>
                    <span className="font-medium text-gray-900">{formData.level || "Not specified"}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600 flex items-center gap-2">
                      <FiCalendar className="h-4 w-4" />
                      Founded Year
                    </span>
                    <span className="font-medium text-gray-900">{formData.founded_year || "Not specified"}</span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <FiMail />
                    Contact Information
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 flex items-center gap-2">
                      <FiMail className="h-4 w-4" />
                      Email
                    </span>
                    <span className="font-medium text-gray-900">{formData.email || "Not specified"}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 flex items-center gap-2">
                      <FiPhone className="h-4 w-4" />
                      Phone
                    </span>
                    <span className="font-medium text-gray-900">{formData.phone || "Not specified"}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600 flex items-center gap-2">
                      <FiGlobe className="h-4 w-4" />
                      Website
                    </span>
                    <span className="font-medium text-gray-900">
                      {formData.website ? (
                        <a
                          href={formData.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 hover:underline"
                        >
                          {formData.website}
                        </a>
                      ) : (
                        "Not specified"
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <FiBook />
                  About the Academy
                </h3>
              </div>
              <div className="p-6">
                <p className="text-gray-700 leading-relaxed">
                  {formData.description ||
                    "No description available. Add a description to tell others about your academy, its mission, and what makes it unique."}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <FiMapPin />
                  Location Details
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Street Address</span>
                    <span className="font-medium text-gray-900">{formData.street || "Not specified"}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Province</span>
                    <span className="font-medium text-gray-900">{formData.province || "Not specified"}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">District</span>
                    <span className="font-medium text-gray-900">{formData.district || "Not specified"}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600">Sector</span>
                    <span className="font-medium text-gray-900">{formData.sector || "Not specified"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading overlay */}
        {isLoading && (isEditing || isCreating) && (
          <div className="fixed inset-0 bg-emerald-900/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 shadow-2xl flex items-center gap-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
              <span className="text-lg text-emerald-600 font-medium">
                {isCreating ? "Creating academy profile..." : "Updating academy profile..."}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AcademyProfile
