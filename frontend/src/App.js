import logo from "./logo.svg";
import "./App.css";
import { Button } from "@chakra-ui/react";
import { Route, Routes, useNavigation } from "react-router-dom";
import { ChatPage, HomePage } from "./Pages/index";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chats" element={<ChatPage/>} />
      </Routes>
    </div>
  );
}

export default App;
