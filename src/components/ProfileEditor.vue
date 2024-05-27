<template>
  <div class="q-pa-md">
    <q-form @reset="resetForm" @submit.prevent="saveProfile" ref="form" greedy>
      <q-card>
        <q-tabs
          v-model="tab"
        >
          <q-tab name="metadata" label="Profile"/>
          <q-tab name="dataset" label="Dataset requirements"/>
          <q-tab name="content" label="Content requirements"/>
        </q-tabs>

        <q-separator/>

        <q-tab-panels v-model="tab" keep-alive>
          <q-tab-panel name="metadata">
            <q-input
              class="required"
              v-model="datasetRequirements.id"
              label="Profile identifier (URI)"
              :rules="[rules.required(), rules.isUri()]"
            />
            <q-input
              class="required"
              v-model="datasetRequirements.title"
              label="Profile title"
              :rules="[rules.required(), rules.minLength(3)]"
            />
            <q-input
              label="Profile description"
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
                <div class="row q-col-gutter-lg">
                  <div class="col-md-6">
                    <div class="text-subtitle1">Spatial coverage around point of interest</div>
                    <div class="row q-col-gutter-sm">
                      <div class="col-12">
                        <div class="row items-center q-gutter-sm spatial-coverage-point">
                          <div class="col-12">
                            <q-input v-model.number="spatialCoverageCoords[0]" dense label="X"
                                     input-style="text-align: center"
                                     :rules="[rules.positiveDecimalNumber()]"
                            />
                          </div>
                          <div class="col-12">
                            <q-input v-model.number="spatialCoverageCoords[1]" dense label="Y"
                                     input-style="text-align: center"
                                     :rules="[rules.positiveDecimalNumber()]"
                            />
                          </div>
                          <div class="col-12">
                            <q-input v-model.number="spatialCoverageCoords[2]" dense label="Z"
                                     input-style="text-align: center"
                                     :rules="[rules.positiveDecimalNumber()]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="text-subtitle1">Coordinate reference system</div>
                    <q-select
                      label="Coordinate reference system"
                      :options="crsOptions"
                      v-model="datasetRequirements.crs"
                      map-options
                      emit-value
                      clearable
                      dense
                    />
                  </div>
                </div>
              </q-card-section>
            </q-card>

            <div class="row q-col-gutter-md">
              <div class="col-md-4">
                <div class="text-subtitle1">Temporal coverage</div>
                <q-input
                  label="Maximum age for the dataset (days)"
                  v-model="datasetRequirements.maxAgeDays"
                  type="number"
                  hide-hint
                  dense
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
                    {{ props.value.map((v: any) => v.label).join(', ') }}
                  </div>
                  <div v-if="props.row.semantics?.length">
                    {{ props.row.semantics.map((v: any) => v.label).join(', ') }}
                  </div>
                </q-td>
              </template>

              <template #body-cell-geometries="props">
                <q-td :props="props">
                  <span v-if="props.value?.length">
                    {{ props.value.map((v: any) => v.label).join(', ') }}
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
import {defineComponent} from 'vue';
import {CityModels, ContentRequirements, DatasetRequirements, LicenseRequirement} from 'src/models';
import {toRDF} from 'src/lib/profile';
import ContentRequirementsForm from 'components/ContentRequirementsForm.vue';
import {QForm, QTableColumn} from 'quasar';

export default defineComponent({
  components: {ContentRequirementsForm},
  data() {
    const datasetRequirements: DatasetRequirements = {
      id: '',
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
      spatialCoverageCoords: Array(3).fill(null),
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
      ] as QTableColumn[],
      showAddContentRequirements: false,
      contentRequirementsPagination: {
        rowsPerPage: 20,
      },
      rules: {
        required: (msg?: string) => ((val: string | null) => val === null || !!val.trim().length || msg || 'This value is required'),
        minLength: (l: number, msg?: string) => ((val: string | null) => val === null || val.trim().length >= l || msg || `At least ${l} characters are required`),
        isUri: (msg?: string) => ((val: string | null) => val === null || val.includes(':') || msg || 'A valid URI is required'),
        positiveDecimalNumber: (msg?: string) => ((val: string | number | null) => {
          if (val === null || (typeof val === 'number' && val > 0)) {
            return true;
          }
          if (typeof val === 'string' && (!val.trim() || (val.trim().match(/^\d*\.?\d*$/) && parseFloat(val.trim()) > 0))) {
            return true;
          }
          return msg || 'A positive decimal number is required';
        }),
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
      this.datasetRequirements.id = '';
      this.datasetRequirements.title = '';
      this.datasetRequirements.comments = null;
      this.datasetRequirements.crs = null;
      this.datasetRequirements.dataModel = null;
      this.datasetRequirements.accessRights = [];
      this.datasetRequirements.maxAgeDays = null;
      this.datasetRequirements.description = null;
      this.datasetRequirements.contentRequirements = [];
      this.datasetRequirements.unitOfMeasure = null;
      this.datasetRequirements.spatialCoverage = null;
    },
    saveProfile() {
      (this.$refs.form as QForm).validate()
        .then(result => {
          if (result) {
            console.log(toRDF(this.datasetRequirements));
          }
        });
    },
  },
  watch: {
    spatialCoverageCoords: {
      deep: true,
      handler(v: never[]) {
        if (!this.datasetRequirements.spatialCoverage) {
          this.datasetRequirements.spatialCoverage = [v[0], v[1], v[2]];
        } else {
          for (let i = 0; i < 3; i++) {
            this.datasetRequirements.spatialCoverage[i] = v[i];
          }
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
