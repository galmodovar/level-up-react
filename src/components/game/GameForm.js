import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { createGame, getGameTypes, updateGame, getGameById } from './GameManager.js'


export const GameForm = () => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])
    const [currentGame, setCurrentGame] = useState({})
    const {gameId} = useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
   useEffect(() => {
       if (gameId) {
           getGameById(gameId)
            .then(data => setCurrentGame({
                ...data,
                skillLevel: data.skill_level,
                numberOfPlayers: data.num_of_players,
                gameTypeId: data.game_type.id
            }))
       } else {
           setCurrentGame({
               skillLevel: 1,
               numberOfPlayers: 0,
               title: "",
               maker: "",
               gameTypeId: 0
           })
       }
   }, [gameId])
   

    useEffect(() => {
        getGameTypes().then(data => setGameTypes(data))
    }, [])

    /*
        REFACTOR CHALLENGE START

        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?

        One hint: [event.target.name]
    */
    const changeGameState = (event) => {
        const newGameState = { ...currentGame }
        newGameState[event.target.name] = event.target.value
        setCurrentGame(newGameState)
    }

    /* REFACTOR CHALLENGE END */

    return (
        
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Players: </label>
                    <input type="number" name="numberOfPlayers" required className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Maker: </label>
                    <input type="text" name="maker" required className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Skill Level </label>
                    <input type="number" name="skillLevel" required className="form-control"
                        value={currentGame.skillLevel}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameType"> Game Type </label>
                    <select name="gameTypeId" onChange={changeGameState}>
                        {gameTypes?.map((type) => {
                            return <option value={type.id}>{type.label}</option>
                        })}
                    </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                        skillLevel: parseInt(currentGame.skillLevel),
                        gameTypeId: parseInt(currentGame.gameTypeId),
                        id: gameId
                    }

                    // Send POST request to your API
                    if (gameId) {
                        updateGame(game)
                        .then(()=> history.push("/games"))
                    } else {
                        createGame(game)
                        .then(() => history.push("/games"))
                    }
                }}
                className="btn btn-2 btn-sep icon-create">Save</button>
        </form>
    )
}
