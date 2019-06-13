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
const version = "0.0.1";
const appName = "qcobjects-doc";
const cacheName = `qcobjects-app-${appName}-${version}`;
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
	"/",
	"LICENSE.txt",
	"QCObjects.js",
	"README.md",
	"README.pdf",
	"README.rst",
	"config-example.json",
	"doc/README.rst",
	"doc/img/ALPHA-RISE.png",
	"doc/img/QCObjects-Docker-Playground.gif",
	"doc/img/QCObjects-Quick-Start.gif",
	"doc/img/components.gif",
	"doc/index.rst",
	"doc/test_service_response.html",
	"example1.html",
	"example2-routing.html",
	"favicon.ico",
	"index.html",
	"index.rst",
	"package-lock.json",
	"package.json",
	"qcobjects_01.png",
	"src/cl.quickcorp.components.js",
	"src/cl.quickcorp.controller.js",
	"src/cl.quickcorp.js",
	"src/cl.quickcorp.model.js",
	"src/cl.quickcorp.tools.js",
	"src/cl.quickcorp.view.js",
	"templates/components/page1.html",
	"templates/components/page2.html",
	"templatesample.html",
	"test.js"])
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
