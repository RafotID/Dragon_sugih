import { useState, useEffect } from "react";
import { EndMenu } from '../EndMenu';
import { Battle, Battle2, Battle3, Battle4, Battle5 } from "../../Pages/battle";
import { useNavigate, useLocation } from "react-router-dom";
import { Player } from "../../shared";

export const Penghubung = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [mode, setMode] = useState('battle');
    const [winner, setWinner] = useState();
    const [battleStage, setBattleStage] = useState(location.state?.mode || 'battle1'); // Dapatkan stage dari state navigasi
    const [storyStage, setStoryStage] = useState(17); // Tahap cerita, mulai dari story 17

    // Fungsi untuk mendapatkan komponen pertempuran yang sesuai berdasarkan battleStage
    const getCurrentBattleComponent = () => {
        switch (battleStage) {
            case 'battle1': return Battle;
            case 'battle2': return Battle2;
            case 'battle3': return Battle3;
            case 'battle4': return Battle4;
            case 'battle5': return Battle5;
            default: return null;
        }
    };

    const CurrentBattle = getCurrentBattleComponent();

    // Logika navigasi setelah kemenangan pertempuran
    useEffect(() => {
        if (mode === 'nextStory') {
            if (battleStage === 'battle2') {
                setStoryStage(20);
                navigate(`/story/20 `);
            } else if (battleStage === 'battle3') {
                setStoryStage(23);
                navigate(`/story/23 `);
            } else if (battleStage === 'battle4') {
                setStoryStage(26);
                navigate(`/story/26 `)
            } else if (battleStage === 'battle5'){
                setStoryStage(29);
                navigate(`/story/29 `)
            }else if (storyStage <= 30) {
                navigate(`/story/${storyStage} `);
                setStoryStage(prev => prev + 1);
            } else {
                setMode('battle');
                setBattleStage(prev => {
                    if (prev === 'battle1') return 'battle2';
                    if (prev === 'battle2') return 'battle3';
                    if (prev === 'battle3') return 'battle4';
                    if (prev === 'battle4') return 'battle5';
                    return 'battle1';
                });
                navigate('/penghubung/0', { state: { mode: battleStage } });
            }
        }
    }, [mode, storyStage, navigate, battleStage]);

    return (
        <div>
            {mode === 'battle' && CurrentBattle && (
                <CurrentBattle
                    onGameEnd={winner => {
                        setWinner(winner);
                        if (winner === Player) {
                            setMode('nextStory'); // Menang -> pindah ke story
                        } else {
                            setMode('kalah'); // Kalah -> pindah ke mode kalah
                        }
                    }}
                />
            )}

            {mode === 'kalah' && (
                <EndMenu winner={winner} onStartClick={() => {
                    setWinner(undefined);
                    setMode('battle');
                }} />
            )}
        </div>
    );
};
