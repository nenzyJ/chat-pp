import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import PageLoader from "./components/PageLoader";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";
const App = () => {
  const {checkAuth,  isCheckingAuth, authUser} = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  // console.log({authUser})

  if(isCheckingAuth) return <PageLoader />

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">

      {/* DECORATES */}

      <Routes>
        <Route path="/" element={authUser ?  <ChatPage/> : <Navigate to={"/login"} />}></Route>
        <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to={"/"}/>}></Route>
        <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to={"/"}/>}></Route>
      </Routes>

      <Toaster/>
    </div>
  );
};

export default App;
