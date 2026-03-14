const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export const getImgPath = (path: string) => {
  return `https://res.cloudinary.com/${cloudName}/image/upload/q_auto,f_auto/v1/assets/${path}`;
};

export const getJsonUrl = (path: string) => {
  return `https://res.cloudinary.com/${cloudName}/raw/upload/v1/assets/${path}`;
};

export const getAudioUrl = (path: string) => {
  return `https://res.cloudinary.com/${cloudName}/video/upload/q_auto,f_auto/v1/assets/${path}`;
};

export const getVideoUrl = (path: string) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  return `https://res.cloudinary.com/${cloudName}/video/upload/q_auto,f_auto/v1/assets/${path}`;
};
