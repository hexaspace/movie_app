import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from "axios";
import Table from './Table';
import PullAPI from './PullAPI';
import MovieCont from "./MovieContainer";
import TablePresenter from './TablePresenter';
import Header from './component/Header';
import Contents from './component/Contents';

class App extends React.Component{

  render(){

    return (
    <div className='App'>
        <Header/>
        <Contents/>
    </div>
    );
  }
}

export default App;