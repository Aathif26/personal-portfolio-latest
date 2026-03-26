'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  isEditMode: boolean;
  toggleEditMode: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Check for admin session cookie directly or via a ping action
    const checkAdmin = async () => {
      const resp = await fetch('/api/admin/check');
      const data = await resp.json();
      setIsAdmin(data.isAdmin);
    };
    checkAdmin();
  }, []);

  const toggleEditMode = () => setIsEditMode(!isEditMode);

  return (
    <AdminContext.Provider value={{ isAdmin, isEditMode, toggleEditMode }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
