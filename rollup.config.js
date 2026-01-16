import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

// It adds extra code size

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
      name: "islamicDate",
      exports: "named",
    },
    {
      file: "dist/islamic-date.min.js",
      format: "umd",
      name: "islamicDate",
      exports: "named",
      plugins: [
        terser({
          compress: {
            passes: 3,
            unsafe: true,
            unsafe_math: true,
            unsafe_methods: true,
            unsafe_proto: true,
            unsafe_regexp: true,
            pure_getters: true,
            keep_fargs: false,
            drop_console: true, // Remove console logs
            drop_debugger: true,
          },
          mangle: {
            properties: false,
            keep_fnames: false,
            toplevel: true,
          },
          format: {
            comments: false,
          },
        }),
      ],
    },
  ],
  plugins: [nodeResolve(), commonjs()],
};
