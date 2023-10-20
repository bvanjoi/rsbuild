import path from 'path';
import { expect } from '@playwright/test';
import { build } from '@scripts/shared';
import { webpackOnlyTest } from '@scripts/helper';

// TODO: needs builtin:swc-loader
webpackOnlyTest(
  'should not compile specified file when source.exclude',
  async () => {
    await expect(
      build({
        cwd: __dirname,
        entry: { index: path.resolve(__dirname, './src/index.js') },
        rsbuildConfig: {
          source: {
            exclude: [path.resolve(__dirname, './src/test.js')],
          },
          output: {
            overrideBrowserslist: ['ie 11'],
          },
          security: {
            checkSyntax: true,
          },
        },
      }),
    ).rejects.toThrowError('[Syntax Checker]');
  },
);