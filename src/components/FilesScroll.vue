<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template lang="html">
  <div class="files" @mousedown="startDrag" @touchstart="startDrag">
    <div class="files-container" :class="{'animating': !dragging}" ref="container">

      <div class="row">
    <div class="col-md-4 col-lg4" v-for="(data,index) in images" :key="index">
        <!-- <img :src="data.image" class="img-fluid"> -->
        <h3 @click="setTilledImage(data.name)">{{data.name}}</h3>

        <router-link :to="{ name: 'viewer', params: { name: data.name }}">LINK</router-link>
    </div>
</div>
      <!-- <div class="file snapshot-file" draggable="false"
          :class="{'selected': selected === id}"
          v-for="id in images[id]"
          v-if="isShowed(id)"
          @mouseup="finishDrag($event, id)" @touchend="finishDrag($event, id)">
        <img class="inscribe-bottom" draggable="false" @mousedown.prevent @dragstart.prevent :src="previewPath(id)" :alt="images[id].name"> -->
        <!-- <p class="filename">{{ truncate(images[id].name, 15) }}</p> -->
        <!-- <p class="filedate">{{ dateFormat(images[id].creation_date) }}</p> -->
        <!-- <button @click="setTilledImage(images[id].name)" /> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'

export default {
  name: 'FilesScroll',
  props: {
    selectedImage: String,
    images: Array,
    selected: String,
    primary: Boolean,
    isWebinar: Boolean,
    ableToAct: Boolean
  },
  data () {
    return {
      
      start: 0,
      dragging: false,
      transform: 0,
      contentWidth: 0,
      contentLength: 0
    }
  },
  computed: {
    ...mapGetters(['comparing', 'order']) // comparing for force update
  },
  methods: {
    setTilledImage(name) {
      // this.selectedImage = name
        this.$router.push({name:'viewer',params:{name:name}})

    },
    previewPath (id) {
      const file = this.files[id]
      return file.type === 'snapshot' || file.type === 'image'
        ? `/files/${file.name}_preview.jpeg`
        : file.type === 'dicom'
          ? '/static/img/dicom-logo.jpg'
          : `/static/img/${file.type}.svg`
    },
    truncate (str, len) {
      if (str.length > len) {
        return str.substr(0, len).concat('...')
      }
      return str
    },
    dateFormat (date) {
      return moment.unix(date).format('D MMM YYYY')
    },
    startDrag (e) {
      if (this.ableToAct) {
        this.start = e.clientX || e.touches[0].clientX
        this.dragging = true
        // Добавляем прослушивание на документ на случай, если пользователь выйдет за пределы контейнера
        document.addEventListener('mousemove', this.dragMove)
        document.addEventListener('touchmove', this.dragMove)
        document.addEventListener('mouseup', this.finishDrag)
        document.addEventListener('touchend', this.finishDrag)
      }
    },
    finishDrag (e, id) {
      // Немного вычислительной магии. Условие на dragging на случай, если мы в режиме сравнения
      if (this.dragging) {
        let x = e.clientX || e.changedTouches[0].clientX
        let dx = x - this.start // Смещение
        // Обрабатываем не драг, а клик
        if (id && dx === 0) {
          this.handleClick(id)
        } else {
          // Обрабатываем драг
          if (this.$el.clientWidth > this.contentWidth) { // Смотрим, если ширина контейнера больше ширины контента, то двигать смысла нет
            this.transform = 0
          } else {
            let possibleTransform = this.transform + x - this.start // Значение трансформа, которое применилось бы, если бы мы не проверяли условия
            let overflowWidth = Math.abs(this.$el.clientWidth - this.contentWidth) / 2 // На сколько контент шире контейнера с каждой стороны
            if (dx > 0 && Math.abs(possibleTransform) > overflowWidth) { // Если движение мышки вправо и будущий трансформ больше оверфлоу, то сдвигаем все к левому краю
              this.transform = overflowWidth
            } else if (dx < 0 && Math.abs(possibleTransform) > overflowWidth) { // Если движение мышки влево и будущий трансформ больше оверфлоу, то сдвигаем все к правому краю
              this.transform = -1 * overflowWidth
            } else {
              this.transform = possibleTransform // Трансформ меньше превышения ширины, значит все ок
            }
          }
          this.dragging = false
          if (this.$refs.container) {
            this.$refs.container.style.transform = `translateX(${this.transform}px)`
          }
          document.removeEventListener('mousemove', this.dragMove)
          document.removeEventListener('touchmove', this.dragMove)
          document.removeEventListener('mouseup', this.finishDrag)
          document.removeEventListener('touchend', this.finishDrag)
        }
      }
    },
    dragMove (e) {
      if (this.dragging) {
        let x = e.clientX || e.touches[0].clientX
        let dx = this.transform + x - this.start
        this.$refs.container.style.transform = `translateX(${dx}px)`
      }
    },
    handleClick (id) {
      if (this.contentWidth > this.$el.clientWidth) {
        const filePosition = this.order.indexOf(id) + 1
        const nullPoint = this.contentWidth / 2 - this.transform // Нулевая точка this.transform
        const leftViewportEdge = nullPoint - this.$el.clientWidth / 2
        const rightViewportEdge = nullPoint + this.$el.clientWidth / 2
        const leftFileEdge = filePosition * 129 - 129
        const rightFileEdge = filePosition * 129
        if ((leftFileEdge < leftViewportEdge) || (rightFileEdge > rightViewportEdge)) {
          if (leftFileEdge < leftViewportEdge) {
            this.transform += (leftViewportEdge - leftFileEdge)
          }
          if (rightFileEdge > rightViewportEdge) {
            this.transform -= (rightFileEdge - rightViewportEdge)
          }
          this.dragging = false
          this.$refs.container.style.transform = `translateX(${this.transform}px)`
        }
      }
      this.$emit('selectViewerFile', { id, primary: this.primary, isWebinar: this.isWebinar })
    },
    isShowed (id) {
      const type = this.images[id]
      return type
    },
    ...mapActions(['selectViewerFile'])
  },
  watch: {
    comparing () {
      if (this.selected) {
        this.handleClick(this.selected)
      }
    }
  },
  mounted () {
    let fileItemWidth = 125 + 4
    this.contentLength = this.$refs.container.children.length
    this.contentWidth = this.contentLength * fileItemWidth
  }
}
</script>

<style lang="scss" scoped>

.files {
  display: inline-flex;
  justify-content: center;
  overflow: hidden;
  padding-top: 10px;
  height: 134px;
  position: absolute;
  bottom: 100%;
  width: 100%;
  background-color: #1b212b;
  box-sizing: content-box;

  * {
    user-select: none;
  }
}

.files-container {
  display: inline-flex;
  justify-content: center;
  flex-wrap: nowrap;

  &.animating {
    transition: all .5s;
  }
}

.file {
  display: inline-block;
  float: left;
  min-width: 125px;
  width: 125px;
  // min-height: 120px;
  padding-bottom: 5px;
  background-color: #fff;
  border-radius: 5px;
  margin: 2px;
  overflow: hidden;
  cursor: pointer;

  &.selected {
    box-shadow: 0 0 0 2px blue;
  }

  & img {
    pointer-events: none;
    width: 125px;
  }

  & p,
  & img {
    user-select: none;
  }

  & .filename,
  & .filedate {
    // @include fontCaption;
    margin: 2px;
    text-align: center;
  }

  & .filedate {
    color: gray;
  }
}
</style>