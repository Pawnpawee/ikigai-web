const StorageKeys = {
  USER_ID: "ikigai_userId",
  PLAYER_NAME: "ikigai_playerName",
  IKIGAI_RESULT: "ikigai_result_data",
};

export const getSessionUser = () => {
  if (typeof window === "undefined") return null; // ป้องกัน Error ตอน SSR
  const id = sessionStorage.getItem(StorageKeys.USER_ID);
  const name = sessionStorage.getItem(StorageKeys.PLAYER_NAME);
  if (!id || !name) {
    return null;
  }
  return {
    id,
    name,
  };
};

export const saveSessionUser = (id: string, name: string) => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(StorageKeys.USER_ID, id);
  sessionStorage.setItem(StorageKeys.PLAYER_NAME, name);
};

export const clearSessionUser = () => {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(StorageKeys.USER_ID);
  sessionStorage.removeItem(StorageKeys.PLAYER_NAME);
};

// บันทึก Result (ต้องแปลงเป็น JSON String)
export const saveSessionResult = (data: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  try {
    const jsonString = JSON.stringify(data);
    sessionStorage.setItem(StorageKeys.IKIGAI_RESULT, jsonString);
  } catch (error) {
    console.error("Error saving result to session:", error);
  }
};

// ดึง Result (ต้องแปลงกลับเป็น Object)
export const getSessionResult = () => {
  if (typeof window === "undefined") return null;
  const jsonString = sessionStorage.getItem(StorageKeys.IKIGAI_RESULT);

  if (!jsonString) return null;

  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error parsing result from session:", error);
    return null;
  }
};

