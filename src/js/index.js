import $ from 'jquery';
import 'bootstrap';
import * as Hammer from 'hammerjs';
import Lists from './models/Lists';
import * as settingsView from './views/settingsView';
import * as listsView from './views/listsView';
import { elements, clearPrevPage, layerNameHandler, displayModalHandler, tutorialCarouselHandler } from './views/base';

const state = {};

$('document').ready(() => {
    // Get theme user previously set.
    settingsView.currentThemeHandler();

    // Set event handlers.
    setEventHandlers();
});

function setEventHandlers() {
    // Layer list
    elements.layerNameSettings.off('click', layerControl);
    elements.layerNameSettings.on('click', layerControl);
    elements.layerNameLists.off('click', layerControl);
    elements.layerNameLists.on('click', layerControl);
    // elements.layerNameListName.off('click', layerControl);
    // elements.layerNameListName.on('click', layerControl);
    elements.tutorial.off('click', layerControl);
    elements.tutorial.on('click', layerControl);

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

    // List page.
    $('#lists-list').off('keypress', '.listInput', addListHandler);
    $('#lists-list').on('keypress', '.listInput', addListHandler);

    // Memos page.
    $('#memo-list').off('keypress', '.memoInput', addMemoHandler3);
    $('#memo-list').on('keypress', '.memoInput', addMemoHandler3);

    // Sound effect on all <li>.
    $('li').off('click', settingsView.playSound);
    $('li').on('click', settingsView.playSound);
    // TODO: search for better rollover sound.
    // $('li').on('mouseenter', settingsView.playHoverSound);
};


const settingsControl = (e) => {
    // Prepare UI for each setting page.
    clearPrevPage();

    if (e.target.textContent === 'My Lists') {
        // Render new data from local storage.
        listsView.renderLocalStorageData();

        // Set HAMMER.JS event.
        setHammerJs();

        // Styling layer name to bold & initial.
        layerNameHandler(e);

        // Set event for showing input field.
        elements.mainContainer.off('click', listsView.renderNewInput);
        elements.mainContainer.on('click', listsView.renderNewInput);

    } else if (e.target.textContent === 'Sounds') {
        // Render sounds page.
        settingsView.renderSoundsPage();

        setHammerJs2(e);

        // Set event for changing sound.
        $('.clear, .sci-fi, .8bit').off('click', settingsView.changeSounds);
        $('.clear, .sci-fi, .8bit').on('click', settingsView.changeSounds);

    } else if (e.target.textContent === 'Themes') {
        // Render themes page.
        settingsView.renderThemesPage();

        // Set prev page handler.
        setHammerJs2(e);

        // Set event for changing color.
        $('li').off('click', settingsView.changeThemes);
        $('li').on('click', settingsView.changeThemes);

    } else if (e.target.textContent === 'Tips & Tricks') {
        // Render tips&tricks page.
        settingsView.renderTipsPage();

        // Set prev page handler.
        setHammerJs2(e);

        // Set display tutorial modal handler when user click 'Welcome Tutorial'.
        $(`.tutorial`).off('click', displayModalHandler);
        $(`.tutorial`).on('click', displayModalHandler);

        // Set carousel event when user tap 'modal body'.
        setHammerJs3();

    } else if (e.target.textContent === 'Preferences') {
        // Render preferences page.
        settingsView.renderPreferencesPage();

        // Set prev page handler.
        setHammerJs2(e);
    }
    // Set event again.
    setEventHandlers();
};


const layerControl = (e) => {
    // Prepare UI for each layer page.
    clearPrevPage();

    if (e.target.textContent === 'Settings') {
        // Render settings page.
        settingsView.renderSettingsPage();

        // Styling layer name to bold & initial.
        layerNameHandler(e);

    } else if (e.target.textContent === 'Lists') {
        // Render new data from local storage.
        listsView.renderLocalStorageData();

        // Set HAMMER.JS event.
        setHammerJs();

        // Styling layer name to bold & initial.
        layerNameHandler(e);

        // Set event for showing input field.
        elements.mainContainer.off('click', listsView.renderNewInput);
        elements.mainContainer.on('click', listsView.renderNewInput);

    } else if (e.target.textContent === 'List name') {
        // Render new data from local storage.
        listsView.renderLocalStorageData3();

        // Set HAMMER.JS event.

        // Styling layer name to bold & initial.
        layerNameHandler(e);

        // Set event for showing input field.
        elements.mainContainer.off('click', listsView.renderNewInput);
        elements.mainContainer.on('click', listsView.renderNewInput);

    } else if (e.target.textContent === 'Tutorial') {
        // Set carousel event when user tap 'modal body'.
        setHammerJs3();

        // Toggle modal.
        $(`#tutorialModal`).modal('toggle');

        // Render settings page.
        settingsView.renderSettingsPage();

        // Bold layer name.
        elements.layerNameSettings.css('font-weight', 'bold');
        elements.layerNameLists.css('font-weight', 'initial');
        elements.layerNameListName.css('font-weight', 'initial');
    }
    // Set event again.
    setEventHandlers();
};

// Lists -> Settings
function prevPageHandler(e) {
    // Prepare for rendering prev page.
    clearPrevPage();

    if ($(e.target).parent()[0].id === 'lists-list') {
        // Render settings page.
        settingsView.renderSettingsPage();

        // Styling layer name to bold & initial.
        layerNameHandler(e);
    }
    // Set event again.
    setEventHandlers();
};

// Sounds, Themes, Tips, Preferences -> Settings
function prevPageHandler2(e) {
    const id = e.target.id;
    console.log('id', id);

    // Prepare for rendering prev page.
    clearPrevPage();

    if (id === 'sounds-list' ||
        id === 'themes-list' ||
        id === 'tips-list' ||
        id === 'preferences-list') {
         // Render sounds page.
        settingsView.renderSettingsPage();
    }
    // Set event again.
    setEventHandlers();
};

// Layer3 -> Layer2
function prevPageHandler3(e) {
    // Prepare for rendering prev page.
    clearPrevPage();

    if ($(e.target).parent()[0].id === 'memo-list') {
        // Render settings page.
        listsView.renderLocalStorageData();

        // Styling layer name to bold & initial.
        layerNameHandler(e);
    }
    // Set event again.
    setEventHandlers();
    // Set HAMMER.JS event.
    setHammerJs();
}

/*******************
 * Layer 2
 **********/

const addListHandler = (e) => {
    if (e.keyCode === 13) {
        // Create new lists IF there in none yet
        if (!state.lists) state.lists = new Lists();

        // Get input value.
        const input = $('.listInput').val();

        // Add memo into memos array.
        const memo = state.lists.addList2(input);

        // Render memo on the UI.
        listsView.renderList(memo);

        // Remove input field from UI.
        $(e.target).remove();

        // Set event again.
        setEventHandlers();
        // Set HAMMER.JS event for created memo.
        setHammerJs();
    }
};


function removeListHandler(e) {
    e.preventDefault();

    if (e.type === 'quadrupletap') {
        // Create new lists IF there in none yet
        if (!state.lists) state.lists = new Lists();

        // Get id of clicked memo.
        const id = e.target.id;

        // Delete clicked memo from the memos array.
        state.lists.deleteList2(id);

        // Delete clicked memo from UI.
        listsView.deleteMemo(id);
    }
};


function editListHandler(e) {
    e.preventDefault();

    // Check whether "input" field has already existed or not.
    // And remove current input & show hidden memo.
    if ($('#lists-list').has('input').length > 0) {
        $('input').remove();
        $('.memo:hidden').show();
    }

    if (e.type === 'doubletap') {
        const target = e.target;

        // Create new lists IF there in none yet
        if (!state.lists) state.lists = new Lists();

        // Get id of double clicked memo.
        const id = e.target.id;

        // Hide tapped memo list.
        $(`#${id}`).hide();

        // show input fields with prev value.
        listsView.renderNewInputForEdit(target);

        // Turn off the event to avoid event conflict.
        $('#lists-list').off('keypress', '.listInput', addListHandler);
        // Set the event of press enter key.
        $('#lists-list').on('keypress', '.listInput', updateListHandler);
    }
}


// Update memo when user presses enter key.
function updateListHandler(e) {
    if (e.keyCode === 13) {
        const id = e.target.previousElementSibling.id;

        // Get updated input value.
        const newInput = e.target.value;

        // user press enter -> update data
        state.lists.updateList2(id, newInput);

        // Prepare for rendering updated memos.
        clearPrevPage();

        // Render new data from local storage.
        listsView.renderLocalStorageData();

        // Set HAMMER.JS event.
        setHammerJs();

        // Turn off the event to avoid event conflict.
        $('#lists-list').off('keypress', '.listInput', updateListHandler);
        // Set the event of press enter key.
        $('#lists-list').on('keypress', '.listInput', addListHandler);
    }
}


// Completed memo handler when user triple taps a memo.
function completeListHandler(e) {
    const id = e.target.id;

    if ($(`#${id}`).hasClass('complete')) return;

    if (e.type === 'tripletap') {
        // Prepare UI for each layer page.
        clearPrevPage();

        // Create new lists IF there in none yet
        if (!state.lists) state.lists = new Lists();

        // Style memo which is completed task.
        $(`#${id}`).addClass('complete');

        // Move completed task to bottom of list.
        $(`#${id}`).insertAfter(`.memo:last`);

        // Update data.
        state.lists.completeList2(id);

        // Render new data from local storage.
        listsView.renderLocalStorageData();

        // Set HAMMER.JS event.
        setHammerJs();
        // Set event again.
        setEventHandlers();
    }
};

/*******************
 * Layer 3
 **********/

 // Layer2 -> Layer3
function changeToMemoHandler(e) {
    // Get id for setHammerJs4(id).
    const id = e.target.id;

    // Prepare UI for each layer page.
    clearPrevPage();

    // Render new data from local storage.
    listsView.renderLocalStorageData3(e);

    // Styling layer name to bold & initial.
    layerNameHandler(e);

    // Set event for showing input field.
    elements.mainContainer.off('click', listsView.renderNewInput3);
    elements.mainContainer.on('click', listsView.renderNewInput3);

    // Set event again.
    setEventHandlers();
    // Set hammer event for layer3.
    setHammerJs4(id);
};

const addMemoHandler3 = (e) => {
    // Get parent id for addMemo(input, id) & setHammerJs4(id).
    const parentID = e.target.parentElement.className;

    if (e.keyCode === 13) {
        // Create new lists IF there in none yet
        if (!state.lists) state.lists = new Lists();

        // Get input value.
        const input = $('.memoInput').val();

        // Add memo into memos array.
        const memo = state.lists.addMemo3(input, parentID);

        // Render memo on the UI.
        listsView.renderMemo3(memo);

        // Remove input field from UI.
        $(e.target).remove();

        // Set event again.
        setEventHandlers();
        // Set HAMMER.JS event for created memo.
        setHammerJs4(parentID);
    }
};

function removeMemoHandler3(e) {
    e.preventDefault();
    // Get parent id for deleteMemo(id, parentID).
    const parentID = e.target.parentElement.className;

    if (e.type === 'quadrupletap') {
        // Create new lists IF there in none yet
        if (!state.lists) state.lists = new Lists();

        // Get id of clicked memo.
        const id = e.target.id;

        // Delete clicked memo from the memos array.
        state.lists.deleteMemo3(id, parentID);

        // Delete clicked memo from UI.
        listsView.deleteMemo(id);
    }
};

// NEXT TASK!!! -> EDIT -> UPDATE -> COMPLETE
function editMemoHandler3(e) {
    e.preventDefault();

    // Check whether "input" field has already existed or not.
    // And remove current input & show hidden memo.
    if ($('#memo-list').has('input').length > 0) {
        $('input').remove();
        $('.memo:hidden').show();
    }

    if (e.type === 'doubletap') {
        const target = e.target;

        // Create new lists IF there in none yet
        if (!state.lists) state.lists = new Lists();

        // Get id of double clicked memo.
        const id = e.target.id;

        // Hide tapped memo list.
        $(`#${id}`).hide();

        // show input fields with prev value.
        listsView.renderNewInputForEdit3(target);

        // Turn off the event to avoid event conflict.
        $('#memo-list').off('keypress', '.memoInput', addMemoHandler3);
        // Set the event of press enter key.
        $('#memo-list').on('keypress', '.memoInput', updateMemoHandler3);
    }
};


// Update memo when user presses enter key.
function updateMemoHandler3(e) {
    console.log('e', e);

    if (e.keyCode === 13) {
        // Get parent id for updateMemo3(id, newInput, parentID) & setHammerJs4(parentID).
        const parentID = e.target.parentElement.className;
        // Get id of hidden memo.
        const id = e.target.previousElementSibling.id;

        // Get updated input value.
        const newInput = e.target.value;

        // user press enter -> update data
        state.lists.updateMemo3(id, newInput, parentID);

        // Prepare for rendering updated memos.
        clearPrevPage();

        // Render new data from local storage.
        listsView.renderLocalStorageData3(e);

        // Set HAMMER.JS event.
        setHammerJs4(parentID);

        // Turn off the event to avoid event conflict.
        $('#memo-list').off('keypress', '.memoInput', updateMemoHandler3);
        // Set the event of press enter key.
        $('#memo-list').on('keypress', '.memoInput', addMemoHandler3);
    }
};

// Completed memo handler when user triple taps a memo.
function completeMemoHandler3(e) {
    // Get parent id for setHammerJs4(parentID).
    const parentID = e.target.parentElement.className;
    const id = e.target.id;

    if ($(`#${id}`).hasClass('complete')) return;

    if (e.type === 'tripletap') {
        // Prepare UI for each layer page.
        clearPrevPage();

        // Create new lists IF there in none yet
        if (!state.lists) state.lists = new Lists();

        // Style memo which is completed task.
        $(`#${id}`).addClass('complete');

        // Move completed task to bottom of list.
        $(`#${id}`).insertAfter(`.memo:last`);

        // Update data.
        state.lists.completeMemo3(id, parentID);

        // Render new data from local storage.
        listsView.renderLocalStorageData3(e);

        // Set event again.
        setEventHandlers();
        // Set HAMMER.JS event.
        setHammerJs4(parentID);
    }
};





// TODO: Seperate this function from index.js.
// Hammer.js event handler for "Layer2".
function setHammerJs() {
    const MemosOfLocalStorage = JSON.parse(localStorage.getItem('lists'));

    let memos = [];
    if (MemosOfLocalStorage) {
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
        const tripleTap = new Hammer.Tap({ event: 'tripletap', taps: 3 });
        const dblTap = new Hammer.Tap({ event: 'doubletap', taps: 2 });
        const singleTap = new Hammer.Tap({ event: 'singletap' });
        const panRight = new Hammer.Pan({
            event: 'panright',
            direction: Hammer.DIRECTION_RIGHT,
            threshold: 50
        });
        const panUp = new Hammer.Pan({
            event: 'panup',
            direction: Hammer.DIRECTION_UP,
            threshold: 50
        });

        // add the recognizer
        mc.forEach(el => {
            el.add(quadrupleTap);
            el.add(tripleTap);
            el.add(dblTap);
            el.add(singleTap);
            el.add(panRight);
            el.add(panUp);
            // we want to recognize this simulatenous, so a quadrupletap will be detected even while a tap has been recognized.
            el.get('quadrupletap').recognizeWith(['tripletap', 'doubletap', 'singletap']);
            el.get('tripletap').recognizeWith(['doubletap', 'singletap']);
            el.get('doubletap').recognizeWith('singletap');
            // we only want to trigger a tap, when we don't have detected a doubletap
            el.get('tripletap').requireFailure('quadrupletap');
            el.get('doubletap').requireFailure(['tripletap', 'quadrupletap']);
            el.get('singletap').requireFailure(['doubletap', 'tripletap', 'quadrupletap']);
            el.get('panup').requireFailure('panright');
            el.get('panright').requireFailure('panup');

            // subscribe to events
            el.on('quadrupletap', removeListHandler);
            el.on('tripletap', completeListHandler);
            el.on('doubletap', editListHandler);
            el.on('singletap', changeToMemoHandler);
            // el.on('panright', removeListHandler);
            el.on('panup', prevPageHandler);
        });
    }
}

// Hammer.js event handler for "Layer3".
function setHammerJs4(parentID) {
    const MemosOfLocalStorage = JSON.parse(localStorage.getItem('lists'));
    const index = MemosOfLocalStorage.findIndex(el => el.id === parentID);

    let memos = [];
    if (MemosOfLocalStorage[index].memos) {
        MemosOfLocalStorage[index].memos.forEach(el => {
            let els = document.getElementById(`${el.id}`);
            memos.push(els);
        });
        console.log('memos', memos);

        // create a manager for that element
        let mc = [];
        memos.forEach(el => {
            let hm = new Hammer.Manager(el);
            mc.push(hm);
        });

        // create a recognizer
        const quadrupleTap = new Hammer.Tap({ event: 'quadrupletap', taps: 4 });
        const tripleTap = new Hammer.Tap({ event: 'tripletap', taps: 3 });
        const dblTap = new Hammer.Tap({ event: 'doubletap', taps: 2 });
        const singleTap = new Hammer.Tap({ event: 'singletap' });
        const panRight = new Hammer.Pan({
            event: 'panright',
            direction: Hammer.DIRECTION_RIGHT,
            threshold: 50
        });
        const panUp = new Hammer.Pan({
            event: 'panup',
            direction: Hammer.DIRECTION_UP,
            threshold: 50
        });

        // add the recognizer
        mc.forEach(el => {
            el.add(quadrupleTap);
            el.add(tripleTap);
            el.add(dblTap);
            el.add(singleTap);
            el.add(panRight);
            el.add(panUp);
            // we want to recognize this simulatenous, so a quadrupletap will be detected even while a tap has been recognized.
            el.get('quadrupletap').recognizeWith(['tripletap', 'doubletap', 'singletap']);
            el.get('tripletap').recognizeWith(['doubletap', 'singletap']);
            el.get('doubletap').recognizeWith('singletap');
            // we only want to trigger a tap, when we don't have detected a doubletap
            el.get('tripletap').requireFailure('quadrupletap');
            el.get('doubletap').requireFailure(['tripletap', 'quadrupletap']);
            el.get('singletap').requireFailure(['doubletap', 'tripletap', 'quadrupletap']);
            el.get('panup').requireFailure('panright');
            el.get('panright').requireFailure('panup');

            // subscribe to events
            el.on('quadrupletap', removeMemoHandler3);
            el.on('tripletap', completeMemoHandler3);
            el.on('doubletap', editMemoHandler3);
            // el.on('singletap', changeToMemoHandler);
            // el.on('panright', removeMemoHandler);
            el.on('panup', prevPageHandler3);
        });
    }
}

// Hammer.js event handler for "Settings layer".
function setHammerJs2(e) {
    const text = e.target.innerText;

    const panUp = new Hammer.Pan({
        event: 'panup',
        direction: Hammer.DIRECTION_UP,
        threshold: 50
    });

    if (text === 'Sounds') {
        const soundsList = document.getElementById(`sounds-list`);

        const sounds = new Hammer.Manager(soundsList);

        sounds.add(panUp);

        sounds.on('panup', prevPageHandler2);
    } else if (text === 'Themes') {
        const themesList = document.getElementById(`themes-list`);

        const themes = new Hammer.Manager(themesList);

        themes.add(panUp);

        themes.on('panup', prevPageHandler2);
    }else if (text === 'Tips & Tricks') {
        const tipsList = document.getElementById(`tips-list`);

        const tips = new Hammer.Manager(tipsList);

        tips.add(panUp);

        tips.on('panup', prevPageHandler2);
    } else if (text === 'Preferences') {
        const preferencesList = document.getElementById(`preferences-list`);

        const preferences = new Hammer.Manager(preferencesList);

        preferences.add(panUp);

        preferences.on('panup', prevPageHandler2);
    }
};

// Hammer.js event handler for "Tutorial".
function setHammerJs3() {
    const singleTap = new Hammer.Tap({ event: 'singletap' });

    const carousel = document.querySelector(`.carousel-inner`);

    const tutorial = new Hammer.Manager(carousel);

    tutorial.add(singleTap);

    tutorial.off('singletap', tutorialCarouselHandler);
    tutorial.on('singletap', tutorialCarouselHandler);
};




































