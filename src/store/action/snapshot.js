import axios from 'axios'
import mqtt from '@/utils/mqtt'

export const processNeuralSearch = async (
  { commit }, { specializationID, sessionID, image }
) => {
  const [, trimmedImage] = image.split('data:image/png;base64,')

  try {
    const {data: response} = await axios.post('/ds-api/similar', {
      image: trimmedImage,
      specializationID
    })

    const topic = `ds-jobs/${response.data.ID}`

    const searchResult = await new Promise((resolve, reject) => {
      mqtt.subscribe(topic, async (topic, result) => {
        mqtt.unsubscribe(topic)
        console.log(result)
        resolve(result)
      })
    })

    if (!searchResult.CROPS) {
      return 404
    } else {
      const casesIDs = [...new Set(searchResult.CROPS.map(crop => crop.CASEID))]

      const caseMap = {}
      const { data: { cases } } = await axios.post(
        '/api/neural_search/cases', { ids: casesIDs }
      )

      cases.forEach(caseObj => { caseMap[caseObj.id] = caseObj })

      console.log(caseMap)

      const results = searchResult.CROPS.map(crop => {
        const data = caseMap[crop.CASEID]

        return {
          ID: data.id,
          title: data.title,
          date: new Date(data.creation_date * 1000),
          patient_gender: data.patient_gender,
          patient_birth_date: new Date(data.patient_birth_date),
          patient_location: data.specialization_name,
          incoming_diagnosis: data.diagnosis,
          report_diagnosis: data.diagnosis,
          case_image: '/tiles/' + crop.PATH,
          href: `${location.origin}/cases/${crop.CASEID}?file=${crop.FILEID}`
        }
      })

      commit('NEURAL_SEARCH_DONE', { sessionID, image, results })
    }
  } catch (error) {
    console.error(error)
  }
}

export const closeNeuralSearchPopup = ({ commit }) => {
  commit('NEURAL_SEARCH_CLOSE_POPUP')
}



// WEBPACK FOOTER //
// ./src/store/actions/snapshot.js