import uniqid from 'uniqid';
import $ from 'jquery';
import { elements } from '../views/base';


export default class Lists {
    constructor() {
        this.lists = [];
        if (localStorage.getItem('lists')) {
            JSON.parse(localStorage.getItem('lists')).forEach(el => {
                this.lists.push(el);
            });
        }
    }

    /*******************
     * Layer 2
     **********/

    addList2(input) {
        const list = {
            id: uniqid(),
            input,
            complete: 'no',
            memos: []
        }
        const index = this.lists.findIndex(el => el.complete === 'complete');
        this.lists.splice(index, 0, list);

        localStorage.setItem('lists', JSON.stringify(this.lists));
        return list;
    }

    deleteList2(id) {
        const index = this.lists.findIndex(el => el.id === id);
        this.lists.splice(index, 1);

        // Delete clicked memo from local storage.
        localStorage.setItem('lists', JSON.stringify(this.lists));
    }

    updateList2(id, newInput) {
        this.lists.find(el => el.id === id).input = newInput;

        // Update memo in local storage.
        localStorage.setItem('lists', JSON.stringify(this.lists));
    }

    completeList2(id) {
        // Add class name "complete" to style completed task.
        this.lists.find(el => el.id === id).complete = 'complete';

        // Move completed task to last index of array.
        const index = this.lists.findIndex(el => el.id === id);
        // Cut the completed task.
        let cut = this.lists.splice(index, 1)[0];
        // Insert cutted task.
        this.lists.splice(this.lists.length, 0, cut);

        // Update memo in local storage.
        localStorage.setItem('lists', JSON.stringify(this.lists));
    }

    /*******************
     * Layer 3
     **********/

    addMemo3(input, id) {
        const memo = {
            id: uniqid(),
            input,
            complete: 'no',
        }
        const index = this.lists.findIndex(el => el.id === id);
        console.log('this.lists[index].memos', this.lists[index].memos);

        this.lists[index].memos.push(memo);

        localStorage.setItem('lists', JSON.stringify(this.lists));
        return memo;
    }

    deleteMemo3(id, parentID) {
        // Get layer2's(list) index.
        const parentIndex = this.lists.findIndex(el => el.id === parentID);
        // Get layer3's(memo) index.
        const index = this.lists[parentIndex].memos.findIndex(el => el.id === id);

        // Delete tapped memo from array.
        this.lists[parentIndex].memos.splice(index, 1);

        // Delete clicked memo from local storage.
        localStorage.setItem('lists', JSON.stringify(this.lists));
    }

    updateMemo3(id, newInput) {
        this.lists[n][memos].find(el => el.id === id).input = newInput;

        // Update memo in local storage.
        localStorage.setItem('lists', JSON.stringify(this.lists));
    }

    completeMemo3(id) {
        // Add class name "complete" to style completed task.
        this.lists[n][memos].find(el => el.id === id).complete = 'complete';

        // Move completed task to last index of array.
        const index = this.lists[n][memos].findIndex(el => el.id === id);
        // Cut the completed task.
        let cut = this.lists[n][memos].splice(index, 1)[0];
        // Insert cutted task.
        this.lists[n][memos].splice(this.lists[n][memos].length, 0, cut);

        // Update memo in local storage.
        localStorage.setItem('lists', JSON.stringify(this.lists));
    }

}