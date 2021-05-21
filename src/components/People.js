import React, { useState } from 'react'
import { useQuery } from 'react-query'

const loadPeople = async (page) => {
  const res = await fetch(`https://swapi.dev/api/people/?page=${page}`) // eslint-disable-line
  return res.json()
}

const People = () => {
  const [currentPage, setPage] = useState(1)
  const { data, status } = useQuery(['Star Wars Characters', currentPage], () => loadPeople(currentPage), { refetchOnWindowFocus: false })

  return (data && currentPage > 0)
    ? (
      <div>
        {status === 'success' && <h3>Data recieved!</h3>}
        <h2>People</h2>
        <button disabled={data.previous === null} onClick={() => setPage(currentPage - 1)}>Previous page</button>
        <button disabled={data.next === null} onClick={() => setPage(currentPage + 1)}>Next page</button>

        <div className='people-container'>
          {status === 'success' && data.results && data.results.map((person, idx) => (
            <ul key={`ul-${idx}`}>
              <li key={person.edited}>
                <h2 key={person.name}>{person.name}</h2>
                <p key={person.gender}>Gender: {person.gender}</p>
                <p key={person.idx}>Complexion: {person.skin_color}</p>
                <p key={person.eye_color}>Eye color: {person.eye_color}</p>
                <p key={person.mass}>Mass: {person.mass} kgs</p>
              </li>
            </ul>
          )
          )}
        </div>
      </div>
      )
    : status === 'loading' ? <div>Data loading...</div> : status === 'error' && <div>Error fetching data</div>
}
export default People
