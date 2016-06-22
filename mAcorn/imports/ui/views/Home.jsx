/**
 * Created by chenhao on 16/6/7.
 */

import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import DevicesList from '../components/lists/DevicesList.jsx';
import DeviceRulesList from '../components/lists/DeviceRulesList.jsx';

export const Home = () => (
    <Row>
        <Col xs={12} sm={6}>
            <DevicesList />
        </Col>
        <Col xs={12} sm={6}>
            <DeviceRulesList />
        </Col>
    </Row>
);