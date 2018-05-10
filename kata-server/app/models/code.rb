class Code < ApplicationRecord
  belongs_to :token, class_name: :Token
end
