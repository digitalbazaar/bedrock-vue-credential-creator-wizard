/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const {config} = require('bedrock');
const path = require('path');

config.karma.suites['bedrock-vue-credential-creator-wizard'] =
  path.join('web', '**', '*.js');

// TODO: consider moving to `bedrock-karma`?
config.karma.config.webpack.resolve = {
  alias: {
    quasar$: path.resolve(
      __dirname, 'node_modules/quasar/dist/umd/quasar.mat.umd.js')
  }
};
