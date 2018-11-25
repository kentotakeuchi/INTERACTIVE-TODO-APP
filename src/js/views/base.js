import $ from 'jquery';

export const elements = {
    mainContainer: $('#main-container'),
    myLists: $('.my-lists'),
    settingsList: $('#settings-list'),
    sounds: $('.sounds'),
    themes: $('.themes'),
    tips: $('.tips-tricks'),
    preferences: $('.preferences'),

    layerNameSettings: $('#layer-name-settings'),
    layerNameLists: $('#layer-name-lists'),
    layerNameListName: $('#layer-name-listName'),
    tutorial: $('.tutorial'),

    listsList: $('#lists-list'),
    listInput: $('.listInput')
};

export const clearPrevPage = () => {
    $('#main-container').children().remove();
};

export const layerNameHandler = (e) => {
    if (e.target.innerText === 'Settings' ||
    $(e.target).parent()[0].id === 'lists-list') {

        elements.layerNameSettings.css('font-weight', 'bold');
        elements.layerNameLists.css('font-weight', 'initial');
        elements.layerNameListName.css('font-weight', 'initial');
        elements.tutorial.css('font-weight', 'initial');

    } else if (e.target.innerText === 'My Lists' || e.target.innerText === 'Lists' ||
    $(e.target).parent()[0].id === 'memo-list') {

        elements.layerNameSettings.css('font-weight', 'initial');
        elements.layerNameLists.css('font-weight', 'bold');
        elements.layerNameListName.css('font-weight', 'initial');
        elements.tutorial.css('font-weight', 'initial');

    } else if (e.target.innerText === 'List name' ||
    e.type === 'singletap') {

        elements.layerNameSettings.css('font-weight', 'initial');
        elements.layerNameLists.css('font-weight', 'initial');
        elements.layerNameListName.css('font-weight', 'bold');
        elements.tutorial.css('font-weight', 'initial');

    } else if (e.target.innerText === 'Tutorial') {

        elements.layerNameSettings.css('font-weight', 'initial');
        elements.layerNameLists.css('font-weight', 'initial');
        elements.layerNameListName.css('font-weight', 'initial');
        elements.tutorial.css('font-weight', 'bold');

    }
};

export const displayModalHandler = () => {
    $(`#tutorialModal`).modal('toggle');
};

export const tutorialCarouselHandler = () => {
    $('.modal-body').carousel('next');
};