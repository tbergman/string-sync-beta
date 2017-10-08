BUILD_STRUCTS = <<-BUILD.split("\n").map { |line| line.strip }.join("\n")
options space=20

tabstave
notation=true
key=A time=4/4

notes :q =|: (5/2.5/3.7/4) :8 7-5h6/3 ^3^ 5h6-7/5 ^3^ :q 7V/4 |
notes :8 t12p7/4 s5s3/4 :8 3s:16:5-7/5 :h p5/4
text :w, |#segno, ,|, :hd, , #tr
BUILD

def init
  Rails.application.eager_load!
end

def delete_all
  ApplicationRecord.descendants.each(&:delete_all)
end

def create_roles
  %W(student teacher admin).each { |name| Role.create!(name: name) }
end

def create_users
  roles = Role.all

  [
    { username: "jaredjj3", email: "jaredjj3@gmail.com", password: "password", roles: roles },
    { username: "samblakelock", email: "samblakelock@gmail.com", password: "password", roles: roles }
  ].each { |user| User.create!(user) }
end

def create_tags
  %W(acoustic ambient beginner classical gospel jazz neosoul fusion metal).each do |tag|
    Tag.create!(name: tag)
  end
end

def create_notations(num)
  teachers = User.joins(user_roles: :role).where(roles: { name: "teacher" })
  tags = Tag.all

  num.times do
    Notation.create!(
      user_id: teachers.sample.id,
      taggings_attributes: tags.shuffle[0..2].map { |tag| { tag_id: tag.id } },
      name: Faker::Book.title,
      youtube_video_id: "https://youtu.be/w8uNZWDEYzQ",
      duration: 14.841 * 1000,
      artist_name: Faker::Name.name,
      thumbnail: File.open(Dir["app/assets/images/thumbnails/*.jpg"].sample),
      vextab: BUILD_STRUCTS,
      tempo: 120,
      featured: rand < 0.5
    )
  end
end

def create_saved_notations
  notations = Notation.all.to_a
  User.all.each { |user| user.saved_notations << notations.sample(rand(notations.size)) }
end

ActiveRecord::Base.transaction do
  init
  delete_all
  create_roles
  create_users
  create_tags
  create_notations(100)
  create_saved_notations
end