import "./styles.css";
import React, { useState, useEffect, useRef } from "react";
const tt = 12;
export default function App() {
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [start, setStart] = useState(false);
  const refId = useRef(false);

  useEffect(() => {
    if (start) {
      refId.current = setTimeout(() => {
        if (sec + 1 === tt) {
          setSec(0);

          if (min + 1 === tt) {
            setMin(0);
            setHour((hourt) => hourt + 1);
          } else {
            setMin((mint) => mint + 1);
          }
        } else {
          setSec((sect) => sect + 1);
        }
      }, 1000);
    } else {
      clearTimeout(refId.current);
      refId.current = false;
    }
  }, [sec, start]);
  const resetHandler = () => {
    clearTimeout(refId.current);
    refId.current = false;

    setStart(false);
    setHour(0);
    setMin(0);
    setSec(0);
  };

  return (
    <div className="App">
      <div className="display-time">{`${hour <= 9 ? `0${hour}` : hour}:${
        min <= 9 ? `0${min}` : min
      }:${sec <= 9 ? `0${sec}` : sec}`}</div>
      <div className="control">
        <button
          style={{
            color: "yellowgreen",
            filter: "drop-shadow(0 0 0.75rem yellowgreen)"
          }}
          onClick={resetHandler}
        >
          Reset
        </button>
        <button
          style={{
            color: start ? "rebeccapurple" : "salmon",
            filter: start
              ? "drop-shadow(0 0 0.75rem rebeccapurple)"
              : "drop-shadow(0 0 0.75rem salmon)"
          }}
          onClick={() => setStart(!start)}
        >
          {start ? "Pause" : "Start"}
        </button>
      </div>
    </div>
  );
}
