<template lang="html">
    <div id="viewer" class="viewer" ref="viewer">
        <div class="fullscreen-container" @click="toggleFullscreenPanel">
            <!-- <button class="fullscreen-btn"><i></i></button> -->
        </div>
        <button class="sync" :class="{'syncronized': viewer.syncronized}" v-if="syncronizeEnabled" @click="ableToAct ? $emit('toggleSynchronize') : void 0" :title="viewer.syncronized ? $t('case.viewer.desync') : $t('case.viewer.sync')">sync</button>
        <ViewerOverlay :file="file" :primary="true" v-show="file" :isOwner="isOwner" :isWebinar="isWebinar" :ableToAct="ableToAct" @selectViewerFile="bubbleFilescrollSelect" @closeViewer="bubbleCloseViewer" />
        <ViewerOverlay :file="file" :primary="false" v-if="viewer.compareMode" :isOwner="isOwner" :isWebinar="isWebinar" :ableToAct="ableToAct" @selectViewerFile="bubbleFilescrollSelect" @closeViewer="bubbleCloseViewer" />
        <div v-if="isWebinar && !ableToAct" class="cursor" :style="pointerStyle"></div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import throttle from 'lodash.throttle'
import ViewerOverlay from '../components/ViewerOverlay.vue'
import axios from 'axios'

export default {
    name: 'ViewerView',
    components: {
        ViewerOverlay
    },
    data() {
        return {
            pointerStyle: {
                left: null,
                top: null
            },
            isOwner: true,
            isWebinar: false,
            ableToAct: true,
            file: {}
        }
    },
    computed: {
        url(){
            return this.$route.params.url
        },
        //   case() {
        //   return this.$store.state.case;
        // },
        // load() {

        //     return loadJsonFileData()
        // },
        syncronizeEnabled() {
            return this.viewer.compareMode && this.isSnapshot(this.viewer.firstFile) && this.isSnapshot(this.viewer.secondFile)
        },
        fullscreenEnabled() {
            return document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled
        },
        ...mapState(['viewer', 'stains']),
        ...mapGetters(['fullscreen'])
    },
    mounted() {
        this.loadBaseCase()
        


        //       store.dispatch('loadCase').then(() => {

        // });
        // axios
        //     .get('http://localhost:3000/data')
        //     .then(({ data }) => {

        //         this.file = Object.assign(data[0])
        //         this.loadBaseCase(this.file)
        //         console.log(this.file)
        //     })



        // .then(response => (this.viewer.firstFile = response.data && console.log(response.data)));


        if (this.ableToAct) {
            const cursorUpdate = throttle(e => {
                const point = {
                    x: (e.pageX - (window.innerWidth - this.$refs.viewer.clientWidth)) / this.$refs.viewer.clientWidth,
                    y: e.pageY / window.innerHeight
                }
                this.$bus.$emit('sendMessage', {
                    action: 'cursor',
                    data: {
                        x: point.x,
                        y: point.y
                    }
                })
            }, 50)
            this.$refs.viewer.addEventListener('mousemove', e => cursorUpdate(e))
        }

        this.$bus.$on('setCursor', this.busSetCursor)
    },
    beforeDestroy() {
        this.$bus.$off('setCursor', this.busSetCursor)

    },
    methods: {
        async loadBaseCase() {
            await axios
                .get('http://localhost:3001/files', {
                      mode: 'no-cors'
                })
                .then(({ data }) => {
                    console.log(data, "!!!", data[0])

                    for (let key in data[0].files[8]) {
                        this.file[key] = data[0].files[8][key];
                    }
                    this.$store.dispatch('loadFirstCase', { data })
                    this.file = data[0]
                })

        },
        // ...mapMutations(['CASE_LOADED']),
        toObject(arr) {
            let rv = {};
            for (let i = 0; i < arr.length; ++i)
                rv[i] = arr[i];
            return rv;
        },
        isFile(file) {
            return !!Object.keys(file).length
        },
        isSnapshot(file) {
            return this.isFile(file) && file.type === 'snapshot'
        },
        bubbleFilescrollSelect(data) {
            this.$emit('selectViewerFile', data)
        },
        bubbleCloseViewer(data) {
            this.$emit('closeViewer', data)
        },
        busSetCursor(msg) {
            if (this.isWebinar && !this.ableToAct) {
                this.pointerStyle.top = `${window.innerHeight * msg.y}px`
                this.pointerStyle.left = `${window.innerWidth - this.$refs.viewer.clientWidth + (this.$refs.viewer.clientWidth * msg.x)}px`
            }
        },
        loadJsonFileData() {
            return this.$store.dispatch('loadJsonFileData');
        },
        ...mapActions(['toggleFullscreenPanel', 'loadCase', 'loadJsonFileData', 'loadFirstCase'])
    }
}
</script>

<style lang="scss" scoped>
.viewer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    z-index: 11;
    @media (max-width: 500px) and (orientation: portrait) {
        flex-direction: column;
    }
}

.fullscreen-container {
    position: absolute;
    width: 40px;
    height: calc(100% - 80px);
    left: 0;
    top: 0;
    cursor: pointer;
    z-index: 10;
    @media (max-width: 600px) {
        width: 30px;
    }
    & .fullscreen-btn {
        position: absolute;
        top: calc(50% + 40px);
        left: 0px;
        transform: translate(-50%, -50%);
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background-color: #fff;
        box-shadow: 0 0 7px 2px rgba(0, 0, 0, 0.2);
        transition: background-color .2s;
        & i {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(40%, -50%);
            width: 20px;
            height: 15px;
            display: inline-block; //   background-image: url(/images/button_hover.png);
            background-position: 0px;
            background: darkgreen;
        }
        @media (max-width: 600px) {
            width: 60px;
            height: 60px;
            & i {
                transform: translate(15%, -50%);
            }
        }
    }
    &:hover {
        & .fullscreen-btn {
            background-color: rgb(8, 8, 56);
        }
        & i {
            background-position: -20px;
        }
    }
}

@media (max-width: 500px) {
    .viewer {
        position: fixed;
    }
    .fullscreen {
        display: none;
    }
}

button {
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: 0 0;
}

.sync {
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 115px;
    z-index: 10; //   background-image: url(/static/icons/synchronize_not.svg);
    background-position: center;
    width: 40px;
    height: 40px;
    background-color: #fff;
    border: 2px solid blue;
    border-radius: 50%;
    @media (max-width: 500px) and (orientation: portrait) {
        top: 50%;
    }
    &:hover {
background: darkgoldenrod;
        border-color: blue;
    }
    &:active {
        border-color: rgb(43, 43, 132);
    }
    &.syncronized {
        // background-image: url(/static/icons/synchronize_active.svg);
        background-color: rgb(75, 75, 240);
        border-color: rgb(58, 58, 238);
        &:hover {
            //   background-image: url(/static/icons/synchronize_not.svg);
            background: grey;
            background-color: #fff;
        }
        &:active {
            border-color: rgb(113, 113, 233);
        }
    }
}

.cursor {
    width: 32px;
    height: 32px; //   background-image: url(/static/icons/pointer.svg);
    position: fixed;
    transition: top 50ms, left 50ms;
    z-index: 999;
}
</style>
