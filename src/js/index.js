import $ from 'jquery';
import Lists from './models/Lists';
import * as settingsView from './views/settingsView';
import * as layerView from './views/layerView';
import * as listsView from './views/listsView';
import { elements } from './views/base';

const state = {};

$('document').ready(() => {
    // Set event handlers.
    setEventHandlers();
});

function setEventHandlers() {
    // TODO: Fix Not work setHandler after appending markup.
    // elements.sounds.click(settingsControl);
    $('.my-lists').click(listsControl);
    $('.sounds').click(settingsControl);
    $('.themes').click(settingsControl);
    $('.tips-tricks').click(settingsControl);
    $('.preferences').click(settingsControl);
    elements.layerNameSettings.click(layerControl);
    elements.layerNameLists.click(layerControl);
    elements.layerNameListName.click(layerControl);
};

const clearPrevPage = () => {
    elements.mainContainer.children().css('display', 'none');
};

const settingsControl = (e) => {
    console.log(e.target);
    // Prepare UI for each setting page.
    clearPrevPage();

    if (e.target.textContent === 'Sounds') {
        // Render sounds page.
        settingsView.renderSoundsPage();
    } else if (e.target.textContent === 'Themes') {
        // Render themes page.
        settingsView.renderThemesPage();
    } else if (e.target.textContent === 'Tips & Tricks') {
        // Render tips&tricks page.
        settingsView.renderTipsPage();
    } else if (e.target.textContent === 'Preferences') {
        // Render preferences page.
        settingsView.renderPreferencesPage();
    }

};

const layerControl = (e) => {
    console.log(e.target);
    // Prepare UI for each layer page.
    clearPrevPage();

    if (e.target.textContent === 'Settings') {
    // Render settings page.
    layerView.renderSettingsPage();

    // Styling layer name to bold.
    elements.layerNameSettings.css('font-weight', 'bold'); //temp
    }
    // TODO: Avoid to set event too much time.
    setEventHandlers();
};

const listsControl = (e) => {
    console.log(e.target);
    // Prepare UI for lists page.
    clearPrevPage();

    // Create a new lists IF there in none yet.
    if (!state.lists) state.lists = new Lists();

    // Get lists data & Render settings page.
    state.lists.memos.forEach(el => {
        const memo = state.lists.addMemo();
        listsView.renderMyListsPage(memo);
    });
};
































