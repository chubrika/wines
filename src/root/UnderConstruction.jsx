import * as React from 'react';
import { Link } from 'react-router-dom';
import { Teamplate  } from './../components/index'
class UnderConstruction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          
        }
    }

    render () {
        return (
        <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                <div style={{fontSize: '3em', fontWeight: 'bold'}}>
                    UNDER CONSTRUCTION
                </div>
            </div>
        </div>
        )
    }
}
export default UnderConstruction;