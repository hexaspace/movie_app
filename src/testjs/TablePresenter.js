import React, {Component} from 'react';
import Table from './Table';
import TableForm from './TableForm';

class TablePresenter extends Component{
    //table with state
    state = {
        characters: [
            {
                name: "비숍",
                job: "힐러",
            },
            {
                name: "도도",
                job: "검사",
            },
            {
                name: "듀얼블레이드",
                job: "도적",
            },
            {
                name: "캡틴",
                job: "해적",
            },
        ],
    }
    removeCharacter = (index) => {
        const {characters} = this.state
        this.setState({
            characters: characters.filter((character, i) => {
                return i !== index
            }),
        })
    }
    handleSubmit = (character) => {
        this.setState({characters: [...this.state.characters, character]})
    }
    render(){
        const {characters} = this.state
        return(
            <div className="tableContainer">
                <Table characterData={characters} removeCharacter={this.removeCharacter} />
                <TableForm handleSubmit={this.handleSubmit} />
            </div>
        )
        // table with probs
        // const characters = [
        //     {
        //         name: "비숍",
        //         job: "힐러",
        //     },
        //     {
        //         name: "도도",
        //         job: "검사",
        //     },
        //     {
        //         name: "듀얼블레이드",
        //         job: "도적",
        //     },
        //     {
        //         name: "캡틴",
        //         job: "해적",
        //     },
        // ]
        // return(
        //     <div className="tableContainer">
        //         <Table characterData={characters} />
        //     </div>
        // )
    }
}
export default TablePresenter;