import $ from 'jquery';
import { elements } from './base';

/**********************
 * CHANGE PAGE
 **********************/
export const renderSettingsPage = () => {
    const markup = `
        <ul id="settings-list">
            <audio class="audio0">
                <source src="./audio/hover_1.mp3" type="audio/mpeg">
            </audio>
            <audio class="audio1">
                <source src="./audio/click_1.mp3" type="audio/mpeg">
            </audio>
            <audio class="audio2">
                <source src="./audio/click_2.mp3" type="audio/mpeg">
            </audio>
            <audio class="audio4">
                <source src="./audio/click_4.mp3" type="audio/mpeg">
            </audio>
            <li class="my-lists">My Lists</li>
            <li class="sounds">Sounds</li>
            <li class="themes">Themes</li>
            <li class="tips-tricks">Tips & Tricks</li>
            <li class="preferences">Preferences</li>
        </ul>
    `;
    elements.mainContainer.append(markup);

    // For removing + cursor.
    $(`#main-container`).removeClass('plus');
};

export const renderSoundsPage = () => {
    const markup = `
        <ul id="sounds-list">
            <li class="clear">
                <audio class="audio1">
                    <source src="./audio/click_1.mp3" type="audio/mpeg">
                </audio>
                Clear</li>
            <li class="sci-fi">
                <audio class="audio2">
                    <source src="./audio/click_2.mp3" type="audio/mpeg">
                </audio>
                Sci-Fi</li>
            <li class="8bit">
                <audio class="audio4">
                    <source src="./audio/click_4.mp3" type="audio/mpeg">
                </audio>
                8-bit</li>
        </ul>
    `;
    elements.mainContainer.append(markup);
};

export const renderThemesPage = () => {
    const markup = `
        <ul id="themes-list">
            <audio class="audio0">
                <source src="./audio/hover_1.mp3" type="audio/mpeg">
            </audio>
            <audio class="audio1">
                <source src="./audio/click_1.mp3" type="audio/mpeg">
            </audio>
            <audio class="audio2">
                <source src="./audio/click_2.mp3" type="audio/mpeg">
            </audio>
            <audio class="audio4">
                <source src="./audio/click_4.mp3" type="audio/mpeg">
            </audio>
            <li>Heat map</li>
            <li>Graphite</li>
            <li>Pretty Princes</li>
            <li>Lucky Clover</li>
        </ul>
    `;
    elements.mainContainer.append(markup);
};

export const renderTipsPage = () => {
    const markup = `
        <ul id="tips-list">
            <audio class="audio0">
                <source src="./audio/hover_1.mp3" type="audio/mpeg">
            </audio>
            <audio class="audio1">
                <source src="./audio/click_1.mp3" type="audio/mpeg">
            </audio>
            <audio class="audio2">
                <source src="./audio/click_2.mp3" type="audio/mpeg">
            </audio>
            <audio class="audio4">
                <source src="./audio/click_4.mp3" type="audio/mpeg">
            </audio>
            <li class="tutorial">Welcome Tutorial</li>
            <li class="addTip">Click to Add Items</li>
            <li class="renameTip">Rename a List or Item</li>
            <li class="compTip">Complete a List or Item</li>
            <li class="deleteTip">Delete a List or Item</li>
            <li class="prevTip">Up One Level</li>
        </ul>
    `;
    elements.mainContainer.append(markup);
};

export const renderPreferencesPage = () => {
    const markup = `
        <ul id="preferences-list">
            <audio class="audio0">
                <source src="./audio/hover_1.mp3" type="audio/mpeg">
            </audio>
            <audio class="audio1">
                <source src="./audio/click_1.mp3" type="audio/mpeg">
            </audio>
            <audio class="audio2">
                <source src="./audio/click_2.mp3" type="audio/mpeg">
            </audio>
            <audio class="audio4">
                <source src="./audio/click_4.mp3" type="audio/mpeg">
            </audio>
            <li class="">iCloud</li>
            <li class="">Menu Bar Icon</li>
            <li class="">Dock Badge</li>
        </ul>
    `;
    elements.mainContainer.append(markup);
};

/**********************
 * CHANGE SOUND
 **********************/

export const changeSounds = (e) => {
    const target = e.target;
    const sound = e.target.innerText;

    if (sound === 'Clear') {
        const audioPlay1 = $('.audio1')[0].play();

        if (audioPlay1 !== undefined) {
            audioPlay1.then(() => {
              // Automatic playback started!
            })
            .catch(error => {
              // Automatic playback failed.
              // Show a UI element to let the user manually start playback.
            });
        }
    } else if (sound === 'Sci-Fi') {
        const audioPlay2 = $('.audio2')[0].play();

        if (audioPlay2 !== undefined) {
            audioPlay2.then(() => {
              // Automatic playback started!
            })
            .catch(error => {
              // Automatic playback failed.
              // Show a UI element to let the user manually start playback.
            });
        }
    } else if (sound === '8-bit') {
        const audioPlay4 = $('.audio4')[0].play();

        if (audioPlay4 !== undefined) {
            audioPlay4.then(() => {
              // Automatic playback started!
            })
            .catch(error => {
              // Automatic playback failed.
              // Show a UI element to let the user manually start playback.
            });
        }
    }
    const curSound = $(target).find(`audio`).attr(`class`);
    localStorage.setItem('sound', curSound);
};

export const playSound = () => {

    const curSound = localStorage.getItem('sound');

    const audioPlay = $(`.${curSound}`)[0].play();

    if (audioPlay !== undefined) {
        audioPlay.then(() => {
          // Automatic playback started!
        })
        .catch(error => {
          // Automatic playback failed.
          // Show a UI element to let the user manually start playback.
        });
    }
};

export const playHoverSound = () => {
    console.log('playHoverSound');

    const audioPlay = $(`.audio0`)[0].play();
    console.log('audioPlay', audioPlay);

    if (audioPlay !== undefined) {
        audioPlay.then(() => {
          // Automatic playback started!
        })
        .catch(error => {
          // Automatic playback failed.
          // Show a UI element to let the user manually start playback.
        });
    }
};

/**********************
 * CHANGE COLOR
 **********************/
export const changeThemes = (e) => {
    const color = e.target.innerText;
    if (color === 'Heat map') {
        $(`#main-container`).removeAttr('class').addClass('heat-map');
    } else if (color === 'Graphite') {
        $(`#main-container`).removeAttr('class').addClass('graphite');
    } else if (color === 'Pretty Princes') {
        $(`#main-container`).removeAttr('class').addClass('pretty-princes');
    } else if (color === 'Lucky Clover') {
        $(`#main-container`).removeAttr('class').addClass('lucky-clover');
    }

    // Store the data of theme user set to persist it after loading.
    const curColor = $(`#main-container`).attr(`class`);
    localStorage.setItem('theme', curColor);
};

// Get theme user previously set.
export const currentThemeHandler = () => {
    const curColor = localStorage.getItem('theme');
    if (curColor) {
        $(`#main-container`).removeAttr('class').addClass(curColor);
    }
};

/**********************
 * DISPLAY MODAL
 **********************/

// Tutorial modal.
export const displayModalHandler = (e) => {
    console.log('e', e);
    const target = e.target.className;

    if (target === 'tutorial') {
        $(`#tutorialModal`).modal('toggle');
    } else if (target === 'addTip') {
        $(`#addTipModal`).modal('toggle');
    } else if (target === 'renameTip') {
        $(`#renameTipModal`).modal('toggle');
    } else if (target === 'compTip') {
        $(`#compTipModal`).modal('toggle');
    } else if (target === 'deleteTip') {
        $(`#deleteTipModal`).modal('toggle');
    } else if (target === 'prevTip') {
        $(`#prevTipModal`).modal('toggle');
    }
};

export const tutorialCarouselHandler = () => {
    $('.modal-body').carousel('next');
};

