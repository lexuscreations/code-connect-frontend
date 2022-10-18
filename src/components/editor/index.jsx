import React, { useEffect } from "react";
import { Controlled as ControlledEditorComponent } from "react-codemirror2";

import "./imports";
import { localStorageHandler } from "../../helper/";
import { socketActions, localStorageKey } from "../../constraints";

const Editor = ({ socketRef, roomId, theme, language, setCode, code }) => {
  function handleChange(editor, data, value) {
    localStorageHandler.set({ key: localStorageKey.code, newVal: value });
    socketRef.current.emit(socketActions.CODE_CHANGE, {
      roomId,
      code: value,
    });
    setCode(value);
  }

  useEffect(() => {
    if (!socketRef.current) return;
    socketRef.current.on(
      socketActions.CODE_CHANGE,
      ({ code }) => code && setCode(code)
    );

    return () => socketRef.current.off(socketActions.CODE_CHANGE);
  }, [socketRef.current]);

  return (
    <ControlledEditorComponent
      onBeforeChange={handleChange}
      value={code}
      className="code-mirror-wrapper"
      options={{
        lineWrapping: true,
        lint: true,
        mode: language,
        lineNumbers: true,
        theme: theme,
        autoCloseTags: true,
        autoCloseBrackets: true,
      }}
    />
  );
};

export default Editor;
