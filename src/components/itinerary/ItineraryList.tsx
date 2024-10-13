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

const ItineraryList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const itineraries = useSelector(
    (state: RootState) => state.itinerary.itineraries
  );
  const currentItinerary = useSelector(
    (state: RootState) => state.itinerary.currentItinerary
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(setCurrentItinerary(null));
  };

  const handleOpenCreateModal = () => {
    dispatch(setCurrentItinerary(null));
    setIsModalOpen(true);
  };

  if (userId === undefined) return <div>Please log in to view itineraries</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Itineraries</h2>
        <button
          onClick={handleOpenCreateModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create New Itinerary
        </button>
      </div>
      {itineraries.length === 0 ? (
        <p>No itineraries found. Create one to get started!</p>
      ) : (
        itineraries.map((itinerary) => (
          <ItineraryItem
            key={itinerary.id}
            itinerary={itinerary}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-2">
              {currentItinerary ? "Edit" : "Create"} Itinerary
            </h3>
            <ItineraryForm onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ItineraryList;
