// fajax.js


class FXMLHttpRequest {
    constructor() {
        this.readyState   = 0;
        this.status       = 0;
        this.responseText = '';
        this.onload       = null;
        this.onerror      = null;

        
        this._method  = null;
        this._url     = null;
        this._headers = {};
        this._body    = null;
    }

 
    open(method, url) {
        this._method    = method;
        this._url       = url;
        this.readyState = 1;
    }

   
    setRequestHeader(key, value) {
        this._headers[key] = value;
    }


    send(data) {
        this._body      = JSON.stringify(data !== null && data !== undefined ? data : null);
        this.readyState = 2;
        Network.send(this);
    }

    
    _triggerLoad(response) {
        this.readyState   = 4;
        this.status       = response.status;
        this.responseText = JSON.stringify(response.body);
        if (typeof this.onload === 'function') {
            this.onload();
        }
    }

   
    _triggerError(reason) {
        this.readyState   = 4;
        this.status       = 0;
        this.responseText = '';
        if (typeof this.onerror === 'function') {
            this.onerror({ message: reason });
        }
    }
}
