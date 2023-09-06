<template>
  <div class="q-pa-md">
    <q-form>
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

            <q-input
              label="Temporal coverage"
              hint="Maximum age for the dataset, in days"
              v-model="datasetRequirements.maxAgeDays"
              type="number"
            />

            <q-card class="q-my-md" flat bordered>
              <q-card-section>
                <div class="text-subtitle1">Access rights</div>
                <div>Exclude datasets with licenses that require...</div>
                <q-option-group
                  v-model="datasetRequirements.accessRights"
                  :options="licenseRequirementOptions"
                  color="green"
                  type="checkbox"
                />
              </q-card-section>
            </q-card>

            <q-select
              label="Coordinate reference system"
              :options="crsOptions"
              v-model="datasetRequirements.crs"
              map-options
              emit-value
              clearable
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
        <q-card-actions align="right">
          <q-btn type="reset">Clear</q-btn>
          <q-btn type="submit" color="primary">Generate profile</q-btn>
        </q-card-actions>
      </q-card>
      {{ datasetRequirements }}
    </q-form>
  </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import {CityModels, DatasetRequirements, LicenseRequirement} from "components/models";

export default defineComponent({
  data() {
    const datasetRequirements: DatasetRequirements = {
      title: '',
      accessRights: [],
      content: [],
      dataModel: null,
      maxAgeDays: null,
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
    };
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

.required .q-field__label:after {
  color: red;
  content: " *";
}
</style>
