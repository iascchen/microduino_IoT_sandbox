/**
 * Created by chenhao on 16/6/7.
 */

import React from 'react';
import DevicesList from '../components/lists/DevicesList.jsx';
import DeviceRulesList from '../components/lists/DeviceRulesList.jsx';

export const DeviceRuleEditor = () => (
    <div>
        <DevicesList />
        <DeviceRulesList />
    </div>
);