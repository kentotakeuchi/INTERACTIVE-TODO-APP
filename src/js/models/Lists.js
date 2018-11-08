import uniqid from 'uniqid';
import { elements } from '../views/base';


export default class Lists {
    constructor() {
        this.memos = [];
    }

    addMemo() {
        const memo = {
            id: uniqid(),
            content: elements.listsInput
        }
        this.memos.push(memo);
        return memo;
    }

    deleteMemmo(id) {
        const index = this.memos.findIndex(el => el.id === id);
        this.memos.splice(index, 1);
    }

    updateContent(id, newContent) {
        this.memos.find(el => el.id === id).content = newContent;
    }
}