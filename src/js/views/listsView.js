import { elements } from './base';


export const renderMyListsPage = memo => {
    const markup = `
        <li data-memoid="${memo.id}">
            <input class="listsInput" value="${memo.content}">
        </li>
    `;
    elements.mainContainer.append(markup); // temp
};

export const deleteMemo = id => {
    const memo = $(`[data-memoid="${id}"]`);
    if (memo) memo.remove();
};