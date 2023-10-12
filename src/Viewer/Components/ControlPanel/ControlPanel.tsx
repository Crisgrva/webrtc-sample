import { rtcConnection } from "../../Services/WebRTC/WebRTCClient";
import { useKeyboard } from "../../hooks/useKeyboard";
import { useMouse } from "../../hooks/useMouse";

export const ControlPanel = () => {
  const { handleMouseMoveEvent, handleMouseDown, handleMouseUp } =
    useMouse(rtcConnection);

  useKeyboard(rtcConnection);

  return (
    <>
      <div
        style={{
          width: "500px",
          height: "500px",
          backgroundColor: "gray",
          boxSizing: "border-box",
        }}
        onMouseMove={handleMouseMoveEvent}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onContextMenu={(e) => e.preventDefault()}
        onKeyDown={(e) => e.preventDefault()}
        onKeyUp={(e) => e.preventDefault()}
      ></div>
    </>
  );
};
