import { useGameStore } from '../GameState';


export default function Image(){
    const isLoading = useGameStore((state) => state.isLoading);
    const imageSrc = useGameStore((state) => state.imageSrc)
    
    if (isLoading){
    return <svg className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></svg>
    }
    else if (imageSrc){

    return <img src={imageSrc} alt="image" style={{ width: '800px', height: '800px', margin: '0 auto', border: '1px solid #999999' }} className="animate-fadeIn" />
    }

}