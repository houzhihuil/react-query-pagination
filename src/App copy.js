import './App.css'; 
import Create from './components/create';
import FilterableList from './components/FilterableListAvecPagination'
import Read from './components/read'
import Update from './components/update'; 
import { BrowserRouter as Router, Routes,  Route} from 'react-router-dom'

import React, { useState } from 'react'; 
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';

 function App() { 
  return ( 
      <>  
      <Router>
          <div className="main">
            <h2 className="main-header">React Crud Operations</h2>
            <Routes> 
              <Route index element={<FilterableList />} />
              <Route path='/create' element={<Create />} />
              <Route path='/read' element={<Read />} />
              <Route path='/update' element={<Update />} />
              {/* <Route path="/update/:my_id" element={<Update />} />  */} 
            </Routes>
          </div>
      </Router>
      </>
    ) 
}   

export default App;
