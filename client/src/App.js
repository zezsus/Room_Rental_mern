import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import "./assets/styles/App.scss";
import UserContextProvider from "./context/userContext";

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <div>
          <Header />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
