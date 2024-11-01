import React, { useState, useEffect } from 'react';
import locations from '../components/location';

function CooperativeDetailsForm() {
    const [animationIndex, setAnimationIndex] = useState(0);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');

    // Messages for the animated text
    const messages = [
        "Joining our platform connects your cooperative directly with schools, ensuring a reliable market for your produce and fostering long-term partnerships. Through this connection, cooperatives can focus on growth and stability while supporting educational institutions.",
        "Our system streamlines the sales process, helping cooperatives manage and monitor transactions in real-time. This provides valuable insights and analytics that can help optimize productivity, forecast demand, and ensure better resource management.",
        "By collaborating with schools, cooperatives can expand their market reach, increase revenue, and build sustainable relationships that support community growth. Together, we create a more stable, efficient, and transparent agricultural marketplace.",
        "Our platform empowers cooperatives with technological tools that simplify operations and enhance productivity. With features that support record-keeping, logistics, and communication, cooperatives can thrive in a modern agricultural ecosystem."
    ];

    // Update the message every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [messages.length]);

    // Handle province and district selections
    const handleProvinceChange = (e) => {
        setSelectedProvince(e.target.value);
        setSelectedDistrict('');
    };

    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
    };

    const province = locations.provinces.find((p) => p.name === selectedProvince);
    const district = province?.districts.find((d) => d.name === selectedDistrict);

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Animated Messages and Logo */}
            <div className="w-1/2 bg-green-600 text-white p-10 hidden lg:flex flex-col justify-center items-center space-y-10">
                {/* Logo at the top left */}
                <div className="absolute top-8 left-8 flex items-center space-x-2">
                    <img src={`${process.env.PUBLIC_URL}/imgs/plant.png`} alt="Logo" className="w-12 h-12 " />
                    <h1 className="text-5xl font-bold text-white">AguuraMuhinzi</h1>
                </div>

                {/* Animated Paragraphs */}
                <div className="text-left fade-in-out transition-opacity duration-1000">
                    <p className="text-3xl font-extrabold leading-relaxed tracking-wide">
                        {messages[animationIndex]}
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 p-8 sm:p-12 bg-white flex flex-col justify-center">
                <h1 className="text-4xl font-bold mb-8 text-green-600 text-center">Set Up Your Profile</h1>
                <form className="space-y-5 max-w-lg mx-auto">
                    {/* Name Input */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Cooperative Name"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
                    />

                    {/* Specialization Input */}
                    <input
                        type="text"
                        name="specialization"
                        placeholder="Specialization (e.g., Dairy, Coffee)"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
                    />

                    {/* Description Input */}
                    <textarea
                        name="description"
                        placeholder="Description of your Cooperative"
                        rows="4"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
                    ></textarea>

                    {/* Location Details with Combo Boxes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <input
                            type="text"
                            name="street"
                            placeholder="Street Address"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
                        />

                        {/* Province Selection */}
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

                        {/* District Selection */}
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

                        {/* Sector Selection */}
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

                    {/* Submit Button */}
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

export default CooperativeDetailsForm;
