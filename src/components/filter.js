import React from 'react';

const FilterComponent = ({
  searchTerm,
  setSearchTerm,
  selectedCategories,
  handleCategoryChange,
  selectedLocation,
  setSelectedLocation,
  selectedPriceRange,
  setSelectedPriceRange,
  selectedDate,
  setSelectedDate,
}) => {
  const categories = ['Fruits', 'Vegetables', 'Grain', 'Dairy', 'Processed Grains'];

  return (
    <div className="w-full sm:w-60 bg-green-50 rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4 text-center text-green-700">Filters</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-green-300 rounded-md p-2 text-sm focus:outline-none focus:ring focus:ring-green-300"
        />
      </div>

      {/* Category Filter */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-green-700 mb-2">Category</h3>
        <div className="grid grid-cols-2 gap-1">
          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <input
                type="checkbox"
                id={category}
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="w-4 h-4 text-green-600 focus:ring-green-500 border-green-300 rounded"
              />
              <label htmlFor={category} className="ml-2 text-gray-700 text-xs">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Location Filter */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-green-700 mb-2">Nearby Location</h3>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full border border-green-300 rounded-md p-2 text-sm"
        >
          <option value="All">All</option>
          <option value="Eastern Province">Eastern Province</option>
          <option value="Western Province">Western Province</option>
          <option value="Northern Province">Northern Province</option>
          <option value="Southern Province">Southern Province</option>
        </select>
      </div>

      {/* Price Filter */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-green-700 mb-2">Price Range</h3>
        <select
          value={selectedPriceRange}
          onChange={(e) => setSelectedPriceRange(e.target.value)}
          className="w-full border border-green-300 rounded-md p-2 text-sm"
        >
          <option value="All">All Prices</option>
          <option value="Low">Below 1000 RWF</option>
          <option value="High">Above 1000 RWF</option>
        </select>
      </div>

      {/* Harvest Date Filter */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-green-700 mb-2">Harvest Date</h3>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full border border-green-300 rounded-md p-2 text-sm focus:outline-none focus:ring focus:ring-green-300"
        />
      </div>
    </div>
  );
};

export default FilterComponent;
