import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

// Simpler: Just expose functions to global scope
const simpleGlobalExpose = () => {
  return {
    name: "simple-global-expose",
    renderChunk(code, chunk, options) {
      if (options.format === "umd") {
        // Change the UMD pattern to expose directly to global
        return code
          .replace(
            "typeof define === 'function' && define.amd ? define(['exports'], factory) :",
            "typeof define === 'function' && define.amd ? define(['exports'], factory) :"
          )
          .replace(
            "(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.islamicDate = {}));",
            "(global = typeof globalThis !== 'undefined' ? globalThis : global || self, (function() {\n" +
              "  var exports = {};\n" +
              "  factory(exports);\n" +
              "  // Expose all functions to global scope\n" +
              "  Object.keys(exports).forEach(function(key) {\n" +
              "    if (key !== '__esModule' && key !== 'default') {\n" +
              "      global[key] = exports[key];\n" +
              "    }\n" +
              "  });\n" +
              "})());"
          );
      }
      return code;
    },
  };
};

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/islamic-date.cjs",
      format: "cjs",
      exports: "named",
    },
    {
      file: "dist/islamic-date.esm.js",
      format: "es",
      exports: "named",
    },
    {
      file: "dist/islamic-date.umd.js",
      format: "umd",
      name: "islamicDate", // Still needed for the pattern
      exports: "named",
    },
    {
      file: "dist/islamic-date.min.js",
      format: "umd",
      name: "islamicDate",
      exports: "named",
      plugins: [terser()],
    },
  ],
  plugins: [nodeResolve(), commonjs(), simpleGlobalExpose()],
};
