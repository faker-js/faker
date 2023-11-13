//credit : https://github.com/asmarques/pt-id  

function pad(value, length) {
    var result = value + '';
  
    while (result.length < length) {
      result = '0' + result;
    }
  
    return result;
  }
  
  function checkDigit(value) {
    var sum = 0;
    var len = value.length;
  
    for (var i = 0; i < len; i++) {
      sum += value[i] * (len + 1 - i);
    }
  
    var mod = sum % 11;
    return '' + ((mod === 0 || mod === 1) ? 0 : 11 - mod);
  }
  function nif(prefix) {
    var value = pad(Math.floor(Math.random() * 99999999), 8);
  
    if (prefix) {
      value = prefix + value.slice(prefix.length, value.length);
    }
  
    return value + checkDigit(value);
  }
  // personal =  1,2,3
  //company = 5
  
  nif('1');
  export default nif;