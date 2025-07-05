import React, { useState } from 'react';
import UploadCategoryModel from '../componets/UploadCategoryModel';
import { FaPlus } from 'react-icons/fa6';

const CategoryPage = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);

  return (
    <section className="min-h-screen p-4 bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm rounded-md px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-xl font-semibold text-gray-800">Category Management</h2>
        <button
          onClick={() => setOpenUploadCategory(true)}
          className="flex items-center gap-2 text-sm text-white bg-amber-400 hover:bg-amber-500 px-4 py-2 rounded-md transition-all shadow-sm"
        >
          <FaPlus size={14} />
          Add Category
        </button>
      </div>

      {/* Optional: Add grid/list view of existing categories below */}

      {/* Modal */}
      {openUploadCategory && (
        <UploadCategoryModel close={() => setOpenUploadCategory(false)} />
      )}
    </section>
  );
};

export default CategoryPage;
