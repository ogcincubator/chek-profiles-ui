import {DatasetRequirements, LicenseRequirement} from 'src/models';
import profileContext from 'src/jsonld/profile.json';

const accessRightsMap = new Map<string, string[]>([
  [LicenseRequirement.attribution, ['requires', 'Attribution']],
  [LicenseRequirement.nonCommercial, ['prohibits', 'CommercialUse']],
  [LicenseRequirement.nonDerivative, ['prohibits', 'DerivativeWorks']],
  [LicenseRequirement.shareAlike, ['requires', 'ShareAlike']],
]);

const toRDF = (ds: DatasetRequirements) => {
  const result = {
    '@context': profileContext,
    '@id': ds.id,
    title: ds.title,
    description: ds.description,
    comments: ds.comments,
    requirements: {
      dataModel: ds.dataModel && Array.from(ds.dataModel),
      maxAgeDays: ds.maxAgeDays,
      accessRightsExclude: {
        requires: [] as string[],
        permits: [] as string[],
        prohibits: [] as string[],
      } as any,
      crs: ds.crs,
      unitOfMeasure: ds.unitOfMeasure,
      spatialCoverage: {},
    },
  };

  if (ds.accessRights) {
    for (const accessRight in ds.accessRights) {
      const mapping = accessRightsMap.get(accessRight);
      if (mapping) {
        result.requirements.accessRightsExclude[mapping[0]].push(mapping[1]);
      }
    }
    if (ds.accessRights.includes(LicenseRequirement.attribution)) {
      result.requirements.accessRightsExclude.requires.push('Attribution');
    }
  }

  if (ds.spatialCoverage) {
    const crs = ds.crs ? `<${ds.crs}> ` : '',
      s = ds.spatialCoverage;
    const points = [];

    for (const z in [0, 1]) {
      for (const i of [[0, 0], [0, 1], [1, 1], [1, 0]]) {
        points.push(`${s[i[0]][0]} ${s[i[1]][1]} ${s[z][2]}`);
      }
    }
    result.requirements.spatialCoverage = {
      wkt: `${crs}POLYGON Z ((${points.join(', ')}))`,
    };
  }

  return result;
}

export {toRDF};
