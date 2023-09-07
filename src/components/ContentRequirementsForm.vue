<template>
  <div>
    <q-form @submit.prevent="submit">
      <q-input
        label="Label"
        v-model="label"
        class="required"
      />
      <q-select
        v-model="cityModule"
        label="Module"
        :options="cityModules"
        clearable
        class="required"
      />
      <q-select
        v-if="cityModule?.classes"
        v-model="cityClasses"
        label="Classes"
        :options="cityModule.classes"
        multiple
        clearable
        class="required"
      >
        <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
          <q-item v-bind="itemProps">
            <q-item-section>
              <q-checkbox :model-value="selected" @update:model-value="toggleOption(opt)" :label="opt.label" />
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-select
        v-if="availableSemantics?.length"
        v-model="semantics"
        label="Semantics / surfaces"
        :options="availableSemantics"
        multiple
        clearable
      >
        <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
          <q-item v-bind="itemProps">
            <q-item-section>
              <q-checkbox :model-value="selected" @update:model-value="toggleOption(opt)" :label="opt.label" />
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-select
        v-model="allowedGeometries"
        label="Allowed geometries"
        :options="geometries"
        multiple
        clearable
        class="required"
      >
        <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
          <q-item v-bind="itemProps">
            <q-item-section>
              <q-checkbox :model-value="selected" @update:model-value="toggleOption(opt)" :label="opt.label" />
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-6">
          <q-select
            v-model="lod"
            label="Minimum LoD"
            :options="lods"
            clearable
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            v-model="accuracyM"
            label="Accuracy (m)"
          />
        </div>
      </div>


      <div class="text-right q-mt-lg">
        <q-btn type="submit" label="Add" color="primary"/>
      </div>
    </q-form>
  </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import {cityModules, lods, ContentRequirements, geometries, URIResource, CityModule, CityClass} from "./models";

export default defineComponent({
  emits: [
    'add',
  ],
  data() {
    return {
      label: '',
      cityModule: <CityModule | null>null,
      cityClasses: <CityClass[]>[],
      semantics: <URIResource[]>[],
      allowedGeometries: <URIResource[]>[],
      lod: <string | null>null,
      accuracyM: <number | null>null,
      notes: <string | null>null,
      cityModules,
      lods,
      geometries,
    };
  },
  watch: {
    cityModule() {
      this.cityClasses = [];
    },
  },
  methods: {
    submit() {
      if (this.cityModule === null) {
        return;
      }
      const contentRequirements: ContentRequirements = {
        label: this.label,
        module: this.cityModule,
        cityClasses: this.cityClasses || [],
        allowedGeometries: this.allowedGeometries || [],
        lod: this.lod,
        notes: this.notes,
        accuracyM: this.accuracyM,
        semantics: this.semantics,
      };
      this.$emit('add', contentRequirements);
    }
  },
  computed: {
    availableSemantics() {
      if (!this.cityModule) {
        return null;
      }
      const added = new Set<string>();
      const semantics: URIResource[] = [];
      if (this.cityModule.semantics) {
        for (let s of this.cityModule.semantics) {
          if (!added.has(s.uri)) {
            semantics.push(s);
            added.add(s.uri);
          }
        }
      }
      if (this.cityClasses) {
        for (let cls of this.cityClasses) {
          if (cls.semantics?.length) {
            for (let s of cls.semantics) {
              if (!added.has(s.uri)) {
                semantics.push(s);
                added.add(s.uri);
              }
            }
          }
        }
      }
      return semantics;
    },
  },
});
</script>
