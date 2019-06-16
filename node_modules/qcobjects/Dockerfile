FROM node:12.3
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

RUN npm install -g jasmine --only=production
RUN npm install -g qcobjects-sdk --only=production
RUN npm install -g qcobjects-cli --only=production

RUN groupadd -r qcobjects && useradd -r -s /bin/bash -g qcobjects qcobjects
RUN mkdir -p /home/qcobjects && chown -R qcobjects:qcobjects /home/qcobjects

WORKDIR /home/qcobjects
USER qcobjects
COPY package*.json ./
RUN jasmine init
RUN npm cache verify
RUN npm ci --save --only=production

# Bundle app source
COPY --chown=qcobjects:qcobjects . .

CMD [ "npm", "start" ]
