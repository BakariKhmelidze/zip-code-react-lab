import React, { Component } from 'react';
import './App.css';


function City(props) {
return (<div>{props.data}</div>);
}

function ZipSearchField(props) {
  return (<div>City:
          <input type="text"  onKeyDown={props.enter} />   
          <p>Click Enter to Make Request</p>
          </div>
          );
}


class App extends Component {
  state = {
    userInputValue: "",
    result: [],
  }
  

  KeyPress(event){
    if(event.keyCode === 13){
      let value = event.target.value.toUpperCase()
      if(/^[a-zA-Z ]*$/.test(value)){
        this.setState({
          result: [],
        })
        fetch('http://ctp-zip-api.herokuapp.com/city/'+value)
        .then(res => res.json())
        .then(jsonData => {
          jsonData.forEach(element =>{
            this.setState(prevState => ({
              result: [...prevState.result, element],
          }));
          })
        })
        .catch(error => console.log(error))
      }

      
    }
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField  enter={(e) => this.KeyPress(e)} user = {this.state.userInputValue}/>
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