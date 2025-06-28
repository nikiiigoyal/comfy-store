import { Form, Link, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { ChevronDown, ChevronUp, Filter, X } from "lucide-react";

import type { ProductsResponseWithParams } from "../utils/types";
import FormInput from "./FormInput";
import FormCheckbox from "./FormCheckbox";
import FormRange from "./FormRange";
import SelectInput from "./FormSelect";
import { Button } from "./ui/button";

const Filters = () => {
  const { meta, params } = useLoaderData() as ProductsResponseWithParams;
  const { search, company, category, shipping, order, price } = params;
  
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    company: true,
    price: true,
    sort: false,
    shipping: true
  });

  // Add default "All" option to categories
  const categoryOptions = ['All', ...(meta.categories || [])];
  const companyOptions = ['All', ...(meta.companies || [])];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const hasActiveFilters = search || category !== 'All' || company !== 'All' || shipping || price;

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between"
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
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>

      {/* Filter Panel */}
      <div className={`
        bg-white border border-gray-200 rounded-lg p-4 space-y-6
        ${isOpen ? 'block' : 'hidden'} lg:block
        lg:sticky lg:top-4 lg:h-fit lg:max-h-screen lg:overflow-y-auto
      `}>
        <Form className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </h3>
            {hasActiveFilters && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                asChild
                className="text-blue-600 hover:text-blue-800"
              >
                <Link to="/products" className="flex items-center gap-1">
                  <X className="h-4 w-4" />
                  Clear All
                </Link>
              </Button>
            )}
          </div>

          {/* Search */}
          <div className="space-y-3">
            <FormInput 
              label="Search Products" 
              name="search" 
              defaultValue={search} 
              type="search"
              className="w-full"
            />
          </div>

          {/* Category Filter */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => toggleSection('category')}
              className="flex items-center justify-between w-full text-left font-medium"
            >
              Category
              {expandedSections.category ? 
                <ChevronUp className="h-4 w-4" /> : 
                <ChevronDown className="h-4 w-4" />
              }
            </button>
            {expandedSections.category && (
              <div className="space-y-2">
                <SelectInput
                  label=""
                  name="category"
                  options={categoryOptions}
                  defaultValue={category || 'All'}
                  className="w-full"
                />
              </div>
            )}
          </div>

          {/* Brand/Company Filter */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => toggleSection('company')}
              className="flex items-center justify-between w-full text-left font-medium"
            >
              Brand
              {expandedSections.company ? 
                <ChevronUp className="h-4 w-4" /> : 
                <ChevronDown className="h-4 w-4" />
              }
            </button>
            {expandedSections.company && (
              <div className="space-y-2">
                <SelectInput
                  label=""
                  name="company"
                  options={companyOptions}
                  defaultValue={company || 'All'}
                  className="w-full"
                />
              </div>
            )}
          </div>

          {/* Price Range */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full text-left font-medium"
            >
              Price Range
              {expandedSections.price ? 
                <ChevronUp className="h-4 w-4" /> : 
                <ChevronDown className="h-4 w-4" />
              }
            </button>
            {expandedSections.price && (
              <div className="space-y-3">
                <FormRange 
                  label="" 
                  name="price" 
                  defaultValue={price}
                  className="w-full"
                />
              </div>
            )}
          </div>

          {/* Shipping Options */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => toggleSection('shipping')}
              className="flex items-center justify-between w-full text-left font-medium"
            >
              Shipping
              {expandedSections.shipping ? 
                <ChevronUp className="h-4 w-4" /> : 
                <ChevronDown className="h-4 w-4" />
              }
            </button>
            {expandedSections.shipping && (
              <div className="space-y-2">
                <FormCheckbox 
                  label="Free Shipping Only" 
                  name="shipping" 
                  defaultValue={shipping}
                />
              </div>
            )}
          </div>

          {/* Sort Options */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => toggleSection('sort')}
              className="flex items-center justify-between w-full text-left font-medium"
            >
              Sort By
              {expandedSections.sort ? 
                <ChevronUp className="h-4 w-4" /> : 
                <ChevronDown className="h-4 w-4" />
              }
            </button>
            {expandedSections.sort && (
              <div className="space-y-2">
                <SelectInput
                  label=""
                  name="order"
                  options={[
                    { value: 'a-z', label: 'Name: A to Z' },
                    { value: 'z-a', label: 'Name: Z to A' },
                    { value: 'high', label: 'Price: High to Low' },
                    { value: 'low', label: 'Price: Low to High' }
                  ]}
                  defaultValue={order}
                  className="w-full"
                />
              </div>
            )}
          </div>

          {/* Apply/Reset Buttons */}
          <div className="space-y-2 pt-4 border-t">
            <Button 
              type="submit"
              className="w-full"
              size="sm"
            >
              Apply Filters
            </Button>
            <Button 
              type="button"
              variant="outline"
              size="sm"
              asChild
              className="w-full"
            >
              <Link to="/products">Reset All</Link>
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Filters;