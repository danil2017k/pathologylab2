import axios from 'axios'
import router from '@/router'
import WebSocket from 'reconnecting-websocket'
import Vue from 'vue'
import moment from 'moment'

export const login = ({ commit, dispatch }, credentials) => {
  return axios.post('/api/session', credentials)
}

export const signup = ({ commit, dispatch }, data) => {
  return axios.post('/api/account', data)
}

export const sendRestoreMail = ({ commit, dispatch }, email) => {
  return axios.post('/api/account/restore', { email })
}

export const confirmRestore = ({ commit }, credentials) => {
  axios.post('/api/account/restore', credentials)
  .then(() => {
    router.push('/')
  })
  .catch(({ response }) => {
    console.error(response)
  })
}

export const getAccount = ({ commit, dispatch, state }) => {
  return new Promise((resolve, reject) => {
    axios.get('/api/account')
      .then(({ data }) => {
        axios
          .get('/api/cases/notification/1')
          .then(res => commit('SET_HOTIFICATION_HISTORY', res.data))

        data.socket = new WebSocket(`${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/websocket/userId=${data.id}`, [], {
          maxReconnectionDelay: 10000,
          minReconnectionDelay: 1000,
          reconnectionDelayGrowFactor: 1.2,
          connectionTimeout: 3000
        })
        data.socket.onmessage = (msg) => dispatch('proceedSocketMessage', msg.data)
        data.socket.onerror = (error) => console.log('Ошибка соединения:' + JSON.stringify(error))
        data.socket.onclose = (event) => {
          if (event.wasClean) {
            console.log('Соединение закрыто чисто')
          } else {
            console.log('Обрыв соединения')
          }
          console.log('Код: ' + event.code + ' причина: ' + JSON.stringify(event))
        }
        // Change locale on account load or change
        Vue.config.lang = data.locale || 'ru'
        moment.locale(data.locale)

        if (data.access['admin']) {
          const msg = {
            type: 'admin_session',
            author: data,
            id: 'admin_' + data.id
          }

          commit('ADD_NOTIFICATION', msg)
          setTimeout(() => { if (state.notifications.find(elem => elem.id === msg.id)) commit('SHIFT_NOTIFICATION') }, 10000)
        }
        resolve(commit('LOAD_ACCOUNT', data))

        return axios.get('/api/autocompletes/collaborators')
      })
      .then(({ data }) => {
        resolve(commit('SET_ALL_COLLABORATORS', data.collaborators))
      })
      .catch(reject)
  })
}

export const changeAccount = ({ commit, dispatch }, payload) => {
  if (!payload.silentSave) {
    commit('LOADING')
  }
  return new Promise((resolve, reject) => {
    axios.put('/api/account', payload)
      .then(() => {
        if (payload.silentSave) {
          return
        }
        if (payload.locale) {
          commit('ACCOUNT_LOCALE_CHANGE', payload)
          Vue.config.lang = payload.locale
          moment.locale(payload.locale)
        } else {
          resolve(dispatch('getAccount'))
        }
      })
      .catch(e => {
        if (e.response.data.error === 'wrong_old_password') {
          reject('wrong_old_password')
        } else {
          reject(e)
        }
      })
  })
}

export const changeAvatar = ({ commit, dispatch }, payload) => {
  commit('LOADING')
  axios.post('/api/account/avatar', payload)
    .then(() => dispatch('getAccount'))
    .catch(console.error)
}

export const logout = ({ commit }) => {
  axios.delete('/api/session')
  .then(() => {
    commit('LOGOUT')
    router.push('/login')
    commit('SHIFT_NOTIFICATION')
  })
}



// WEBPACK FOOTER //
// ./src/store/actions/account.js