const storage: Record<string, any> = {};

const setItem = <T>(key: string, value: T) => {
  storage[key] = value;
};

const getItem = (key: string) => {
  return storage[key];
};

const removeItem = (key: string) => {
  delete storage[key];
};

const objectStorage = { setItem, getItem, removeItem };

export default objectStorage;
