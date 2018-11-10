import { elements } from './base';

export const renderSettingsPage = () => {
    const markup = `
        <ul id="settings-list">
            <li class="my-lists">My Lists</li>
            <li class="sounds">Sounds</li>
            <li class="themes">Themes</li>
            <li class="tips-tricks">Tips & Tricks</li>
            <li class="preferences">Preferences</li>
        </ul>
    `;
    elements.mainContainer.append(markup);
};