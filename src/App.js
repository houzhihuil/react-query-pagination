import './App.css'; 
import Create from './components/create';
import Index from './components/index'
import Read from './components/read'
import Update from './components/update'; 
import { BrowserRouter as Router, Routes,  Route} from 'react-router-dom' 
import React from 'react';  
 

 function App() {  
  return ( 
      <>   
        <Router>
          <div className="main">
            <h2 className="main-header">React Crud Operations</h2>
            <Routes> 
              <Route index element={<Index />} />
              <Route path='/create' element={<Create />} />
              <Route path='/read' element={<Read />} />
              {/* <Route path='/update' element={<Update />} /> */}
              <Route path="/update/:my_id" element={<Update />} />   
            </Routes>
          </div>
      </Router>
      </>
    ) 
}   

export default App;
