<template lang="html">
    <div class="snapshot" :class="{comparing: comparing}" ref="snapshot">
      <transition name="fade">
        <div class="current-zoom" ref="current-zoom" v-show="currentZoomVisible && !isWebinar">x{{ currentZoom }}</div>
      </transition>
      <svg ref="circle" class="svg-overlay" v-if="circleMode" :viewBox="circleViewbox"
           preserveAspectRatio="xMidYMid meet">
        <defs>
          <mask id="hole">
            <rect x="0" y="0" width="100%" height="100%" fill="white" style="height:100vh;"/>
            <circle cx="50%" cy="47.5%" r="25%" fill="black" ref="hole" style="cy: 47.5vh;"/>
          </mask>
        </defs>
        <rect y="0" width="100%" height="100%" mask="url(#hole)"/>
      </svg>
      <div :id="comparing && !primary ? 'osd2' : 'osd'" ref="osdel"></div>
      <NeuralSearchPopup
        v-if="this.tool === 'NeuralSearch' && this.neuralSearch.popupShown"
        class="neural-search_popup"
        :searchImage="this.neuralSearch.searchImage"
        :results="this.neuralSearch.results"
        @closeWindow="toggleNeuralSearchMode"
        @reselectFragment="reselectFragment"
      />
      <div
        v-if="this.tool === 'NeuralSearch' && this.neuralSearch.suggestShown"
        class="neural-search_suggest"
      >
        {{ $t('neuralSearch.selectArea') }}
      </div>
      <div
        class="tools"
        :class="{ 'hidden' : !panelVisible && !rulerMode && !markMode && !circleMode, comparing: comparing }"
        v-if="ableToAct"
      >
        <div class="tools-container">
          <a class="zoom_plus" @click="ableToAct && zoomIn($event)" :title="$t('case.viewer.zoom_in')"><i/></a>
          <a class="zoom_minus" @click="ableToAct && zoomOut($event)" :title="$t('case.viewer.zoom_out')"><i/></a>
          <a class="zoom-5x" @click="ableToAct && zoom5x($event)" :title="$t('case.viewer.zoom_5x')"><i/></a>
          <a class="zoom-10x" @click="ableToAct && zoom10x($event)" :title="$t('case.viewer.zoom_10x')"><i/></a>
          <a class="zoom-20x" @click="ableToAct && zoom20x($event)" :title="$t('case.viewer.zoom_20x')"><i/></a>
          <a class="contrast" @click="changeCanvasFilters"><i/></a>
          <a
            v-if="$route.name !== 'sharedCase' && !isArchived"
            class="pen" :class="{'selected': markMode}"
            :title="$t('case.viewer.mark')"
            @click="ableToAct && addMark()"
          ><i/></a>
          <a v-if="$route.name !== 'sharedCase' && !isArchived"
             class="ruler" :class="{'selected': rulerMode}"
             :title="$t('case.viewer.ruler')"
             @click="ableToAct && addRuler()"
          ><i/></a>
          <a
            class="view-circle" :class="{'selected': circleMode}"
            :title="$t('case.viewer.circle')"
            @click="ableToAct && viewCircle()"
          ><i/></a>
          <a
            class="rotate_right"
            :title="$t('case.viewer.rotate_right')"
            @click="ableToAct && rotate(true)"
          ><i/></a>
          <a class="rotate_left" @click="ableToAct && rotate()" :title="$t('case.viewer.rotate_left')"><i/></a>
          <a
            class="brain"
            v-if="(author && author.access && (author.access.glass_to_ds || author.access.admin))"
            @click="sendSlideToDs('general')"
          ><i/></a>
          <a
            v-if="(author && author.access && (author.access.works_with_ds || author.access.admin))"
            class="cell-area"
            :class="{ 'selected' : tool === 'Ki67' }"
            v-show="!isSmallDisplay"
            @click="toggleKi67mode"
          ><i/></a>
          <a
            v-if="(author && author.access && (author.access.works_with_ds || author.access.admin))"
            class="neural-search" v-show="!isSmallDisplay" :class="{ 'selected' : tool === 'NeuralSearch' }"
            @click="toggleNeuralSearchMode"
          ><i/></a>
          <a class="membrane-area" v-show="!isSmallDisplay" :class="{ 'selected' : isRecognizedWsi }"
             v-if="hasLayer() && (author && author.access && (author.access.works_with_ds || author.access.admin))"
             @click="openRecognizedWsi"><i/></a>
          <a @click="takeLayerPhotoWsi" v-show="isRecognizedWsi" class="screenshot-area" :title="$t('case.viewer.screenshot_select')"><i/></a>
          <a class="layers"
             v-if="hasLayer() && (author && author.access && (author.access.glass_to_ds || author.access.admin))"
             @click="openSlides()"><i/></a>
          <a v-show="!showSlides" class="cell-edit" v-if="author && author.access && (author.access.works_with_ds || author.access.admin)"
             :class="{'selected': isDrawing}" @click="openDrawing" :title="$t('case.viewer.mark_cell')"><i/></a>
          <a v-show="!showSlides" class="morfo-area" :class="{'selected': isFreeDrawing}" @click="openFreeDrawing"
             :title="$t('case.viewer.morfo_area')"><i/></a>
          <a v-if="!isOwner && !isWebinar"
             @click="makeScreenshot" class="screenshot" :title="$t('case.viewer.screenshot')"><i/></a>
          <!--
            TECH-495 - данный инструмент не поддерживается ML частью проекта в данный момент. Серверная часть не пеерезжает в новый ДЦ.
            a v-if="!isWebinar" @click="showRelatedTool = !showRelatedTool" class="search_menu" :class="{ 'selected' : showRelatedTool }"
            :title="$t('case.findRelated.openTool')"><i/></a>
          -->
          <div v-if="showSlides && layerHistory.length > 0" class="slider-wrapper">
            <label>{{$t('case.viewer.layer_history')}}</label>
            <br/>
            <select class="select-clear" v-model="layerIndex">
              <option v-for="item in layerHistory" v-bind:value="item.index">
                  {{ item.name }}
              </option>
            </select>
          </div>
          <div v-if="showSlides" class="slider-wrapper">
            <label>{{$t('case.viewer.opacity')}}</label>
            <br/>
            <input type="range" min="0" max="100" v-model.number="opacityBar" step="5">
          </div>
          <div v-if="showSlides" class="slider-wrapper" style="margin-bottom: 15px;">
            <input type="checkbox" id="threshold" value="false" v-model="useThreshold">
            <label for="threshold">{{$t('case.viewer.threshold')}}</label>
            <br/>
            <input type="range" min="0" max="400" v-model.number="contrastBar" step="1">
          </div>
        </div>
      </div>
      <div class="tools-top" :class="{ 'hidden' : !showTools}">
        <div class="tools-container">
          <div class="slider-wrapper" style="float: left;">
            <p style="text-align: center; margin-bottom: 0;">{{$t('case.viewer.opacity')}}</p>
            <input type="range" min="0" max="100" v-model.number="tileOpacityBar" step="1">
          </div>
          <a class="cell-full" @click="setTileImage('full')"
             :class="{'selected': cellType === 'full'}"
             :title="$t('case.viewer.cell_tool_full')"
          ><i/></a>
          <a class="cell-in" @click="setTileImage('in')"
             :class="{'selected': cellType === 'in'}"
             :title="$t('case.viewer.cell_tool_in')"
          ><i/></a>
          <a class="cell-out" @click="setTileImage('out')"
             :class="{'selected': cellType === 'out'}"
             :title="$t('case.viewer.cell_tool_out')"
          ><i/></a>
        </div>
      </div>
      <div class="tools-top" v-if="showCustomFilter" style="right: 47%">
        <a href="#" @click="setPreset(0)" style="text-align: center;" :class="{'selected-a': presetId === 0}">1</a>
        <a href="#" @click="setPreset(1)" style="text-align: center;" :class="{'selected-a': presetId === 1}">2</a>
        <a href="#" @click="setPreset(2)" style="text-align: center;" :class="{'selected-a': presetId === 2}">3</a>
        <div class="slider-wrapper" style="display: inline-block;">
          <label>{{$t('case.viewer.brightness')}}</label>
          <br/>
          <input type="range" min="-255" max="255" v-model.number="brightnessBar" step="1">
        </div>
        <div class="slider-wrapper" style="margin-bottom: 15px; display: inline-block;">
          <label>{{$t('case.viewer.threshold')}}</label>
          <br/>
          <input type="range" min="0" max="400" v-model.number="contrastBar" step="1">
        </div>
      </div>
      <div class="tools-top" :class="{ 'hidden' : !isDrawing }" v-if="ableToAct">
        <div class="tools-container">
          <div class="slider-wrapper" style="float: left;">
            <select class="select-clear" v-model="expression">
              <option v-for="option in expressions" v-bind:value="option.value">
                {{ option.text }}
              </option>
            </select>
          </div>
          <div class="slider-wrapper" style="float: left;">
            <p style="text-align: center; margin-bottom: 0;">{{$t('case.viewer.opacity')}}</p>
            <input type="range" min="0" max="100" v-model.number="tileOpacityBar" step="1">
          </div>
          <a class="cell-positive" @click="cellTool = 'positive'" :class="{'selected': cellTool === 'positive'}"
             :title="$t('case.viewer.cell_tool_positive')"><i/></a>
          <a class="cell-negative" @click="cellTool = 'negative'" :class="{'selected': cellTool === 'negative'}"
             :title="$t('case.viewer.cell_tool_negative')"><i/></a>
          <a class="cell-move" @click="cellTool = 'move'" :class="{'selected': cellTool === 'move'}"
             :title="$t('case.viewer.cell_tool_move')"><i/></a>
          <a class="cell-delete" @click="cellTool = 'delete'" :class="{'selected': cellTool === 'delete'}"
             :title="$t('case.viewer.cell_tool_delete')"><i/></a>
          <a class="cell-save" @click="cellTool = 'save'" :class="{'selected': cellTool === 'save'}"
             :title="$t('case.viewer.cell_tool_save')"><i/></a>
          <a class="cell-save-tmp" @click="cellTool = 'save-tmp'" :class="{'selected': cellTool === 'save-tmp'}"
             :title="$t('case.viewer.cell_tool_save_tmp')"><i/></a>
          <a class="cell-delete-tmp" @click="cellTool = 'delete-tmp'" :class="{'selected': cellTool === 'delete-tmp'}"
             :title="$t('case.viewer.cell_tool_delete_tmp')"><i/></a>
        </div>
      </div>
      <div class="tools-top" style="right: 47%;" :class="{ 'hidden' : !isFreeDrawing }">
        <div class="tools-container">
          <div>
            <a class="cell-select" @click="cellTool = 'select'" :class="{'selected': cellTool === 'select'}"
               :title="$t('case.viewer.cell_tool_select')"><i/></a>
            <a class="pen" @click="cellTool = 'edit'" :class="{'selected': cellTool === 'edit'}"
               :title="$t('case.viewer.mark')"><i/></a>
            <a class="cell-move" @click="cellTool = 'move'" :class="{'selected': cellTool === 'move'}"
               :title="$t('case.viewer.cell_tool_move')"><i/></a>
            <a class="cell-delete" @click="cellTool = 'delete'" :class="{'selected': cellTool === 'delete'}"
               :title="$t('case.viewer.cell_tool_delete')"><i/></a>
            <a class="cell-save" @click="cellTool = 'save'" :class="{'selected': cellTool === 'save'}"
               :title="$t('case.viewer.cell_tool_save')"><i/></a>
            <a @click="showLabels()" :class="{'eyem': !showLabel, 'eyem-off': showLabel}"
               :title="$t('case.viewer.cell_tool_labels')"><i/></a>
            <div v-if="showLabel" style="text-align: left; padding-left: 7px;">
              <label>{{$t('case.viewer.cell_tool_labels_size')}}:</label>
              <input style="border-style: groove;" type="number" v-model="fontLabelSize" step="10" min="80" max="480"/>
            </div>
          </div>
          <div v-if="selectedPath" class="slider-wrapper" style="display: block;">
            <select class="select-clear" style="text-align: left; width: 100%;" v-model="selectedPath.data.polygon_type" @change="showLabelsIfNeed()">
              <option v-for="option in morfologics" v-bind:value="option.code">
                {{ option.name }}
              </option>
            </select>
          </div>
          <span style="display: block; text-align: left; padding: 5px;" v-if="selectedPath">{{$t('case.morfoTool.comment')}}: <textarea v-on:keyup="showLabelsIfNeed()" v-model="selectedPath.data.comment"
            style="display: block; border: 1px solid grey; width: 100%;"></textarea></span>
          <p v-if="selectedPath && selectedPath.data"
             style="text-align: left; padding-left: 7px; font-size: 10px; margin-bottom: 0;">
            {{$t('case.viewer.cell_tool_labels_user')}}:{{selectedPath.data.userName}}
          </p>
        </div>
      </div>
      <FindRelatedMenu
        :showContainer="showRelatedTool"
        v-on:findRelatedPannel="findRelatedPannel"
        v-on:findRelatedDraw="findRelatedDraw"
      />
      <FindRelatedModal />
      <FindRelatedDraw
        :viewer="viewer"
        v-on:findRelatedPannel="findRelatedPannel"
        />
  
      <div class="microscop-scale" :class="{'on': circleMode}" ref="scale"></div>
      <div class="legend" v-if="currentSubLayer === 'cytological'">
        <p style="font-weight: bold;">Legend: </p>
        <p><span style="background-color: #258da5;">&nbsp;&nbsp;&nbsp;</span>Normal Squamous cell</p>
        <p><span style="background-color: #1baf8b;">&nbsp;&nbsp;&nbsp;</span>Normal Grandular cell</p>
        <p><span style="background-color: #44659b;">&nbsp;&nbsp;&nbsp;</span>Normal Endometrial cell</p>
        <p><span style="background-color: #2e8e37;">&nbsp;&nbsp;&nbsp;</span>HPV</p>
        <p><span style="background-color: #9d4c58;">&nbsp;&nbsp;&nbsp;</span>Mild dysplasia</p>
        <p><span style="background-color: #aaac56;">&nbsp;&nbsp;&nbsp;</span>Moderate dysplasia</p>
        <p><span style="background-color: #bb7a21;">&nbsp;&nbsp;&nbsp;</span>Severe dysplasia</p>
        <p><span style="background-color: #b74144;">&nbsp;&nbsp;&nbsp;</span>Squamous cell carcinoma</p>
        <p><span style="background-color: #a35086;">&nbsp;&nbsp;&nbsp;</span>Adenocarcinoma</p>
        <p><span style="background-color: #714fa8;">&nbsp;&nbsp;&nbsp;</span>Border line</p>
      </div>
    </div>
  </template>
  
  <script>
    import {mapGetters, mapActions, mapState} from 'vuex'
    import moment from 'moment'
    import _ from 'lodash'
    import kd from 'keydrown'
    import { Archived } from '../../../dictionaries/availableCaseStatuses'
    import FindRelatedMenu from './SnapshotItems/FindRelatedMenu'
    import FindRelatedModal from './SnapshotItems/FindRelatedModal'
    import FindRelatedDraw from './SnapshotItems/FindRelatedDraw'
    import NeuralSearchPopup from 'src/components/NeuralSearch/NeuralSearchPopup'
    require('libs/openseadragon-scalebar')
    require('libs/openseadragon-svg-overlay')
    import {getWithUnit, makeStringId} from 'utils'
    import NoteComponent from './Note.vue'
    import Vue from 'vue'
    import deepEqual from 'deep-equal'
    import throttle from 'lodash.throttle'
    import html2canvas from 'html2canvas'
    import * as Sentry from '@sentry/browser'
  
    const OpenSeaDragon = window.OpenSeadragon
  
    const Note = Vue.extend(NoteComponent)
    const openseadragonCanvasClass = 'openseadragon-canvas'
  
    import {
      ARROWS_CONTROL_MODE_ABRUPT,
      ARROWS_CONTROL_SPEED_SLOW,
      ARROWS_CONTROL_SPEED_MEDIUM,
      ARROWS_CONTROL_SPEED_FAST
    } from '../../../dictionaries/viewer'
    import axios from 'axios';
  
    export default {
      name: 'Snapshot',
      props: {
        file: {
          type: Object,
          required: true
        },
        primary: {
          type: Boolean,
          required: false
        },
        isWebinar: {
          type: Boolean,
          default: false
        },
        ableToAct: {
          type: Boolean,
          default: true
        },
        panelVisible: {
          type: Boolean,
          default: true
        }
      },
      components: {
        Note,
        FindRelatedMenu,
        FindRelatedModal,
        FindRelatedDraw,
        NeuralSearchPopup
      },
      data () {
        return {
          Archived: Archived,
          areaCalculationPosNeg: null,
          areaDrawing: null,
          areaDrawingRect: null,
          selectedArea: null,
          areaRecognizedMembrane: null,
          arrowsControlMode: ARROWS_CONTROL_MODE_ABRUPT,
          arrowStepSizeInPoints: 50,
          brightnessBar: 0,
          cellTool: 'move',
          cellType: 'full',
          circleMode: false,
          circlePointer: {},
          circleViewbox: null,
          color: 'red',
          contrastBar: 100,
          currentSubLayer: null,
          currentZoom: 1,
          currentZoomStep: 0,
          currentZoomVisible: false,
          customFilters: [],
          customMouseTracker: null,
          dialogDone: false,
          expression: 0,
          fontLabelSize: 180,
          isAnimate: false,
          isCalculationPosNeg: false,
          isDrawing: false,
          isFreeDrawing: false,
          isRecognizedCrop: false,
          isRecognizedWsi: false,
          isSmallDisplay: false,
          layerHistory: [],
          layerIndex: 0,
          markMode: false,
          morfologics: [],
          opacityBar: 100,
          path: null,
          presetId: 0,
          previousBounds: null,
          prevZoom: 0,
          recognizedCrop: null,
          rectWsi: null,
          rulerMode: false,
          selectedPath: null,
          showCustomFilter: false,
          showDsSlides: false,
          showLabel: false,
          showRelatedTool: false,
          showSlides: false,
          showTools: false,
          singleActive: false,
          singleFileId: null,
          tileHeight: 0,
          tileImage: null,
          tileOpacityBar: 85,
          tileWidth: 0,
          updater: null,
          useThreshold: false,
          viewer: {},
          viewportWsiRect: null,
          windowHeight: 0,
          windowWidth: 0,
          zoomSteps: null,
          cells: {
            positive: 0,
            negative: 0,
            positiveNewdraw: undefined,
            negativeNewdraw: undefined,
            removedPositive: 0,
            removedNegative: 0
          },
          rulerData: {
            rulerId: null,
            rulerLength: null,
            startPoint: null,
            endPoint: null,
            rulerOverlay: null
          },
          expressions: [{
            value: 0,
            text: 'Nuclear Expression'
          }, {
            value: 1,
            text: 'Full Membrane Expression'
          }, {
            value: 2,
            text: 'Cytoplasmic Expression'
          }, {
            value: 3,
            text: 'Partial Membrane Expression'
          }, {
            value: 4,
            text: 'Full Membrane + Cytoplasmic Expression'
          }, {
            value: 5,
            text: 'Partial Membrane Expression + Cytoplasmic Expression'
          }, {
            value: 6,
            text: 'Cyto: Normal Squamous cell'
          }, {
            value: 7,
            text: 'Cyto: Normal Grandular cell'
          }, {
            value: 8,
            text: 'Cyto: Normal Endometrial cell'
          }, {
            value: 9,
            text: 'Cyto: HPV'
          }, {
            value: 10,
            text: 'Cyto: Mild dysplasia'
          }, {
            value: 11,
            text: 'Cyto: Moderate dysplasia'
          }, {
            value: 12,
            text: 'Cyto: Severe dysplasia'
          }, {
            value: 13,
            text: 'Cyto: Squamous cell carcinoma'
          }, {
            value: 14,
            text: 'Cyto: Adenocarcinoma'
          }, {
            value: 15,
            text: 'Cyto: Border line'
          }],
          pointerStyle: {
            top: '',
            left: ''
          },
        }
      },
      watch: {
        // handles new image open in existing viewer
        file () {
          // clear local file state
          if (this.syncronized) this.toggleSynchronize()
          if (this.circleMode) this.viewCircle()
          if (this.markMode) this.addMark()
          if (this.rulerMode) this.addRuler()
          this.viewer.viewport.setRotation(0)
          // open new file
          this.viewer.close().open(`/tiles/${this.file.name}.dzi`)
          // Notify DP Backend that snapshot was watched
          axios.post(`/api/files/${this.file.id}/watched`)
              .catch(err => Sentry.captureException(err))
        },
        fontLabelSize () {
          this.showLabelsIfNeed()
        },
        // watch on windowWidth and comparing change to set correct svg viewBox, scale and pixelDistance
        windowWidth () {
          this.circleViewbox = `0 0 ${this.$refs.osdel.clientWidth} ${this.$refs.osdel.clientHeight}`
          if (this.$refs.hole) {
            this.microscopScale()
          }
        },
        layerIndex () {
          if (this.currentSubLayer) {
            this.openSlides(true) // down current layer
            this.openSlides(true) // up new layer
          }
        },
        comparing () {
          this.circleViewbox = `0 0 ${this.$refs.osdel.clientWidth} ${this.$refs.osdel.clientHeight}`
          if (this.$refs.hole) {
            this.microscopScale()
          }
        },
        opacityBar () {
          this.setOpacity(this.opacityBar)
        },
        brightnessBar () {
          this.setBrightness(this.brightnessBar)
        },
        tileOpacityBar () {
          this.setOpacityBar(this.tileOpacityBar)
        },
        contrastBar () {
          this.setContrast(this.contrastBar)
        },
        useThreshold () {
          this.setContrast(this.contrastBar)
        },
        expression () {
          if (this.cellTool === 'negative') {
            return
          }
          this.updateColor()
        },
        cellTool () {
          this.updateColor()
          if (this.cellTool === 'negative') {
            this.color = 'blue'
            if (this.isRecognizedCrop) {
              this.color = 'deepskyblue'
            }
          }
          if (this.cellTool === 'delete-tmp') {
            let done = confirm(this.$t('case.viewer.cell_info_confirm_delete_tmp'))
            if (!done) {
              return
            }
            if (this.file.training && this.file.training.id) {
              this.deleteTrainingData({id: this.file.training.id})
                .then()
                .catch((err) => {
                  console.log(err)
                })
            }
            this.cellTool = ''
            this.file.training = null
            this.openDrawing()
          }
          if (this.cellTool === 'save' || this.cellTool === 'save-tmp') {
            this.tileOpacityBar = 100
            if (this.showLabel) {
              this.showLabels()
            }
            if (this.cellTool === 'save-tmp') {
              let done = confirm(this.$t('case.viewer.cell_info_confirm_tmp'))
              if (!done) {
                return
              }
            }
            if (this.cellTool === 'save') {
              let done = confirm(this.$t('case.viewer.cell_info_confirm'))
              if (!done) {
                return
              }
            }
  
            if (this.isFreeDrawing) {
              let data = {
                json: paper.project.exportJSON(),
                file_id: this.file.id
              }
  
              this.sendMorfoTrainingData(data).then((result) => {
                if (result.success) {
                  this.openFreeDrawing()
                } else {
                  window.alert(this.$t('case.viewer.cell_tool_save_error'))
                }
                this.cellTool = ''
              }).catch((err) => {
                console.log(err)
                window.alert(this.$t('case.viewer.cell_tool_save_error'))
                this.cellTool = ''
              })
  
              return
            }
  
            let viewportRect = this.viewer.viewport.imageToViewportRectangle(this.areaDrawingRect.x, this.areaDrawingRect.y, this.areaDrawingRect.width, this.areaDrawingRect.height)
            this.viewer.viewport.fitBounds(viewportRect, true)
  
            setTimeout(() => {
              const image = this.viewer.drawer.canvas
              let bounds = this.viewer.viewport.getBounds(true)
  
              let rectDrawer = this.viewer.drawer.viewportToDrawerRectangle(viewportRect)
              let boundsDrawer = this.viewer.drawer.viewportToDrawerRectangle(bounds)
  
              const canvas = document.createElement('canvas'), ctx = canvas.getContext('2d')
              canvas.width = rectDrawer.width
              canvas.height = rectDrawer.height
              ctx.drawImage(image, rectDrawer.x - boundsDrawer.x, rectDrawer.y - boundsDrawer.y, rectDrawer.width, rectDrawer.height, 0, 0, rectDrawer.width, rectDrawer.height)
  
              let data = {
                svg: paper.project.exportSVG({asString: true}),
                base64: canvas.toDataURL(),
                x: this.areaDrawingRect.x,
                y: this.areaDrawingRect.y,
                width: this.areaDrawingRect.width,
                height: this.areaDrawingRect.height,
                positive: this.cells.positive,
                negative: this.cells.negative,
                positiveNewdraw: this.cells.positiveNewdraw ? this.cells.positiveNewdraw : 0,
                negativeNewdraw: this.cells.negativeNewdraw ? this.cells.negativeNewdraw : 0,
                removedPositive: this.cells.removedPositive,
                removedNegative: this.cells.removedNegative,
                isRecognizedCrop: this.isRecognizedCrop,
                file_id: this.file.id,
                slide_type: 0,
                id: this.file.training ? this.file.training.id : null,
                is_draft: this.cellTool === 'save-tmp'
              }
              this.sendTrainingData(data).then((result) => {
                if (result.success) {
                  data.id = result.id
                  this.file.training = data
                  if (this.cellTool === 'save') {
                    this.file.training = null
                  }
                  this.openDrawing()
                } else {
                  window.alert(this.$t('case.viewer.cell_tool_save_error'))
                }
                this.cellTool = ''
              }).catch((err) => {
                console.log(err)
                window.alert(this.$t('case.viewer.cell_tool_save_error'))
                this.cellTool = ''
              })
            }, 200)
          }
        },
        windowHeight (newParam, oldParam) {
          if (this.windowHeight >= 678 && this.windowWidth >= 678) {
            this.isSmallDisplay = false
          } else {
            this.isSmallDisplay = true
          }
        },
        windowWidth (newParam, oldParam) {
          if (this.windowHeight >= 678 && this.windowWidth >= 678) {
            this.isSmallDisplay = false
          } else {
            this.isSmallDisplay = true
          }
        },
      },
      computed: {
        ...mapGetters(['comparing', 'isOwner', 'isMobileOrTablet', 'isMobile']),
        ...mapState({
          'author': state => state.account,
          'cytologyStain': state => state.cytologyStain,
          'dsResults': state => state.dsResults,
          'isArchived': state => state.case.status === Archived,
          'tool': state => state.viewer.tool,
          'neuralSearch': state => state.neuralSearch,
          'settings': state => state.account.viewer_settings,
          'syncronized': state => state.viewer.syncronized,
          'case': state => state.case,
        }),
        discreteZoomEnabled () {
          return this.zoomSteps && this.zoomSteps.length > 0
        },
        boxSize () {
          if (this.file.stains && this.file.stains.indexOf(this.cytologyStain) > -1) {
            return 1024
          }
  
          return 512
        }
      },
      methods: {
        findRelatedPannel () {
          this.findRelatedChangeModalVisible(true)
          this.$bus.$emit('clearStateDrawTool')
        },
        findRelatedDraw () {
          this.findRelatedChangeModalVisible(false)
          this.$bus.$emit('openFindRelatedDrawTool')
        },
        updateColor () {
          switch (this.expression) {
            case 0:
              this.color = this.isRecognizedCrop ? '#E14A4A' : '#D72B2B';
              break
            case 1:
              this.color = this.isRecognizedCrop ? '#9F53AF' : '#AC2270';
              break
            case 2:
              this.color = this.isRecognizedCrop ? '#F7AD70' : '#D7792B';
              break
            case 3:
              this.color = this.isRecognizedCrop ? '#802793' : '#80054B';
              break
            case 4:
              this.color = this.isRecognizedCrop ? '#B875C6' : '#B43C80';
              break
            case 5:
              this.color = this.isRecognizedCrop ? '#C988D7' : '#C55996';
              break
            case 6:
              this.color = this.isRecognizedCrop ? '#6CABC5' : '#258DA5';
              break
            case 7:
              this.color = this.isRecognizedCrop ? '#81CBC8' : '#1BAF8B';
              break
            case 8:
              this.color = this.isRecognizedCrop ? '#748CB7' : '#44659B';
              break
            case 9:
              this.color = this.isRecognizedCrop ? '#43CA50' : '#2E8E37';
              break
            case 10:
              this.color = this.isRecognizedCrop ? '#CC6372' : '#9D4C58';
              break
            case 11:
              this.color = this.isRecognizedCrop ? '#CECD42' : '#AAAC56';
              break
            case 12:
              this.color = this.isRecognizedCrop ? '#CC9E4D' : '#BB7A21';
              break
            case 13:
              this.color = this.isRecognizedCrop ? '#CD4B4F' : '#B74144';
              break
            case 14:
              this.color = this.isRecognizedCrop ? '#C4629F' : '#A35086';
              break
            case 15:
              this.color = this.isRecognizedCrop ? '#A683C8' : '#714FA8';
              break
            default:
          }
        },
        updateCouningCell: function () {
          const mpp = this.file.type_data && this.file.type_data.mpp ? this.file.type_data.mpp : 0
          const area = (this.areaDrawingRect.width * mpp * 1e-6) * (this.areaDrawingRect.height * mpp * 1e-6) * 1000000
  
          let label = this.$t('case.viewer.positive_level') + ': ' + this.cells.positive + ' / ' + this.$t('case.viewer.negative_level') + ': ' + this.cells.negative
          if (this.cells.negative > 0) {
            label += ' / ' + this.$t('case.viewer.positive_pct') + ': ' + parseFloat((this.cells.positive / (this.cells.positive + this.cells.negative)) * 100).toFixed(1)
          }
          if (this.cells.negative == 0 && this.cells.positive > 0) {
            label += ' / ' + this.$t('case.viewer.positive_pct') + ': 100'
          }
          if (area > 0) {
            label += ' / ' + 'HPF: ' + parseFloat(area / 0.132).toFixed(4)
          }
          if (this.cells.positiveNewdraw >= 0 || this.cells.negativeNewdraw >= 0) {
            label += '\n'
          }
          if (this.cells.positiveNewdraw >= 0) {
            label += this.$t('case.viewer.positive_level_new') + ': ' + this.cells.positiveNewdraw
          }
          if (this.cells.positiveNewdraw >= 0) {
            label += ' / ' + this.$t('case.viewer.negative_level_new') + ': ' + this.cells.negativeNewdraw
          }
          if (this.cells.negative > 0 && this.cells.negativeNewdraw >= 0) {
            let p = this.cells.positive + this.cells.positiveNewdraw
            let n = this.cells.negative + this.cells.negativeNewdraw
            label += ' / ' + this.$t('case.viewer.positive_pct_full') + ': ' + parseFloat((p / (p + n)) * 100).toFixed(1)
          }
          if ((this.cells.negative > 0 || this.cells.positive > 0) &&
            (this.cells.negativeNewdraw > 0 || this.cells.positiveNewdraw > 0)) {
            let old_cell = this.cells.negative + this.cells.positive
            let old_removed_cell = this.cells.removedPositive + this.cells.removedNegative
            let new_cell = this.cells.positiveNewdraw + this.cells.negativeNewdraw
            let true_old_cell = old_cell - old_removed_cell
            if (true_old_cell > 0) {
              label += '\n' + this.$t('case.viewer.accuracy_new') + ': ' + parseFloat((2 * (true_old_cell / (2 * old_cell - old_removed_cell + new_cell))) * 100).toFixed(1) + '%'
            }
          }
          this.areaDrawing.setInfo(label, true)
        },
        showLabelsIfNeed: function () {
          if (this.showLabel) {
            this.showLabels(true)
          }
          if (!paper) {
            return
          }
          if (this.selectedPath) {
            let index = this.morfologics.findIndex(i => i.code === this.selectedPath.data.polygon_type)
            this.selectedPath.strokeColor = this.morfologics[index].color
          }
        },
        showLabels: function (redraw = false) {
          if (!paper) {
            return
          }
          this.showLabel = !this.showLabel
          let children = paper.project.activeLayer.children
          if (this.showLabel) {
            for (let i = 0; i < children.length; i++) {
              let child = children[i]
              if (child instanceof paper.Path) {
                if (!child.segments || !child.segments[0]) {
                  continue
                }
                let pt = {
                  x: child.segments[0].point.x,
                  y: child.segments[0].point.y - Math.ceil(this.fontLabelSize / 2)
                }
                let text = new paper.PointText(new paper.Point(pt))
                let index = this.morfologics.findIndex(i => i.code === child.data.polygon_type)
                text.content = this.morfologics[index].name
                text.fillColor = 'black'
                text.fontSize = this.fontLabelSize + 'px'
                text.fontWeight = 'bold'
                text.locked = true
  
                if (child.data.comment) {
                  let pd = {
                    x: child.segments[0].point.x,
                    y: child.segments[0].point.y + Math.ceil(this.fontLabelSize / 2)
                  }
                  let description = new paper.PointText(new paper.Point(pd))
                  description.content = child.data.comment
                  description.fillColor = 'black'
                  description.fontSize = Math.ceil(this.fontLabelSize / 2) + 'px'
                  description.fontWeight = 'bold'
                  description.locked = true
                }
              }
            }
          } else {
            let forRemove = []
            for (let i = 0; i < children.length; i++) {
              let child = children[i]
              if (child instanceof paper.PointText) {
                forRemove.push(i)
              }
            }
            forRemove = forRemove.reverse()
            for (let i = 0; i < forRemove.length; i++) {
              children[forRemove[i]].remove()
            }
          }
          if (redraw) {
            this.showLabels(false)
          }
        },
        openFreeDrawing: function () {
          this.isFreeDrawing = !this.isFreeDrawing
  
          if (this.morfologics.length === 0) {
            this.getMetsColor().then((data) => {
              this.morfologics = data.mets_colors
            })
          }
  
          if (this.isFreeDrawing) {
            let onMouseDown = (event) => {
              if (this.isAnimate) {
                return
              }
  
              if (this.cellTool === 'move') {
                return
              }
  
              let transformed_point = paper.view.viewToProject(new paper.Point(event.position.x, event.position.y))
              let hitResult = paper.project.hitTest(transformed_point)
  
              if (this.cellTool === 'edit' && hitResult && hitResult.item && !hitResult.item.selected) {
                return
              }
  
              if (this.cellTool === 'edit' && hitResult && hitResult.item && hitResult.item.data.userId !== this.author.id) {
                return
              }
  
              if (this.cellTool === 'delete') {
                if (hitResult) {
                  paper.project.activeLayer.selected = false
                  hitResult.item.selected = true
                  this.selectedPath = hitResult.item
                  this.selectedPath.remove()
                  this.selectedPath = null
                }
                return
              }
  
              if (this.cellTool === 'select') {
                if (hitResult) {
                  paper.project.activeLayer.selected = false
                  hitResult.item.selected = true
                  this.selectedPath = hitResult.item
                }
                return
              }
  
              paper.settings.handleSize = 15
              paper.settings.hitTolerance = 25
  
              if (hitResult) {
                this.path = hitResult.item
                if (hitResult.segment !== undefined) {
                  this.path.removeSegments(hitResult.segment.index, this.path.segments.length)
                  this.path.closed = false
                } else {
                  this.path = null
                }
              }
  
              if (!this.path) {
                var items = paper.project.getItems({
                  selected: true,
                  class: paper.Path
                })
  
                for (let i = 0; i < items.length; i++) {
                  items[i].selected = false
                }
  
                this.path = new paper.Path()
                this.path.strokeColor = this.morfologics[0].color
              }
  
              this.path.fullySelected = true
              this.path.closed = true
              this.path.strokeWidth = 20
            }
  
            let onMouseDrag = (event) => {
              this.viewer.panVertical = false
              this.viewer.panHorizontal = false
  
              if (this.cellTool === 'edit') {
                if (this.isAnimate) {
                  return
                }
  
                let transformed_point = paper.view.viewToProject(new paper.Point(event.position.x, event.position.y))
                this.path.add(transformed_point)
              }
  
              if (this.cellTool === 'move') {
                let delta = event.delta
                delta.x = delta.x * -1
                delta.y = delta.y * -1
                this.viewer.viewport.panBy(this.viewer.viewport.deltaPointsFromPixels(delta))
                return
              }
            }
  
            let onMouseUp = (event) => {
              if (this.isAnimate) {
                return
              }
              if (this.cellTool === 'edit') {
                if (!this.path) {
                  return
                }
                this.path.simplify()
                this.path.selected = true
                this.selectedPath = this.path
                this.selectedPath.data.userId = this.author.id
                this.selectedPath.data.userName = this.author.name
                this.selectedPath.data.polygon_type = 'undefined'
                this.selectedPath.data.created = new Date()
                this.selectedPath.data.segments = []
                if (this.path.segments) {
                  for (let i = 0; i < this.path.segments.length; i++) {
                    let p = this.path.segments[i].point
                    let dx = Math.ceil(p.x / 256) * 2
                    let dy = Math.ceil(p.y / 256) * 2
                    let rp = {
                      x: p.x - dx,
                      y: p.y - dy
                    }
                    this.selectedPath.data.segments.push(rp)
                  }
                }
                this.showLabelsIfNeed()
                this.path = null
              }
            }
  
            this.viewer.paperjsOverlay()
            this.customMouseTracker = new OpenSeadragon.MouseTracker({
              element: this.viewer.canvas,
              pressHandler: onMouseDown,
              dragHandler: onMouseDrag,
              dragEndHandler: onMouseUp
            })
  
            if (this.customMouseTracker) {
              this.customMouseTracker.setTracking(true)
            }
  
            let size = this.viewer.world.getItemAt(0).getContentSize()
            let area = this.viewer.viewport.imageToViewportRectangle(0, 0, size.x, size.y)
            this.viewer.viewport.fitBounds(new OpenSeadragon.SelectionRect(0, 0, area.width, area.height, 0), true)
  
            this.getMorfoTrainingData(this.file.id).then((result) => {
              if (result.success) {
                this.viewer.paperjsOverlay().drawPaper(result.data)
              } else {
                this.viewer.paperjsOverlay().drawPaper(null)
              }
            }).catch((err) => {
              this.viewer.paperjsOverlay().drawPaper(null)
            })
          } else {
            if (this.customMouseTracker) {
              this.customMouseTracker.setTracking(false)
            }
            this.viewer.panVertical = true
            this.viewer.panHorizontal = true
            this.viewer.paperjsOverlay().destroy()
          }
        },
        openDrawing: function () {
          if (this.tool === 'Ki67') this.toggleKi67mode()
  
          this.isRecognizedCrop = false
          this.isDrawing = !this.isDrawing
          if (this.isDrawing) {
            paper.install(window)
  
            let x, y, boxWidth, boxHeight
            if (this.recognizedCrop) {
              this.isRecognizedCrop = true
              x = this.recognizedCrop.x
              y = this.recognizedCrop.y
              boxWidth = parseInt(this.recognizedCrop.width)
              boxHeight = parseInt(this.recognizedCrop.height)
              this.cells = {
                positive: this.recognizedCrop.positive ? parseInt(this.recognizedCrop.positive) : 0,
                negative: this.recognizedCrop.negative ? parseInt(this.recognizedCrop.negative) : 0,
                positiveNewdraw: 0,
                negativeNewdraw: 0,
                removedPositive: 0,
                removedNegative: 0
              }
            }
            if (this.file.training) {
              x = this.file.training.x
              y = this.file.training.y
              boxWidth = this.file.training.width ? this.file.training.width : this.boxSize
              boxHeight = this.file.training.height ? this.file.training.height : this.boxSize
              this.isRecognizedCrop = this.file.training.isRecognizedCrop ? this.file.training.isRecognizedCrop : false
              this.cells = {
                positive: this.file.training.positive ? parseInt(this.file.training.positive) : 0,
                negative: this.file.training.negative ? parseInt(this.file.training.negative) : 0,
                positiveNewdraw: this.file.training.positiveNewdraw
                ? (parseInt(this.file.training.positiveNewdraw) > 0 ? parseInt(this.file.training.positiveNewdraw) : (this.isRecognizedCrop ? 0 : undefined))
                  : (this.isRecognizedCrop ? 0 : undefined),
                negativeNewdraw: this.file.training.negativeNewdraw
                ? (parseInt(this.file.training.negativeNewdraw) > 0 ? parseInt(this.file.training.negativeNewdraw) : (this.isRecognizedCrop ? 0 : undefined))
                  : (this.isRecognizedCrop ? 0 : undefined),
                removedPositive: this.file.training.removedPositive
                ? (parseInt(this.file.training.removedPositive) > 0 ? parseInt(this.file.training.removedPositive) : 0) : 0,
                removedNegative: this.file.training.removedNegative
                ? (parseInt(this.file.training.removedNegative) > 0 ? parseInt(this.file.training.removedNegative) : 0) : 0
              }
            }
            if (!this.file.training && !this.recognizedCrop) {
              boxWidth = this.boxSize
              boxHeight = this.boxSize
              this.cells = {
                positive: 0,
                negative: 0,
                positiveNewdraw: undefined,
                negativeNewdraw: undefined,
                removedPositive: 0,
                removedNegative: 0
              }
            }
  
            let center = this.viewer.viewport.getCenter()
            if (this.file.training || this.recognizedCrop) {
              let point = this.viewer.viewport.imageToViewportCoordinates(x + (boxWidth / 2), y + (boxHeight / 2))
              center.x = point.x
              center.y = point.y
            }
            let area = this.viewer.viewport.imageToViewportRectangle(center.x, center.y, boxWidth, boxHeight)
  
            let onMouseDown = (event) => {
              if (this.cellTool === 'positive' || this.cellTool === 'negative') {
                if (this.isAnimate) {
                  return
                }
                if (this.path) {
                  this.path.selected = false
                }
                var transformed_point = paper.view.viewToProject(new paper.Point(event.position.x, event.position.y))
  
                this.path = new paper.Path({
                  segments: [transformed_point],
                  strokeColor: 'black',
                  fillColor: this.color,
                  closed: true
                })
              }
              if (this.cellTool === 'delete') {
                paper.project.activeLayer.selected = false
                var transformed_point = paper.view.viewToProject(new paper.Point(event.position.x, event.position.y))
                var hit_test_result = paper.project.hitTest(transformed_point)
                if (hit_test_result) {
                  let color = hit_test_result.item.fillColor
                  if (color.red === 1 && color.blue === 0 && color.green === 0) {
                    if (this.cells.positive > 0) {
                      this.cells.positive--
                    }
                    if (this.isRecognizedCrop) {
                      this.cells.removedPositive++
                    }
                  }
                  if (color.red === 1 && color.blue === 0 && color.green !== 0) {
                    if (this.cells.positiveNewdraw > 0) {
                      this.cells.positiveNewdraw--
                    }
                  }
                  if (color.red === 0 && color.blue === 1 && color.green === 0) {
                    if (this.cells.negative > 0) {
                      this.cells.negative--
                    }
                    if (this.isRecognizedCrop) {
                      this.cells.removedNegative++
                    }
                  }
                  if (color.red === 0 && color.blue === 1 && color.green !== 0) {
                    if (this.cells.negativeNewdraw > 0) {
                      this.cells.negativeNewdraw--
                    }
                  }
                  this.updateCouningCell()
  
                  hit_test_result.item.selected = true
                  this.selectedPath = hit_test_result.item
                  this.selectedPath.remove()
                  this.selectedPath = null
                }
              }
            }
  
            let onMouseDrag = (event) => {
              if (this.cellTool === 'positive' || this.cellTool === 'negative') {
                if (this.isAnimate) {
                  return
                }
  
                var transformed_point = paper.view.viewToProject(new paper.Point(event.position.x, event.position.y))
                if (transformed_point.x > boxWidth / 2 || transformed_point.x < -1 * boxWidth / 2 ||
                  transformed_point.y > boxHeight / 2 || transformed_point.y < -1 * boxHeight / 2) {
                  return
                }
  
                if (this.path.fullySelected) {
                  this.path = new paper.Path({
                    segments: [transformed_point],
                    strokeColor: 'black',
                    fillColor: this.color,
                    closed: true
                  })
                  return
                }
  
                this.path.add(transformed_point)
              }
              if (this.cellTool === 'move') {
                let delta = event.delta
                delta.x = delta.x * -1
                delta.y = delta.y * -1
                this.viewer.viewport.panBy(this.viewer.viewport.deltaPointsFromPixels(delta))
              }
            }
  
            let onMouseUp = (event) => {
              if (this.cellTool === 'positive' || this.cellTool === 'negative') {
                if (this.isAnimate) {
                  return
                }
                if (this.cellTool === 'positive') {
                  if (this.isRecognizedCrop) {
                    if (this.cells.positiveNewdraw === undefined) {
                      this.cells.positiveNewdraw = 0
                    }
                    this.cells.positiveNewdraw++
                  } else {
                    this.cells.positive++
                  }
                }
                if (this.cellTool === 'negative') {
                  if (this.isRecognizedCrop) {
                    if (this.cells.negativeNewdraw === undefined) {
                      this.cells.negativeNewdraw = 0
                    }
                    this.cells.negativeNewdraw++
                  } else {
                    this.cells.negative++
                  }
                }
                this.updateCouningCell()
                this.path.fullySelected = true
              }
              if (this.cellTool === 'move') {
                this.viewer.viewport.applyConstraints()
              }
            }
  
            this.areaDrawing = this.viewer.selection({
              onSelection: (rect) => {
                this.areaDrawingRect = rect
              },
              onMouseDrag,
              onMouseDown,
              onMouseUp,
              rect: new OpenSeadragon.SelectionRect(center.x - area.width / 2, center.y - area.height / 2, area.width, area.height, 0),
              showSelectionControl: false,
              showConfirmDenyButtons: false,
              allowRotation: false,
              hideAtConfirm: false,
              isCanvas: true,
              canResize: false,
              canDrag: false
            })
            this.areaDrawing.enable()
            this.areaDrawingRect = this.areaDrawing.getRect()
  
            let viewportRect = this.viewer.viewport.imageToViewportRectangle(this.areaDrawingRect.x, this.areaDrawingRect.y, this.areaDrawingRect.width, this.areaDrawingRect.height)
            this.viewer.viewport.fitBounds(viewportRect, true)
            if (this.recognizedCrop) {
              setTimeout(() => {
                paper.setup(this.areaDrawing.element)
                this.areaDrawing.drawPaper(this.recognizedCrop.svg)
                this.setOpacityBar(this.tileOpacityBar)
                this.recognizedCrop = null
              }, 200)
            } else {
              setTimeout(() => {
                paper.setup(this.areaDrawing.element)
                this.areaDrawing.drawPaper(this.file.training ? this.file.training.svg : null)
                this.setOpacityBar(this.tileOpacityBar)
              }, 200)
            }
            this.updateCouningCell()
          } else {
            this.areaDrawing.disable()
          }
        },
        setTileImage: function (type) {
          switch (type) {
            case 'in':
              this.tileImage = this.recognizedCrop.inside64
              break
            case 'out':
              this.tileImage = this.recognizedCrop.outside64
              break
            case 'full':
              this.tileImage = this.recognizedCrop.base64
              break
          }
          this.cellType = type
          this.setOpacityBar(this.tileOpacityBar)
        },
        setOpacityBar: function (opacity) {
          if (opacity > 0) {
            opacity = parseFloat(opacity / 100).toFixed(2)
          }
          if (this.tool === 'Ki67') {
            this.selectedArea.image(this.tileImage, this.tileWidth, this.tileHeight, opacity)
            return
          }
          if (this.areaDrawing) {
            this.areaDrawing.opacityPaper(opacity)
            return
          }
        },
        setPreset (id) {
          this.setDefaultPreset()
          this.presetId = id
  
          this.brightnessBar = this.settings.preset[id].brightness
          this.contrastBar = this.settings.preset[id].contrast
  
          localStorage.setItem('presetId', this.presetId)
        },
        changeCanvasFilters () {
          this.showCustomFilter = !this.showCustomFilter
          if (this.showCustomFilter) {
            let presetId = JSON.parse(localStorage.getItem('presetId'))
            if (presetId) {
              this.presetId = parseInt(presetId)
            }
            this.setPreset(this.presetId)
            localStorage.setItem('showCanvasFilters', true)
            return
          }
  
          localStorage.setItem('showCanvasFilters', false)
          localStorage.setItem('presetId', 0)
          this.brightnessBar = 0
          this.contrastBar = 0
          this.presetId = 0
          this.removeCanvasFilters()
        },
        setDefaultPreset () {
          if (this.settings.preset) {
            return
          }
          this.settings.preset = [
            { 'level': 1, 'brightness': 0, 'contrast': 70 },
            { 'level': 2, 'brightness': -100, 'contrast': 25 },
            { 'level': 3, 'brightness': 50, 'contrast': 40 }
          ]
        },
        applyCanvasFilters: function () {
          this.viewer.setFilterOptions({
            filters: [{
              items: this.viewer.world.getItemAt(0),
              processors: [
                OpenSeadragon.Filters.BRIGHTNESS(this.settings.preset[this.presetId].brightness),
                OpenSeadragon.Filters.CONTRAST(this.settings.preset[this.presetId].contrast / 100)
              ]
            }],
            loadMode: 'sync'
          })
        },
        removeCanvasFilters: function () {
          this.viewer.setFilterOptions({
            filters: [],
            loadMode: 'sync'
          })
        },
        setBrightness: function (brightness) {
          if (!this.showCustomFilter) {
            return
          }
  
          this.settings.preset[this.presetId].brightness = brightness
          this.saveAccountSettings()
          this.applyCanvasFilters()
        },
        setOpacity: function (opacity) {
          if (opacity > 0) {
            opacity = parseFloat(opacity / 100).toFixed(2)
          }
  
          let count = this.viewer.world.getItemCount()
          for (let i = 0; i < count; i++) {
            if (i > 0) {
              this.viewer.world.getItemAt(i).setOpacity(opacity)
            }
          }
        },
        setContrast: function (contrast) {
          if (this.showCustomFilter) {
            this.settings.preset[this.presetId].contrast = contrast
  
            this.saveAccountSettings()
            this.applyCanvasFilters()
            return
          }
          let count = this.viewer.world.getItemCount()
          for (let i = 0; i < count; i++) {
            if (!this.useThreshold) {
              this.viewer.setFilterOptions({
                filters: [],
                loadMode: 'sync'
              })
              continue
            }
            this.viewer.setFilterOptions({
              filters: [{
                items: this.viewer.world.getItemAt(i),
                processors: [
                  OpenSeadragon.Filters.CONTRAST(contrast / 100)
                ]
              }],
              loadMode: 'sync'
            })
          }
        },
        sendSlideToDs (type) {
          this.sendGlassToDp({fileId: this.file.id, type}).then((data) => {
            if (data) {
              window.alert(this.$t('case.collaborators.modal.ds_glass_added'))
            } else {
              window.alert(this.$t('case.collaborators.modal.ds_glass_already_added'))
            }
          }).catch((err) => {
            window.alert(this.$t('case.collaborators.modal.ds_error_glass'))
          })
        },
        slideFromLab () {
          if (this.file.meta_data !== null && this.file.meta_data.from_lis == true) {
            return true
          }
          return false
        },
        hasLayer () {
          return this.file.layer != null
        },
        takeLayerPhotoWsi () {
          this.viewer.viewport.fitBounds(this.viewportWsiRect, true)
          this.opacityBar = 100
          this.setOpacity(this.opacityBar)
  
          setTimeout(() => {
            const image = this.viewer.drawer.canvas
            let bounds = this.viewer.viewport.getBounds(true)
  
            let rectDrawer = this.viewer.drawer.viewportToDrawerRectangle(this.viewportWsiRect)
            let boundsDrawer = this.viewer.drawer.viewportToDrawerRectangle(bounds)
  
            const canvas = document.createElement('canvas'), ctx = canvas.getContext('2d')
            canvas.width = rectDrawer.width
            canvas.height = rectDrawer.height
            ctx.drawImage(image, rectDrawer.x - boundsDrawer.x, rectDrawer.y - boundsDrawer.y, rectDrawer.width, rectDrawer.height, 0, 0, rectDrawer.width, rectDrawer.height)
  
            const finishCanvas = document.createElement('canvas'), fCtx = finishCanvas.getContext('2d')
            finishCanvas.width = this.rectWsi.width
            finishCanvas.height = this.rectWsi.height
  
            let imageAspectRatio = canvas.width / canvas.height
            let canvasAspectRatio = finishCanvas.width / finishCanvas.height
            let renderableHeight, renderableWidth, xStart, yStart
  
            if (imageAspectRatio < canvasAspectRatio) {
              renderableHeight = finishCanvas.height
              renderableWidth = canvas.width * (renderableHeight / canvas.height)
              xStart = (finishCanvas.width - renderableWidth) / 2
              yStart = 0
            } else if (imageAspectRatio > canvasAspectRatio) {
              renderableWidth = finishCanvas.width
              renderableHeight = canvas.height * (renderableWidth / canvas.width)
              xStart = 0
              yStart = (finishCanvas.height - renderableHeight) / 2
            } else {
              renderableHeight = finishCanvas.height
              renderableWidth = finishCanvas.width
              xStart = 0
              yStart = 0
            }
            fCtx.drawImage(canvas, xStart, yStart, renderableWidth, renderableHeight)
  
            console.log(finishCanvas.toDataURL(), this.currentSubLayer)
            this.saveScreenshotWsiInStorage({data64: finishCanvas.toDataURL(), caseId: this.file.case_id, typeScr: this.currentSubLayer ? this.currentSubLayer : 'general'}).then((data) => {
              if (data.data) {
                alert('Изображение сохранено. Результат: ' + JSON.stringify(data.data))
              } else {
                alert('Изображение сохранено.')
              }
            })
          }, 500)
        },
        openRecognizedWsi () {
          this.isRecognizedWsi = !this.isRecognizedWsi
          if (this.isRecognizedWsi) {
            this.selectedArea = this.viewer.selection({
              onSelection: (rect) => {
                this.rectWsi = rect
                this.selectedArea.canResize = false
                this.selectedArea.canDrag = false
  
                this.singleActive = true
  
                this.tileWidth = this.rectWsi.width
                this.tileHeight = this.rectWsi.height
  
                this.viewportWsiRect = this.viewer.viewport.imageToViewportRectangle(this.rectWsi.x, this.rectWsi.y, this.rectWsi.width, this.rectWsi.height)
                this.viewer.viewport.fitBounds(this.viewportWsiRect, true)
              },
              onCancel: () => {
                this.openRecognizedWsi()
              },
              showSelectionControl: false,
              showConfirmDenyButtons: false,
              allowRotation: false,
              hideAtConfirm: false,
              maxSize: 2048
            })
            this.selectedArea.enable()
          } else {
            this.selectedArea.canResize = true
            this.selectedArea.canDrag = true
            this.singleActive = false
            this.showTools = false
            this.recognizedCrop = null
            this.selectedArea.disable()
          }
        },
        toggleNeuralSearchMode() {
          if (this.tool === 'NeuralSearch') {
            this.disableNeuralSearch()
            this.$store.commit('DISABLE_TOOLS')
          } else {
            if (this.tool === 'Ki67') this.toggleKi67mode()
            // in better solution mode should be controlled outside (in mode controller)
            // but now mode control is in "toggle" functions
            this.$store.commit('ENABLE_TOOL', 'NeuralSearch')
            this.enableNeuralSearch()
          }
        },
        enableNeuralSearch() {
          if (this.tool !== 'NeuralSearch') {
            throw new Error('Enable NeuralSearch only throw toggle*Mode method')
          }
  
          // ugly crutch against false onSelection calls
          let locked = false;
  
          const selectionOptions = {
            onSelection: selection => {
              if (locked) return
              else locked = true
  
              if (this.selectedArea.rect === null) {
                return
              }
  
              this.selectedArea.canResize = false
              this.selectedArea.canDrag = false
  
              // remove unuseful corners and handles (small black squares)
              const corners = Array
                .from(this.selectedArea.element.children)
                .filter(child => child.className.indexOf('corner') !== -1)
  
              const borderHandlers = this.selectedArea.borders.reduce(
                (list, border) => {
                  list.push(...Array
                    .from(border.children)
                    .filter(child => child.className.indexOf('handle') !== -1)
                  )
                  return list
                }, [],
              );
  
              [...corners, ...borderHandlers].forEach(item => item.hidden = true)
  
  
              this.selectedArea.progress(true)
  
              /** focus on selected area */
              let viewportRect = this.viewer.viewport.imageToViewportRectangle(selection.x, selection.y, selection.width, selection.height * 1.5)
              this.viewer.viewport.fitBounds(viewportRect, true)
  
              /** Gets image contained in selected area */
              const getSelectionImage = () => {
                const targetWidth = 512;
                const targetHeight = 512;
  
                /** @var {OpenSeadragon.Rect} границы вьюера, viewport-координаты */
                const viewportBounds = this.viewer.viewport.getBounds(true)
  
                /** @var {OpenSeadragon.Rect} границы вьюера, drawer-координаты */
                const drawerBounds = this.viewer.drawer.viewportToDrawerRectangle(viewportBounds)
  
                /** @var {OpenSeadragon.Rect} выделенная область, viewport-координаты  */
                const viewportSelection = this.viewer.viewport.imageToViewportRectangle(selection)
  
                /** @var {OpenSeadragon.Rect} выделенная область, drawer-координаты  */
                const drawerSelection = this.viewer.drawer.viewportToDrawerRectangle(viewportSelection)
  
                const image = this.viewer.drawer.canvas
                const canvas = document.createElement('canvas')
                const context = canvas.getContext('2d')
  
                canvas.width = targetWidth
                canvas.height = targetHeight
                context.drawImage(
                  image,
                  drawerSelection.x - drawerBounds.x, drawerSelection.y - drawerBounds.y,
                  drawerSelection.width, drawerSelection.height,
                  0, 0,
                  targetWidth, targetHeight
                )
  
                return canvas.toDataURL();
              }
  
              const sendToNeuralSearch = async () => {
                const result = await this.processNeuralSearch({
                  specializationID: this.case.specialization.id,
                  sessionID,
                  image: getSelectionImage(),
                })
  
                // checking if mode was not disabled from outside
                // or new search session started
                if (
                  this.tool !== 'NeuralSearch'
                  || this.neuralSearch.sessionID !== sessionID
                ) return
  
                this.selectedArea.progress(false)
  
                if (result === 404) {
                  const notFoundInfoElement = document.createElement('div')
                  const infoIcon = document.createElement('img')
                  infoIcon.src = '/static/icons/info.svg'
                  notFoundInfoElement.classList.add('info-label__neural-search')
                  notFoundInfoElement.appendChild(infoIcon)
                  notFoundInfoElement.innerHTML += '  Похожих случаев не найдено'
                  this.selectedArea.setInfo(notFoundInfoElement.outerHTML)
                }
              }
  
              const sessionID = `f${(~~(Math.random() * 1e8)).toString(16)}`
              this.$store.commit('NEURAL_SEARCH_START_SESSION', sessionID)
  
              const onAllTilesLoad = _.debounce(() => {
                this.viewer.viewport.fitBounds(viewportRect, true)
                this.viewer.removeHandler('tile-loaded', onAllTilesLoad)
                setTimeout(sendToNeuralSearch, 200)
              }, 2000);
  
              this.viewer.addHandler('tile-loaded', onAllTilesLoad)
              onAllTilesLoad()
            },
            onMouseDrag: event => {
              if (this.selectedArea.rect === null) {
                return
              }
              let delta = event.delta
              delta.x = delta.x * -1
              delta.y = delta.y * -1
              this.viewer.viewport.panBy(this.viewer.viewport.deltaPointsFromPixels(delta))
            },
            onCancel: this.disableNeuralSearch,
            showSelectionControl: false,
            showConfirmDenyButtons: false,
            allowRotation: false,
            hideAtConfirm: false,
            // rect: new OpenSeadragon.SelectionRect(0, 0, 0.01, 0.01, 0),
            maxSize: 1024,
          }
  
          this.selectedArea = this.viewer.selection(selectionOptions)
          this.selectedArea.enable()
        },
        disableNeuralSearch() {
          if (this.tool !== 'NeuralSearch') return
          this.$store.commit('NEURAL_SEARCH_CANCEL_SESSION')
  
          this.closeNeuralSearchPopup()
  
          this.showTools = false
          this.clearSelection()
        },
        reselectFragment() {
          this.toggleNeuralSearchMode()
          this.toggleNeuralSearchMode()
        },
        toggleKi67mode () {
          if (this.tool === 'Ki67') {
            this.disableKi67()
            this.$store.commit('DISABLE_TOOLS')
          } else {
            if (this.tool === 'NeuralSearch') this.disableNeuralSearch()
            // in better solution mode should be controlled outside (in mode controller)
            // but now mode control is in "toggle" functions
            this.$store.commit('ENABLE_TOOL', 'Ki67')
            this.enableKi67()
          }
        },
        disableKi67 () {
          // don't even realize what is that:
          if (window.dsLoop) {
            clearTimeout(window.dsLoop)
          }
  
          this.showTools = false
          this.clearSelection()
        },
        enableKi67 () {
          if (this.tool !== 'Ki67') {
            throw new Error('Enable Ki67 only throw toggleKi67mode method')
          }
  
          // ugly crutch against false onSelection calls
          let locked = false;
  
          const selectionOptions = {
            onSelection: (rect) => {
              if (locked) return
              else locked = true
  
              this.selectedArea.canResize = false
              this.selectedArea.canDrag = false
  
              if (this.selectedArea.rect === null) {
                return
              }
  
              this.selectedArea.progress(true)
  
              this.tileWidth = rect.width
              this.tileHeight = rect.height
  
              let multiple = 512
              rect.width += rect.width % multiple ? multiple - rect.width % multiple : 0
              rect.height += rect.height % multiple ? multiple - rect.height % multiple : 0
  
              // focus on selected area
              let viewportRect = this.viewer.viewport.imageToViewportRectangle(rect.x, rect.y, rect.width, rect.height)
              this.viewer.viewport.fitBounds(viewportRect, true)
  
              const getSelectionImage = () => {
                const image = this.viewer.drawer.canvas
                const bounds = this.viewer.viewport.getBounds(true)
  
                const viewportRect = this.viewer.viewport.imageToViewportRectangle(rect.x, rect.y, rect.width, rect.height)
  
                let rectDrawer = this.viewer.drawer.viewportToDrawerRectangle(viewportRect)
                let boundsDrawer = this.viewer.drawer.viewportToDrawerRectangle(bounds)
  
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
  
                canvas.width = rectDrawer.width
                canvas.height = rectDrawer.height
                ctx.drawImage(
                  image,
                  rectDrawer.x - boundsDrawer.x, rectDrawer.y - boundsDrawer.y,
                  rectDrawer.width, rectDrawer.height,
                  0, 0,
                  rectDrawer.width, rectDrawer.height
                )
  
                const finishCanvas = document.createElement('canvas'), fCtx = finishCanvas.getContext('2d')
                finishCanvas.width = rect.width
                finishCanvas.height = rect.height
  
                let imageAspectRatio = canvas.width / canvas.height
                let canvasAspectRatio = finishCanvas.width / finishCanvas.height
                let renderableHeight, renderableWidth, xStart, yStart
  
                if (imageAspectRatio < canvasAspectRatio) {
                  renderableHeight = finishCanvas.height
                  renderableWidth = canvas.width * (renderableHeight / canvas.height)
                  xStart = (finishCanvas.width - renderableWidth) / 2
                  yStart = 0
                } else if (imageAspectRatio > canvasAspectRatio) {
                  renderableWidth = finishCanvas.width
                  renderableHeight = canvas.height * (renderableWidth / canvas.width)
                  xStart = 0
                  yStart = (finishCanvas.height - renderableHeight) / 2
                } else {
                  renderableHeight = finishCanvas.height
                  renderableWidth = finishCanvas.width
                  xStart = 0
                  yStart = 0
                }
                fCtx.drawImage(canvas, xStart, yStart, renderableWidth, renderableHeight)
                
                return finishCanvas.toDataURL();
              }
  
              const getResult = () => {
                this.sendImageToDs({
                  image: getSelectionImage(),
                  width: this.tileWidth,
                  height: this.tileHeight
                }).then(data => {
                  this.singleFileId = data.data
                  this.getImageFromDs(this.singleFileId).then((data) => {
                    if (this.tool !== 'Ki67') {
                      // Ki67 mode was disabled while data was processing
                      return;
                    }
  
                    this.recognizedCrop = data.data
                    this.recognizedCrop.x = rect.x
                    this.recognizedCrop.y = rect.y
  
                    if (!this.recognizedCrop || !this.recognizedCrop.base64) {
                      this.toggleKi67mode()
                      alert(this.$t('case.viewer.error_cell'))
                      return
                    }
  
  
                    // remove unuseful corners and handles (small black squares)
                    // TODO: move to function because of usage in NeuralSearch too
                    const corners = Array
                      .from(this.selectedArea.element.children)
                      .filter(child => child.className.indexOf('corner') !== -1)
  
                    const borderHandlers = this.selectedArea.borders.reduce(
                      (list, border) => {
                        list.push(...Array
                          .from(border.children)
                          .filter(child => child.className.indexOf('handle') !== -1)
                        )
                        return list
                      }, [],
                    );
  
                    [...corners, ...borderHandlers].forEach(item => item.hidden = true)
  
  
                    this.recognizedCrop.positive = parseInt(this.recognizedCrop.positive)
                    this.recognizedCrop.negative = parseInt(this.recognizedCrop.negative)
  
                    let mpp = this.file.type_data && this.file.type_data.mpp ? this.file.type_data.mpp : 0
                    let area = (this.tileWidth * mpp * 1e-6) * (this.tileHeight * mpp * 1e-6) * 1000000
  
                    const { positive, negative } = this.recognizedCrop;
  
                    const label = `${
                      this.$t('case.viewer.positive_level')}: ${positive}\n${
                      this.$t('case.viewer.negative_level')}: ${negative}\n${
                        negative > 0 ? `${
                          this.$t('case.viewer.positive_pct')
                        }: ${
                          parseFloat((positive / (positive + negative)) * 100).toFixed(1)
                        }` : ''
                      }\n${
                        (negative == 0 && positive > 0) ? `${
                          this.$t('case.viewer.positive_pct')
                        }: 100`: ''
                      }\n${
                        area > 0 ? `${
                          this.$t('case.viewer.area_label')}: ${parseFloat(area).toFixed(4)}\n${
                          this.$t('case.viewer.hpf_label')}: ${parseFloat(area / 0.132).toFixed(4)
                        }` : ''
                    }`;
  
                    const resultsElement = document.createElement('div')
                    resultsElement.classList.add('info-label__ki67')
                    resultsElement.innerHTML = label
                    this.selectedArea.setInfo(resultsElement.outerHTML)
  
                    this.selectedArea.progress(false)
                    this.tileImage = this.recognizedCrop.base64
                    this.setOpacityBar(this.tileOpacityBar)
  
                    viewportRect.height = viewportRect.height + viewportRect.height / 8
                    this.viewer.viewport.fitBounds(viewportRect, true)
                    this.showTools = true
                  }).catch((err) => {
                    console.log(err)
                    this.toggleKi67mode()
                    alert(this.$t('case.viewer.error_cell'))
                  })
                })
              }
  
              const onAllTilesLoad = _.debounce(() => {
                this.viewer.viewport.fitBounds(viewportRect, true)
                this.viewer.removeHandler('tile-loaded', onAllTilesLoad)
                setTimeout(getResult, 200)
              }, 2000);
  
              this.viewer.addHandler('tile-loaded', onAllTilesLoad)
              onAllTilesLoad()
            },
            onMouseDrag: event => {
              if (this.selectedArea.rect === null) {
                return
              }
  
              const {delta} = event
              delta.x = delta.x * -1
              delta.y = delta.y * -1
              this.viewer.viewport.panBy(this.viewer.viewport.deltaPointsFromPixels(delta))
            },
            onCancel: () => {
              this.toggleKi67mode()
            },
            showSelectionControl: false,
            showConfirmDenyButtons: false,
            allowRotation: false,
            hideAtConfirm: false,
            maxSize: 2048
          }
  
          this.selectedArea = this.viewer.selection(selectionOptions)
          this.selectedArea.enable()
        },
        /**
         * Makes current selection as safe and useless as possible.
         *
         * Selection area must be single for viewer,
         *   but its options cannot be reassigned.
         * Because of it, every mode enabling creates its own selection.
         * Previous should be cleared with this function.
         */
        clearSelection() {
          if (!this.selectedArea) return
  
          this.viewer.removeHandler('selection', this.selectedArea.onSelection)
  
          // not sure if these three guys are necessary
          this.selectedArea.canResize = true
          this.selectedArea.canDrag = true
          this.recognizedCrop = null
  
          this.selectedArea.disable()
          this.selectedArea = null
        },
        openSlides (reload) {
          this.showSlides = !this.showSlides
          if (!this.showSlides) {
            for (let i = 1; i <= this.viewer.world.getItemCount(); i++) {
              var oldImage = this.viewer.world.getItemAt(i)
              this.viewer.world.removeItem(oldImage)
            }
            if (!reload) {
              this.layerHistory = []
              this.layerIndex = 0
              this.currentSubLayer = null
            }
          } else {
            let layer = this.file.layer
            if (layer !== null) {
              let tiffs = layer.tiff_path
              if (tiffs) {
                if (!reload) {
                  for (let i = 0; i < tiffs.length; i++) {
                    this.layerHistory.push({
                      name: tiffs[i].type.toString().toUpperCase() + ' - ' + (tiffs[i].created_at ? moment(tiffs[i].created_at).format('DD/MM/YY HH:MM') : 'No date'),
                      index: i,
                      type: tiffs[i].type
                    })
                  }
                }
                this.currentSubLayer = tiffs[this.layerIndex].type
                this.viewer.addTiledImage({
                  tileSource: '/ds/tiles' + tiffs[this.layerIndex].path + '.dzi',
                  opacity: this.opacityBar / 100
                })
              }
            }
  
            this.setOpacity(this.opacityBar)
            this.setContrast(this.contrastBar)
          }
        },
        openDsLayer (type) {
          this.showDsSlides = !this.showDsSlides
          if (this.showDsSlides) {
            this.viewer.paperjsOverlay()
            this.getDsLayer({fileId: this.file.id, type}).then((result) => {
              if (result) {
                for (let seg of result.segments) {
                  this.path = new paper.Path()
                  this.path.strokeColor = '#D72B2B'
                  this.path.fullySelected = true
                  this.path.closed = true
                  this.path.strokeWidth = 100
  
                  for (let s of seg) {
                    let dx = Math.ceil(s.x / 256) * 2
                    let dy = Math.ceil(s.y / 256) * 2
                    let rp = {
                      x: s.x + dx,
                      y: s.y + dy
                    }
  
                    let transformed_point = paper.view.viewToProject(new paper.Point(rp.y, rp.x))
                    this.path.add(transformed_point)
                  }
                  this.path.simplify(seg.length * 10)
                }
                let newBounds = new OpenSeadragon.Rect(0, 0, 0.99, 0.99)
                this.viewer.viewport.fitBounds(newBounds, true)
                return
              } else {
                this.viewer.paperjsOverlay().destroy()
              }
            }).catch((err) => {
              this.viewer.paperjsOverlay().destroy()
            })
          } else {
            this.viewer.paperjsOverlay().destroy()
          }
          this.showDsSlides = false
        },
        zoomIn (e) {
          this.clearUnendedAction()
  
          if (this.viewer.viewport.getZoom() < this.viewer.viewport.getMaxZoom()) {
            this.viewer.viewport.zoomBy(this.viewer.zoomPerScroll)
            if (this.syncronized && e) this.$bus.$emit('zoom', {id: this._uid, type: 'zoomIn'})
          }
        },
        zoomOut (e) {
          this.clearUnendedAction()
  
          if (this.viewer.viewport.getZoom() > this.viewer.viewport.getMinZoom()) {
            this.viewer.viewport.zoomBy(1 / this.viewer.zoomPerScroll)
            if (this.syncronized && e) this.$bus.$emit('zoom', {id: this._uid, type: 'zoomOut'})
          }
        },
        zoom5x (e) {
          this.clearUnendedAction()
  
          this.viewer.viewport.zoomTo(this.viewer.viewport.getHomeZoom(), null, true)
          this.viewer.viewport.zoomBy(this.viewer.viewport.getHomeZoom() * 5, null, true)
          if (this.syncronized && e) this.$bus.$emit('zoom', {id: this._uid, type: 'zoom5x'})
        },
        zoom10x (e) {
          this.clearUnendedAction()
  
          this.viewer.viewport.zoomTo(this.viewer.viewport.getHomeZoom(), null, true)
          this.viewer.viewport.zoomBy(this.viewer.viewport.getHomeZoom() * 10, null, true)
          if (this.syncronized && e) this.$bus.$emit('zoom', {id: this._uid, type: 'zoom10x'})
        },
        zoom20x (e) {
          this.clearUnendedAction()
  
          this.viewer.viewport.zoomTo(this.viewer.viewport.getHomeZoom(), null, true)
          this.viewer.viewport.zoomBy(this.viewer.viewport.getHomeZoom() * 20, null, true)
          if (this.syncronized && e) this.$bus.$emit('zoom', {id: this._uid, type: 'zoom20x'})
        },
        microscopScale () {
          const holeDiameter = this.$refs.hole.r.baseVal.value * 2
          this.$refs.scale.style.width = `${holeDiameter}px`
          let width = this.$refs.osdel.clientWidth
          let height = this.$refs.osdel.clientHeight
          if (this.isMobile && width > height) {
            this.bottomHeight = -40
          } else {
            this.bottomHeight = (this.$refs.osdel.clientHeight / 2) - this.$refs.hole.r.baseVal.value - 70
            this.bottomHeight = (this.bottomHeight > 0) ? this.bottomHeight : 5
          }
          this.$refs.scale.style.bottom = `${this.bottomHeight}px`
          this.$refs.scale.innerText = this.viewer.getDistance(holeDiameter)
        },
        rotate (opposite = false) {
          this.clearUnendedAction()
  
          let angle = this.viewer.viewport.getRotation()
          angle = opposite ? angle + 5 : angle - 5
          if (angle >= 360) {
            angle -= 360
          }
          if (angle < 0) {
            angle = 360 + angle
          }
          const rotation = angle - this.viewer.viewport.getRotation()
          this.viewer.viewport.setRotation(angle)
          this.setLabelsRotation(angle)
          if (this.syncronized) this.$bus.$emit('rotation', {id: this._uid, rotation})
          if (this.isWebinar) {
            this.$bus.$emit('sendMessage', {
              action: 'rotate',
              data: {
                isNewInterface: true,
                primary: this.primary,
                angle: angle
              }
            })
          }
        },
        setLabelsRotation (angle) {
          this.setArrayStyle('.ruler-length', 'transform', 'rotate(' + (angle * -1) + 'deg)')
          this.setArrayStyle('.comment-form', 'transform', 'rotate(' + (angle * -1) + 'deg)')
        },
        viewCircle () {
          this.clearUnendedAction()
  
          if (this.circleMode) {
            this.viewer.scalebarInstance.divElt.className = ''
          } else {
            this.viewer.scalebarInstance.divElt.className = 'hide-scalebar'
            this.viewer.forceRedraw()
  
            setTimeout(() => {
              this.microscopScale()
            }, 50)
          }
          this.circleMode = !this.circleMode
          if (this.isWebinar && this.ableToAct) {
            this.$bus.$emit('sendMessage', {
              action: 'circle',
              data: {
                primary: this.primary,
                circleMode: this.circleMode
              }
            })
          }
          this.$bus.$emit('snapshotCircleToggled', this._uid)
        },
        addMark () {
          if (!this.markMode) {
            this.clearUnendedAction()
            this.viewer.canvas.querySelector('canvas').style.cursor = 'crosshair'
            this.viewer.addHandler('canvas-click', this.markModeCanvasClickHandler)
            this.markMode = true
          } else {
            this.clearUnendedAction()
          }
        },
        markModeCanvasClickHandler (e) {
          if (e.originalEvent.target.nodeName !== 'CANVAS') {
            return false
          }
          if (!e.quick) {
            return false
          }
  
          const p = this.viewer.viewport.pointFromPixel(e.position)
          const ip = this.viewer.viewport.viewportToImageCoordinates(p.x, p.y)
          if (ip.x < 0 || ip.y < 0 || ip.x > this.viewer.viewport._contentSize.x || ip.y > this.viewer.viewport._contentSize.y) {
            return false
          }
  
          const mark = {
            x: ip.x,
            y: ip.y,
            author: {
              email: this.author.email,
              id: this.author.id,
              name: this.author.name,
              photo: this.author.photo
            },
            date: moment().unix(),
            text: ''
          }
          this.createMark({
            caseId: this.file.case_id,
            fileId: this.file.id,
            mark,
            webinarId: this.isWebinar ? this.$store.state.webinar.id : null
          })
            .then(mark => {
              this.insertMarkComponent(mark, true)
              this.clearUnendedAction()
              if (this.isWebinar) {
                this.$bus.$emit('sendMessage', {
                  action: 'addMark',
                  data: {
                    isNewInterface: true,
                    primary: this.primary,
                    type: 'mark',
                    note: mark
                  }
                })
              }
            })
            .catch(console.error)
        },
        addRuler () {
          if (!this.rulerMode) {
            this.clearUnendedAction()
            this.viewer.canvas.querySelector('canvas').style.cursor = 'crosshair'
            this.viewer.addHandler('canvas-click', this.rulerModeCanvasClickHandler)
            this.rulerMode = true
            this.viewer.canvas.querySelector('canvas').addEventListener('mousemove', this.rulerModeCanvasMousemoveHandler)
          } else {
            this.clearUnendedAction()
          }
        },
        clearUnendedAction () {
          const temporaryRulerLength = this.viewer.canvas.getElementsByClassName(`ruler-length ${this.rulerData.rulerId}`)[0]
          if (this.rulerData.rulerId && temporaryRulerLength) {
            temporaryRulerLength.remove()
            this.rulerData.rulerOverlay._svg.getElementById(this.rulerData.rulerId).remove()
            this.viewer.removeOverlay(this.rulerData.startPoint.el)
          }
  
          if (this.rulerMode) {
            this.viewer.canvas.querySelector('canvas').style.cursor = 'default'
            this.viewer.removeHandler('canvas-click', this.rulerModeCanvasClickHandler)
            this.viewer.canvas.querySelector('canvas').removeEventListener('mousemove', this.rulerModeCanvasMousemoveHandler)
  
            this.rulerData.rulerId = null
            this.rulerData.rulerLength = null
            this.rulerData.startPoint = null
            this.rulerData.endPoint = null
            this.rulerData.rulerOverlay = null
            this.rulerMode = false
          }
  
          if (this.markMode) {
            this.viewer.canvas.querySelector('canvas').style.cursor = 'default'
            this.viewer.removeHandler('canvas-click', this.markModeCanvasClickHandler)
            this.markMode = false
          }
        },
        rulerModeCanvasClickHandler (e) {
          if (e.originalEvent.target.nodeName !== 'CANVAS') {
            return false
          }
          if (!e.quick) {
            return false
          }
  
          const p = this.viewer.viewport.pointFromPixel(e.position)
          const ip = this.viewer.viewport.viewportToImageCoordinates(p.x, p.y)
          if (ip.x < 0 || ip.y < 0 || ip.x > this.viewer.viewport._contentSize.x || ip.y > this.viewer.viewport._contentSize.y) {
            return false
          }
  
          if (!this.rulerData.startPoint) {
            const el = this.createPointElement()
            this.rulerData.startPoint = {
              p: p,
              ip: ip,
              v: e.position,
              el: el
            }
            this.viewer.addOverlay({
              element: el,
              px: ip.x,
              py: ip.y,
              placement: 'center'
            })
            this.rulerData.rulerId = (new Date()).getTime()
            const rulerLength = document.createElement('div')
            rulerLength.className = this.rulerData.rulerId
            rulerLength.className += ' ruler-length'
            rulerLength.style.left = e.position.x + 'px'
            rulerLength.style.top = e.position.y - 35 + 'px'
            rulerLength.innerHTML = '0.0 nm'
            rulerLength.style.display = 'block'
            this.rulerData.rulerLength = rulerLength
            this.viewer.overlaysContainer.appendChild(rulerLength)
            this.rulerData.rulerOverlay = this.viewer.svgOverlay()
            this.rulerData.rulerOverlay._svg.style['pointer-events'] = 'none'
            this.viewer.forceRedraw()
          } else if (!this.rulerData.endPoint) {
            const el = this.createPointElement()
            this.rulerData.endPoint = {
              p: p,
              ip: ip,
              v: e.position,
              el: el
            }
            this.viewer.addOverlay({
              element: el,
              px: ip.x,
              py: ip.y,
              placement: 'center'
            })
  
            // get distance
            const pixelDistance = this.rulerData.startPoint.ip.distanceTo(ip)
            const mpp = this.file.type_data && this.file.type_data.mpp
              ? this.file.type_data.mpp
              : 0
            const distance = pixelDistance * mpp * 1e-6
            const rulerLength = this.viewer.canvas.getElementsByClassName(`ruler-length ${this.rulerData.rulerId}`)[0]
            rulerLength.style.left = e.offsetX + 'px'
            rulerLength.style.top = e.offsetY + 'px'
            rulerLength.style.visibility = 'visible'
            rulerLength.style.zIndex = 1
            rulerLength.innerText = getWithUnit(distance, 'm')
  
            const ruler = {
              // rulerOverlay: this.rulerData.rulerOverlay,
              rulerId: this.rulerData.rulerId,
              startPoint: {
                ip: {
                  x: this.rulerData.startPoint.ip.x,
                  y: this.rulerData.startPoint.ip.y
                },
                v: {
                  x: this.rulerData.startPoint.v.x,
                  y: this.rulerData.startPoint.v.y
                }
              },
              endPoint: {
                ip: {
                  x: this.rulerData.endPoint.ip.x,
                  y: this.rulerData.endPoint.ip.y
                },
                v: {
                  x: this.rulerData.endPoint.v.x,
                  y: this.rulerData.endPoint.v.y
                }
              },
              ru: 'black',
              width: 0.002,
              length: this.rulerData.rulerLength.innerText,
              text: '',
              author: {
                email: this.author.email,
                id: this.author.id,
                name: this.author.name,
                photo: this.author.photo
              },
              date: moment().unix()
            }
            this.createRuler({
              caseId: this.file.case_id,
              fileId: this.file.id,
              ruler,
              webinarId: this.isWebinar ? this.$store.state.webinar.id : null
            })
              .then(ruler => {
                // clear old nodes widthout id references
                const temporaryRulerLength = this.viewer.canvas.getElementsByClassName(`ruler-length ${this.rulerData.rulerId}`)[0]
                const rulerOverlay = this.rulerData.rulerOverlay._svg.getElementById(this.rulerData.rulerId)
                if (temporaryRulerLength) temporaryRulerLength.remove()
                if (rulerOverlay) rulerOverlay.remove()
                this.viewer.removeOverlay(this.rulerData.startPoint.el)
                this.viewer.removeOverlay(this.rulerData.endPoint.el)
  
                this.insertRulerComponent(ruler, true)
                this.clearUnendedAction()
                if (this.isWebinar) {
                  this.$bus.$emit('sendMessage', {
                    action: 'addRuler',
                    data: {
                      isNewInterface: true,
                      primary: this.primary,
                      type: 'ruler',
                      note: ruler
                    }
                  })
                }
              })
              .catch(console.error)
  
            this.viewer.canvas.querySelector('canvas').style.cursor = 'default'
            this.viewer.forceRedraw()
          } else {
            this.rulerData.startPoint = null
            this.rulerData.endPoint = null
            this.viewer.canvas.querySelector('canvas').style.cursor = 'crosshair'
            this.viewer.forceRedraw()
          }
        },
        rulerModeCanvasMousemoveHandler (e) {
          if (this.rulerData.startPoint && !this.rulerData.endPoint) {
            const p = this.viewer.viewport.pointFromPixel(new OpenSeaDragon.Point(e.offsetX, e.offsetY))
            const ip = this.viewer.viewport.viewportToImageCoordinates(p.x, p.y)
            if (ip.x < 0 || ip.y < 0 || ip.x > this.viewer.viewport._contentSize.x || ip.y > this.viewer.viewport._contentSize.y) {
              return false
            }
            this.viewer.forceRedraw()
  
            const oldLine = this.rulerData.rulerOverlay._svg.getElementById(this.rulerData.rulerId)
            if (oldLine) {
              oldLine.remove()
            }
            const line = this.createSvgLine(this.rulerData.rulerId, this.rulerData.startPoint.p, p)
            this.rulerData.rulerOverlay.node().appendChild(line)
  
            const pixelDistance = this.rulerData.startPoint.ip.distanceTo(ip)
            const mpp = this.file.type_data && this.file.type_data.mpp
              ? this.file.type_data.mpp
              : 0
            const distance = pixelDistance * mpp * 1e-6
            const rulerLength = this.viewer.canvas.getElementsByClassName(`ruler-length ${this.rulerData.rulerId}`)[0]
            rulerLength.style.left = e.offsetX + 'px'
            rulerLength.style.top = e.offsetY + 'px'
            rulerLength.style.visibility = 'visible'
            rulerLength.style.zIndex = 1
            rulerLength.innerText = getWithUnit(distance, 'm')
          }
        },
        createPointElement () {
          const el = document.createElement('div')
          el.className = 'ruler-point'
          return el
        },
        createSvgLine (id, start, end) {
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
          line.setAttribute('id', id)
          line.setAttribute('x1', start.x)
          line.setAttribute('y1', start.y)
          line.setAttribute('x2', end.x)
          line.setAttribute('y2', end.y)
          line.setAttribute('stroke', 'black')
          line.setAttribute('stroke-width', 0.002 / this.viewer.viewport.getZoom())
          return line
        },
        createVueContainer (entityId, type, openCommentOnCreate) {
          const el = document.createElement('div')
          const id = makeStringId()
          el.setAttribute('id', id)
          el.setAttribute('data-type', type)
          el.setAttribute('data-id', entityId)
          el.setAttribute('data-open', openCommentOnCreate)
          const inner = document.createElement('div')
          inner.setAttribute('id', id + '_')
          el.appendChild(inner)
          return el
        },
        lineResizeHandler (e) {
          if (this.file.type_data.rulers) {
            let lines = e.eventSource.element.querySelectorAll('line')
            this.viewer.svgOverlay().resize()
            if (e.zoom < this.viewer.viewport.getMaxZoom() && e.zoom > this.viewer.viewport.getMinZoom()) {
              Array.prototype.slice.call(lines).forEach(line => {
                if (this.prevZoom >= e.zoom) {
                  line.setAttribute('stroke-width', (0.002 / this.prevZoom))
                } else {
                  line.setAttribute('stroke-width', (0.002 / e.zoom))
                }
              })
              this.prevZoom = e.zoom
            }
          }
        },
        insertMarkComponent (mark, openCommentOnCreate) {
          // Delegates component insertion to viewer AddOverlay-handler
          const el = this.createVueContainer(mark.id, 'mark', openCommentOnCreate)
          this.viewer.addOverlay({
            element: el,
            px: mark.x,
            py: mark.y,
            placement: 'center'
          })
          // First insert in wrong place (some openseadragon issues?). Update overlay
          this.$nextTick(() => {
            this.viewer.updateOverlay(el, {x: mark.x, y: mark.y}, 'center')
          })
        },
        insertRulerComponent (ruler, openCommentOnCreate) {
          const start = this.createPointElement()
          start.setAttribute('data-id', ruler.id)
          start.setAttribute('data-type', 'ruler-start')
          this.viewer.addOverlay({
            element: start,
            px: ruler.startPoint.ip.x,
            py: ruler.startPoint.ip.y,
            placement: 'center'
          })
  
          const end = this.createPointElement()
          end.setAttribute('data-id', ruler.id)
          end.setAttribute('data-type', 'ruler-end')
          this.viewer.addOverlay({
            element: end,
            px: ruler.endPoint.ip.x,
            py: ruler.endPoint.ip.y,
            placement: 'center'
          })
  
          const line = this.createSvgLine(
            ruler.id,
            this.viewer.viewport.imageToViewportCoordinates(ruler.startPoint.ip.x, ruler.startPoint.ip.y),
            this.viewer.viewport.imageToViewportCoordinates(ruler.endPoint.ip.x, ruler.endPoint.ip.y)
          )
          this.viewer.svgOverlay().node().appendChild(line)
  
          // Delegates component insertion to viewer AddOverlay-handler
          const el = this.createVueContainer(ruler.id, 'ruler', openCommentOnCreate)
          this.viewer.addOverlay({
            element: el,
            px: ruler.endPoint.ip.x,
            py: ruler.endPoint.ip.y,
            placement: 'center'
          })
          // Update overlay. As in mark insert
          this.$nextTick(() => {
            this.viewer.updateOverlay(el, {x: ruler.endPoint.ip.x, y: ruler.endPoint.ip.y}, 'center')
          })
        },
        setArrayStyle (selector, property, value) {
          const elems = this.$el.querySelectorAll(selector)
          for (let el of elems) {
            el.style[property] = value
          }
        },
        toggleNavigator (navigatorShown) {
          this.viewer.navigator.element.style.display = navigatorShown ? 'block' : 'none'
        },
        makeScreenshot () {
          const bounds = this.viewer.viewport.getBounds()
          const ip = this.viewer.viewport.viewportToImageCoordinates(bounds.x, bounds.y)
          const iw = this.viewer.viewport.viewportToImageCoordinates(bounds.width, bounds.height)
          const sx = ip.x
          const ex = ip.x + iw.x
          const sy = ip.y
          const ey = ip.y + iw.y
          let additionalInfo = []
  
          additionalInfo.push('Препарат: ' + this.file.title)
  
          if (this.file.type_data.marks) {
            for (let i = 0; i < this.file.type_data.marks.length; i++) {
              let mark = this.file.type_data.marks[i]
              if (mark.x > sx && mark.x < ex && mark.y > sy && mark.y < ey &&
                mark.x > sx && mark.x < ex && mark.y > sy && mark.y < ey) {
                if (mark.text != null && mark.text != '') {
                  additionalInfo.push('Метка: ' + mark.text)
                }
              }
            }
          }
          if (this.file.type_data.rulers) {
            for (let i = 0; i < this.file.type_data.rulers.length; i++) {
              let rule = this.file.type_data.rulers[i]
              if (rule.startPoint.ip.x > sx && rule.startPoint.ip.x < ex && rule.startPoint.ip.y > sy && rule.startPoint.ip.y < ey &&
                rule.endPoint.ip.x > sx && rule.endPoint.ip.x < ex && rule.endPoint.ip.y > sy && rule.endPoint.ip.y < ey) {
                let text = 'Измерение: ' + rule.length
                if (rule.text != null && rule.text != '') {
                  text += ' (' + rule.text + ')'
                }
                additionalInfo.push(text)
              }
            }
          }
  
          if (this.cells.positive > 0 || this.cells.negative > 0) {
            let p = this.cells.positive + this.cells.positiveNewdraw
            let n = this.cells.negative + this.cells.negativeNewdraw
            let percent = 100
            if (n > 0) {
              percent = parseFloat((p / (p + n)) * 100).toFixed(1)
            }
  
            additionalInfo.push('Ki-67: P ' + p + ' N ' + n + ' ' + percent + '%')
          }
          if (this.recognizedCrop != null) {
            let percent = 100
            if (this.recognizedCrop.negative > 0) {
              percent = parseFloat((this.recognizedCrop.positive / (this.recognizedCrop.positive + this.recognizedCrop.negative)) * 100).toFixed(1)
            }
            additionalInfo.push('Ki-67: P ' + this.recognizedCrop.positive + ' N ' + this.recognizedCrop.negative + ' ' + percent + '%')
          }
  
          this.toggleNavigator(false)
          html2canvas(document.querySelector('.openseadragon-container')).then(canvas => {
            const finishCanvas = document.createElement('canvas'), fCtx = finishCanvas.getContext('2d')
            finishCanvas.width = 600
            finishCanvas.height = 400
  
            let imageAspectRatio = canvas.width / canvas.height
            let canvasAspectRatio = finishCanvas.width / finishCanvas.height
            let renderableHeight, renderableWidth, xStart, yStart
  
            if (imageAspectRatio < canvasAspectRatio) {
              renderableHeight = finishCanvas.height
              renderableWidth = canvas.width * (renderableHeight / canvas.height)
              xStart = (finishCanvas.width - renderableWidth) / 2
              yStart = 0
            } else if (imageAspectRatio > canvasAspectRatio) {
              renderableWidth = finishCanvas.width
              renderableHeight = canvas.height * (renderableWidth / canvas.width)
              xStart = 0
              yStart = (finishCanvas.height - renderableHeight) / 2
            } else {
              renderableHeight = finishCanvas.height
              renderableWidth = finishCanvas.width
              xStart = 0
              yStart = 0
            }
            fCtx.drawImage(canvas, xStart, yStart, renderableWidth, renderableHeight)
  
            const img64 = finishCanvas.toDataURL('image/png')
            let bounds = this.viewer.viewport.getBounds(true)
            const imgSrc = '/files/' + this.file.name
            const image = new Image()
            image.onload = () => {
              this.toggleNavigator(true)
              const canvas = document.createElement('canvas')
              const ctx = canvas.getContext('2d')
              canvas.width = 600
              canvas.height = 400
              ctx.drawImage(image, 0, 0, 600, 400)
              const imageDataURI = canvas.toDataURL()
  
              this.saveScreenshotInStorage({
                data64: imageDataURI,
                caseId: this.file.case_id
              }).then(data => {
                const screenshot = {
                  src: imgSrc,
                  file_name: data,
                  bounds: bounds,
                  info: additionalInfo.join('; ')
                }
                this.$emit('screenshot', screenshot)
              })
            }
            image.src = img64
          })
        },
        syncZoom (e) {
          if (e.id !== this._uid && e.type) {
            this[e.type]()
          }
          if (e.id !== this._uid && e.zoom) {
            e.zoom > 0 ? this.zoomIn() : this.zoomOut()
            const heightRate = this.comparing ? 0.3 : window.innerWidth > 1024 ? 0.6 : 0.5
            const pixelDistance = Math.round(window.innerHeight * heightRate)
            this.$refs.scale.innerText = this.viewer.getDistance(pixelDistance)
          }
        },
        syncMove (e) {
          if (e.id !== this._uid) {
            this.viewer.viewport.panTo(this.viewer.viewport.viewerElementToViewportCoordinates(e.center))
          }
        },
        syncRotation (e) {
          if (e.id !== this._uid) {
            const angle = this.viewer.viewport.getRotation() + e.rotation
            this.viewer.viewport.setRotation(angle)
            this.setArrayStyle('.ruler-length', 'transform', 'rotate(' + (angle * -1) + 'deg)')
            this.setArrayStyle('.comment-form', 'transform', 'rotate(' + (angle * -1) + 'deg)')
          }
        },
        busSetBounds (msg) {
          if (msg.primary === this.primary) {
            this.viewer.viewport.fitBounds(new OpenSeaDragon.Rect(msg.bounds.x, msg.bounds.y, msg.bounds.width, msg.bounds.height, msg.bounds.degrees))
          }
        },
        busSetRotation (msg) {
          if (msg.primary === this.primary) {
            const rotation = msg.angle - this.viewer.viewport.getRotation()
            this.viewer.viewport.setRotation(msg.angle)
            this.setArrayStyle('.ruler-length', 'transform', 'rotate(' + (msg.angle * -1) + 'deg)')
            this.setArrayStyle('.comment-form', 'transform', 'rotate(' + (msg.angle * -1) + 'deg)')
            if (this.syncronized) this.$bus.$emit('rotation', {id: this._uid, rotation})
          }
        },
        busSetCircle (msg) {
          if (msg.primary === this.primary && this.circleMode !== msg.circleMode) {
            this.viewCircle()
          }
        },
        busAddNote (msg) {
          if (msg.primary === this.primary) {
            const functionName = msg.type === 'mark' ? 'insertMarkComponent' : 'insertRulerComponent'
            const mutationName = msg.type === 'mark' ? 'CREATE_MARK' : 'CREATE_RULER'
            this.$store.commit(mutationName, {
              fileId: this.file.id,
              isWebinar: this.isWebinar,
              mark: msg.note,
              ruler: msg.note
            })
            this[functionName](msg.note, true)
          }
        },
        circleRedraw () {
          if (this.circleMode) {
            let circle = this.$refs.circle
            let disp = circle.style.display
            circle.style.display = 'none'
            setTimeout(() => {
              circle.style.display = disp
            }, 0)
          }
        },
        showCurrentZoom () {
          this.currentZoomVisible = true
        },
        hideCurrentZoom: _.debounce(function () {
          this.currentZoomVisible = false
        }, 5000),
        saveAccountSettings: _.debounce(function () {
          this.changeAccount({ viewer_settings: this.settings, silentSave: true })
        }, 3000),
        viewerKeyHandler (event) {
          const targetClass = _.get(event, ['originalEvent', 'target', 'className'], null)
  
          if (targetClass !== openseadragonCanvasClass) {
            return true
          }
  
          const canvasKeyPressEventArgs = {
            originalEvent: event.originalEvent,
            preventDefaultAction: event.preventDefaultAction,
            preventVerticalPan: event.preventVerticalPan,
            preventHorizontalPan: event.preventHorizontalPan
          }
  
          // This event is documented in onCanvasKeyDown
          this.viewer.raiseEvent('canvas-key', canvasKeyPressEventArgs)
  
          if (!canvasKeyPressEventArgs.preventDefaultAction && !event.ctrl && !event.alt && !event.meta) {
            const key = _.get(event, ['originalEvent', 'code'], null)
            if (!key) {
              return true
            }
  
            switch (key) {
              case 'KeyW':
                if (this.discreteZoomEnabled) {
                  this.zoom(1, null)
                  return false
                }
                this.viewer.viewport.zoomBy(1.1)
                return false
              case 'KeyS':
                if (this.discreteZoomEnabled) {
                  this.zoom(-1, null)
                  return false
                }
                this.viewer.viewport.zoomBy(0.9)
                return false
              default:
                return true
            }
          } else {
            return true
          }
        },
        viewerDiscreteScrollHandler (event) {
          const scrollDirection = event.scroll
          const position = event.position
          this.zoom(scrollDirection, position)
        },
        zoom (direction, position) {
          if (this.currentZoom !== this.zoomSteps[this.currentZoomStep]) {
            let stepDiffs = []
            for (let zoom of this.zoomSteps) {
              stepDiffs.push(Math.abs(this.currentZoom - zoom))
            }
  
            const nearestZoomStepIndex = _.indexOf(stepDiffs, _.min(stepDiffs))
  
            let nearestLeftNeighbour = null
            let nearestRightNeighbour = null
  
            // Если ближайший зум больше текущего, то он будет правым соседом, а левым соседом будет предыщуший
            if (this.zoomSteps[nearestZoomStepIndex] > this.currentZoom) {
              nearestRightNeighbour = nearestZoomStepIndex
  
              if (nearestZoomStepIndex - 1 > 0) {
                nearestLeftNeighbour = nearestZoomStepIndex - 1
              }
            }
  
            // Если ближайший зум меньше текущего, то он будет левым соседом, а правым соседом будет последующий
            if (this.zoomSteps[nearestZoomStepIndex] < this.currentZoom) {
              nearestLeftNeighbour = nearestZoomStepIndex
  
              if (nearestZoomStepIndex + 1 < this.zoomSteps.length - 1) {
                nearestRightNeighbour = nearestZoomStepIndex + 1
              }
            }
  
            // Если происходит уменьшение зума, то текущим шагом выбирается правый сосед
            if (direction < 0 && nearestRightNeighbour) {
              this.currentZoomStep = nearestRightNeighbour
            }
  
            // Если происходит уменьшение зума и у нас нет правого соседа (т.е. мы за шкалой зума) и есть левый сосед
            // То делаем текущий элемент следуюший за левым
            if (direction < 0 && !nearestRightNeighbour && nearestLeftNeighbour) {
              this.currentZoomStep = nearestLeftNeighbour + 1
            }
  
            // Если происходит увеличение зума и есть левый сосед, то текущим шагом будет левый сосед
            if (direction > 0 && nearestLeftNeighbour) {
              this.currentZoomStep = nearestLeftNeighbour
            }
  
            // Если мы находимся в точке, совпадающией со шкалой, то соседей нет, выбирается ближайшая точка (эта же) в качестве шага зума
            if (!nearestLeftNeighbour && !nearestRightNeighbour) {
              this.currentZoomStep = nearestZoomStepIndex
            }
          }
  
          const maxZoom = this.viewer.viewport.getMaxZoom()
          const homeZoom = this.viewer.viewport.getHomeZoom()
  
          if (direction > 0 && this.currentZoomStep < this.zoomSteps.length - 1) {
            this.viewer.viewport.zoomTo(homeZoom, position ? this.viewer.viewport.pointFromPixel(position, true) : null, true)
  
            this.currentZoomStep++
            let newZoom = this.zoomSteps[this.currentZoomStep] * homeZoom
            if (newZoom > maxZoom) {
              newZoom = maxZoom
            }
  
            this.viewer.viewport.zoomBy(newZoom, position ? this.viewer.viewport.pointFromPixel(position, true) : null, true)
          }
  
          if (direction < 0 && this.currentZoomStep > 0) {
            this.viewer.viewport.zoomTo(homeZoom, position ? this.viewer.viewport.pointFromPixel(position, true) : null, true)
            this.currentZoomStep--
  
            let newZoom = this.zoomSteps[this.currentZoomStep] * homeZoom
            if (newZoom < homeZoom) {
              newZoom = homeZoom
            }
            this.viewer.viewport.zoomBy(newZoom, position ? this.viewer.viewport.pointFromPixel(position, true) : null, true)
          }
  
          this.viewer.viewport.applyConstraints()
        },
        fillZoomSteps (zoomMode) {
          switch (zoomMode) {
            case 'discrete7': {
              this.zoomSteps = [1, 4, 10, 20, 30, 40, 60]
              break
            }
            case 'discrete14': {
              this.zoomSteps = [1, 2, 4, 6, 8, 10, 15, 20, 25, 30, 35, 40, 50, 60]
              break
            }
            default:
              this.zoomSteps = null
          }
        },
        fillArrowStepSizeInPoints (speed) {
          switch (speed) {
            case ARROWS_CONTROL_SPEED_SLOW:
              this.arrowStepSizeInPoints = 50
              break
            case ARROWS_CONTROL_SPEED_MEDIUM:
              this.arrowStepSizeInPoints = 63
              break
            case ARROWS_CONTROL_SPEED_FAST:
              this.arrowStepSizeInPoints = 80
              break
            default:
              this.arrowStepSizeInPoints = 50
              break
          }
        },
        processViewerKeyControls (event, viewer, keyLogic) {
          let canvasKeyDownEventArgs = {
            originalEvent: event.originalEvent,
            preventDefaultAction: event.preventDefaultAction,
            preventVerticalPan: event.preventVerticalPan,
            preventHorizontalPan: event.preventHorizontalPan
          }
  
          viewer.raiseEvent('canvas-key', canvasKeyDownEventArgs)
          keyLogic()
          viewer.viewport.applyConstraints()
        },
        startArrowsControl () {
          const immediately = this.arrowsControlMode === ARROWS_CONTROL_MODE_ABRUPT
  
          kd.LEFT.down(_.throttle((event) => {
            const targetClass = _.get(event, ['target', 'className'], null)
  
            if (targetClass !== openseadragonCanvasClass) {
              return true
            }
  
            this.processViewerKeyControls(event, this.viewer, () => {
              this.viewer.viewport.panBy(this.viewer.viewport.deltaPointsFromPixels(new OpenSeaDragon.Point(-this.arrowStepSizeInPoints, 0)), immediately)
            })
          }, 40))
  
          kd.RIGHT.down(_.throttle((event) => {
            const targetClass = _.get(event, ['target', 'className'], null)
  
            if (targetClass !== openseadragonCanvasClass) {
              return true
            }
  
            this.processViewerKeyControls(event, this.viewer, () => {
              this.viewer.viewport.panBy(this.viewer.viewport.deltaPointsFromPixels(new OpenSeaDragon.Point(this.arrowStepSizeInPoints, 0)), immediately)
            })
          }, 40))
  
          kd.UP.down(_.throttle((event) => {
            const targetClass = _.get(event, ['target', 'className'], null)
  
            if (targetClass !== openseadragonCanvasClass) {
              return true
            }
  
            this.processViewerKeyControls(event, this.viewer, () => {
              this.viewer.viewport.panBy(this.viewer.viewport.deltaPointsFromPixels(new OpenSeaDragon.Point(0, -this.arrowStepSizeInPoints)), immediately)
            })
          }, 40))
  
          kd.DOWN.down(_.throttle((event) => {
            const targetClass = _.get(event, ['target', 'className'], null)
  
            if (targetClass !== openseadragonCanvasClass) {
              return true
            }
  
            this.processViewerKeyControls(event, this.viewer, () => {
              this.viewer.viewport.panBy(this.viewer.viewport.deltaPointsFromPixels(new OpenSeaDragon.Point(0, this.arrowStepSizeInPoints)), immediately)
            })
          }, 40))
  
          kd.run(function () {
            kd.tick()
          })
        },
        stopArrowsControl () {
          kd.stop()
        },
        snapshotCircleToggled (uid) {
          if (this._uid !== uid) this.circleRedraw()
        },
        ...mapActions(['createMark', 'createRuler', 'toggleSynchronize', 'sendGlassToDp', 'getInfoByCells', 'sendMorfoTrainingData',
          'sendTrainingData', 'getMorfoTrainingData', 'sendImageToDs', 'getImageFromDs', 'deleteTrainingData', 'saveScreenshotInStorage',
          'sendImageMembraneToDs', 'getImageMembraneFromDs', 'getDsLayer', 'findRelatedChangeModalVisible', 'changeAccount', 'getMetsColor',
          'saveScreenshotWsiInStorage', 'processNeuralSearch', 'closeNeuralSearchPopup'])
      },
      created () {
        if (this.isMobileOrTablet) window.addEventListener('resize', this.circleRedraw)
        this.$bus.$on('snapshotCircleToggled', this.snapshotCircleToggled)
  
        let showFilter = JSON.parse(localStorage.getItem('showCanvasFilters'))
        if (showFilter) {
          this.changeCanvasFilters()
        }
      },
      destroyed () {
        if (this.isMobileOrTablet) window.removeEventListener('resize', this.circleRedraw)
      },
      mounted () {
        let mpp = this.file.type_data && this.file.type_data.mpp
          ? 1e6 / this.file.type_data.mpp
          : 0
  
        this.windowHeight = window.outerHeight
        this.windowWidth = window.outerWidth
  
        this.$nextTick(() => {
          window.addEventListener('resize', () => {
            this.windowHeight = window.outerHeight
            this.windowWidth = window.outerWidth
          })
        })
  
        this.viewer = new OpenSeaDragon({
          id: this.comparing && !this.primary ? 'osd2' : 'osd',
          navigatorPosition: 'TOP_LEFT',
          gestureSettingsMouse: {
            clickToZoom: false,
            flickEnabled: true
          },
          gestureSettingsTouch: {
            pinchRotate: false
          },
          prefixUrl: '/static/images/',
          showNavigator: !(this.isWebinar && !this.ableToAct) || !this.isMobileOrTablet,
          showNavigationControl: false,
          navigatorSizeRatio: 0.15,
          mouseNavEnabled: !(this.isWebinar && !this.ableToAct),
          maxZoomPixelRatio: 4,
          crossOriginPolicy: 'Anonymous'
        })
  
        this.viewer.innerTracker.keyHandler = this.viewerKeyHandler
        this.viewer.innerTracker.keyDownHandler = null
  
        this.arrowsControlMode = _.get(this.author, 'viewer_settings.arrowsControlMode', ARROWS_CONTROL_MODE_ABRUPT)
        const arrowControlSpeed = _.get(this.author, 'viewer_settings.arrowsControlSpeed', ARROWS_CONTROL_SPEED_SLOW)
        const zoomMode = _.get(this.author, 'viewer_settings.zoomMode', null)
  
        this.fillZoomSteps(zoomMode)
        this.fillArrowStepSizeInPoints(arrowControlSpeed)
  
        if (this.discreteZoomEnabled) {
          this.viewer.innerTracker.scrollHandler = this.viewerDiscreteScrollHandler
        }
  
        this.viewer.addHandler('open', () => {
          const urlParams = new URLSearchParams(window.location.search)
          const level = urlParams.get('level')
          const x = urlParams.get('x')
          const y = urlParams.get('y')
  
          if (!level || !x || !y) {
            return
          }
  
          let tileSource = this.viewer.world.getItemAt(0).source
          const p = tileSource.getTileBounds(parseInt(level), parseInt(x), parseInt(y))
          this.viewer.viewport.panTo(p)
          this.viewer.viewport.zoomBy(this.viewer.viewport.getHomeZoom() * 20, null, true)
  
          window.history.replaceState(null, null, '/cases/' + this.file.case_id)
        })
  
        // helper functions
        this.viewer.getDistance = (pixelDistance) => {
          const p0 = this.viewer.viewport.pointFromPixel(new OpenSeaDragon.Point(0, 0))
          const ip0 = this.viewer.viewport.viewportToImageCoordinates(p0.x, p0.y)
          const p1 = this.viewer.viewport.pointFromPixel(new OpenSeaDragon.Point(pixelDistance, 0))
          const ip1 = this.viewer.viewport.viewportToImageCoordinates(p1.x, p1.y)
          const imageDistance = ip0.distanceTo(ip1) * (this.file.type_data.mpp || 0) * 1e-6
          return imageDistance
            ? getWithUnit(imageDistance, 'm')
            : 'no data'
        }
  
        // insert scalebar
        this.viewer.scalebar({
          pixelsPerMeter: mpp,
          xOffset: 20,
          yOffset: 20,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          stayInsideImage: false
        })
  
        this.viewer.addHandler('open', e => {
          this.viewer.svgOverlay()._svg.style['pointer-events'] = 'none'
          this.file.type_data.marks ? this.file.type_data.marks.forEach(mark => {
            this.insertMarkComponent(mark, false)
          }) : null
          this.file.type_data.rulers ? this.file.type_data.rulers.forEach(ruler => {
            this.insertRulerComponent(ruler, false)
          }) : null
        })
  
        this.viewer.addHandler('animation-start', () => {
          this.isAnimate = true
        })
  
        this.viewer.addHandler('animation-finish', () => {
          this.isAnimate = false
        })
  
        this.viewer.addHandler('zoom', this.lineResizeHandler)
  
        this.viewer.addHandler('add-overlay', (data) => {
          if (data.element.dataset.type === 'mark') {
            const markId = data.element.dataset.id
            const mark = this.file.type_data.marks.filter(m => m.id === markId)[0]
  
            // eslint-disable-next-line
            new Note({
              el: `#${data.element.id}_`,
              propsData: {
                object: mark,
                type: 'mark',
                caseId: this.file.case_id,
                fileId: this.file.id,
                openOnCreate: (data.element.dataset.open === 'true'),
                viewer: this.viewer,
                $store: this.$store,
                $bus: this.$bus,
                isWebinar: this.isWebinar,
                ableToAct: this.ableToAct,
                primary: this.primary
              }
            })
          }
          if (data.element.dataset.type === 'ruler') {
            const rulerId = data.element.dataset.id
            const ruler = this.file.type_data.rulers.filter(r => r.id === rulerId)[0]
  
            // eslint-disable-next-line
            new Note({
              el: `#${data.element.id}_`,
              propsData: {
                object: ruler,
                type: 'ruler',
                caseId: this.file.case_id,
                fileId: this.file.id,
                $store: this.$store,
                openOnCreate: (data.element.dataset.open === 'true'),
                viewer: this.viewer,
                $bus: this.$bus,
                isWebinar: this.isWebinar,
                ableToAct: this.ableToAct,
                primary: this.primary
              }
            })
          }
        })
  
        this.viewer.addHandler('zoom', e => {
          if (this.$refs.hole) {
            this.microscopScale()
          } else {
            if (this.$refs.osdel !== undefined) {
              const pixelDistance = Math.round(this.$refs.osdel.clientWidth * 0.5)
              this.$refs.scale.innerText = this.viewer.getDistance(pixelDistance)
            }
          }
          if (this.syncronized) this.$bus.$emit('zoom', {id: this._uid, zoom: e.scroll})
          let homeZoom = this.viewer.viewport.getHomeZoom()
          let currentZoom = this.viewer.viewport.getZoom()
  
          this.currentZoom = Math.round(currentZoom / (homeZoom * homeZoom))
  
          if (this.$refs['snapshot']) {
            this.showCurrentZoom()
            const currentZoomTop = this.$refs['snapshot'].clientHeight - 105
            this.$refs['current-zoom'].style.top = `${currentZoomTop}px`
            this.hideCurrentZoom()
          }
        })
  
        this.viewer.addHandler('canvas-drag', e => {
          if (this.syncronized) {
            const center = this.viewer.viewport.viewportToViewerElementCoordinates(this.viewer.viewport.getCenter())
            this.$bus.$emit('move', {
              id: this._uid,
              center: center,
              rotation: this.viewer.viewport.getRotation()
            })
          }
        })
  
        this.viewer.addHandler('close', e => {
          const svgChildren = Array.from(this.viewer.svgOverlay().node().childNodes)
          svgChildren.forEach(line => line.remove())
        })
  
        this.viewer.addHandler('rotate', (e) => {
          this.setLabelsRotation(e.degrees)
        })
  
        // open initial file
        this.viewer.open(`/tiles/${this.file.name}.dzi`)
        // Notify DP Backend that snapshot was watched
        axios.post(`/api/files/${this.file.id}/watched`)
            .catch(err => Sentry.captureException(err))      // sync handlers
        this.$bus.$on('zoom', this.syncZoom)
        this.$bus.$on('move', this.syncMove)
        this.$bus.$on('rotation', this.syncRotation)
  
        // webinar sync
        this.$bus.$on('setBounds', this.busSetBounds)
        this.$bus.$on('setRotation', this.busSetRotation)
        this.$bus.$on('setCircle', this.busSetCircle)
        this.$bus.$on('addNote', this.busAddNote)
  
        if (this.isWebinar && this.ableToAct) {
          this.updater = setInterval(() => {
            const bounds = this.viewer.viewport.getBounds()
            if (!this.previousBounds || (this.previousBounds && !deepEqual(this.previousBounds, bounds))) {
              this.$bus.$emit('sendMessage', {
                action: 'bounds',
                data: {
                  primary: this.primary,
                  bounds: {
                    x: bounds.x,
                    y: bounds.y,
                    width: bounds.width,
                    height: bounds.height,
                    degrees: bounds.degrees
                  }
                }
              })
              this.previousBounds = Object.assign({}, bounds)
            }
          }, 500)
        }
  
        let wheelTimeout
        let navContainer = this.viewer.navigator.element.parentElement.parentElement
        navContainer.onwheel = throttle(() => {
          clearTimeout(wheelTimeout)
          wheelTimeout = setTimeout(() => {
            navContainer.style.pointerEvents = 'all'
          }, 500)
          navContainer.style.pointerEvents = 'none'
        }, 50)
  
        this.startArrowsControl()
  
        // фокусируемся на канвасе по дефолоту
        const openseadragonCanvas = this.$refs['snapshot'].querySelector(`.${openseadragonCanvasClass}`)
  
        if (openseadragonCanvas) {
          openseadragonCanvas.focus()
        }
      },
      beforeDestroy () {
        this.viewer.close()
        this.stopArrowsControl()
        if (this.updater) {
          clearInterval(this.updater)
        }
  
        this.$bus.$off('zoom', this.syncZoom)
        this.$bus.$off('move', this.syncMove)
        this.$bus.$off('rotation', this.syncRotation)
  
        this.$bus.$off('setBounds', this.busSetBounds)
        this.$bus.$off('setRotation', this.busSetRotation)
        this.$bus.$off('setCircle', this.busSetCircle)
        this.$bus.$off('addNote', this.busAddNote)
  
        this.$bus.$off('snapshotCircleToggled', this.snapshotCircleToggled)
  
        this.findRelatedChangeModalVisible(false)
      }
    }
  </script>
  <style lang="scss">
    .legend {
      position: absolute;
      background-color: white;
      padding: 2px;
      right: 0;
      left: 0;
      text-align: center;
    }
  
    .legend p {
      padding: 0;
      margin: 0;
      padding-top: 2px!important;
      padding-bottom: 2px!important;
      display: inline-block;
    }
  
    .legend p span {
      padding: 4px;
    }
  
    .membrane-offset {
      right: 48% !important;
    }
  
    .info-label pre {
      display: block;
      padding: 0;
      margin: 0;
  
      border: none;
      background-color: transparent;
    }
  
    .info-label {
      &__ki67 {
        padding: 10px;
  
        color: black;
        background-color: white;
        font: 14px Roboto monospace;
      }
  
      &__neural-search {
        display: flex;
        justify-content: center;
        align-items: center;
  
        height: 50px;
  
        color: black;
        background-color: white;
        font: 14px Arial;
      }
    }
  
    mark, .mark {
      background-color: transparent !important;
    }
  
    .progress-loader {
      border: 16px solid #f3f3f3;
      border-radius: 50%;
      border-top: 16px solid #3498db;
      width: 120px;
      height: 120px;
      max-width: 100%;
      max-height: 100%;
      -webkit-animation: spin 2s linear infinite; /* Safari */
      animation: spin 2s linear infinite;
      margin: 10px auto 0;
    }
  
    .slide-opacity {
      position: absolute;
      -webkit-appearance: slider-vertical;
      width: 8px;
      height: 100%;
      margin-left: -20px;
    }
  
    /* Safari */
    @-webkit-keyframes spin {
      0% {
        -webkit-transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
      }
    }
  
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  </style>
  <style lang="scss" scoped>
    @import "src/globals.scss";
  
    $toolsHeight: (
      'zoom_plus': 20px,
      'zoom_minus': 4px,
      'zoom-5x': 9px,
      'zoom-10x': 9px,
      'zoom-20x': 9px,
      'pen': 20px,
      'eyem': 20px,
      'eyem-off': 20px,
      'ruler': 10px,
      'view-circle': 20px,
      'rotate_right': 18px,
      'rotate_left': 18px,
      'screenshot': 20px,
      'layers': 20px,
      'layers_membrane': 20px,
      'layers_cytological': 20px,
      'layers_metastatic': 20px,
      'brain': 20px,
      'brain_membrane': 20px,
      'brain_cytological': 20px,
      'brain_metastatic': 20px,
      'pm-count': 20px,
      'cell-positive': 20px,
      'cell-negative': 20px,
      'cell-edit': 20px,
      'cell-save': 20px,
      'cell-save-tmp': 20px,
      'cell-delete-tmp': 25px,
      'cell-move': 20px,
      'cell-delete': 20px,
      'cell-area': 20px,
      'cell-full': 20px,
      'cell-in': 20px,
      'cell-out': 20px,
      'morfo-area': 20px,
      'neural-search': 20px,
      'cell-select': 20px,
      'membrane-area': 20px,
      'search_menu': 20px,
      'contrast': 20px,
      'screenshot-area': 20px
    );
  
    .cell-full,
    .cell-in,
    .cell-out {
      margin-top: 12px;
    }
  
    .select-clear {
      border-style: inset;
      -moz-appearance: menulist;
      -webkit-appearance: menulist;
      margin-top: 8px;
      padding-top: 5px;
      padding-bottom: 5px;
    }
  
    @mixin btn($name, $width, $height) {
      background-image: url(/static/icons/#{$name}.svg);
      width: $width;
      height: $height;
  
      @media (max-width: $tablet_max) {
        width: $width * 0.75;
        height: $height * 0.75;
      }
    }
  
    .layers-active {
      background-color: #b0d2e8;
    }
  
    .selected-a{
      font-weight: bold;
    }
  
    .snapshot {
      flex-grow: 1;
      background-color: #000;
      display: flex;
      height: 100%;
      width: 100%;
      position: relative;
    }
  
    #osd,
    #osd2,
    .svg-overlay {
      width: 100%;
      height: 100%;
      min-height: 330px;
      @media (orientation: landscape) and (max-width: $mobile_max) {
        min-height: 270px;
      }
    }
  
    .tools-left {
      visibility: visible;
      position: fixed;
      top: 130px;
      background: white;
      padding: 10px;
      left: 40px;
  
      &.hidden:not(:hover) {
        visibility: hidden;
        opacity: 0;
        transition: opacity 2s, visibility 0s 2s;
      }
  
      & a {
        padding: 6px;
        position: relative;
        display: inline-block;
        justify-content: center;
        align-items: center;
        width: 50px;
        cursor: pointer;
        @media (orientation: landscape) and (max-width: $mobile_max) {
          display: inline-flex;
          vertical-align: middle;
        }
  
        & i {
          display: block;
          background-color: transparent;
          background-repeat: no-repeat;
          background-position: 0 0;
          background-size: 300%;
          margin: 0 auto;
        }
  
        &:hover i {
          background-position: 50% 0;
        }
  
        &:active i {
          background-position: 100% 0;
        }
  
        @each $name, $height in $toolsHeight {
          &.#{$name} i {
            @include btn($name, $height, $height);
          }
        }
  
        &.selected i {
          background-position: 100% 0;
        }
      }
    }
  
    .tools-top {
      position: fixed;
      min-width: 50px;
      right: 34%;
      top: 0px;
      z-index: 4;
      opacity: 1;
      visibility: visible;
      background-color: white;
      box-shadow: 1px 4px 10px rgba(0, 0, 0, 0.2);
      overflow: hidden;
      white-space: nowrap;
      &.comparing {
        position: absolute;
        @media (max-height: $tablet_min) {
          top: 70px;
          bottom: 0;
          transform: none;
        }
      }
      @media (orientation: portrait) and (max-width: $mobile_max) and (max-height: $mobile_max) {
        bottom: 70px;
        top: 0;
        transform: none;
        max-height: 100%;
      }
      @media (orientation: landscape) and (max-width: $mobile_max) {
        font-size: 0;
        height: 40px;
        left: auto;
        margin: auto;
        right: 0;
        text-align: center;
        top: -1px;
        transform: none;
        width: auto;
      }
  
      &.hidden:not(:hover) {
        visibility: hidden;
        opacity: 0;
        transition: opacity 2s, visibility 0s 2s;
      }
  
      & a {
        padding: 6px;
        position: relative;
        display: inline-block;
        justify-content: center;
        align-items: center;
        width: 50px;
        cursor: pointer;
        @media (orientation: landscape) and (max-width: $mobile_max) {
          display: inline-flex;
          vertical-align: middle;
        }
  
        & i {
          display: block;
          background-color: transparent;
          background-repeat: no-repeat;
          background-position: 0 0;
          background-size: 300%;
          margin: 0 auto;
        }
  
        &:hover i {
          background-position: 50% 0;
        }
  
        &:active i {
          background-position: 100% 0;
        }
  
        @each $name, $height in $toolsHeight {
          &.#{$name} i {
            @include btn($name, $height, $height);
          }
        }
  
        &.selected i {
          background-position: 100% 0;
        }
      }
    }
  
    .neural-search {
      &_popup {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
  
      &_suggest {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
  
        padding: 15px 100px;
  
        font: 14px Arial;
        line-height: 20px;
        background-color: #fff;
      }
    }
  
    .tools {
      position: fixed;
      min-width: 50px;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      z-index: 4;
      opacity: 1;
      visibility: visible;
      background-color: rgba(255, 255, 255, .9);
      box-shadow: 1px 4px 10px rgba(0, 0, 0, 0.2);
      overflow: hidden; 
      white-space: nowrap;
      &::before,
      &::after {
        content: '';
        position: absolute;
        left: 0;
        width: 100%;
        height: 20px;
        z-index: 6;
      }
      &::before {
        top: 0;
        background-image: linear-gradient(to bottom, rgba(255, 255, 255, .9), transparent);
      }
      &::after {
        bottom: 0;
        background-image: linear-gradient(to top, rgba(255, 255, 255, .9), transparent);
      }
      &.comparing {
        position: absolute;
        @media (max-height: $tablet_min) {
          top: 70px;
          bottom: 0;
          transform: none;
        }
      }
      @media (max-width: $tablet_max) {
        .tools-container {
          max-height: calc(100vh - 140px);
        }
        width: 40px;
      }
      @media (orientation: portrait) and (max-width: $mobile_max) and (max-height: $mobile_max) {
        bottom: 70px;
        top: 0;
        transform: none;
        max-height: 100%;
      }
      @media (orientation: landscape) and (max-width: $mobile_max) {
        font-size: 0;
        height: 40px;
        left: auto;
        margin: auto;
        right: 0;
        text-align: center;
        top: -1px;
        transform: none;
        width: auto;
        &::before,
        &::after {
          height: 100%;
          width: 20px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, .9), transparent);
        }
        &::before {
          top: 0;
          left: 0;
        }
        &::after {
          top: 0;
          right: 0;
          left: auto;
          background-image: linear-gradient(to left, rgba(255, 255, 255, .9), transparent);
        }
      }
  
      &.hidden:not(:hover) {
        visibility: hidden;
        opacity: 0;
        transition: opacity 2s, visibility 0s 2s;
      }
  
      & a {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        cursor: pointer;
        @media (orientation: landscape) and (max-width: $mobile_max) {
          display: inline-flex;
          vertical-align: middle;
        }
  
        @media (max-width: $tablet_max) {
          width: 40px;
          height: 50px;
        }
        @media (orientation: landscape) and (max-width: $mobile_max) {
          height: 40px;
          width: 50px;
        }
  
        & i {
          display: block;
          background-color: transparent;
          background-repeat: no-repeat;
          background-position: 0 0;
          background-size: 300%;
          margin: 0 auto;
        }
  
        &:hover i {
          background-position: 50% 0;
        }
  
        &:active i {
          background-position: 100% 0;
        }
  
        @each $name, $height in $toolsHeight {
          &.#{$name} i {
            @include btn($name, 20px, $height);
          }
        }
  
        &.selected i {
          background-position: 100% 0;
        }
      }
    }
  
    .slider-wrapper {
      margin: 5px;
    }
  
    .tools-container {
      max-height: calc(100vh - 150px);
      overflow-y: auto;
      overflow-x: hidden;
      text-align: right;
      text-align: -webkit-right;
      @media (orientation: landscape) and (max-width: $mobile_max) {
        max-width: calc(100vw - 70px);
        overflow-x: auto;
        overflow-y: hidden;
      }
    }
  
    .svg-overlay {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      pointer-events: none;
      overflow: hidden;
    }
  
    .microscop-scale {
      display: none;
      position: absolute;
      margin: auto;
      right: 0;
      left: 0;
      text-align: center;
      color: #fff;
      border: 1px solid #fff;
      border-top: none;
      pointer-events: none;
      z-index: 3;
      bottom: calc(10% - 40px);
      width: 50%;
  
      &.on {
        display: block;
        background-color: rgba(27, 33, 43, .25);
      }
    }
  
    @media (max-width: 500px) and (orientation: portrait) {
      .tools.comparing {
        a {
          display: inline-flex;
          vertical-align: middle;
        }
      }
    }
  
    .hide-scalebar {
      display: none !important;
    }
  
    .current-zoom {
      position: absolute;
      left: 20px;
      cursor: default;
      color: white;
      font-size: 24px;
      z-index: 9999;
      padding: 5px;
      background-color: #bfbfbf;
      opacity: 0.6;
      border: solid 1px #848484;
    }
  
    .fade-enter-active, .fade-leave-active {
      transition: opacity .3s;
    }
  
    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */
    {
      opacity: 0;
    }
  </style>
  
  
  
  // WEBPACK FOOTER //
  // Snapshot.vue?d0344af4