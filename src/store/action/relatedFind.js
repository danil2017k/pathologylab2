import api from '../../api'
import moment from 'moment'
import _ from 'lodash'

export const findRelatedChangeModalVisible = ({commit}, value) => {
  commit('FIND_RELATED_MODAL_VISIBLE', value)
}



// WEBPACK FOOTER //
// ./src/store/actions/relatedFind.js