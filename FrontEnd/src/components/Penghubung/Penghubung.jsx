import { useState, useEffect } from "react";
import { EndMenu } from '../EndMenu';
import { Battle, Battle2, Battle3, Battle4, Battle5 } from "../../Pages/battle";
import { useNavigate, useLocation } from "react-router-dom";
import { Player } from "../../shared";

export const Penghubung = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Ambil battleStage dari localStorage atau state navigasi
    const [battleStage, setBattleStage] = useState(() => {
        return localStorage.getItem('battleStage') || location.state?.mode || 'battle1';
    });

    const [mode, setMode] = useState('battle');
    const [winner, setWinner] = useState();
    const [storyStage, setStoryStage] = useState(17);

    useEffect(() => {
        console.log('Location state:', location.state); // Debug state
        if (location.state?.mode) {
            setBattleStage(location.state.mode); // Update battleStage dari state navigasi
        }
    }, [location.state]);

    useEffect(() => {
        localStorage.setItem('battleStage', battleStage);
    }, [battleStage]);

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

    useEffect(() => {
        if (mode === 'nextStory') {
            if (battleStage === 'battle2') {
                setStoryStage(20);
                navigate(`/story/20`);
            } else if (battleStage === 'battle3') {
                setStoryStage(23);
                navigate(`/story/23`);
            } else if (battleStage === 'battle4') {
                setStoryStage(26);
                navigate(`/story/26`);
            } else if (battleStage === 'battle5') {
                setStoryStage(29);
                navigate(`/story/29`);
            } else if (storyStage <= 30) {
                navigate(`/story/${storyStage}`);
                setStoryStage((prev) => prev + 1);
            } else {
                setMode('battle');
                setBattleStage((prev) => {
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
                    onGameEnd={(winner) => {
                        setWinner(winner);
                        if (winner === Player) {
                            setMode('nextStory');
                        } else {
                            setMode('kalah');
                        }
                    }}
                />
            )}

            {mode === 'kalah' && (
                <EndMenu
                    winner={winner}
                    onStartClick={() => {
                        setWinner(undefined);
                        setMode('battle');
                    }}
                />
            )}
        </div>
    );
};
