class Api::V1::NotationsController < ApplicationController
  def index
    @notations = Notation.includes(:tags, :transcriber).where(featured: true)
    render(:index, status: 200)
  end

  def show
    @notation = Notation.includes(:tags, :transcriber).find(params.require(:id))
    render(:show, status: 200)
  end

  def create
    authorized = logged_in? && (current_user.has_role?(:teacher) || current_user.has_role?(:admin))

    if authorized
      @notation = Notation.new(notation_params.merge(transcriber: current_user))
      @notation.tags = Tag.where(id: params[:notation][:tag_ids])

      if @notation.save
        render(:show, status: 200)
      else
        render_errors(@notation.errors.full_messages, 422)
      end
    else
      render_errors("unauthorized to create", 401)
    end
  end

  def update
    @notation = Notation.includes(:tags, :transcriber).find(params.require(:id))
    authorized = logged_in? &&
        (current_user == @notation.transcriber || current_user.try(:has_role?, :admin))

    if authorized
      if @notation.update(notation_params.compact)
        render(:show, status: 200)
      else
        render_errors(@notation.errors.full_messages, 422)
      end
    else
      render_errors("unauthorized to update", 422)
    end
  end

  def destroy
    @notation = Notation.includes(:tags, :transcriber).find(params.require(:id))
    authorized = current_user.try(:has_role?, :admin)

    if authorized
      @notation.update!(notation_params)
      render(:show, status: 200)
    else
      render_errors("unauthorized to destroy", 422)
    end
  end

  private

    def notation_params
      params_base = params.
          require(:notation).
          permit(*%i(
            youtube_video_id
            song_name
            artist_name
            vextab_string
            bpm
            dead_time_ms
            duration_ms
            thumbnail
          ))

      if current_user.try(:has_role?, :admin)
        params_base.merge(params.require(:notation).permit(:featured))
      else
        params_base
      end
    end
end
