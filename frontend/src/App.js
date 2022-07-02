import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PageRoutes from './Routes';

const App = () => {

  return (
      <BrowserRouter>
      <Routes>        
          <Route path="*" element={
              <PageRoutes/>
          }/>
      </Routes>
      </BrowserRouter>
  )
}


export default App;
