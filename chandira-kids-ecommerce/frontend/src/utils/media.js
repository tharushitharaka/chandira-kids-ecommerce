const apiUrl = import.meta.env.VITE_API_URL || '/api';
const backendUrl = apiUrl.replace(/\/api\/?$/, '');

export const mediaUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('/images')) return url;
  if (url.startsWith('/uploads')) return `${backendUrl}${url}`;
  return url;
};
