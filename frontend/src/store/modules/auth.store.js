import { UserService } from '../../services/user.service'
import { TokenService } from '../../services/storage.service'

const state = {
  accessToken: TokenService.getToken(),
  authenticationErrorStatus: 0,
  authenticationErrorStatusText: '',
  errors: {}
}

const getters = {
  loggedIn: state => {
    return !!state.accessToken
  }
}

const actions = {
  async login ({ commit }, { username, password }) {
    try {
      const token = await UserService.login(username, password)
      commit('loginSuccess', token)
      return true
    } catch (error) {
      commit('LOGIN_ERROR', error.response.data.errors)
      return Promise.reject(error)
    }
  },
  logout ({ commit }) {
    UserService.logout()
    commit('logoutSuccess')
  }

}

const mutations = {
  loginSuccess (state, accessToken) {
    state.accessToken = accessToken
  },
  LOGIN_ERROR (state, errors) {
    state.errors = errors
  },
  logoutSuccess (state) {
    state.accessToken = ''
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
