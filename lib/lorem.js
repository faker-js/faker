var Helper = require('../helper');
var definitions = require('../lib/definitions');

exports.words = function(num){
	if( typeof num == 'undefined'){ var num = 3;}
  return Helper.shuffle(definitions.lorem).slice(0, num);
  //Words.shuffle[0, num]
};

exports.sentence = function(wordCount){
	if( typeof wordCount == 'undefined'){ var wordCount = 3;}
	
  return  this.words(wordCount + Helper.randomNumber(7)).join(' ').capitalize();
  //words(word_count + rand(6)).join(' ').capitalize + '.'
};

exports.sentences = function(sentenceCount){
  if( typeof sentenceCount == 'undefined'){ var sentenceCount = 3;}
	var sentences = [];
	for(sentenceCount; sentenceCount >= 0; sentenceCount--){
		sentences.push(this.sentence());
	}
  return sentences.join("\n");
};

exports.paragraph = function(sentenceCount){
  if( typeof sentenceCount == 'undefined'){ var sentenceCount = 3;}
	return this.sentences(sentenceCount + Helper.randomNumber(3));
};

exports.sentences = function(paragraphCount){
  if( typeof paragraphCount == 'undefined'){ var paragraphCount = 3;}
	var paragraphs = [];
	for(paragraphCount; paragraphCount >= 0; paragraphCount--){
		paragraphs.push(this.sentence());
	}
  return paragraphs.join("\n \r\t");
};

String.prototype.capitalize = function(){ //v1.0
    return this.replace(/\w+/g, function(a){
        return a.charAt(0).toUpperCase() + a.substr(1).toLowerCase();
    });
};
