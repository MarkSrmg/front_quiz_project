<template>
  <div>
    <div class="p-3 mb-2 bg-secondary text-white bg-opacity-25">
      {{ questionResponse.questionText }}
    </div>
    <div v-if="questionResponse.questionPicture != null">
      <img :src=questionResponse.questionPicture class="img-thumbnail" alt="...">
    </div>
  </div>
</template>
<script>
export default {
  name: 'PlayQuestion',
  props: {
    questionResponse: {}
  }
}
</script>