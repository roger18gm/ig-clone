import { useState } from "react";
import { useAuthUserProfile } from "../contexts/userProfileContext";
import useShowToast from "./useShowToast";
import { useAuth } from "../contexts/AuthContext";
import supabase from "../config/supabaseClient";
import useUserProfileStore from "../store/userProfileStore";

const useEditProfile = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { authProfile }= useAuthUserProfile();
  const { authUser } = useAuth();
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

  const showToast = useShowToast();

  const editProfile = async(inputs, file) => {
    if (isUpdating || !authUser) return;
    setIsUpdating(true);
    let imageURL = "";
    try {
      // console.log("hello");

      if (file) {
      console.log("hello file");

        const filePath = `profilePics/${authProfile.user_profile_id}`;
        const { data, error: imgUploadErr } = supabase.storage
        .from("ig-imgs")
        .upload(filePath, file, {
          upsert: true, // Overwrites an existing file
        });

        if (imgUploadErr) {
          console.log(imgUploadErr);
          showToast("Error,", imgUploadErr.message, "error");
        }

        imageURL = supabase.storage.from("ig-imgs").getPublicUrl(filePath);
      }
      console.log("hello2");
      console.log("auth user profile", authProfile);

      const updatedUser = {
        ...authProfile, // so that we don't overwrite the other fields
        full_name: inputs.fullName || authProfile.full_name,
        username: inputs.username || authProfile.username,
        bio: inputs.bio || authProfile.bio,
        profile_pic_url: imageURL || authProfile.profile_pic_url

      }
      console.log(updatedUser); // it is not displaying this object.. 

      const { error: updateUserError } = await supabase
      .from("user_profile")
      .update(updatedUser) // not sure if this will work....
      .eq("id", authProfile.user_profile_id);

      localStorage.setItem("user_profile", JSON.stringify(updatedUser));
      setUserProfile(updatedUser);

      if (updateUserError) {
        console.log(updateUserError);
      }
      // console.log("hello");
      showToast("Success", "Profile was updated successfully", "success");
    } catch {
      showToast("Error", error.message, "error"); //error is here
    }

  };

  return {editProfile, isUpdating };

};

export default useEditProfile;
