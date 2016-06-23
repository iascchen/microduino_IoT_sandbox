/**
 * Created by chenhao on 16/6/20.
 */
import React from 'react';

import MLed from './../widgets/MLed';
import MOutput from './../widgets/MOutput';

import MLabel from './../widgets/MLabel';
import MButton from './../widgets/MButton';
import MToggle from './../widgets/MToggle';
import MSlider from './../widgets/MSlider';
import MRangeSlider from './../widgets/MRangeSlider';
import MInput from './../widgets/MInput';
import MSelector from './../widgets/MSelector';
import MColor from './../widgets/MColor';
import MColorChrome from './../widgets/MColorChrome';
import MTimePicker from './../widgets/MTimePicker';
import MDatePicker from './../widgets/MDatePicker';

import MTerminal from './../widgets/MTerminal';

export const WidgetList = [
    ///////////////////////
    // Output

    {
        title: "Led", widget: "MLed", image: "url", type: "o", cols: 1, rows: 2
    },
    {
        title: "Output", widget: "MOutput", image: "url", type: "o", cols: 4, rows: 2
    },

    ///////////////////////
    // Input
    {
        title: "Label", widget: "MLabel", image: "url", type: "i", cols: 2, rows: 1
    },
    {
        title: "Button", widget: "MButton", image: "url", type: "i", cols: 1, rows: 2
    },
    {
        title: "Toggle", widget: "MToggle", image: "url", type: "i", cols: 1, rows: 2
    },
    {
        title: "Input", widget: "MInput", image: "url", type: "i", cols: 4, rows: 1
    },
    {
        title: "Slider", widget: "MSlider", image: "url", type: "i", cols: 4, rows: 1
    },
    {
        title: "Range Slider", widget: "MRangeSlider", image: "url", type: "i", cols: 4, rows: 1
    },
    {
        title: "Time", widget: "MTimePicker", image: "url", type: "i", cols: 4, rows: 1
    },
    {
        title: "Date", widget: "MDatePicker", image: "url", type: "i", cols: 4, rows: 1
    },
    {
        title: "Color(Simple)", widget: "MColor", image: "url", type: "i", cols: 4, rows: 2
    },
    {
        title: "Color(Complex)", widget: "MColorChrome", image: "url", type: "i", cols: 4, rows: 4
    },
    {
        title: "Selector", widget: "MSelector", image: "url", type: "i", cols: 4, rows: 1
    },

    ///////////////////////
    // Input / Output

    {
        title: "Terminal", widget: "MTerminal", image: "url", type: "io", cols: 4, rows: 4
    },
]

////////////////////////////////////////////
// TODO : after add new widgets, MUST add some code in here

export const getSubComponent = (props) => {
    if (!props.widget) {
        return;
    }

    switch (props.widget.widget) {
        case "MLed":
            return <MLed {...props}/>;
        case "MOutput":
            return <MOutput {...props} />;

        case "MLabel":
            return <MLabel {...props}/>;
        case "MButton":
            return <MButton {...props} />;
        case "MToggle":
            return <MToggle {...props} />;
        case "MSlider":
            return <MSlider {...props} />;
        case "MRangeSlider":
            return <MRangeSlider {...props} />;
        case "MInput":
            return <MInput {...props} />;
        case "MColor":
            return <MColor {...props} />;
        case "MColorChrome":
            return <MColorChrome {...props} />;
        case "MTimePicker":
            return <MTimePicker {...props} />;
        case "MDatePicker":
            return <MDatePicker {...props} />;
        case "MSelector":
            return <MSelector {...props} />;

        case "MTerminal":
            return <MTerminal {...props} />;
    }
};

