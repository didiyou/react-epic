import './App.css';
import React,{Suspense,lazy} from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Loading from './components/Loading'
import {
  Routes,
  Route
}from 'react-router-dom'
const Home = lazy(()=> import('./pages/Home'))
const History = lazy(()=> import('./pages/History'))
const About = lazy(()=> import('./pages/About'))
const Login = lazy(()=> import('./pages/Login'))
const Register = lazy(()=> import('./pages/Register'))

function App() {
  return (
    <>
    <Header/> 
    <main>
    <Suspense fallback={<Loading/>}> 
    <Routes> 
      <Route path="/" exact element={<Home/>} />
      <Route path="/history" element={<History/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      
    </Routes>
    </Suspense>
    </main>
    <Footer/>
    </>
  );
}

export default App;
