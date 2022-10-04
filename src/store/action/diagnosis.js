import axios from 'axios'
import router from '@/router'
import _ from 'lodash'

export const getDifferentialDiagnos = ({ commit, state }) => {
  axios.get(`/api/diagnosis/dict`).then((resp) => {
    commit('DIFFERENTIAL_DIAGNOSIS', resp.data.dict)
  })
}

export const saveDifferentialDiagnos = ({ commit, state }, label) => {
  return axios.post(`/api/diagnosis/dict`, {name: label}).then((resp) => {
    let obj = {code: resp.data.id, label: label}
    commit('ADD_DIFFERENTIAL_DIAGNOSIS', obj)

    return obj
  })
}

export const saveDiagnosis = ({ commit, state }, caseId) => {
  return axios.post(`/api/diagnosis`, {diagnosis: state.diagnosis, case_id: caseId})
}

export const getDiagnosis = ({ commit, state }, caseId) => {
  axios.get(`/api/diagnosis?case_id=${caseId}`).then((resp) => {
    if (resp.data.diagnosis !== null) {
      commit('DIAGNOSIS', resp.data.diagnosis)
    } else {
      commit('ADD_DIAGNOSIS', {})
    }
  })
}

export const addDiagnosis = ({ commit, state }) => {
  commit('ADD_DIAGNOSIS', {})
}
export const removeDiagnos = ({ commit, state }, payload) => {
  commit('REMOVE_DIAGNOSIS', payload)
}
export const addDiagnosReasonPros = ({ commit, state }, payload) => {
  commit('ADD_DIAGNOSIS_REASON_PROS', payload)
}
export const addDiagnosReasonCons = ({ commit, state }, payload) => {
  commit('ADD_DIAGNOSIS_REASON_CONS', payload)
}
export const removeDiagnosReasonPros = ({ commit, state }, payload) => {
  commit('REMOVE_DIAGNOSIS_REASON_PROS', payload)
}
export const removeDiagnosReasonCons = ({ commit, state }, payload) => {
  commit('REMOVE_DIAGNOSIS_REASON_CONS', payload)
}
export const setDifferentialDiagnos = ({ commit, state }, payload) => {
  commit('SET_DIAGNOSIS_OPTION', payload)

  if (!payload.item || !payload.item.code) {
    return
  }

  axios.get(`/api/diagnosis/prev?id=${payload.item.code}`).then((resp) => {
    if (!resp.data ||
      !resp.data.prev_diagnosis ||
      resp.data.prev_diagnosis.length == 0) {
      return
    }

    for (let d of resp.data.prev_diagnosis[0].diagnosis) {
      if (d.differentialDiagnos.code !== payload.item.code) {
        continue
      }
      if (d.reasonPros.length > 0) {
        commit('CLEAN_DIAGNOSIS_REASON_PROS', {diagId: payload.diagId})
      }
      for (let r of d.reasonPros) {
        commit('ADD_DIAGNOSIS_REASON_PROS', {
          text: r.text,
          type: 0,
          diagId: payload.diagId
        })
      }
      if (d.reasonCons.length > 0) {
        commit('CLEAN_DIAGNOSIS_REASON_CONS', {diagId: payload.diagId})
      }
      for (let r of d.reasonCons) {
        commit('ADD_DIAGNOSIS_REASON_CONS', {
          text: r.text,
          type: 0,
          diagId: payload.diagId
        })
      }
    }
  })
}

export const changeDiagnosReasonTextPros = ({ commit, state }, payload) => {
  commit('SET_DIAGNOSIS_REASON_TEXT_PROS', payload)
}
export const changeDiagnosReasonTypePros = ({ commit, state }, payload) => {
  commit('SET_DIAGNOSIS_REASON_TYPE_PROS', payload)
}

export const changeDiagnosReasonTextCons = ({ commit, state }, payload) => {
  commit('SET_DIAGNOSIS_REASON_TEXT_CONS', payload)
}
export const changeDiagnosReasonTypeCons = ({ commit, state }, payload) => {
  commit('SET_DIAGNOSIS_REASON_TYPE_CONS', payload)
}

export const cleanDiagnosState = ({ commit, state }) => {
  commit('CLEAN_DIAGNOSIS_STATE')
}

export const changeDiagnosAccessory = ({ commit, state }, payload) => {
  commit('SET_DIAGNOSIS_ACCESSORY', payload)
}

export const focusReason = ({ commit, state }, payload) => {
  commit('FOCUS_DIAGNOSIS_REASON', payload)
}

export const blurReason = ({ commit, state }, payload) => {
  commit('BLUR_DIAGNOSIS_REASON', payload)
}



// WEBPACK FOOTER //
// ./src/store/actions/diagnosis.js