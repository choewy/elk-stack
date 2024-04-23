<?php defined('BASEPATH') || exit('No direct script access allowed');

interface AxiosHttpMethod {
  const GET = 'get';
  const POST = 'post';
  const PATCH = 'patch';
  const PUT = 'put';
  const DELETE = 'delete';
}


class Axios {
  private function getDefaultHeaders() {
    return [
      'content-type: application/json',
    ];
  }

  /**
   * @param string $url
   **/
  private function parseUrlComponents($url) {
    $urlComponents = parse_url($url);
    $protocol = $urlComponents['scheme'];
    $host = $urlComponents['host'];
    $port = isset($urlComponents['port']) ? $urlComponents['port'] : 0;

    if ($port === 0) {
      $port = $protocol == 'https' ? 443 : 80;
    }

    return [
      'protocol' => $protocol,
      'host' => $host,
      'port' => $port,
    ];
  }

  /**
   * @param string $method
   * @param string $url
   * @param string $headers
   * @return resource
   **/
  private function createCurl($method, $url, $data = null, $headers = []) {
    $curl = curl_init();

    $urlComponents = $this -> parseUrlComponents($url);
    $curlHeaders = $this->getDefaultHeaders() + $headers;

    switch($method) {
      case AxiosHttpMethod::GET:
        curl_setopt($curl, CURLOPT_HTTPGET, true);
        break;

      case AxiosHttpMethod::POST:
      case AxiosHttpMethod::PATCH:
      case AxiosHttpMethod::PUT:
      case AxiosHttpMethod::DELETE:
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, strtoupper($method));
        break;

      default:
        break;
    }

    $curlUrl = $urlComponents['protocol'] . '://' . $urlComponents['host'];
    $curlPort = $urlComponents['port'];

    curl_setopt($curl, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
    curl_setopt($curl, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $curlHeaders);
    curl_setopt($curl, CURLOPT_URL, $curlUrl);
    curl_setopt($curl, CURLOPT_PORT, $curlPort);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

    if (in_array($method, [
      AxiosHttpMethod::POST,
      AxiosHttpMethod::PATCH,
      AxiosHttpMethod::PUT
    ]) && $data !== null) {
      curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
    }

    return $curl;
  }

  /**
   * @param resource $curl
   **/
  private function execCurl($curl) {
    $result = [
      'response' => curl_exec($curl),
      'error' => curl_error($curl),
    ];

    curl_close($curl);

    return $result;
  }

  /**
   * @param string $url
   * @param string $headers
   **/
  public function get($url, $headers = []) {
    $curl = $this->createCurl(AxiosHttpMethod::GET, $url, null, $headers);
    return $this->execCurl($curl);
  }

  /**
   * @param string $url
   * @param mixed $data
   * @param string $headers
   **/
  public function post($url, $data = null, $headers = []) {
    $curl = $this->createCurl(AxiosHttpMethod::POST, $url, $data, $headers);
    return $this->execCurl($curl);
  }

  /**
   * @param string $url
   * @param mixed $data
   * @param string $headers
   **/
  public function patch($url, $data = null, $headers = []) {
    $curl = $this->createCurl(AxiosHttpMethod::PATCH, $url, $data, $headers);
    return $this->execCurl($curl);
  }

  /**
   * @param string $url
   * @param mixed $data
   * @param string $headers
   **/
  public function put($url, $data = null, $headers = []) {
    $curl = $this->createCurl(AxiosHttpMethod::PUT, $url, $data, $headers);
    return $this->execCurl($curl);
  }

  /**
   * @param string $url
   * @param string $headers
   **/
  public function delete($url, $headers = []) {
    $curl = $this->createCurl(AxiosHttpMethod::DELETE, $url, null, $headers);
    return $this->execCurl($curl);
  }
}
