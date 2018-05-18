class Token < ApplicationRecord
  has_many :codes
  has_one :campaign


  def metadata
    metadata_cache.with_indifferent_access
  end

  def self.find_by_query(query)
    campaign = Campaign.find_by(code: query)
    if campaign
      return campaign.token
    end

    code = Code.where({
      code: query,
      consumed: false,
    }).first
    if code
      return code.token
    end

    nil
  end
end
