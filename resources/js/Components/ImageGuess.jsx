import {useGameStore} from '../GameState'
import { useState} from 'react';

export default function ImageGuess({answer, score}){
    const [value, setValue] = useState('');
    async function submit(e) {
        e.preventDefault();
        const correctness = answer.contains(value)
        await window.axios.post('/check', {
            correct: score.correct,
            wrong: score.wrong,
            correctness: correctness
        })
        
      }

    return (

        <form  onSubmit={submit}>
    <label>

    <input className="placeholder:italic placeholder:text-slate-400 bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Make a guess!" type="text" name="value" value={value} onChange={(e) => setValue(e.target.value)} required/>
    </label>
</form>
    )
}