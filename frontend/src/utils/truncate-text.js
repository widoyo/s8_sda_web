export const truncateText = (text, max) => {
  return text.length > max ? text.substring(0, max) + "..." : text;
};
