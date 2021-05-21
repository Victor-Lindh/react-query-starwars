import React, { useState } from 'react'
import { useQuery } from 'react-query'

const loadMovies = async (page) => {
  const res = await fetch(`https://swapi.dev/api/films?page=${page}`) // eslint-disable-line
  return res.json()
}

const Films = () => {
  const [currentPage, setcurrentPage] = useState(1)
  const { data, status } = useQuery(['Star wars movies', currentPage], () => loadMovies(currentPage))

  return (data && currentPage > 0)
    ? (
      <div>
        {status === 'error' && <div>Error fetching data</div>}
        {status === 'loading' && <div>Data loading</div>}
        {status === 'success' && <h3>Data recieved</h3>}
        <h2>Movies</h2>
        <button disabled={data.previous === null} onClick={() => setcurrentPage(currentPage - 1)}>Previous page</button>
        <button disabled={data.next === null} onClick={() => setcurrentPage(currentPage + 1)}>Next page</button>
        <div className='movies-container'>
          {status === 'success' && data.results && data.results.map((movie, idx) => (
            <ul key={`ul-${idx}`}>
              <li key={movie.created}>
                <h2>{movie.title}</h2>
                <p>Release Date: {movie.release_date}</p>
                <p>Opening Crawl: {movie.opening_crawl}</p>
              </li>
            </ul>
          )
          )}
        </div>
      </div>
      )
    : 'No data.'
}
export default Films
