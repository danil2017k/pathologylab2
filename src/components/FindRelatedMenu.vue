<template>
  <div class="tools-top" :class="{ 'hidden' : !showContainer }">
    <div class="tools-container">
      <a
        class="pen"
        @click="findRelatedDraw()"
        :class="{'selected': cellTool === 'create'}"
        :title="$t('case.findRelated.createArea')"
      >
        <i></i>
      </a>
      <a
        class="list_menu"
        @click="findRelatedPannel()"
        :class="{'selected': cellTool === 'show'}"
        :title="$t('case.findRelated.showPannel')"
      >
        <i></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FindRelatedMenu',
  data () {
    return {
      cellTool: null
    }
  },
  props: {
    showContainer: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.$bus.$on('clearStateDrawTool', this.clearState)
  },
  beforeDestroy () {
    this.$bus.$off('clearStateDrawTool', this.clearState)
  },
  methods: {
    clearState () {
      this.cellTool = null
    },
    findRelatedDraw () {
      if (this.cellTool === 'create') {
        this.clearState()
        this.$emit('findRelatedDraw')
        return
      }
      this.cellTool = 'create'
      this.$emit('findRelatedDraw')
    },
    findRelatedPannel () {
      this.cellTool = 'show'
      this.$emit('findRelatedPannel')
    }
  }
}
</script>

<style lang="scss" scoped>
// @import "src/globals.scss";

$toolsHeight: (
  "list_menu": 20px,
  "close_button": 20px,
  "pen": 20px
);
// @mixin btn($name, $width, $height) {
//   background-image: url(/static/icons/#{$name}.svg);
//   width: $width;
//   height: $height;

//   @media (max-width: $tablet_max) {
//     width: $width * 0.75;
//     height: $height * 0.75;
//   }
// }
.tools-top {
  position: fixed;
  min-width: 50px;
  right: 50%;
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
    @media (max-height: 640px) {
      top: 70px;
      bottom: 0;
      transform: none;
    }
  }
  @media (orientation: portrait) and (max-width: 640px) and (max-height: 640px) {
    bottom: 70px;
    top: 0;
    transform: none;
    max-height: 100%;
  }
  @media (orientation: landscape) and (max-width: 640px) {
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
    @media (orientation: landscape) and (max-width: 640px) {
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

    // @each $name, $height in $toolsHeight {
    //   &.#{$name} i {
    //     @include btn($name, $height, $height);
    //   }
    // }

    &.selected i {
      background-position: 100% 0;
    }
  }
}
</style>



// WEBPACK FOOTER //
// FindRelatedMenu.vue?9eaded96