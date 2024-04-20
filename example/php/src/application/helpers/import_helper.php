<?php defined('BASEPATH') || exit('No direct script access allowed');


/**
 * @param string $path
 * @return void
 */
function import($path) {
  if (startsWith($path, '/')) {
    $path = substr($path, 1);
  }

  if (!endsWith($path, '.php')) {
    $path .= '.php';
  }

  require_once APPPATH . $path;
}