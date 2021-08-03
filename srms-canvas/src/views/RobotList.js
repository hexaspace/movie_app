import React, {useState} from 'react'
function Robot({status}){
    const serveColor = (status.serve === 1) ? "red" : "gray";
    const homeColor = (status.serve === 0) ? "blue" : "gray";
    const condition = (status.condition === 1) ? "이동 " : "정지";
    return (
        <li>
            <div className="robotId">{status.id}</div>
            <div className= "robotState">
                <div className = "robotServe"><span style={{color:serveColor}}>서빙 </span><span style={{color:homeColor}}> 복귀</span></div>
                <div className = "robotCondition">{condition}</div>
            </div>
        </li>

    );
}
function RobotList({robotStates}) {
    return (
        <div>
            <ul>
            {robotStates.map(robot=>(
                <Robot status={robot} key={robot.id}/>
            ))}
            </ul>
        </div>
    )
}

export default RobotList;
