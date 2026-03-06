import { createContext, useContext, useState } from "react";
import { supabase } from "../supabase-client";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const signIn = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
        } catch (error) {
            console.error("Error signing in:", error);
            throw error;
        }
        if (error) {
            throw error;
        }
        setUser(data.user);
        navigate("/");
    }
    const signUp = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });
        } catch (error) {
            console.error("Error signing up:", error);
            throw error;
        }
        if (error) {
            throw error;
        }
        setUser(data.user);
        navigate("/");
    }
    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
        } catch (error) {
            console.error("Error signing out:", error);
            throw error;
        }
        if (error) {
            throw error;
        }
        setUser(null);
        navigate("/login");
    }
    const value = {
        user,
        loading,
        signIn,
        signUp,
        signOut,
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
