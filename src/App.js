import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./pages/login/";
import { toastOptions } from "./config";
import EditorPage from "./pages/editorPage/";
import NotFound404 from "./pages/NotFound404/";

const App = () => {
  return (
    <>
      <Toaster position="top-right" toastOptions={toastOptions} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/editor/:roomId" element={<EditorPage />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
