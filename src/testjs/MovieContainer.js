import React from "react";
import axios from "axios";
import Movie from "./Movie";


class MovieContainer extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };
  getMovies = async () => {
    const {
      data: {
        data: { movies }
      }
    } = await axios.get(
      "https://yts-proxy.now.sh/list_movies.json?sort_by=rating"
    );
    this.setState({ movies, isLoading: false });
  };
  componentDidMount() {
    this.getMovies();
  }
  render() {
    const { isLoading, movies } = this.state;
    return (
      <div>
        {isLoading
          ? "Loading..."
          : movies.map(movie => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
              />
            ))}
      </div>
    );
  }
}

export default MovieContainer;
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
