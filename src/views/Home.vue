<template>
  <div class="home">
    <!-- <img src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <ConicSection></ConicSection>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import ConicSection from '@/components/ConicSection.vue';

export default Vue.extend({
  name: "home",
  components: {
    HelloWorld,
    ConicSection
  }
});
</script>
