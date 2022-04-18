const StringUtil = {
    convertDateFormat (date, delemiter='-') {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = month >= 10 ? month : '0' + month;
        var day = date.getDate();
        day = day >= 10 ? day : '0' + day;
        return [year, month, day].join('-');
    }
}