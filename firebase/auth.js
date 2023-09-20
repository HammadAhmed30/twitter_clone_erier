"use client"

import  { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [allUsers, setAllUsers] = useState(null);

  const updateUser = (newUser) => {
    setUser(newUser);
  };
  const updatePosts = (newPosts) => {
    setPosts(newPosts);
  };
  const updateAllUsers = (users) => {
    setAllUsers(users);
  };

  const contextValue = {
    user,
    posts,
    allUsers,
    updateUser,
    updatePosts,
    updateAllUsers,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}
