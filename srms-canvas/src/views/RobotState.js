import React, {useState, useEffect} from 'react'
import RobotPath from './RobotPath';
import RobotList from './RobotList';
function RobotState({robotLog}) {
    
    
    const [paths, setPaths] = useState([
        
    ]);
    const [robots, setRobots] = useState([
        { id: 1, condition: 0, serve : 0 },   //condition [0 정지 1이동 2대기 ] serve [0 복귀 1 서빙중], serve : 0
        { id: 2, condition: 0, serve : 0 },
        { id: 3, condition: 0, serve : 0 },
        { id: 4, condition: 0, serve : 0 },
        { id: 5, condition: 0, serve : 0 },
        { id: 6, condition: 0, serve : 0 },
        { id: 7, condition: 0, serve : 0 },
        { id: 8, condition: 0, serve : 0 },
        { id: 9, condition: 0, serve : 0 },
        { id: 10, condition: 0, serve : 0 }
        
    ]);

    console.log("in RobotState "+robotLog.logId+" mid "+ robotLog.midNode +" final "+robotLog.finalNode + " robot id "+robotLog.robotId + " end "+robotLog.isMoving);
    
    // let newrobot = robots.find(robot => robot.id == robotLog.robotId);
    // console.log(newrobot.condition);
    // console.log(robots.find(robot => robot.id == robotLog.robotId));
    // 새로운 로그 이면서 로봇 상태가 정지해있을 때  && robots.filter(robot => robot.robotId === robotLog.robotId)[0].state === 0  robots.find(robot => robot.id == robotLog.robotId)
    if ((paths.filter(path => path.id === robotLog.logId).length) === 0 && robotLog.finalNode !== 11 &&
     robots.find(robot => robot.id == robotLog.robotId).condition === 0){  //new log path input
        let msg = robotLog.startNode + " ~ ~ ~ 이동 ~ ~ > " + robotLog.finalNode; //pathMessage
        let isServe = (robotLog.robotId == robotLog.finalNode) ? 0 : 1; //최종 목적지가 home일때 복귀중
        let isMove = (robotLog.startNode == robotLog.finalNode) ? 0 : 1; //예외적으로 출발과 도착이 같을때 정지로 설정
        if (isMove == 0){
            msg = "도 - - - "+ robotLog.finalNode+" - - - 착";
        }
        let newPath = {   
            id: robotLog.logId,
            robotId : robotLog.robotId,
            message : msg
        };
        setRobots(robots.map(robot =>               //해당 로봇의 상태를 1(move)로 변경
            robot.id == robotLog.robotId
            ? {...robot, condition: isMove, serve: isServe}
            : robot));
        setPaths(paths.concat(newPath));
        
        // console.log(paths);
        // console.log(robots);
    }
    else if((paths.filter(path => path.id === robotLog.logId).length) === 0 && robotLog.finalNode !== 11 && 
    robots.find(robot => robot.id == robotLog.robotId).condition === 1 && robotLog.midNode === '9999'){
        setRobots(robots.map(robot =>               //해당 로봇의 상태를 0(stop)로 변경
            robot.id == robotLog.robotId
            ? {...robot, condition: 0}
            : robot));
        let msg = "도 - - - "+ robotLog.finalNode+" - - - 착"; //pathMessage
        let newPath = {   
            id: robotLog.logId,
            robotId : robotLog.robotId,
            message : msg
        };
        setPaths(paths.concat(newPath));
    }

    return (
        <div>
            <RobotList robotStates = {robots}/>

            <RobotPath paths = {paths}/>
        </div>
    )
}

export default RobotState;
/*
조건이
'새로' 들어온 로그 x
'처음 출발 로그'의 출발과 목적지.
중간에 멈췄다가 목적지로 들어오는 로그는 무시해야함.
그래서 로봇 상태를 저장할 변수를 생성하고

*/