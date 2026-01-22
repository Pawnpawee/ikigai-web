//? รวม Logic การดึง Env ไว้ที่นี่ที่เดียว

const resolveApiBaseUrl = (): string => {
  const { NEXT_PUBLIC_API_BASE_URL, NODE_ENV } = process.env;
  if (NEXT_PUBLIC_API_BASE_URL) {
    return NEXT_PUBLIC_API_BASE_URL;
  }
  if (NODE_ENV === "production") {
    throw new Error(
      "NEXT_PUBLIC_API_BASE_URL is not set in production environment.",
    );
  }
  //? อนุญาตให้ใช้ localhost เฉพาะใน development / test
  return "http://localhost:5112";
};
export const API_BASE_URL = resolveApiBaseUrl();
