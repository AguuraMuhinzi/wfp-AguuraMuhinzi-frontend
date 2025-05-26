// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createCooperativeDetails, clearMessages } from '../../Redux/Slices/cooperative/coop_details';
// import locations from '../../components/location';

// function CooperativeDetailsForm() {
//     const dispatch = useDispatch();
//     const { isLoading, successMessage, error } = useSelector((state) => state.cooperative);
//     const { userInfo } = useSelector((state) => state.user);
    
//     const token = localStorage.getItem('accessToken');
    
//     const [animationIndex, setAnimationIndex] = useState(0);
//     const [selectedProvince, setSelectedProvince] = useState('');
//     const [selectedDistrict, setSelectedDistrict] = useState('');
//     const [formData, setFormData] = useState({
//         user_id: userInfo?.id || localStorage.getItem('user_id') || '',
//         name: '',
//         specialization: '',
//         description: '',
//         street: '',
//         province: '',
//         district: '',
//         sector: '',
//     });
//     const [document, setDocument] = useState(null);

//     const messages = [
//         "Joining our platform connects your cooperative directly with schools...",
//         "Our system streamlines the sales process...",
//         "By collaborating with schools, cooperatives can expand their market...",
//         "Our platform empowers cooperatives with technological tools..."
//     ];

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setAnimationIndex((prevIndex) => (prevIndex + 1) % messages.length);
//         }, 5000);
//         return () => clearInterval(interval);
//     }, [messages.length]);

//     useEffect(() => {
//         dispatch(clearMessages());
//     }, [dispatch]);

//     const handleProvinceChange = (e) => {
//         const { value } = e.target;
//         setSelectedProvince(value);
//         setSelectedDistrict('');
//         setFormData((prevData) => ({ ...prevData, province: value }));
//     };

//     const handleDistrictChange = (e) => {
//         const { value } = e.target;
//         setSelectedDistrict(value);
//         setFormData((prevData) => ({ ...prevData, district: value }));
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({ ...prevData, [name]: value }));
//     };

//     const handleDocumentChange = (e) => {
//         setDocument(e.target.files[0]);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const data = new FormData();
//         Object.keys(formData).forEach((key) => {
//             data.append(key, formData[key]);
//         });
//         data.append('user', formData.user_id);
//         if (document) {
//             data.append('document', document);
//         }

//         dispatch(createCooperativeDetails(data));
//     };

//     const province = locations.provinces.find((p) => p.name === selectedProvince);
//     const district = province?.districts.find((d) => d.name === selectedDistrict);

//     return (
//         <div className="min-h-screen flex">
//             <div className="w-1/2 bg-green-600 text-white p-10 hidden lg:flex flex-col justify-center items-center space-y-10">
//                 <div className="absolute top-8 left-8 flex items-center space-x-2">
//                     <img src={`${process.env.PUBLIC_URL}/imgs/plant.png`} alt="Logo" className="w-12 h-12" />
//                     <h1 className="text-5xl font-bold text-white">AguuraMuhinzi</h1>
//                 </div>

//                 <div className="text-left fade-in-out transition-opacity duration-1000">
//                     <p className="text-3xl font-extrabold leading-relaxed tracking-wide">
//                         {messages[animationIndex]}
//                     </p>
//                 </div>
//             </div>

//             <div className="w-full lg:w-1/2 p-8 sm:p-12 bg-white flex flex-col justify-center">
//                 <h1 className="text-4xl font-bold mb-8 text-green-600 text-center">Set Up Your Profile</h1>
                
//                 {successMessage && (
//                     <p className="text-green-700 bg-green-100 border border-green-400 rounded px-4 py-3 mb-4">
//                         {successMessage}
//                     </p>
//                 )}
//                 {error && (
//                     <p className="text-red-600 bg-red-100 border border-red-400 rounded px-4 py-3 mb-4">
//                         {error}
//                     </p>
//                 )}

//                 <form onSubmit={handleSubmit} className="space-y-5 max-w-lg mx-auto">
//                     <input
//                         type="text"
//                         name="name"
//                         placeholder="Cooperative Name"
//                         required
//                         className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
//                         onChange={handleChange}
//                         value={formData.name}
//                     />

//                     <input
//                         type="hidden"
//                         name="user_id"
//                         value={formData.user_id}
//                         readOnly
//                         className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 bg-gray-100"
//                     />

//                     <input
//                         type="text"
//                         name="specialization"
//                         placeholder="Specialization (e.g., Dairy, Coffee)"
//                         required
//                         className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
//                         onChange={handleChange}
//                         value={formData.specialization}
//                     />

//                     <textarea
//                         name="description"
//                         placeholder="Description of your Cooperative"
//                         rows="4"
//                         className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
//                         onChange={handleChange}
//                         value={formData.description}
//                     ></textarea>
// <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                     <input
//                         type="text"
//                         name="street"
//                         placeholder="Street Address"
//                         className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
//                         onChange={handleChange}
//                         value={formData.street}
//                     />
                     
//                     <select
//                         name="province"
//                         value={selectedProvince}
//                         onChange={handleProvinceChange}
//                         required
//                         className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
//                     >
//                         <option value="">Select Province</option>
//                         {locations.provinces.map((province) => (
//                             <option key={province.name} value={province.name}>{province.name}</option>
//                         ))}
//                     </select>

//                     <select
//                         name="district"
//                         value={selectedDistrict}
//                         onChange={handleDistrictChange}
//                         required
//                         className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
//                         disabled={!selectedProvince}
//                     >
//                         <option value="">Select District</option>
//                         {province?.districts.map((district) => (
//                             <option key={district.name} value={district.name}>{district.name}</option>
//                         ))}
//                     </select>

//                     <select
//                         name="sector"
//                         required
//                         className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
//                         disabled={!selectedDistrict}
//                         onChange={handleChange}
//                         value={formData.sector}
//                     >
//                         <option value="">Select Sector</option>
//                         {district?.sectors.map((sector) => (
//                             <option key={sector} value={sector}>{sector}</option>
//                         ))}
//                     </select>
//                     </div>
//                     <div className="mt-4">
//                         <label className="block text-sm font-medium text-gray-700">Upload Supporting Documents</label>
//                         <input
//                             type="file"
//                             name="document"
//                             onChange={handleDocumentChange}
//                             accept=".pdf,.doc,.docx,.jpg,.png"
//                             className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 mt-2"
//                         />
//                         <p className="text-xs text-gray-500 mt-1">Accepted formats: .pdf, .doc, .docx, .jpg, .png</p>
//                     </div>

//                     <button
//                         type="submit"
//                         className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300"
//                         disabled={isLoading}
//                     >
//                         {isLoading ? "Saving..." : "Save Profile"}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default CooperativeDetailsForm;


