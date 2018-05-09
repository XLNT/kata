class Code < ApplicationRecord
  belongs_to :token, class_name: :MintableToken
end
