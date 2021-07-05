import logo from './logo.svg';
import './App.css';
import React from 'react';

 
class App extends React.Component{
  constructor(props){
    super(props);
    console.log("create componont");
  }
  componentDidMount(){
    console.log("after first render")
  }
  componentDidUpdate(){
    console.log("after updated")
  }
  state = {
    count: 0
  }; 
  add = () => {
    console.log("add");
    this.setState({count: this.state.count +1})
  };
  minus = () => {
    console.log("minus");
    this.setState(current => ({count: current.count - 1}));
  };
  render(){
    console.log("render start");
    return(
    <div>
      <h1>im a clas {this.state.count}</h1>
      <button onClick={this.add}>add</button>
      <button onClick={this.minus}>minus</button>
    </div>
    );
  }
}

export default App;
