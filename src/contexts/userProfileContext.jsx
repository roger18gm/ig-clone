import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import { useAuth } from "./AuthContext";

const UserProfileContext = createContext({
  profile: null,
  loading: true,
  error: null,
  refreshProfile: () => {},
});

export const UserProfileProvider = ({ children }) => {
  const { user } = useAuth(); // From AuthContext
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile from the database
  const fetchUserProfile = async () => {
    setLoading(true);
    setError(null);

    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("user_profile")
        .select("*")
        .eq("user_profile_id", user.id) // Match auth user ID with user_profile primary key
        .single();

      if (error) throw error;

      setProfile(data); // Set the profile in state
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Refresh profile on user change or manual trigger

  // If profile already exists in local storage, set that as profile state, else get it from supabase
  useEffect(() => {
    const cachedProfile = localStorage.getItem("user_profile");
    if (cachedProfile) {
      setProfile(JSON.parse(cachedProfile));
      setLoading(false);
    } else {
      fetchUserProfile();
    }
  }, [user]);

  // If the profile data is retrieved from supabase, add it to local storage
  useEffect(() => {
    if (profile) {
      localStorage.setItem("user_profile", JSON.stringify(profile));
    }
  }, [profile]);
  

  const value = {
    profile,
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

export const useUserProfile = () => {
  return useContext(UserProfileContext);
};
