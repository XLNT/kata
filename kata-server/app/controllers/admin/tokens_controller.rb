module Admin
  class TokensController < Admin::ApplicationController
    # To customize the behavior of this controller,
    # you can overwrite any of the RESTful actions. For example:
    #
    # def index
    #   super
    #   @resources = Token.
    #     page(params[:page]).
    #     per(10)
    # end

    def resource_params
      params = super
      params[:metadata_cache] = JSON.parse(params[:metadata_cache_text])
      params.delete(:metadata_cache_text)
      params[:bouncer_abi] = JSON.parse(params[:bouncer_abi_text])
      params.delete(:bouncer_abi_text)
      params[:action_arguments] = JSON.parse(params[:action_arguments_text])
      params.delete(:action_arguments_text)
      params
    end

    def new_code
      Code.create({
        token: requested_resource,
      })

      redirect_to admin_token_url(requested_resource)
    end

    # Define a custom finder by overriding the `find_resource` method:
    # def find_resource(param)
    #   Token.find_by!(slug: param)
    # end

    # See https://administrate-prototype.herokuapp.com/customizing_controller_actions
    # for more information
  end
end
