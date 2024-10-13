import React, { useState } from "react";
import ItineraryForm from "../components/itinerary/ItineraryForm";
import ItineraryList from "../components/itinerary/ItineraryList";

const ItineraryPage: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleOpenForm = () => {
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Travel Itinerary Planning</h1>
      <div className="mb-8">
        {!isFormVisible && (
          <button
            onClick={handleOpenForm}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create New Itinerary
          </button>
        )}
        {isFormVisible && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Create New Itinerary</h2>
            <ItineraryForm onClose={handleCloseForm} />
          </div>
        )}
      </div>
      <div>
        <ItineraryList />
      </div>
    </div>
  );
};

export default ItineraryPage;
