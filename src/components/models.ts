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

export interface CityClass extends URIResource {
  semantics?: URIResource[];
}

export interface CityModule extends URIResource {
  classes?: CityClass[];
  semantics?: URIResource[];
}

const transportationSemantics: URIResource[] = [
  {label: 'TrafficArea', uri: 'http://example.com/vocab/city/TrafficArea'},
  {label: 'AuxiliaryTrafficArea', uri: 'http://example.com/vocab/city/AuxiliaryTrafficArea'},
  {label: 'TransportationMarking', uri: 'http://example.com/vocab/city/TransportationMarking'},
  {label: 'TransportationHole', uri: 'http://example.com/vocab/city/TransportationHole'},
]

const buildingSemantics: URIResource[] = [
  {label: 'RoofSurface', uri: 'http://example.com/vocab/city/RoofSurface'},
  {label: 'GroundSurface', uri: 'http://example.com/vocab/city/GroundSurface'},
  {label: 'WallSurface', uri: 'http://example.com/vocab/city/WallSurface'},
  {label: 'ClosureSurface', uri: 'http://example.com/vocab/city/ClosureSurface'},
  {label: 'OuterCeilingSurface', uri: 'http://example.com/vocab/city/OuterCeilingSurface'},
  {label: 'OuterFloorSurface', uri: 'http://example.com/vocab/city/OuterFloorSurface'},
  {label: 'Window', uri: 'http://example.com/vocab/city/Window'},
  {label: 'Door', uri: 'http://example.com/vocab/city/Door'},
  {label: 'InteriorWallSurface', uri: 'http://example.com/vocab/city/InteriorWallSurface'},
  {label: 'CeilingSurface', uri: 'http://example.com/vocab/city/CeilingSurface'},
  {label: 'FloorSurface', uri: 'http://example.com/vocab/city/FloorSurface'},
]

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
      {label: 'Building', uri: 'http://example.com/vocab/city/Building', semantics: buildingSemantics},
      {label: 'BuildingPart', uri: 'http://example.com/vocab/city/BuildingPart', semantics: buildingSemantics},
      {label: 'BuildingInstallation', uri: 'http://example.com/vocab/city/BuildingInstallation', semantics: buildingSemantics},
      {label: 'BuildingConstructiveElement', uri: 'http://example.com/vocab/city/BuildingConstructiveElement'},
      {label: 'BuildingFurniture', uri: 'http://example.com/vocab/city/BuildingFurniture'},
      {label: 'BuildingStorey', uri: 'http://example.com/vocab/city/BuildingStorey', semantics: buildingSemantics},
      {label: 'BuildingRoom', uri: 'http://example.com/vocab/city/BuildingRoom', semantics: buildingSemantics},
      {label: 'BuildingUnit', uri: 'http://example.com/vocab/city/BuildingUnit', semantics: buildingSemantics},
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
      {label: 'Road', uri: 'http://example.com/vocab/city/Road', semantics: transportationSemantics},
      {label: 'Railway', uri: 'http://example.com/vocab/city/Railway', semantics: transportationSemantics},
      {label: 'Waterway', uri: 'http://example.com/vocab/city/Waterway'},
      {label: 'TransportSquare', uri: 'http://example.com/vocab/city/TransportSquare', semantics: transportationSemantics},
      {label: 'TrafficArea', uri: 'http://example.com/vocab/city/TrafficArea'},
      {label: 'AuxiliaryTrafficArea', uri: 'http://example.com/vocab/city/AuxiliaryTrafficArea'},
      {label: 'Marking', uri: 'http://example.com/vocab/city/Marking'},
      {label: 'Hole', uri: 'http://example.com/vocab/city/Hole'},
    ],
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
  {
    label: 'WaterBody', uri: 'http://example.com/vocab/city/WaterBody', semantics: [
      {label: 'WaterSurface', uri: 'http://example.com/vocab/city/WaterSurface'},
      {label: 'WaterGroundSurface', uri: 'http://example.com/vocab/city/WaterGroundSurface'},
      {label: 'WaterClosureSurface', uri: 'http://example.com/vocab/city/WaterClosureSurface'},
    ]
  },
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

export const lods: string[] = [];
for (let i = 1; i <= 4; i++) {
  lods.push(`${i}`)
  for (let j = 1; j <= 4; j++) {
    lods.push(`${i}.${j}`);
  }
}

export interface ContentRequirements {
  label: string,
  module: CityModule;
  cityClasses: URIResource[];
  semantics: URIResource[];
  allowedGeometries: URIResource[];
  lod?: string | null;
  accuracyM?: number | null;
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
  contentRequirements: ContentRequirements[];
}
