import React, {useState} from 'react'
function Path({path}){
    return (
        <div>
            <b>[ {path.robotId} ]</b> <span>{path.message}</span>
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
