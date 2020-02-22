// 获取今天时间2020-02-02
export function getSimpleTodayTime(date = new Date()) {
    return date.toLocaleDateString().replace(/\//g, '-');
}

// 获得两个时间的天数差
export function subtract() {
}

// 获取指定天数后的日期
export function getTimeByDate(day, dateStr) {
    const date = dateStr ? new Date(dateStr) : new Date();

    date.setDate(date.getDate() + day);

    return getSimpleTodayTime(date);
}