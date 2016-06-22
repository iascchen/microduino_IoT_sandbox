/**
 * Created by chenhao on 16/6/20.
 */
import React from 'react';

import MLed from './../widgets/MLed';
import MOutput from './../widgets/MOutput';

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

export const getSubComponent = (item, options) => {
    switch (item.widget) {
        case "MLed":
            return <MLed {...item} {...options}/>;
        case "MOutput":
            return <MOutput {...item} {...options} />;

        case "MButton":
            return <MButton {...item} {...options} />;
        case "MToggle":
            return <MToggle {...item} {...options} />;
        case "MSlider":
            return <MSlider {...item} {...options} />;
        case "MRangeSlider":
            return <MRangeSlider {...item} {...options} />;
        case "MInput":
            return <MInput {...item} {...options} />;
        case "MColor":
            return <MColor {...item} {...options} />;
        case "MColorChrome":
            return <MColorChrome {...item} {...options} />;
        case "MTimePicker":
            return <MTimePicker {...item} {...options} />;
        case "MDatePicker":
            return <MDatePicker {...item} {...options} />;
        case "MSelector":
            return <MSelector {...item} {...options} />;

        case "MTerminal":
            return <MTerminal {...item} {...options} />;
    }
};

