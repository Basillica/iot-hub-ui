export type SensorDataType = 'numeric' | 'boolean' | 'categorical' | 'string';

export interface NumericFilter {
  type: 'numeric';
  enabled: boolean;
  min?: number;
  max?: number;
  operator?: 'between' | 'greater' | 'less' | 'equal';
}

export interface BooleanFilter {
  type: 'boolean';
  enabled: boolean;
  showTrue: boolean;
  showFalse: boolean;
}

export interface CategoricalFilter {
  type: 'categorical';
  enabled: boolean;
  selectedValues: string[];
  availableValues: string[];
}

export type DataFilter = NumericFilter | BooleanFilter | CategoricalFilter;

export interface FilterConfig {
  dataType: SensorDataType;
  filter: DataFilter;
}

// Helper to determine data type from sensor type
export function getSensorDataType(sensorType: string): SensorDataType {
  const booleanTypes = [
    'motion_sensor', 
    'door_sensor', 
    'glass_break',
    'proximity_sensor',
    'emergency_stop',
    'alarm_status',
    'fault_status'
  ];
  
  const categoricalTypes = [
    'operation_mode',
    'status',
    'state',
    'phase',
    'quality_grade'
  ];
  
  if (booleanTypes.includes(sensorType)) {
    return 'boolean';
  } else if (categoricalTypes.includes(sensorType)) {
    return 'categorical';
  } else {
    return 'numeric';
  }
}

// Helper to create default filter for a data type
export function createDefaultFilter(dataType: SensorDataType, sensorType: string): DataFilter {
  switch (dataType) {
    case 'boolean':
      return {
        type: 'boolean',
        enabled: false,
        showTrue: true,
        showFalse: true,
      };
    
    case 'categorical':
      // Mock available values - in real app, fetch from backend
      const mockCategories: Record<string, string[]> = {
        operation_mode: ['Auto', 'Manual', 'Maintenance', 'Off'],
        status: ['Running', 'Idle', 'Error', 'Stopped'],
        quality_grade: ['A', 'B', 'C', 'Reject'],
      };
      const availableValues = mockCategories[sensorType] || ['Value1', 'Value2', 'Value3'];
      return {
        type: 'categorical',
        enabled: false,
        selectedValues: [...availableValues],
        availableValues,
      };
    
    case 'numeric':
    default:
      return {
        type: 'numeric',
        enabled: false,
        operator: 'between',
      };
  }
}

// Apply filter to a data point
export function applyFilter(value: any, filter: DataFilter): boolean {
  if (!filter.enabled) return true;

  switch (filter.type) {
    case 'boolean':
      if (typeof value === 'boolean') {
        if (value === true && !filter.showTrue) return false;
        if (value === false && !filter.showFalse) return false;
      } else if (typeof value === 'number') {
        // Treat 0 as false, non-zero as true
        if (value === 0 && !filter.showFalse) return false;
        if (value !== 0 && !filter.showTrue) return false;
      }
      return true;

    case 'categorical':
      return filter.selectedValues.includes(String(value));

    case 'numeric':
      const numValue = Number(value);
      if (isNaN(numValue)) return true;

      switch (filter.operator) {
        case 'between':
          if (filter.min !== undefined && numValue < filter.min) return false;
          if (filter.max !== undefined && numValue > filter.max) return false;
          return true;
        case 'greater':
          return filter.min !== undefined ? numValue > filter.min : true;
        case 'less':
          return filter.max !== undefined ? numValue < filter.max : true;
        case 'equal':
          return filter.min !== undefined ? numValue === filter.min : true;
        default:
          return true;
      }

    default:
      return true;
  }
}
