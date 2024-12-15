// import { useState } from "react";
import supabase from "../config/supabaseClient";
import useShowToast from "./useShowToast";
import { useNavigate } from "react-router-dom";

const useLoginwithEmailAndPassword = () => {
    const showToast = useShowToast();
    const navigate = useNavigate();

    const login = async(inputs) => {
        // return so that we skip the try for authentication
        if (!inputs.email || !inputs.password) {
            return showToast("Error", "Please fill in all fields", "error");
        }

        try { // Attempt to have user sign in
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email: inputs.email,
                password: inputs.password,
            });

            console.log(authData); // prob delete this

            if (authError) { // invalid credentials then error message
                showToast("Error", authError.message, "error");
                setLoading(false);
                return;
            }
        }
        catch (err) {
            console.error(err);
            showToast("Error", "An unexpected error occurred. Please try again.", "error");
        }
        finally {
            navigate("/"); // direct to homepage
        }
          
    };

    return login;
};

export default useLoginwithEmailAndPassword;