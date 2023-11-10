import { useState, useEffect } from 'react';
import { generate } from "random-words";
import { Link, Head } from '@inertiajs/react';
import Image from '@/Components/Image';
import { useGameStore } from '@/GameState';


export default function SingleGame() {
    const [image, setImage] = useState([]);
    const [guess, setGuess] = useState('');
    const [result, setResult] = useState('');
    const [wrongGuess, setWrongGuess] = useState(0)
    const [correctGuess, setCorrectGuess] = useState(0) // New state variable for correct guesses
    const updateLoading = useGameStore((state) => state.switch_loading);
    const updateImageSrc = useGameStore((state) => state.switch_image);

    useEffect(() => {
        graphicArt().then((listWords) => {
            setImage(listWords);
        });
    }, []);

    async function graphicArt() {
        updateLoading(true)
        const listWords = generate(5)
        console.log(listWords.join(' '));
    
        const result = await window.axios.post('/solo-game', {
            input: listWords.join(' '),
        })
        console.log(result) 
        
        updateImageSrc(result.data)
        updateLoading(false)
        return listWords
    }

    const checkGuess = () => {
        const words = image;
        const word = guess.toLowerCase()

        if (words.includes(word)) {
            setResult("You got it right! 🎉");
            setCorrectGuess(correctGuess => correctGuess + 1); // Increment correct guesses
            setGuess('');
            setTimeout(() => {
                graphicArt().then((result) => {
                    setImage(result)
                })
                setResult('');
            }, 3000);
        } else {
            setResult("Sorry, that's not correct. 😞");
            setWrongGuess(wrongGuess => wrongGuess + 1) // Increment wrong guesses
            setTimeout(() => {
                setResult('');
            }, 3000);
        }
    };

    async function checkHighScore() {
        await window.axios.post('/save-database', {
            input: correctGuess + wrongGuess,
        })
        
    }

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f0f0', width: '100vw', height: '100vh' }}>
            <h1 style={{ textAlign: 'center', color: '#333333', fontSize: '2em' }}>Guess the Words Game</h1>
            <div style={{ width: '840px', margin: '0 auto', border: '1px solid #cccccc', padding: '20px', backgroundColor: '#ffffff' }}>
                <Image/>
                <div id="scoreboard" style={{ textAlign: 'center', fontSize: '24px' }}>Correct Guesses: {correctGuess} | Incorrect Guesses: {wrongGuess}</div> {/* New scoreboard */}
                <div id="input" style={{ width: '600px', margin: '20px auto', display: 'flex', justifyContent: 'space-between' }}>
                    <input id="guess" style={{ width: '500px', height: '40px', fontSize: '20px', padding: '5px'}}type="text" placeholder="Enter one word here" value={guess} onChange={e => setGuess(e.target.value)} />
                    <button id="submit" onClick={checkGuess} style={{ width: '80px', height: '40px', fontSize: '20px', backgroundColor: '#0099ff', color: '#ffffff', border: 'none' }}>Submit</button>
                </div>
                <div id="result" style={{ width: '600px', margin: '0 auto', fontSize: '24px', fontWeight: 'bold', color: '#333333' }}>
                {result}
                </div>
                <Link href={route('scoreboard')}  onClick={checkHighScore} style={{ display:'block', textAlign:'center' }}>Save and Quit</Link> {/* New Save and Quit link */}
            </div>
        </div>
    );
};
