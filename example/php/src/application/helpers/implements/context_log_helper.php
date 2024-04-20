<?php defined('BASEPATH') || exit('No direct script access allowed');

/**
 * @property string $className
 * @property string $handlerName
 **/
class ContextLog {
  public $className;
  public $handlerName;

  public function __construct($class, $method) {
    $this->className = get_class($class);
    $this->handlerName = $method;
  }

  public function toObjectArray() {
    return [
      'className' => $this->className,
      'handlerName' => $this->handlerName,
    ];
  }
}