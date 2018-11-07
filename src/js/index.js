import $ from 'jquery';
import * as soundsView from './views/soundsView';
import { elements } from './views/base';

const state = {};

$('document').ready(() => {
    // Set event handlers.
    setEventHandlers();
});

function setEventHandlers() {
    elements.sounds.click(soundsControl);
}

const soundsControl = () => {
    console.log('click');

    // Prepare UI for sounds page.
    soundsView.clearPrevPage();

    // Render sounds page.
    soundsView.renderSoundsPage();
}

































