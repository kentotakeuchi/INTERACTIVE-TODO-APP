import uniqid from 'uniqid';
import $ from 'jquery';
import { elements } from '../views/base';


export default class List {
    constructor() {
        this.memos = [];
        if (localStorage.getItem('memos')) {
            JSON.parse(localStorage.getItem('memos')).forEach(el => {
                this.memos.push(el);
            });
        }
    }

    addMemo(input) {
        const memo = {
            id: uniqid(),
            input
        }
        this.memos.push(memo);
        localStorage.setItem('memos', JSON.stringify(this.memos));
        return memo;
    }

    deleteMemo(id) {
        const index = this.memos.findIndex(el => el.id === id);
        this.memos.splice(index, 1);

        // Delete clicked memo from local storage.
        localStorage.setItem('memos', JSON.stringify(this.memos));
    }

    updateContent(id, newInput) {
        console.log('id, newInput', id, newInput);

        this.memos.find(el => el.id === id).input = newInput;

        // Update memo in local storage.
        localStorage.setItem('memos', JSON.stringify(this.memos));
    }
}