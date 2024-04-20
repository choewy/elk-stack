<?php defined('BASEPATH') || exit('No direct script access allowed');


interface StatusCode {
  const OK = 200;
  const CREATED = 201;
  const ACCEPTED = 202;
  const NO_CONTENT = 204;
  const FOUND = 302;
  const NOT_MODIFIED = 304;
  const BAD_REQUEST = 400;
  const UNAUTHORIZED = 401;
  const CONFLICT = 409;
  const IM_A_TEAPOT = 418;
  const TOO_MANY_REQUESTS = 429;
  const INTERNAL_SERVER_ERROR = 500;
}

/**
 * @property int $statusCode
 * @property string $statusMessage
 **/
class ResponseLog {
  public $statusCode;
  public $statusMessage;

  public function __construct($statusCode) {
    $this->statusCode = $statusCode;
    $this->statusMessage = '';
  }

  public function toObjectArray() {
    return [
      'statusCode' => $this->statusCode,
      'statusMessage' => $this->statusMessage,
    ];
  }
}