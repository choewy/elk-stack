<?php defined('BASEPATH') || exit('No direct script access allowed');

// TODO Logger로 대체
class Logging {
  public function createLog() {
    Log::initialize();
  }

  public function sendLog() {
    $curl = curl_init();
    
    curl_setopt($curl, CURLOPT_HTTPHEADER, ['Content-Type:application/json']);
    curl_setopt($curl, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
    curl_setopt($curl, CURLOPT_URL, LOGSTASH_HOST);
    curl_setopt($curl, CURLOPT_PORT, LOGSTASH_PORT);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, Log::toJSON());

    $error = curl_error($curl);

    echo $error;
    
    curl_close($curl);
  }
}