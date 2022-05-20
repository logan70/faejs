import { ResultType2Data } from '../interfaces/Result'
import { BaseResult } from '../application/BaseResult'
import { ResultType } from '../const/ResultType'

/**
 * Static methods to quickly send http response of different types.
 */
export class Result {
  /**
   * Sends a JSON response.
   * @param {Object} data JSON data.
   */
  static json(data: ResultType2Data[ResultType.json]['data']) {
    return new BaseResult({
      type: ResultType.json,
      data,
    })
  }

  /**
   * Sends a JSON response with JSONP support.
   * @param {Object} data JSONP data.
   * @param {Object} [options]
   * @param {string} [options.callbackName] JSONP callback name
   */
  static jsonp(
    data: ResultType2Data[ResultType.jsonp]['data'],
    options: ResultType2Data[ResultType.jsonp]['options'] = {}
  ) {
    return new BaseResult({
      type: ResultType.jsonp,
      data,
      options,
    })
  }

  /**
   * Sends a streaming HTTP response.
   * @param {Stream} data streaming data.
   * @param {Object} [options]
   * @param {String} [options.fileName] the HTTP response Content-Disposition header field to “attachment”
   */
  static stream(
    data: ResultType2Data[ResultType.stream]['data'],
    options: ResultType2Data[ResultType.stream]['options'] = {}
  ) {
    return new BaseResult({
      type: ResultType.stream,
      data,
      options,
    })
  }

  /**
   * Transfers the file at path as an “attachment”. Typically, browsers will prompt the user for download.
   * @param {String} data file path to download. e.g. '/report-12345.pdf'
   * @param {Object} [options] see SendFileOptions interface.
   */
  static download(
    data: ResultType2Data[ResultType.download]['data'],
    options: ResultType2Data[ResultType.download]['options'] = {}
  ) {
    return new BaseResult({
      type: ResultType.download,
      data,
      options,
    })
  }

  /**
   * Redirects to the URL derived from the specified path, with specified status.
   * @param {String} data path to redirect to, e.g. 'http://example.com'.
   * @param {Object} [options]
   * @param {Number} [options.statusCode] HTTP status, default to 302.
   */
  static redirect(
    data: ResultType2Data[ResultType.redirect]['data'],
    options: ResultType2Data[ResultType.redirect]['options'] = {}
  ) {
    return new BaseResult({
      type: ResultType.redirect,
      data,
      options,
    })
  }

  /**
   * Redirects to the URL derived from the specified path, with specified status.
   * @param {String} data file to render, e.g. 'index.html'.
   * @param {Object} [options]
   * @param {Number} [options.root] Where your views are located. Must be an absolute path.
   * @param {Number} [options.locals] An object whose properties define local variables for the view.
   */
  static render(
    data: ResultType2Data[ResultType.render]['data'],
    options: ResultType2Data[ResultType.render]['options'] = {}
  ) {
    return new BaseResult({
      type: ResultType.render,
      data,
      options,
    })
  }
}
