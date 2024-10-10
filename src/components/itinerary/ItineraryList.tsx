import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchItineraries } from "../../redux/slices/itinerarySlice";
import ItineraryItem from "./ItineraryItem";

const ItineraryList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const itineraries = useSelector(
    (state: RootState) => state.itinerary.itineraries
  );
  const loading = useSelector((state: RootState) => state.itinerary.loading);
  const error = useSelector((state: RootState) => state.itinerary.error);

  useEffect(() => {
    if (userId !== undefined) {
      dispatch(fetchItineraries(userId));
    }
  }, [dispatch, userId]);

  if (userId === undefined) return <div>Please log in to view itineraries</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Your Itineraries</h2>
      {itineraries.length === 0 ? (
        <p>No itineraries found. Create one to get started!</p>
      ) : (
        itineraries.map((itinerary) => (
          <ItineraryItem key={itinerary.id} itinerary={itinerary} />
        ))
      )}
    </div>
  );
};

export default ItineraryList;
