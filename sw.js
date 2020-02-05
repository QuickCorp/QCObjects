/**
 * QCObjects SDK 1.0
 * ________________
 *
 * Author: Jean Machuca <correojean@gmail.com>
 *
 * Cross Browser Javascript Framework for MVC Patterns
 * QuickCorp/QCObjects is licensed under the
 * GNU Lesser General Public License v3.0
 * [LICENSE] (https://github.com/QuickCorp/QCObjects/blob/master/LICENSE.txt)
 *
 * Permissions of this copyleft license are conditioned on making available
 * complete source code of licensed works and modifications under the same
 * license or the GNU GPLv3. Copyright and license notices must be preserved.
 * Contributors provide an express grant of patent rights. However, a larger
 * work using the licensed work through interfaces provided by the licensed
 * work may be distributed under different terms and without source code for
 * the larger work.
 *
 * Copyright (C) 2015 Jean Machuca,<correojean@gmail.com>
 *
 * Everyone is permitted to copy and distribute verbatim copies of this
 * license document, but changing it is not allowed.
*/
"use strict";
const version = "2.1.248";
const appName = "QCObjects";
const cacheName = `qcobjects-app-${appName}-${version}`;
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
	"/",
	"AUTHOR.md",
	"CODE_OF_CONDUCT.md",
	"CONTRIBUTING.md",
	"LICENSE.txt",
	"QCObjects.js",
	"README.md",
	"README.pdf",
	"README.rst",
	"doc/README.rst",
	"doc/css/index.css",
	"doc/css/prism-okaidia.css",
	"doc/css/snippet.css",
	"doc/css/theme.css",
	"doc/img/ALPHA-RISE.png",
	"doc/img/QCObjects-CLI-AMP.gif",
	"doc/img/QCObjects-Components-Layout.gif",
	"doc/img/QCObjects-Docker-Playground.gif",
	"doc/img/QCObjects-Quick-Start.gif",
	"doc/img/QCObjects-running-on-Windows64bit.gif",
	"doc/img/components.gif",
	"doc/img/home/bg_hr.png",
	"doc/img/home/blacktocat.png",
	"doc/img/home/icon_download.png",
	"doc/img/home/sprite_download.png",
	"doc/img/icons/icon-128x128.png",
	"doc/img/icons/icon-144x144.png",
	"doc/img/icons/icon-152x152.png",
	"doc/img/icons/icon-192x192.png",
	"doc/img/icons/icon-384x384.png",
	"doc/img/icons/icon-512x512.png",
	"doc/img/icons/icon-72x72.png",
	"doc/img/icons/icon-96x96.png",
	"doc/img/jeanmachuca.png",
	"doc/index.rst",
	"doc/js/cl.quickcorp.components.js",
	"doc/js/cl.quickcorp.controller.js",
	"doc/js/cl.quickcorp.effects.js",
	"doc/js/cl.quickcorp.js",
	"doc/js/cl.quickcorp.model.js",
	"doc/js/cl.quickcorp.tools.js",
	"doc/js/cl.quickcorp.view.js",
	"doc/js/prism-okaidia.js",
	"doc/templates/components/blank.tpl.html",
	"doc/templates/components/main.tpl.html",
	"doc/templates/components/page1.html",
	"doc/templates/components/page2.html",
	"doc/templates/components/pwa.tpl.html",
	"doc/templates/components/snippet.tpl.html",
	"doc/templates/components/thanksvideo.tpl.html",
	"doc/test_service_response.html",
	"docker-compose.test.yml",
	"example1.html",
	"example2-routing.html",
	"favicon.ico",
	"humans.txt",
	"index.html",
	"index.rst",
	"manifest.json",
	"qcobjects_01.png",
	"robots.txt",
	"spec/support/jasmine.json",
	"spec/testsSpec.js"])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});
