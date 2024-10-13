import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import {
  fetchItineraries,
  deleteItinerary,
  setCurrentItinerary,
} from "../../redux/slices/itinerarySlice";
import ItineraryItem from "./ItineraryItem";
import ItineraryForm from "./ItineraryForm";
import { FaPlus } from "react-icons/fa";

const ItineraryList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const itineraries = useSelector(
    (state: RootState) => state.itinerary.itineraries
  );
  const loading = useSelector((state: RootState) => state.itinerary.loading);
  const error = useSelector((state: RootState) => state.itinerary.error);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (userId !== undefined) {
      dispatch(fetchItineraries(userId));
    }
  }, [dispatch, userId]);

  const handleEdit = (id: string) => {
    const itineraryToEdit = itineraries.find((i) => i.id === id);
    if (itineraryToEdit) {
      dispatch(setCurrentItinerary(itineraryToEdit));
      setIsModalOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this itinerary?")) {
      dispatch(deleteItinerary(id));
    }
  };

  const handleOpenCreateModal = () => {
    dispatch(setCurrentItinerary(null));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (userId === undefined)
    return (
      <div className="text-center text-gray-600">
        Please log in to view itineraries
      </div>
    );
  if (loading)
    return <div className="text-center text-gray-600">Loading...</div>;
  if (error)
    return <div className="text-center text-red-600">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={handleOpenCreateModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <FaPlus className="mr-2" />
          <span className="relative">
            Create New Itinerary
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </span>
        </button>
      </div>
      {itineraries.length === 0 ? (
        <p className="text-center text-gray-600">
          No itineraries found. Create one to get started!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {itineraries.map((itinerary) => (
            <ItineraryItem
              key={itinerary.id}
              itinerary={itinerary}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
      <ItineraryForm isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default ItineraryList;
