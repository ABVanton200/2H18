const { Transform } = require('stream');

class Trans extends Transform {
    constructor(opts) {
        super(opts);
        this.contentType = opts['content-type'] || '';
    }

    _transform(data, encoding, callback) {
        let res = '';
           
        if(this.contentType.search('multipart/form-data') !== -1) {
            const boundaryStart = this.contentType.search('boundary=') + 9;
            const boundaryText = this.contentType.substr(boundaryStart);
            const boundaryTextBegin = '--' + boundaryText;
            const boundaryTextEnd = boundaryTextBegin + '--';            

            res = data.toString();
            
            if(res.search(boundaryTextBegin) !== -1) {
                const clearTo = res.search('\n\r\n') + 3;                
                res = res.substr(clearTo);
            }

            if(res.search(boundaryTextEnd) !== -1) {
                const clearFrom = res.search(boundaryTextEnd) - 2;                
                res = res.substr(0, clearFrom);
            }
        } else {
            res = data;
        }

        callback(null, res);
    }
}

module.exports = Trans;
