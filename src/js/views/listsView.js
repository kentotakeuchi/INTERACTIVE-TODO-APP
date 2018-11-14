import $ from 'jquery';
import { elements } from './base';


export const renderMyListsPage = () => {
    const markup = `
        <ul id="lists-list">

        </ul>
    `;
    elements.mainContainer.append(markup);
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

        // Focus input field automatically when input shows.
        $('.memoInput').focus();
    }
};

export const renderNewInputForEdit = (target) => {
    console.log(target);
    const markup = `
        <input class="memoInput" type="text" value="${target.innerText}">
    `;
    $('#lists-list').append(markup);

    // Focus input field automatically when input shows.
    $('.memoInput').focus();

    // Turn off render input & on remove input.
    $('#main-container').off('click', renderNewInput);
    $('#main-container').on('click', removeNewInputForEdit);
};

export const renderList = memo => {
    console.log('memo in renderList', memo);

    const markup = `
        <li id="${memo.id}" class="memo">${memo.input}</li>
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

export const removeNewInputForEdit = (e) => {
    console.log(e.target);

    if (e.target === $('#main-container')[0]) {
        $('.memoInput:last-child').remove();

        // Detect element which display is none & show it again.
        $('#main-container').find('li').each((index, el) => {
            console.log('el', el);
            if (el.style.display === 'none') {
                el.style.display = 'block';
            }
        });

        // Turn off remove input & on render input.
        $('#main-container').off('click', removeNewInputForEdit);
        $('#main-container').on('click', renderNewInput);
    }
};

export const getInput = () => {
    elements.memoInput.val();
};

export const deleteMemo = id => {
    const memo = $(`#${id}`);

    if (memo) memo.remove();
};