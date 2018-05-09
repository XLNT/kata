class MintableToken < ApplicationRecord
  has_many :codes


  def metadata
    metadata_cache.with_indifferent_access
  end
end
