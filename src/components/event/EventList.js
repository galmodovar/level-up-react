import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { getEvents } from "./EventManager.js"


export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const history = useHistory()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
             <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/events/new" })
                    }}>Register New Event
            </button>
            {
                events?.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__title">{event.game.title} by {event.organizer.user.first_name}</div>
                        <div className="event__players">{event.description} </div>
                        <div className="event__skillLevel">On {event.date} {event.time}</div>
                    </section>
                })
            }
        </article>
    )
}