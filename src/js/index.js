import $ from 'jquery';
import * as Hammer from 'hammerjs';
import * as jHammer from 'jquery-hammerjs';
import Lists from './models/Lists';
import * as settingsView from './views/settingsView';
import * as listsView from './views/listsView';
import { elements, clearPrevPage } from './views/base';

const state = {};

$('document').ready(() => {
    // Set event handlers.
    setEventHandlers();
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
        const MemosOfLocalStorage = JSON.parse(localStorage.getItem('memos'));
        // Render "ul" element.
        listsView.renderMyListsPage();

        // Render memos from local storage.
        if (MemosOfLocalStorage) {
            MemosOfLocalStorage.forEach(el => {
                listsView.renderList(el);
            });
        }

        // Set HAMMER.JS event.
        setHammerJs();

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
        // Render "ul" element.
        listsView.renderMyListsPage();

        // Render memos from local storage.
        const MemosOfLocalStorage = JSON.parse(localStorage.getItem('memos'));
        if (MemosOfLocalStorage) {
            MemosOfLocalStorage.forEach(el => {
                listsView.renderList(el);
            });
        }

        // Set HAMMER.JS event.
        setHammerJs();

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

        // Add memo into memos array.
        const memo = state.lists.addMemo(input);

        // Render memo on the UI.
        listsView.renderList(memo);

        // TODO
        // Add new input value to local storage.
        const MemosOfLocalStorage = JSON.parse(localStorage.getItem('memos'));
        if (MemosOfLocalStorage) {
            MemosOfLocalStorage.push(memo);
        }

        // Remove input field from UI.
        $(e.target).remove();

    }
    // Set event again.
    setEventHandlers();
    // Set HAMMER.JS event for created memo.
    setHammerJs();
};

function removeMemoHandler(e) {
    e.preventDefault();

    if (e.type === 'quadrupletap') {
        console.log('removeMemoHandler', e.type);
        // Create new lists IF there in none yet
        if (!state.lists) state.lists = new Lists();

        // Get id of clicked memo.
        const id = e.target.id;

        // Delete clicked memo from the memos array.
        state.lists.deleteMemo(id);

        // Delete clicked memo from UI.
        listsView.deleteMemo(id);
    }
}

function editMemoHandler(e) {
    console.log('e.target', e.target);

    e.preventDefault();

    if (e.type === 'doubletap') {
        console.log('editMemoHandler', e.type);
        const target = e.target;

        // Create new lists IF there in none yet
        if (!state.lists) state.lists = new Lists();

        // Get id of double clicked memo.
        const id = e.target.id;

        // Hide tapped memo list & show input fields with prev value.
        $(`#${id}`).hide();
        listsView.renderNewInputForEdit(target);
    }
}

function changeToEachListHandler(e) {
    e.preventDefault();

    if (e.type === 'singletap') {
        console.log('changeToEachListHandler', e.type);
    }
}

function setHammerJs() {
    const MemosOfLocalStorage = JSON.parse(localStorage.getItem('memos'));

    let memos = [];
    MemosOfLocalStorage.forEach(el => {
        let els = document.getElementById(`${el.id}`);
        memos.push(els);
    });

    // create a manager for that element
    let mc = [];
    memos.forEach(el => {
        let hm = new Hammer.Manager(el);
        mc.push(hm);
    });

    // create a recognizer
    const quadrupleTap = new Hammer.Tap({ event: 'quadrupletap', taps: 4 });
    const dblTap = new Hammer.Tap({ event: 'doubletap', taps: 2 });
    const singleTap = new Hammer.Tap({ event: 'singletap' });

    // add the recognizer
    mc.forEach(el => {
        el.add(quadrupleTap);
        el.add(dblTap);
        el.add(singleTap);
        // we want to recognize this simulatenous, so a quadrupletap will be detected even while a tap has been recognized.
        el.get('quadrupletap').recognizeWith(['doubletap', 'singletap']);
        el.get('doubletap').recognizeWith('singletap');
        // we only want to trigger a tap, when we don't have detected a doubletap
        el.get('doubletap').requireFailure('quadrupletap');
        el.get('singletap').requireFailure(['doubletap', 'quadrupletap']);

        // subscribe to events
        el.on('quadrupletap', removeMemoHandler);
        el.on('doubletap', editMemoHandler);
        el.on('singletap', changeToEachListHandler);
    });
}



































