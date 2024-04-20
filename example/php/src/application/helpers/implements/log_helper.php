<?php defined('BASEPATH') || exit('No direct script access allowed');

class Log {
  public static $id;
  public static $app;
  public static $context;
  public static $request;
  public static $response;
  public static $exception;
  public static $error;

  public static function initialize() {
    self::$id = random_bytes(16);
    self::$app = APP_NAME;
    self::$request = new RequestLog();
  }

  public static function setContext($class, $method) {
    self::$context = new ContextLog($class, $method);
  }

  public static function setResponse($statusCode) {
    self::$response = new ResponseLog($statusCode);
  }

  public static function toJSON() {
    $objectArray = [];

    if (self::$request) {
      $objectArray['request'] = self::$request->toObjectArray();
    }

    if (self::$context) {
      $objectArray['context'] = self::$context->toObjectArray();
    }

    if (self::$response) {
      $objectArray['response'] = self::$response->toObjectArray();
    }

    return json_encode($objectArray);
  }
}
