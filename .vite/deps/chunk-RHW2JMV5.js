import {
  __commonJS,
  init_define_process_env_UNI_STAT_TITLE_JSON,
  init_define_process_env_UNI_STAT_UNI_CLOUD,
  require_utils
} from "./chunk-3E4IGYFS.js";

// ../../../../../VXprojects/shuaigang/node_modules/axios/lib/helpers/buildURL.js
var require_buildURL = __commonJS({
  "../../../../../VXprojects/shuaigang/node_modules/axios/lib/helpers/buildURL.js"(exports, module) {
    "use strict";
    init_define_process_env_UNI_STAT_TITLE_JSON();
    init_define_process_env_UNI_STAT_UNI_CLOUD();
    var utils = require_utils();
    function encode(val) {
      return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    }
    module.exports = function buildURL(url, params, paramsSerializer) {
      if (!params) {
        return url;
      }
      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts = [];
        utils.forEach(params, function serialize(val, key) {
          if (val === null || typeof val === "undefined") {
            return;
          }
          if (utils.isArray(val)) {
            key = key + "[]";
          } else {
            val = [val];
          }
          utils.forEach(val, function parseValue(v) {
            if (utils.isDate(v)) {
              v = v.toISOString();
            } else if (utils.isObject(v)) {
              v = JSON.stringify(v);
            }
            parts.push(encode(key) + "=" + encode(v));
          });
        });
        serializedParams = parts.join("&");
      }
      if (serializedParams) {
        var hashmarkIndex = url.indexOf("#");
        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
      }
      return url;
    };
  }
});

export {
  require_buildURL
};
//# sourceMappingURL=chunk-RHW2JMV5.js.map
