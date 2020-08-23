var Installer = function (root) {
    var promptEvent;

    var install = function (e) {
      logger.debug('installer actioned');
        if (promptEvent) {
          logger.debug('prompt event');

            promptEvent.prompt();
            promptEvent.userChoice
                .then(function (choiceResult) {
                    // The user actioned the prompt (good or bad).
                    // good is handled in
                    promptEvent = null;
 //                   root.classList.remove('available');
                })
                .catch(function (installError) {
                    // Boo. update the UI.
                    promptEvent = null;
                    root.classList.remove('available');
                });
        } else {
          logger.debug('not asking for install');
        }
    };

    var installed = function (e) {
        logger.debug('app is already installed');
        promptEvent = null;
//         This fires after onbeforinstallprompt OR after manual add to homescreen.
        root.classList.remove('available');
    };

    var beforeinstallprompt = function (e) {
        logger.debug('registering installer event');
        promptEvent = e;
        promptEvent.preventDefault();
        root.classList.add('available');
        return false;
    };

    window.addEventListener('beforeinstallprompt', beforeinstallprompt,false);
    window.addEventListener('appinstalled', installed,false);

    root.addEventListener('click', install.bind(this));
    root.addEventListener('touchend', install.bind(this));
};
