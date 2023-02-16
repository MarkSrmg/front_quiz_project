<template>
  <div v-if="message != ''" class="col-3">
    <div v-if="errorCode == '404'">
      <AlertSuccess :message="message"/>
    </div>
    <div v-if="errorCode == '400'">
      <AlertDanger :message="message"/>
    </div>
    <div>
      <button v-on:click="menu" type="button" class="btn btn-dark">Back</button>
    </div>

  </div>
</template>
<script>
import AlertSuccess from "@/components/alert/AlertSuccess.vue"
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  name: 'PlayError',
  components: {AlertDanger, AlertSuccess},
  props: {
    menu: {},
    message: {},
    errorCode: {}
  }
}
</script>