<?php defined('BASEPATH') || exit('No direct script access allowed');

/**
 * @property Core_Controller $controller
 **/
class Logging {
  private $controller;
  private $logger;

  public function __construct() {
    $this->controller = get_instance();
    $this->logger = $this->controller->logger;
  }
  public function postController() {
    $this->logger->verbose('post controller', [
      'className' => $this->controller->router->class,
      'handlerName' => $this->controller->router->method,
    ]);
  }
}