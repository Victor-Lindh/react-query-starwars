import React, { useState } from 'react'
import { useQuery } from 'react-query'

const loadPlanets = async (page) => {
  const res = await fetch(`https://swapi.dev/api/planets?page=${page}`) // eslint-disable-line
  return res.json()
}

const Planets = () => {
  const [currentPage, setcurrentPage] = useState(1)
  const { data, status } = useQuery(['Star wars planets', currentPage], () => loadPlanets(currentPage))

  return (data && currentPage > 0)
    ? (
      <div>
        {status === 'error' && <div>Error fetching data</div>}
        {status === 'loading' && <div>Data loading</div>}
        {status === 'success' && <h3>Data recieved</h3>}
        <h2>Planets</h2>
        <button disabled={data.previous === null} onClick={() => setcurrentPage(currentPage - 1)}>Previous page</button>
        <button disabled={data.next === null} onClick={() => setcurrentPage(currentPage + 1)}>Next page</button>
        <div className='planets-container'>
          {status === 'success' && data.results && data.results.map((planet, idx) => (
            <ul key={`ul-${idx}`}>
              <li key={planet.name}>
                <h2>{planet.name}</h2>
                <p>Climate: {planet.climate}</p>
                <p>Gravity: {planet.gravity}</p>
                <p>Terrain: {planet.terrain}</p>
                <p>Diameter: {planet.diameter}</p>
                <p>Rotation period: {planet.rotation_period}</p>
              </li>
            </ul>
          )
          )}
        </div>
      </div>
      )
    : 'No data.'
}
export default Planets
