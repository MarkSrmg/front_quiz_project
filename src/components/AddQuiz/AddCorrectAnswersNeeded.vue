<template>
  <div class="input-group mb-3">
    <span class="input-group-text">Correct answers needed</span>
    <input v-model="requiredCount" type="number" min="0" class="form-control" placeholder="0">
  </div>
</template>
<script>
export default {
  name: 'AddCorrectAnswersNeeded',
  data: function (){
    return{
      requiredCount: 0
    }
  },
  methods:{
    emitRequiredCount: function () {
      this.$emit('emitRequiredCountEvent', this.requiredCount)
    }
  }
}
</script>