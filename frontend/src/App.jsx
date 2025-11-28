import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NoPage from "./pages/NoPage";
import SingleEntry from "./pages/SingleEntry";
import { UserProvider } from './context/UserContext';
import { EntryProvider } from './context/EntryContext';
import { TagProvider } from './context/TagContext';
import Entries from "./pages/Entries";
import AddEntry from './pages/AddEntry';

function App() {
 
  return (
    <BrowserRouter>
      <UserProvider>
        <TagProvider>
        <EntryProvider> 
          <Routes>
            <Route path = "/" element={<Layout />} >
                
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/entries" element={<Entries />} />
                <Route path="/addentry" element={<AddEntry />} />
                <Route path="/entry/:id" element={<SingleEntry />} />   
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </EntryProvider>
        </TagProvider>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
