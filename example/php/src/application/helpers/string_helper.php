<?php defined('BASEPATH') || exit('No direct script access allowed');


class StringHelper {
  /**
   * @param string $targetString
   * @param string $needleString
   * @return boolean
   **/
  public static function startsWith($targetString, $needleString) {
    $needleStringLength = strlen($needleString);

    if ($needleStringLength === 0) {
      return true;
    }

    return substr($targetString, 0, $needleStringLength) === $needleString;
  }

  /**
   * @param string $targetString
   * @param string $needleString
   * @return boolean
   **/
  public static function endsWith($targetString, $needleString) {
    $needleStringLength = strlen($needleString);

    if ($needleStringLength === 0) {
      return true;
    }

    return substr($targetString, -$needleStringLength) === $needleString;
  }
}