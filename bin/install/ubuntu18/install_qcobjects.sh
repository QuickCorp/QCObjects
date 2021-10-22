#!/bin/bash
# QCObjects Ubuntu Installer Script
# ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
#Created On: September, 5, 2019
#@author: Jean Machuca <correojean@gmail.com> @jeanmachuca
#
# QuickCorp/QCObjects is licensed under the
# GNU Lesser General Public License v3.0
# [LICENSE] (https://github.com/QuickCorp/QCObjects/blob/master/LICENSE.txt)
#
# Permissions of this copyleft license are conditioned on making available
# complete source code of licensed works and modifications under the same
# license or the GNU GPLv3. Copyright and license notices must be preserved.
# Contributors provide an express grant of patent rights. However, a larger
# work using the licensed work through interfaces provided by the licensed
# work may be distributed under different terms and without source code for
# the larger work.
#
# Copyright (C) 2015 Jean Machuca,<correojean@gmail.com>
#
# Everyone is permitted to copy and distribute verbatim copies of this
# license document, but changing it is not allowed.#
#
#global
clear
echo "Welcome to... "
echo ""
echo " .d88888b.  .d8888b.  .d88888b. 888       d8b                888"
echo "d88P   Y88bd88P  Y88bd88P   Y88b888       Y8P                888"
echo "888     888888    888888     888888                          888"
echo "888     888888       888     88888888b.  8888 .d88b.  .d8888b888888.d8888b"
echo "888     888888       888     888888  88b  888d8P  Y8bd88P    888   88K"
echo "888 Y8b 888888    888888     888888  888  88888888888888     888    Y8888b."
echo "Y88b.Y8b88PY88b  d88PY88b. .d88P888 d88P  888Y8b.    Y88b.   Y88b.      X88"
echo "  Y888888    Y8888P    Y88888P  88888P    888  Y8888   Y8888P  Y888 88888P"
echo "       Y8b                                888"
echo "                                         d88P"
echo "                                       888P"
echo ""

sudo apt-get -y install software-properties-common
sudo add-apt-repository -y universe
sudo add-apt-repository -y ppa:certbot/certbot
sudo apt-get -y install certbot
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get -y update && sudo apt-get install yarn
sudo apt-get install -y nodejs
sudo apt-get -y upgrade
sudo su -c "groupadd -r qcobjects" root
sudo su -c "useradd -r -s /bin/bash -g qcobjects qcobjects" root
sudo su -c "usermod -a -G sudo qcobjects" root
mkdir -p /home/qcobjects && chown -R qcobjects:qcobjects /home/qcobjects
mkdir -p /etc/qcobjects && chown -R qcobjects:qcobjects /etc/qcobjects
mkdir -p /etc/data && chown -R qcobjects:qcobjects /etc/data

echo "NPM_PACKAGES=\"\${HOME}/.npm-packages\"" >> /home/qcobjects/.bashrc
echo "export PATH=\"\$NPM_PACKAGES/bin:\$PATH\"" >> /home/qcobjects/.bashrc
echo "export MANPATH=\"\$NPM_PACKAGES/share/man:\$(manpath)\"" >> /home/qcobjects/.bashrc
echo "prefix=\${HOME}/.npm-packages"  >> /home/qcobjects/.npmrc
mkdir -p /home/qcobjects/projects && chown -R qcobjects:qcobjects /home/qcobjects/projects
mkdir -p /home/qcobjects/projects/mynewapp && chown -R qcobjects:qcobjects /home/qcobjects/projects/mynewapp
echo "source ~/.npmrc" > /home/qcobjects/.bashrc
npm completion >> /home/qcobjects/.bashrc
source /home/qcobjects/.bashrc
sudo su -c "npm install -g npm" root
sudo su -c "npm install -g qcobjects-sdk" root
sudo su -c "npm install -g qcobjects-cli" root
sudo su -c "apt-get -y install --reinstall systemd" root
sudo su -c "wget -qO /etc/qcobjects/config.json https://cdn.qcobjects.dev/bin/install/ubuntu18/etc/qcobjects/config.json.template" root
sudo su -c "wget -qO /etc/systemd/system/qcobjects.service https://cdn.qcobjects.dev/bin/install/ubuntu18/etc/systemd/system/qcobjects.service" root
sudo mkdir -p /etc/letsencrypt/live/
sudo mkdir -p /etc/letsencrypt/live/mynewapp.qcobjects.com/
sudo chmod 775 /etc/letsencrypt/live/
sudo chmod 777 /etc/letsencrypt/live/mynewapp.qcobjects.com/
sudo su -c "cd /etc/qcobjects/ && npm install qcobjects-sdk --save && qcobjects-createcert" root
sudo su -c "cd /home/qcobjects/projects/mynewapp && npm install qcobjects-sdk --save" root
sudo su -c "cd /home/qcobjects/projects/mynewapp && qcobjects create --pwa mynewapp" qcobjects
sudo su -c "systemctl daemon-reload" root
sudo su -c "systemctl enable qcobjects" root
sudo su -c "systemctl start qcobjects" root
clear
echo "Welcome to... "
echo ""
echo " .d88888b.  .d8888b.  .d88888b. 888       d8b                888"
echo "d88P   Y88bd88P  Y88bd88P   Y88b888       Y8P                888"
echo "888     888888    888888     888888                          888"
echo "888     888888       888     88888888b.  8888 .d88b.  .d8888b888888.d8888b"
echo "888     888888       888     888888  88b  888d8P  Y8bd88P    888   88K"
echo "888 Y8b 888888    888888     888888  888  88888888888888     888    Y8888b."
echo "Y88b.Y8b88PY88b  d88PY88b. .d88P888 d88P  888Y8b.    Y88b.   Y88b.      X88"
echo "  Y888888    Y8888P    Y88888P  88888P    888  Y8888   Y8888P  Y888 88888P"
echo "       Y8b                                888"
echo "                                         d88P"
echo "                                       888P"
echo ""
echo "To start, use: su - qcobjects"
echo "and go to the path ~/projects/mynewapp"
echo ""
echo "To create a new progressive web app type: "
echo "> qcobjects create mynewapp --pwa"
echo ""
echo "To create an accelerated mobile page type: "
echo "> qcobjects create mynewapp --amp"
echo ""
echo "The QCObjects HTTP2 Server Settings file is in: "
echo "/etc/qcobjects/config.json"
echo ""
echo "To check the status of the service:"
echo "> service qcobjects status"
echo ""
echo "To start|stop|prestart the service:"
echo "> service qcobjects start"
echo "> service qcobjects stop"
echo "> service qcobjects restart"
echo ""
