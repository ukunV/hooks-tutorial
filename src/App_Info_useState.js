import React, { useState } from "react";
import Info_useState from "./Info_useState";

const App_Info_useState = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <button
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {visible ? "숨기기" : "보이기"}
      </button>
      <hr />
      {visible && <Info_useState />}
    </div>
  );
};

export default App_Info_useState;
