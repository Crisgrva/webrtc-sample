import { MouseEvent } from "react";
import { WebRTCClient } from "../Services/WebRTC/WebRTCClient";

export const useMouse = (rtcConnection: WebRTCClient) => {
  const handleMouseMoveEvent = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    const action = {
      type: "onMouseMove",
      position: { x: e.clientX, y: e.clientY },
    };

    rtcConnection.send(JSON.stringify(action));
  };

  const handleMouseDown = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    const action = {
      event: "onMouseDown",
      button: e.button,
    };

    rtcConnection.send(JSON.stringify(action));
  };

  const handleMouseUp = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    const action = {
      event: "onMouseUp",
      button: e.button,
    };

    rtcConnection.send(JSON.stringify(action));
  };

  return { handleMouseMoveEvent, handleMouseDown, handleMouseUp };
};
