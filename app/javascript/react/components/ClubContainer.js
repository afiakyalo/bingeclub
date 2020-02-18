import React, { useEffect, useState } from "react"

import MemberTile from "./MemberTile"
import MovieTile from "./MovieTile"
import DiscussionBoard from "./DiscussionBoard"
import ClubStats from "./ClubStats"

const ClubContainer = (props) => {
  const[ club, setClub ] = useState({})
  const[ members, setMembers ] = useState([])
  const[ movie, setMovie ] = useState({})
  const[ searchedMovies, setSearchedMovies ] = useState([])

  let clubId = props.match.params.id

  useEffect(() => {
    window.scrollTo(0, 0)
    fetch(`/api/v1/clubs/${clubId}`)
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage)
        throw error
      }
    })
    .then(response => response.json())
    .then(clubData => {
      setClub(clubData)
      setMembers(clubData.users)
      setMovie(clubData.movie)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  },[])

  const searchMovie = (formPayload) => {
    debugger
    fetch(`/api/v1/movies/search`, {
      method: 'POST',
      body: JSON.stringify(formPayload),
      credentials: 'same-origin',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(body => {
      debugger
      setSearchedMovies([body])
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }


  const memberTiles = members.map((member) => {
    return(
      <MemberTile
        key={member.id}
        id={member.id}
        username={member.username}
        city={member.city}
        state={member.state}
        description={member.description}
      />
    )
  })

  return(
    <div>
      <h3>{club.name}</h3>
      <div className="grid-x">
        <div className="cell large-8 callout">
          <h5>Movie</h5>
          <MovieTile
            movie={movie}
            searchMovie={searchMovie}
            />
        </div>

        <div className="cell large-3 board callout">
          <ClubStats />
        </div>

        <div className="cell large-8 board callout">
          <DiscussionBoard />
        </div>

        <div className="cell large-3 members callout">
          <h5>Members</h5>
          {memberTiles}
        </div>
      </div>
    </div>
  )
}

export default ClubContainer;