import logo from "./logo.svg";
import "./App.css";
// import './assets/css/fonts.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContexts from "./Contexts/authContexts";
import LoginModal from "./Components/LoginModal";
import PrivateRoute from "./Routes/PrivateRoute";
import Search from "./Components/Search";
import HomePage from "./Routes/HomePage";
import PetContext from "./Contexts/petContext";
import ProfileSetings from "./Routes/ProfileSetings";
import MyPets from "./Routes/MyPets";
import PetModal from "./Components/PetModal";


function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthContexts>
          <PetContext>
          <NavBar />
          <PetModal></PetModal>
          <LoginModal />
          <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/search" element={<PrivateRoute><Search/></PrivateRoute>}></Route>
            <Route path="/profile/:uid" element={ <PrivateRoute><ProfileSetings/></PrivateRoute>}>
              </Route>
            <Route path="/mypets" element={<PrivateRoute><MyPets/></PrivateRoute>}></Route>
            <Route path="/admin"></Route>
          </Routes>
          </PetContext>
        </AuthContexts>
      </BrowserRouter>
    </div>
  );
}

export default App;
