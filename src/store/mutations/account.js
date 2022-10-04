export default {
  LOAD_ACCOUNT (state, payload) {
    state.account = payload
    state.loading = false
  },
  LOGOUT (state) {
    state.account.socket.close(1000, state.account.id, { keepClosed: true })
    state.account = {}
  },
  ACCOUNT_NAME_CHANGE (state, payload) {
    state.account.name = payload
    state.loading = false
  },
  ACCOUNT_LOCALE_CHANGE (state, payload) {
    Object.assign(state.account, payload)
  }
}



// WEBPACK FOOTER //
// ./src/store/mutations/account.js