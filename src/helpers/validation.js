export const isEmpty = (value) => {
  return value.length === 0;
}

export const isDelayed = (date) => {
  const today = new Date();
  return (new Date(date).getDate() < today.getDate() && new Date(date).getMonth() <= today.getMonth() && new Date(date).getFullYear() <= today.getFullYear());
}

export const checkMaxLength = (value, length) => {
  return value.length <= length;
}

export const checkMinLength = (value, length) => {
  return value.length >= length;
}