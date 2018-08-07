import React, { Component } from 'react';


class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            username: '',
            content: '',
            roomId: '',
            sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
        }
        this.messagesRef = this.props.firebase.database().ref('messages');
        this.handleChange = this.handleChange.bind(this);
        this.createMessage = this.createMessage.bind(this);
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({
              messages: this.state.messages.concat( message ),
          });
        });
    }

    createMessage(e) {
      e.preventDefault();

      this.messagesRef.push({
        username: this.state.username,
        content: this.state.content,
        sentAt: this.state.sentAt,
        roomId: this.state.roomId
      });
      this.setState({
        username: '',
        content: '',
        sentAt: '',
        roomId: ''
       });
    }

     handleChange(e) {
      this.setState({
        username: this.props.user !== null ? this.props.user.displayName : "Guest",
        content: e.target.value,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
        roomId: this.props.activeRoom.key
      });
    }

    render() {
        return (
            <div className='message-list'>
                <ul>
                    { this.state.messages.map( (message, index) => {
                      if (message.roomId === this.props.activeRoom.key) {
                            return <li key={ index }>  {message.username} says: {message.content} </li>
                          }  else {
                return null
              }
                    })}
                </ul>

                <form onSubmit={ (e) => this.createMessage(e) } className="createMessage">

                  <input
                    type="text"
                    value={this.state.content}
                    placeholder="Type Message Here ..."
                    onChange={this.handleChange} />
                  <input
                    type="submit"
                    value="Send"
                     />
                </form>
            </div>
        )
    }
}

export default MessageList;
