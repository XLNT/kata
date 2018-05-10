class Token < ApplicationRecord
  has_many :codes
  has_one :campaign


  def metadata
    metadata_cache.with_indifferent_access
  end
end
