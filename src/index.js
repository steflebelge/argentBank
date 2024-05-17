import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './styles/index.scss';
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";
import Home from "./pages/Home/Home";
import './styles/responsive.scss';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <Router>
          <Header/>
          <Routes>
              <Route path="/" element={<Home/>}/>
              {/*<Route path="/" element={<Login/>}/>*/}
              {/*<Route path="/" element={<Dashboard/>}/>*/}
              {/*<Route path="*" element={<Error/>}/>*/}
          </Routes>
          <Footer/>
      </Router>
  </React.StrictMode>
);

//responsive OK : 370px
