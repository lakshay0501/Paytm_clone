import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Perform sign out logic
        const signOut = async () => {
            try {
                // Make a request to the backend to invalidate the token
                await axios.post("http://localhost:3900/api/v1/user/signout", {}, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });

                // Clear the token from local storage
                localStorage.removeItem("token");

                // Redirect the user to the sign-in page
                navigate("/signin");
            } catch (error) {
                console.error("Error occurred during sign out:", error);
                // Optionally handle signout error
            }
        };

        // Call the signOut function
        signOut();
    }, [navigate]);

    return null; // This component doesn't render anything visible
};
