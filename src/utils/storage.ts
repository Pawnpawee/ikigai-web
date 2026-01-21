// src/utils/storage.ts

const StorageKeys = {
  USER_ID: "ikigai_userId",
  PLAYER_NAME: "ikigai_playerName",
};

export const getSessionUser = () => {
  if (typeof window === "undefined") return null; // ป้องกัน Error ตอน SSR
  return {
    id: sessionStorage.getItem(StorageKeys.USER_ID),
    name: sessionStorage.getItem(StorageKeys.PLAYER_NAME),
  };
};
