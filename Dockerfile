FROM node:lts
###
#  QCObjects  1.0
#  ________________
#
#  Author: Jean Machuca <correojean@gmail.com>
#
#  Cross Browser Javascript Framework for MVC Patterns
#  QuickCorp/QCObjects is licensed under the
#  GNU Lesser General Public License v3.0
#  [LICENSE] (https://github.com/QuickCorp/QCObjects/blob/master/LICENSE.txt)
#
#  Permissions of this copyleft license are conditioned on making available
#  complete source code of licensed works and modifications under the same
#  license or the GNU GPLv3. Copyright and license notices must be preserved.
#  Contributors provide an express grant of patent rights. However, a larger
#  work using the licensed work through interfaces provided by the licensed
#  work may be distributed under different terms and without source code for
#  the larger work.
#
#  Copyright (C) 2015 Jean Machuca,<correojean@gmail.com>
#
#  Everyone is permitted to copy and distribute verbatim copies of this
#  license document, but changing it is not allowed.
###

LABEL org.quickcorp.qcobjects.cli.version="0.0.4"
LABEL vendor1="QuickCorp"
LABEL vendor2="QCObjects"
LABEL org.quickcorp.qcobjects.release-date="2019-06-01"
LABEL org.quickcorp.qcobjects.version.is-production=""

# Install Openssl
USER root
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
      openssl \
    && apt-get clean
# End Install Openssl

# Installation of certbot
USER root
RUN apt-get update && apt-get install -y --no-install-recommends apt-utils
RUN apt-get -y install software-properties-common
RUN sed -i "/^# deb.*universe/ s/^# //" /etc/apt/sources.list
RUN add-apt-repository ppa:certbot/certbot
RUN apt-get -y install certbot
# End Installation of certbot


RUN npm install -g jasmine --only=production
RUN npm install -g qcobjects-sdk --only=production
RUN npm install -g qcobjects-cli --only=production

# QCObjects Service
RUN apt-get -y install --reinstall systemd
COPY bin/install/ubuntu18/etc/systemd/system/qcobjects.service /etc/systemd/system/qcobjects.service
# End QCObjects Service

RUN mkdir -p /etc/letsencrypt/live/
RUN mkdir -p /etc/letsencrypt/live/mynewapp.qcobjects.com/
RUN chmod 775 /etc/letsencrypt/live/
RUN chmod 777 /etc/letsencrypt/live/mynewapp.qcobjects.com/

RUN groupadd -r qcobjects && useradd -r -s /bin/bash -g qcobjects qcobjects
RUN mkdir -p /home/qcobjects && chown -R qcobjects:qcobjects /home/qcobjects

RUN mkdir -p /etc/qcobjects/
RUN mkdir -p /home/qcobjects/projects/mynewapp/
RUN chmod +w /home/qcobjects/projects/mynewapp/
COPY bin/install/ubuntu18/etc/qcobjects/config.json.template /etc/qcobjects/config.json
RUN (cd /etc/qcobjects/ && npm install qcobjects-sdk --save && qcobjects-createcert)
RUN (cd /home/qcobjects/projects/mynewapp && npm install qcobjects-sdk --save)
RUN (cd /home/qcobjects/projects/mynewapp && (qcobjects-createcert && echo "\n" | (qcobjects create --pwa app 2>&1 >/dev/null)))

RUN echo "Welcome to... "
RUN echo ""
RUN echo " .d88888b.  .d8888b.  .d88888b. 888       d8b                888"
RUN echo "d88P   Y88bd88P  Y88bd88P   Y88b888       Y8P                888"
RUN echo "888     888888    888888     888888                          888"
RUN echo "888     888888       888     88888888b.  8888 .d88b.  .d8888b888888.d8888b"
RUN echo "888     888888       888     888888  88b  888d8P  Y8bd88P    888   88K"
RUN echo "888 Y8b 888888    888888     888888  888  88888888888888     888    Y8888b."
RUN echo "Y88b.Y8b88PY88b  d88PY88b. .d88P888 d88P  888Y8b.    Y88b.   Y88b.      X88"
RUN echo "  Y888888    Y8888P    Y88888P  88888P    888  Y8888   Y8888P  Y888 88888P"
RUN echo "       Y8b                                888"
RUN echo "                                         d88P"
RUN echo "                                       888P"
RUN echo ""
RUN echo "To start, use: su - qcobjects"
RUN echo "and go to the path ~/projects/mynewapp"
RUN echo ""
RUN echo "To create a new progressive web app type: "
RUN echo "> qcobjects create mynewapp --pwa"
RUN echo ""
RUN echo "To create an accelerated mobile page type: "
RUN echo "> qcobjects create mynewapp --amp"
RUN echo ""
RUN echo "The QCObjects HTTP2 Server Settings file is in: "
RUN echo "/etc/qcobjects/config.json"
RUN echo ""
RUN echo "To check the status of the service:"
RUN echo "> service qcobjects status"
RUN echo ""
RUN echo "To start|stop|prestart the service:"
RUN echo "> service qcobjects start"
RUN echo "> service qcobjects stop"
RUN echo "> service qcobjects restart"
RUN echo ""

WORKDIR /home/qcobjects
USER qcobjects
COPY package*.json ./
RUN jasmine init
RUN npm cache verify
RUN npm ci --save --only=production

# Bundle app source
COPY --chown=qcobjects:qcobjects . .

CMD ["qcobjects", "launch", "mynewapp"]
