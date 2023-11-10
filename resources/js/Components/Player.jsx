
  
export default function Player({name,color, correct, wrong}){
  
    return (
    <div className="card bg-base-200 my-px" style={{color: color}}>
    <div className="card-body">
      <h2 className="card-title" key={name}>{name}</h2>
      <p>Correct: {correct}  |  Wrong: {wrong}</p>
      
    </div>
  </div>
    )
}