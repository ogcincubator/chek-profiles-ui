<template>
  <div class="q-pa-md">
    <q-form @reset="resetForm">
      <q-card>
        <q-tabs
          v-model="tab"
        >
          <q-tab name="metadata" label="Profile"/>
          <q-tab name="dataset" label="Dataset requirements"/>
          <q-tab name="content" label="Content requirements"/>
        </q-tabs>

        <q-separator/>

        <q-tab-panels v-model="tab">
          <q-tab-panel name="metadata">
            <q-input
              class="required"
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
              label="Required origin data model"
              v-model="datasetRequirements.dataModel"
              :options="cityModels"
              clearable
            />

            <q-card
              class="q-my-sm"
              flat
              bordered
            >
              <q-card-section>
                <div class="text-subtitle1">Spatial coverage</div>
                <div class="row q-col-gutter-sm">
                  <div class="col-md-6">
                    <div class="row items-center q-gutter-sm spatial-coverage-point">
                      <div class="col-12 col-md-auto">
                        Min:
                      </div>
                      <div class="col-12">
                        <q-input v-model.number="spatialCoverageCoords[0]" type="number" dense/>
                      </div>
                      <div class="col-12">
                        <q-input v-model.number="spatialCoverageCoords[1]" type="number" dense/>
                      </div>
                      <div class="col-12">
                        <q-input v-model.number="spatialCoverageCoords[2]" vtype="number" dense/>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row items-center q-gutter-sm spatial-coverage-point">
                      <div class="col-12 col-md-auto">
                        Max:
                      </div>
                      <div class="col-12">
                        <q-input v-model.number="spatialCoverageCoords[3]" type="number" dense/>
                      </div>
                      <div class="col-12">
                        <q-input v-model.number="spatialCoverageCoords[4]" type="number" dense/>
                      </div>
                      <div class="col-12">
                        <q-input v-model.number="spatialCoverageCoords[5]" type="number" dense/>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>

            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-4">
                <q-input
                  label="Temporal coverage"
                  hint="Maximum age for the dataset, in days"
                  v-model="datasetRequirements.maxAgeDays"
                  type="number"
                />
              </div>
              <div class="col-12 col-md-4 q-mt-sm">
                <div class="text-subtitle1">Access rights</div>
                <div>Exclude datasets with licenses that require...</div>
                <q-option-group
                  v-model="datasetRequirements.accessRights"
                  :options="licenseRequirementOptions"
                  color="green"
                  type="checkbox"
                />
              </div>
              <div class="col-12 col-md-4">
                <q-select
                  label="Coordinate reference system"
                  :options="crsOptions"
                  v-model="datasetRequirements.crs"
                  map-options
                  emit-value
                  clearable
                />
              </div>
            </div>


            <q-input
              label="Additional notes"
              v-model="datasetRequirements.description"
              type="textarea"
            />
          </q-tab-panel>

          <q-tab-panel name="content">
            <div class="text-right q-mb-md">
              <q-btn
                icon="add"
                color="positive"
                label="Add requirement"
                @click.prevent="showAddContentRequirements = true"
              />
            </div>
            <q-table
              :rows="datasetRequirements.contentRequirements"
              :columns="contentRequirementsColumns"
              :pagination="contentRequirementsPagination">

              <template #body-cell-module="props">
                <q-td :props="props">
                  {{ props.value.label }}
                </q-td>
              </template>

              <template #body-cell-classes="props">
                <q-td :props="props">
                  <div v-if="props.value?.length">
                    {{ props.value.map(v => v.label).join(', ') }}
                  </div>
                  <div v-if="props.row.semantics?.length">
                    {{ props.row.semantics.map(v => v.label).join(', ') }}
                  </div>
                </q-td>
              </template>

              <template #body-cell-geometries="props">
                <q-td :props="props">
                  <span v-if="props.value?.length">
                    {{ props.value.map(v => v.label).join(', ') }}
                  </span>
                </q-td>
              </template>

              <template #body-cell-actions="props">
                <q-td :props="props">
                  <q-btn flat round icon="delete" size="sm" color="negative"
                         @click="deleteContentRequirements(props.rowIndex)"/>
                </q-td>
              </template>

            </q-table>
          </q-tab-panel>
        </q-tab-panels>
        <q-card-actions align="right">
          <q-btn type="reset">Clear</q-btn>
          <q-btn type="submit" color="primary">Generate profile</q-btn>
        </q-card-actions>
      </q-card>
    </q-form>
    <q-dialog v-model="showAddContentRequirements" no-backdrop-dismiss no-shake>
      <q-card style="width: 800px; max-width: 100%;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Add content requirements</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <content-requirements-form @add="newContentRequirements"></content-requirements-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import {CityModels, ContentRequirements, DatasetRequirements, LicenseRequirement} from "components/models";
import ContentRequirementsForm from "components/ContentRequirementsForm.vue";

export default defineComponent({
  components: {ContentRequirementsForm},
  data() {
    const datasetRequirements: DatasetRequirements = {
      title: '',
      accessRights: [],
      dataModel: null,
      maxAgeDays: null,
      contentRequirements: [],
    };
    return {
      tab: 'metadata',
      datasetRequirements,
      cityModels: CityModels,
      spatialCoverageCoords: Array(6).fill(null),
      licenseRequirementOptions: [
        {label: 'Attribution', value: LicenseRequirement.attribution},
        {label: 'Share-alike', value: LicenseRequirement.shareAlike},
        {label: 'Non-derivative', value: LicenseRequirement.nonDerivative},
        {label: 'Non-commercial', value: LicenseRequirement.nonCommercial},
      ],
      crsOptions: [
        {label: 'WGS 84', value: 'http://www.opengis.net/def/crs/OGC/1.3/CRS84'},
        {label: 'NAD27', value: 'http://www.opengis.net/def/crs/OGC/1.3/CRS27'},
        {label: 'NAD83', value: 'http://www.opengis.net/def/crs/OGC/1.3/CRS83'},
      ],
      contentRequirementsColumns: [
        {name: 'label', label: 'Label', align: 'left', field: 'label'},
        {name: 'module', label: 'Module', align: 'left', field: 'module'},
        {name: 'classes', label: 'Classes / Semantics', align: 'left', field: 'cityClasses'},
        {name: 'geometries', label: 'Geometries', align: 'left', field: 'allowedGeometries'},
        {name: 'lod', label: 'LoD', align: 'center', field: 'lod'},
        {name: 'accuracyM', label: 'Acc. (m)', align: 'center', field: 'accuracyM'},
        {name: 'actions', label: 'Actions', align: 'center', field: ''}
      ],
      showAddContentRequirements: false,
      contentRequirementsPagination: {
        rowsPerPage: 20,
      },
    };
  },
  methods: {
    newContentRequirements(v: ContentRequirements) {
      this.datasetRequirements.contentRequirements.push(v);
      this.showAddContentRequirements = false;
    },
    deleteContentRequirements(idx: number) {
      this.datasetRequirements.contentRequirements.splice(idx, 1);
    },
    resetForm() {
      this.datasetRequirements.contentRequirements = [];
    },
  },
  watch: {
    spatialCoverageCoords: {
      deep: true,
      handler(v: never[]) {
        if (v.every(c => c || c === 0)) {
          if (!this.datasetRequirements.spatialCoverage) {
            this.datasetRequirements.spatialCoverage = [[v[0], v[1], v[2]], [v[3], v[4], v[5]]];
          } else {
            for (let i = 0; i < 2; i++) {
              for (let j = 0; j < 3; j++) {
                this.datasetRequirements.spatialCoverage[i][j] = v[i * 3 + j];
              }
            }
          }
        } else {
          this.datasetRequirements.spatialCoverage = null;
        }
      },
    },
  },
})
</script>

<style lang="scss">
.spatial-coverage-point {
  @media(min-width: 1024px) {
    flex-wrap: nowrap;
  }

  > * {
    flex: 1 1 auto;

    &.col-md-auto {
      flex: 0 0 auto;
    }
  }
}
</style>
