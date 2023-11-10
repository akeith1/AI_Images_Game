import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

async function getUsers() {

    const users = await window.axios.get('/highscore');
    const decoded = JSON.parse(users.data)
    
    console.log(decoded)
    let result = []
    for (let index in decoded){
    
        result.push([ decoded[index].name,decoded[index].max_score ])
    }
    const sortedUsers = result.sort((a, b) => b[1] - a[1]);
   
    return sortedUsers
}
// Define a Leaderboard component that takes users as a prop
export default function Leaderboard() {
    // Sort the users by their score in descending order
    const [users, setUsers] = useState([])
   
  
    useEffect(() => {
       getUsers().then((result) => {
        setUsers(result)
       })
    }, [])
    // Define some inline styles
    const userListStyle = {
      width: "90%",
      margin: "5% auto",
      border: "1px solid #cccccc",
      padding: "20px 20px",
      backgroundColor: "#ffffff",
    };
  
    const leaderboardStyle = {
      width: "600px",
      margin: "0 auto",
      borderCollapse: "collapse",
    };
  
    const cellStyle = {
      padding: "15px",
      border: "1px solid #999999",
      textAlign: "center",
    };
  
    const headerStyle = {
      backgroundColor: "#333333",
      color: "#ffffff",
      ...cellStyle, // Use the spread operator to merge styles
    };
  
    const evenRowStyle = {
      backgroundColor: "#f0f0f0",
      ...cellStyle,
    };
  
  
  
  // Return a JSX element that renders the sorted users
  return (
    <div style={userListStyle}>
    <h1 style={{textAlign: 'center', fontSize: '2em'}}>Game Leaderboard</h1>
    <table style={leaderboardStyle}>
    <thead>
    <tr>
    <th style={headerStyle}>User Name</th>
    <th style={headerStyle}>Net Score</th>
    </tr>
    </thead>
    <tbody>
    {users.map((user, index) => (
    // Use the index as a key for each table row
    <tr key={index} style={index % 2 === 0 ? evenRowStyle : cellStyle}>
    {/* Display the user's name and score */}
    <td>{user[0]}</td>
    <td>{user[1]}</td>
    </tr>
    ))}
    </tbody>
    </table>
    <Link href="/" style={{ display:'block', textAlign:'center',color: 'rgb(75 ,85, 99)' }}>Return home</Link> {/* New Save and Quit link */}
    </div>
  );
  }
  
  

  