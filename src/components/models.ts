export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export type Point3D = [number, number, number];

export interface URIResource {
  label: string;
  uri: string;
}

export enum LicenseRequirement {
  attribution = 'BY',
  shareAlike = 'SA',
  nonCommercial = 'NC',
  nonDerivative = 'ND',
}

export const CityJSON: URIResource = {
  label: 'CityJSON',
  uri: 'http://www.opengis.net/def/docs/20-072r2',
};

export const CityGML: URIResource = {
  label: 'CityGML',
  uri: 'http://www.opengis.net/def/docs/20-010',
}

export const CityModels: URIResource[] = [
  CityJSON, CityGML
]

export interface CityModule extends URIResource {
  classes?: URIResource[];
}

// These would be retrieved from the Rainbow
export const cityModules: CityModule[] = [
  {
    label: 'Bridge', uri: 'http://example.com/vocab/city/Bridge', classes: [
      {label: 'Bridge', uri: 'http://example.com/vocab/city/Bridge'},
      {label: 'BridgePart', uri: 'http://example.com/vocab/city/BridgePart'},
      {label: 'BridgeInstallation', uri: 'http://example.com/vocab/city/BridgeInstallation'},
      {label: 'BridgeConstructiveElement', uri: 'http://example.com/vocab/city/BridgeConstructiveElement'},
      {label: 'BridgeRoom', uri: 'http://example.com/vocab/city/BridgeRoom'},
      {label: 'BridgeFurniture', uri: 'http://example.com/vocab/city/BridgeFurniture'},
    ]
  },
  {
    label: 'Building', uri: 'http://example.com/vocab/city/Building', classes: [
      {label: 'Building', uri: 'http://example.com/vocab/city/Building'},
      {label: 'BuildingPart', uri: 'http://example.com/vocab/city/BuildingPart'},
      {label: 'BuildingInstallation', uri: 'http://example.com/vocab/city/BuildingInstallation'},
      {label: 'BuildingConstructiveElement', uri: 'http://example.com/vocab/city/BuildingConstructiveElement'},
      {label: 'BuildingFurniture', uri: 'http://example.com/vocab/city/BuildingFurniture'},
      {label: 'BuildingStorey', uri: 'http://example.com/vocab/city/BuildingStorey'},
      {label: 'BuildingRoom', uri: 'http://example.com/vocab/city/BuildingRoom'},
      {label: 'BuildingUnit', uri: 'http://example.com/vocab/city/BuildingUnit'},
    ]
  },
  {label: 'CityFurniture', uri: 'http://example.com/vocab/city/CityFurniture'},
  {label: 'LandUse', uri: 'http://example.com/vocab/city/LandUse'},
  {
    label: 'OtherConstruction', uri: 'http://example.com/vocab/city/OtherConstruction', classes: [
      {label: 'RailwayPlatform', uri: 'http://example.com/vocab/city/RailwayPlatform'},
      {label: 'Shed', uri: 'http://example.com/vocab/city/Shed'},
      {label: 'Windmill', uri: 'http://example.com/vocab/city/WindMill'},
    ]
  },
  {label: 'PlantCover', uri: 'http://example.com/vocab/city/PlantCover'},
  {label: 'SolitaryVegetationObject', uri: 'http://example.com/vocab/city/SolitaryVegetationObject'},
  {label: 'TINRelief', uri: 'http://example.com/vocab/city/TINRelief'},
  {
    label: 'Transportation', uri: 'http://example.com/vocab/city/Transportation', classes: [
      {label: 'Road', uri: 'http://example.com/vocab/city/Road'},
      {label: 'Railway', uri: 'http://example.com/vocab/city/Railway'},
      {label: 'Waterway', uri: 'http://example.com/vocab/city/Waterway'},
      {label: 'TransportSquare', uri: 'http://example.com/vocab/city/TransportSquare'},
      {label: 'TrafficArea', uri: 'http://example.com/vocab/city/TrafficArea'},
      {label: 'AuxiliaryTrafficArea', uri: 'http://example.com/vocab/city/AuxiliaryTrafficArea'},
      {label: 'Marking', uri: 'http://example.com/vocab/city/Marking'},
      {label: 'Hole', uri: 'http://example.com/vocab/city/Hole'},
    ]
  },
  {
    label: 'Tunnel', uri: 'http://example.com/vocab/city/Tunnel', classes: [
      {label: 'Tunnel', uri: 'http://example.com/vocab/city/Tunnel'},
      {label: 'TunnelPart', uri: 'http://example.com/vocab/city/TunnelPart'},
      {label: 'TunnelInstallation', uri: 'http://example.com/vocab/city/TunnelInstallation'},
      {label: 'TunnelConstructiveElement', uri: 'http://example.com/vocab/city/TunnelConstructiveElement'},
      {label: 'TunnelHollowSpace', uri: 'http://example.com/vocab/city/TunnelHollowSpace'},
      {label: 'TunnelFurniture', uri: 'http://example.com/vocab/city/TunnelFurniture'},
    ]
  },
  {label: 'WaterBody', uri: 'http://example.com/vocab/city/WaterBody'},
]

export const geometries: URIResource[] = [
  {label: 'MultiPoint', uri: 'http://example.com/vocab/city/MultiPoint'},
  {label: 'MultiLineString', uri: 'http://example.com/vocab/city/MultiLineString'},
  {label: 'MultiSurface', uri: 'http://example.com/vocab/city/MultiSurface'},
  {label: 'CompositeSurface', uri: 'http://example.com/vocab/city/CompositeSurface'},
  {label: 'Solid', uri: 'http://example.com/vocab/city/Solid'},
  {label: 'MultiSolid', uri: 'http://example.com/vocab/city/MultiSolid'},
  {label: 'CompositeSolid', uri: 'http://example.com/vocab/city/CompositeSolid'},
]

const lods: string[] = [];
for (let i = 1; i <= 4; i++) {
  lods.push(`${i}`)
  for (let j = 1; j <= 4; j++) {
    lods.push(`${i}.${j}`);
  }
}
export { lods };

export interface ContentRequirements {
  module: CityModule;
  cityClass: URIResource[];
  allowedGeometries: URIResource[];
  lod?: string | null;
  accuracyM: number;
  notes?: string | null;
}

export interface DatasetRequirements {
  title: string;
  description?: string | null;
  dataModel?: Set<URIResource> | null;
  spatialCoverage?: [Point3D, Point3D] | null;
  maxAgeDays?: number | null;
  accessRights?: LicenseRequirement[];
  crs?: string | null;
  unitOfMeasure?: string | null;
  comments?: string | null;
  content: ContentRequirements[];
}
