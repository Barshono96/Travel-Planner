import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ItineraryItem from "./ItineraryItem";

const ItineraryList: React.FC = () => {
  const itineraries = useSelector(
    (state: RootState) => state.itinerary.itineraries
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Your Itineraries</h2>
      {itineraries.map((itinerary) => (
        <ItineraryItem key={itinerary.id} itinerary={itinerary} />
      ))}
    </div>
  );
};

export default ItineraryList;
