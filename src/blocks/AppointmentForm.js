import React, { useState } from "react";

export default function Form({ data, onSubmit, onClose }) {
  // Clone the data prop into state
  const [formData, setFormData] = useState({ ...data });

  // Handle form changes
  const handleChange = (event) => {
    // Clone the formData
    const newFormData = { ...formData };

    // Update the value
    newFormData[event.target.name] = event.target.value;

    // Update the formData state
    setFormData(newFormData);
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validate the data
    if (!formData.date) {
      alert("Please select a date");
      return;
    }

    if (!formData.time) {
      alert("Please select a time");
      return;
    }

    // Pass the data back to the parent
    onSubmit(formData);
  };

  return (
    <>
      <div className="w-full h-full fixed top-0 start-0 z-[60] overflow-x-hidden overflow-y-auto pointer-events-none bg-gray-900 bg-opacity-50">
        <div className="mt-12 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
            <div className="flex justify-between items-center py-3 px-4 border-b">
              <h3 className="font-bold text-gray-800">
                {formData.id ? "Edit" : "New"} Appointment
              </h3>
              <button
                type="button"
                className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="flex-shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 overflow-y-auto">
              <label className="block text-sm font-medium mb-2">
                Appointment Date
              </label>
              <input
                type="date"
                name="date"
                className="py-3 px-4 block w-full border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                autoFocus
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div className="p-4 overflow-y-auto">
              <label className="block text-sm font-medium mb-2">
                Appointment Time
              </label>
              <input
                type="time"
                name="time"
                className="py-3 px-4 block w-full border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                autoFocus
                value={formData.time}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-2 border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                onClick={onClose}
              >
                Close
              </button>
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                onClick={handleSubmit}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
