import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar.tsx";
import Gallery from "./Components/Gallery.js";

function App() {
  return (
    <div>
       <BrowserRouter>
          <Navbar />
          <Gallery/>
          {/* <Photo />
          <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element= { <Photo/> }/>
            <Route path='/category/:categories'  />
            <Route path='/category/article/:ID/:categories'  />
          </Routes> */}
        </BrowserRouter>
    </div>
  );
}

export default App;
