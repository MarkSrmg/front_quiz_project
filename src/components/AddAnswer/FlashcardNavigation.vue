<template>
  <div>
    <div class="col-11">
      <hr class="solid">
    </div>
    <div class="mb-3">
      <p class="text-primary">FlashcardAnswerText</p>
      <button type="button" class="btn btn-dark">Edit answer</button>
    </div>
    <div class="mb-3">
      <button type="button" class="btn btn-dark">Previous question</button>
    </div>
    <div class="mb-3">
      <button type="button" class="btn btn-dark">Next question</button>
    </div>
    <div class="mb-3">
      <button type="button" class="btn btn-dark">Finish quiz</button>
    </div>
    <div class="mb-3">
      <button type="button" class="btn btn-dark">Delete quiz</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FlashcardNavigation'
}
</script>