import React from "react";
import { Itinerary } from "../../types/itinerary";

interface Props {
  itinerary: Itinerary;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ItineraryItem: React.FC<Props> = ({ itinerary, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4 transition-all duration-300 hover:shadow-lg">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold text-gray-800">
            {itinerary.name}
          </h3>
          <div className="space-x-2">
            <button
              onClick={() => onEdit(itinerary.id)}
              className="text-[#FFA500] hover:text-[#FF8C00] font-medium"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(itinerary.id)}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Delete
            </button>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4">{itinerary.description}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <div>
            <span className="font-medium">Start:</span> {itinerary.startDate}
          </div>
          <div>
            <span className="font-medium">End:</span> {itinerary.endDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryItem;
