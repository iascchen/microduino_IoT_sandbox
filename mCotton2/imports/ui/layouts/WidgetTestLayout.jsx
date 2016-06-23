import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import AppBar from 'material-ui/AppBar';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import IconButton from 'material-ui/IconButton';
import {GridTile} from 'material-ui/GridList';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import ResponsiveGirdList from '../components/lists/ResponsiveGirdList';

const lightMuiTheme = getMuiTheme(lightBaseTheme);
const darkMuiTheme = getMuiTheme(darkBaseTheme);

//import AccountsUIWrapper from '../AccountsUIWrapper.jsx';

const testBreakPoint = {
    2: 480,
    4: Infinity,
};

export default function WidgetTestLayout(props) {
    const control = props.control;
    console.log(control);

    let debugMessage = `init 6 "${control.name}" Component with argument: ${JSON.stringify(props.options)}`;

    return (
        <div className="main-layout">
            <MuiThemeProvider muiTheme={lightMuiTheme}>
                <div>
                    <header>
                        <AppBar
                            title="Widget Test"
                        />
                    </header>
                    <main>
                        <h1>{debugMessage}</h1>

                        <ResponsiveGirdList breakpoints={testBreakPoint}>

                            {[1, 2, 3, 4, 5, 6].map(() => (
                                <GridTile cols={props.control.cols} rows={props.control.rows}>
                                    <props.control {...props.options}/>
                                </GridTile>
                            ))}

                        </ResponsiveGirdList>
                    </main>
                    <footer id="pageFooter">
                        <Toolbar float="right">
                            <ToolbarGroup float="right">
                                <IconButton><ActionSettings /></IconButton>
                            </ToolbarGroup>
                        </Toolbar>
                    </footer>
                </div>
            </MuiThemeProvider>
        </div>
    )
};
