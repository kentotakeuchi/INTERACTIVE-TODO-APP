import { elements } from './base';

export const clearPrevPage = () => {
    elements.settingsList.css('display', 'none');
};

export const renderSoundsPage = () => {
    const markup = `
        <ul id="sounds-list">
            <li id="clear">Clear</li>
            <li id="sci-fi">Sci-Fi</li>
            <li id="8bit">8-bit</li>
        </ul>
    `;
    elements.mainContainer.append(markup);
};
