import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '김범준',
      nameFromExpress: '',
      userFromJH: null,
    };
    this.submit = this.submit.bind(this); // submit 함수에서 state를 사용할 수 있게 bind 시킴
  }
  handleChange = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  render () {
    return (
        <div className="App">
          <form>
            <input type="text" value={this.state.name} onChange={this.handleChange}/>
            <input type="button" value="Submit" onClick={this.submit}/>
            <input type="button" value="create Theater" onClick={this.createTeaterInfo>/>}
            {/*<div> {this.state.name} </div>*/}
          </form>
          <div> {this.state.nameFromExpress} </div>
          <div> {this.state.userFromJH} </div>
        </div>
    );
  }

  async submit () {
    // this.state.name
    // let res1 = (await axios.get('/api'));
    // let res2 = (await axios.get('/api/' + this.state.name));
    let {data: res3} = await axios.get('/api/users')
    // this.setState({nameFromExpress: res2.data.data})
    console.log(res3)
    this.setState({userFromJH: res3[0].name})
    this.setState({name: ''}); // 초기화

  }

  async.createTheaterInfo() {

}
}

export default App;
