declare module 'webpack-dev-middleware' {
  import { Compiler } from 'webpack';

  interface Options {
    // Add only the options you use
    watchOptions?: {
      poll?: number;
      aggregateTimeout?: number;
    };
  }

  export default function webpackDevMiddleware(
    compiler: Compiler,
    options?: Options
  ): any;
}
