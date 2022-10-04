import axios from 'axios'

export default {
  ADD_FILES (state, files) {
    Object.assign(state.case.files, files)
    for (let key in files) {
      state.case.fileOrder.push(parseInt(key))
    }
  },
  UPDATE_FILE (state, { id, title, stains }) {
    state.case.files[id].title = title
    state.case.files[id].stains = stains
  },
  UPDATE_FILE_META (state, { id, meta, stains }) {
    state.case.files[id].meta_data = meta
    if (stains) {
      state.case.files[id].stains = stains
    }
  },
  PUT_TO_DELETE_QUEUE (state, { caseId, fileId, title, timer }) {
    state.filesDeleteQueue = {...state.filesDeleteQueue, [fileId]: { caseId, title, timer }}
  },
  REMOVE_FROM_DELETE_QUEUE (state, id) {
    if (state.filesDeleteQueue[id]) clearTimeout(state.filesDeleteQueue[id].timer)
    const queue = { ...state.filesDeleteQueue }
    delete queue[id]
    state.filesDeleteQueue = queue
  },
  DELETE_FILE (state, id) {
    if (state.case.files[id]) {
      // Hack for clearing draggable slot caching
      const files = {...state.case.files}
      delete files[id]
      state.case.files = {...files}
    }
    state.case.fileOrder = state.case.fileOrder.filter(fileId => id !== fileId)
  },
  START_UPLOADING_FILE (state, file) {
    let uniqueIdentifier = file.options.fingerprint(file.file, file.options)
    let fileName = file.file.name
    let fileSize = file.file.size
    let numOfChuncks = fileSize / 10000
    if (!state.case.files.hasOwnProperty(uniqueIdentifier)) {
      state.case.files = {
        ...state.case.files,
        [uniqueIdentifier]: {
          id: uniqueIdentifier,
          title: fileName,
          progress: 0,
          size: fileSize,
          numOfChuncks: numOfChuncks,
          type: 'uploading'
        }
      }
      state.case.fileOrder.unshift(uniqueIdentifier)
    }
  },
  PROGRESS_UPLOADING_FILE (state, { percentComplete, uniqueIdentifier }) {
    state.case.files[uniqueIdentifier].progress = percentComplete
  },
  CANCEL_UPLOADING_FILE (state, file) {
    let uniqueIdentifier = file.options.fingerprint(file.file, file.options)
    state.case.fileOrder.splice(state.case.fileOrder.indexOf(uniqueIdentifier), 1)
    const files = { ...state.case.files }
    delete files[uniqueIdentifier]
    state.case.files = files
    if (file.url) {
      axios.delete(file.url,
        {
          headers: {
            'Tus-Resumable': '1.0.0',
            'Content-Length': 0
          }
        }).then(({data}) => {
          console.log(data)
        })
    }
  },
  SUCCESS_UPLOADING_FILE (state, { uniqueIdentifier, id, fileName, caseId }) {
    const files = {...state.case.files}
    const file = {
      id: id,
      title: fileName,
      type: 'uploading',
      case_id: caseId
    }
    delete files[uniqueIdentifier]
    state.case.fileOrder.splice(state.case.fileOrder.indexOf(uniqueIdentifier), 1)
    files[id] = file
    state.case.files = {...files}
    state.case.fileOrder.unshift(id)
  },
  FINALIZE_UPLOAD (state, msg) {
    const files = {...state.case.files}
    let id = msg.file.id
    if (msg.file.type_data && msg.file.type_data.original_file_id) {
      files[msg.file.type_data.original_file_id] = {}
      delete files[msg.file.type_data.original_file_id]
      id = msg.file.type_data.original_file_id
    } else {
      files[msg.file.id] = {}
      delete files[msg.file.id]
    }
    state.case.fileOrder.splice(state.case.fileOrder.indexOf(id), 1)
    files[msg.file.id] = msg.file
    state.case.files = {...files}
    state.case.fileOrder.unshift(msg.file.id)
  }
}



// WEBPACK FOOTER //
// ./src/store/mutations/files.js