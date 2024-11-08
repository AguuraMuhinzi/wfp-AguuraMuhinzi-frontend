
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAcademyDetails, clearMessages } from '../Redux/Slices/academy/academy_details'; // clearMessages to reset messages
import locations from '../components/location';

function AcademyDetailsForm() {
    const dispatch = useDispatch();
    const { isLoading, successMessage, error } = useSelector((state) => state.academy);
    const { userInfo } = useSelector((state) => state.user);

    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [schoolType, setSchoolType] = useState('');
    const [level, setLevel] = useState('');
    const [formData, setFormData] = useState({
        user: userInfo?.id || localStorage.getItem('user_id') || '',
        institution_name: '',
        school_type: '',
        level: '',
        description: '',
        street: '',
        province: '',
        district: '',
        sector: '',
    });
    const [displayError, setDisplayError] = useState(false);

    const schoolTypes = ["Public", "Private"];
    const levels = ["Primary", "Secondary", "Higher Education"];

    // Show error for a few seconds
    useEffect(() => {
        if (error) {
            setDisplayError(true);
            const timer = setTimeout(() => {
                setDisplayError(false);
                dispatch(clearMessages()); // Clear error message after timeout
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, dispatch]);

    // Clear the form function
    const clearForm = () => {
        setFormData({
            user: userInfo?.id || localStorage.getItem('user_id') || '',
            institution_name: '',
            school_type: '',
            level: '',
            description: '',
            street: '',
            province: '',
            district: '',
            sector: '',
        });
        setSelectedProvince('');
        setSelectedDistrict('');
        setSchoolType('');
        setLevel('');
    };

    // Handle form field updates
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleProvinceChange = (e) => {
        setSelectedProvince(e.target.value);
        setSelectedDistrict('');
        setFormData({ ...formData, province: e.target.value });
    };

    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
        setFormData({ ...formData, district: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createAcademyDetails(formData)).finally(() => {
            clearForm();
        });
    };

    const province = locations.provinces.find((p) => p.name === selectedProvince);
    const district = province?.districts.find((d) => d.name === selectedDistrict);

    return (
        <div className="min-h-screen flex">
            <div className="w-1/2 bg-green-600 text-white p-10 hidden lg:flex flex-col justify-center items-center space-y-10">
                <div className="absolute top-8 left-8 flex items-center space-x-2">
                    <img src={`${process.env.PUBLIC_URL}/imgs/plant.png`} alt="Logo" className="w-12 h-12 " />
                    <h1 className="text-5xl font-bold text-white">AguuraMuhinzi</h1>
                </div>
                <div className="text-center text-xl font-semibold leading-relaxed">
                    <p>
                        Create connections between academies and local cooperatives, fostering resource sharing, knowledge exchange, and sustainable partnerships that empower communities and enhance education.
                    </p>
                </div>
            </div>

            <div className="w-full lg:w-1/2 p-8 sm:p-12 bg-white flex flex-col justify-center">
                <h1 className="text-4xl font-bold mb-8 text-green-600 text-center">Set Up Academy Profile</h1>

                {successMessage && (
                    <p className="text-green-700 bg-green-100 border border-green-400 rounded px-4 py-3 mb-4">
                        {successMessage}
                    </p>
                )}
                {displayError && (
                    <p className="text-red-600 bg-red-100 border border-red-400 rounded px-4 py-3 mb-4">
                       {error} 
                    </p>
                )}

                <form className="space-y-5 max-w-lg mx-auto" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="institution_name"
                        placeholder="Academy or Institution Name"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
                        value={formData.institution_name}
                        onChange={handleChange}
                    />
                    <input
                        type="hidden"
                        name="user"
                        value={formData.user}
                        readOnly
                    />

                    <select
                        name="school_type"
                        value={schoolType}
                        onChange={(e) => setSchoolType(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
                    >
                        <option value="">Select School Type</option>
                        {schoolTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>

                    <select
                        name="level"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
                    >
                        <option value="">Select Level</option>
                        {levels.map((lvl) => (
                            <option key={lvl} value={lvl}>{lvl}</option>
                        ))}
                    </select>

                    <textarea
                        name="description"
                        placeholder="Description of the Academy"
                        rows="4"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <input
                            type="text"
                            name="street"
                            placeholder="Street Address"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
                            value={formData.street}
                            onChange={handleChange}
                        />

                        <select
                            name="province"
                            value={selectedProvince}
                            onChange={handleProvinceChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
                        >
                            <option value="">Select Province</option>
                            {locations.provinces.map((province) => (
                                <option key={province.name} value={province.name}>{province.name}</option>
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
                            {province?.districts.map((district) => (
                                <option key={district.name} value={district.name}>{district.name}</option>
                            ))}
                        </select>

                        <select
                            name="sector"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
                            disabled={!selectedDistrict}
                        >
                            <option value="">Select Sector</option>
                            {district?.sectors.map((sector) => (
                                <option key={sector} value={sector}>{sector}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300"
                        disabled={isLoading}
                    >
                        {isLoading ? "Saving..." : "Save Academy Profile"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AcademyDetailsForm;

