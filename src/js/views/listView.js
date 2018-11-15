import $ from 'jquery';
import { elements } from './base';

export const renderEachListPage = (target) => {
    console.log('target', target);

    const markup = `
        <ul class="${target.id} memo-list">

        </ul>
    `;
    elements.mainContainer.append(markup);
};

export const renderNewInput = (e) => {
    if (e.target === $('#main-container')[0]) {
        const markup = `
            <input class="memoInput" type="text">
        `;
        $('.memo-list').append(markup);

        // Turn off render input & on remove input.
        $('#main-container').off('click', renderNewInput);
        $('#main-container').on('click', removeNewInput);

        // Focus input field automatically when input shows.
        $('.memoInput').focus();
    }
};

export const renderList = memo => {
    const markup = `
        <li id="${memo.id}" class="memo">${memo.input}</li>
    `;
    $('.memo-list').append(markup);
};
