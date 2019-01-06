require_relative "../common.rb"

def deploy(domain)
  Dir.chdir "www" do
    puts "Uploading files to #{domain}"
    system_req "gsutil -m cp -R . gs://#{domain}"
  end
end

deploy "www.bathtuborchestra.co.uk"
deploy "www.bathtuborchestra.com"
