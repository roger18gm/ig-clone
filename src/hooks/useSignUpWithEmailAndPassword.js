import { useState } from "react";
import supabase from "../config/supabaseClient";
import useShowToast from "./useShowToast";
import { useNavigate } from "react-router-dom";

const useSignUpWithEmailAndPassword = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const showToast = useShowToast();
    const navigate = useNavigate();

    const signup = async (inputs) => {
        setLoading(true);
        setError("");

        if (!inputs.email || !inputs.password|| !inputs.username || !inputs.fullName) {
            // error message w Chakra UI toast
            setLoading(false);
            showToast("Error", "Please fill all the fields", "error");
            return;
        }

        try {
            // Step 1: Check if the email or username already exists
            const { data: existingUsers, error: fetchError } = await supabase
            .from("user_profile")
            .select("user_profile_id")
            .or(`email.eq.${inputs.email},username.eq.${inputs.username}`);

            if (fetchError) {
                throw fetchError;
            }

            if (existingUsers.length > 0) {
                setLoading(false); // Stop loading since the user exists
                showToast("Error", "Email or username already exists", "error");
                return;
            }

            // Step 2: Create user account using Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: inputs.email,
                password: inputs.password
                // options: {
                // data: { full_name: inputs.fullName, username: inputs.username },},
            });

            if (authError) {
                showToast("Error", authError.message, "error");
                setLoading(false);
                return;
            }
            
            // Step 3: Insert additional user data into the `user_profile` table
            const { error: insertError } = await supabase.from("user_profile").insert({
                user_profile_id: authData.user.id, // Use the ID from the auth record
                created_at: new Date().toISOString(),
                full_name: inputs.fullName,
                username: inputs.username,
                email: inputs.email,
                bio: "",
                profile_pic_url: "",
                followers: [],
                following: [],
                posts: [],
            });

            if (insertError) {
                throw insertError;
            }

            // Success: Show a toast and optionally redirect the user
            showToast("Success","Account created successfully! Please check your email for verification.","success");
           
        } catch (err) {
            console.error(err);
            showToast("Error", "An unexpected error occurred. Please try again.", "error");
            setError(err.message || "Unknown error");
        } finally {
            setLoading(false);
            navigate("/"); // should work
        }
    }
    
    return {loading, error, signup};
};

export default useSignUpWithEmailAndPassword;
