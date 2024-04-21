<?php defined('BASEPATH') || exit('No direct script access allowed');

interface LogLevel {
  const INFO = 'info';
  const DEBUG = 'debug';
  const VERBOSE = 'verbose';
  const WARNING = 'warn';
  const ERROR = 'error';
}

/**
 * @property Core_Controller $controller
 * @property Axios $axios
 **/
class Logger {
  private $request;
  private $axios;

  public function __construct() {
    $this->controller = get_instance();
    $this->request = $this->controller->request;
    $this->axios = $this->controller->axios;
  }

  /**
   * @param string $level
   * @param mixed $message
   * @param mixed $context
   **/
  private function createLog($level, $message, $context = [], $trace = '') {
    return [
      'app' => APP_NAME,
      'level' => $level,
      'message' => [
        'message' => $message,
        'context' => $context,
        'request' => [
          'id' => $this->request->getId(),
          'method' => $this->request->getMethod(),
          'ip' => $this->request->getIpAddress(),
          'url' => $this->request->getUrl(),
        ]
      ],
    ];
  }

  public function info($message, $context) {
    $log = $this->createLog(LogLevel::INFO, $message, $context);
    $result = $this->axios->post(LOGSTASH_URL, $log);
  
    echo $result['response'];
    echo $result['error'];
  }

  public function verbose($message, $context) {
    $log = $this->createLog(LogLevel::VERBOSE, $message, $context);
    $this->axios->post(LOGSTASH_URL, $log);
  }

  public function debug($message, $context, $trace = '') {
    $log = $this->createLog(LogLevel::DEBUG, $message, $context, $trace);
    $this->axios->post(LOGSTASH_URL, $log);
  }

  public function warn($message, $context, $trace = '') {
    $log = $this->createLog(LogLevel::WARNING, $message, $context, $trace);
    $this->axios->post(LOGSTASH_URL, $log);
  }

  public function error($message, $context, $trace = '') {
    $log = $this->createLog(LogLevel::ERROR, $message, $context, $trace);
    $this->axios->post(LOGSTASH_URL, $log);
  }
}