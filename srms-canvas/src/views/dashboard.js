import React, { Component , useEffect} from 'react';
import { connect } from 'react-redux';
import { setCanvas } from '../actions/canvas';
import { printInit, clear, animationRobot } from '../actions/marble';
import { connection} from '../actions/connectDB';
import RobotState from './RobotState';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    // let timerId = 0;
    this.state = { //
      a: {
        x : 0,
        y : 2,
        path : "drrrrdrrr%",
        robotId: 10

      },
      b: {
        x : 4,
        y : 5,
        path : "urrrdddl%",
        robotId: 9

      },
      c: {
        x : 400,
        y : 100,
        path : "ldluur",
        robotId: 8

      },
      robot:{
        logId : 0,
        robotId : 1,
        startNode : 1,
        midNode : 1,
        finalNode : 11,
        isMoving : 0
      },
      flag:1,
      logId : 0,
      intervalId:0,
      robots: [
        {
            id: 1,
            condition : 0
        },
        {
            id: 2,
            condition : 0
        },
        {
            id: 3,
            condition : 1
        }
    ]
    };
    // let interval = 0; //반복시행 인터벌 id

  }
  componentDidMount() { // before first rendering
    const { dispatch } = this.props;
    const canvas = document.getElementById('sample');
    // const canvas2 = document.getElementById('sample2');
    dispatch(setCanvas(canvas));
    // dispatch(setCanvas(canvas2));

    let interval = setInterval(() => {  //connect server
      this.startConnect(this);
      console.log("반복"); }, 1000);
    this.setState({
      ...this.state,
      intervalId: interval
    });
    printInit(canvas);
    // printInit(canvas2);

  }
  componentWillUnmount() {  // after last rendering
    clearInterval(this.state.intervalId);
  }
  handleUpdate = () => {
    this.setState({
      ...this.state,
      robot : {
        ...this.state.robot,
        isMoving: 0
      }
    });
  }
  async startConnect() {
    let mapId = 4;
    let move = await connection(mapId);

    let this_log = move.logId;
    let end = 3;
    if (this.state.logId != this_log) { //new log input
      end = await animationRobot(this.props.canvas.element, move); // run robot animate
      // animationRobot(this.props.canvas.element, move, this.handleUpdate).then(()=>
        // {console.log("after anain");}
      // ); // run robot animate
      console.log("end"+end);
      this.setState({
        ...this.state,
        logId: this_log
      });
      // if(move.finalNode === move.midNode){  //이게 아니라 처음에 무조건 추가. 이후 도착신호 받기 전까지 이 로봇아이디로는 추가 x
        // console.log("robotid : "+ move.robotId);
      // console.log(this.state.robots.filter(robot => robot.id === move.robotId));

        console.log("dashbord 로그"+this.state.logId+"로봇 "+ move.robotId + " / 시작 "+ move.currentNode + " / 종료 " + move.finalNode);
        let msg = "로봇 "+ move.robotId + " / 시작 "+ move.currentNode + " / 종료 " + move.finalNode;//pathMessage
        this.setState({
          ...this.state,
          robot : {
            logId: this_log,
            robotId: move.robotId,
            startNode: move.currentNode,
            midNode : move.midNode,
            finalNode: move.finalNode,
            isMoving: end
          }
        });
      // }
    }
  }
  // startAnimation = async () => {
  //   let flag = this.state.flag;
  //   if (flag) {
  //     await animationRobot(this.props.canvas.element, this.state.a);
  //   } else {
  //     await animationRobot(this.props.canvas.element, this.state.b);
  //   }
  //   this.setState({
  //     ...this.state,
  //     flag: 1 - flag
  //   });

  // }

  // handleChange(event) {
  //   let robotid = event.target.value;
  //   let startx = 0;
  //   let starty = 0;
  //   let newpath = "rr%";
  //   let robot = 8;
  //   switch(robotid){
	// 		case 'robot1':
	// 			startx = 9;
	// 			starty = 7;
  //       newpath = "rruuulll%";
  //       robot = 7;
	// 			break;
	// 		case 'robot2':
	// 			startx = 10;
	// 			starty = 2;
  //       newpath = "llld%";
  //       robot = 6;

	// 			break;
	// 		case 'robot3':
  //       startx = 14;
  //       starty = 7;
  //       newpath = "luu%";
  //       robot = 5;
	// 				break;
	// 		case 'robot4':
	// 			startx = 13;
	// 			starty = 5;
  //       newpath = "ull%";
  //       robot = 4;


	// 			break;
	// 	}
  //   this.setState({
  //     ...this.state,
  //     c: {
  //       x: startx,
  //       y: starty,
  //       path : newpath,
  //       robotId : robot
  //     }
  //   });
  // }

  // handleSubmit(event) {
  //   // alert('Your favorite flavor is: ' + this.state.c.path);
  //   event.preventDefault();
  //   animationRobot(this.props.canvas.element, this.state.c);
  //     // clearInterval(animate);
  // }
  handleLoadStop = () => {
    clearInterval(this.state.intervalId);
  }
  handleRobotInit = () => {
    clear(this.props.canvas.element);

  }

  render() {
    //this.startConnect.bind(this) \
    //clearInterval(timerId)
    return (
      <div>
        <div>
          <h1>helper robotics</h1>
        </div>
        <RobotState
            robotLog = {this.state.robot}
          />
        <div>
          <div style={{ position: 'relative' }} className="canvas-img-div"> 
            <img src="./src/img/rail3-3.png" alt="" id="map" height={'625px'} className="background" />
            <div style={{ position: 'absolute', marginLeft: '0%' }} className="canvas-div">
              <canvas id={'sample'} width={'966px'} height={'625px'} className="canvas"></canvas>
              {/* <canvas id={'sample2'} width={'966px'} height={'625px'} className="canvas2"></canvas> */}
            </div>
          </div>
          <button onClick={this.handleLoadStop.bind(this)}>데이터 로드 정지</button>
          <button onClick={this.handleRobotInit.bind(this)}>로봇위치 초기화</button>

          {/* <form onSubmit={this.handleSubmit.bind(this)}>
            <label>
              movr robot :
              <br />
              <select value={this.state.value} onChange={this.handleChange.bind(this)}>
                <option value="robot1">robot1</option>
                <option value="robot2">robot2</option>
                <option value="robot3">robot3</option>
                <option value="robot4">robot4</option>
              </select>
            </label>
            <br />

            <input type="submit" value="Submit" />
          </form> 
          <p onClick={this.startAnimation.bind(this)}>애니메이션</p>
          */}
          
          <img src="./src/img/1.png" alt="" id="1" className='robotImg' />
          <img src="./src/img/2.png" alt="" id="2" className='robotImg' />
          <img src="./src/img/3.png" alt="" id="3" className='robotImg' />
          <img src="./src/img/4.png" alt="" id="4" className='robotImg' />
          <img src="./src/img/5.png" alt="" id="5" className='robotImg' />
          <img src="./src/img/6.png" alt="" id="6" className='robotImg' />
          <img src="./src/img/7.png" alt="" id="7" className='robotImg' />
          <img src="./src/img/8.png" alt="" id="8" className='robotImg' />
          <img src="./src/img/9.png" alt="" id="9" className='robotImg' />
          <img src="./src/img/10.png" alt="" id="10" className='robotImg' />
        </div>
      </div>
    );
  }
}

const mstp = (state) => {
  return {
    canvas: state.canvas
  };
};

export default connect(mstp)(Dashboard)