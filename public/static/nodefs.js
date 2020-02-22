/* eslint-disable no-unused-vars */
const fs = require('fs');

let dateStr = '';

// SET DATE
(() => {
    if (!dateStr) {
        dateStr = new Date().toLocaleDateString();
    }
    return dateStr;
})();

const writeDate = (path, data) => {
    fs.writeFileSync(`./data/${path}.json`, JSON.stringify(data), err => {
        if (err) {
            return 'false';
        }
    });
};

// INIT
if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data');
    const subDate = new Date(dateStr);

    subDate.setDate(subDate.getDate() - 1);
    const subDateStr = subDate.toLocaleDateString();
    const defaultObj = {
        'title': 'Java',
        'level': 0,
        'startTime': `${subDateStr.replace(/\//g, '-')}`,
        'preTime': '',
        'nextTime': `${dateStr.replace(/\//g, '-')}`,
        'items': [{ 'title': 'Java基础' }, { 'title': '多线程并发' }, { 'title': '集合' }, { 'title': '异常处理' }, { 'title': '日志处理' }, { 'title': 'JDK8特性' }, { 'title': '反射' }, { 'title': '泛型' }, { 'title': '权限' }]
    };

    writeDate('today', {'data': [], 'preLogInTime': subDateStr});
    writeDate('record', {'data': [defaultObj]});
    writeDate('history', {'data': []});
    writeDate('config', {'color': 'primary', 'theme': 'light'});
}

const readDate = path => JSON.parse(fs.readFileSync(`./data/${path}.json`).toString());

let todayData ;
let recordData ;
let historyData ;
let configData ;

(() => {
    todayData = readDate('today');
    recordData = readDate('record');
    historyData = readDate('history');
    configData = readDate('config');
})();

// INIT EVERYDAY
const initTodayData = (() => {
    if (todayData.preLogInTime !== dateStr) {
        const preData = todayData.data.filter(i => !i.complation);

        todayData.data = recordData.data.filter(i => new Date(i.nextTime) <= new Date());
        todayData.data = todayData.data.map(i => ({
            title: i.title,
            level: i.level,
            count: i.items.length,
            items: i.items.map(t => ({
                title: t.title,
                flag: false
            })),
            complation: ''
        }));
        if (preData.length !== 0) {
            todayData.data.unshift(preData);
        }
        todayData.preLogInTime = dateStr;
        writeDate('today', todayData);
    }
})();
