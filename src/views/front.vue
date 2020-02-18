<template>
  <div class="w-full flex-col justify-around mt-2">
    <div id="contact" class="w-full mt-8 flex-col">
      <div id="variables" class="text-left w-1/2 px-24 text-lg">
        <p>Variablen zu Berechnen:</p>
        <div class="slider flex justify-between mt-4">
          <input type="range" min="0" max="20" step="1">
          <p class="label">{{input.variables}}</p>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        input: {
          variables: 3
        }
      }
    }

  }
</script>