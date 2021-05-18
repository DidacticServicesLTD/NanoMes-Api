import { v4 as uuidv4 } from 'uuid';

var _helpers = {
    uidGenerator : () => {
        return uuidv4();
    },
    
    deepClone : (obj) => {
        return JSON.parse(JSON.stringify(obj));
    },

    //unused
    strToColorHex : (str = ``) => {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
          hash = str.charCodeAt(i) + ((hash << 9) - hash);
        }
        var color = '#';
        for (var i = 0; i < 3; i++) {
          var value = (hash >> (i * 8)) & 0xFF;
          color += ('00' + value.toString(16)).substr(-2);
        }
        return color;
    }
}

export { _helpers }