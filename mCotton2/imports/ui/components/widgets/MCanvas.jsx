/**
 * Created by chenhao on 16/6/17.
 */
import React, { Component, PropTypes } from 'react';

import {GridList, GridTile} from 'material-ui/GridList';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';

import {orange500, blue500} from 'material-ui/styles/colors';

import MButton from './MButton';
import MToggle from './MToggle';
import MSlider from './MSlider';
import MInput from './MInput';
import MTerminal from './MTerminal';
import MColor from './MColor';
import MColorChrome from './MColorChrome';
import MTimePicker from './MTimePicker';

const styles = {
    gridList: {
        margin: 0,
        textAlign: 'center',
    },
    gridTile: {
        margin: 0,
    },
};

class MCanvas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title ? this.props.title : "Terminal",
            cellHeight: this.props.cellHeight ? this.props.cellHeight : 80,
            cols: this.props.cols ? this.props.cols : 4,
        };
    }

    render() {
        return (
            <GridList
                style={styles.gridList}
                cols={this.state.cols}
                cellHeight={this.state.cellHeight}>

                <GridTile style={styles.gridTile} key="1" cols={4} rows={1}>
                    <MSlider title="滑动变阻器" min={-20} max={100} value={10} step={1}/>
                </GridTile>

                <GridTile style={styles.gridTile} key="10" cols={4} rows={1}>
                    <MInput />
                </GridTile>

                <GridTile style={styles.gridTile} key="2" cols={4} rows={2}>
                    <MColor title="颜色"/>
                </GridTile>

                <GridTile style={styles.gridTile} key="3" cols={4} rows={4}>
                    <MColorChrome />
                </GridTile>

                <GridTile style={styles.gridTile} key="4" cols={4} rows={1}>
                    <MTimePicker />
                </GridTile>

                <GridTile style={styles.gridTile} key="4" cols={4} rows={1}>
                    <MDatePicker />
                </GridTile>

                <GridTile style={styles.gridTile} key="5" cols={1} rows={2}>
                    <MToggle toggled={true} title="灯"/>
                </GridTile>

                <GridTile style={styles.gridTile} key="6" cols={1} rows={2}>
                    <MButton title="Hello"/>
                </GridTile>

                <GridTile style={styles.gridTile} key="7" cols={1} rows={2}>
                    <MButton title="Hello"/>
                </GridTile>

                <GridTile style={styles.gridTile} key="8" cols={1} rows={2}>
                    <MButton title="Hello"/>
                </GridTile>

                <GridTile style={styles.gridTile} key="9" cols={4} rows={4}>
                    <MTerminal outputRows={6}
                               output={["Welcome to Microduino\n","==========\n","\n"]}/>
                </GridTile>

            </GridList>
        )
    }
}

MCanvas.propTypes = {
    title: PropTypes.string,

    cellHeight: PropTypes.number,
    cols: PropTypes.number,

    children: PropTypes.node,
};

export default MCanvas;

