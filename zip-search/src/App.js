import React, { Component } from 'react';
import './App.css';


function City(props) {
     return(<div>
            <p>{props.data.city}</p>
            <p>{props.data.state}</p>
            <p>{props.data.location}</p>
            <p>{props.data.population}</p>
            <p>{props.data.wages}</p>
            </div>
     )
}

function ZipSearchField(props) {
  return (<div>
          type zip:
          <input type="text" onChange={props.zipChanged}/>
          </div>);
}


class App extends Component {
  state = {
    userInputValue: "",
    result: [],
  }

  handleZipChange(event){
    if (event.target.value.length === 5 && /^\d+$/.test(event.target.value)){
    this.setState({
      result: [],
    })
    fetch('http://ctp-zip-api.herokuapp.com/zip/'+event.target.value)
    .then(res => res.json())
    .then(jsonData => {
      jsonData.forEach(row => {
        let resobj = {
          city: row.City,
          state: row.State,
          location: "(" + row.Lat + ", " + row.Long +")",
          population: row.EstimatedPopulation,
          wages: row.TotalWages, 
        }
        this.setState(prevState => ({
          result: [...prevState.result, resobj],
      }));
      });
    })
    console.log(this.state.result)
    this.setState({
      userInputValue: event.target.value
    })
  } else{
    this.setState({
      userInputValue: "Please input only digits with length 5"
    })
  }
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField zipChanged={(e) => this.handleZipChange(e)} zipValue={this.state.userInputValue} />
        <div>
          {this.state.result.map(element => (
            <City data={element}/>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
