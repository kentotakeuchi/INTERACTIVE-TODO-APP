import $ from 'jquery';
import { elements } from './base';


export const renderMyListsPage = (memos) => {
    console.log('memos', memos);
    if (memos) {
        const markup = `
            <ul id="lists-list">
                <li>
                    
                </li>
            </ul>
        `;
        elements.mainContainer.append(markup);
    } else {
        const markup = `
            <ul id="lists-list">
                <input class="memoInput" type="text">
            </ul>
        `;
        elements.mainContainer.append(markup);
    }
};

export const renderNewInput = (e) => {
    if (e.target === $('#main-container')[0]) {
        const markup = `
            <input class="memoInput" type="text">
        `;
        $('#lists-list').append(markup);

        // Turn off render input & on remove input.
        $('#main-container').off('click', renderNewInput);
        $('#main-container').on('click', removeNewInput);
    }
};

export const renderList = memo => {
    console.log('render');

    const markup = `
        <li id="${memo.id}">${memo.input}</li>
    `;
    $('#lists-list').append(markup);
};

export const removeNewInput = (e) => {
    if (e.target === $('#main-container')[0]) {
        $('.memoInput:last-child').remove();

        // Turn off remove input & on render input.
        $('#main-container').off('click', removeNewInput);
        $('#main-container').on('click', renderNewInput);
    }
};

export const getInput = () => {
    elements.memoInput.val();
};

export const deleteMemo = id => {
    const memo = $(`[data-memoid="${id}"]`);
    if (memo) memo.remove();
};