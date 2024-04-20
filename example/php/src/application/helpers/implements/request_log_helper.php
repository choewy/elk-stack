<?php defined('BASEPATH') || exit('No direct script access allowed');

/**
 * @property string $method;
 * @property string $url;
 * @property string $ip;
 **/
class RequestLog {
  public $method;
  public $url;
  public $ip;

  public function __construct() {
    $this->method = $_SERVER['REQUEST_METHOD'];
    $this->url = $_SERVER['REQUEST_URI'];
    $this->ip = $this->getIpAddress();
  }

  /**
   * @return string
   **/
  public function getIpAddress() {
    $ipAddress = '';

    if (getenv('HTTP_CLIENT_IP')) {
        $ipAddress = getenv('HTTP_CLIENT_IP');
    } elseif (getenv('HTTP_X_FORWARDED_FOR')) {
        $ipAddress = getenv('HTTP_X_FORWARDED_FOR');
    } elseif (getenv('HTTP_X_FORWARDED')) {
        $ipAddress = getenv('HTTP_X_FORWARDED');
    } elseif (getenv('HTTP_FORWARDED_FOR')) {
        $ipAddress = getenv('HTTP_FORWARDED_FOR');
    } elseif (getenv('HTTP_FORWARDED')) {
        $ipAddress = getenv('HTTP_FORWARDED');
    } elseif (getenv('REMOTE_ADDR')) {
        $ipAddress = getenv('REMOTE_ADDR');
    }
    
    return $ipAddress;
  }

  public function toObjectArray() {
    return [
      'method' => $this->method,
      'url' => $this->url,
      'ip' => $this->ip
    ];
  }
}