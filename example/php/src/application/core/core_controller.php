<?php defined('BASEPATH') || exit('No direct script access allowed');

/**
 * @property CI_DB $db
 * @property CI_Router $router
 * @property Logger $logger
 * @property Request $request
 * @property Axios $axios
 */
class Core_Controller extends CI_Controller {
  public function __construct() {
    parent::__construct();

    $this->load->database();
  }
}