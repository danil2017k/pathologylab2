<template lang="html">
    <div class="viewer-item" :class="{'comparing': comparing}" @touchstart.capture="showAllPanels" @keydown="onKeydown($event)">
        <button v-if="ableToAct" class="close" :class="{ 'hidden' : !allPanelsVisible }" @click="ableToAct ? $emit('closeViewer', primary) : void 0" :title="$t('navigation.close')"></button>
        <ImageViewer :ableToAct="true" :file="file" :images="images" :selectedImage="selectedImage" :isWebinar="false" :panelVisible="true" :primary="primary" />
                <!-- <ImageViewer v-if="comparing" :ableToAct="true" :file="file" :isWebinar="false" :panelVisible="true" :primary="false" /> -->
        <div class="infopanel" :class="{ 'hidden' : !allPanelsVisible }">
            <div class="file-info-container" :class="{'webinar-center': !ableToAct}">
                <button v-if="ableToAct" class="download" :class="{'hidden': !isFile || isSnapshot}" :title="$t('case.viewer.download')" @click="startDownload"><i/></button>
                <div class="file-info">
                    <p class="file-info-name" :class="{'active': isFilePanelVisible}" @click="ableToAct ? toggleFilePanel() : void 0">{{ file.title }}</p>
                    <div class="file-stains" v-if="file.stains && file.stains.length">
                        <div class="file-stain">{{ getStainName(file.stains[0]) }}</div>
                    </div>
                </div>
                <button v-if="ableToAct" class="compare " :class="{'hidden': comparing || isMobile}" @click="ableToAct ? setViewerCompareMode() : void 0" :title="$t('case.viewer.compare')"><i/></button>
            </div>
            <transition name="panel">
                <files v-if="isFilePanelVisible" :selected="images.name" :primary="primary" :ableToAct="ableToAct" :isWebinar="isWebinar" @selectViewerFile="bubbleFilescrollSelect" :images="images" :selectedImage="selectedImage" />
            </transition>
        </div>
    </div>
</template>

<script>
import ImageViewer from '@/components/ImageViewer.vue'
import { mapState, mapGetters, mapActions } from 'vuex'


export default {
    name: 'ViewerOverlay',
    components: {
        ImageViewer,
        Files: () =>
            import ('./FilesScroll'),
    },

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



    data() {
        return {
            images: [
                {
                    id: 1,
                    name: '17647200532869870230',
                    selected: true
                },
                {
                    id: 2,
                    name: '3990297129929551095',
                    selected: false
                },
            ],
            selectedImage: '17647200532869870230',
            // file: fileObject,
  //           {
  //               case_id: '1',
  //               id: '101',
  //               preview: null, 
  // type: "snapshot", 
  //               type_data: { rulers: [], marks: [] },
  //               tileSources: `${publicPath}pyramids/47/WSI/Pyramids/DZ/3990297129929551095.dzi`
  //           },
            // primary: true,
            // isOwner: true,
            // isWebinar: false,
            // ableToAct: true,
            publicPath: 'localhost:8080/',
            isFilePanelVisible: false,
            screenshot: {
                show: false,
                title: '',
                saved: false,
                data: null
            },
            timeoutID: null,
            allPanelsVisible: true,
            // stains: [{}]
        }
    },
    computed: {
        isFile() {
            return !!Object.keys(this.file).length
        },
        isSnapshot() {

            return this.isFile && this.file.type === 'snapshot'
        },
        ...mapState(['stains']),
        ...mapGetters(['comparing', 'isMobile'])
    },
    mounted() {
        this.checkFilePanelVisibility()
        document.addEventListener('mousemove', this.showAllPanels)
        this.showAllPanels()
        this.hidePanels()
    },
    beforeDestroy() {
        document.removeEventListener('mousemove', this.showAllPanels)
        this.timeoutID = null
    },
    watch: {
        file() {
            this.checkFilePanelVisibility()
        }
    },
    methods: {
        onKeydown(event) {
            if (event.key === 'Escape') {
                this.ableToAct && this.$emit('closeViewer', this.primary)
            }
        },
        getStainName(stainId) {
            return this.file.stains[0]
        },
        startDownload() {
            if (this.isImage || this.isPdf) {
                window.open(`/files/${this.file.name}`, '__blank')
            }
        },
        checkFilePanelVisibility() {
            this.isFilePanelVisible = !this.isFile
            this.$bus.$emit('filePanelVisibility', { value: this.isFilePanelVisible, primary: this.primary })
        },
        toggleFilePanel() {
            this.isFilePanelVisible = !this.isFilePanelVisible
            this.$bus.$emit('filePanelVisibility', { value: this.isFilePanelVisible, primary: this.primary })
        },
        saveScreenshotToStore() {
            if (!this.screenshot.saved) {
                const screenshot = { ...this.screenshot.data }
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
        openScreenshotModal(screenshot, isImage = false) {
            this.screenshot.isImage = isImage
            if (this.file.stains.length > 0) {
                this.screenshot.stain = this.getStainName(this.file.stains[0])
                this.$refs.screenshotStain.textContent = this.screenshot.stain
            }

            this.screenshot.show = true
            this.screenshot.data = screenshot
        },
        hideScreenshotModal() {
            this.screenshot.show = false
            setTimeout(() => {
                this.screenshot.title = ''
                this.screenshot.saved = false
                this.screenshot.data = null
                this.$refs.screenshotTitle.textContent = ''
                this.$refs.screenshotStain.textContent = ''
            }, 500)
        },
        updateScreenshotTitle($event) {
            this.screenshot.title = $event.target.textContent
        },
        updateScreenshotStain($event) {
            this.screenshot.stain = $event.target.textContent
        },
        bubbleFilescrollSelect(data) {
            this.$emit('selectViewerFile', data)
        },
        showAllPanels() {
            this.allPanelsVisible = true
            if (this.timeoutID) {
                clearTimeout(this.timeoutID)
            }
            this.hidePanels()
        },
        hidePanels() {
            this.timeoutID = setTimeout(() => {
                if (this.isPdf) {
                    return
                }
                this.allPanelsVisible = false
            }, 8000)
        },
        ...mapActions(['setViewerCompareMode', 'saveScreenshot'])
    }
}
</script>

<style lang="scss" scoped>
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
    background-image: url(/public/images/close.png)!important;
    background-size: 300%;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 6;
    background-size: auto 100%;
    opacity: 1;
    @media (max-width: 600px) {
        width: 30px;
        height: 30px;
    }
    @media (max-width: 400px) {
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

button {
    .hidden {
        visibility: hidden;
        opacity: 0;
    }
}

.empty-placeholder {
    color: #fff;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.infopanel {
    width: 100%;
    background-color: rgb(8, 8, 125);
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
    display: inherit !important;
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
        margin-left: 10px; // background-image: url(/static/icons/toggle-chooser.svg);
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

.panel-enter-active,
.panel-leave-active {
    transition: all .3s ease;
}

.panel-enter,
.panel-leave-to {
    height: 0px !important;
    opacity: 0;
}

.panel-enter-to,
.panel-leave {
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
    color: #fff;
    margin-right: 5px;
    background-color: rgb(12, 12, 163);
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

button,
a {
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
        height: 30px; // background-image: url(/static/icons/download.svg);
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
        height: 30px; // background-image: url(/static/icons/compare.svg);
    }
    &:hover i {
        background-position: -40px 0;
    }
    &:active i {
        background-position: -80px 0;
    }
}
</style>
