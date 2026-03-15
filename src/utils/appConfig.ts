const getApiBaseUrl = (): string => {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const nodeEnv = process.env.NODE_ENV;

  if (apiUrl) {
    return apiUrl;
  }

  if (nodeEnv === "production") {
    throw new Error(
      "NEXT_PUBLIC_API_BASE_URL is not set in production environment.",
    );
  }

  return "http://localhost:5112";
};

export const API_BASE_URL = getApiBaseUrl();

const getFeedbackFormUrl = (): string => {
  return process.env.NEXT_PUBLIC_FEEDBACK_FORM_URL || "#";
};

export const FEEDBACK_FORM_URL = getFeedbackFormUrl();
