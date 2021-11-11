import React, {Fragment} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './Components/signup/signup'
import Login from './Components/login/login'
import Upload from './Components/Upload/Upload'
import AnnonateImage from './Components/AnnonateImage/AnnonateImage'
import MyAnnoate from './Components/MyAnnonate/Myannonate'
import CheckAnno from './Components/CheckAnno/CheckAnno'

export default function AllRouter() {
  return (
      <>
    <Router>
        <Fragment>
      <Routes>
        <Route exact path="/" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/upload" element={<Upload />} />
        <Route exact path="/annoate" element={<AnnonateImage />} />
        <Route exact path="/myannoate" element={<MyAnnoate />} />
        <Route exact path="/checkannonate" element={<CheckAnno />} />
      </Routes>
      </Fragment>
    </Router>
    </>
  );
}
