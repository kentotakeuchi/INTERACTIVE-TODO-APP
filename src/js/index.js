import $ from 'jquery';
import Lists from './models/Lists';
import * as settingsView from './views/settingsView';
import * as layerView from './views/layerView';
import * as listsView from './views/listsView';
import { elements, clearPrevPage } from './views/base';

const state = {};
const lsMemos = localStorage.getItem('memos');

$('document').ready(() => {
    // Set event handlers.
    setEventHandlers();
    console.log('lsMemo', lsMemos);
});

function setEventHandlers() {
    // Layer list
    elements.layerNameSettings.off('click', layerControl);
    elements.layerNameSettings.on('click', layerControl);
    elements.layerNameLists.off('click', layerControl);
    elements.layerNameLists.on('click', layerControl);
    elements.layerNameListName.off('click', layerControl);
    elements.layerNameListName.on('click', layerControl);

    // Settings page.
    $('.my-lists').off('click', settingsControl);
    $('.my-lists').on('click', settingsControl);
    $('.sounds').off('click', settingsControl);
    $('.sounds').on('click', settingsControl);
    $('.themes').off('click', settingsControl);
    $('.themes').on('click', settingsControl);
    $('.tips-tricks').off('click', settingsControl);
    $('.tips-tricks').on('click', settingsControl);
    $('.preferences').off('click', settingsControl);
    $('.preferences').on('click', settingsControl);

    // Lists page.
    $('#lists-list').off('keypress', '.memoInput', listsControl);
    $('#lists-list').on('keypress', '.memoInput', listsControl);
};


const settingsControl = (e) => {
    console.log(e.target);
    // Prepare UI for each setting page.
    clearPrevPage();

    if (e.target.textContent === 'My Lists') {
        // Render "ul" element.
        listsView.renderMyListsPage();

        // Styling layer name to bold & initial.
        elements.layerNameLists.css('font-weight', 'bold');
        elements.layerNameSettings.css('font-weight', 'initial');

        // Set event for showing input field.
        elements.mainContainer.off('click', listsView.renderNewInput);
        elements.mainContainer.on('click', listsView.renderNewInput);
    } else if (e.target.textContent === 'Sounds') {
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
    // Set event again.
    setEventHandlers();
};


const layerControl = (e) => {
    console.log(e.target);
    // Prepare UI for each layer page.
    clearPrevPage();

    if (e.target.textContent === 'Settings') {
        // Render settings page.
        settingsView.renderSettingsPage();

        // Styling layer name to bold & initial.
        elements.layerNameSettings.css('font-weight', 'bold');
        elements.layerNameLists.css('font-weight', 'initial');

    } else if (e.target.textContent === 'Lists') {
        // Create new lists IF there in none yet
        if (!state.lists) state.lists = new Lists();

        // Render "ul" element.
        listsView.renderMyListsPage(lsMemos);

        // Render memos array.
        state.lists.memos.forEach(el => {
            console.log('el', el);
            listsView.renderList(el);
        })

        // Styling layer name to bold & initial.
        elements.layerNameLists.css('font-weight', 'bold');
        elements.layerNameSettings.css('font-weight', 'initial');

        // Set event for showing input field.
        elements.mainContainer.off('click', listsView.renderNewInput);
        elements.mainContainer.on('click', listsView.renderNewInput);

    } else if (e.target.textContent === 'List name') {
        
    } else if (e.target.textContent === 'tutorial') {
        
    }
    // Set event again.
    setEventHandlers();
};


const listsControl = (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 13) {
        // Create new lists IF there in none yet
        if (!state.lists) state.lists = new Lists();
        console.log('state.lists', state.lists);

        // Get input value.
        const input = $('.memoInput').val();
        console.log('input', input);

        // Add memo into memos array.
        const memo = state.lists.addMemo(input);
        console.log('memo', memo);

        // Render memo on the UI.
        listsView.renderList(memo);

        // Remove input field from UI.
        $(e.target).remove();

    }
};

































