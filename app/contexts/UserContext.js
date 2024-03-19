// src/contexts/UserContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/initSupabase";

const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUserDetails = async () => {
    const { data: dataUser } = await supabase.auth.getUser();

    if (dataUser.user?.id) {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", dataUser.user?.id)
        .single();

      if (error) {
        console.error("Error fetching user details", error);
        return;
      }

      if (data) {
        setUser(data);
      }
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
