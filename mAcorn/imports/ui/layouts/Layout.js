import React from 'react';

import AccountsUIWrapper from '../AccountsUIWrapper.jsx';

// define and export our Layout component
export const Layout = ({content}) => (
    <div>
        <h1>mAcorn</h1>
        <hr />

        <AccountsUIWrapper />

        <hr />
        <div>{content}</div>
    </div>
);