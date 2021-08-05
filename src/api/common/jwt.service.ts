const USER_TOKEN = "USER_TOKEN";

export const getToken = () => {
  return window.localStorage.getItem(USER_TOKEN);
};

export const saveToken = (token) => {
  window.localStorage.setItem(USER_TOKEN, token);
};

export const destroyToken = () => {
  window.localStorage.removeItem(USER_TOKEN);
};

export default { getToken, saveToken, destroyToken };
