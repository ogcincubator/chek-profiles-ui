<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <img src="img/chek-logo-white.png" alt="CHEK" class="toolbar-logo"/>
          Profile editor
        </q-toolbar-title>

        <div>v0.0.1</div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
  },

  data() {
    return {
    }
  },

  methods: {
  }
});
</script>

<style>
.toolbar-logo {
  max-height: 26px;
  vertical-align: middle;
  margin-right: 0.3em;
}
</style>
