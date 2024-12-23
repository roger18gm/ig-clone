import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import { useAuth } from "./AuthContext";

const UserProfileContext = createContext({
  authProfile: null,
  loading: true,
  error: null,
  refreshProfile: () => {},
});

export const UserProfileProvider = ({ children }) => {
  const { authUser } = useAuth(); // From AuthContext
  const [authProfile, setAuthProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user authProfile from the database
  const fetchUserProfile = async () => {
    setLoading(true);
    setError(null);

    if (!authUser) {
      setAuthProfile(null);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("user_profile")
        .select("*")
        .eq("user_profile_id", authUser.id) // Match auth user ID with user_profile primary key
        .single();

      if (error) throw error;

      setAuthProfile(data); // Set the authProfile in state
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Refresh authProfile on user change or manual trigger

  // If authProfile already exists in local storage, set that as authProfile state, else get it from supabase
  useEffect(() => {
    const cachedProfile = localStorage.getItem("user_profile");
    if (cachedProfile) {
      setAuthProfile(JSON.parse(cachedProfile));
      setLoading(false);
    } else {
      fetchUserProfile();
    }
  }, [authUser]);

  // If the authProfile data is retrieved from supabase, add it to local storage
  useEffect(() => {
    if (authProfile) {
      localStorage.setItem("user_profile", JSON.stringify(authProfile));
    }
  }, [authProfile]);
  

  const value = {
    authProfile,
    loading,
    error,
    refreshProfile: fetchUserProfile,
  };

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useAuthUserProfile = () => {
  return useContext(UserProfileContext);
};
