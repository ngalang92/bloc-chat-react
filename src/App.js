import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import './App.css';

var config = {
  apiKey: "AIzaSyBLDsrWJCDv_nvvUEwYKWaXHsF-IIv29lM",
  authDomain: "bloc-chat-react-dd055.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-dd055.firebaseio.com",
  projectId: "bloc-chat-react-dd055",
  storageBucket: "bloc-chat-react-dd055.appspot.com",
  messagingSenderId: "310991137695"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <RoomList
        firebase={firebase}
        />
      </div>
    );
  }
}

export default App;
