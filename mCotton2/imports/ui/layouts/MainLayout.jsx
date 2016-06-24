import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionAccountBox from 'material-ui/svg-icons/action/account-box';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import IconButton from 'material-ui/IconButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

const lightMuiTheme = getMuiTheme(lightBaseTheme);
const darkMuiTheme = getMuiTheme(darkBaseTheme);

import AccountsUIWrapper from '../AccountsUIWrapper.jsx';

const styles = {
    title: {
        cursor: 'pointer',
    },
};

const handleTouchTap = () => {
    alert('onTouchTap triggered on the title component');
};

const handleHome = () => {
    FlowRouter.go(FlowRouter.path("Home"));
};

const renderHeader = () => {
    return (
        <AppBar
            title="mCotton 2.0"
            onTitleTouchTap={handleTouchTap}
            iconElementLeft={<IconButton onClick={handleHome}><ActionHome /></IconButton>}
            iconElementRight={ <AccountsUIWrapper /> }
        />
    )
};

const renderFooter = () => {
    //return (
    //    <Toolbar float="right">
    //        <ToolbarGroup float="right">
    //            <IconButton><ActionSettings /></IconButton>
    //        </ToolbarGroup>
    //    </Toolbar>
    //)

};

const MainLayout = ({content}) => (
    <div className="main-layout">
        <MuiThemeProvider muiTheme={lightMuiTheme}>
            <div>
                <header>
                    {renderHeader()}
                </header>
                <main>
                    {content}
                </main>
                <footer id="pageFooter">
                    {renderFooter()}
                </footer>
            </div>
        </MuiThemeProvider>
    </div>
)

export default MainLayout
