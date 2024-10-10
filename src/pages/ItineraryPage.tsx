import React from "react";
import ItineraryForm from "../components/itinerary/ItineraryForm";
import ItineraryList from "../components/itinerary/ItineraryList";

const ItineraryPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Travel Itinerary Planning</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Create New Itinerary</h2>
          <ItineraryForm />
        </div>
        <div>
          <ItineraryList />
        </div>
      </div>
    </div>
  );
};

export default ItineraryPage;
