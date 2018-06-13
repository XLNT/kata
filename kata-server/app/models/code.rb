class Code < ApplicationRecord
  belongs_to :token, class_name: :Token
  before_create :generate_at_p

  MAX_PLANET_ID = 2 ** (4 * 8) - 1
  # ^ 4 bytes

private

  def generate_at_p()
    begin
      self.key = rand(0..MAX_PLANET_ID)
    end while self.class.exists?(key: key)
    self.code = AtP.toPlanet([key])[0]
  end
end
