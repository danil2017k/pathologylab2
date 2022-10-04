import {makeStringId} from '../../utils'

export default {
  DIFFERENTIAL_DIAGNOSIS (state, payload) {
    state.differentialDiagnosis = payload
  },
  ADD_DIFFERENTIAL_DIAGNOSIS (state, payload) {
    state.differentialDiagnosis.push(payload)
  },
  DIAGNOSIS (state, payload) {
    state.diagnosis = payload
  },
  ADD_DIAGNOSIS_REASON_PROS (state, payload) {
    let id = makeStringId()
    if (payload.newReasonId) {
      id = payload.newReasonId
    }

    let inxD = state.diagnosis.findIndex(x => x.id == payload.diagId)
    if (inxD === -1) {
      return
    }
    state.diagnosis[inxD].reasonPros.push({
      type: payload.type ? payload.type : 0,
      text: payload.text ? payload.text : '',
      id: id,
      disabled: false
    })

    if (!state.account.socket || payload.isSocket) {
      return
    }

    state.account.socket.send(JSON.stringify({'type': 'add-reason',
      'diagId': payload.diagId,
      'reasonId': id,
      'userId': state.account.id,
      'reasonType': payload.type ? payload.type : 0,
      'text': payload.text ? payload.text : '',
      'target': 'pros'
    }))
  },
  ADD_DIAGNOSIS_REASON_CONS (state, payload) {
    let id = makeStringId()
    if (payload.newReasonId) {
      id = payload.newReasonId
    }

    let inxD = state.diagnosis.findIndex(x => x.id == payload.diagId)
    if (inxD === -1) {
      return
    }
    state.diagnosis[inxD].reasonCons.push({
      type: payload.type ? payload.type : 0,
      text: payload.text ? payload.text : '',
      id: id,
      disabled: false
    })

    if (!state.account.socket || payload.isSocket) {
      return
    }

    state.account.socket.send(JSON.stringify({'type': 'add-reason',
      'diagId': payload.diagId,
      'reasonId': id,
      'userId': state.account.id,
      'target': 'cons',
      'reasonType': payload.type ? payload.type : 0,
      'text': payload.text ? payload.text : ''
    }))
  },
  ADD_DIAGNOSIS (state, payload) {
    let diagId = makeStringId()
    let reasonProsId = makeStringId()
    let reasonConsId = makeStringId()

    if (payload.diagId) {
      diagId = payload.diagId
    }

    if (payload.reasonProsId) {
      reasonProsId = payload.reasonProsId
    }

    if (payload.reasonConsId) {
      reasonConsId = payload.reasonConsId
    }

    state.diagnosis.push({
      id: diagId,
      differentialDiagnos: null,
      reasonPros: [{
        type: 0,
        text: '',
        id: reasonProsId
      }],
      reasonCons: [{
        type: 0,
        text: '',
        id: reasonConsId
      }],
      accessoryText: payload.accessoryText ? payload.accessoryText : ''
    })

    if (!state.account.socket || payload.isSocket) {
      return
    }

    state.account.socket.send(JSON.stringify({'type': 'add-diagnosis',
      'diagId': diagId,
      'reasonProsId': reasonProsId,
      'reasonConsId': reasonConsId,
      'userId': state.account.id,
      'caseId': state.case.id,
      'accessoryText': payload.accessoryText ? payload.accessoryText : ''
    }))
  },
  REMOVE_DIAGNOSIS_REASON_PROS (state, payload) {
    let inxD = state.diagnosis.findIndex(x => x.id == payload.diagId)
    if (inxD === -1) {
      return
    }
    let inx = state.diagnosis[inxD].reasonPros.findIndex(x => x.text.length == 0)
    if (inx === -1) {
      return
    }
    state.diagnosis[inxD].reasonPros.splice(inx, 1)

    if (!state.account.socket || payload.isSocket) {
      return
    }

    state.account.socket.send(JSON.stringify({'type': 'remove-reason-pros',
      'diagId': payload.diagId,
      'userId': state.account.id
    }))
  },
  REMOVE_DIAGNOSIS_REASON_CONS (state, payload) {
    let inxD = state.diagnosis.findIndex(x => x.id == payload.diagId)
    if (inxD === -1) {
      return
    }
    let inx = state.diagnosis[inxD].reasonCons.findIndex(x => x.text.length == 0)
    if (inx === -1) {
      return
    }
    state.diagnosis[inxD].reasonCons.splice(inx, 1)

    if (!state.account.socket || payload.isSocket) {
      return
    }

    state.account.socket.send(JSON.stringify({'type': 'remove-reason-cons',
      'diagId': payload.diagId,
      'userId': state.account.id
    }))
  },
  REMOVE_DIAGNOSIS (state, payload) {
    let inx = state.diagnosis.findIndex(x => x.id == payload.diagId)
    if (inx === -1) {
      return
    }
    state.diagnosis.splice(inx, 1)

    if (!state.account.socket || payload.isSocket) {
      return
    }

    state.account.socket.send(JSON.stringify({'type': 'remove-diagnosis',
      'diagId': payload.diagId,
      'userId': state.account.id
    }))
  },
  SET_DIAGNOSIS_OPTION (state, payload) {
    let inxD = state.diagnosis.findIndex(x => x.id == payload.diagId)
    if (inxD === -1) {
      return
    }
    state.diagnosis[inxD].differentialDiagnos = payload.item

    if (!state.account.socket || payload.isSocket) {
      return
    }

    state.account.socket.send(JSON.stringify({'type': 'set-diagnos',
      'diagId': payload.diagId,
      'item': payload.item,
      'userId': state.account.id
    }))
  },
  SET_DIAGNOSIS_ACCESSORY (state, payload) {
    let inxD = state.diagnosis.findIndex(x => x.id == payload.diagId)
    if (inxD === -1) {
      return
    }
    state.diagnosis[inxD].accessoryText = payload.text

    if (!state.account.socket || payload.isSocket) {
      return
    }

    state.account.socket.send(JSON.stringify({'type': 'set-accessory',
      'diagId': payload.diagId,
      'text': payload.text,
      'userId': state.account.id
    }))
  },
  SET_DIAGNOSIS_REASON_TEXT_PROS (state, payload) {
    let inxD = state.diagnosis.findIndex(x => x.id == payload.diagId)
    if (inxD === -1) {
      return
    }
    let inx = state.diagnosis[inxD].reasonPros.findIndex(x => x.id == payload.reasonId)
    if (inx === -1) {
      return
    }
    state.diagnosis[inxD].reasonPros[inx].text = payload.text

    if (!state.account.socket || payload.isSocket) {
      return
    }

    state.account.socket.send(JSON.stringify({'type': 'change-reason-text',
      'reasonId': payload.reasonId,
      'userId': state.account.id,
      'text': payload.text
    }))
  },
  SET_DIAGNOSIS_REASON_TYPE_PROS (state, payload) {
    let inxD = state.diagnosis.findIndex(x => x.id == payload.diagId)
    if (inxD === -1) {
      return
    }
    let inx = state.diagnosis[inxD].reasonPros.findIndex(x => x.id == payload.reasonId)
    if (inx === -1) {
      return
    }
    state.diagnosis[inxD].reasonPros[inx].type = payload.type

    if (!state.account.socket || payload.isSocket) {
      return
    }

    state.account.socket.send(JSON.stringify({'type': 'change-reason-type',
      'reasonId': payload.reasonId,
      'userId': state.account.id,
      'typeValue': payload.type
    }))
  },

  SET_DIAGNOSIS_REASON_TEXT_CONS (state, payload) {
    let inxD = state.diagnosis.findIndex(x => x.id == payload.diagId)
    if (inxD === -1) {
      return
    }
    let inx = state.diagnosis[inxD].reasonCons.findIndex(x => x.id == payload.reasonId)
    if (inx === -1) {
      return
    }
    state.diagnosis[inxD].reasonCons[inx].text = payload.text

    if (!state.account.socket || payload.isSocket) {
      return
    }

    state.account.socket.send(JSON.stringify({'type': 'change-reason-text',
      'reasonId': payload.reasonId,
      'userId': state.account.id,
      'text': payload.text
    }))
  },
  SET_DIAGNOSIS_REASON_TYPE_CONS (state, payload) {
    let inxD = state.diagnosis.findIndex(x => x.id == payload.diagId)
    if (inxD === -1) {
      return
    }
    let inx = state.diagnosis[inxD].reasonCons.findIndex(x => x.id == payload.reasonId)
    if (inx === -1) {
      return
    }
    state.diagnosis[inxD].reasonCons[inx].type = payload.type

    if (!state.account.socket || payload.isSocket) {
      return
    }

    state.account.socket.send(JSON.stringify({'type': 'change-reason-type',
      'reasonId': payload.reasonId,
      'userId': state.account.id,
      'typeValue': payload.type
    }))
  },
  CLEAN_DIAGNOSIS_STATE (state) {
    state.diagnosis = []
  },
  CLEAN_DIAGNOSIS_REASON_PROS (state, payload) {
    let inxD = state.diagnosis.findIndex(x => x.id == payload.diagId)
    if (inxD === -1) {
      return
    }
    state.diagnosis[inxD].reasonPros = []

    if (!state.account.socket || payload.isSocket) {
      return
    }

    state.account.socket.send(JSON.stringify({'type': 'clean-reason-pros',
      'diagId': payload.diagId,
      'userId': state.account.id
    }))
  },
  CLEAN_DIAGNOSIS_REASON_CONS (state, payload) {
    let inxD = state.diagnosis.findIndex(x => x.id == payload.diagId)
    if (inxD === -1) {
      return
    }
    state.diagnosis[inxD].reasonCons = []

    if (!state.account.socket || payload.isSocket) {
      return
    }

    state.account.socket.send(JSON.stringify({'type': 'clean-reason-cons',
      'diagId': payload.diagId,
      'userId': state.account.id
    }))
  },
  DIAGNOSIS_REASON_STATE (state, payload) {
    for (let d of state.diagnosis) {
      for (let r of d.reasonPros) {
        if (r.id === payload.reasonId) {
          r.disabled = payload.disabled
        }
      }
      for (let r of d.reasonCons) {
        if (r.id === payload.reasonId) {
          r.disabled = payload.disabled
        }
      }
    }
  },
  DIAGNOSIS_REASON_TEXT (state, payload) {
    for (let d of state.diagnosis) {
      for (let r of d.reasonPros) {
        if (r.id === payload.reasonId) {
          r.text = payload.text
        }
      }
      for (let r of d.reasonCons) {
        if (r.id === payload.reasonId) {
          r.text = payload.text
        }
      }
    }
  },
  DIAGNOSIS_REASON_TYPE (state, payload) {
    for (let d of state.diagnosis) {
      for (let r of d.reasonPros) {
        if (r.id === payload.reasonId) {
          r.type = payload.type
        }
      }
      for (let r of d.reasonCons) {
        if (r.id === payload.reasonId) {
          r.type = payload.type
        }
      }
    }
  },
  FOCUS_DIAGNOSIS_REASON (state, payload) {
    if (!state.account.socket || payload.isSocket) {
      return
    }

    state.account.socket.send(JSON.stringify({'type': 'focus-element',
      'reasonId': payload.reasonId,
      'userId': state.account.id
    }))
  },
  BLUR_DIAGNOSIS_REASON (state, payload) {
    if (!state.account.socket || payload.isSocket) {
      return
    }

    state.account.socket.send(JSON.stringify({'type': 'blur-element',
      'reasonId': payload.reasonId,
      'userId': state.account.id
    }))
  }
}



// WEBPACK FOOTER //
// ./src/store/mutations/diagnosis.js