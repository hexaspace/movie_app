import React, {useState} from 'react'
function Path({path}){
    const colors = ['red','Coral','gold','green','DodgerBlue','blue','DarkViolet','gray','black','hotpink'];
    const idColor = "2px 2px 3px "+colors[path.robotId-1];
    return (
        <div>
            <b style={{textShadow:idColor}}>[ {path.robotId} ]</b>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{path.message}</span>
        </div>

    );
}
function RobotPath({paths}) {
    return (
        <div className="robotPath">
            <div className="pathTitle">robot path</div>
            {paths.map(path=>(
                <Path path={path} key={path.id}/>
            ))}
        </div>
    )
}

export default RobotPath;
