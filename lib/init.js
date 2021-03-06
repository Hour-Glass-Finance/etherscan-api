"use strict";
const log = require('./log');
const proxy = require('./proxy');
const stats = require('./stats');
const block = require('./block');
const transaction = require('./transaction');
const contract = require('./contract');
const account = require('./account');
/**
 * @module etherscan/api
 */

/**
 * @param {string} apiKey - (optional) Your Etherscan APIkey
 * @param {string} apiUrl - (required) apiUrl
 * @param {number} timeout - (optional) Timeout in milliseconds for requests, default 10000
 */
module.exports = function(apiKey, apiUrl, timeout) {

  if (!apiKey) {
    apiKey = 'YourApiKeyToken';
  }

  if (!apiUrl) {
    throw new Error('you must specify apiUrl');
  }


  if (!timeout) {
    timeout = 10000;
  }

  var getRequest = require('./get-request')(apiUrl, timeout);

  /** @lends module:etherscan/api */
  return {
    /**
     * @namespace
     */
    log: log(getRequest, apiKey),
    /**
     * @namespace
     */
    proxy: proxy(getRequest, apiKey),
    /**
     * @namespace
     */
    stats: stats(getRequest, apiKey),
    /**
     * @namespace
     */
    block: block(getRequest, apiKey),
    /**
     * @namespace
     */
    transaction: transaction(getRequest, apiKey),
    /**
     * @namespace
     */
    contract: contract(getRequest, apiKey),
    /**
     * @namespace
     */
    account: account(getRequest, apiKey)
  };
};
