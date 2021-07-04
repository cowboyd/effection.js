#!/usr/bin/env node

'use strict';

const chromeLaunch = require('chrome-launch');
const {resolve} = require('path');

const EXTENSION_PATH = resolve('./chrome');

chromeLaunch('http://localhost:49000/test.html', {
  args: [
    // Load the React DevTools extension
    `--load-extension=${EXTENSION_PATH}`,

    // Automatically open DevTools window
    '--auto-open-devtools-for-tabs',

    // Remembers previous session settings (e.g. DevTools size/position)
    '--user-data-dir=./.tempUserDataDir',
  ],
});
