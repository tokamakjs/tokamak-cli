#!/usr/bin/env node

require('dotenv').config();

const packageJson = require('../package.json');

require('../lib/cli').default(packageJson.version);
