import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import supabase from "../config/supabaseClient";

const useGetUserProfileByUsername = ( username ) => {
  const [isLoading, setIsLoading] = useState(true);
  const showToast = useShowToast();
  const {userProfile, setUserProfile} = useUserProfileStore();

  useEffect(() => {
    const getUserProfile = async() => {
        setIsLoading(true); 
        try {
            const { data, error } = await supabase
            .from("user_profile")
            .select("*")
            .eq("username", username) // Match url param username with user_profile username 
            .single();

            if (error) return setUserProfile(null);
            setUserProfile(data);
            console.log(data);
        }
        catch (error) {
            showToast('Error', error.message, 'error')
        } finally {
            setIsLoading(false);
        }
    };

    getUserProfile();

  }, [setUserProfile, username, showToast]);

  return {isLoading, userProfile}
  
};

export default useGetUserProfileByUsername;
