import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Itinerary, Activity, Destination } from "../../types/itinerary";
import {
  deleteItinerary,
  updateItinerary,
  addDestination,
} from "../../redux/slices/itinerarySlice";
import ActivityForm from "./ActivityForm";
import { v4 as uuidv4 } from "uuid";

interface Props {
  itinerary: Itinerary;
}

const ItineraryItem: React.FC<Props> = ({ itinerary }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedItinerary, setEditedItinerary] = useState(itinerary);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(
    null
  );
  const [newDestinationName, setNewDestinationName] = useState("");

  const handleDelete = () => {
    dispatch(deleteItinerary(itinerary.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(updateItinerary(editedItinerary));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedItinerary(itinerary);
    setIsEditing(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedItinerary({ ...editedItinerary, [name]: value });
  };

  const handleAddDestination = () => {
    if (newDestinationName.trim()) {
      const newDestination: Destination = {
        id: uuidv4(),
        name: newDestinationName.trim(),
        activities: [],
      };
      dispatch(
        addDestination({
          itineraryId: itinerary.id,
          destination: newDestination,
        })
      );
      setNewDestinationName("");
    }
  };

  const renderActivity = (activity: Activity) => (
    <div key={activity.id} className="ml-4 mt-2">
      <h5 className="text-sm font-medium text-gray-900">{activity.name}</h5>
      <p className="text-sm text-gray-500">{activity.type}</p>
      {activity.description && (
        <p className="text-sm text-gray-500">{activity.description}</p>
      )}
    </div>
  );

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
      <div className="px-4 py-5 sm:px-6">
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={editedItinerary.name}
            onChange={handleInputChange}
            className="text-lg font-medium text-gray-900 w-full"
          />
        ) : (
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {itinerary.name}
          </h3>
        )}
        {isEditing ? (
          <textarea
            name="description"
            value={editedItinerary.description}
            onChange={handleInputChange}
            className="mt-1 text-sm text-gray-500 w-full"
          />
        ) : (
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {itinerary.description}
          </p>
        )}
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Start Date</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {isEditing ? (
                <input
                  type="date"
                  name="startDate"
                  value={editedItinerary.startDate}
                  onChange={handleInputChange}
                  className="w-full"
                />
              ) : (
                itinerary.startDate
              )}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">End Date</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {isEditing ? (
                <input
                  type="date"
                  name="endDate"
                  value={editedItinerary.endDate}
                  onChange={handleInputChange}
                  className="w-full"
                />
              ) : (
                itinerary.endDate
              )}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Destinations</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {itinerary.destinations.length === 0 ? (
                <p>No destinations added yet.</p>
              ) : (
                itinerary.destinations.map((destination) => (
                  <div key={destination.id} className="mb-4">
                    <h4 className="text-md font-medium text-gray-700">
                      {destination.name}
                    </h4>
                    {destination.activities.map(renderActivity)}
                    {selectedDestination === destination.id ? (
                      <div className="mt-2">
                        <ActivityForm
                          itineraryId={itinerary.id}
                          destinationId={destination.id}
                        />
                        <button
                          onClick={() => setSelectedDestination(null)}
                          className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setSelectedDestination(destination.id)}
                        className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Add Activity
                      </button>
                    )}
                  </div>
                ))
              )}
              <div className="mt-4">
                <input
                  type="text"
                  value={newDestinationName}
                  onChange={(e) => setNewDestinationName(e.target.value)}
                  placeholder="New destination name"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
                <button
                  onClick={handleAddDestination}
                  className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Destination
                </button>
              </div>
            </dd>
          </div>
        </dl>
      </div>
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ItineraryItem;
