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
          <section>
            <h3>demo account:</h3>
             <p>username: Snape</p>
             <p>password: Password..1</p>
             
             <h3>download example audio here:</h3>
             <section>
             <audio controls >
                    <source src='https://test-300.s3-us-west-1.amazonaws.com/120_D%23maj7_Guitar_7.wav'
                        type='audio/mp3' />
                </audio>
                    <a className='download'href='https://drive.google.com/file/d/1mPA17UPWhE1jgTU0t8MYSivEsSeE8Pv2/view?usp=sharing' >download</a>
            
            
             <audio controls >
                    <source src='https://test-300.s3-us-west-1.amazonaws.com/DHP6_B_Mix_12_126.wav'
                        type='audio/mp3' />
                </audio>
                <a className='download'href='https://drive.google.com/file/d/1eJWWJ9ho32CmkOfCwx899z8ZfyrHwz48/view?usp=sharing' >download</a>
                these are royalty free audio files you can use freely for demonstration purposes. please do not upload audio files that aren't yours!

                </section>
          </section>
          </>
        );
    }
}

export default Landing;