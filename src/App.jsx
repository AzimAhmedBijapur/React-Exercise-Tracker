import { useState } from 'react'
import './App.css'
import Navbar from './Navbar';
import Exercise from './Exercise';
import ExerciseDetails from './ExerciseDetails';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Create from './Create';

function App() {

  return (
    <>
    <BrowserRouter>
      <div className='App'>
        <div className="header flex justify-center">
          <Navbar/>
        </div>
        <div className="content flex justify-center mt-4">
        
            <Routes>
            <Route exact path="/" element={<Exercise />} />
            <Route exact path="/exercise/:id" element={<ExerciseDetails />} />
            <Route exact path="/add" element={<Create/>} />
            </Routes>
        </div>
      </div>
      </BrowserRouter>
    </>
  )
}

export default App
