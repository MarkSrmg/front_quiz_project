<template>
  <div>
    <input type="file" v-on:change="handleImage" accept="image/x-png,image/jpeg">
    <div v-if="pictureDataBase64 != String" >
      <img :src=pictureDataBase64 class="img-thumbnail" alt="...">
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageInput',
  props: {
    pictureDataBase64Prop: String
  },
  data: function () {
    return {
      pictureDataBase64: this.pictureDataBase64Prop
    }
  },
  methods: {
    handleImage: function (event) {
      const selectedImage = event.target.files[0];
      this.emitBase64(selectedImage);
    },

    emitBase64: function (fileObject) {
      const reader = new FileReader();
      reader.onload = () => {
        this.pictureDataBase64 = reader.result;
        this.$emit('emitBase64Event', this.pictureDataBase64)
      };
      reader.onerror = function (error) {
        alert(error);
      }
      reader.readAsDataURL(fileObject);
    }
  },
  beforeMount() {
    console.log("olen siin 1")
    if (this.pictureDataBase64 !== String) {
      console.log("olen siin 2");
    }
    console.log("olen siin 3");

  }
}
</script>