<template>
  <div class="q-pa-md">
    <q-card>
      <q-tabs
        v-model="tab"
      >
        <q-tab name="metadata" label="Metadata"/>
        <q-tab name="dataset" label="Dataset requirements"/>
        <q-tab name="content" label="Content requirements"/>
      </q-tabs>

      <q-separator/>

      <q-tab-panels v-model="tab">
        <q-tab-panel name="metadata">
          <q-input
            v-model="datasetRequirements.title"
            label="Profile title"
          />
          <q-input
            label="Dataset description"
            v-model="datasetRequirements.description"
            type="textarea"
          />
        </q-tab-panel>

        <q-tab-panel name="dataset">
          <q-select
            label="Required data model"
            v-model="datasetRequirements.dataModel"
            :options="cityModels"
          />
          <q-input
            label="Additional notes"
            v-model="datasetRequirements.description"
            type="textarea"
          />
        </q-tab-panel>

        <q-tab-panel name="content">
          <q-table>

          </q-table>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import {CityModels, DatasetRequirements} from "components/models";

export default defineComponent({
  data() {
    const datasetRequirements: DatasetRequirements = {
      title: "New dataset",
      accessRights: new Set(),
      content: [],
      dataModel: null,
    };
    const cityModels = [{label: 'None', uri: null}, ...CityModels];
    return {
      tab: 'metadata',
      datasetRequirements,
      cityModels,
    };
  }
})
</script>
