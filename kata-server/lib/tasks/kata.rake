namespace :kata do
  desc "Create some codes for a token and output to csv"
  task :create_codes, [:token_id, :count] => :environment do |t, args|
    require 'csv'

    token = Token.find_by_id!(args.token_id)
    CSV.open('codes.csv', 'w') do |csv|
      csv << ['code', 'url']
      args.count.times do |i|
        code = token.codes.create({
          expiry: DateTime.now + 1.month
        })
        csv << [code.code, "https://get.status.im/browse/makerdao.xlnt.co/#{code.code}"]
      end
    end
  end

end
