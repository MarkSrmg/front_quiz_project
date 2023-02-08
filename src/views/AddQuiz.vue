<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-2">
        <div class="input-group mb-3">
          <!--    <span class="input-group-text" id="basic-addon1">@</span>-->
          <input type="text" class="form-control" placeholder="Quiz name" aria-label="Username"
                 aria-describedby="basic-addon1">
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
          <label class="form-check-label" for="flexRadioDefault1">
            <h5>Create new flashcards</h5>
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
          <label class="form-check-label" for="flexRadioDefault1">
            <h5>Create new quiz</h5>
          </label>
        </div>
        <div  class="input-group mb-3">
          <span class="input-group-text">Correct answers needed</span>
          <input type="number" min="0" class="form-control" placeholder="0">
        </div>
        <div>
          <button type="button" class="btn btn-dark">Create</button>
        </div>
      </div>
    </div>

  </div>


</template>

<script>
export default {
  name: "AddQuiz"
}
</script>

