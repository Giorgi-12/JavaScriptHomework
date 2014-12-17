(function(window, document) {

    var jQClone = function(selector, context) {
        if (selector !== undefined) {
            if (context === undefined)
                context = document;
            var elems = context.querySelectorAll(selector);
            for(var i = 0; i < elems.length; i++)
                this.push(elems[i]);
        }
    };

    jQClone.prototype = Array.prototype;

    jQClone.prototype.first = function() {
        var result  = new jQClone();
        if(this.length > 0){
            var elem = this[0];
            result.push(elem);
        }
        return result;
    };

    jQClone.prototype.last = function() {
        var result  = new jQClone();
        if(this.length > 0){
            var elem =  this[this.length - 1];
            result.push(elem);
        }
        return result;
    };

    jQClone.prototype.each = function(callback) {
        for(var i = 0; i < this.length; i++){
            callback(this[i], i);
        }
        return this;
    };

    jQClone.prototype.find = function(elem) {
        var result = new jQClone();
        for(var i = 0; i < this.length; i++){
            var elems = this[i].querySelectorAll(elem);
            for(var i = 0; i < elems.length; i++)
                result.push(elems[i]);
        }
        return result;
    };

    jQClone.prototype.hasClass = function(className) {
        if (document.body.classList) {
            if(this.length > 0){
                var elem = this[0];
                return elem.classList.contains(className);
            }
        } else {// className is the only option for us :(

        }
        return false;
    };

    jQClone.prototype.addClass = function(className) {
        if (document.body.classList) {
            if(this.length > 0){
                var elem = this[0];
                var res = className.split(" ");
                for(var i = 0; i < res.length; i++)
                    elem.classList.add(res[i]);
            }
        } else {// className is the only option for us :(

        }
        return this;
    };

    jQClone.prototype.removeClass = function(className) {
        if (document.body.classList) {
            if(this.length > 0){
                var elem = this[0];
                var res = className.split(" ");
                for(var i = 0; i < res.length; i++)
                    elem.classList.remove(res[i]);
            }
        } else {// className is the only option for us :(

        }
        return this;
    };

    jQClone.prototype.toggleClass = function(className) {
        if (document.body.classList) {
            if(this.length > 0){
                var elem = this[0];
                var res = className.split(" ");
                for(var i = 0; i < res.length; i++)
                    elem.classList.toggle(res[i]);
            }
        } else {// className is the only option for us :(

        }
        return this;
    };

    jQClone.prototype.attr = function(atrributeName, value) {
        if(this.length > 0){
            var elem = this[0];
            if(value === undefined) {
                return elem.getAttribute(atrributeName);
            } else { // update or assign value
                if(typeof atrributeName === 'string') {
                    for(var i = 0; i < this.length; i++){
                        var curr = this[i];
                        curr.setAttribute(atrributeName , value)
                    }
                }else{
                    for(var i = 0; i < this.length; i++){
                        var curr = this[i];
                        for(var key in atrributeName) {
                            curr.setAttribute(key , atrributeName[key]);
                        }
                    }
                }
                return this;
            }
        }
        return undefined;
    };


    jQClone.prototype.css = function(property, value) {
        if(this.length > 0){
            var elem = this[0];
            if (value === undefined) {
                if (typeof property === 'string') {
                    var val = elem.style[property];
                    if (!val) {
                        val = getComputedStyle(elem)[property];
                    }
                    return val;
                } else if(Array.isArray(property)){
                    var arr = [];
                    for (var i = 0; i < property.length; i++)
                        arr.push(this.css(property[i]));
                    return arr;
                } else {
                    for( var key in property){
                        this.css(key, property[key]);
                    }
                    return this;
                }
            } else {
                for(var i=0; i< this.length; i++) {
                    var curr = this[i];
                    curr.style[property] = value;
                }
                return this;
            }
        }
        return undefined;
    };


    jQClone.prototype.data = function(key, value) {
        if(this.length > 0){
            var elem = this[0];
            if(value === undefined && key === undefined){
                return elem.dataset;
            }else if(value === undefined){
                if(typeof key === 'string'){
                    return elem.dataset[key];
                }else {
                    for( var k in key){
                        this.data(k, key[k]);
                    }
                    return this;
                }
            }else {
                for (var i=0; i<this.length; i++){
                    var curr = this[i];
                    curr.dataset[key] = value;
                }
                return this;
            }
        }
        return undefined;
    };

    jQClone.prototype.on = function(event, handler) {
        if(this.length > 0){
            var elem = this[0];
            if(handler === undefined){
                elem[event]();
            } else {
                for(var i=0; i< this.length; i++) {
                    var curr = this[i];
                    curr.addEventListener(event, handler);
                }
            }
            return this;
        }
        return undefined;
    };

    jQClone.prototype.html = function(content) {
        if(this.length > 0){
            var elem = this[0];
            if(content === undefined){
                return elem.innerHTML;
            } else {
                for (var i = 0; i < this.length; i++) {
                    var curr = this[i];
                    curr.innerHTML = content;
                }
                return this;
            }
        }
        return undefined;
    };


    jQClone.prototype.append = function(content) {
        if(this.length > 0){
            var elem = this[0];

            for (var i = 0; i < this.length; i++) {
                var curr = this[i];
                if(typeof content === 'string'){
                    curr.innerHTML += content;
                }else{
                    curr.appendChild(content.cloneNode(true));
                }
            }
            return this;
        }
        return undefined;
    };

    jQClone.prototype.prepend = function(content) {
        if(this.length > 0){
            var elem = this[0];

            for (var i = 0; i < this.length; i++) {
                var curr = this[i];
                if(typeof content === 'string'){
                    curr.innerHTML = content + curr.innerHTML;
                }else{
                    curr.insertBefore(content.cloneNode(true), curr.firstChild);
                }
            }
            return this;
        }
        return undefined;
    };

    jQClone.prototype.empty = function() {
        if(this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                var curr = this[i];
                while(curr.childNodes.length > 0) {
                    curr.removeChild(curr.firstChild);
                }
            }
            return this;
        }
        return undefined;
    };

    var ajax = function(arg) {
        this.request = undefined;
        if (typeof arg === 'string') {
            this.request = new XMLHttpRequest();
            this.request.open('GET', arg, true);
            this.request.send();
        }
    };

    ajax.prototype.done = function(callback) {
        this.request.addEventListener('load', callback, true);
    };

    ajax.prototype.error = function(callback) {
        this.request.addEventListener('fail', callback, true);
    };

    window.jQClone = function(selector, context) {
        return new jQClone(selector, context);
    };
    window.$ = window.jQClone;
    window.$.ajax = function(arg) {
        return new ajax(arg);
    };
})(window, document);
