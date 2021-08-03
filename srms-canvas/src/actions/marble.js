
import { getArrivalAssignment } from './connectDB';
import handleUpdate from '../views/dashboard';

export async function clear(canvas) {	//10개 로봇을 원위치로보내기
	const ctx = canvas.getContext('2d');

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	let id = 1;
	let interval = setInterval(() => {	//1초에 한번씩 반복
		getArrivalAssignment(id, 4, id);	// home으로 도착신호 자동보내기.
		id += 1;
		if(id === 11){				//총 10개의 로봇
			clearInterval(interval);
		}
	}, 1000);
	return;
}

export function printInit(canvas) {
	const position = {
		x : [0,1,2,3,4,0,1,2,3,4],
		y : [2,2,2,2,2,5,5,5,5,5],
		img : ['1','2','3','4','5','6','7','8','9','10']
	};
	const ctx = canvas.getContext('2d');
	const rw = 30;	//로봇의 높이와 너비
	const rh = 36;
	const unit = 55;	//레일 한 길이 단위
	const biasX = 50;	//위치 조정용 치우침
	const biasY = 45;
	let src;
	for (let i=0; i<10; ++i){
		let img = new Image();	//img 를 한번만 for문 밖에서 선언한다면, 마지막 robot만 drawImage가 실행된다.  객체를 돌려쓴 형식이라서 그런듯.
		src = './src/img/'+position.img[i]+'.png';
		img.src = src;
		img.onload = function () {
			ctx.drawImage(img, position.x[i] * unit + biasX,  position.y[i] * unit + biasY, rw, rh);
		};
		// ctx.fillStyle = 'skyblue';
		// ctx.fillRect(position.x[i] * unit + biasX,  position.y[i] * unit + biasY, rw, rw);
		// ctx.fillStyle = 'blue';
		// ctx.strokeRect(position.x[i] * unit + biasX,  position.y[i] * unit + biasY, rw, rw);
		// ctx.fillStyle = 'black';
		// ctx.font = '15px sans-serif';
  		// ctx.fillText(i+1, position.x[i] * unit + biasX+8,  position.y[i] * unit+ biasY +rw-10);
	}
	// const r = 100;
	// ctx.beginPath();	//도형 테두리 경로그리기
	// ctx.arc(100  + r - 3, 100 + r, r, 0, Math.PI * 2, true);	//원 그리기
	// ctx.strokeStyle = "rgba(255,255,255,0)";	//선 색상 설정
	// ctx.lineWidth = 2;	//선 두께 설정
	// ctx.stroke();	//테두리 그리기
	return;
}


export function animationRobot(canvas, obj) {
	const ctx = canvas.getContext('2d');	//캔버스 연결
	// const ctx2 = canvas2.getContext('2d');	//캔버스 연결
	const image = document.getElementById(obj.robotId);	//이미지 class name으로 불러오기
	let end=0;
	let directions = obj.path;	//path의 방향들을 얻는다  l r u d 
	let direction = directions[0];	//첫번째 움직일 방향을 갖고온다.
	let directIndex = 0;	//첫번재 index이므로 0
	const unit = 55;	//레일 한 길이 단위
	const biasX = 50;	//위치 조정용 치우침
	const biasY = 45;
	const r = 18;	//테두리 원의 반지름 크기
	let currX = obj.start.x * unit + biasX; //로봇 움직임 시작위치 xy
	let currY = obj.start.y * unit + biasY;
	const finX = obj.final.x * unit + biasX;
	const finY = obj.final.y * unit + biasY;
	const rw = 30;	//로봇의 높이와 너비
	const rh = 36;
	let movex = 0;	//움직일 방향으로 이동한 거리 (하나의 방향씩 처리)
	let movey = 0;

	ctx.drawImage(image, currX + movex, currY + movey, rw, rh); //로봇 그리기
	// ctx.arc(currX + r - 3, currY + r, r, 0, Math.PI * 2, true);	//원 그리기
	if (direction === '%') {	//방향의 마지막일때
		clearInterval(animate);
		return end;
	}

	//--------최종 목적지와 연결선 그리기
	// ctx2.fillStyle = 'black';
	// ctx2.fillRect(25,25,100,100);
	// ctx2.beginPath();
	// ctx2.moveTo(100, 100);
	// ctx2.lineTo(200, 200);
	// // ctx2.moveTo(currX, currY);
	// // ctx2.lineTo(finX, finY);
	// ctx2.closePath();
	// ctx2.stroke();


	const animate = setInterval(() => {	//반복 시작(애니메이션 효과)

		ctx.clearRect(currX + movex - 4, currY + movey - 1, r * 2 + 2, r * 2 + 2); //이전위치 (원) 삭제 사각형 (로봇보다 큼)
		// ctx.clearRect(currX  + movex, currY + movey , rw+1, rh); //로봇 삭제 사각형

		switch (direction) {	//이번에 움직일 방향을 문자에 따라 
			case 'l':
				movex += -1;
				movey = 0;
				break;
			case 'r':
				movex += 1;
				movey = 0;
				break;
			case 'u':
				movex = 0;
				movey += -1;
				break;
			case 'd':
				movex = 0;
				movey += 1;
				break;
		}
		ctx.drawImage(image, currX + movex, currY + movey, rw, rh); //로봇 그리기
		if (Math.abs(movex) >= unit || Math.abs(movey) >= unit) {	//문자 하나의 이동이 끝났을 때 (50기준)
			directIndex += 1;	//다음 방향 (index)로 이동
			direction = directions[directIndex];
			//움직인값 갱신. 및 초기화
			currX += movex;
			currY += movey;
			movex = 0;	
			movey = 0;
			if (direction === '%') {	//방향의 마지막일때
				if (obj.finalNode === obj.midNode){		//최종 도착지와 path plan이 동일할 때
					let result = getArrivalAssignment(obj.robotId, obj.mapId, obj.finalNode);	// 도착신호 자동보내기.
					console.log("로봇 "+ obj.robotId +  " / 도착 " + obj.finalNode);
					// t.setState({
					// 	...t.state,
					// 	robot : {
					// 	  ...t.state.robot,
					// 	  isMoving: 0
					// 	}
					//   });
					//   t();
				}		
				end=1;

				clearInterval(animate);
				return end;
			}
		}
		
	}, 10);
// 인터벌 종료
end=1;

return end;
}

		// ctx.beginPath();	//도형 테두리 경로그리기
		// ctx.arc(currX + movex + r - 3, currY + movey + r, r, 0, Math.PI * 2, true);	//원 그리기
		// ctx.strokeStyle = colorId;	//선 색상 설정
		// ctx.lineWidth = 2;	//선 두께 설정
		// ctx.stroke();	//테두리 그리기