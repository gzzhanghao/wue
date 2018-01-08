<template>
  <div>
    <input v-for="a, b in c" v-if="d" @tap.prevent="eventHandler" type="text" />
    <div>hehe</div>
    heheehehe{{asdf}}
    <!-- cmt -->
  </div>
</template>

<script>
  import Loading from './Loading.vue'

  export default {

    components: { Loading },
  }
</script>
