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

  public function log() {
    $this->logger->info('logging', []);
  }
}