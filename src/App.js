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
import Profile from "./Routes/Profile";
import MyPets from "./Routes/MyPets";
import PetModal from "./Components/PetModal";
import Admin from "./Routes/Admin";
import EditUserPets from "./Components/EditUserPets";
import EditPet from "./Routes/EditPet";
import PetPage from "./Routes/PetPage";
import NewsFeed from "./Components/NewsFeed";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthContexts>
          <PetContext>
            <NavBar />
            <PetModal />
            <LoginModal />
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route
                path="/search"
                element={
                  <PrivateRoute>
                    <Search />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/profile/:uid"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/mypets"
                element={
                  <PrivateRoute>
                    <MyPets />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <Admin />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/:uid"
                element={
                  <PrivateRoute>
                    <EditUserPets />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/admin/edit/:petId"
                element={
                  <PrivateRoute>
                    <EditPet />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/pet/:id"
                element={
                  <PrivateRoute>
                    <PetPage />
                  </PrivateRoute>
                }
              ></Route>
            </Routes>
            <NewsFeed />
          </PetContext>
        </AuthContexts>
      </BrowserRouter>
    </div>
  );
}

export default App;
