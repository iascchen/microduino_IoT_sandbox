import Pager from 'material-ui/Paper';
import React, {Component, PropTypes} from 'react';

const paperStyle = {
    margin: 10,
    padding: 5,
    textAlign: 'center',
    display: 'inline-block',
};
export default class MPaper extends Component {
    render() {
        return (
            <div className="PagerContainer">
                <Pager style={paperStyle} zDepth={2}>
                    {this.props.children}
                </Pager>
            </div>
        );
    }
}
