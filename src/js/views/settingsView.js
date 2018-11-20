import $ from 'jquery';
import { elements } from './base';

/**********************
 * Change page
 **********************/
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

    // For removing + cursor other than 2 and 3 layers.
    $(`#main-container`).removeClass('plus');
};

export const renderSoundsPage = () => {
    const markup = `
        <ul id="sounds-list">
            <li class="clear">Clear</li>
            <li class="sci-fi">
                <audio class="audio2">
                    <source src="./audio/sci-fi.mp3"  type="audio/mpeg">
                </audio>
                Sci-Fi</li>
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
            <li class="lucky-clover">Lucky Clover</li>
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

/**********************
 * Change sound
 **********************/
export const changeSounds = (e) => {
    const sound = e.target.innerText;
    const audioPlay = $('.audio2')[0].play();
    console.log($('.audio2')[0]);
    console.log(audioPlay);

    if (sound === 'Clear') {
        const audio = new Audio('');
        audio.play();
    } else if (sound === 'Sci-Fi') {
        if (audioPlay !== undefined) {
            audioPlay.then(() => {
              // Automatic playback started!
            })
            .catch(error => {
              // Automatic playback failed.
              // Show a UI element to let the user manually start playback.
            });
        }
    } else if (sound === '8-bit') {
        const audio = new Audio('');
        audio.play();
    }
}

/**********************
 * Change color
 **********************/
export const changeThemes = (e) => {
    const color = e.target.innerText;
    if (color === 'Heat map') {
        $('#main-container').css(`background-image`, `linear-gradient(
            to top,
            rgb(255, 247, 0),
            rgb(255, 0, 0))`);
    } else if (color === 'Graphite') {
        $('#main-container').css(`background-image`, `linear-gradient(
            to top,
            rgb(207, 206, 218),
            rgb(87, 87, 92))`);
    } else if (color === 'Pretty Princes') {
        $('#main-container').css(`background-image`, `linear-gradient(
            to top,
            rgb(255, 194, 216),
            rgb(255, 0, 128))`);
    } else if (color === 'Lucky Clover') {
        $('#main-container').css(`background-image`, `linear-gradient(
            to top,
            rgb(220, 226, 100),
            rgb(83, 223, 2))`);
    }
}