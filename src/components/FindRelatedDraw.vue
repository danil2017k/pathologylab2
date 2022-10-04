<template>
  <div></div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
export default {
  name: 'FindRelatedDraw',
  data () {
    return {
      isActive: false,
      area: null,
      workInProgress: false
    }
  },
  props: {
    viewer: {
      default: null
    }
  },
  mounted () {
    this.$bus.$on('openFindRelatedDrawTool', this.openDrawTool)
  },
  beforeDestroy () {
    this.$bus.$off('openFindRelatedDrawTool', this.openDrawTool)
  },
  methods: {
    ...mapActions(['sendImageSimilarToDs', 'getImageSimilarFromDs']),
    openDrawTool () {
      this.isActive = !this.isActive
      if (this.isActive) {
        let onMouseDrag = event => {
          if (this.area.rect === null) {
            return
          }
          let delta = event.delta
          delta.x = delta.x * -1
          delta.y = delta.y * -1
          this.viewer.viewport.panBy(
            this.viewer.viewport.deltaPointsFromPixels(delta)
          )
        }

        this.area = this.viewer.selection({
          onSelection: rect => {
            this.area.canResize = false
            this.area.canDrag = false

            if (this.area.rect === null) {
              return
            }

            if (this.workInProgress) {
              return
            }

            this.workInProgress = true
            this.area.progress(true)

            this.tileWidth = rect.width
            this.tileHeight = rect.height

            let multiple = 512
            rect.width +=
              rect.width % multiple ? multiple - (rect.width % multiple) : 0
            rect.height +=
              rect.height % multiple ? multiple - (rect.height % multiple) : 0

            let viewportRect = this.viewer.viewport.imageToViewportRectangle(
              rect.x,
              rect.y,
              rect.width,
              rect.height
            )
            this.viewer.viewport.fitBounds(viewportRect, true)

            let getResult = () => {
              const image = this.viewer.drawer.canvas
              let bounds = this.viewer.viewport.getBounds(true)

              let rectDrawer = this.viewer.drawer.viewportToDrawerRectangle(
                viewportRect
              )
              let boundsDrawer = this.viewer.drawer.viewportToDrawerRectangle(
                bounds
              )

              const canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d')
              canvas.width = rectDrawer.width
              canvas.height = rectDrawer.height
              ctx.drawImage(
                image,
                rectDrawer.x - boundsDrawer.x,
                rectDrawer.y - boundsDrawer.y,
                rectDrawer.width,
                rectDrawer.height,
                0,
                0,
                rectDrawer.width,
                rectDrawer.height
              )

              const finishCanvas = document.createElement('canvas'),
                fCtx = finishCanvas.getContext('2d')
              finishCanvas.width = rect.width
              finishCanvas.height = rect.height

              let imageAspectRatio = canvas.width / canvas.height
              let canvasAspectRatio = finishCanvas.width / finishCanvas.height
              let renderableHeight, renderableWidth, xStart, yStart

              if (imageAspectRatio < canvasAspectRatio) {
                renderableHeight = finishCanvas.height
                renderableWidth =
                  canvas.width * (renderableHeight / canvas.height)
                xStart = (finishCanvas.width - renderableWidth) / 2
                yStart = 0
              } else if (imageAspectRatio > canvasAspectRatio) {
                renderableWidth = finishCanvas.width
                renderableHeight =
                  canvas.height * (renderableWidth / canvas.width)
                xStart = 0
                yStart = (finishCanvas.height - renderableHeight) / 2
              } else {
                renderableHeight = finishCanvas.height
                renderableWidth = finishCanvas.width
                xStart = 0
                yStart = 0
              }
              fCtx.drawImage(
                canvas,
                xStart,
                yStart,
                renderableWidth,
                renderableHeight
              )

              this.sendImageSimilarToDs({
                content: finishCanvas.toDataURL()
              }).then(data => {
                if (!data.data) {
                  this.openDrawTool()
                  alert(this.$t('case.viewer.error_cell'))
                  return
                }
                this.getImageSimilarFromDs(data.data.id)
                  .then(data => {
                    this.workInProgress = false
                    this.openDrawTool()
                    this.$emit('findRelatedPannel')
                  })
                  .catch(err => {
                    this.workInProgress = false
                    this.openDrawTool()
                    alert(this.$t('case.viewer.error_cell'))
                  })
              }).catch(() => {
                this.workInProgress = false
              })
            }

            this.canGetResult = true
            this.timerGetResult = null
            let tilesFullLoaded = () => {
              this.canGetResult = false
              clearTimeout(this.timerGetResult)
              this.timerGetResult = setTimeout(() => {
                this.canGetResult = true
                this.viewer.viewport.fitBounds(viewportRect, true)
                setTimeout(() => {
                  getResult()
                }, 200)
                this.viewer.removeHandler('tile-loaded', tilesFullLoaded)
              }, 500)
            }
            this.viewer.addHandler('tile-loaded', tilesFullLoaded)
            setTimeout(() => {
              if (!this.canGetResult) {
                return
              }
              this.viewer.removeHandler('tile-loaded', tilesFullLoaded)
              getResult()
            }, 500)
          },
          onMouseDrag: e => {
            onMouseDrag(e)
          },
          onCancel: () => {
            this.openDrawTool()
          },
          showSelectionControl: false,
          showConfirmDenyButtons: false,
          allowRotation: false,
          hideAtConfirm: false,
          maxSize: 2048
        })
        this.area.enable()
      } else {
        this.area.canResize = true
        this.area.canDrag = true
        this.area.disable()
        this.area = null
        this.$bus.$emit('clearStateDrawTool')
        this.workInProgress = false
        if (window.dsLoop) {
          clearTimeout(window.dsLoop)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>



// WEBPACK FOOTER //
// FindRelatedDraw.vue?7a089685