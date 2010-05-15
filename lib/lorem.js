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
	var sentences = "";
	for(sentenceCount; sentenceCount >= 0; sentenceCount--){
		sentences = sentences + this.sentence();
	}
  return sentences;
}

function paragraph(sentence_count){
  return 'paragraph';
  //sentences(sentence_count + rand(3)).join(' ')
}

function paragraphs(paragraph_count){
 return 'paragraphs';
 /*
      returning([]) do |paragraphs|
        1.upto(paragraph_count) do
          paragraphs << paragraph
 */
}

String.prototype.capitalize = function(){ //v1.0
    return this.replace(/\w+/g, function(a){
        return a.charAt(0).toUpperCase() + a.substr(1).toLowerCase();
    });
};
