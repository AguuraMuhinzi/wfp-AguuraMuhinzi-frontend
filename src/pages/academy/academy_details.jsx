
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { FiEdit2, FiSave, FiX } from 'react-icons/fi';
// import locations from '../../components/location';

// import { getAcademyDetails, updateAcademyDetails, clearMessages } from '../../Redux/Slices/academy/academy_details';

// const AcademyProfile = () => {
//     const dispatch = useDispatch();
//     const { userInfo } = useSelector((state) => state.user);
//     const { academyDetails, isLoading, successMessage, error } = useSelector((state) => state.academy);
    
//     const userId = userInfo?.id || localStorage.getItem('user_id');
//     const [isEditing, setIsEditing] = useState(false);
//     const [displayMessage, setDisplayMessage] = useState(false);
//     const [selectedProvince, setSelectedProvince] = useState('');
//     const [selectedDistrict, setSelectedDistrict] = useState('');
//     const [formData, setFormData] = useState({
//         name: '',
//         school_type: '',
//         level: '',
//         description: '',
//         street: '',
//         province: '',
//         district: '',
//         sector: '',
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

//     // Update form data when academy details are loaded
//     useEffect(() => {
//         if (academyDetails) {
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
//         }
//     }, [academyDetails, userInfo]);

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

//     // Handle form submission
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const dataToSubmit = {
//             ...formData,
//             user_id: userId
//         };
//         dispatch(updateAcademyDetails(dataToSubmit)).then((result) => {
//             if (!result.error) setIsEditing(false);
//         });
//     };

//     const toggleEditMode = () => {
//         setIsEditing(!isEditing);
//     };

//     const cancelEdit = () => {
//         // Reset form to original data
//         if (academyDetails) {
//             setFormData({
//                 ...academyDetails,
//                 email: academyDetails.email || userInfo?.email || '',
//             });
//             setSelectedProvince(academyDetails.province || '');
//             setSelectedDistrict(academyDetails.district || '');
//         }
//         setIsEditing(false);
//     };

//     const province = locations.provinces.find((p) => p.name === selectedProvince);
//     const district = province?.districts.find((d) => d.name === selectedDistrict);

//     return (
//         <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-bold text-green-600">Academy Profile</h2>
//                 {!isEditing ? (
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
//                             <FiSave className="mr-2" /> {isLoading ? "Saving..." : "Save Changes"}
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

//             {isLoading && !isEditing ? (
//                 <div className="text-center py-8">
//                     <p>Loading academy details...</p>
//                 </div>
//             ) : isEditing ? (
//                 // Edit Form
//                 <form className="space-y-6">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                             <label className="block text-gray-700 mb-2">Institution Name</label>
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
//                             <label className="block text-gray-700 mb-2">School Type</label>
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
//                             <label className="block text-gray-700 mb-2">Education Level</label>
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
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
//                             />
//                         </div>
//                         <div className="md:col-span-2">
//                             <label className="block text-gray-700 mb-2">Description</label>
//                             <textarea
//                                 name="description"
//                                 value={formData.description}
//                                 onChange={handleChange}
//                                 rows="4"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
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
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-gray-700 mb-2">Website</label>
//                             <input
//                                 type="url"
//                                 name="website"
//                                 value={formData.website}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-gray-700 mb-2">Founded Year</label>
//                             <input
//                                 type="number"
//                                 name="founded_year"
//                                 value={formData.founded_year}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-gray-700 mb-2">Number of Students</label>
//                             <input
//                                 type="number"
//                                 name="number_of_students"
//                                 value={formData.number_of_students}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-gray-700 mb-2">Number of Staff</label>
//                             <input
//                                 type="number"
//                                 name="number_of_staff"
//                                 value={formData.number_of_staff}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
//                             />
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
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiEdit2, FiSave, FiX, FiPlus } from 'react-icons/fi';
import locations from '../../components/location';

import { getAcademyDetails, updateAcademyDetails, createAcademyDetails, clearMessages } from '../../Redux/Slices/academy/academy_details';

const AcademyProfile = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.user);
    const { academyDetails, isLoading, successMessage, error } = useSelector((state) => state.academy);
    
    const userId = userInfo?.id || localStorage.getItem('user_id');
    const [isEditing, setIsEditing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [displayMessage, setDisplayMessage] = useState(false);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [profileExists, setProfileExists] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        school_type: '',
        level: '',
        description: '',
        street: '',
        province: '',
        district: '',
        sector: '',
        // These fields are not expected by backend but kept for UI display
        email: userInfo?.email || '',
        phone: userInfo?.contact_phone || '',
        website: '',
        founded_year: '',
        number_of_students: '',
        number_of_staff: ''
    });

    const schoolTypes = ["Public", "Private"];
    const levels = ["Primary", "Secondary", "Higher Education"];

    // Fetch academy details on component mount
    useEffect(() => {
        if (userId) {
            dispatch(getAcademyDetails(userId));
        }
    }, [dispatch, userId]);

    // Update form data when academy details are loaded or check if profile exists
    useEffect(() => {
        if (academyDetails) {
            setProfileExists(true);
            setFormData({
                ...formData,
                ...academyDetails,
                name: academyDetails.name || '',
                school_type: academyDetails.school_type || '',
                level: academyDetails.level || '',
                description: academyDetails.description || '',
                street: academyDetails.street || '',
                province: academyDetails.province || '',
                district: academyDetails.district || '',
                sector: academyDetails.sector || '',
                email: academyDetails.email || userInfo?.email || '',
            });
            setSelectedProvince(academyDetails.province || '');
            setSelectedDistrict(academyDetails.district || '');
        } else if (academyDetails === null && !isLoading) {
            // No profile exists
            setProfileExists(false);
            setFormData({
                name: '',
                school_type: '',
                level: '',
                description: '',
                street: '',
                province: '',
                district: '',
                sector: '',
                email: userInfo?.email || '',
                phone: userInfo?.contact_phone || '',
                website: '',
                founded_year: '',
                number_of_students: '',
                number_of_staff: ''
            });
            setSelectedProvince('');
            setSelectedDistrict('');
        }
    }, [academyDetails, userInfo, isLoading]);

    // Handle message display and clearing
    useEffect(() => {
        if (successMessage || error) {
            setDisplayMessage(true);
            const timer = setTimeout(() => {
                setDisplayMessage(false);
                dispatch(clearMessages());
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, error, dispatch]);

    // Handle form field updates
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleProvinceChange = (e) => {
        setSelectedProvince(e.target.value);
        setSelectedDistrict('');
        setFormData({ ...formData, province: e.target.value, district: '', sector: '' });
    };

    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
        setFormData({ ...formData, district: e.target.value, sector: '' });
    };

    // Handle form submission for both create and update
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Only send fields that backend expects
        const backendFields = {
            user: userId, // Backend expects 'user', not 'user_id'
            name: formData.name,
            level: formData.level,
            school_type: formData.school_type,
            description: formData.description,
            street: formData.street,
            province: formData.province,
            district: formData.district,
            sector: formData.sector
        };

        if (isCreating) {
            dispatch(createAcademyDetails(backendFields)).then((result) => {
                if (!result.error) {
                    setIsCreating(false);
                    setProfileExists(true);
                }
            });
        } else {
            dispatch(updateAcademyDetails(backendFields)).then((result) => {
                if (!result.error) setIsEditing(false);
            });
        }
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const startCreating = () => {
        setIsCreating(true);
    };

    const cancelEdit = () => {
        // Reset form to original data
        if (profileExists && academyDetails) {
            setFormData({
                ...academyDetails,
                email: academyDetails.email || userInfo?.email || '',
            });
            setSelectedProvince(academyDetails.province || '');
            setSelectedDistrict(academyDetails.district || '');
        } else {
            // Reset create form
            setFormData({
                name: '',
                school_type: '',
                level: '',
                description: '',
                street: '',
                province: '',
                district: '',
                sector: '',
                email: userInfo?.email || '',
                phone: userInfo?.contact_phone || '',
                website: '',
                founded_year: '',
                number_of_students: '',
                number_of_staff: ''
            });
            setSelectedProvince('');
            setSelectedDistrict('');
        }
        setIsEditing(false);
        setIsCreating(false);
    };

    const province = locations.provinces.find((p) => p.name === selectedProvince);
    const district = province?.districts.find((d) => d.name === selectedDistrict);

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-green-600">Academy Profile</h2>
                {!profileExists && !isCreating ? (
                    <button 
                        onClick={startCreating} 
                        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
                    >
                        <FiPlus className="mr-2" /> Create Profile
                    </button>
                ) : !isEditing && !isCreating ? (
                    <button 
                        onClick={toggleEditMode} 
                        className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300"
                    >
                        <FiEdit2 className="mr-2" /> Edit Profile
                    </button>
                ) : (
                    <div className="flex space-x-2">
                        <button 
                            onClick={cancelEdit} 
                            className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300"
                        >
                            <FiX className="mr-2" /> Cancel
                        </button>
                        <button 
                            onClick={handleSubmit} 
                            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300"
                            disabled={isLoading}
                        >
                            <FiSave className="mr-2" /> {isLoading ? "Saving..." : isCreating ? "Create Profile" : "Save Changes"}
                        </button>
                    </div>
                )}
            </div>

            {displayMessage && successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {successMessage}
                </div>
            )}

            {displayMessage && error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {isLoading && !isEditing && !isCreating ? (
                <div className="text-center py-8">
                    <p>Loading academy details...</p>
                </div>
            ) : !profileExists && !isCreating ? (
                // No Profile State
                <div className="text-center py-12">
                    <div className="mb-6">
                        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <FiPlus className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Academy Profile Found</h3>
                        <p className="text-gray-500 mb-6">Create your academy profile to get started and showcase your institution's information.</p>
                        <button 
                            onClick={startCreating} 
                            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 font-medium"
                        >
                            Create Your Academy Profile
                        </button>
                    </div>
                </div>
            ) : isEditing || isCreating ? (
                // Create/Edit Form
                <form className="space-y-6">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-700">
                            {isCreating ? "Create Academy Profile" : "Edit Academy Profile"}
                        </h3>
                        <p className="text-gray-500 text-sm">
                            {isCreating ? "Fill in the details to create your academy profile." : "Update your academy information below."}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 mb-2">Institution Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">School Type *</label>
                            <select
                                name="school_type"
                                value={formData.school_type}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                                required
                            >
                                <option value="">Select School Type</option>
                                {schoolTypes.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Education Level *</label>
                            <select
                                name="level"
                                value={formData.level}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                                required
                            >
                                <option value="">Select Level</option>
                                {levels.map((lvl) => (
                                    <option key={lvl} value={lvl}>{lvl}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 bg-gray-100"
                                disabled
                            />
                            <p className="text-xs text-gray-500 mt-1">Email is managed through your user account</p>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                                placeholder="Describe your academy, its mission, and what makes it unique..."
                            ></textarea>
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold text-green-600 mt-8 mb-4">Location Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 mb-2">Street Address</label>
                            <input
                                type="text"
                                name="street"
                                value={formData.street}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Province</label>
                            <select
                                name="province"
                                value={selectedProvince}
                                onChange={handleProvinceChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            >
                                <option value="">Select Province</option>
                                {locations.provinces.map((province) => (
                                    <option key={province.name} value={province.name}>{province.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">District</label>
                            <select
                                name="district"
                                value={selectedDistrict}
                                onChange={handleDistrictChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                                disabled={!selectedProvince}
                            >
                                <option value="">Select District</option>
                                {province?.districts.map((district) => (
                                    <option key={district.name} value={district.name}>{district.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Sector</label>
                            <select
                                name="sector"
                                value={formData.sector}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                                disabled={!selectedDistrict}
                            >
                                <option value="">Select Sector</option>
                                {district?.sectors.map((sector) => (
                                    <option key={sector} value={sector}>{sector}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 bg-gray-100"
                                disabled
                            />
                            <p className="text-xs text-gray-500 mt-1">Phone is managed through your user account</p>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Website</label>
                            <input
                                type="url"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 bg-gray-100"
                                placeholder="Feature coming soon..."
                                disabled
                            />
                            <p className="text-xs text-gray-500 mt-1">Website field will be available in future updates</p>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Founded Year</label>
                            <input
                                type="number"
                                name="founded_year"
                                value={formData.founded_year}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 bg-gray-100"
                                min="1800"
                                max={new Date().getFullYear()}
                                disabled
                            />
                            <p className="text-xs text-gray-500 mt-1">Additional details coming in future updates</p>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Number of Students</label>
                            <input
                                type="number"
                                name="number_of_students"
                                value={formData.number_of_students}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 bg-gray-100"
                                min="0"
                                disabled
                            />
                            <p className="text-xs text-gray-500 mt-1">Additional details coming in future updates</p>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Number of Staff</label>
                            <input
                                type="number"
                                name="number_of_staff"
                                value={formData.number_of_staff}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 bg-gray-100"
                                min="0"
                                disabled
                            />
                            <p className="text-xs text-gray-500 mt-1">Additional details coming in future updates</p>
                        </div>
                    </div>
                </form>
            ) : (
                // Display Profile
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold text-green-600 mb-4">Basic Information</h3>
                            <div className="space-y-3">
                                <div>
                                    <span className="text-gray-500">Institution Name:</span>
                                    <p className="font-medium">{formData.name || "Not specified"}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">School Type:</span>
                                    <p className="font-medium">{formData.school_type || "Not specified"}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Education Level:</span>
                                    <p className="font-medium">{formData.level || "Not specified"}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Founded Year:</span>
                                    <p className="font-medium">{formData.founded_year || "Not specified"}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Number of Students:</span>
                                    <p className="font-medium">{formData.number_of_students || "Not specified"}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Number of Staff:</span>
                                    <p className="font-medium">{formData.number_of_staff || "Not specified"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold text-green-600 mb-4">Contact Information</h3>
                            <div className="space-y-3">
                                <div>
                                    <span className="text-gray-500">Email:</span>
                                    <p className="font-medium">{formData.email || "Not specified"}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Phone:</span>
                                    <p className="font-medium">{formData.phone || "Not specified"}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Website:</span>
                                    <p className="font-medium">
                                        {formData.website ? (
                                            <a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                                                {formData.website}
                                            </a>
                                        ) : "Not specified"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold text-green-600 mb-4">Description</h3>
                        <p className="text-gray-700">{formData.description || "No description available."}</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold text-green-600 mb-4">Location</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <span className="text-gray-500">Street:</span>
                                <p className="font-medium">{formData.street || "Not specified"}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Province:</span>
                                <p className="font-medium">{formData.province || "Not specified"}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">District:</span>
                                <p className="font-medium">{formData.district || "Not specified"}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Sector:</span>
                                <p className="font-medium">{formData.sector || "Not specified"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AcademyProfile;