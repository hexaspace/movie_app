import logo from './logo.svg';
import './App.css';
import React from "react";
import axios from "axios";

class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };
  getMovies = async () => {
    const {data: {data: {movies}}} = await axios.get("https://yts-proxy.now.sh/list_movies.json");
    console.log(movies)
    this.setState({movie:movies});
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 6000);
    this.getMovies();
  }
  render() {
    const { isLoading } = this.state;
        return <div>
      {isLoading ? "Loading" : "we're ready"}
    </div>;
  }
}
// import React from 'react';
// import axios from "axios";
 
// class App extends React.Component{
//   state = {
//     movies: [],
//     isLoading: true
//   };
//  //함수로 빼는 이유 : 받아오는데 시간이 걸려서. asyn를 conpoentDidMount앞에 붙여도 됨
//   getMovies = async () => {
//     const movies = await axios.get("https://yts-proxy.now.sh/list_movies.json");
//   };
//   componentDidMount(){
//     console.log("didmount");
//     this.getMovies();
//   }
//   render(){
//     const {isLoading} = this.state;
//     return <div>
//       {isLoading ? "Loading" : "we're ready"}
//     </div>;
//   }
// }

export default App;
