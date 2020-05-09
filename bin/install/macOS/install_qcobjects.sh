#!/bin/zsh
# QCObjects macOS Installer Script
# ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
#Created On: February, 12, 2020
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
NODE_VERSION=${${$(curl -L https://nodejs.org/en/download/ |grep "LTS Version: ")[5]//"<\/strong>"/""}//"<strong>"/""}
curl "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}.pkg" > ~/Downloads/node-latest.pkg && installer -store -pkg ~/Downloads/node-latest.pkg -target "/"

echo "NPM_PACKAGES=\"~/.npm-packages\"" >>  ~/.bash_profile
echo "export PATH=\"\$NPM_PACKAGES/bin:\$PATH\"" >>  ~/.bash_profile
echo "export MANPATH=\"\$NPM_PACKAGES/share/man:\$(manpath)\"" >>  ~/.bash_profile
echo "prefix=~/.npm-packages"  >>  ~/.npmrc

echo "source ~/.bash_profile" > ~/.zshrc
echo "source ~/.npmrc" > ~/.zshrc
npm completion >> ~/.zshrc
source ~/.zshrc

npm install -g npm
npm install -g qcobjects-sdk
npm install -g qcobjects-cli
npm install -g qcobjects

ln -sf $(npm bin)/qco* /usr/local/bin
ln -sf ~/.npm-packages/bin/qco* /usr/local/bin

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
