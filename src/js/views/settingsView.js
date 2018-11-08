import { elements } from './base';


export const renderSoundsPage = () => {
    const markup = `
        <ul id="sounds-list">
            <li class="clear">Clear</li>
            <li class="sci-fi">Sci-Fi</li>
            <li class="8bit">8-bit</li>
        </ul>
    `;
    elements.mainContainer.append(markup);
};

export const renderThemesPage = () => {
    const markup = `
        <ul id="themes-list">
            <li class="heat-map">Heat map</li>
            <li class="graphite">Graphite</li>
            <li class="pretty-princes">Pretty Princes</li>
        </ul>
    `;
    elements.mainContainer.append(markup);
};

export const renderTipsPage = () => {
    const markup = `
        <ul id="tips-list">
            <li class="tutorial">Welcome Tutorial</li>
            <li class="">Click to Add Items</li>
            <li class="">Insert between Items</li>
        </ul>
    `;
    elements.mainContainer.append(markup);
};

export const renderPreferencesPage = () => {
    const markup = `
        <ul id="preferences-list">
            <li class="">iCloud</li>
            <li class="">Menu Bar Icon</li>
            <li class="">Dock Badge</li>
        </ul>
    `;
    elements.mainContainer.append(markup);
};
