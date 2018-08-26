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
      [:metadata_cache, :bouncer_abi, :action_arguments].each do |key|
        params[key] = JSON.parse(params[key])
      end
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
