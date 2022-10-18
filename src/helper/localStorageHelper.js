import { localStorageKey } from "../constraints";

export const localStorageHandler = {
  get: ({ key }) => {
    let previous_LS_state =
      localStorage.getItem(localStorageKey.keyName) || "{}";
    previous_LS_state = JSON.parse(previous_LS_state);
    if (!previous_LS_state[key]) return null;
    return previous_LS_state[key];
  },
  set: ({ key, newVal }) => {
    let previous_LS_state =
      localStorage.getItem(localStorageKey.keyName) || "{}";
    previous_LS_state = JSON.parse(previous_LS_state);
    localStorage.setItem(
      localStorageKey.keyName,
      JSON.stringify({ ...previous_LS_state, [key]: newVal })
    );
  },
};
