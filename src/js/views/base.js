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
    memoInput: $('.memoInput')
};

export const clearPrevPage = () => {
    $('#main-container').children().remove();
};

export const tutorialModal = () => {
    const markup = `
        <div class="modal" tabindex="-1" role="dialog" id="modalOfTutorial">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                    <p>Modal body text goes here.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    $('body').append(markup);
}

export const layerNameHandler = (e) => {
    console.log('e', e);
    if (e.target.innerText === 'Settings') {
        elements.layerNameSettings.css('font-weight', 'bold');
        elements.layerNameLists.css('font-weight', 'initial');
        elements.layerNameListName.css('font-weight', 'initial');
    } else if (e.target.innerText === 'My Lists' || e.target.innerText === 'Lists') {
        elements.layerNameSettings.css('font-weight', 'initial');
        elements.layerNameLists.css('font-weight', 'bold');
        elements.layerNameListName.css('font-weight', 'initial');
    } else if (e.target.innerText === 'List name' || e.type === 'singletap') {
        elements.layerNameSettings.css('font-weight', 'initial');
        elements.layerNameLists.css('font-weight', 'initial');
        elements.layerNameListName.css('font-weight', 'bold');
    }
}