export const DISABLE_SORTED = false;

export class TableData {
    constructor(text, value, align = 'left', sortable = true) {
        this.text = text;
        this.value = value;
        this.sortable = sortable;
        this.align = align;
    }

    static getObjectFromArray(arr){
        return arr.map(e => new TableData(...e));
    }
}