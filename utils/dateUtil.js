const DateUtil = {
    nowdatetime () {
        const date = new Date();
        return this.yyyymmdd(date) + this.hhmmss(date);
    },

    yyyymmdd(date) {
        var mm = date.getMonth() + 1;
        var dd = date.getDate();
      
        return [date.getFullYear(),
                (mm>9 ? '' : '0') + mm,
                (dd>9 ? '' : '0') + dd
               ].join('');
    },
    
    hhmmss(date) {
        var hh = date.getHours();
        var mm = date.getMinutes();
        var ss = date.getSeconds();
      
        return [(hh>9 ? '' : '0') + hh,
                (mm>9 ? '' : '0') + mm,
                (ss>9 ? '' : '0') + ss,
               ].join('');
    }
    
}
module.exports = DateUtil