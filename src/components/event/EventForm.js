import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getGames } from "../game/GameManager"
import { createEvent, getEventById, updateEvent } from "./EventManager"


export const EventForm = () => {
    const history = useHistory()
    const [ games, setGames ] = useState([])
    const { eventId } = useParams()
  
    const [currentEvent, setEvent] = useState({})

    useEffect(() => {
        if (eventId) {
            getEventById(eventId)
             .then(data => setEvent({
                 ...data,
                 gameId: data.id,
                 description: data.description,
                 date: data.date,
                 time: data.time,
             }))
        }

    }, [eventId])

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
                    <label htmlFor="eventId">Game: </label>
                    <select name="eventId" className="form-control"
                        value={ currentEvent.eventId }
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
                        gameId: parseInt(currentEvent.eventId),
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        id: eventId
                        
                    }

                    // Send POST request to your API
                    if (eventId) {
                        updateEvent(event)
                        .then(() => history.push("/events"))
                    } else {
                        createEvent(event)
                        .then(() => history.push("/events"))
                    }

                    // TODO: Call the createEvent function and pass it the event object


                    // TODO: Once event is created, redirect user to event list
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}
