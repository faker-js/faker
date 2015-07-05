Tinytest.add 'faker - should exist', ->
  expect(faker).to.be.an('object')
  expect(faker.name).to.be.an('object')
  expect(faker.name.firstName).to.be.a('function')
  expect(faker.name.firstName()).to.be.a('string').that.is.ok
