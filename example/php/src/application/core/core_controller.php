<?php defined('BASEPATH') || exit('No direct script access allowed');

/**
 * @property CI_DB $db
 */
class Core_Controller extends CI_Controller {
  public function __construct() {
    parent::__construct();

    $this->load->database();
  }
}