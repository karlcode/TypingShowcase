import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Modal from 'react-modal';
var started = false;
var chars = "".split("")
var errors = "".split("")
var red = {color: 'white', backgroundColor:'#fd5c63', transition: 'all 0.5s ease'}
var blue = {color: 'white', backgroundColor:'#2DA2AE', transition: 'all 0.5s ease'}
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    textAlign             : 'center'
  }
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' ,
                   errors: 0,
                   secondsElapsed: 0,
                   lettersTyped: 0,
                   text: "Studying is the main source of knowledge. Books are indeed never failing friends of man. For a mature mind, reading is the greatest source of pleasure and solace to distressed minds. The study of good books ennobles us and broadens our outlook. Therefore, the habit of reading should be cultivated. A student should never confine himself to his schoolbooks only. He should not miss the pleasure locked in the classics, poetry, drama, history, philosophy etc. We can derive benefit from other’s experiences with the help of books. The various sufferings, endurance and joy described in books enable us to have a closer look at human life. They also inspire us to face the hardships of life courageously. ",
                   counter: 0,
                   ctr: 0,
                   spans: '',
                   modalIsOpen: false};

    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
    this.setState({modalIsOpen: true});
    clearInterval(this.interval)
  }
  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
  tick() {
    this.setState((prevState) => ({
      secondsElapsed: prevState.secondsElapsed + 1
    }));
    if(this.state.secondsElapsed === 60){this.openModal()}
  }
  handleChange(event) {
    if(!started){
      started = true
      this.interval = setInterval(() => this.tick(), 1000);
    }
      var charCode = event.which || event.charCode;
      var charString = String.fromCharCode(charCode)
      var stringArray = this.state.text.split(" ")
      var objArray  = stringArray.map(obj => {
        return (
        <span>{obj} </span>
        )
      })
      if(charString === this.state.text.charAt(this.state.counter)){
        chars.push(<span >{charString}</span>)
        this.setState({ value: chars, lettersTyped: this.state.lettersTyped + 1, counter: this.state.counter + 1 });
        objArray[this.state.ctr] = <span style={blue}>{objArray[this.state.ctr]}</span>
        this.setState({spans: objArray})
        if(charString === " "){
          this.setState({ctr: this.state.ctr + 1} ) 
        }
      }
      else {
        errors.push(charString)
        chars.push(<span style={red}>{charString}</span>)
        this.setState({value: chars, errors: errors.length, errorValue: errors})
      }
  }
  reset(){
    window.location.reload()
  }
  render() {
    let usermessage
    let inputmessage
    if(this.state.spans){
      usermessage = (this.state.spans)
    }
    else usermessage = (this.state.text)
    if(this.state.value === ''){
      inputmessage = "Start Typing Here"
    }
    else inputmessage = (this.state.value)
    var wpm = parseInt((this.state.lettersTyped/5)/(this.state.secondsElapsed/60)) || 0
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="user_message">{usermessage}</div>
          </div>

        <div className="input_message" >{inputmessage}
        <form>
          <input type="text" onKeyPress={this.handleChange} id="input"/>
        </form>
        <div id="time">Time: {this.state.secondsElapsed} s</div>
        <div id="wpm">WPM: {wpm} </div>
        <span id="errors">Error counter: {this.state.errors}</span>
        <button id="reset" onClick={this.reset}>Reset</button>
        <button id="stop" onClick={this.openModal}>Submit</button>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2>You were clocked at {wpm} words per minute!</h2>
          <h2>You made {this.state.errors} typos </h2>
          <button onClick={this.closeModal}>Close</button>
        </Modal>
        
      </div>
    );
  }
}

export default App;
