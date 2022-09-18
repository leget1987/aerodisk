import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import '@mdi/font/css/materialdesignicons.css'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  // lang: 'ru',
  theme: {
    themes: {
      light: {
        primary: colors.blue.darken2, // #1976D2
        accent: colors.purple.darken1, // #8E24AA
        secondary: colors.grey.darken1, // #757575
        success: colors.green.darken1, // #43A047
        info: colors.blueGrey.darken1, // #546E7A
        warning: colors.orange.darken1, // #FB8C00
        error: colors.red.darken1 // #E53935
      }
    }
  }
})
