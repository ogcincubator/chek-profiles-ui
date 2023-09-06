<template>
  <q-page>
    <div class="row q-my-sm justify-center">
      <div class="col" style="max-width: 1000px">
        <profile-editor></profile-editor>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import ProfileEditor from "components/ProfileEditor.vue";

export default defineComponent({
  name: 'IndexPage',
  components: {ProfileEditor},
});
</script>
