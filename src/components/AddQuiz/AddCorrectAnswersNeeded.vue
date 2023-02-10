<template>
  <div class="input-group mb-3">
    <span class="input-group-text">Number to advance</span>
    <input v-model="requiredCount" type="number" min="1" class="form-control" placeholder="1">
  </div>
</template>
<script>
export default {
  name: 'AddCorrectAnswersNeeded',
  data: function (){
    return{
      requiredCount: 1
    }
  },
  methods:{
    emitRequiredCount: function () {
      this.$emit('emitRequiredCountEvent', this.requiredCount)
    }
  }
}
</script>