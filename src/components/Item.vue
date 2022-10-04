<template lang="html">
  <div
    class="viewer-item"
    :class="{'comparing': comparing}"
    @touchstart.capture="showAllPanels"
    @keydown="onKeydown($event)"
  >
    <button v-if="ableToAct" class="close" :class="{ 'hidden' : !allPanelsVisible }" @click="ableToAct ? $emit('closeViewer', primary) : void 0" :title="$t('navigation.close')"></button>
    <snapshot v-if="isSnapshot" @screenshot="openScreenshotModal" @circleToggled="false"
        :file="file" :primary="primary" :ableToAct="ableToAct" :isWebinar="isWebinar" :panelVisible="allPanelsVisible"/>
    <osd-image :file="file" :primary="primary" v-if="isImage" @screenshot="openScreenshotModal" :ableToAct="ableToAct" :isWebinar="isWebinar" />
    <dicom :file="file" v-if="isDicom" :primary="primary" :ableToAct="ableToAct" :isWebinar="isWebinar" />
    <pdf :file="file" v-if="isPdf" :primary="primary" :ableToAct="ableToAct" :isWebinar="isWebinar" />
    <div class="empty-placeholder" v-if="!isFile">{{ $t('case.viewer.placeholder') }}</div>
    <div class="infopanel" :class="{ 'hidden' : !allPanelsVisible }">
      <div class="file-info-container" :class="{'webinar-center': !ableToAct}">
        <button v-if="ableToAct" class="download" :class="{'hidden': !isFile || isSnapshot || isDicom}" :title="$t('case.viewer.download')" @click="startDownload"><i/></button>
        <div class="file-info">
          <p class="file-info-name" :class="{'active': isFilePanelVisible}" @click="ableToAct ? toggleFilePanel() : void 0">{{ file.title }}</p>
          <div class="file-stains" v-if="file.stains && file.stains.length">
            <div class="file-stain" v-for="stain in file.stains">{{ getStainName(stain) }}</div>
          </div>
        </div>
        <button v-if="ableToAct" class="compare " :class="{'hidden': comparing || isMobile}" @click="ableToAct ? setViewerCompareMode() : void 0" :title="$t('case.viewer.compare')"><i/></button>
      </div>
      <transition name="panel">
        <files v-if="isFilePanelVisible"
               :selected="file.id"
               :primary="primary"
               :ableToAct="ableToAct"
               :isWebinar="isWebinar"
               @selectViewerFile="bubbleFilescrollSelect" />
      </transition>
    </div>
    <div class="save-screenshot" :class="{visible: screenshot.show}">
      <div class="save-modal">
        <button class="close" :title="$t('navigation.close')" @click="hideScreenshotModal"></button>
        <h2 class="title">{{ $t('case.screenshot.title') }}</h2>
        <h6 class="title-info">{{ $t('case.screenshot.subtitle') }}</h6>
       <div class="name-container" v-show="!screenshot.isImage">
          <span ref="screenshotStain"
                :contenteditable="!screenshot.saved"
                class="name"
                @input="updateScreenshotStain"
                :placeholder="$t('case.screenshot.stain')"></span>
        </div>
        <div class="name-container">
          <span ref="screenshotTitle"
                :contenteditable="!screenshot.saved"
                class="name"
                @input="updateScreenshotTitle"
                :placeholder="$t('case.screenshot.placeholder')"></span>
        </div>
        <div class="name-container">
        <button class="btn save-btn"
          :class="{'screenshot-saved': screenshot.saved}"
          :disabled="screenshotEmpty"
          @click="saveScreenshotToStore">
          <span :class="{hidden: screenshot.saved}">{{ $t('case.screenshot.save') }}</span>
        </button>
        </div>
        <span class="saved" :class="{hidden: !screenshot.saved}">{{ $t('case.screenshot.saved') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'ViewerItem',
  props: {
    file: {
      type: Object,
      required: true
    },
    primary: {
      type: Boolean,
      required: true
    },
    isOwner: Boolean,
    isWebinar: Boolean,
    ableToAct: Boolean
  },
  components: {
    Files: () => import('./FilesScroll'),
    Snapshot: () => import('./Snapshot'),
    OsdImage: () => import('./Image'),
    Pdf: () => import('./PDF'),
    Dicom: () => import('./Dicom')
  },
  data () {
    return {
      isFilePanelVisible: false,
      screenshot: {
        show: false,
        title: '',
        saved: false,
        data: null
      },
      timeoutID: null,
      allPanelsVisible: true
    }
  },
  computed: {
    isFile () {
      return !!Object.keys(this.file).length
    },
    isSnapshot () {
      return this.isFile && this.file.type === 'snapshot'
    },
    isImage () {
      return this.isFile && this.file.type === 'image'
    },
    isDicom () {
      return this.isFile && this.file.type === 'dicom'
    },
    isPdf () {
      return this.isFile && this.file.type === 'pdf'
    },
    isAudio () {
      return this.isFile && this.file.type === 'audio'
    },
    isDocument () {
      return this.isFile && this.file.type === 'document'
    },
    screenshotEmpty () {
      return !this.screenshot.title.length
    },
    ...mapState(['stains']),
    ...mapGetters(['comparing', 'isMobile'])
  },
  watch: {
    file () {
      this.checkFilePanelVisibility()
    }
  },
  methods: {
    onKeydown(event) {
      if (event.key === 'Escape') {
        this.ableToAct && this.$emit('closeViewer', this.primary)
      }
    },
    getStainName (stainId) {
      return this.stains.filter(item => item.id === stainId)[0].name
    },
    startDownload () {
      if (this.isImage || this.isPdf) {
        window.open(`/files/${this.file.name}`, '__blank')
      }
    },
    checkFilePanelVisibility () {
      this.isFilePanelVisible = !this.isFile
      this.$bus.$emit('filePanelVisibility', { value: this.isFilePanelVisible, primary: this.primary })
    },
    toggleFilePanel () {
      this.isFilePanelVisible = !this.isFilePanelVisible
      this.$bus.$emit('filePanelVisibility', { value: this.isFilePanelVisible, primary: this.primary })
    },
    saveScreenshotToStore () {
      if (!this.screenshot.saved) {
        const screenshot = {...this.screenshot.data}
        screenshot.title = this.screenshot.title
        screenshot.stain = this.screenshot.stain
        screenshot.isImage = this.screenshot.isImage
        this.saveScreenshot(screenshot)
        this.screenshot.saved = true
        setTimeout(() => {
          this.hideScreenshotModal()
        }, 1500)
      }
    },
    openScreenshotModal (screenshot, isImage = false) {
      this.screenshot.isImage = isImage
      if (this.file.stains.length > 0) {
        this.screenshot.stain = this.getStainName(this.file.stains[0])
        this.$refs.screenshotStain.textContent = this.screenshot.stain
      }

      this.screenshot.show = true
      this.screenshot.data = screenshot
    },
    hideScreenshotModal () {
      this.screenshot.show = false
      setTimeout(() => {
        this.screenshot.title = ''
        this.screenshot.saved = false
        this.screenshot.data = null
        this.$refs.screenshotTitle.textContent = ''
        this.$refs.screenshotStain.textContent = ''
      }, 500)
    },
    updateScreenshotTitle ($event) {
      this.screenshot.title = $event.target.textContent
    },
    updateScreenshotStain ($event) {
      this.screenshot.stain = $event.target.textContent
    },
    bubbleFilescrollSelect (data) {
      this.$emit('selectViewerFile', data)
    },
    showAllPanels () {
      this.allPanelsVisible = true
      if (this.timeoutID) {
        clearTimeout(this.timeoutID)
      }
      this.hidePanels()
    },
    hidePanels () {
      this.timeoutID = setTimeout(() => {
        if (this.isPdf) {
          return
        }
        this.allPanelsVisible = false
      }, 8000)
    },
    ...mapActions(['setViewerCompareMode', 'saveScreenshot'])
  },
  mounted () {
    this.checkFilePanelVisibility()
    document.addEventListener('mousemove', this.showAllPanels)
    this.showAllPanels()
    this.hidePanels()
  },
  beforeDestroy () {
    this.$bus.$off('setCursor', this.busSetCursor)
    document.removeEventListener('mousemove', this.showAllPanels)
    this.timeoutID = null
  }
}
</script>

<style lang="scss" scoped>
@import "src/globals.scss";

.viewer-item {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #000;

  &.comparing {
    width: calc(50% - 3px);

    @media (max-width: 500px) and (orientation: portrait) {
      width: 100%;
    }
  }
}

button {
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: 0 0;
}

.close {
  background-image: url(/static/icons/close_button.svg)!important;
  background-size: 300%;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 6;
  background-size: auto 100%;
  opacity: 1;

  @media (max-width: $tablet_max) {
    width: 30px;
    height: 30px;
  }
  @media (max-width: $mobile_max){
    right: auto;
    left: 10px;
    top: 10px;
    z-index: 15;
  }

  &:hover {
    background-position: 50% 0;
  }

  &:active {
    background-position: 100% 0;
  }

  &.hidden {
    visibility: hidden;
    opacity: 0;
    transition: opacity 2s, visibility 0s 2s;
  }
}

button{
  .hidden {
    visibility: hidden;
    opacity: 0;
  }
}

.empty-placeholder {
  @include fontHeader;
  color: #fff;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.infopanel {
  width: 100%;
  background-color: $dark;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  flex-grow: 0;
  position: relative;
  z-index: 5;
  opacity: 1;

  &.hidden {
    visibility: hidden;
    opacity: 0;
    transition: opacity 2s, visibility 0s 2s;
  }
}

.hidden {
  display: inherit!important;
}

.file-info-container {
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  min-height: 60px;

  &.webinar-center {
    justify-content: center;

    & .file-info-name::after {
      display: none;
    }
  }
}

.file-info-name {
  @include fontOther;
  color: #fff;
  margin: 0;
  text-align: center;
  width: 100%;
  cursor: pointer;
  user-select: none;

  &::after {
    content: '';
    display: inline-block;
    width: 12px;
    height: 8px;
    margin-left: 10px;
    background-image: url(/static/icons/toggle-chooser.svg);
    transform: rotate(180deg);
    transition: transform .2s ease-out;
  }

  &:hover::after {
    background-position: -12px 0;
  }

  &:active::after {
    background-position: -24px 0;
  }

  &.active::after {
    transform: rotate(0deg);
  }
}

// File panel animation
.panel-enter-active, .panel-leave-active {
  transition: all .3s ease;
}
.panel-enter, .panel-leave-to {
  height: 0px !important;
  opacity: 0;
}
.panel-enter-to, .panel-leave {
  height: 134px !important;
  opacity: 1;
}

.file-info {
  width: calc(100% - 120px);
}

.file-stains {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100%;
  margin-top: 5px;
}

.file-stain {
  @include fontCaption;
  color: #fff;
  margin-right: 5px;
  background-color: $blue_dirty;
  padding: 2px 10px;
  border-radius: 15px;
  user-select: none;
  cursor: default;
  max-width: calc(25% - 5px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
  text-align: center;

  &:last-of-type {
    margin-right: 0;
  }
}

button, a {
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: 0 0;

  &.hidden {
    visibility: hidden;
  }
}

.download {
  width: 60px;
  height: 60px;

  & i {
    display: inline-block;
    width: 18px;
    height: 30px;
    background-image: url(/static/icons/download.svg);
  }

  &:hover i {
    background-position: -18px 0;
  }

  &:active i {
    background-position: -36px 0;
  }
}

.compare {
  width: 60px;
  height: 60px;

  & i {
    display: inline-block;
    width: 40px;
    height: 30px;
    background-image: url(/static/icons/compare.svg);
  }

  &:hover i {
    background-position: -40px 0;
  }

  &:active i {
    background-position: -80px 0;
  }
}

.save-screenshot {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .7);
  z-index: 10;
  opacity: 0;
  transition: opacity .5s;
  pointer-events: none;
  &.visible {
    opacity: 1;
    pointer-events: all;

    & .save-modal {
      pointer-events: all;
    }
  }
}

.save-modal {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: calc(100% - 80px);
  max-width: 480px;
  background-color: #fff;
  border-radius: 8px;
  pointer-events: none;
  padding: 40px 30px 15px;

  @media (max-width: $mobile_max) {
    padding: 25px 10px 0;
    width: calc(100% - 30px);
  }

  & .close {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 0;
    right: -8%;
    @media (max-width: $mobile_max) {
      width: 30px;
      height: 30px;
      right: -29px;
    }

    &:hover {
      @media (max-width: $mobile_max) {
        background-position: -30px 0;
      }
    }

    &:active {
      @media (max-width: $mobile_max) {
        background-position: -60px 0;
      }
    }
  }

  & .title {
    @include fontHeader;
    text-align: center;
    margin-top: 0;
    margin-bottom: 5px;
  }

  & .title-info {
    @include fontOther;
    text-align: center;
    font-weight: normal;
    color: #8c8c8c;
    margin-top: 0;
    margin-bottom: 30px;
  }

  & .name-container {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0 10px;

  }

  & .name {
    @include fontOther;
    display: inline !important;
    text-align: center;
    margin-bottom: 1px;
    border: none;
    white-space: pre-wrap;
    cursor: text;

    &:empty:before {
      content: attr(placeholder);
      color: #8c8c8c;
      border-bottom: 1px dashed #2c3e50;
    }

    &:not(:empty):focus {
      margin-bottom: 0;
      border-bottom: 1px dashed #2c3e50;
    }
  }

  & .saved {
    display: block;
    text-align: center;
    font-size: smaller;
    color: $blue_deep;
    opacity: 1;
    transition: opacity .1s ease-in .2s;
    margin-top: 10px;

    @media (max-width: $tablet_max) {
      margin-top: 5px;
    }

    &.hidden {
      opacity: 0
    }
  }

  .save-btn {
    background-color: $blue_deep;
    margin-top: 30px;
    height: 42px;
    width: 270px;
    padding: 0;
    transition: width .25s ease-in, color .2s ease-in;
    white-space: nowrap;
    overflow: hidden;
    position: relative;

    @media (max-width: $tablet_max) {
      margin-top: 10px;
      height: 30px;
      padding-bottom: 2px;
    }

    &::after {
      content: '';
      display: block;
      background-image: url(/static/icons/applied_optins_white.svg);
      background-size: 100%;
      width: 17px;
      height: 14px;
      position: absolute;
      top: 50%;
      left: 50%;
      opacity: 0;
      transform: translate(-50%, -50%);
      transition: opacity .1s ease-in .2s;

      @media (max-width: $tablet_max) {
        width: 13px;
        height: 10px;
      }
    }

    &.screenshot-saved {
      width: 40px;
      color: $blue_deep;
      cursor: default;

      @media (max-width: $tablet_max) {
        width: 30px;
      }

      &::after {
        opacity: 1;
      }
      &:hover {
        color: transparent;
        background-color: $blue_deep;
      }
      &:active {
        color: transparent;
        background-color: $blue_deep;
      }
    }
  }


  & .title,
  & .title-info,
  & .saved {
    cursor: default;
    user-select: none;
  }
}

</style>
