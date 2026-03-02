// network.js


window.Network = {

    dropRate: 0.1,   
    minDelay: 1000,  
    maxDelay: 3000,  

   
    send: function(fxhr) {
        const delay1 = Network._randomDelay();

       
        setTimeout(function() {

          
            if (Network._shouldDrop()) {
                const delay2 = Network._randomDelay();
                setTimeout(function() {
                    fxhr._triggerError('Network error — message dropped');
                }, delay2);
                return;
            }

          
            const server = Network._route(fxhr._url);
            if (!server) {
                fxhr._triggerError('Network error — unknown destination');
                return;
            }

        
            const request = {
                method:  fxhr._method,
                url:     fxhr._url,
                headers: fxhr._headers,
                body:    JSON.parse(fxhr._body)
            };
            const response = server.handle(request);

          
            const delay2 = Network._randomDelay();
            setTimeout(function() {

           
                if (Network._shouldDrop()) {
                    fxhr._triggerError('Network error — response dropped');
                    return;
                }

                fxhr._triggerLoad(response);

            }, delay2);

        }, delay1);
    },



    _randomDelay: function() {
        return Network.minDelay + Math.random() * (Network.maxDelay - Network.minDelay);
    },

    _shouldDrop: function() {
        return Math.random() < Network.dropRate;
    },

    
    _route: function(url) {
        if (url.startsWith('/users/'))    return UsersServer;
        if (url.startsWith('/contacts'))  return DataServer;
        return null;
    }
};
