export const profileContext = {
  rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
  xsd: 'http://www.w3.org/2001/XMLSchema#',
  time: 'http://www.w3.org/2006/time#',
  dct: 'http://purl.org/dc/terms/',
  cc: 'http://creativecommons.org/ns#',
  scho: 'http://schema.org/',
  geo: 'http://www.opengis.net/ont/geosparql#',
  title: 'dct:title',
  description: 'dct:description',
  comments: 'rdfs:comment',
  requirements: {
    '@id': 'scho:requirements',
    '@context': {
      dataModel: {
        '@id': 'dct:format',
        '@type': '@id',
      },
      maxAgeDays: {
        '@id': 'time:days',
        '@type': 'xsd:integer'
      },
      spatialCoverage: 'geo:hasBoundingBox',
    },
  },
};
