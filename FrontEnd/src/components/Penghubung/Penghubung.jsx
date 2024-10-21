import { useState } from "react"
import { EndMenu } from '../EndMenu';
import {Battle, Battle2, Battle3, Battle4, Battle5} from "../../Pages/battle";
import { useNavigate } from "react-router-dom";
import { Player } from "../../shared";


export const Penghubung = () => {
    const navigate = useNavigate()
    const [mode, setMode] = useState('battle')
    const [winner, setWinner] = useState()
    // const [lose, setLose] = useState()


    return <div >

{mode === 'battle' && <Battle 
    onGameEnd={winner => {
        setWinner(winner);
        if (winner === Player) {
            setMode('battle2'); // Arahkan ke 'next' jika menang
        } else {
            setMode('kalah'); // Arahkan ke 'lose' jika kalah
        }
    }}
/>}

    {/* {mode === 'menang' && navigate('/story/17') } */}

    {mode === 'battle2' && <Battle2 
    onGameEnd={winner => {
        setWinner(winner);
        if (winner === Player) {
            setMode('battle3'); // Arahkan ke 'next' jika menang
        } else {
            setMode('kalah2'); // Arahkan ke 'lose' jika kalah
        }
    }}
/>}

    {mode === 'battle3' && <Battle3 
    onGameEnd={winner => {
        setWinner(winner);
        if (winner === Player) {
            setMode('battle4'); // Arahkan ke 'next' jika menang
        } else {
            setMode('kalah3'); // Arahkan ke 'lose' jika kalah
        }
    }}
/>}
    {mode === 'battle4' && <Battle4 
    onGameEnd={winner => {
        setWinner(winner);
        if (winner === Player) {
            setMode('battle5'); // Arahkan ke 'next' jika menang
        } else {
            setMode('kalah4'); // Arahkan ke 'lose' jika kalah
        }
    }}
/>}
    {mode === 'battle5' && <Battle5 
    onGameEnd={winner => {
        setWinner(winner);
        if (winner === Player) {
            setMode(''); // Arahkan ke 'next' jika menang
        } else {
            setMode('kalah5'); // Arahkan ke 'lose' jika kalah
        }
    }}
/>}
    
    {mode === 'kalah' && <EndMenu winner={winner} onStartClick={() => {
        setWinner(undefined)
        setMode('battle')
    }}/>}
    
    {mode === 'kalah2' && <EndMenu winner={winner} onStartClick={() => {
        setWinner(undefined)
        setMode('battle2')
    }}/>}

    {mode === 'kalah3' && <EndMenu winner={winner} onStartClick={() => {
        setWinner(undefined)
        setMode('battle3')
    }}/>}

    {mode === 'kalah4' && <EndMenu winner={winner} onStartClick={() => {
        setWinner(undefined)
        setMode('battle4')
    }}/>}

    {mode === 'kalah5' && <EndMenu winner={winner} onStartClick={() => {
        setWinner(undefined)
        setMode('battle5')
    }}/>}

    </div>
}