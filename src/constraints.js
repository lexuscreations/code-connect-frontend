export const socketActions = {
  JOIN: "join",
  JOINED: "joined",
  DISCONNECTED: "disconnected",
  CODE_CHANGE: "code-change",
  SYNC_CODE: "sync-code",
  LEAVE: "leave",
};

export const localStorageKey = {
  keyName: "editorConfig",
  theme: "theme",
  language: "language",
  code: "code",
};

export const defaultThemeAndLanguage = {
  theme: "dracula",
  language: "javascript",
};
