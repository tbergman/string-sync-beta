json.id            @notation.id
json.name          @notation.name
json.transcriber   @notation.transcriber.username
json.artist        @notation.artist_name
json.thumbnailUrl  @notation.thumbnail.url
json.tags          @notation.tags.map(&:name)
json.buildStructs  @notation.build_structs
json.scrollStructs @notation.scroll_structs
