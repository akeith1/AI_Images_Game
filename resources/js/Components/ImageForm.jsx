import {useGameStore} from '../GameState'
import { useState} from 'react';

export default function ImageForm(){
    const [value, setValue] = useState('');
    const updateLoading = useGameStore((state) => state.switch_loading);
    const updateImageSrc = useGameStore((state) => state.switch_image);
    async function submit(e) {
        e.preventDefault();
        updateLoading(true)
      
        await window.axios.post('/game', {
            input: value,
        })

        updateLoading(false);
        
      }

    return (

        <form  onSubmit={submit}>
    <label>

    <input className="placeholder:italic placeholder:text-slate-400 bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Enter an image!" type="text" name="value" value={value} onChange={(e) => setValue(e.target.value)} required/>
    </label>
</form>
    )
}