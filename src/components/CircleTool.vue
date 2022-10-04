<template>
  <div></div>
</template>

<script>
import { mapMutations } from "vuex";
import {
    fabric,
    initFabricJSOverlay,
} from '../../node_modules/@adamjarling/openseadragon-fabricjs-overlay/index';



export default {
  name: 'CircleTool',
  components: {},
  props: {
    object: {
            type: Object,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        fileId: {
            type: String,
            required: true
        },
        $store: {
            type: Object,
            required: true
        },
        viewer: {
            type: Object
        },
  },
  data() {
    return {}
  },
  computed: {
    circleRuler() {
            return this.$store.state.circleRuler.filter(n => n.type === "image");
        },

        width() {
            return (70 * this.$parent.$el.clientWidth) / 100;
        },

        height() {
            return (70 * this.$parent.$el.clientHeight) / 100;
        }
  },
  watch: {
    circleRuler(newVal, oldVal) {
      this.fabricBullshit(newVal.filter(n => !oldVal.includes(n)));
    }
  },
  mounted() {
    this.canvas = new fabric.Canvas(this.$refs.canvas, {
      width: this.width,
      height: this.height,
      selectionColor: "#90ccb7",
      backgroundColor: "#fff"
    });

    // eslint-disable-next-line vue/no-mutating-props
    this.viewer = new fabric.Circle({
  radius: 20, fill: 'green', left: 100, top: 100, opacity: 1
});

    this.fabricBullshit(this.circleRuler);
  },
  beforeDestroy() {},
  methods: {
        ...mapMutations(["ADD_CIRCLE_RULER"]),
    fabricBullshit(circleRuler) {
      circleRuler.forEach(n =>
        fabric.Image.fromURL(n.url, imgObj => {
          imgObj.set(n.attrs);
          this.canvas.add(imgObj);
        })
      );
    },

    onClick() {
      this.ADD_CIRCLE_RULER({
        type: "image",
        url:
          "https://images.unsplash.com/photo-1541783987744-608a02e8a8ae?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=79dac054e815a2dcdeb876b11fcfcc1b&auto=format&fit=crop&w=649&q=80",
        attrs: {
          left: (Math.random() * 50) | 0,
          top: (Math.random() * 50) | 0
        }
      });
    }
  }
}
</script>

<style lang="css" scoped></style>
