import  { useState } from 'react';
import { Filter, X } from 'lucide-react';

const Filters = () => {
  const [formData, setFormData] = useState({
    search: '',
    category: 'all',
    company: 'all',
    order: 'a-z',
    price: 1000,
    shipping: false
  });
  
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sample data - replace with your actual data from Supabase
  const categoryOptions = ['all', 'tables', 'chairs', 'sofas', 'beds', 'storage'];
  const companyOptions = ['all', 'ikea', 'ashley', 'pottery barn', 'west elm', 'crate & barrel'];
  
  const sortOptions = [
    { value: 'a-z', label: 'a-z' },
    { value: 'z-a', label: 'z-a' },  
    { value: 'high', label: 'high' },
    { value: 'low', label: 'low' }
  ];

  const handleInputChange = (name: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void; } | undefined) => {
    e.preventDefault();
    console.log('Filter data:', formData);
    // Here you would typically update your URL params or call your loader
  };

  const handleReset = () => {
    setFormData({
      search: '',
      category: 'all',
      company: 'all',
      order: 'a-z',
      price: 1000,
      shipping: false
    });
  };

  const hasActiveFilters = formData.search || formData.category !== 'all' || formData.company !== 'all' || formData.shipping || formData.price < 1000;

  return (
    <>
      {/* Desktop Horizontal Layout */}
      <div className="hidden lg:block bg-blue-50 p-6 rounded-lg mb-8">
        <div className="space-y-6">
          {/* First Row - Main Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Product */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Search Product
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.search}
                  onChange={(e) => handleInputChange('search', e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Select Category */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Select Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white outline-none"
              >
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Company */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Select Company
              </label>
              <select
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white outline-none"
              >
                {companyOptions.map((comp) => (
                  <option key={comp} value={comp}>
                    {comp}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Sort By
              </label>
              <select
                value={formData.order}
                onChange={(e) => handleInputChange('order', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white outline-none"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Second Row - Price Range and Free Shipping */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            {/* Price Range */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Select Price
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', parseInt(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(formData.price / 1000) * 100}%, #E5F3FF ${(formData.price / 1000) * 100}%, #E5F3FF 100%)`
                  }}
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>0</span>
                  <span className="font-medium">${formData.price.toLocaleString()}.00</span>
                  <span>Max : $1,000.00</span>
                </div>
              </div>
            </div>

            {/* Free Shipping */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Free Shipping
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.shipping}
                  onChange={(e) => handleInputChange('shipping', e.target.checked)}
                  className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Free Shipping Only</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button 
                onClick={handleSubmit}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                SEARCH
              </button>
              <button 
                onClick={handleReset}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium border-purple-600 transition-colors"
              >
                RESET
              </button>
            </div>
          </div>

          {/* Clear filters link */}
          {hasActiveFilters && (
            <div className="text-center">
              <button 
                onClick={handleReset}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center gap-1 transition-colors"
              >
                <X className="h-4 w-4" />
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full flex items-center justify-between py-3 px-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </span>
        </button>
      </div>

      {/* Mobile Filters Panel */}
      {showMobileFilters && (
        <div className="lg:hidden bg-white border border-gray-200 rounded-lg p-4 mb-4">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Filter Fields */}
            <div className="space-y-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search Product
                </label>
                <input
                  type="text"
                  value={formData.search}
                  onChange={(e) => handleInputChange('search', e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white outline-none"
                >
                  {categoryOptions.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <select
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white outline-none"
                >
                  {companyOptions.map((comp) => (
                    <option key={comp} value={comp}>
                      {comp}
                    </option>
                  ))}
                </select>
              </div>

              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select
                  value={formData.order}
                  onChange={(e) => handleInputChange('order', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white outline-none"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', parseInt(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>$0</span>
                  <span>${formData.price.toLocaleString()}</span>
                </div>
              </div>

              {/* Free Shipping */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.shipping}
                  onChange={(e) => handleInputChange('shipping', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Free Shipping Only
                </label>
              </div>
            </div>

            {/* Mobile Action Buttons */}
            <div className="flex gap-2 pt-4 border-t">
              <button 
                onClick={() => {
                  handleSubmit();
                  setShowMobileFilters(false);
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Apply Filters
              </button>
              <button 
                onClick={() => {
                  handleReset();
                  setShowMobileFilters(false);
                }}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      
      {/* Add custom CSS for range slider */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .slider::-webkit-slider-thumb {
            appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #3B82F6;
            cursor: pointer;
            border: 2px solid #ffffff;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
          
          .slider::-moz-range-thumb {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #3B82F6;
            cursor: pointer;
            border: 2px solid #ffffff;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
        `
          }} />
    </>
  );
};

export default Filters;