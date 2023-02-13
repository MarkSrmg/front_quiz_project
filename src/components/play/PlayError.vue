<template>
  <div v-if="message != ''" class="col-3">
    <div>
      <AlertSuccess :message="message"/>
    </div>
    <div>
      <button v-on:click="menu" type="button" class="btn btn-dark">Back</button>
    </div>

  </div>
</template>
<script>
import AlertSuccess from "@/components/alert/AlertSuccess.vue"

export default {
  name: 'PlayError',
  components: {AlertSuccess},
  props: {
    menu: {},
    message: {}
  }
}
</script>