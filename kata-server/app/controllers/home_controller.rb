class HomeController < ApplicationController
  def index
    render json: { ok: true }
  end
end
