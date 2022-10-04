<template>
    <div>
    <v-dialog
        v-model="showRelatedModal"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      >
        <v-card tile >
          <v-toolbar card dark color="primary">
            <v-btn icon dark @click="findRelatedChangeModalVisible(false)">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>{{$t('case.findRelated.title')}}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text style="text-align: center;" v-if="related.items.length > 0">
            <v-layout row wrap>
              <v-card style="width:200px; margin: 10px;">
                  <img
                    class="white--text"
                    height="200px"
                    :src="`${similarImage}`"
                  />
                  <v-card-title>
                    <div>
                      <div style="padding:0; margin:0; font-weight:bold; font-size:14pt;">
                        {{$t('case.findRelated.targetImage')}}
                      </div>
                    </div>
                  </v-card-title>
                </v-card>
                <v-card style="width:200px; margin: 10px;" tile v-for="item in related.items" :key="item.file_id">
                  <v-img
                    class="white--text"
                    height="200px"
                    :src="`https://app.dpathology.ru/tiles/${item.tile_position}`"
                  >
                  </v-img>
                  <v-card-title>
                    <div>
                      <div style="padding:0; margin:0; font-weight:bold; font-size:12pt;">
                        {{$t('case.findRelated.caseTitle')}}: <a :href="`/cases/${item.case_id}`" target="blank">{{item.case_title}}</a>
                        {{$t('case.findRelated.fileTitle')}}: <a :href="`/cases/${item.case_id}?slideID=${item.file_id}&level=${getTileData(item.tile_position, 'level')}&x=${getTileData(item.tile_position, 'x')}&y=${getTileData(item.tile_position, 'y')}`" target="blank">{{item.file_title}}</a>
                      </div>
                      <span>{{item.diagnosis}}</span>
                    </div>
                  </v-card-title>
                </v-card>
             
            </v-layout>
            <v-pagination :length="related.pages"
                          :value="related.currentPage"
                          @input="handleChangePage"
                          style="margin: 0 auto;"></v-pagination>
          </v-card-text>
          <v-card-text  style="text-align: center;" v-else>
            <h1>{{$t('case.findRelated.noData')}}</h1>
          </v-card-text>
          <div style="flex: 1 1 auto;"></div>
        </v-card>
      </v-dialog>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    export default {
      name: 'FindRelatedModal',
      data () {
        return {
          allItems: [],
          related: {
            items: [],
            pages: 1,
            currentPage: 1,
            pageSize: 12
          }
        }
      },
      computed: {
        ...mapState({
          showRelatedModal: 'showRelatedModal',
          similarSlides: 'similarSlides',
          similarImage: 'similarImage'
        })
      },
      watch: {
        similarSlides (newValue, oldValue) {
          this.related.pages = Math.ceil(newValue.length / this.related.pageSize)
          this.allItems = newValue
          this.handleChangePage(1)
        }
      },
      methods: {
        ...mapActions({
          findRelatedChangeModalVisible: 'findRelatedChangeModalVisible'
        }),
        handleChangePage (page) {
          this.related.currentPage = page
          this.related.items = this.allItems.slice((page - 1) * this.related.pageSize, page * this.related.pageSize)
        },
        getTileData (data, type) {
              // example: 0c4fd42a/3f0e/4491/a080/f69e25df43ed.svs_files/16/53_46.jpeg
          let str = data.split('/')
          let level = str[str.length - 2]
          let xy = (str[str.length - 1].split('.')[0]).split('_')
          let x = xy[0]
          let y = xy[1]

          switch (type) {
            case 'level':
              return level
            case 'x':
              return x
            case 'y':
              return y
          }
        }
      }
    }
</script>
<style>
  .v-dialog__content{
    z-index: 9999!important;
  }
</style>
<style lang="scss" scoped>

</style>



// WEBPACK FOOTER //
// FindRelatedModal.vue?78613422