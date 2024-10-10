import React from "react";
import { Itinerary } from "../../types/itinerary";

interface Props {
  itinerary: Itinerary;
}

const ItineraryItem: React.FC<Props> = ({ itinerary }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {itinerary.name}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {itinerary.description}
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Start Date</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {itinerary.startDate}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">End Date</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {itinerary.endDate}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Destinations</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {itinerary.destinations.map((destination) => (
                <div key={destination.id} className="mb-2">
                  <h4 className="font-medium">{destination.name}</h4>
                  <ul className="list-disc pl-5">
                    {destination.activities.map((activity) => (
                      <li key={activity.id}>{activity.name}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default ItineraryItem;
