'use client'

import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export interface UserItem {
  name: string
  count?: number
}

export interface User {
  id: string
  items?: UserItem[]
}

type UserContextValue = {
  user: User | null;
  loadingUser: boolean;
  updateUser: (user: User) => void;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
  
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const userID = Cookies.get("userID");
  
  const updateUser = (user: User) => {
    setUser(user);
  }

  useEffect(() => {
    const fetchOrCreateUser = async () => {
      setLoadingUser(true)
      if (!userID) {
        setUser(null);
        setLoadingUser(false);
        return;
      }
      const response = await axios.get(`/api/items/${userID}`);
      updateUser(response.data.data);
      setLoadingUser(false);
    };

    fetchOrCreateUser();
  }, [userID]);

  return (
    <UserContext.Provider value={{ user, loadingUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserProfile must be used within a UserProvider");
  }
  return context;
};