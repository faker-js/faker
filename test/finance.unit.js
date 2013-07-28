if (typeof module !== 'undefined') {
    var assert = require('assert');
    var sinon = require('sinon');
    var Faker = require('../index');
}


describe('finance.js', function () {
	describe('account( length )', function(){
		
		it('should supply a default length if no length is passed', function(){
			
			var account = Faker.Finance.account();
			
			var expected = 8;
			var actual = account.length;
			
			assert.equal(actual, expected, 'The expected default account length is ' + expected + ' but it was ' + actual);
			
		});
		
		it('should supply a length if a length is passed', function(){
			
			var expected = 9; 
			
			var account = Faker.Finance.account(expected);
			
			var actual = account.length;
			
			assert.equal(actual, expected, 'The expected default account length is ' + expected + ' but it was ' + actual);
			
		});
		
		it('should supply a default length if a zero is passed', function(){
			
			var expected = 8; 
			
			var account = Faker.Finance.account(0);
			
			var actual = account.length;
			
			assert.equal(actual, expected, 'The expected default account length is ' + expected + ' but it was ' + actual);
			
		});
		
	});
	
	describe('accountName()', function(){
		
		it("should return an account name", function() {
			
			var actual = Faker.Finance.accountName();
			
			assert.ok(actual);
			
		});
		
	});
	
	
	describe('mask( length, parens, elipsis )', function(){
		it("should set a default length", function() {
			
			var expected = 4; //default account mask length
			
			var mask = Faker.Finance.mask(null, false, false);
			
			var actual = mask.length;
			
			assert.equal(actual, expected, 'The expected default mask length is ' + expected + ' but it was ' + actual);
			
		});
		
		it("should set a specified length", function() {
			
			var expected = Faker.random.number(20);
			
			var mask = Faker.Finance.mask(expected, false, false);
			
			var actual = mask.length;
			
			assert.equal(actual, expected, 'The expected default mask length is ' + expected + ' but it was ' + actual);
			
		});
		
		it("should by default include parentheses around a partial account number", function() {
			
			var expected = true; 
			
			var mask = Faker.Finance.mask(null, null, false);
			
			var regexp = new RegExp(/(\(\d{4}?\))/);
			var actual = regexp.test(mask);
			
			assert.equal(actual, expected, 'The expected match for parentheses is ' + expected + ' but it was ' + actual);
			
		});
		
		it("should by default include an elipsis", function() {
			
			var expected = true; 
			
			var mask = Faker.Finance.mask(null, false, null);
			
			var regexp = new RegExp(/(\.\.\.\d{4})/);
			var actual = regexp.test(mask);
			
			assert.equal(actual, expected, 'The expected match for parentheses is ' + expected + ' but it was ' + actual);
			
		});
		
		it("should work when random variables are passed into the arguments", function() {
			
			// var length = Faker.random.number(20);
// 			var elipsis = (length % 2 === 0) ? true : false;
// 			var parens = !elipsis;
// 			
// 			var expectedElipsis = new RegExp(/(\.\.\.)/);
// 			var expectedParens = new RegExp(/(\(\d{}?\))/); 
// 			var expectedRegex = 0;
			
			
		});
		
		
	});
	
	describe('amount(min, max, dec, symbol)', function(){
		
		it("should work when passing in nothing", function() {
			var amount = Faker.Finance.amount();
			
			assert.ok(amount);
		});
		
		
	});
	
	describe('transactionType()', function(){
		
		
	});
});