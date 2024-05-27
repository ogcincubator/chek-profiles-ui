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
      } as Record<string, string[]>,
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
    result.requirements.spatialCoverage = {
      x: ds.spatialCoverage[0],
      y: ds.spatialCoverage[1],
      z: ds.spatialCoverage[2],
    }
  }

  return result;
}

export {toRDF};
