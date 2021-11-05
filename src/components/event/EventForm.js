import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { getGames } from "../game/GameManager"
import { createEvent } from "./EventManager"


export const EventForm = () => {
    const history = useHistory()
    const [ games, setGames ] = useState([])

    const [currentEvent, setEvent] = useState({})

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    const changeEventState = (domEvent) => {
        const newEventState = { ...currentEvent }
        newEventState[domEvent.target.name] = domEvent.target.value
        setEvent(newEventState)
        // TODO: Complete the onChange function
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={ currentEvent.gameId }
                        onChange={ changeEventState }>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option value={game.id}>{game.title}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Date: </label>
                    <input type="date" name="date" required className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Time: </label>
                    <input type="time" name="time" required className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const event = {
                        game: parseInt(currentEvent.gameId),
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => history.push("/events"))

                    // TODO: Call the createEvent function and pass it the event object


                    // TODO: Once event is created, redirect user to event list
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}
