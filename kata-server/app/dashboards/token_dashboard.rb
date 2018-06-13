require "administrate/base_dashboard"

class TokenDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    name: Field::String,
    codes: Field::HasMany.with_options(sort_by: :created_at, direction: :desc),
    campaign: Field::HasOne,
    id: Field::Number,
    address: Field::String,
    metadata_cache: Field::String.with_options(searchable: false),
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
    minter: Field::String,
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = [
    :id,
    :name,
    :codes,
    :campaign,
    :address,
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = [
    :codes,
    :campaign,
    :id,
    :address,
    :metadata_cache,
    :created_at,
    :updated_at,
    :minter,
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = [
    :codes,
    :campaign,
    :address,
    :metadata_cache,
    :minter,
  ].freeze

  def display_resource(token)
    token.name
  end
end
