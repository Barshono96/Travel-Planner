import React from "react";
import { Itinerary } from "../../types/itinerary";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaRoute,
  FaEdit,
  FaTrash,
  FaInfoCircle,
} from "react-icons/fa";
import useDistanceCalculation from "./useDistanceCalculation";
import { format } from "date-fns";

interface Props {
  itinerary: Itinerary;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ItineraryItem: React.FC<Props> = ({ itinerary, onEdit, onDelete }) => {
  const { totalDistance, getDistanceBetween } = useDistanceCalculation(
    itinerary.destinations
  );

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-200">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-white truncate">
            {itinerary.name}
          </h3>
          <div className="space-x-2">
            <button
              onClick={() => onEdit(itinerary.id)}
              className="text-white hover:text-blue-200 p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-300"
              aria-label="Edit itinerary"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => onDelete(itinerary.id)}
              className="text-white hover:text-red-200 p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-300"
              aria-label="Delete itinerary"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-4 line-clamp-2">
          {itinerary.description}
        </p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center text-sm text-gray-700">
            <FaCalendarAlt className="mr-2 text-blue-500" />
            <span>
              {format(new Date(itinerary.startDate), "MMM d")} -{" "}
              {format(new Date(itinerary.endDate), "MMM d, yyyy")}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <FaMapMarkerAlt className="mr-2 text-blue-500" />
            <span>{itinerary.destinations.length} destinations</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <FaRoute className="mr-2 text-blue-500" />
            <span>{totalDistance.toFixed(2)} km total</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <FaInfoCircle className="mr-2 text-blue-500" />
            <span>{itinerary.destinations.length - 1} stops</span>
          </div>
        </div>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {itinerary.destinations.map((dest, index) => (
            <div
              key={dest.id}
              className="flex items-center justify-between bg-gray-50 p-2 rounded-lg"
            >
              <div className="flex items-center">
                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 text-xs font-bold">
                  {index + 1}
                </div>
                <span className="text-sm font-medium">{dest.name}</span>
              </div>
              {index < itinerary.destinations.length - 1 && (
                <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                  {getDistanceBetween(index, index + 1).toFixed(1)} km
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItineraryItem;
