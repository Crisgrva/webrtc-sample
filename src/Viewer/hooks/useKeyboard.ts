import { useEffect } from "react";
import { WebRTCClient } from "../Services/WebRTC/WebRTCClient";

export const useKeyboard = (rtcConnection: WebRTCClient) => {
  const handlePasteClipboard = async (e: KeyboardEvent) => {
    let ctrl: boolean = false;

    if (e.ctrlKey) {
      ctrl = true;
    }

    if (e.code === "KeyV" && ctrl) {
      const clipboard = await navigator.clipboard.readText();
      const action = {
        type: "Clipboard",
        body: clipboard,
      };

      rtcConnection.send(JSON.stringify(action));
    }
  };

  const handleKeyboardDown = async (e: KeyboardEvent) => {
    e.preventDefault();
    await handlePasteClipboard(e);

    const action = {
      type: "onKeyboardDown",
      key: e.key,
    };
    rtcConnection.send(JSON.stringify(action));
  };

  const handleKeyboardUp = (e: KeyboardEvent) => {
    e.preventDefault();
    const action = {
      type: "onKeyboardUp",
      key: e.key,
    };
    rtcConnection.send(JSON.stringify(action));

    console.log(e);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyboardDown);
    window.addEventListener("keyup", handleKeyboardUp);

    return () => {
      window.removeEventListener("keydown", handleKeyboardDown);
      window.removeEventListener("keyup", handleKeyboardUp);
    };
  });

  return { handleKeyboardDown, handleKeyboardUp };
};
