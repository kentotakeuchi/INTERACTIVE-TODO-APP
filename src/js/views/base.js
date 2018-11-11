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

    listsList: $('#lists-list'),
    memoInput: $('.memoInput')
};

export const clearPrevPage = () => {
    $('#main-container').children().remove();
};