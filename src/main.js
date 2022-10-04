
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import createI18n from 'vue-i18n'
import moment from 'moment'
import Vuetify from 'vuetify'

import store from './store'
import router from './router'
import locales from './locales'
import 'babel-polyfill'
import ru from './locales/ru'
// import VDateRange from 'vuetify-daterange-picker'
// import 'vuetify-daterange-picker/dist/vuetify-daterange-picker.css'

import App from './App'
// import VueSocketIO from 'vue-socket.io'

// import i18n from './i18n'
// import * as Sentry from '@sentry/browser'
// import * as Integrations from '@sentry/integrations'


// 2. Create VueI18n instance with options
Vue.use(createI18n)
const i18n = new createI18n({
    // set locale
    locale: 'ru',
    // set locale messages
    messages: ru
})




// Vue.use(Vuex)
// console.log('Vuex', Vuex);

// Vue.use(new VueSocketIO({
//     debug: true,
//     connection: 'localhost:3000',
//     vuex: {
//         store,
//         actionPrefix: 'SOCKET_',
//         mutationPrefix: 'SOCKET_'
//     },
//     options: { path: "/socket.io/" }, //Optional options
//   // extraHeaders: {
//   //   "super-header": "super"
//   // }
// }))
Vue.use(VueRouter)
console.log('VueRouter', VueRouter);

Vue.use(Vuetify)
console.log('Vuex', Vuetify);
// Vue.use(VDateRange)

// eslint-disable-next-line no-unused-vars
Vue.config.errorHandler = (err, vm, info) => {
  console.error(err)
}

const bus = new Vue({})

Object.defineProperty(Vue.prototype, '$bus', {
  get () {
    return this.$root.bus
  }
})

// const defaultBrowserLangulage = 'ru'
// Vue.config.lang = defaultBrowserLangulage
// moment.locale(defaultBrowserLangulage)
// Object.keys(locales).forEach(lang => {
//   Vue.locale(lang, locales[lang])
// })

Vue.filter('momentFormat', function (value, format) {
  return moment.unix(value).format(format)
})

Vue.filter('normaldate', function (value) {
  return moment.unix(value).format('DD.MM.YYYY HH:mm')
})

Vue.filter('normalDbDate', function (value) {
  return moment.utc(value).local().format('DD.MM.YYYY HH:mm')
})

Vue.filter('momentCalendar', function (value) {
  return moment.unix(value).calendar(null, {
    sameElse: function (now) {
      if (this.year() === now.year()) return 'D MMM'
      return 'D MMM YYYY'
    }
  })
})

Vue.filter('momentDateTime', function (value) {
  return moment.unix(value).format('DD.MM.YYYY hh:mm')
})

Vue.filter('momentRelative', function (value) {
  return moment.unix(value).fromNow()
})

Vue.filter('momentForTimer', function (value) {
  return moment.utc(value * 1000).format('H:mm:ss')
})

Vue.filter('truncate', function (value, length) {
  return value.length > length ? value.slice(0, length - 1) + '…' : value
})

Vue.filter('getAvatar', function (avatar) {
  return avatar ? `/files/avatars/${avatar}` : '/static/icons/default_avatar.svg'
})

const declOfNum = Vue.filter('declOfNum', function (number, titlesRu, titlesEn) {
  // number might be 0, so it will return from the function
  if (number === null || number === undefined) return null
  if (Vue.config.lang === 'ru') {
    let cases = [2, 0, 1, 1, 1, 2]
    return number + ' ' + titlesRu[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]
  } else {
    return number === 1 ? number + ' ' + titlesEn[0] : number + ' ' + titlesEn[1]
  }
})

Vue.filter('ageFromDOB', function (birthdate) {
  if (birthdate) {
    const years = moment().diff(birthdate, 'years')
    if (years === 0) {
      const months = moment().diff(birthdate, 'months')
      if (months === 0) {
        const days = moment().diff(birthdate, 'days')
        return declOfNum(days, ['день', 'дня', 'дней'], ['day old', 'days old'])
      }
      return declOfNum(months, ['месяц', 'месяца', 'месяцев'], ['month old', 'monthes old'])
    }
    return declOfNum(years, ['год', 'года', 'лет'], ['year old', 'years old'])
  }
  return null
})

/* eslint-disable no-new */
new Vue({
Vuetify,

  // store,
  router,
  data: {
    bus
  },
  i18n,
  render: h => h(App),
}).$mount('#app')

resize()

/* eslint-disable */
function mobileCheck () {
  var check = false;
  (function(a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) { check = true; }
  })(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

function mobileAndTabletCheck () {
  var check = false;
  (function(a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) { check = true; }
  })(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}
/* eslint-enable */

function resize () {
  const isMobile = mobileCheck()
  const isMobileOrTablet = mobileAndTabletCheck()
  const width = window.innerWidth
  store.commit('RESIZE', { isMobile, isMobileOrTablet, width })
}

window.onresize = resize