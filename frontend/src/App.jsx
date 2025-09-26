import React from "react";
import { Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { useAuthStore } from "./store/useAuthStore";

const App = () => {

  const {authUser, login, isLoggedIn} = useAuthStore();

  console.log("authUser:", authUser);
  console.log("isLoggedIn:", isLoggedIn);
  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">

      {/* DECORATES */}

    <button onClick={login} className="btn btn-primary ">Login</button>

      <Routes>
        <Route path="/" element={<ChatPage  />}></Route>
        <Route path="/login" element={<LoginPage  />}></Route>
        <Route path="/signup" element={<SignUpPage  />}></Route>
      </Routes>
    </div>
  );
};

export default App;
