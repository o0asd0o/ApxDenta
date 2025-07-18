export const GET_DETAULT_DATES = () => {
  const today = new Date();
  return {
    updatedAt: today.toISOString(),
    createdAt: today.toISOString(),
  };
};

export const GET_DETAULT_CREATED_AT = () => {
  const today = new Date();
  return today.toISOString();
};

export const GET_DETAULT_UPDATED_AT = () => {
  const today = new Date();
  return today.toISOString();
};
