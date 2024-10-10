import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./redux/store";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import ItineraryPage from "./pages/ItineraryPage";
import { checkAuthStatus } from "./redux/slices/authSlice";
import { fetchItineraries } from "./redux/slices/itinerarySlice";

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({
  element,
}) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return isAuthenticated ? element : <Navigate to="/" replace />;
};

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && userId !== undefined) {
      dispatch(fetchItineraries(userId));
    }
  }, [isAuthenticated, userId, dispatch]);

  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/itinerary"
            element={<PrivateRoute element={<ItineraryPage />} />}
          />
        </Routes>

        <div className="mt-4 text-center">
          <Routes>
            <Route
              path="/"
              element={
                <p>
                  New user?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Sign up
                  </Link>
                </p>
              }
            />
            <Route
              path="/signup"
              element={
                <p>
                  Already a user?{" "}
                  <Link to="/" className="text-blue-500 hover:text-blue-700">
                    Login
                  </Link>
                </p>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
