import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Itinerary, Activity } from "../../types/itinerary";

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
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/itineraries?userId=${userId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch itineraries");
    }
  }
);

export const addItinerary = createAsyncThunk(
  "itinerary/addItinerary",
  async (newItinerary: Omit<Itinerary, "id">, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/itineraries",
        newItinerary
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to add itinerary");
    }
  }
);

const itinerarySlice = createSlice({
  name: "itinerary",
  initialState,
  reducers: {
    addActivity: (
      state,
      action: PayloadAction<{
        itineraryId: string;
        destinationId: string;
        activity: Activity;
      }>
    ) => {
      const { itineraryId, destinationId, activity } = action.payload;
      const itinerary = state.itineraries.find((i) => i.id === itineraryId);
      if (itinerary) {
        const destination = itinerary.destinations.find(
          (d) => d.id === destinationId
        );
        if (destination) {
          destination.activities.push(activity);
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
      })
      .addCase(addItinerary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addItinerary.fulfilled,
        (state, action: PayloadAction<Itinerary>) => {
          state.loading = false;
          state.itineraries.push(action.payload);
        }
      )
      .addCase(addItinerary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addActivity } = itinerarySlice.actions;
export default itinerarySlice.reducer;
