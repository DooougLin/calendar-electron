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

const writeDate = (fileName, data) => {
    fs.writeFileSync(`./data/${fileName}.json`, JSON.stringify(data), err => {
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

    const deadline = new Date(dateStr);

    deadline.setDate(deadline.getDate() + 1);

    const defaultInterviewObj = {
        favorite: true,
        company: '阿里巴巴',
        result: '已面',
        addr: '阿里巴巴西溪园区1号楼',
        type: '面试',
        time: subDate.getTime(),
        date: dateStr,
        dateTime: `${subDate.getHours()}:${subDate.getMinutes()}`,
        note: 'http://note.youdao.com/noteshare?id=24395ccc86944c4dc808c86c122f2074',
        remake: '嘻嘻嘻嘻嘻嘻嘻'
    };

    writeDate('today', {'data': [], 'preLogInTime': subDateStr});
    writeDate('record', {'data': [defaultObj]});
    writeDate('history', {'data': []});
    writeDate('interview', {'data': [defaultInterviewObj]});
    writeDate('config', {'color': 'primary', 'theme': 'light', 'star': 0, 'navigation': false});
}

const readDate = path => JSON.parse(fs.readFileSync(`./data/${path}.json`).toString());

let todayData ;
let recordData ;
let interviewData ;
let historyData ;
let configData ;

(() => {
    todayData = readDate('today');
    recordData = readDate('record');
    historyData = readDate('history');
    configData = readDate('config');
    interviewData = readDate('interview');
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
