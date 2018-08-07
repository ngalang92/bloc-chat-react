import React, { Component } from 'react';

class User extends Component {
  constructor(props){
    super(props);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    }

    componentDidMount(user) {
        this.props.firebase.auth().onAuthStateChanged( user => {
          this.props.setUser(user);
        });
      }

      signIn(){
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup(provider).then((result) => {
          const user = result.user;
          this.props.setUser(user);
        });
      }

      signOut(){
        this.props.firebase.auth().signOut().then(() => {
          this.props.setUser(null);
        })
      }

  render() {
    return(
      <div>
           <h4> Username: {this.props.user ? this.props.user.displayName : 'Guest'}</h4>
           <button className="signIn-Button" onClick={this.signIn}>Sign In</button>
           <button className="signOut-Button" onClick={this.signOut}>Sign Out</button>
       </div>
    )
  }
}

export default User;
