import React from 'react'
import {Header} from "./components/Header";
import {App} from "./App";
import {Footer} from "./components/Footer";
import './styles.css'
import {createRoot} from "react-dom/client";

const root = createRoot(document.getElementById('app'));

root.render(
    <>
        <div>
            <Header/>
            <App/>
        </div>
        <Footer/>
    </>
)