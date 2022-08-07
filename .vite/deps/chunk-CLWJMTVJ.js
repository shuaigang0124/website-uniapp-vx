import {
  __commonJS,
  init_define_process_env_UNI_STAT_TITLE_JSON,
  init_define_process_env_UNI_STAT_UNI_CLOUD,
  require_utils
} from "./chunk-3E4IGYFS.js";

// ../../../../../VXprojects/shuaigang/node_modules/axios/lib/core/AxiosError.js
var require_AxiosError = __commonJS({
  "../../../../../VXprojects/shuaigang/node_modules/axios/lib/core/AxiosError.js"(exports, module) {
    "use strict";
    init_define_process_env_UNI_STAT_TITLE_JSON();
    init_define_process_env_UNI_STAT_UNI_CLOUD();
    var utils = require_utils();
    function AxiosError(message, code, config, request, response) {
      Error.call(this);
      this.message = message;
      this.name = "AxiosError";
      code && (this.code = code);
      config && (this.config = config);
      request && (this.request = request);
      response && (this.response = response);
    }
    utils.inherits(AxiosError, Error, {
      toJSON: function toJSON() {
        return {
          message: this.message,
          name: this.name,
          description: this.description,
          number: this.number,
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          config: this.config,
          code: this.code,
          status: this.response && this.response.status ? this.response.status : null
        };
      }
    });
    var prototype = AxiosError.prototype;
    var descriptors = {};
    [
      "ERR_BAD_OPTION_VALUE",
      "ERR_BAD_OPTION",
      "ECONNABORTED",
      "ETIMEDOUT",
      "ERR_NETWORK",
      "ERR_FR_TOO_MANY_REDIRECTS",
      "ERR_DEPRECATED",
      "ERR_BAD_RESPONSE",
      "ERR_BAD_REQUEST",
      "ERR_CANCELED"
    ].forEach(function(code) {
      descriptors[code] = { value: code };
    });
    Object.defineProperties(AxiosError, descriptors);
    Object.defineProperty(prototype, "isAxiosError", { value: true });
    AxiosError.from = function(error, code, config, request, response, customProps) {
      var axiosError = Object.create(prototype);
      utils.toFlatObject(error, axiosError, function filter(obj) {
        return obj !== Error.prototype;
      });
      AxiosError.call(axiosError, error.message, code, config, request, response);
      axiosError.name = error.name;
      customProps && Object.assign(axiosError, customProps);
      return axiosError;
    };
    module.exports = AxiosError;
  }
});

// ../../../../../VXprojects/shuaigang/node_modules/axios/lib/core/settle.js
var require_settle = __commonJS({
  "../../../../../VXprojects/shuaigang/node_modules/axios/lib/core/settle.js"(exports, module) {
    "use strict";
    init_define_process_env_UNI_STAT_TITLE_JSON();
    init_define_process_env_UNI_STAT_UNI_CLOUD();
    var AxiosError = require_AxiosError();
    module.exports = function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(new AxiosError("Request failed with status code " + response.status, [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4], response.config, response.request, response));
      }
    };
  }
});

export {
  require_AxiosError,
  require_settle
};
//# sourceMappingURL=chunk-CLWJMTVJ.js.map
