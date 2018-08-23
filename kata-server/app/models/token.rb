class Token < ApplicationRecord
  has_many :codes
  has_one :campaign
  serialize :metadata_cache


  def metadata
    metadata_cache.with_indifferent_access
  end

  def name
    metadata[:name]
  end

  def self.get_info_by_query(query)
    campaign = Campaign.find_by(code: query)
    if campaign
      return {
        campaign: campaign,
        token: campaign.token,
      }.with_indifferent_access
    end

    code = Code.where({
      code: query,
    }).first
    if code
      return {
        code: code,
        token: code.token,
      }.with_indifferent_access
    end

    nil
  end
end
