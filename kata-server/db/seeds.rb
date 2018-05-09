# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

mt1 = MintableToken.create({
  address: '0x1',
  metadata_cache: {
    name: 'my name',
    description: 'my description',
    image: 'test image'
  }
})

mt2 = MintableToken.create({
  address: '0x2',
  metadata_cache: {
    name: 'my name',
    description: 'my description',
    image: 'test image'
  }
})

Campaign.create({
  token: mt1,
  code: 'test-code'
})

Code.create({
  token: mt2,
  code: 'test-code-1'
})