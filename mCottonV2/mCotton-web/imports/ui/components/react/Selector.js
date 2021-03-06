/**
 * Created by chenhao on 16/6/19.
 */

import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
    customWidth: {
        width: 150,
    },
};

export default class Selector extends Component {

    constructor(props) {
        super(props);
        this.state = { value: 1 };
    }

    handleChange(event, index, value) {
        this.setState({
            value: value
        });
    }

    render() {
        return (
            <div>
                <SelectField value={this.state.value} onChange={this.handleChange.bind(this)}>
                    <MenuItem value={1} primaryText="Never"/>
                    <MenuItem value={2} primaryText="Every Night"/>
                    <MenuItem value={3} primaryText="Weeknights"/>
                    <MenuItem value={4} primaryText="Weekends"/>
                    <MenuItem value={5} primaryText="Weekly"/>
                </SelectField>
                <br />
                <SelectField value={1} disabled={true}>
                    <MenuItem value={1} primaryText="Disabled"/>
                    <MenuItem value={2} primaryText="Every Night"/>
                </SelectField>
                <br />
                <SelectField
                    value={this.state.value}
                    onChange={this.handleChange}
                    style={styles.customWidth}
                >
                    <MenuItem value={1} primaryText="Custom width"/>
                    <MenuItem value={2} primaryText="Every Night"/>
                    <MenuItem value={3} primaryText="Weeknights"/>
                    <MenuItem value={4} primaryText="Weekends"/>
                    <MenuItem value={5} primaryText="Weekly"/>
                </SelectField>
                <br />
                <SelectField
                    value={this.state.value}
                    onChange={this.handleChange}
                    autoWidth={true}
                >
                    <MenuItem value={1} primaryText="Auto width"/>
                    <MenuItem value={2} primaryText="Every Night"/>
                    <MenuItem value={3} primaryText="Weeknights"/>
                    <MenuItem value={4} primaryText="Weekends"/>
                    <MenuItem value={5} primaryText="Weekly"/>
                </SelectField>
            </div>
        );
    }
}
