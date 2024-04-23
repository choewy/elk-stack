<?php defined('BASEPATH') || exit('No direct script access allowed');

class Request {
  private $id;

  public function __construct() {
    $this->id = bin2hex(random_bytes(16));
  }

  /**
   * @return string
   **/
  public function getId() {
    return $this->id;
  }

  /**
   * @return string
   **/
  public function getMethod() {
    return $_SERVER['REQUEST_METHOD'];
  }

  /**
   * @return string
   **/
  public function getUrl() {
    return $_SERVER['REQUEST_URI'];
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
}