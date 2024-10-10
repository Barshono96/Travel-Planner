import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Itinerary, Destination, Activity } from "../../types/itinerary";

interface ItineraryState {
  itineraries: Itinerary[];
  loading: boolean;
  error: string | null;
}

const initialState: ItineraryState = {
  itineraries: [],
  loading: false,
  error: null,
};

export const fetchItineraries = createAsyncThunk(
  "itinerary/fetchItineraries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3001/itineraries");
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch itineraries");
    }
  }
);

const itinerarySlice = createSlice({
  name: "itinerary",
  initialState,
  reducers: {
    addItinerary: (state, action: PayloadAction<Itinerary>) => {
      state.itineraries.push(action.payload);
    },
    updateItinerary: (state, action: PayloadAction<Itinerary>) => {
      const index = state.itineraries.findIndex(
        (i) => i.id === action.payload.id
      );
      if (index !== -1) {
        state.itineraries[index] = action.payload;
      }
    },
    deleteItinerary: (state, action: PayloadAction<string>) => {
      state.itineraries = state.itineraries.filter(
        (i) => i.id !== action.payload
      );
    },
    addDestination: (
      state,
      action: PayloadAction<{ itineraryId: string; destination: Destination }>
    ) => {
      const itinerary = state.itineraries.find(
        (i) => i.id === action.payload.itineraryId
      );
      if (itinerary) {
        itinerary.destinations.push(action.payload.destination);
      }
    },
    addActivity: (
      state,
      action: PayloadAction<{
        itineraryId: string;
        destinationId: string;
        activity: Activity;
      }>
    ) => {
      const itinerary = state.itineraries.find(
        (i) => i.id === action.payload.itineraryId
      );
      if (itinerary) {
        const destination = itinerary.destinations.find(
          (d) => d.id === action.payload.destinationId
        );
        if (destination) {
          destination.activities.push(action.payload.activity);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItineraries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchItineraries.fulfilled,
        (state, action: PayloadAction<Itinerary[]>) => {
          state.loading = false;
          state.itineraries = action.payload;
        }
      )
      .addCase(fetchItineraries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  addItinerary,
  updateItinerary,
  deleteItinerary,
  addDestination,
  addActivity,
} = itinerarySlice.actions;

export default itinerarySlice.reducer;
