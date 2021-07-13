import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from "axios";
import Table from './Table';
import PullAPI from './PullAPI';
import MovieCont from "./MovieContainer";
import TablePresenter from './TablePresenter';


class App extends React.Component{

  render(){

    return <div className='container'>
      hello world
      <PullAPI/>
    </div>;
  }
}

export default App;