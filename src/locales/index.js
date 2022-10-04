import Vue from 'vue'
import en from './en'
import ru from './ru'

if (module.hot) {
  module.hot.accept(['./en', './ru'], () => {
    Vue.locale('en', require('./en').default)
    Vue.locale('ru', require('./ru').default)
  })
}

export default {
  en: en,
  ru: ru
}



// WEBPACK FOOTER //
// ./src/locales/index.js