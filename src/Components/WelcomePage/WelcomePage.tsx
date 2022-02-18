import React from "react";

import './WelcomePage.css'

import Player2 from "./Assets/avatar021.jpg"
import Player1 from "./Assets/Group 13.jpg"
import Circle from "./Assets/Ellipse 2.jpg"

import { useState } from "react";


function checkWin(matrix : number [][], turn : number)
{
     for(var i=0;i<8;i++)
     {
         for( var j= 0; j<8;j++)
         {
           if(j<=4)
           {
               if(matrix[i][j]== turn)
               {
                    var k =1;
                    while(k  <= 3 && j+k < 8)
                    {
                       if(matrix[i][j+k] == turn)
                       {
                           if(k==3)
                           {
                               return true;
                           }
                           k++;
                       }
                       else
                       break;
                    }
               }
           }
           if(i<=4)
           {
            if(matrix[i][j]== turn)
            {
                 var k =1;
                 while(k  <= 3 && i+k < 8)
                 {
                    if(matrix[i+k][j] == turn)
                    {
                        if(k==3)
                        {
                            return true;
                        }
                        k++;
                    }
                    else
                    break;
                 }
            }
           }
         }
     }

     return false;
}

    function Page1(){
     
    const[showWelcomePage, setwelcomePage] = useState(true);
    const[player1, setPlayer1] = useState("");
    const[player2, setPlayer2] = useState("");
    const[scoreplayer1, setScorePlayer1] = useState(0);
    const[scoreplayer2, setScorePlayer2] = useState(0);
    const[startGame, setStartGame] = useState(false);
    const[gameNumber, setGameNumber] = useState(0);
    const[turn, setTurn] = useState(Math.floor(Math.random() * (2) + 1));
    const[prevLocation, setPrevLocation] = useState([-1,-1]);
    const[winner,setWinner] = useState(0);
    const [matrix, setMatrix] = useState([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ]);

    let available_circle = 64;  

    function undo_handler(){
        
       
        if(prevLocation[0]!= -1)
        {
        matrix[prevLocation[0]][prevLocation[1]]=0;
         
        turn == 1 ? setTurn(2): setTurn(1);
        available_circle++; 
        
        }
       

    }

    function start_handler(){
       
        if(scoreplayer1<2&&scoreplayer2<2)
        {
        setMatrix([
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
          ]);

         setGameNumber(gameNumber+1); 
         setStartGame(true);
         setPrevLocation([-1,-1]);
        }
        else
        setStartGame(false);
       
    }

    function End_Tournament_handler(){
 
        setGameNumber(0);
        setStartGame(false);
        setScorePlayer1(0);
        setScorePlayer2(0);
        setTurn(Math.floor(Math.random() * (2) + 1));
        setPrevLocation([-1,-1]);
        setWinner(0);
        setMatrix([
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
          ]);
      
    }

    function CricleClickHandler(columnIndex : number){

        if(startGame)
        {
            let i = 7;
            while(i>=0)
            {
                if(matrix[i][columnIndex] == 0)
                {
                    matrix[i][columnIndex]= turn;
                  
                        available_circle--;
                        if(checkWin(matrix, turn))
                        {
                            if(turn==1)
                            {
                            setScorePlayer1(scoreplayer1+1);    
                            }
                            else
                            {
                                setScorePlayer2(scoreplayer2+1);
                            }
                            setStartGame(false);
                        }
                        else{
                        setPrevLocation([i,columnIndex]);
                        if(turn == 1)
                        setTurn(2);
                        else
                        setTurn(1);
                        }
                      break;
                }
                else{
                    i--;
                }
            }
        }
    }
    
    function checkwinner()
    {
        if(scoreplayer1==2||scoreplayer2==2)
        {
            if(scoreplayer1==2)
            {
            return 1;
            }
            else
            {
            return 2;
            }
        }
        else
        {
          return 0;
        }
    }

    if(showWelcomePage)
    {
      return(
        <div className="WelcomePage">

            <div className="player1">

                <img src={Player1}/>

                <div>
                    <p>Player01</p>
                    <input  type="text" value={player1} onChange={e => setPlayer1(e.target.value)} required></input>
                </div>

            </div>

            <div className="player2">

                <img src={Player2}/>

                <div>
                    <p>Player02</p>
                    <input  type="text" value={player2} onChange={e => setPlayer2(e.target.value)} required></input>
                </div>

            </div>

            <div className="line">

            </div>

            <div className="buttonStartGame">

                <input type="button" value="Start Game" onClick = {()=>{setwelcomePage(false)}}></input>

            </div>

        </div> )}
    
    else
    {
        return(
                
        <div className="GamePage">

                    <div className="GamePage1">

                             <table>

                                {matrix.map((row, rowIndex) => (

                                    <tr key={rowIndex}>

                                    {row.map((column, columnIndex) => (

                                        <td key={columnIndex}>
                                        
                                            {matrix[rowIndex][columnIndex] == 0 ? 
                                            <div className="Circle" onClick={()=>{ CricleClickHandler(columnIndex);}}></div> : 
                                            (matrix[rowIndex][columnIndex] == 1 ? 
                                            <div className="Circle" onClick={()=>{ CricleClickHandler(columnIndex);}}><img src={Player1}/></div> :
                                            <div className="Circle" onClick={()=>{ CricleClickHandler(columnIndex);}}><img src={Player2}/></div>)}
                                        
                                        </td>
                                    ))}
                                    </tr>
                                ))}
                            </table>
                    </div>

                    <div className="GamePage2">
                         
                         <div className="Heading">3 Games Tournament</div>

                         
                         <div className="Congratulations">{scoreplayer1+scoreplayer2>0 && startGame == false ? "Congratulaions" : ""}</div>
                         
                          {checkwinner()==0? "" : <div className="Heading1"> {checkwinner()==1? player1: player2 } won Tournament!! Final Score {scoreplayer1} - {scoreplayer2}</div> }
                         

                         <div className="Heading1">Game {gameNumber}</div>
                       

                         <div className= "GamePage2-Player1">

                            <img style= { {border: turn == 1 ? "10px solid #FFA201": "hidden"} } className="GamePage2-Image"  src={Player1}/>

                                    <div className="Table">
                                        <table>
                                            <tr>
                                                <th className="Th"> Player 1</th>
                                                <th className="Th"> Score </th>
                                            </tr>

                                            <tr>
                                                <td className="Td"> {player1}</td>
                                                <td className="Td"> {scoreplayer1} </td>
                                            </tr>
                                        </table>
                                    </div>

                         </div>
                         
                         <div className= "GamePage2-Player2">

                               
                               <img style= { { border: turn == 2 ? "10px solid #FFA201": "hidden" } } className="GamePage2-Image"  src={Player2}/>
                             

                               <div>
                               <table className="Table">
                                     <tr>
                                     <th className="Th">Player 2</th>
                                     <th className="Th">Score</th>
                                     </tr>

                                     <tr>
                                         <td className="Td"> {player2}</td>
                                         <td className="Td"> {scoreplayer2} </td>
                                     </tr>


                                 </table>
                               </div>

                         </div>

                         {startGame == true ? <div> <input type="button" value="Undo Step" className="GamePage2-Button1" onClick={()=>{undo_handler()}}></input></div>:
                                              <div> <input type="button" value="Start Game"  className="GamePage2-Button1" onClick={()=>{ start_handler()}}></input></div>}

                        <div >

                        <input type="button" className="GamePage2-Button2" value="End Tournament" onClick = {()=>{End_Tournament_handler(); setwelcomePage(false);}} ></input>

                        </div>
                    </div>
              </div>)
    }
}

export default Page1;