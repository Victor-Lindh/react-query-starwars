import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import './App.css';
import Navbar from './components/Navbar'
import Planets from './components/Planets'
import People from './components/People'
import { ReactQueryDevtools } from 'react-query/devtools'

function App() {
  const [page, setPage] = useState('planets')
  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Navbar setPage={setPage} />
          <h1>Star Wars Info</h1>
          <div className='content'>
            {page === 'planets' ? <Planets /> : <People />}
          </div>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
