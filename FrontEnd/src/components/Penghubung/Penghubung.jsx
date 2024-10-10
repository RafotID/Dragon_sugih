import { useState } from "react"
import { EndMenu } from '../EndMenu';
import Battle from "../../Pages/battle";


export const Penghubung = () => {
    const [mode, setMode] = useState('battle')
    const [winner, setWinner] = useState()


    return <div >

    {mode === 'battle' && <Battle 
        onGameEnd={winner => {
            setWinner(winner)
            setMode('gameOver')
        }}/>}
    
    {mode === 'gameOver' && <EndMenu winner={winner} onStartClick={() => {
        setWinner(undefined)
        setMode('battle')
    }}/>}

    </div>
}