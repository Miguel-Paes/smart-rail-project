/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify, useTheme } from 'vuetify'

import { useThemeStore } from '@/stores/themeStore'

const themeStore = useThemeStore()
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  if(themeStore.themeColor === 'red') {
  theme: {
    defaultTheme: 'redDark';
    themes: {
      redDark: {
        dark: true;
        colors: {
          base: '#F44336';
          lighten5: '#FFEBEE';
          lighten4: '#FFCDD2';
          lighten3: '#EF9A9A';
          lighten2: '#E57373';
          lighten1: '#EF5350';
          darken1: '#E53935';
          darken2: '#D32F2F';
          darken3: '#C62828';
          darken4: '#B71C1C';
          accent1: '#FF8A80';
          accent2: '#FF5252';
          accent3: '#FF1744';
          accent4: '#D50000';
        };
      };

      redLight: {
        colors: {
          base: '#F44336';
          lighten5: '#FFEBEE';
          lighten4: '#FFCDD2';
          lighten3: '#EF9A9A';
          lighten2: '#E57373';
          lighten1: '#EF5350';
          darken1: '#E53935';
          darken2: '#D32F2F';
          darken3: '#C62828';
          darken4: '#B71C1C';
          accent1: '#FF8A80';
          accent2: '#FF5252';
          accent3: '#FF1744';
          accent4: '#D50000';
        };
      };
    };
  };
}

if (themeStore.themeColor === 'yellow') {
  themes: {
    yellowDark: {
      dark: true;
      colors: {
        base: '#FFEB3B';
        lighten5: '#FFFDE7';
        lighten4: '#FFF9C4';
        lighten3: '#FFF59D';
        lighten2: '#FFF176';
        lighten1: '#FFEE58';
        darken1: '#FDD835';
        darken2: '#FBC02D';
        darken3: '#F9A825';
        darken4: '#F57F17';
        accent1: '#FFFF8D';
        accent2: '#FFFF00';
        accent3: '#FFEA00';
        accent4: '#FFD600';
      };
    };
  };
  yellowLight: {
    colors: {
      base: '#FFEB3B';
      lighten5: '#FFFDE7';
      lighten4: '#FFF9C4';
      lighten3: '#FFF59D';
      lighten2: '#FFF176';
      lighten1: '#FFEE58';
      darken1: '#FDD835';
      darken2: '#FBC02D';
      darken3: '#F9A825';
      darken4: '#F57F17';
      accent1: '#FFFF8D';
      accent2: '#FFFF00';
      accent3: '#FFEA00';
      accent4: '#FFD600';
    };
  };
};
};
  }
})