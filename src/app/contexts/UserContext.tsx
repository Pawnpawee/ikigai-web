"use client";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserContextType {
  userId: string | null;
  playerName: string | null;
  saveUser: (id: string, name: string) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [playerName, setPlayerName] = useState<string | null>(null);

  //? เมื่อโหลดหน้าเว็บครั้งแรก ให้เช็คใน sessionStorage ก่อน
  useEffect(() => {
    const storedId = sessionStorage.getItem("ikigai_userId");
    const storedName = sessionStorage.getItem("ikigai_playerName");
    if (storedId) setUserId(storedId);
    if (storedName) setPlayerName(storedName);
  }, []);

  const saveUser = (id: string, name: string) => {
    setUserId(id);
    setPlayerName(name);
    // บันทึกลง Storage ให้อัตโนมัติ
    sessionStorage.setItem("ikigai_userId", id);
    sessionStorage.setItem("ikigai_playerName", name);
  };

  const clearUser = () => {
    setUserId(null);
    setPlayerName(null);
    sessionStorage.removeItem("ikigai_userId");
    sessionStorage.removeItem("ikigai_playerName");
  };

  return (
    <UserContext.Provider value={{ userId, playerName, saveUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom Hook เพื่อเรียกใช้ง่ายๆ
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
