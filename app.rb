require 'sinatra'
require 'json'
require 'yaml'
require 'rack'
require 'webrick'
require 'webrick/https'
require 'openssl'
require 'logger'

set :bind, '0.0.0.0'
$logger = Logger.new(STDOUT)

def load_phrases
  @phrases = YAML.load_file('pharses.yaml') if @phrases.nil?
  @phrases
end

def sample_pharse(type = :html)
  content_type type
  name = load_phrases.keys.sample
  text = load_phrases[name]
  case type
  when :html
    "<h2>#{name}</h2><br/>#{text.split("\n").join('<br/>')}"
  when :json
    { name: name, text: text }.to_json
  else
    raise ArgumentError, "unknown type #{type}"
  end
end

def pharse_key_by_name(name)
  name.downcase!
  file_keys = load_phrases.keys
  file_keys.detect { |e| e.downcase.include?(name) }
end

def concrete_pharse(user_named)
  content_type :json

  title = pharse_key_by_name(user_named)
  title.nil? ? "Сорямба, не нашла пасту #{user_named}. Попробуй ещё раз." : load_phrases[title]
end

def handle_dialog(request, response)
  new_response = response
  new_response['response']['text'] = if ['случайный', '', 'случайное', 'дальше', 'далее'].include?(request['request']['original_utterance'])
                                       JSON.parse(sample_pharse(:json)).fetch('text')
                                     else
                                       concrete_pharse(request['request']['original_utterance'])
                                     end
  new_response
end

get '/alice-analisis' do
  sample_pharse(:html)
end

get '/alice-analisis/json' do
  sample_pharse(:json)
end

post '/alice-analisis/test' do
  request_body = params
  request_body = JSON.parse(request.body.read) unless params[:path]

  response = {
    'version' => request_body['version'],
    'session' => request_body['session'],
    'response' => {
      'text' => '',
      'end_session' => false
    }
  }

  $logger.info("Пришедшая нагрузка:\n#{request_body}")

  new_response = handle_dialog(request_body, response)
  $logger.info("Ответ после обработки:\n#{new_response}")
  new_response.to_json
end
CERT_PATH = '/etc/letsencrypt/live/nikitenich.ru'.freeze

#webrick_options = {
#  Port: 443,
#  Logger: WEBrick::Log.new($stderr, WEBrick::Log::DEBUG),
#  DocumentRoot: '/ruby/htdocs',
#  SSLEnable: true,
#  SSLVerifyClient: OpenSSL::SSL::VERIFY_NONE,
#  SSLCertificate: OpenSSL::X509::Certificate.new(File.open(File.join(CERT_PATH, 'cert.pem')).read),
#  SSLPrivateKey: OpenSSL::PKey::RSA.new(File.open(File.join(CERT_PATH, 'privkey.pem')).read),
#  SSLCertName: [['CN', WEBrick::Utils::getservername]],
#  app: MyServer
#}
#Rack::Server.start(webrick_options)

