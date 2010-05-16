# Faker.js
## generate massive amounts of fake data in Node.js and the browser

<img src = "http://imgur.com/KiinQ.png" border = "0">


## USAGE


### browser - 
  
      <script src = "Faker.js" type = "text/javascript"></script>
      <script>
        var randomName = Faker.Name.findName(); // Caitlyn Kerluke
        var randomEmail = Faker.Internet.email(); // Rusty@arne.info
        var randomCard = Faker.Helpers.createCard(); // random contact card containing many properties
      </script>

### node.js - 

      var Faker = require('./Faker');

      var randomName = Faker.Name.findName(); // Rowan Nikolaus
      var randomEmail = Faker.Internet.email(); // Kassandra.Haley@erich.biz
      var randomCard = Faker.Helpers.createCard(); // random contact card containing many properties
      

## API

{{{API}}}

## Authors

####Matthew Bergman & Marak Squires 

Heavily inspired by Benjamin Curtis's Ruby Gem [Faker](http://faker.rubyforge.org/) and Perl's [Data::Faker](http://search.cpan.org/~jasonk/Data-Faker-0.07/lib/Data/Faker.pm)