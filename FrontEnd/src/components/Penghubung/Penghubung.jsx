import { useState } from "react"
import { EndMenu } from '../EndMenu';
import Battle from "../../Pages/battle";
import { useNavigate } from "react-router-dom";
import { playerStats } from "../../shared";


export const Penghubung = () => {
    const navigate = useNavigate()
    const [mode, setMode] = useState('battle')
    const [winner, setWinner] = useState()


    return <div >

{mode === 'battle' && <Battle 
    onGameEnd={winner => {
        setWinner(winner);
        if (winner === playerStats) {
            setMode('menang'); // Arahkan ke 'next' jika menang
        } else {
            setMode('kalah'); // Arahkan ke 'lose' jika kalah
        }
    }}
/>}

    {mode === 'menang' && navigate('/story/17') }
    
    {mode === 'kalah' && <EndMenu winner={winner} onStartClick={() => {
        setMode('battle')
    }}/>}

    </div>
}