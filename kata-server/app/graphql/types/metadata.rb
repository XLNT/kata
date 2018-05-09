Types::Metadata = GraphQL::ObjectType.define do
  name 'Metadata'

  field :name, !types.String, hash_key: :name
  field :description, !types.String, hash_key: :description
  field :image, !types.String, hash_key: :image
end