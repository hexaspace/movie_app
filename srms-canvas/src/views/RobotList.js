import React, {useState} from 'react'
function Robot({status}){
    const serveColor = (status.serve === 1) ? "red" : "gray";
    const homeColor = (status.serve === 0) ? "blue" : "gray";
    const condition = (status.condition === 1) ? "이동 " : "정지";
	const colors = ['red','Coral','gold','green','DodgerBlue','blue','DarkViolet','gray','black','hotpink'];
    const idColor = "2px 2px 3px "+colors[status.id-1];
    return (
        <li>
            <div className="robotId" style={{textShadow:idColor}}>{status.id}</div>
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
