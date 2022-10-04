export default {
  OPEN_VIEWER (state, id) {
    // state.viewer.firstFile = state.case.files[id]
    state.viewer.firstFile = state.case.files[id]
    state.viewer.compareMode = false
    state.viewer.opened = true
    state.viewer.fullscreen = true
    state.viewer.panelOpened = false
  },
  CLOSE_VIEWER (state, isLeftViewer) {
    if (state.viewer.compareMode) {
      if (isLeftViewer) {
        state.viewer.firstFile = state.viewer.secondFile
        state.viewer.secondFile = {}
        state.viewer.compareMode = false
        state.viewer.syncronized = false
      } else {
        state.viewer.secondFile = {}
        state.viewer.compareMode = false
        state.viewer.syncronized = false
      }
    } else {
      state.viewer.opened = false
      state.viewer.compareMode = false
      state.viewer.fullscreen = false
      state.viewer.panelOpened = false
      state.viewer.firstFile = {}
      state.viewer.secondFile = {}
      state.viewer.syncronized = false
    }
  },
  VIEWER_COMPARE (state) {
    state.viewer.compareMode = true
  },
  TOGGLE_SYNCRONIZE (state) {
    state.viewer.syncronized = !state.viewer.syncronized
  },
  SELECT_VIEWER_FILE (state, { id, primary }) {
    console.log(Object.assign(state.case.files))

    const file = state.case.files[id]
    if (primary) {
      state.viewer.firstFile = file
      state.file = file
      console.log('SELECT VIEWER FILE !!', file, 'primary')
    } else {
      if (!state.viewer.compareMode) state.viewer.compareMode = true
      state.viewer.secondFile = file
    }
  },
  CREATE_MARK (state, { fileId, mark }) {
    const file = state.case.files[fileId]

    if (!file.type_data) {
      file.type_data = {}
    }
    if (!file.type_data.marks) {
      file.type_data.marks = []
    }

    file.type_data.marks.push(mark)
    state.case.files[fileId] = file
  },
  EDIT_MARK (state, { fileId, item }) {
    state.case.files[fileId].type_data.marks = state.case.files[fileId].type_data.marks.map(m => {
      if (m.id === item.id) {
        m.text = item.text
      }
      return m
    })
  },
  DELETE_MARK (state, { fileId, itemId }) {
    state.case.files[fileId].type_data.marks = state.case.files[fileId].type_data.marks.filter(m => m.id !== itemId)
  },
  CREATE_RULER (state, { fileId, ruler }) {
    const file = state.case.files[fileId]

    if (!file.type_data) {
      file.type_data = {}
    }
    if (!file.type_data.rulers) {
      file.type_data.rulers = []
    }

    file.type_data.rulers.push(ruler)
    state.case.files[fileId] = file
  },
  EDIT_RULER (state, { fileId, item }) {
    state.case.files[fileId].type_data.rulers = state.case.files[fileId].type_data.rulers.map(m => {
      if (m.id === item.id) {
        m.text = item.text
      }
      return m
    })
  },
  DELETE_RULER (state, { fileId, itemId }) {
    state.case.files[fileId].type_data.rulers = state.case.files[fileId].type_data.rulers.filter(m => m.id !== itemId)
  },
  TOGGLE_FULLSCREEN_PANEL (state) {
    state.viewer.panelOpened = !state.viewer.panelOpened
  },
  ADD_CIRCLE_RULER (state, { fileId, circleRuler}) {
    circleRuler.push(fileId)
    state.circleRuler.push(circleRuler);
  }
}



