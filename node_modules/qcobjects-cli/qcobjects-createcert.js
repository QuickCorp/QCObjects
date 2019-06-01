#!/usr/bin/env node

"use strict";
const path = require('path');
const absolutePath = path.resolve( __dirname, "./" );
const templatePath = path.resolve( __dirname, "./templates/apps/" )+'/'

const { execSync } = require('child_process');
// stderr is sent to stderr of parent process
// you can set options.stdio if you want it to go elsewhere
let stdout = execSync('openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj \'/CN=localhost\'  -keyout localhost-privkey.pem -out localhost-cert.pem');
