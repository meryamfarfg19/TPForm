import React from 'react';
import { Routes , Route, BrowserRouter,  HashRouter } from "react-router-dom";
import ContactYup from "./contactYup";
import ContactRef from "./contact";
import Succesform from "./succesform";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    //basename="TPForm"
    <BrowserRouter  basename={ `/${process.env.PUBLIC_URL}`}>
    <div >
        <Routes>
        <Route path="" element={<ContactYup />} />
        <Route path="/contactRef" element={<ContactRef />} />
        <Route path="/succesform" element={<Succesform />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
