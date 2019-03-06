/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const {config} = require('bedrock');
const path = require('path');
require('bedrock-views');

config.paths.cache = path.join(__dirname, '.cache');

// add images
config.express.static.push({
  route: '/images',
  path: path.join(__dirname, 'components', 'images')
});
// add pseudo packages
config.views.system.packages.push({
  path: path.join(__dirname, 'components'),
  manifest: path.join(__dirname, 'package.json')
});
