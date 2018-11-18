import $ from 'jquery';
import 'bootstrap';
import * as Hammer from 'hammerjs';
import Lists from './models/Lists';
import List from './models/List';
import * as settingsView from './views/settingsView';
import * as listsView from './views/listsView';
import * as listView from './views/listView';
import { elements, clearPrevPage, tutorialModal, layerNameHandler } from './views/base';

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
        layerNameHandler(e);

        // Set event for showing input field.
        elements.mainContainer.off('click', listsView.renderNewInput);
        elements.mainContainer.on('click', listsView.renderNewInput);
    } else if (e.target.textContent === 'Sounds') {
        // Render sounds page.
        settingsView.renderSoundsPage();

        // TODO: Should not repeat the code.
        // Set event for changing sound.
        $('.clear').off('click', settingsView.changeSounds);
        $('.clear').on('click', settingsView.changeSounds);
        $('.sci-fi').off('click', settingsView.changeSounds);
        $('.sci-fi').on('click', settingsView.changeSounds);
        $('.8bit').off('click', settingsView.changeSounds);
        $('.8bit').on('click', settingsView.changeSounds);
    } else if (e.target.textContent === 'Themes') {
        // Render themes page.
        settingsView.renderThemesPage();

        // TODO: Should not repeat the code.
        // Set event for changing color.
        $('.heat-map').off('click', settingsView.changeThemes);
        $('.heat-map').on('click', settingsView.changeThemes);
        $('.graphite').off('click', settingsView.changeThemes);
        $('.graphite').on('click', settingsView.changeThemes);
        $('.pretty-princes').off('click', settingsView.changeThemes);
        $('.pretty-princes').on('click', settingsView.changeThemes);
        $('.lucky-clover').off('click', settingsView.changeThemes);
        $('.lucky-clover').on('click', settingsView.changeThemes);
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

        // TODO: Add function and put on the view.js.
        // Styling layer name to bold & initial.
        layerNameHandler(e);

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
        layerNameHandler(e);

        // Set event for showing input field.
        elements.mainContainer.off('click', listsView.renderNewInput);
        elements.mainContainer.on('click', listsView.renderNewInput);

    } else if (e.target.textContent === 'List name') {
        // Styling layer name to bold & initial.
        layerNameHandler(e);
    } else if (e.target.textContent === 'Tutorial') {
        // Show tutorial modal.
        // $('#modalOfTutorial').modal('toggle');

        // Styling layer name to bold & initial.
        layerNameHandler(e);
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

    if (e.type === 'panright') {
        console.log('removeMemoHandler', e.type);
        // Create new lists IF there in none yet
        if (!state.lists) state.lists = new Lists();

        // Get id of clicked memo.
        const id = e.target.id;
        console.log('id', id);

        // Delete clicked memo from the memos array.
        state.lists.deleteMemo(id);

        // Delete clicked memo from UI.
        listsView.deleteMemo(id);
    }
}

function editMemoHandler(e) {
    e.preventDefault();

    // Check whether "input" field has already existed or not.
    // And remove current input & show hidden memo.
    if ($('#lists-list').has('input').length > 0) {
        $('input').remove();
        $('.memo:hidden').show();
    }

    if (e.type === 'doubletap') {
        console.log('editMemoHandler', e.type);
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
        $('#lists-list').off('keypress', '.memoInput', listsControl);
        // Set the event of press enter key.
        $('#lists-list').on('keypress', '.memoInput', updateMemo);
    }
}

// Update memo when user presses enter key.
function updateMemo(e) {
    console.log('e.target', e.target);

    if (e.keyCode === 13) {
        console.log('updateMemo');
        const id = e.target.previousElementSibling.id;
        console.log('id', id);

        // Get updated input value.
        const newInput = e.target.value;
        console.log('newInput', newInput);

        // user press enter -> update data
        state.lists.updateContent(id, newInput);

        // Prepare for rendering updated memos.
        clearPrevPage();

        // show update list on UI
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
    }
}

// NEXT TASK!!!
function changeToEachListHandler(e) {
    e.preventDefault();

    if (!$('#lists-list').has('input').length > 0) {
        if (e.type === 'singletap') {
            console.log('changeToEachListHandler', e.type);
            // Prepare for rendering updated memos.
            clearPrevPage();

            const target = e.target;

            // Render "ul" element.
            listView.renderEachListPage(target);

            // Render memos from local storage.
            const MemosOfLocalStorage = JSON.parse(localStorage.getItem('memos'));
            console.log('MemosOfLocalStorage', MemosOfLocalStorage);

            if (MemosOfLocalStorage) {
                MemosOfLocalStorage.forEach(el => {
                    listView.renderList(el);
                });
            }

            // Set HAMMER.JS event.
            setHammerJs();

            // Styling layer name to bold & initial.
            layerNameHandler(e);

            // Set event for showing input field.
            elements.mainContainer.off('click', listView.renderNewInput);
            elements.mainContainer.on('click', listView.renderNewInput);
        }
    }
}

















// TODO: Seperate this function from index.js.
// Hammer.js event handler.
function setHammerJs() {
    const MemosOfLocalStorage = JSON.parse(localStorage.getItem('memos'));

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
            el.add(dblTap);
            el.add(singleTap);
            el.add(panRight);
            el.add(panUp);
            // we want to recognize this simulatenous, so a quadrupletap will be detected even while a tap has been recognized.
            el.get('quadrupletap').recognizeWith(['doubletap', 'singletap']);
            el.get('doubletap').recognizeWith('singletap');
            // we only want to trigger a tap, when we don't have detected a doubletap
            el.get('doubletap').requireFailure('quadrupletap');
            el.get('singletap').requireFailure(['doubletap', 'quadrupletap']);
            el.get('panup').requireFailure('panright');
            el.get('panright').requireFailure('panup');

            // subscribe to events
            // el.on('quadrupletap', removeMemoHandler);
            el.on('doubletap', editMemoHandler);
            el.on('singletap', changeToEachListHandler);
            el.on('panright', removeMemoHandler);
            el.on('panup', testPanUp);
        });
    }
}

function testPanRight(e) {
    console.log(e.target);
    
    console.log(e.type);
    
}
function testPanUp(e) {
    console.log(e.target);

    console.log(e.type);
    
}



































