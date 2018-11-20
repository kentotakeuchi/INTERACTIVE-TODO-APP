import $ from 'jquery';
import { elements } from './base';

export const renderLocalStorageData = () => {
    // show update list on UI
    const MemosOfLocalStorage = JSON.parse(localStorage.getItem('memos'));

    // Render "ul" element.
    renderMyListsPage();

    // Render memos from local storage.
    if (MemosOfLocalStorage) {
        MemosOfLocalStorage.forEach(el => {
            renderList(el);
        });
    }
};

export const renderMyListsPage = () => {
    const markup = `
        <ul id="lists-list">

        </ul>
    `;
    elements.mainContainer.append(markup);

    // For setting + cursor on the blank area.
    $(`#main-container`).addClass('plus');
};

export const renderNewInput = (e) => {
    if (e.target === $('#main-container')[0]) {
        const markup = `
            <input class="memoInput" type="text">
        `;
        $('#lists-list').append(markup);

        // Change cursor + into default when there is new input.
        $(`#main-container`).removeClass('plus');

        // Turn off render input & on remove input.
        $('#main-container').off('click', renderNewInput);
        $('#main-container').on('click', removeNewInput);

        // Focus input field automatically when input shows.
        $('.memoInput').focus();
    }
};

export const renderNewInputForEdit = (target) => {
    // MEMO: target.id -> insertAfter(markup) probably.
    const id = target.id;
    const markup = `
        <input class="memoInput" type="text" value="${target.innerText}">
    `;
    $(`#${id}`).after(markup);

    // Focus input field automatically when input shows.
    $('.memoInput').focus();

    // Turn off render input & on remove input.
    $('#main-container').off('click', renderNewInput);
    $('#main-container').on('click', removeNewInputForEdit);
};

export const renderList = memo => {
    const markup = `
        <li id="${memo.id}" class="memo ${memo.complete}">${memo.input}</li>
    `;

    // Check if or not there is class="complete".
    if ($('#lists-list').has('.complete').length > 0) {
        // Insert markup before the first memo with complete class.
        $('.complete').first().before(markup);
    } else {
        $('#lists-list').append(markup);
    }
};

export const removeNewInput = (e) => {
    if (e.target === $('#main-container')[0]) {
        $('.memoInput:last-child').remove();

        // Change cursor default into + when new input is removed.
        $(`#main-container`).addClass('plus');

        // Turn off remove input & on render input.
        $('#main-container').off('click', removeNewInput);
        $('#main-container').on('click', renderNewInput);
    }
};

export const removeNewInputForEdit = (e) => {
    if (e.target === $('#main-container')[0]) {
        $('#main-container').find('input').remove();

        // Detect element which display is none & show it again.
        $('#main-container').find('li').each((index, el) => {
            if (el.style.display === 'none') {
                el.style.display = 'block';
            }
        });

        // Turn off remove input & on render input.
        $('#main-container').off('click', removeNewInputForEdit);
        $('#main-container').off('click', renderNewInput);
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