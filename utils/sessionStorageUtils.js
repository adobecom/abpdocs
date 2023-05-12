const getSessionStorage = (key) => {
  const data = window.sessionStorage.getItem(key);
  try {
    // This will return null if the local storage object is empty.
    return JSON.parse(data);
  } catch (e) {
    // Catch in case someone set something weird in our local storage.
    return null;
  }
};

const setSessionStorage = (key, data) => window.sessionStorage.setItem(key, JSON.stringify(data));

export { getSessionStorage, setSessionStorage };
