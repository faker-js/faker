# Faker.js
## generate massive amounts of fake data in Node.js and the browser
<img src = "http://imgur.com/KiinQ.png" border = "0">
## USAGE
### browser - 
  
            <script src = "Faker.js" type = "text/javascript"></script>
            <script>
              var randomName = Faker.Name.findName();
            </script>
### node.js - 
            var Faker = require(./Faker);
            var randomName = Faker.Name.findName();
## API
<ul><li>Name<ul><li>findName</li></ul></li><li>Address<ul><li>zipCode</li><li>city</li><li>streetName</li><li>streetAddress</li><li>secondaryAddress</li><li>ukCounty</li><li>ukCountry</li></ul></li><li>PhoneNumber<ul><li>phoneNumber</li></ul></li><li>Internet<ul><li>email</li><li>userName</li><li>domainName</li><li>domainWord</li></ul></li><li>Company<ul><li>companyName</li><li>companySuffix</li><li>catchPhrase</li><li>bs</li></ul></li><li>Lorem<ul><li>words</li><li>sentence</li><li>sentences</li><li>paragraph</li></ul></li><li>Helpers<ul><li>randomNumber</li><li>randomize</li><li>replaceSymbolWithNumber</li><li>shuffle</li></ul></li><li>definitions<ul><li>first_name</li><li>last_name</li><li>name_prefix</li><li>name_suffix</li><li>us_state</li><li>us_state_abbr</li><li>city_prefix</li><li>city_suffix</li><li>street_suffix</li><li>uk_county</li><li>uk_country</li><li>catch_phrase_adjective</li><li>catch_phrase_descriptor</li><li>catch_phrase_noun</li><li>bs_adjective</li><li>bs_buzz</li><li>bs_noun</li><li>domain_suffix</li><li>lorem</li><li>phone_formats</li></ul></li></ul>
## Authors
####Matthew Bergman & Marak Squires 
Heavily inspired by Benjamin Curtis's Ruby Gem [Faker](http://faker.rubyforge.org/) and Perl's [Data::Faker](http://search.cpan.org/~jasonk/Data-Faker-0.07/lib/Data/Faker.pm)