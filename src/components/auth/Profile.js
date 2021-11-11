import React, { useEffect, useState } from "react"
import { getProfile } from "./ProfileManager.js"



export const Profile = () => {
    const [ profile, changeProfile ] = useState([])

    useEffect(() => {
        getProfile().then(data => changeProfile(data))
    }, [])

    return (
        <article className="profile">
            <header>
                <h1>Your Profile</h1>
            </header>
            <section className="profile__info">
                <header className="profile__header">
                    <h3>Your Info</h3>
                </header>
                <div className="profile__name">
                {/* TODO: show the user's first and last name */}
                    Welcome: {profile?.gamer?.user?.first_name} {profile?.gamer?.user?.last_name}
                </div>
                {/* TODO: show the user's username */}
                <div className="profile__username">Username: {profile?.gamer?.user?.username} </div>
                {/* TODO: show the user's bio */}
                <div className="profile__bio">About you: {profile?.gamer?.user?.bio} </div>
            </section>
            <section className="profile__registrations">
                <header className="registrations__header">
                    <h3>Events you are attending</h3>
                </header>
                <div className="registrations">
                    {/* TODO: Map through the events the user is attending */}
                    
                </div>
            </section>
            <section className="profile__registrations">
                <header className="registrations__header">
                    <h3>Events you are hosting</h3>
                </header>
                <div className="registrations">
                    {/* TODO: Map through the events the user is hosting */}
                </div>
            </section>
        </article>
    )
}
