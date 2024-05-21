import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './styles/index.scss';
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";
import Home from "./pages/Home/Home";
import './styles/responsive.scss';
import Login from "./pages/Login/Login";
import {Provider} from 'react-redux';
import {store} from "./app/store";
import Profil from "./pages/Profil/Profil";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/profil" element={<Profil/>}/>
                    {/*<Route path="*" element={<Error/>}/>*/}
                </Routes>
                <Footer/>
            </Router>
        </Provider>
    </React.StrictMode>
);

//responsive OK : 370px
