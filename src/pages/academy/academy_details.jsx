
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createAcademyDetails, clearMessages } from '../Redux/Slices/academy/academy_details'; // clearMessages to reset messages
// import locations from '../components/location';

// function AcademyDetailsForm() {
//     const dispatch = useDispatch();
//     const { isLoading, successMessage, error } = useSelector((state) => state.academy);
//     const { userInfo } = useSelector((state) => state.user);

//     const [selectedProvince, setSelectedProvince] = useState('');
//     const [selectedDistrict, setSelectedDistrict] = useState('');
//     const [schoolType, setSchoolType] = useState('');
//     const [level, setLevel] = useState('');
//     const [formData, setFormData] = useState({
//         user: userInfo?.id || localStorage.getItem('user_id') || '',
//         institution_name: '',
//         school_type: '',
//         level: '',
//         description: '',
//         street: '',
//         province: '',
//         district: '',
//         sector: '',
//     });
//     const [displayError, setDisplayError] = useState(false);

//     const schoolTypes = ["Public", "Private"];
//     const levels = ["Primary", "Secondary", "Higher Education"];

//     // Show error for a few seconds
//     useEffect(() => {
//         if (error) {
//             setDisplayError(true);
//             const timer = setTimeout(() => {
//                 setDisplayError(false);
//                 dispatch(clearMessages()); // Clear error message after timeout
//             }, 3000);
//             return () => clearTimeout(timer);
//         }
//     }, [error, dispatch]);

//     // Clear the form function
//     const clearForm = () => {
//         setFormData({
//             user: userInfo?.id || localStorage.getItem('user_id') || '',
//             institution_name: '',
//             school_type: '',
//             level: '',
//             description: '',
//             street: '',
//             province: '',
//             district: '',
//             sector: '',
//         });
//         setSelectedProvince('');
//         setSelectedDistrict('');
//         setSchoolType('');
//         setLevel('');
//     };

//     // Handle form field updates
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleProvinceChange = (e) => {
//         setSelectedProvince(e.target.value);
//         setSelectedDistrict('');
//         setFormData({ ...formData, province: e.target.value });
//     };

//     const handleDistrictChange = (e) => {
//         setSelectedDistrict(e.target.value);
//         setFormData({ ...formData, district: e.target.value });
//     };

//     // Handle form submission
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         dispatch(createAcademyDetails(formData)).finally(() => {
//             clearForm();
//         });
//     };

//     const province = locations.provinces.find((p) => p.name === selectedProvince);
//     const district = province?.districts.find((d) => d.name === selectedDistrict);

//     return (
//         <div className="min-h-screen flex">
//             <div className="w-1/2 bg-green-600 text-white p-10 hidden lg:flex flex-col justify-center items-center space-y-10">
//                 <div className="absolute top-8 left-8 flex items-center space-x-2">
//                     <img src={`${process.env.PUBLIC_URL}/imgs/plant.png`} alt="Logo" className="w-12 h-12 " />
//                     <h1 className="text-5xl font-bold text-white">AguuraMuhinzi</h1>
//                 </div>
//                 <div className="text-center text-xl font-semibold leading-relaxed">
//                     <p>
//                         Create connections between academies and local cooperatives, fostering resource sharing, knowledge exchange, and sustainable partnerships that empower communities and enhance education.
//                     </p>
//                 </div>
//             </div>

//             <div className="w-full lg:w-1/2 p-8 sm:p-12 bg-white flex flex-col justify-center">
//                 <h1 className="text-4xl font-bold mb-8 text-green-600 text-center">Set Up Academy Profile</h1>

//                 {successMessage && (
//                     <p className="text-green-700 bg-green-100 border border-green-400 rounded px-4 py-3 mb-4">
//                         {successMessage}
//                     </p>
//                 )}
//                 {displayError && (
//                     <p className="text-red-600 bg-red-100 border border-red-400 rounded px-4 py-3 mb-4">
//                        {error} 
//                     </p>
//                 )}

//                 <form className="space-y-5 max-w-lg mx-auto" onSubmit={handleSubmit}>
//                     <input
//                         type="text"
//                         name="institution_name"
//                         placeholder="Academy or Institution Name"
//                         required
//                         className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
//                         value={formData.institution_name}
//                         onChange={handleChange}
//                     />
//                     <input
//                         type="hidden"
//                         name="user"
//                         value={formData.user}
//                         readOnly
//                     />

//                     <select
//                         name="school_type"
//                         value={schoolType}
//                         onChange={(e) => setSchoolType(e.target.value)}
//                         required
//                         className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
//                     >
//                         <option value="">Select School Type</option>
//                         {schoolTypes.map((type) => (
//                             <option key={type} value={type}>{type}</option>
//                         ))}
//                     </select>

//                     <select
//                         name="level"
//                         value={level}
//                         onChange={(e) => setLevel(e.target.value)}
//                         required
//                         className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
//                     >
//                         <option value="">Select Level</option>
//                         {levels.map((lvl) => (
//                             <option key={lvl} value={lvl}>{lvl}</option>
//                         ))}
//                     </select>

//                     <textarea
//                         name="description"
//                         placeholder="Description of the Academy"
//                         rows="4"
//                         className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
//                         value={formData.description}
//                         onChange={handleChange}
//                     ></textarea>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                         <input
//                             type="text"
//                             name="street"
//                             placeholder="Street Address"
//                             className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
//                             value={formData.street}
//                             onChange={handleChange}
//                         />

//                         <select
//                             name="province"
//                             value={selectedProvince}
//                             onChange={handleProvinceChange}
//                             required
//                             className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
//                         >
//                             <option value="">Select Province</option>
//                             {locations.provinces.map((province) => (
//                                 <option key={province.name} value={province.name}>{province.name}</option>
//                             ))}
//                         </select>

//                         <select
//                             name="district"
//                             value={selectedDistrict}
//                             onChange={handleDistrictChange}
//                             required
//                             className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
//                             disabled={!selectedProvince}
//                         >
//                             <option value="">Select District</option>
//                             {province?.districts.map((district) => (
//                                 <option key={district.name} value={district.name}>{district.name}</option>
//                             ))}
//                         </select>

//                         <select
//                             name="sector"
//                             required
//                             className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
//                             disabled={!selectedDistrict}
//                         >
//                             <option value="">Select Sector</option>
//                             {district?.sectors.map((sector) => (
//                                 <option key={sector} value={sector}>{sector}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <button
//                         type="submit"
//                         className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300"
//                         disabled={isLoading}
//                     >
//                         {isLoading ? "Saving..." : "Save Academy Profile"}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default AcademyDetailsForm;


import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiEdit2, FiSave, FiX } from 'react-icons/fi';
import locations from '../../components/location';

// Assume fetchProfileDetails and updateProfileDetails are actions in your Redux
// You'll need to implement these actions in your academy slice
import { fetchAcademyDetails, updateAcademyDetails, clearMessages } from '../../Redux/Slices/academy/academy_details';

const AcademyProfile = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.user);
    const { academyDetails, isLoading, successMessage, error } = useSelector((state) => state.academy);
    
    const [isEditing, setIsEditing] = useState(false);
    const [displayMessage, setDisplayMessage] = useState(false);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [formData, setFormData] = useState({
        institution_name: '',
        school_type: '',
        level: '',
        description: '',
        street: '',
        province: '',
        district: '',
        sector: '',
        email: userInfo?.email || '',
        phone: '',
        website: '',
        founded_year: '',
        number_of_students: '',
        number_of_staff: ''
    });

    const schoolTypes = ["Public", "Private"];
    const levels = ["Primary", "Secondary", "Higher Education"];

    // Fetch academy details on component mount
    useEffect(() => {
        dispatch(fetchAcademyDetails(userInfo?.id || localStorage.getItem('user_id')));
    }, [dispatch, userInfo]);

    // Update form data when academy details are loaded
    useEffect(() => {
        if (academyDetails) {
            setFormData({
                ...academyDetails,
                email: academyDetails.email || userInfo?.email || '',
                phone: academyDetails.phone || '',
                website: academyDetails.website || '',
                founded_year: academyDetails.founded_year || '',
                number_of_students: academyDetails.number_of_students || '',
                number_of_staff: academyDetails.number_of_staff || ''
            });
            setSelectedProvince(academyDetails.province || '');
            setSelectedDistrict(academyDetails.district || '');
        }
    }, [academyDetails, userInfo]);

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

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateAcademyDetails(formData)).then(() => {
            if (!error) setIsEditing(false);
        });
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const cancelEdit = () => {
        // Reset form to original data
        if (academyDetails) {
            setFormData({
                ...academyDetails,
                email: academyDetails.email || userInfo?.email || '',
                phone: academyDetails.phone || '',
                website: academyDetails.website || '',
                founded_year: academyDetails.founded_year || '',
                number_of_students: academyDetails.number_of_students || '',
                number_of_staff: academyDetails.number_of_staff || ''
            });
            setSelectedProvince(academyDetails.province || '');
            setSelectedDistrict(academyDetails.district || '');
        }
        setIsEditing(false);
    };

    const province = locations.provinces.find((p) => p.name === selectedProvince);
    const district = province?.districts.find((d) => d.name === selectedDistrict);

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-green-600">Academy Profile</h2>
                {!isEditing ? (
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
                            <FiSave className="mr-2" /> {isLoading ? "Saving..." : "Save Changes"}
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

            {isEditing ? (
                // Edit Form
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 mb-2">Institution Name</label>
                            <input
                                type="text"
                                name="institution_name"
                                value={formData.institution_name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">School Type</label>
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
                            <label className="block text-gray-700 mb-2">Education Level</label>
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Website</label>
                            <input
                                type="url"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Founded Year</label>
                            <input
                                type="number"
                                name="founded_year"
                                value={formData.founded_year}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Number of Students</label>
                            <input
                                type="number"
                                name="number_of_students"
                                value={formData.number_of_students}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Number of Staff</label>
                            <input
                                type="number"
                                name="number_of_staff"
                                value={formData.number_of_staff}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
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
                                    <p className="font-medium">{formData.institution_name || "Not specified"}</p>
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
                        <h3 className="text-xl font-semibold text-green-600 mb-4">Academy Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <span className="text-gray-500">Number of Students:</span>
                                <p className="font-medium">{formData.number_of_students || "Not specified"}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Number of Staff:</span>
                                <p className="font-medium">{formData.number_of_staff || "Not specified"}</p>
                            </div>
                        </div>
                        <div>
                            <span className="text-gray-500 block mb-2">Description:</span>
                            <p className="bg-white p-4 rounded border border-gray-200">
                                {formData.description || "No description available."}
                            </p>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold text-green-600 mb-4">Location</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <span className="text-gray-500">Street Address:</span>
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