export default {
  disclaimer: 'All rights reserved UNIM Ltd., Digital Pathology v{version} ©, {number}, <a href="mailto:{email}">{email}</a>',
  navigation: {
    add_case: 'Add case',
    cases: 'Cases',
    puzzle: 'Puzzle',
    assistant: 'Assistant',
    share: 'Share',
    admin: 'Admin',
    admin_panel: 'Admin panel',
    consultation: 'Consultation',
    in_progress: 'Send to in progress',
    webinar: 'Webinar',
    registry: 'Registry',
    account: 'Account',
    expand_menu: 'Open menu',
    expand_case_menu: 'Return to the list of {case_type} cases',
    expand_puzzle_menu: 'Return to the list of cases of a puzzle {puzzle_name}',
    expand_cases: 'my | available | archive',
    archive: {
      push: 'Archive',
      pull: 'Pull from archive'
    },
    toggle_puzzle: {
      to: 'Add to Puzzles',
      from: 'Remove from Puzzles'
    },
    close: 'Close',
    share_case: 'Share',
    logs: 'Logs'
  },
  share: {
    title: 'Share this case',
    subtitle: 'To give access to the case, copy and send the link',
    copy: 'Copy link',
    public_link: 'Public sharing',
    public_text: 'Anyone will be able to watch the webinar using this link',
    copied: 'Link copied',
    error: 'Can not copy the link. Try to copy using Command+C or Ctrl+C',
    webinar_title: 'Invite listeners'
  },
  search: {
    title: 'Search',
    noResults: 'No data matching the search criteria',
    errors: {
      query: 'An error occurred while performing a search query. Try again later or refine your search query'
    },
    keywordField: {
      label: 'Search',
      placeholder: 'Start typing a word or phrase to search',
      hint: 'For example: invasive carcinoma'
    },
    whereReportsField: {
      label: 'In reports'
    },
    whereCasesField: {
      label: 'In cases'
    },
    whereCommentsField: {
      label: 'In comments'
    },
    whereDiagnosesField: {
      label: 'In diagnoses'
    },
    fromDateField: {
      label: 'From date'
    },
    toDateField: {
      label: 'to date'
    },
    item: {
      whereReport: {
        text: 'In report'
      },
      whereCase: {
        text: 'In case'
      },
      whereComment: {
        text: 'In comment'
      },
      whereDiagnosis: {
        text: 'In diagnosis'
      },
      validatedAt: {
        text: 'validated at'
      },
      createdAt: {
        text: 'created at'
      },
      publishedAt: {
        text: 'published at'
      },
      reportDetails: {
        text: 'Text',
        macroDescription: 'Macro description',
        microDescription: 'Micro description',
        discuss: 'Discuss',
        icd10: 'ICD-10',
        icdO: 'ICD-O',
        icdoMorphology: 'ICD-O Morphology',
        icdoTopography: 'ICD-O Topography',
        macroDescriptionProtocol: 'Macro protocol',
        microDescriptionProtocol: 'Micro protocol'
      },
      caseDetails: {
        patientName: 'Patient name',
        description: 'Description',
        incomingDiagnosis: 'Incoming diagnosis',
        specialization: 'Specialization'
      }
    }
  },
  account: {
    change_photo: 'Change photo',
    change_email: 'contact manager by +7&nbsp;(495)&nbsp;740&nbsp;05&nbsp;87 to change e-mail',
    sub_specialization: 'Nosological specialization',
    phone_errors: {
      too_short: 'The phone number you entered is too short, please check it again',
      too_long: 'The phone number you entered is too long, please check it again',
      libphone_error: 'number seems to be incorrect for this country, check it out please',
      country_code: 'incorrect country code, please type correct one',
      error: 'error'
    },
    specialization: 'Specialization',
    language: 'Language',
    notification_settings_btn: 'Notification settings',
    viewer_settings_btn: 'Viewer settings',
    change_password_btn: 'Change password',
    signout: 'Sign out',
    personal_data: 'use',
    agreement: 'Terms of {link}',
    password_change: {
      change_password: 'Change password',
      old_password: 'Old password',
      new_password: 'New password',
      old_password_error: 'Does not match the old password',
      done: 'Password changed'
    },
    pie: {
      left: 'Left',
      count: '{count} Gb'
    },
    to_save: 'to save an available space, delete not-current cases or',
    updrage: 'Upgrade account'
  },
  cases: {
    statuses: {
      unknown: 'Unknown',
      materials_preparing: 'Preparing',
      ready_for_diagnostics: 'Uploaded',
      report_in_progress: 'In progress',
      validation: 'Validation',
      validated: 'Validated',
      signing: 'Signing',
      archived: 'Archived'
    },
    switch_list_style: {
      tiles: 'Show as tiles',
      list: 'Show as list'
    },
    info: {
      gender: 'Gender',
      age: 'Age',
      male: 'Male',
      female: 'Female',
      created: 'Created',
      timeLeft: 'Time left',
      slidesLoaded: 'Slides are loaded',
      clientTitle: 'Client',
      clientSpecialist: 'Specialist'
    },
    tabs: {
      my: 'My',
      shared: 'New',
      need_validation: 'Need Validation',
      signing: 'Need Signing',
      validated: 'Validated',
      in_progress: 'In Progress',
      my_responsibility: 'My Responsibility',
      in_annotations: 'Annotated',
      archived: 'Archived',
      search: 'search'
    },
    search: {
      title: 'We did not find the information for your request',
      description: 'try changing search query'
    },
    empty: {
      title: 'Add your first case',
      description: 'the cases created by you will be stored here',
      add_new: 'Add case'
    },
    shared: {
      description: 'there will be cases in which you were invited as a specialist'
    },
    my_responsibility: {
      description: 'this list will contain cases where you will be a leader of a concilium, e.g. responsible for report creation and validation by all concilium members'
    },
    need_validation: {
      description: 'this list will contain cases where you will be a part of a concilium led by another specialist. You will need to validate the resulting report.'
    },
    signing: {
      description: 'this list will contain cases where you will be a part of a concilium led by another specialist. You will need to sign the resulting report.'
    },
    validated: {
      description: 'this list will contain cases either validated by you (if you are not a concilium\'s leader) or validated by all specialists (if you are a concilium\'s leader) and not yet put into the archive.'
    },
    annotated: {
      description: 'there will be cases with annotated slides'
    },
    archive: {
      title: 'You can send outdated cases to the archive',
      description: 'archived cases can be restored or deleted permanently',
      tab_notification: 'You can return archived cases back to the list of your cases. To do this, open the case and click '
    },
    loaded: 'All cases are loaded',
    error: {
      title: 'Fill case information',
      description: 'The more information about the case, the more accurate the consultation will be'
    },
    noname_case: 'Unnamed case',
    notification_history: 'The story is missing'
  },
  case: {
    title: 'Case',
    required: 'All case fields are required',
    clinicalData: {
      title: 'Clinical data requests',
      empty: 'No requests',
      date: 'Date',
      request: 'Request',
      emptyRequest: 'Request is empty',
      requestDetails: 'Request details',
      requestAction: 'Request data',
      readyAction: 'Data loaded',
      closeAction: 'Close',
      setOnHold: 'Set case on hold',
      execution: 'Execution',
      ready: 'Ready',
      pending: 'Pending'
    },
    validation: {
      chat: 'Chatting will become available after filling out all the information about the case',
      lab: 'Invitation of specialists will become available after filling in all information about the case',
      collaborators: 'You can request a consultation after filling out all the information about the case',
      reports: 'Viewing conclusions from specialists will become available after filling out all the information about the case',
      title: 'case title',
      specialization: 'specialization',
      dob: 'date of birth',
      description: 'description',
      fieldsLeft: 'It remains to fill',
      and: 'and',
      approving: 'Approve the report',
      approved: 'Report approved',
      in_progress: 'Report in progress'
    },
    morfoTool: {
      comment: 'Comment'
    },
    tabs: {
      description: 'Description',
      files: 'Files',
      chat: 'Chat',
      conclusion: 'Report | Reports',
      materials: 'Materials',
      specialists: 'Specialists',
      cases: 'Cases',
      diagnosis: 'Diagnosis'
    },
    diagnosis: {
      select_placeholder: 'Differential diagnosis',
      reason_pros: 'Reason "Pro"',
      reason_cons: 'Reason "Contra"',
      remove: 'Remove diagnosis',
      add: 'Add diagnosis',
      save: 'Save all',
      info_title: 'Diagnosis will be remove',
      info_first_line: 'Diagnosis {name} will be remove, after save you can not restore it.',
      info_secound_line: 'Are you sure?',
      placeholder_save: 'Saving, please wait...',
      entire_reason: 'Entire reason',
      info_cancel: 'Cancel',
      info_remove: 'Remove',
      accessory: 'Material/Belong to'
    },
    sharing: {
      title: 'Sharing'
    },
    description: {
      case_name: 'Case name',
      specialization: 'Choose specialization',
      specialization_empty: 'No specialization',
      case_description: 'Case description',
      clientSpecialist: 'Client specialist',
      externalLabel: 'External label',
      patient: {
        title: 'Patient',
        fullname: 'Full name',
        dob: 'Date of birth'
      },
      doctor: 'Doctor',
      matchByPatient: 'Matching by patient',
      clinicTitle: 'Clinic',
      diagnosis: 'Diagnosis',
      clinicalData: 'Clinical data',
      incomingMaterial: 'Incoming material',
      dateCreated: 'Created case',
      services: 'Services',
      reportDate: 'Published report',
      macroDescription: 'Macro description',
      macroProtocol: 'Macro protocol(s)',
      cuttingDoctors: 'Grossing doctor'
    },
    histoblocks: {
      caption: 'Blocks',
      ended: 'Material in histoblock is ended',
      new_order: 'Order new stains',
      new_genetic_research: 'Order new genetic research',
      modal: {
        head: 'Ordering for case',
        comment: 'Comment for laboratory',
        btn: 'Place order',
        sent: 'Order has been sent'
      }
    },
    files: {
      empty_owner: {
        title: 'Drag here the case files',
        description: 'Formats: .jpeg, .doc, .docx, .pdf, .svs, .btf, .zip(mrxs, vsi)'
      },
      empty: {
        title: 'No files for this case yet',
        description: 'the case owner will soon add files'
      },
      overlay: {
        title: 'Drag and drop files to any area of the case page',
        description: 'Formats: .jpeg, .doc, .docx, .pdf, .svs, .btf, .zip(mrxs, vsi)'
      },
      more: {
        group_operation: 'Bulk operation',
        rescan_operation: 'Rescan',
        magnification: 'Magnification',
        comment: 'Comment',
        method: 'Type operation',
        case: 'Case name',
        copy_to: 'Copy to',
        move_to: 'Move to',
        mirror_to: 'Duplicate to',
        send: 'Send',
        selected: 'Selected'
      },
      archived: 'To add files, restore the case from the archive',
      drop_here: 'or drag the case files here. Formats: .jpeg, .doc, .docx, .pdf, .svs, .btf, .zip(mrxs, vsi)',
      upload: 'Upload',
      sort_order: 'Customizable',
      creation_date: 'Create Date',
      file_name: 'By File Name'
    },
    material: {
      no_data: 'No Data',
      code: 'Code UNIM',
      oldCodeMaterial: 'Original Code',
      oldCodeBlock: 'Original Code / Material Code',
      oldCodeGlass: 'Original Code / Block Code',
      stain: 'Stain',
      cancel: 'Cancel',
      save: 'Save',
      addMaterial: 'Add Material',
      addBlock: 'Add Block',
      addGlass: 'Add Glass',
      edit: 'Edit',
      add: 'Add',
      delete: 'Are you sure you want to delete this item?'
    },
    file: {
      new_order: 'Snapshot will appear here<br>after scanning',
      tiling: 'Snapshot will appear here<br> after processing',
      delete: 'Delete file',
      cancel_upload: 'Cancel uploading',
      edit_metadata: 'Edit properties',
      show_label: 'Show label',
      current_code: 'Current number',
      old_code: 'Old number',
      save: 'Close',
      unwatch: 'Mark as not watched',
      overlay: {
        uploaded: 'File is uploaded and',
        processing: 'is in processing now',
        remaining: 'finish {when}',
        remaining_unknown: 'calculating the remaining time'
      },
      multiselect: {
        owner_placeholder: 'Choose stains',
        placeholder: 'Stains are not selected',
        search: 'Stain name...',
        empty_search: 'Stain is not found',
        limit: 'more {count}',
        max: 'Max 4 stains',
        choosen: 'Choosen statins',
        frequent: 'Frequent',
        other: 'All'
      },
      multiselect_reaction: {
        owner_placeholder: 'Reaction for {stainName}',
        placeholder: 'Reaction are not selected',
        search: 'Reaction name...',
        empty_search: 'Reaction is not found',
        limit: 'more {count}',
        max: 'Max 1 reaction',
        choosen: 'Reaction for {stainName}',
        frequent: 'Frequent',
        other: 'All'
      },
      type_of_pdf: {
        incoming_gistological: 'Incoming Gistological',
        incoming_genetic: 'Incoming Genetic',
        incoming_cytological: 'Incoming Cytological',
        direction_research: 'Direction to Research',
        incoming_document: 'Incoming Document',
        closing_service: 'Upon selecting "Incoming Genetic" you will be able to choose Genetic services to mark as executed',
        email_placeholder: 'Comment (will be sended by email)'
      }
    },
    gender: {
      m: 'Male',
      f: 'Female',
      null_choise: 'Not selected',
      placeholder_owner: 'Choose gender',
      placeholder: 'Gender is not selected'
    },
    chat: {
      empty: {
        title: 'Start a conversation',
        description: 'you can edit and delete your messages',
        title_read_only: 'Read only mode'
      },
      tooltip: 'Enter ‒ sending, Shit+Enter ‒ newline',
      message: 'Message',
      send: 'Send',
      delete: 'Delete',
      reply: 'Reply',
      save: 'Save',
      edit: 'Edit',
      archive_disabled: 'To add a message to the chat, restore the case from the archive'
    },
    reports: {
      previosly_reports: 'Open previous report',
      empty: {
        title: 'Here there will be conclusions of specialists whom you invited',
        description: 'specialists will not see the conclusion of the other participants in the case'
      },
      emptyOwnerArchive: {
        title: 'Restore the case from the archive to allow specialists to write conclusions'
      },
      emptyGuestArchive: {
        title: 'You can write a conclusion, if the owner will restore the case from the archive'
      },
      errors: {
        MKBcode: 'Choose ICD-10 code',
        ICDmorpho: 'Fill ICD-O morphology',
        ICDtopo: 'Fill ICD-O topography',
        protocol: 'Fill диагностический протокол',
        microphoto: 'Choose at least one microphoto',
        macrophoto: 'Choose at least one macrophoto',
        report: 'Fill the report'
      },
      guestArchiveWrite: 'You can change the conclusion if the owner restores the case from the archive',
      notApplicable: 'Not applicable',
      write: 'Write your conclusion',
      writeDiscuss: 'Write your discuss',
      writeMKB: 'MKB-10',
      writeICD: 'ICD-O',
      writeMicro: 'Write your additional description',
      writeMacro: 'Write your macro-description',
      add_stain: 'Add stain',
      add_more_stain: 'Add more stain',
      explanation: 'Explanation for stain',
      add_screenshots: 'Add micro photography',
      add_screenshots_to_macro: 'Add macro photography',
      save_new: 'Send report',
      save_sign: 'Sign report',
      save_sign_success: 'Report signed',
      save_amended: 'Send an amended conclusion',
      confirmEnableEditMode: 'Are you sure you want to edit validated report?',
      enable_force_edit: 'Edit',
      restore_report_form_backup: 'Restore report form backup',
      sent: 'Report sent',
      sending: 'Report sending',
      screenshots_modal: {
        heading: 'Screenshots',
        note: 'Check the screenshots you want to add to the report',
        add: 'Apply'
      },
      restore_report_modal: {
        heading: 'You are sure?',
        restore: 'Restore'
      },
      download: 'Download',
      download_report: 'Download conclusion',
      download_pdf_report: 'Download PDF',
      download_zip_report: 'Download ZIP',
      preview_pdf_report: 'Preview report PDF',
      advice1: 'To take a picture, use the Screenshot ',
      advice2: 'tool on the snapshot toolbar',
      advice3: 'To take a picture, use the Screenshot ',
      advice4: 'tool on the snapshot toolbar',
      her2: {
        open: 'HER2-interpreter',
        close: 'Hide HER2-interpreter'
      },
      ihc_recommended: 'IHC recommended',
      genetic_recommended: 'genetic recommended',
    },
    collaborators: {
      invite_btn: 'Invite specialists',
      archive_disabled: 'To invite specialists restore the case from the archive',
      not_empty: {
        description: 'Added specialists can view the case, write comments and reports',
        revoke: 'Revoke invite'
      },
      empty: {
        title: 'Invite specialists',
        description: 'specialists see case data, write messages and reports'
      },
      request: {
        title: 'Consultations of specialists',
        description: 'Within two hours after the request we will invite specialists who will be able to see the case data, write messages and reports',
        invite_btn: 'Request a consultation'
      },
      requested: {
        title: 'Request for consultation has been sent',
        description: 'Within two hours a list of specialists invited for consultation will appear here. If this did not happen, please contact us +7&nbsp;(495)&nbsp;374&nbsp;92&nbsp;07 or <a href="mailto:info@dpathology.com">info@dpathology.com</a>',
        invite_btn: 'Request for consultation has been sent',
        invited: 'Invited specialists',
        try_again: 'Your request for a consultation has already been sent to the administrator, do you want to send an additional comment to the request?'
      },
      guest: {
        title: 'You are the only invited specialist yet',
        description: 'maybe the case owner will invite someone else'
      },
      modal: {
        head: 'Invitation of specialists',
        input: 'Name or e-mail of a consultant',
        note_head: 'Invited specialists will be able to:',
        ability_1: '- view all information and event files<br>',
        ability_2: '- write messages to the chat room<br>',
        ability_3: '- write a conclusion on the case',
        abilities: '@:case.collaborators.modal.ability_1 @:case.collaborators.modal.ability_2 @:case.collaborators.modal.ability_3',
        send: 'Send invite',
        empty_alert: 'Enter at least one specialist',
        revoke_confirm: 'Are you sure you want to revoke the invitation from this specialist?',
        ds_glass_added: 'Glass is successfully added to the processing',
        ds_glass_already_added: 'Glass is already added for processing',
        ds_error_glass: 'Error at adding glass'
      },
      requestModal: {
        head: 'Request for consultation',
        request_comment: 'Comment on the consultation request',
        invite_comment: 'Text to the invitation',
        note_head: 'Invited for consultation specialists will be able to:',
        send: 'Send request'
      }
    },
    viewer: {
      compare: 'Compare',
      download: 'Download',
      zoom_in: 'Zoom in',
      zoom_out: 'Zoom out',
      zoom_5x: 'Zoom 5x',
      zoom_10x: 'Zoom 10x',
      zoom_20x: 'Zoom 20x',
      mark: 'Add mark',
      mark_cell: 'Add cell',
      mark_cell_edit: 'Edit cell',
      morfo_area: 'Edit morphology',
      membrane_view_area: 'View membrane',
      cell_tool_full: 'Fill',
      cell_tool_in: 'Inside',
      cell_tool_out: 'Outside',
      cell_tool_select: 'Select',
      cell_tool_positive: 'Positive',
      cell_tool_negative: 'Negative',
      cell_tool_delete: 'Delete',
      cell_tool_move: 'Move',
      cell_tool_save: 'Save Result',
      cell_tool_labels: 'Show labels',
      cell_tool_labels_size: 'Font size',
      cell_tool_labels_user: 'User',
      cell_tool_save_tmp: 'Save Draft',
      cell_tool_delete_tmp: 'Remove Draft',
      cell_info_confirm_delete_tmp: 'Draft will deleted, you are sure?',
      cell_tool_save_error: 'Error at saving result',
      cell_info_confirm: 'Confirm that you have marked the area as accurately as possible. If the area is not completely marked, the neural network will be trained incorrectly.',
      cell_info_confirm_tmp: 'The snapshot will be saved to drafts',
      ruler: 'Add ruler',
      circle: 'View circle',
      rotate_right: 'Rotate сlockwise',
      rotate_left: 'Rotate counter-clockwise',
      positive_level: 'Positive nuclei',
      negative_level: 'Negative nuclei',
      positive_level_new: 'New positive nuclei',
      negative_level_new: 'New negative nuclei',
      accuracy_new: 'Accuracy after corrections',
      positive_pct: 'Percentage',
      positive_pct_full: 'Total Percentage',
      error_cell: 'The request cannot be completed, please try again later',
      area_label: 'Area, mm^2',
      hpf_label: 'High Power Field',
      layer_history: 'List layers',
      opacity: 'Opacity',
      brightness: 'Brightness',
      threshold: 'Threshold',
      screenshot: 'Make screenshot',
      screenshot_select: 'Select area',
      screenshot_macro: 'Make screenshot',
      next_slide: 'Next image',
      please_select_serie: 'Please, select serie',
      serie: 'Ser',
      image: 'Imgage',
      loc: 'Pos',
      thick: 'Thick',
      zoom: 'Zoom',
      patientID: 'Patient ID',
      patientBirthDate: 'Patient Birth Date',
      series_loading: 'Series loading...',
      show_series: 'Show series',
      previous_slide: 'Previous image',
      sync: 'Synchronize',
      desync: 'Unsynchronize',
      placeholder: 'Select file',
      note: {
        write_comment: 'Write a comment to the {type}',
        no_comment: 'No comment to the {type}',
        delete_comment: 'Delete {type} and comment',
        mark: 'mark | mark',
        ruler: 'ruler | ruler'
      }
    },
    findRelated: {
      title: 'Related Images',
      openTool: 'Open tool',
      createArea: 'Create new area',
      showPannel: 'Show search results',
      targetImage: 'Target image',
      caseTitle: 'Case',
      fileTitle: 'Slide',
      noData: 'No data'
    },
    screenshot: {
      title: 'Snapshot',
      subtitle: 'Saved snapshots will attached to report',
      placeholder: 'Enter what you see on snapshot',
      save: 'Save the snapshot',
      saved: 'Snapshot saved',
      stain: 'Stain'
    },
    delete_queue: {
      file: 'File',
      deleted: 'deleted',
      cancel: 'Cancel'
    }
  },
  notifications: {
    error: {
      noReaction: 'Cannot send report: reaction was not chosen'
    },
    chat: {
      action: 'sent',
      what: 'message',
      where: 'in case'
    },
    invite: 'invited you to case',
    report: 'wrote a conclusion to case',
    archive: 'archived case',
    unarchive: 'restored case',
    note: {
      what: 'New mark | New marks',
      where: 'on snapshot in case'
    },
    file: {
      what: 'New file | New files',
      where: 'in case'
    },
    canNotValidate: 'Selected specialist cannot validate OMI cases',
    admin: 'You are logged in as admin. You can to view and change any cases',
    teamManager: {
      actionError: 'An error occurred during the operation'
    },
    cases: {
      createSlideRescanOrder: {
        error: 'Unable to create slide rescan order',
        notLisFile: 'The slide was not uploaded via LIS, rescan impossible',
        success: 'Slide rescan order was successfully sent'
      }
    },
    share: {
      changeShareState: {
        error: 'Unable to change case sharing state'
      }
    }
  },
  settings: {
    viewer: {
      title: 'Viewer settings',
      zoomMode: {
        title: 'Zoom mode',
        smooth: 'Smooth',
        discrete7: '7 levels',
        discrete14: '14 levels'
      },
      arrowsControlMode: {
        title: 'Arrows control mode',
        abrupt: 'Abrupt',
        flowing: 'Flowing'
      },
      arrowsControlSpeed: {
        title: 'Speed of arrows control',
        slow: 'Медленно',
        medium: 'Средне',
        fast: 'Быстро'
      }
    },
    settings: 'Notification settings',
    notify_by: 'Notify by',
    by_email: 'e-mail ({email})',
    by_sms: 'sms ({phone})',
    time: 'Notification time',
    timezone: 'Timezone',
    timezone_search: 'Select',
    events: 'Notification events',
    report: 'New conclusion in your case',
    comment: 'New message in case',
    invite: 'You`ve been invited to case',
    case_update: 'Updated information about case, added a file, marks',
    puzzle_new: 'New case in Pathology Puzzles',
    puzzle_message: 'New message in Pathology Puzzles case'
  },
  login: {
    login: {
      password: 'Password',
      restore: 'Remind password',
      login: 'Login',
      signup: 'Sign Up',
      error: 'wrong e-mail or password'
    },
    restore: {
      title: 'Password recovery',
      message_will: 'the password recovery link will be sent to this email',
      message_already: 'the password recovery link had been sent to {mail}',
      back: 'Back',
      restore: 'Restore password',
      emailMiss: `Sorry, this e-mail don't exist`,
      for_user: 'for user {name}'
    },
    success: {
      title: 'We sent a link for password recovery',
      message: 'check your email {mail}',
      check: 'Check email'
    },
    signup: {
      username: 'Username',
      organization: 'Organization',
      specialization: 'Specialization',
      phone: 'Phone number',
      phone_note: 'We will use your phone number to notify about important updates',
      locale: 'Location',
      agreement: 'Clicking on "SIGN UP" button you confirm your agreement with terms of {link}',
      link: 'personal data',
      login: 'Sign in',
      reqiredError: 'This field is required',
      emailError: 'Invalid e-mail. Example: ivan@gmail.com',
      emailTakenError: 'E-mail is already taken'
    }
  },
  datepicker: {
    1: 'January | January',
    2: 'Febrary | Febrary',
    3: 'March | March',
    4: 'April | April',
    5: 'May | May',
    6: 'June | June',
    7: 'July | July',
    8: 'August | August',
    9: 'September | September',
    10: 'October | October',
    11: 'November | November',
    12: 'December | December',
    day: 'day',
    month: 'month',
    year: 'year',
    twoInvalid: 'Choose {first} and {second}',
    oneInvalid: 'Choose {invalid}',
    clear: 'Clear date'
  },
  clinicians: {
    search: {
      label: 'Search by title / patient name'
    },
    noCases: 'Cases was not found',
    casesSelector: {
      allCases: 'All cases',
      inProgress: 'In progress',
      completed: 'Completed'
    }
  },
  controls: {
    autocompleteSuggest: 'Input or choose from the list',
    requiredField: 'Required field'
  },
  neuralSearch: {
    selectArea: 'Select snapshot area',
    popup: {
      search: 'Search by fragment',
      foundNumberWithCount: 'found {count} cases',
      helpTitle: 'The output is collected using a neural network.',
      helpDescription: {
        flagSelect: 'Unsuitable cases can be marked with a check box',
        relevantResults: `this will help the neural network to learn and
        produce more and more relevant results each time.`
      },
      reselectText: 'To specify a different fragment',
      flag: 'flag',
      searchResult: 'search result'
    },
    card: {
      resultPicture: 'A picture of a similar case',
      gender: {
        male: 'M',
        female: 'F'
      }
    }
  }
}



// WEBPACK FOOTER //
// ./src/locales/en.js