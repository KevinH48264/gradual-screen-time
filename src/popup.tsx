import { Box, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { sendMessageInCurrentTab } from "./utils";

interface PopupProps {}

const saveNewTime = (newTime: string) => {
  chrome.storage.local.set({
    bedtime: newTime,
  });
};

const Popup: React.FC<PopupProps> = ({}) => {
  const [savedTime, setSavedTime] = useState("23:00");

  chrome.storage.local.get(["bedtime"], function (result) {
    if (result.bedtime) {
      setSavedTime(result.bedtime as string);
    } else {
      setSavedTime("23:00");
      chrome.storage.local.set({
        bedtime: "23:00",
      });
    }
  });

  return (
    <Box
      className="w-full h-full"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: ".375rem",
        padding: "15px",
      }}
      bg={"#343540"}
    >
      <form>
        <input
          style={{
            padding: "5px",
            width: "150px",
            height: "25px",
            border: "1px solid black",
            borderRadius: ".375rem",
          }}
          type="time"
          id="user-text"
          placeholder="Enter the URL you want to save here"
          value={savedTime}
          onChange={(e) => {
            setSavedTime(e.target.value);
            chrome.storage.local.set({
              bedtime: e.target.value,
            });
          }}
          required
        />
      </form>
      <Button
        onClick={() =>
          saveNewTime(
            (document.querySelector("#user-text") as HTMLInputElement).value
          )
        }
        style={{
          width: "100%",
          height: "35px",
          borderRadius: ".375rem",
          backgroundColor: "#202123",
          fontWeight: "bold",
          color: "white",
          marginTop: "10px",
        }}
      >
        Save wind down time
      </Button>
    </Box>
  );
};

export default Popup;

ReactDOM.render(
  <React.StrictMode>
    <Popup></Popup>
  </React.StrictMode>,
  document.getElementById("root")
);
