import { _basePath_ } from "./basePath";
import { _DataStringify } from "./DataStringify";
import { InheritClass } from "./InheritClass";
import { logger } from "./Logger";
import { Package } from "./Package";

export class BackendMicroservice extends InheritClass {

    constructor({
      domain = _domain_,
      basePath = _basePath_,
      body = null,
      stream = null,
      request = null
    }) {
      super(...arguments);
      logger.debug("Initializing BackendMicroservice...");
      let microservice = this;
      if (typeof this.body === "undefined") {
        this.body = null;
      }
      if (typeof body !== "undefined") {
        this.body = body;
      }
      this.cors();
      microservice.stream = stream;
      stream.on("data", (data) => {
        // data from POST, GET
        var requestMethod = request.method.toLowerCase();
        var supportedMethods = {
          "post": microservice.post,
        };
        if (Object.hasOwnProperty.call(supportedMethods, requestMethod)) {
          supportedMethods[requestMethod].call(microservice, data);
        }
      });

      // data from POST, GET
      var requestMethod = request.method.toLowerCase();
      var supportedMethods = {
        "get": microservice.get,
        "head": microservice.head,
        "put": microservice.put,
        "delete": microservice.delete,
        "connect": microservice.connect,
        "options": microservice.options,
        "trace": microservice.trace,
        "patch": microservice.patch
      };
      if (Object.hasOwnProperty.call(supportedMethods, requestMethod)) {
        supportedMethods[requestMethod].call(microservice);
      }


    }

    cors() {
      if (this.route.cors) {
        logger.debug("Validating CORS...");
        let {
          allow_origins,
          allow_credentials,
          allow_methods,
          allow_headers
        } = this.route.cors;
        var microservice = this;
        if (typeof microservice.headers !== "object") {
          microservice.headers = {};
        }
        if (typeof microservice.route.responseHeaders !== "object") {
          microservice.route.responseHeaders = {};
        }
        if (typeof allow_origins !== "undefined") {
          logger.debug("CORS: allow_origins available. Validating origins...");
          // an example of allow_origins is ['https://example.com','http://www.example.com']
          if (allow_origins === "*" || (typeof microservice.request.headers.origin === "undefined") || [...allow_origins].indexOf(microservice.request.headers.origin) !== -1) {
            // for compatibility with all browsers allways return a wildcard when the origin is allowed
            logger.debug("CORS: Adding header Access-Control-Allow-Origin=*");
            microservice.route.responseHeaders["Access-Control-Allow-Origin"] = "*";
          } else {
            logger.debug("CORS: Origin is not allowed: " + microservice.request.headers.origin);
            logger.debug("CORS: Forcing to finish the response...");
            this.body = {};
            try {
              this.done();
            } catch (e) {
              logger.debug(`It was not possible to finish the call to the microservice: ${e}`);
            }
          }
        } else {
          logger.debug("CORS: no allow_origins available. Allowing all origins...");
          logger.debug("CORS: Adding header Access-Control-Allow-Origin=*");
          microservice.route.responseHeaders["Access-Control-Allow-Origin"] = "*";
        }
        if (typeof allow_credentials !== "undefined") {
          logger.debug(`CORS: allow_credentials present. Allowing ${allow_credentials}...`);
          microservice.route.responseHeaders["Access-Control-Allow-Credentials"] = allow_credentials.toString();
        } else {
          logger.debug("CORS: No allow_credentials present. Allowing all credentials.");
          microservice.route.responseHeaders["Access-Control-Allow-Credentials"] = "true";
        }
        if (typeof allow_methods !== "undefined") {
          logger.debug(`CORS: allow_methods present. Allowing ${allow_methods}...`);
          microservice.route.responseHeaders["Access-Control-Allow-Methods"] = [...allow_methods].join(",");
        } else {
          logger.debug("CORS: No allow_methods present. Allowing only GET, OPTIONS and POST");
          microservice.route.responseHeaders["Access-Control-Allow-Methods"] = "GET, OPTIONS, POST";
        }
        if (typeof allow_headers !== "undefined") {
          logger.debug(`CORS: allow_headers present. Allowing ${allow_headers}...`);
          microservice.route.responseHeaders["Access-Control-Allow-Headers"] = [...allow_headers].join(",");
        } else {
          logger.debug(`CORS: No allow_headers present. Allowing all headers...`);
          microservice.route.responseHeaders["Access-Control-Allow-Headers"] = "*";
        }
      } else {
        logger.debug("No CORS validation available. You can specify cors in CONFIG.backend.routes[].cors");
      }
    }


    head(formData) {
      this.done();
    }

    get(formData) {
      logger.debug(`[BackendMicroservice.get] Data received: ${_DataStringify(formData)}`);
      this.done();
    }

    post(formData) {
      this.done();
    }

    put(formData) {
      this.done();
    }

    delete(formData) {
      this.done();
    }

    connect(formData) {
      this.done();
    }

    options(formData) {
      this.done();
    }

    trace(formData) {
      this.done();
    }

    patch(formData) {
      this.done();
    }

    finishWithBody(stream) {
      try {
        logger.debug("[BackendMicroservice.finishWithBody] Ending the stream...");
        logger.debug(`[BackendMicroservice.finishWithBody] type of body is: ${typeof this.body}`);
        if (typeof this.body !== "string") {
          this.body = _DataStringify(this.body);
        }
        logger.debug(`[BackendMicroservice.finishWithBody] \n body: ${this.body} `);
        stream.write(this.body);
        stream.end();
        logger.debug(`[BackendMicroservice.finishWithBody] Stream ended.`);
      } catch (e) {
        logger.debug(`[BackendMicroservice.finishWithBody] Something went wrong ending the stream: ${e}`);
      }
    }

    done() {
      logger.debug(`[BackendMicroservice.done] Finalizing the response...`);
      var microservice = this;
      var stream = microservice.stream;
      try {
        logger.debug(`[BackendMicroservice.done] Sending response headers...`);
        if (microservice.route.responseHeaders) {
          logger.debug(`[BackendMicroservice.done] Response headers present: ${Object.keys(microservice.route.responseHeaders)}`);
          stream.respond(microservice.route.responseHeaders);
        } else {
          throw Error(`[BackendMicroservice.done] No headers present.`);
        }
      } catch (e) {
        logger.debug(`[BackendMicroservice.done] Something went wrong sending response headers: ${e}`);
      }
      if (microservice.body !== null) {
        try {
          logger.debug(`[BackendMicroservice.done] A body of message is present. Finalizing the response...`);
          microservice.finishWithBody.call(microservice, stream);
        } catch (e) {
          logger.debug(`[BackendMicroservice.done] Something went wrong finalizing the response: ${e}`);
        }
      } else {
        logger.debug("[BackendMicroservice.done] No body present. Ending stream...");
        stream.end();
      }
    }


  }

Package("com.qcobjects.api", [
    BackendMicroservice
]);
