node -v = 14.10.0
npm i

.env 

где написано 
VIEWER=-
npm run build

cd ~/projects/viewerlab
npm link  # Step 1.
cd ~/projects/my-app
npm link some-dep  # Step 2


в files.json по пути files[0].files[0].name путь к dzi 

ну и как обычно 

<template>
  <div>
  <Viewer :file="твои данные из json">
  </div>
</template>

<script>
    import Viewer from 'viewerlab'
export default {
  name: 'PreseSoreEnsky',
  components: {Viewer},
  props: {},
  data() {
    return {}
  },
  mounted() {},
  beforeDestroy() {},
  methods: {}
}
</script>

<style lang="css" scoped></style>










