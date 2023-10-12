import { useEffect, useRef, useState } from "react";
import { rtcConnection } from "./Services/WebRTC/WebRTCClient";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { ControlPanel } from "./Components/ControlPanel/ControlPanel";

export const Viewer = () => {
  const { status } = useAppSelector((state) => state.common);
  const answerRef = useRef<HTMLTextAreaElement>(null);
  const setAnswerRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    const answerText = JSON.parse(answerRef?.current?.value ?? "");
    rtcConnection.createAnswer(answerText).then((answer) => {
      console.log("Answer: ", answer);
    });
  };

  const handleSetAnswer = () => {
    rtcConnection.setAsnwer(setAnswerRef?.current?.value ?? "");
  };

  useEffect(() => {
    rtcConnection.createOffer();
    rtcConnection.setConfiguration(dispatch);
  }, []);

  if (status === "connected") {
    return <ControlPanel />;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100vw",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "400px",
          gap: "5px",
        }}
      >
        <div>Answer</div>
        <textarea ref={answerRef} rows={10} />
        <button onClick={handleClick}>Accept</button>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "400px",
          gap: "5px",
        }}
      >
        <div>SetAnswer</div>
        <textarea ref={setAnswerRef} rows={10} />
        <button onClick={handleSetAnswer}>Accept</button>
      </div>
    </div>
  );
};
