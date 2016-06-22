import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import ActionAccountBox from 'material-ui/svg-icons/action/account-box';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import IconButton from 'material-ui/IconButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

const lightMuiTheme = getMuiTheme(lightBaseTheme);
const darkMuiTheme = getMuiTheme(darkBaseTheme);

//import AccountsUIWrapper from '../AccountsUIWrapper.jsx';


const MainLayout = ({content}) => (
    <div className="main-layout">
        <MuiThemeProvider muiTheme={lightMuiTheme}>
            <div>
                <header>
                    <AppBar
                        title="mCotton 2.0"
                        iconElementRight={
                        Meteor.userId() ?
                        <FlatButton label="Logout" icon={<ActionAccountBox />} onClick={Meteor.logout} /> :
                        <FlatButton label="Login" icon={<ActionAccountBox />} linkButton={true} href="/login" />
                    }
                    />
                </header>
                <main>
                    {content}
                </main>
                <footer>
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

export default MainLayout