import accountMutations from './account'
import casesMutations from './cases'
import filesMutations from './files'
import viewerMutations from './viewer'
import snapshotMutations from './snapshot'
import commonMutations from './common'
import teamManagerMutations from './team-manager'
import searchMutations from './search'
import relatedFind from './relatedFind'
import logs from './logs'
import diagnosis from './diagnosis'
import clinicianView from './clinician-view'

export default {
  ...commonMutations,
  ...accountMutations,
  ...casesMutations,
  ...filesMutations,
  ...viewerMutations,
  ...snapshotMutations,
  ...teamManagerMutations,
  ...searchMutations,
  ...relatedFind,
  ...logs,
  ...diagnosis,
  ...clinicianView
}



// WEBPACK FOOTER //
// ./src/store/mutations/index.js