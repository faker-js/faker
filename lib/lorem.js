var Helper = require('../helper');
var definitions = require('../lib/definitions');

function words(num){
  return Helper.shuffle(lorem);
  //Words.shuffle[0, num]
}

function sentence(word_count){
  return 'sentences';
  //words(word_count + rand(6)).join(' ').capitalize + '.'
}

function sentences(sentence_count){
  
  return 'sentences';
  /*  
    returning([]) do |sentences|
        1.upto(sentence_count) do
          sentences << sentence
        end
  */

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


console.log(paragraph());
console.log(paragraphs());
console.log(sentence());
console.log(sentences());
console.log(words());
