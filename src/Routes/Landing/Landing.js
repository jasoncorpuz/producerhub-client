import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (<>
            <h1>Producer Hub</h1>
            <h2>Share your music with musicians.</h2>
  
           <h2>upload. share.</h2>
            <p>
              Upload your demos and have them reviewed by fellow producers and musicians. 
            </p>
          <section>
           <h2>collaborate.</h2>
            <p>
              Reach out to other music makers to collaborate and expand your network.
            </p>
          </section>
          <section>
            <h2>start sharing now!</h2>
            <Link to='/signup'>Sign me up!</Link>
          </section>
          </>
        );
    }
}

export default Landing;