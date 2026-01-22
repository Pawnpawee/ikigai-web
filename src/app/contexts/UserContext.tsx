"use client";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  clearSessionUser,
  getSessionUser,
  saveSessionUser,
} from "@/utils/storage";

interface UserContextType {
  userId: string | null;
  playerName: string | null;
  isLoading: boolean;
  saveUser: (id: string, name: string) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [playerName, setPlayerName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  //? เมื่อโหลดหน้าเว็บครั้งแรก ให้เช็คใน sessionStorage ก่อน
  useEffect(() => {
    const user = getSessionUser();
    if (user) {
      setUserId(user.id);
      setPlayerName(user.name);
    }
    setIsLoading(false);
  }, []);

  const saveUser = (id: string, name: string) => {
    setUserId(id);
    setPlayerName(name);
    saveSessionUser(id, name);
  };

  const clearUser = () => {
    setUserId(null);
    setPlayerName(null);
    clearSessionUser();
  };

  return (
    <UserContext.Provider
      value={{ userId, playerName, isLoading, saveUser, clearUser }}
    >
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
