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
   * @param string $message
   * @param mixed $context
   **/
  private function createLog($level, $message, $context = [], $exception = null, $error = null) {
    return [
      'app' => APP_NAME,
      'level' => $level,
      'request' => [
          'id' => $this->request->getId(),
          'ip' => $this->request->getIpAddress(),
          'method' => $this->request->getMethod(),
          'url' => $this->request->getUrl(),
      ],
      'message' => $message,
      'context' => $context,
      'exception' => $exception,
      'error'=> $error
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

  public function warn($message, $context, $exception = null) {
    $log = $this->createLog(LogLevel::WARNING, $message, $context, $exception);
    $this->axios->post(LOGSTASH_URL, $log);
  }

  public function error($message, $context, $error = null, $trace = '') {
    $log = $this->createLog(LogLevel::ERROR, $message, $context, null, $error);
    $this->axios->post(LOGSTASH_URL, $log);
  }
}