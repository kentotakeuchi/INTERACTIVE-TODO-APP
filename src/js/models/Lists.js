import uniqid from 'uniqid';
import $ from 'jquery';
import { elements } from '../views/base';


export default class Lists {
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
            input,
            complete: true
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
        this.memos.find(el => el.id === id).input = newInput;

        // Update memo in local storage.
        localStorage.setItem('memos', JSON.stringify(this.memos));
    }

    completeMemo(id) {
        // Add class name "complete" to style completed task.
        this.memos.find(el => el.id === id).complete = 'complete';

        // Move completed task to last index of array.
        const index = this.memos.findIndex(el => el.id === id);
        // Cut the completed task.
        let cut = this.memos.splice(index, 1)[0];
        // Insert cutted task.
        this.memos.splice(this.memos.length, 0, cut);

        // Update memo in local storage.
        localStorage.setItem('memos', JSON.stringify(this.memos));
    }
}