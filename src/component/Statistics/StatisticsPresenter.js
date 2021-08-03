import {useState, useEffect} from 'react'   //useState 배열관리 useEffect 패치 api사용
import axios from 'axios'
import { Bar, Doughnut, Line } from "react-chartjs-2"
function Contents() {

    const [salesData, setSalesData] = useState({
        // labels: ["1월", "2월", "3월"],
        // datasets: [
        //     {
        //         label: "국내 누적확진자",
        //         backgroundColor: "salmon",
        //         fill: true,
        //         data: [10, 5, 3]
        //     }
        // ]   
    })
    const [operatingData, setOperatingData] = useState({})
    const [efficiencyData, setEfficiencyData] = useState({})

    useEffect(()=>{ //마운트 직후 실행되도록 
        const fetchEvent = async() =>{  //불러오기 기다리기 위해 async await
            const res = await axios.get("https://api.covid19api.com/total/dayone/country/kr")
            makeData(res.data)
        }
        const makeData = (items)=>{ //마지막 날짜 데이터만 뽑기. 
            // items.forEach(item => console.log(item))    //for each 반복문
            const arr = items.reduce((acc, cur)=>{
                const currentDate = new Date(cur.Date);
                const year = currentDate.getFullYear();
                const month = currentDate.getMonth();
                const date = currentDate.getDate();
                const confirmed = cur.Confirmed;
                const active = cur.Active;
                const death = cur.Deaths;
                const recoverd = cur.Recovered;
                
                // const findItem = acc.find(a=> a.date === 1);
                if(year === 2021 && date === 1){
                    acc.push({year, month, date, confirmed, active, death, recoverd})
                }

                return acc;

            }, [])

            const labels = arr.map(a=> {
                return `${a.month+1}월`
            })
            setSalesData({
                labels,
                datasets: [
                    {
                        label: "월별 매출",
                        backgroundColor: "#4361B7",
                        fill: true,
                        data: arr.map(a=> a.confirmed)
                    }
                ]
            });
            setOperatingData({
                labels,
                datasets: [
                    {
                        label: "운행시간",
                        backgroundColor: "skyblue",
                        borderColor: "skyblue",
                        fill: false,
                        data: arr.map(a=> a.active * 0.002)
                    }
                ]
            });
            setEfficiencyData({
                labels: ["아침","점심","저녁","새벽"],
                datasets: [
                    {
                        label: "시간대별 베터리 소요량",
                        backgroundColor: ["#B8BCDD","#465296", "#5562B3", "#848CCB"],
                        borderColor: "#DFE1F1",
                        fill: false,
                        data: [10,60,35,15]
                    }
                ]
            });
        }
        fetchEvent()
    },[])
    return (
        <section>
            <h2>데이터 분석</h2>
            <div className="contents">
                <div className="chart">
                    <p>월별 매출</p>
                    <Bar data={salesData}
                        options={  //char.js 검색후 다양한 api 사용방법 option /import 한 깃헙도 참고
                            {
                                legend: { display: true, position: "bottom" },
                                title: {
                                    display: true,
                                    text: "월별 매출dd"
                                }
                                // {title: { display: true, text: "월별 매출dd" },
                                // legend: { display: true, position: "bottom" }}
                            }
                        } />
                </div>
                <div className="chart">
                <p>운행 시간</p>

                    <Line data={operatingData}
                        options={  //char.js 검색후 다양한 api 사용방법 option /import 한 깃헙도 참고
                            {
                                title: { display: true, text: "운행시간", fontSize: 16 },
                                legend: { display: true, position: "bottom" }
                            }
                        } />
                </div>
                <div className="chart">
                <p>시간대별 베터리 소요량</p>

                    <Doughnut data={efficiencyData}
                        options={  //char.js 검색후 다양한 api 사용방법 option /import 한 깃헙도 참고
                            {
                                title: { display: true, text: "시간대별 베터리 소요량", fontSize: 16 },
                                legend: { display: true, position: "bottom" }
                            }
                        } />
                </div>
            </div>
        </section>
    )
}

export default Contents
