<template>

  <div class="hello">
    <div class="hello__text--red">abc</div>
    <div class="hello__text--yellow">abc</div>
    <div class="hello__text--orange">abc</div>
    <div>{{fullName}}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// import Product from "@/models/product";

function onClick() {
  console.log("click");
}

export default Vue.extend({
  name: "",

  watch: {
    fullName: {
      handler: function(value: string, oldValue: string): void {
        console.log(oldValue);
        console.log(value);
      },
      deep: false,
      immediate: false
    }
  },

  data() {
    return {
      firstName: "Công",
      lastName: "Nguyễn Đức"
    }
  },

  // computed: {
  //   fullName(): string {
  //     return ${this.firstName} ${this.lastName};
  //   }
  // },

  // created() {
  //   window.addEventListener("click", onClick);
  //   const product: Product = {
  //     id: "1",
  //     name: "abc"
  //   };

  //   console.log(product);
    
  // },

  // beforeDestroy() {
  //   window.removeEventListener("click", onClick);
  // }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$color-map: (
  "red": red,
  "yellow": yellow,
  "orange": orange,
);

@each $name, $value in $color-map {
  .hello__text {
    &--#{$name} {
      color: $value;
    }
  }
}
</style>
