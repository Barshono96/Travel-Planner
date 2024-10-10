export interface Activity {
  id: string;
  name: string;
  description?: string;
  type: string;
}

export interface Destination {
  id: string;
  name: string;
  activities: Activity[];
}

export interface Itinerary {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  destinations: Destination[];
}
