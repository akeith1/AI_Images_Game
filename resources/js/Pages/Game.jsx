import Player from "@/Components/Player"
import Image from "@/Components/Image"
import ImageForm from "@/Components/ImageForm"
import { useState, useEffect } from "react";
import {useGameStore} from '../GameState'
import {Link} from "@inertiajs/react";
import ImageGuess from "@/Components/ImageGuess";
export default function Game({auth}) {
    const [range, setRange] = useState({});
    const [selectedInput, setSelectedInput] = useState("")
    const updateImageSrc = useGameStore((state) => state.switch_image);
    useEffect(() => {
        console.log(auth.user)
        let id =1
        window.Echo.join(`game.${id}`)
          .here((users) =>{
            let result = {}
            for (let user in users){
                result[users[user].name] = {
                    color: users[user].color,
                    correct: 0,
                    wrong: 0,
                }
            }
            setRange(result)
          })
          .joining((user) => {
            setRange((currentRange) => {
                let result = {...currentRange}
                result[user.name] = {
                    color: user.color,
                    correct: 0,
                    wrong: 0,
                }
                return result;
            })
          })
          .leaving((exiter) => {
            setRange((currentRange) => {
                let result = {...currentRange}
                delete result[exiter.name]
                return result;
            
          })
        })
          .listen('.message.sent', (e) => {
                updateImageSrc(e.image)
                setSelectedInput(e.input)
        })
        .listen('.update.score', (e) => {
            setRange((currentRange) => {
                let result = {...currentRange}
                if (!result[e.name]) {
                    result[e.name] = {
                        color: '',
                        correct: 0,
                        wrong: 0,
                    }
                }
                result[e.name].correct = e.correct
                result[e.name].wrong = e.wrong
                return result;
            })
        })
       
    }, []);

    return (
        <main className="relative min-h-screen flex ">
            <div className="absolute bg-blue-600 top-0 left-0 h-5/6 w-5/6 justify-center items-center flex">
                <Image/>
            </div>
            <div className="absolute bg-blue-300 top-0 right-0 inset-y-0 w-1/6">
                {
                    
                Object.keys(range).map(name => {
                    return <Player key={name} name={name} correct={range[name].correct} wrong={range[name].wrong} color={range[name].color}/> 
                })
                }
            </div>
            <div className="absolute bg-blue-950 bottom-0 left-0 h-1/6 w-5/6 justify-center items-center flex">
                <ImageForm/>
                <ImageGuess answer = {selectedInput} score={range[auth.user.name]}/>
                <Link href={route('dashboard')} style={{ display:'block', textAlign:'center',color: 'rgb(75 ,85, 99)' }}>Return home</Link> {/* New Save and Quit link */}
            </div>
            
        </main>
    )
}