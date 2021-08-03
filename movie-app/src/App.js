import './App.css';
import React from 'react';
import axios from "axios";
import Table from './testjs/Table';
import PullAPI from './testjs/PullAPI';
import MovieCont from "./testjs/MovieContainer";
import TablePresenter from './testjs/TablePresenter';
import Header from './component/Common/Header';
import Statistics from './component/Statistics/StatisticsPresenter';
import DataInsert from './component/DataInsert/DataInsertPresenter';
import Monitor from './component/Monitor/MonitorPresenter';
import Login from './component/User/Login';
import NavigationBar from './component/NavigationBar/NavigationBarPresenter';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

class App extends React.Component{

  render(){

    return (
      <Router>
        <NavigationBar />
        <main>
          <Switch>
            <Route path="/" exact>
              <Statistics />
            </Route>
            <Route path="/monitor" exact>
              <Monitor />
            </Route>
            <Route path="/dataInsert" exact>
              <DataInsert />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Redirect to="/" />
            {/* 주어지지 않은 url은 home으로 자동 이동 */}
          </Switch>
        </main>
      </Router>
    // <div className='App'>
    //     <Header/>
    //     <Contents/>
    // </div>
    );
  }
}

export default App;