import {NotifierOptions} from 'angular-notifier';

export const config: NotifierOptions = {
  position: {

    horizontal: {
      position: 'left',
      distance: 12
    },

    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10
    }

  },

  theme: 'material',

  behaviour: {

    autoHide: 5000,
    onClick: false,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4

  }

};
