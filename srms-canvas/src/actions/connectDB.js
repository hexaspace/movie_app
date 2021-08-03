import React from 'react'
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost/helperroboticsSRMS/src/public';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
export async function connection(mapId) {
    // let mapId=4;
    let robotLog = await getRobotLog(mapId);
    let startNodeId = robotLog.currentNode;
    let finalNodeId = robotLog.finalNode;
    let startNode = await getMapXY(mapId, startNodeId);
    let finalNode = await getMapXY(mapId, finalNodeId);

    let pathStrOrigin = robotLog.robotPath;
    let midArrive = pathStrOrigin.split('!')[0].slice(1);   //중간도착지점. -----------시뮬레이션을 위해
    let pathArr = pathStrOrigin.split('/');   //robotPath를 /를 단위로 파싱. 정지나 도착(9999)는 유일하게 %, 나머지는 방향배열과 %
    pathArr = pathArr.map(str => str[str.length-1]);    //방향의 마지막 문자만 배열화
    let pathStr = pathArr.join('');
    pathStr = pathStr.replaceAll("p","u");  //up의 마지막인 p를 가독성있게 u로 변경
    pathStr = pathStr.replaceAll("n","d");  //down의 마지막인 n를 가독성있게 d로 변경
    let startX = startNode.x;
    let startY = startNode.y;
    let path = pathStr;
    let lid = robotLog.logId;
    let rid = robotLog.robotId;
    return {
        start : {x: startNode.x, y:startNode.y},
        final : {x: finalNode.x, y:finalNode.y},
        path : path,
        logId : lid,
        robotId : rid,
        currentNode : robotLog.currentNode,
        finalNode : robotLog.finalNode,
        midNode : midArrive,
        mapId : mapId
    };

}
async function getRobotLog(mid) {
	const response = await  axios.get('/robot-logs/last/'+mid);


    return {
        logId : response.data[0].log_id,
        robotId : response.data[0].robot_id,
        currentNode : response.data[0].current_node,
        finalNode : response.data[0].final_node,
        robotPath : response.data[0].robot_path
    }
}
async function getMapXY(mid, nid) {
	const response = await  axios.get('/map-views/'+mid+'/'+nid);


    return {
        x : response.data[0].x,
        y : response.data[0].y,
        type : response.data[0].type
    }
}
export async function getArrivalAssignment(robotId, mapId, finalNode) {    //시뮬레이션용. 도착 후 서버에 도착신호를 보낸다.

    const mapName = await getMapName(mapId);
    // const request = "/Multi_Drive_Core.php?robot_id="+robotId+"&DB_table="+mapName+"&current_node="+finalNode+"&final_node="+finalNode+"&requestion==arrival_assignment";
	// const response = await  axios.get({ url: request, baseURL: 'http://http://localhost/server/controller'} );
    const response = await axios({
        method: 'post',
        url : '/controller/arrive',
        data : {
            robotId : robotId,
            mapName : mapName,
            finalNode : finalNode
        }
    });

    return;
    // return response.status;
}
async function getMapName(mapId) {    //시뮬레이션용. 도착 후 서버에 도착신호를 보낸다.
    
	const response = await  axios.get('/maps/name/'+mapId);
	// const response = await  axios.post('/maps',{
    //     map_name : 'js_map'
    // });

    // mapName = response.data[0].map_name;
    // return response; 
    return response.data[0].map_name;
}