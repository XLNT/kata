KataServerSchema = GraphQL::Schema.define do
  mutation Types::MutationType
  query Types::QueryType
  # subscription Types::Subscription
end

GraphQL::Errors.configure(KataServerSchema) do
  rescue_from ActiveRecord::RecordNotFound do |exception|
    nil
  end

  rescue_from ActiveRecord::RecordInvalid do |exception|
    GraphQL::ExecutionError.new(exception.record.errors.full_messages.join("\n"))
  end

  # rescue_from StandardError do |exception|
  #   GraphQL::ExecutionError.new('Unknown error, please try again later.')
  # end
end