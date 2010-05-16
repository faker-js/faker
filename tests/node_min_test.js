var sys = require('sys');


var Faker = require('../Faker');

sys.puts(JSON.stringify(Faker));

sys.puts(JSON.stringify(Faker.Name.findName()));
sys.puts(JSON.stringify(Faker.Address.zipCode()));
sys.puts(JSON.stringify(Faker.Address.secondaryAddress()));
sys.puts(JSON.stringify(Faker.Address.city()));
sys.puts(JSON.stringify(Faker.Address.streetName()));
sys.puts(JSON.stringify(Faker.Address.streetAddress()));
sys.puts(JSON.stringify(Faker.Address.streetAddress(true)));
sys.puts(JSON.stringify(Faker.Address.ukCountry()));
sys.puts(JSON.stringify(Faker.Address.ukCounty()));
sys.puts(JSON.stringify(Faker.PhoneNumber.phoneNumber()));
sys.puts(JSON.stringify(Faker.Internet.userName()));
sys.puts(JSON.stringify(Faker.Internet.email()));
sys.puts(JSON.stringify(Faker.Internet.domainName()));
sys.puts(JSON.stringify(Faker.Company.companyName()));
sys.puts(JSON.stringify(Faker.Company.catchPhrase()));
sys.puts(JSON.stringify(Faker.Company.bs()));
sys.puts(JSON.stringify(Faker.Lorem.words()));
sys.puts(JSON.stringify(Faker.Lorem.sentence()));
sys.puts(JSON.stringify(Faker.Lorem.sentences()));
sys.puts(JSON.stringify(Faker.Lorem.paragraph()));





