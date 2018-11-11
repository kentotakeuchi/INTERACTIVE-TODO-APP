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
        console.log('addMemo');

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
    }

    updateContent(id, newContent) {
        this.memos.find(el => el.id === id).content = newContent;
    }
}