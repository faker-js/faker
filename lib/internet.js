var Helper = require('../helper');
var definitions = require('./definitions');

exports.email = function() {
	
};

export.userName = function(name) {
	if( typeof name == 'undefined'){ var name = false;}
	if(name) {
		name
	}
	
}
 def email(name = nil)
    [ user_name(name), domain_name ].join('@')
  end
  
  def free_email(name = nil)
    [ user_name(name), %w(gmail.com yahoo.com hotmail.com).rand ].join('@')
  end
  
  def user_name(name = nil)
    return name.scan(/\w+/).shuffle.join(%w(. _).rand).downcase if name
    
    [ 
      Proc.new { Name.first_name.gsub(/\W/, '').downcase },
      Proc.new { 
        [ Name.first_name, Name.last_name ].map {|n| 
          n.gsub(/\W/, '')
        }.join(%w(. _).rand).downcase }
    ].rand.call
  end
  
  def domain_name
    [ domain_word, domain_suffix ].join('.')
  end
  
  def domain_word
    Company.name.split(' ').first.gsub(/\W/, '').downcase
  end
  
  def domain_suffix
    %w(co.uk com us uk ca biz info name).rand
  end