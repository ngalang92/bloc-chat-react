import React from 'react';




class RoomList extends React.Component {
constructor(props){
  super(props);
  this.state = {
    rooms: [],
    newRoomName: ''
  };
  this.roomsRef = this.props.firebase.database().ref('rooms');
}

componentDidMount() {
  this.roomsRef.on('child_added', snapshot => {
    const room = snapshot.val();
    room.key = snapshot.key;
    this.setState({
      rooms: this.state.rooms.concat ( room ),
      newRoomName: ''
    });
  });
}

handleChange = (e) => {
  this.setState({
    newRoomName: e.target.value
  });
}

createRoom = (e) => {
  e.preventDefault();

  if (this.state.newRoomName) {
    const newRoom = { name: this.state.newRoomName };
    this.roomsRef.push(newRoom);
  }
}


  render() {
    return (
      <section id="chat-room-list">
        <h4> Current Chat Room: {this.props.activeRoom.name} </h4>
        <form id="create-room-form" onSubmit={ this.createRoom }>
          <label for="create-room">Create Room:</label>
          <input type="text" id="new-room" onChange= { this.handleChange } value={this.state.newRoomName} />
          <input type="submit" />
        </form>

        <ul className="rooms">
        {this.state.rooms.map( (room, index) =>
          <li className="room-index" key = {index} onClick={() => this.props.setActiveRoom(room)}>{room.name}</li>
        )}
        </ul>
    </section>
    );
  }
}


export default RoomList;
