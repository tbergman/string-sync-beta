json.id             @notation.id
json.name           @notation.name
json.transcriber    @notation.transcriber.username
json.artist         @notation.artist_name
json.thumbnailUrl   @notation.thumbnail.url
json.tags           @notation.tags.map(&:name)
json.vextab         @notation.vextab
json.youtubeVideoId @notation.youtube_video_id
json.duration       @notation.duration
json.deadTime       @notation.dead_time
json.tempo          @notation.tempo
json.featured       @notation.featured