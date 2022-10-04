// import VueI18n from 'vue-i18n';
export default {
  disclaimer: 'Все права защищены ООО «ЮНИМ», Digital Pathology v{version} ©, {number}, <a href="mailto:{email}">{email}</a>',
  navigation: {
    add_case: 'Добавить случай',
    cases: 'Случаи',
    puzzle: 'Puzzle',
    assistant: 'Assistant',
    share: 'Share',
    admin: 'Admin',
    admin_panel: 'Панель админа',
    in_progress: 'Отправить в работу',
    consultation: 'Consultation',
    webinar: 'Вебинар',
    registry: 'Регистр',
    account: 'Аккаунт',
    expand_menu: 'Открыть меню',
    expand_case_menu: 'Вернуться в список {case_type} случаев',
    expand_puzzle_menu: 'Вернуться к списку кейсов паззла {puzzle_name}',
    expand_cases: 'моих | доступных | архивных',
    archive: {
      push: 'Поместить в архив',
      pull: 'Вытащить из архива'
    },
    toggle_puzzle: {
      to: 'Добавить в Puzzles',
      from: 'Убрать из Puzzles'
    },
    close: 'Закрыть',
    share_case: 'Поделиться',
    logs: 'Журнал событий'
  },
  share: {
    title: 'Поделитесь случаем',
    subtitle: 'Чтобы дать доступ к случаю, скопируйте и отправьте ссылку',
    public_link: 'Публичная ссылка',
    public_text: 'по этой ссылке любой сможет посмотреть вебинар',
    copy: 'Копировать ссылку',
    copied: 'Ссылка скопирована',
    error: 'Не удается скопировать ссылку. Попробуйте скопировать с помощью комбинации Command+C или Ctrl+C',
    webinar_title: 'Пригласите слушателей'
  },
  search: {
    title: 'Поиск',
    noResults: 'Нет данных, удовлетворяющих критериям поиска',
    errors: {
      query: 'Возникла ошибка при выполнении поискового запроса. Попробуйте позже или уточните критерии поиска.'
    },
    keywordField: {
      label: 'Поиск',
      placeholder: 'Начните вводить слово или фразу для поиска',
      hint: 'Например: инвазивная карцинома'
    },
    whereReportsField: {
      label: 'В заключениях'
    },
    whereCasesField: {
      label: 'В описании случаев'
    },
    whereCommentsField: {
      label: 'В комментриях'
    },
    whereDiagnosesField: {
      label: 'В диагнозах'
    },
    fromDateField: {
      label: 'С даты'
    },
    toDateField: {
      label: 'По дату'
    },
    item: {
      whereReport: {
        text: 'В заключении'
      },
      whereCase: {
        text: 'В описании случая'
      },
      whereComment: {
        text: 'В комментарии'
      },
      whereDiagnosis: {
        text: 'В диагнозе'
      },
      validatedAt: {
        text: 'свалидировано'
      },
      createdAt: {
        text: 'создан'
      },
      publishedAt: {
        text: 'опубликован'
      },
      reportDetails: {
        text: 'Текст',
        macroDescription: 'Макроописание',
        microDescription: 'Микроописание',
        discuss: 'Рассуждение',
        icd10: 'ICD-10',
        icdO: 'ICD-O',
        icdoMorphology: 'ICD-O Морфология',
        icdoTopography: 'ICD-O Топография',
        macroDescriptionProtocol: 'Протокол макроописания',
        microDescriptionProtocol: 'Протокол микроописания'
      },
      caseDetails: {
        patientName: 'Имя пациента',
        description: 'Описание',
        incomingDiagnosis: 'Входящий диагноз',
        specialization: 'Специализация'
      }
    }
  },
  account: {
    change_photo: 'Сменить аватар',
    change_email: 'для смены e-mail адреса обратитесь к менеджеру по телефону +7&nbsp;(495)&nbsp;740&nbsp;05&nbsp;87',
    sub_specialization: 'Нозологическая специализация',
    phone_errors: {
      too_short: 'Слишком короткий номер. Проверьте правильность ввода',
      too_long: 'Слишком длинный номер. Проверьте правильность ввода',
      libphone_error: 'Некорректный номер для выбранной страны. Проверьте правильность ввода',
      country_code: 'Неправильный код страны. Проверьте правильность ввода',
      error: 'ошибка'
    },
    specialization: 'Специализация',
    language: 'Язык интерфейса',
    notification_settings_btn: 'Настроить оповещения',
    viewer_settings_btn: 'Настроить просмотрщик',
    change_password_btn: 'Сменить пароль',
    personal_data: 'персональных данных',
    agreement: 'Соглашение о {link}',
    signout: 'Выйти',
    password_change: {
      change_password: 'Смена пароля',
      old_password: 'Старый пароль',
      new_password: 'Новый пароль',
      old_password_error: 'Не совпадает со старым паролем',
      done: 'Пароль изменён'
    },
    pie: {
      left: 'Осталось',
      count: '{count} ГБ'
    },
    to_save: 'для сохранения доступного места удаляйте неактуальные случаи, или',
    updrage: 'Обновите аккаунт'
  },
  cases: {
    statuses: {
      unknown: 'Не определен',
      materials_preparing: 'Подготовка',
      ready_for_diagnostics: 'Загружено',
      report_in_progress: 'В процессе',
      validation: 'Валидация',
      validated: 'Свалидирован',
      signing: 'На подписи',
      archived: 'В архиве'
    },
    switch_list_style: {
      tiles: 'Показать в виде плитки',
      list: 'Показать в виде списка'
    },
    info: {
      gender: 'Пол',
      age: 'Возраст',
      male: 'Мужской',
      female: 'Женский',
      created: 'Создан',
      timeLeft: 'Оставшееся время',
      slidesLoaded: 'Снимки загружены',
      clientTitle: 'Клиент',
      clientSpecialist: 'Специалист'
    },
    tabs: {
      my: 'Мои',
      shared: 'Новые',
      need_validation: 'Нужна валидация',
      signing: 'Нужна подпись',
      validated: 'Свалидировано',
      in_progress: 'В работе',
      my_responsibility: 'Я ответственный',
      in_annotations: 'Аннотированные',
      archived: 'Архивные',
      search: 'поиск'
    },
    search: {
      title: 'Мы не нашли информацию по вашему запросу',
      description: 'попробуйте изменить поисковый запрос'
    },
    empty: {
      title: 'Добавьте ваш первый случай',
      description: 'здесь будут храниться случаи, созданные вами',
      add_new: 'Добавить случай'
    },
    shared: {
      description: 'здесь будут храниться случаи, в которые вас пригласили как специалиста'
    },
    my_responsibility: {
      description: 'здесь будут храниться случаи, в которых вы будете ответственным за создание заключения и валидацию кейса другими специалистами'
    },
    need_validation: {
      description: 'здесь будут храниться случаи, в которых вы будете частью консилиума во главе с другими специалистами. Необходимо будет проверить итоговое заключение.'
    },
    signing: {
      description: 'здесь будут храниться случаи, в которых вы будете частью консилиума во главе с другими специалистами. Необходимо будет подписать ЭЦП итоговое заключение.'
    },
    validated: {
      description: 'здесь будут храниться случаи которые подтверждены всеми специалистами'
    },
    annotated: {
      description: 'здесь будут храниться случаи, в которых есть аннотированные объекты'
    },
    archive: {
      title: 'Вы можете отправлять неактуальные случаи в архив',
      description: 'случаи из архива можно восстановить или удалить окончательно',
      tab_notification: 'Вы можете вернуть архивные случаи обратно в список своих случаев. Чтобы сделать это, откройте случай и нажмите '
    },
    loaded: 'Все кейсы загружены',
    error: {
      title: 'Заполните информацию о случае',
      description: 'Чем больше информации о случае, тем точнее будет консультация'
    },
    noname_case: 'Безымянный случай',
    notification_history: 'История отсутсвует'
  },
  case: {
    title: 'Случай',
    required: 'Все поля случая обязательны для заполнения',
    clinicalData: {
      title: 'Запросы клинических данных',
      empty: 'Нет запросов',
      date: 'Дата',
      request: 'Запрос',
      emptyRequest: 'Запрос не заполнен',
      requestDetails: 'Детали запроса',
      requestAction: 'Запросить данные',
      readyAction: 'Данные загружены',
      closeAction: 'Закрыть',
      setOnHold: 'Поставить случай на ожидание',
      execution: 'Выполнение',
      ready: 'Выполнен',
      pending: 'Ожидается'
    },
    validation: {
      chat: 'Общение в чате станет доступным после заполнения всей информации о случае',
      lab: 'Приглашение специалистов станет доступным после заполнения всей информации о случае',
      collaborators: 'Вы сможете запросить консультацию после заполнения всей информации о случае',
      reports: 'Просмотр заключений от специалистов станет доступным после заполнения всей информации о случае',
      title: 'название случая',
      specialization: 'специализацию',
      dob: 'дату рождения',
      description: 'описание',
      fieldsLeft: 'Осталось заполнить',
      and: 'и',
      approving: 'Одобрить заключение',
      approved: 'Заключение одобрено',
      in_progress: 'Заключение в процессе создания'
    },
    tabs: {
      description: 'Описание',
      files: 'Файлы',
      chat: 'Чат',
      conclusion: 'Заключение | Заключения',
      materials: 'Материалы',
      diagnosis: 'Диагностика',
      specialists: 'Специалисты',
      cases: 'Кейсы'
    },
    diagnosis: {
      select_placeholder: 'Дифференциальный диагноз',
      reason_pros: 'Доводы "за"',
      reason_cons: 'Доводы "против"',
      remove: 'Удалить диагноз',
      add: 'Добавить диагноз',
      save: 'Сохранить диагностику',
      info_title: 'Диагноз будет удален',
      info_first_line: 'Диагноз {name} будет удален, после сохранения его нельзя будет восстановить.',
      info_secound_line: 'Вы уверены?',
      placeholder_save: 'Идет сохранение...',
      entire_reason: 'Введите довод',
      info_cancel: 'Отмена',
      info_remove: 'Удалить',
      accessory: 'Материал/Принадлежность'
    },
    sharing: {
      title: 'Общий доступ'
    },
    description: {
      case_name: 'Название случая',
      specialization: 'Выберите специализацию',
      specialization_empty: 'Нет специализации',
      case_description: 'Описание случая',
      clientSpecialist: 'Направляющий врач',
      externalLabel: 'Код клиента',
      patient: {
        title: 'Пациент',
        fullname: 'ФИО',
        dob: 'Дата рождения'
      },
      doctor: 'Врач',
      matchByPatient: 'Найденные совпадения по пациенту',
      clinicTitle: 'Направившее учреждение',
      diagnosis: 'Диагноз',
      clinicalData: 'Значимые клинические данные',
      incomingMaterial: 'Входящий материал',
      dateCreated: 'Дата создания случая',
      services: 'Услуги и работы',
      reportDate: 'Дата выдачи заключения',
      reportDateOut: 'Дата выдачи заключения',
      macroDescription: 'Макроописание',
      macroProtocol: 'Макро протокол(ы)',
      cuttingDoctors: 'Вырезку проводил(а)'
    },
    histoblocks: {
      caption: 'Блоки',
      ended: 'Закончился материал в блоке',
      new_order: 'Заказать новые окраски',
      new_genetic_research: 'Заказать генетическое исследование',
      modal: {
        head: 'Форма заказа',
        comment: 'Комментарий для лаборатории',
        btn: 'Отправить заказ',
        sent: 'Заказ отправлен'
      }
    },
    files: {
      empty_owner: {
        title: 'Перетащите сюда файлы случая',
        description: 'Форматы: .jpeg, .doc, .docx, .pdf, .svs, .btf, .zip(mrxs, vsi)'
      },
      empty: {
        title: 'Пока нет файлов для этого случая',
        description: 'владелец случая скоро добавит файлы'
      },
      overlay: {
        title: 'Перетаскивайте файлы в любую область страницы случая',
        description: 'Форматы: .jpeg, .doc, .docx, .pdf, .svs, .btf, .zip(mrxs, vsi)'
      },
      more: {
        group_operation: 'Групповая операция',
        rescan_operation: 'Отправить на пересканирование',
        magnification: 'Увеличение',
        comment: 'Комментарий',
        method: 'Тип операции',
        case: 'Имя кейса',
        copy_to: 'Копировать (полное/глубокое копирование в новый кейс)',
        move_to: 'Переместить (переместить в новый кейс)',
        mirror_to: 'Дублировать (создание дубликата в новом кейсе)',
        send: 'Отправить в обработку',
        selected: 'Выбрано'
      },
      archived: 'Чтобы добавить файлы, восстановите случай из архива',
      drop_here: 'или перетащите сюда файлы случая. Форматы: .jpeg, .doc, .docx, .pdf, .svs, .btf, .zip(mrxs, vsi)',
      upload: 'Загрузить',
      sort_order: 'Настраиваемая',
      creation_date: 'По дате создания',
      file_name: 'По имени файла'
    },
    material: {
      no_data: 'Данные отсутствуют',
      code: 'Маркировка UNIM',
      oldCodeMaterial: 'Оригинальная маркировка',
      oldCodeBlock: 'Оригинальная маркировка / маркировка родительского материала',
      oldCodeGlass: 'Оригинальная маркировка / маркировка родительского блока',
      stain: 'Окраска',
      cancel: 'Отмена',
      save: 'Сохранить',
      addMaterial: 'Добавить Материал',
      addBlock: 'Добавить Блок',
      addGlass: 'Добавить Стекло',
      edit: 'Редактировать',
      add: 'Добавить',
      delete: 'Вы уверены что хотите удалить элемент?'
    },
    file: {
      new_order: 'Здесь появится снимок<br>после его сканирования',
      tiling: 'Здесь появится снимок<br>после его обработки',
      delete: 'Удалить файл',
      edit_metadata: 'Редактировать свойства файла',
      show_label: 'Показать наклейку',
      current_code: 'Маркировка препарата UNIM',
      old_code: 'Оригинальная маркировка / маркировка родительского объекта',
      cancel_upload: 'Отменить загрузку',
      save: 'Закрыть',
      unwatch: 'Отметить как непросмотренный',
      overlay: {
        uploaded: 'Файл загружен и',
        processing: 'находится в обработке',
        remaining: 'окончание {when}',
        remaining_unknown: 'оставшееся время вычисляется'
      },
      multiselect: {
        owner_placeholder: 'Выбрать окраски',
        placeholder: 'Окраска не выбрана',
        search: 'Название окраски...',
        empty_search: 'Окраска не найдена',
        limit: 'ещё {count}',
        max: 'Максимум 4 окраски',
        choosen: 'Выбранные окраски',
        frequent: 'Частотные',
        other: 'Все'
      },
      multiselect_reaction: {
        owner_placeholder: 'Реакция для {stainName}',
        placeholder: 'Реакция не выбрана',
        search: 'Название реакции...',
        empty_search: 'Реакция не найдена',
        limit: 'ещё {count}',
        max: 'Максимум 1 реакция',
        choosen: 'Реакция для {stainName}',
        frequent: 'Частотные',
        other: 'Все'
      },
      type_of_pdf: {
        incoming_gistological: 'Гистологическое заключение',
        incoming_genetic: 'Генетическое заключение',
        incoming_cytological: 'Цитологическое заключение',
        direction_research: 'Направление на исследование',
        incoming_document: 'Входящий документ',
        closing_service: 'При выборе генетического заключения будет предложено закрыть услугу.',
        email_placeholder: 'Комментарий (будет отправлено в письме клиенту)'
      }
    },
    gender: {
      m: 'Мужской',
      f: 'Женский',
      null_choise: 'Не выбран',
      placeholder_owner: 'Выбрать пол',
      placeholder: 'Пол не выбран'
    },
    chat: {
      empty: {
        title: 'Начните общение',
        description: 'свои сообщения можно редактировать и удалять',
        title_read_only: 'Чат в режиме чтения'
      },
      tooltip: 'Enter ‒ отправка, Shit+Enter ‒ перенос строки',
      message: 'Сообщение',
      send: 'Отправить',
      delete: 'Удалить',
      save: 'Сохранить',
      reply: 'Ответить',
      edit: 'Редактировать',
      archive_disabled: 'Чтобы добавить сообщение в чат восстановите случай из архива'
    },
    reports: {
      previosly_reports: 'Открыть ранее выданное заключение',
      empty: {
        title: 'Здесь появится заключение специалиста',
        description: ''
      },
      emptyOwnerArchive: {
        title: 'Чтобы специалисты написали заключение, восстановите случай из архива'
      },
      emptyGuestArchive: {
        title: 'Вы сможете оставить заключение, если владелец восстановит случай из архива'
      },
      errors: {
        MKBcode: 'Выберите код МКБ-10',
        ICDmorpho: 'Заполните ICD-O морфологию',
        ICDtopo: 'Заполните ICD-O топологию',
        protocol: 'Заполните диагностический протокол',
        microphoto: 'Выберите хотя бы одно микрофото',
        macrophoto: 'Выберите хотя бы одно макрофото',
        report: 'Заполните свое заключение'
      },
      guestArchiveWrite: 'Вы сможете изменить заключение, если владелец восстановит случай из архива',
      notApplicable: 'Неприменимо',
      write: 'Напишите свое заключение',
      writeDiscuss: 'Напишите свое рассуждение',
      writeMKB: 'МКБ-10',
      writeICD: 'ICD-O',
      writeMicro: 'Дополнительная информация',
      writeMacro: 'Напишите свое макроописание',
      add_stain: 'Добавить окраску',
      add_more_stain: 'Добавить ещё окраску',
      explanation: 'Подпись к окраске',
      add_screenshots: 'Управлять микрофотографиями',
      add_screenshots_to_macro: 'Управлять макрофотографиями',
      save_new: 'Отправить заключение',
      save_sign: 'Подписать заключение',
      save_sign_success: 'Заключение успешно подписано',
      save_amended: 'Отправить изменённое заключение',
      confirmEnableEditMode: 'Вы уверены, что хотите редактировать свалидированное заключение?',
      enable_force_edit: 'Редактировать',
      restore_report_form_backup: 'Восстановить локальную версию заключения',
      sent: 'Заключение отправлено',
      sending: 'Заключение отправляется',
      screenshots_modal: {
        heading: 'Управление снимками',
        note: 'Отметьте снимки, которые хотите добавить к заключению',
        add: 'Применить'
      },
      restore_report_modal: {
        heading: 'Вы уверены, что хотите восстановить локальную версию?',
        restore: 'Да, восстановить'
      },
      download: 'Скачать заключение',
      download_report: 'Скачать заключение',
      download_pdf_report: 'Скачать PDF',
      download_zip_report: 'Скачать ZIP',
      preview_pdf_report: 'Предварительный просмотр в PDF',
      advice1: 'Чтобы сделать снимок, воспользуйтесь инструментом Snapshot',
      advice2: 'на панели инструментов снимка',
      advice3: 'Чтобы сделать изображение, воспользуйтесь инструментом Snapshot',
      advice4: 'на панели инструментов изображения',
      her2: {
        open: 'HER2-интерпретатор',
        close: 'Скрыть HER2-интерпретатор'
      },
      ihc_recommended: 'рекомендовано ИГХ',
      genetic_recommended: 'рекомендовано молекулярно-генетическое исследование',
    },
    collaborators: {
      invite_btn: 'Пригласить специалистов',
      archive_disabled: 'Чтобы пригласить специалистов, восстановите случай из архива',
      not_empty: {
        description: 'Добавленные специалисты могут просматривать случай, оставлять комментарии и писать заключения',
        revoke: 'Отозвать приглашение'
      },
      empty: {
        title: 'Пригласите специалистов',
        description: 'специалисты видят данные случая, пишут сообщения и оставляют заключения'
      },
      request: {
        title: 'Консультации специалистов',
        description: 'В течение двух часов после запроса мы пригласим специалистов, которые смогут видеть данные случая, писать сообщения и оставлять заключения',
        invite_btn: 'Запросить консультацию'
      },
      requested: {
        title: 'Заявка на консультацию отправлена',
        description: 'В течение двух часов здесь появится список специалстов, которых мы пригласили для консультации. Если этого не произошло свяжитесь пожалуйста с нами +7&nbsp;(495)&nbsp;374&nbsp;92&nbsp;07 или <a href="mailto:info@dpathology.com">info@dpathology.com</a>',
        invite_btn: 'Запрос на консультацию отправлен',
        invited: 'Приглашенные специалисты',
        try_again: 'Ваш запрос на консультацию уже отправлен администратору, хотите отправить дополнительный комментарий к запросу?'
      },
      guest: {
        title: 'Пока вы единственный приглашенный специалист',
        description: 'возможно, владелец случая пригласит кого-то еще'
      },
      modal: {
        head: 'Приглашение специалистов',
        input: 'Имя или e-mail консультанта',
        note_head: 'Приглашенные специалисты смогут:',
        ability_1: '- просматривать всю информацию и файлы случая<br>',
        ability_2: '- писать сообщения в чат<br>',
        ability_3: '- написать заключение по случаю',
        abilities: '@:case.collaborators.modal.ability_1 @:case.collaborators.modal.ability_2 @:case.collaborators.modal.ability_3',
        send: 'Отправить приглашение',
        empty_alert: 'Укажите данные хотя бы одного специалиста',
        revoke_confirm: 'Вы действительно хотите отозвать приглашение у данного специалиста?',
        ds_glass_added: 'Стекло успешно добавлено в обработку',
        ds_glass_already_added: 'Стекло уже добавлено в обработку',
        ds_error_glass: 'Ошибка при добавлении стекла'
      },
      requestModal: {
        head: 'Запрос консультации',
        request_comment: 'Комментарий к запросу консультации',
        invite_comment: 'Текст к приглашению',
        note_head: 'Приглашенные для консультации специалисты смогут:',
        send: 'Отправить запрос'
      }
    },
    morfoTool: {
      comment: 'Комментарий'
    },
    viewer: {
      compare: 'Сравнить',
      download: 'Скачать',
      zoom_in: 'Увеличить',
      zoom_out: 'Уменьшить',
      zoom_5x: 'Увеличение 5x',
      zoom_10x: 'Увеличение 10x',
      zoom_20x: 'Увеличение 20x',
      mark: 'Добавить отметку',
      mark_cell: 'Добавить разметку',
      mark_cell_edit: 'Редактировать разметку',
      morfo_area: 'Редактировать морфологию',
      membrane_view_area: 'Распознать мембраны/цитоплазмы',
      cell_tool_full: 'Полное заполнение',
      cell_tool_in: 'Только внутри',
      cell_tool_out: 'Только границы',
      cell_tool_positive: 'Положительные',
      cell_tool_negative: 'Отрицательные',
      cell_tool_delete: 'Удалить',
      cell_tool_move: 'Премещение',
      cell_tool_select: 'Выбор',
      cell_tool_save: 'Сохранить результат',
      cell_tool_labels: 'Показать подписи',
      cell_tool_labels_size: 'Размер шрифта',
      cell_tool_labels_user: 'Пользователь',
      cell_tool_save_tmp: 'Сохранить результат частично',
      cell_tool_delete_tmp: 'Удалить черновик',
      cell_tool_save_error: 'Ошибка при сохранении данных',
      cell_info_confirm: 'Убедитесь, что вы максимально точно разметили область. Если область размечена не полностью, нейросеть будет обучена неверно.',
      cell_info_confirm_tmp: 'Снимок будет сохранен в черновики',
      cell_info_confirm_delete_tmp: 'Снимок будет удален, вы уверены?',
      ruler: 'Добавить линейку',
      circle: 'Режим микроскопа',
      rotate_right: 'Повернуть по часовой стрелке',
      rotate_left: 'Повернуть против часовой стрелки',
      positive_level: 'Положительные',
      negative_level: 'Отрицательные',
      positive_level_new: 'Новые положительные',
      negative_level_new: 'Новые отрицательные',
      accuracy_new: 'Точность после коррекции',
      positive_pct: '% Положительных',
      positive_pct_full: 'Общий % Положительных',
      error_cell: 'Запрос не может быть выполнен, повторите попытку позже.',
      area_label: 'Площадь, мм^2',
      hpf_label: 'High Power Field',
      layer_history: 'Список слоев',
      opacity: 'Прозрачность',
      brightness: 'Яркость',
      threshold: 'Контраст',
      screenshot: 'Сделать скриншот',
      screenshot_select: 'Выделить область',
      screenshot_macro: 'Использовать скриншот',
      next_slide: 'Следующее изображение',
      please_select_serie: 'Пожалуйста, выберите серию',
      serie: 'Серия',
      image: 'Изображение',
      loc: 'Позиция',
      thick: 'Толщина',
      zoom: 'Масштаб',
      patientID: 'Пациент',
      patientBirthDate: 'Дата рождения',
      previous_slide: 'Предыдущее изображение',
      series_loading: 'Загрузка списка серий...',
      show_series: 'Показать серии',
      sync: 'Синхронизировать',
      desync: 'Рассинхронизировать',
      placeholder: 'Выберите файл',
      note: {
        write_comment: 'Напишите комментарий',
        no_comment: 'Нет комментария',
        delete_comment: 'Удалить',
        mark: 'отметке | отметку',
        ruler: 'линейке | линейку'
      }
    },
    findRelated: {
      title: 'Результат поиска похожих образцов',
      openTool: 'Открыть инструмент поиска',
      createArea: 'Нарисовать новую область',
      showPannel: 'Показать результаты поиска',
      targetImage: 'Искомый запрос',
      caseTitle: 'Кейс',
      fileTitle: 'Снимок',
      noData: 'Данные отсуствуют'
    },
    screenshot: {
      title: 'Снимок для заключения',
      subtitle: 'Сохраненные снэпшоты будут прикреплены к заключению',
      placeholder: 'Опишите кратко, что изображено на скриншоте',
      save: 'Сохранить снимок',
      saved: 'Снимок сохранен',
      stain: 'Окраска'
    },
    delete_queue: {
      file: 'Файл',
      deleted: 'удален',
      cancel: 'Отменить'
    }
  },
  notifications: {
    error: {
      noReaction: 'Невозможно отправить заключение: не выбрана реакция'
    },
    chat: {
      action: 'отправил(а)',
      what: 'сообщение',
      where: 'в случай'
    },
    invite: 'пригласил(а) вас в случай',
    report: 'написал(а) заключение в случай',
    archive: 'отправил(а) в архив случай',
    unarchive: 'восстановила(а) случай',
    note: {
      what: 'Новая отметка | Новые отметки',
      where: 'на снимке в случае'
    },
    file: {
      what: 'Новый файл | Новые файлы',
      where: 'в случаe'
    },
    canNotValidate: 'Выбранный специалист не может валидировать случаи ОМС',
    admin: 'Вы вошли как администратор. Вы имеете право просматривать и изменять любые кейсы',
    teamManager: {
      actionError: 'Во время выполнения операции произошла ошибка'
    },
    clinicianView: {
      actionError: 'Во время выполнения операции произошла ошибка'
    },
    cases: {
      createSlideRescanOrder: {
        error: 'Не удалось создать заказ на перескан гистологического препарата. Попробуйте повторить попытку через некоторое время',
        notLisFile: 'Выбранный гистологический препарат был загружен не через ЛИС, пересканирование невозможно.',
        success: 'Заказ на перескан гистологического препарата успешно отправлен'
      }
    },
    share: {
      changeShareState: {
        error: 'Не удалось изменить настройки доступа к случаю'
      }
    }
  },
  settings: {
    viewer: {
      title: 'Настройки просмотрщика',
      zoomMode: {
        title: 'Режим зуммирования',
        smooth: 'Плавный',
        discrete7: '7 уровней',
        discrete14: '14 уровней'
      },
      arrowsControlMode: {
        title: 'Режим управления стрелками',
        abrupt: 'Без инерции',
        flowing: 'C инерцией'
      },
      arrowsControlSpeed: {
        title: 'Скорость управления стрелками',
        slow: 'Медленно',
        medium: 'Средне',
        fast: 'Быстро'
      }
    },
    settings: 'Настройки оповещений',
    notify_by: 'Оповещать по',
    by_email: 'e-mail ({email})',
    by_sms: 'sms ({phone})',
    time: 'Время оповещений',
    timezone: 'Часовой пояс',
    timezone_search: 'Выбрать',
    events: 'События оповещений',
    report: 'Написали заключение в ваш случай',
    comment: 'Написали сообщение в случай',
    invite: 'Пригласили в случай',
    case_update: 'Обновилась информация о случае, добавился файл, отметки',
    puzzle_new: 'Опубликовали новый случай в Pathology Puzzles',
    puzzle_message: 'Написали сообщение в случай Pathology Puzzles'
  },
  login: {
    login: {
      password: 'Пароль',
      restore: 'Напомнить пароль',
      login: 'Войти',
      signup: 'Зарегистрироваться',
      error: 'неверный e-mail или пароль'
    },
    restore: {
      title: 'Восстановление пароля',
      message_will: 'ссылка для восстановления пароля будет отправлена на этот адрес',
      message_already: 'ссылка для восстановления пароля отправлена на адрес {mail}',
      back: 'Назад',
      restore: 'Восстановить пароль',
      emailMiss: 'Извините, этот e-mail не существует',
      for_user: 'для пользователя {name}'
    },
    success: {
      title: 'Мы отправили ссылку для восстановления пароля',
      message: 'проверьте почту {mail}',
      check: 'Проверить почту'
    },
    signup: {
      username: 'Имя пользователя',
      organization: 'Организация',
      specialization: 'Специализация',
      phone: 'Номер телефона',
      phone_note: 'Мы будем использовать Ваш номер телефона для оповещения о важных обновлениях',
      locale: 'Местоположение',
      agreement: 'Нажав на кнопку "ЗАРЕГИСТРИРОВАТЬСЯ", Вы подтверждаете свое согласие с условиями {link}',
      link: 'пользовательского соглашения',
      login: 'Войти',
      reqiredError: 'Это поле обязательно для заполнения',
      emailError: 'Недействительный e-mail. Пример: ivan@gmail.com',
      emailTakenError: 'Извините. Этот e-mail уже занят'
    }
  },
  datepicker: {
    1: 'Января | января',
    2: 'Февраля | февраля',
    3: 'Марта | марта',
    4: 'Апреля | апреля',
    5: 'Мая | мая',
    6: 'Июня | июня',
    7: 'Июля | июля',
    8: 'Августа | августа',
    9: 'Сентября | сентября',
    10: 'Октября | октября',
    11: 'Ноября | ноября',
    12: 'Декабря | декабря',
    day: 'день',
    month: 'месяц',
    year: 'год',
    twoInvalid: 'Выберите {first} и {second}',
    oneInvalid: 'Выберите {invalid}',
    clear: 'Очистить дату'
  },
  clinicians: {
    search: {
      label: 'Поиск по названию / имени пациента'
    },
    noCases: 'Кейсы не найдены',
    casesSelector: {
      allCases: 'Все кейсы',
      inProgress: 'В работе',
      completed: 'Завершенные'
    }
  },
  controls: {
    autocompleteSuggest: 'Введите или выберите из списка',
    requiredField: 'Обязательное поле'
  },
  neuralSearch: {
    selectArea: 'Выделите фрагмент снимка',
    popup: {
      search: 'Поиск по фрагменту',
      foundNumberWithCount: 'найдено {count} случаев',
      helpTitle: 'Выдача собрана с помощью нейросети.',
      helpDescription: {
        flagSelect: 'Неподходящие кейсы можно пометить флажком',
        relevantResults: 'это поможет нейронной сети обучаться и с каждым разом выдавать всё более релевантные результаты.'
      },
      reselectText: 'Указать другой фрагмент',
      flag: 'флаг',
      searchResult: 'результат поиска'
    },
    card: {
      resultPicture: 'Картинка похожего кейса',
      gender: {
        male: 'М',
        female: 'Ж'
      }
    }
  }
}



// WEBPACK FOOTER //
// ./src/locales/ru.js