import $ from 'jquery';
import * as soundsView from './views/soundsView';
import { elements } from './views/base';


const state = {};


$('document').ready(() => {
    // Set event handlers.
    setEventHandlers();
    console.log('ready');
});

function setEventHandlers() {
    console.log('set');

    elements.sounds.click(soundsView.renderSoundsPage);
}





// test
import {str} from './test';
const x = 99;

console.log(`${str}. valuable x is ${x}`);





























