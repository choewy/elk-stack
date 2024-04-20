<?php defined('BASEPATH') || exit('No direct script access allowed');

/**
 * @param string $targetString
 * @param string $needleString
 * @return boolean
 **/ 
function startsWith($targetString, $needleString) {
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
function endsWith($targetString, $needleString) {
  $needleStringLength = strlen($needleString);

  if ($needleStringLength === 0) {
    return true;
  }

  return substr($targetString, -$needleStringLength) === $needleString;
}