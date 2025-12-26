import { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import type { DataFilter, NumericFilter, BooleanFilter, CategoricalFilter } from '../../utils/dataFilters';

interface Props {
  filter: DataFilter;
  onFilterChange: (filter: DataFilter) => void;
  dataRange?: { min: number; max: number };
  sensorUnit?: string;
}

export function DataFilterPanel({ filter, onFilterChange, dataRange, sensorUnit = '' }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleReset = () => {
    onFilterChange({ ...filter, enabled: false });
  };

  const handleToggle = () => {
    onFilterChange({ ...filter, enabled: !filter.enabled });
  };

  return (
    <div className="mb-3">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/50 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <Filter className={`w-3.5 h-3.5 ${filter.enabled ? 'text-blue-400' : 'text-slate-400'}`} />
          <span className={`text-xs ${filter.enabled ? 'text-blue-400' : 'text-slate-400'}`}>
            Filter {filter.enabled && '(Active)'}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-3 h-3 text-slate-400" />
          ) : (
            <ChevronDown className="w-3 h-3 text-slate-400" />
          )}
        </button>

        {filter.enabled && (
          <button
            onClick={handleReset}
            className="px-2 py-1 text-xs text-slate-400 hover:text-white transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      {/* Filter Controls */}
      {isExpanded && (
        <div className="mt-2 p-3 bg-slate-900/50 border border-slate-700 rounded-lg space-y-3">
          {/* Enable Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-slate-300 text-sm">Enable Filter</span>
            <button
              onClick={handleToggle}
              className={`relative w-11 h-6 rounded-full transition-colors ${filter.enabled ? 'bg-blue-600' : 'bg-slate-700'
                }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${filter.enabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
              />
            </button>
          </div>

          {/* Type-specific Controls */}
          {filter.enabled && (
            <>
              {filter.type === 'numeric' && (
                <NumericFilterControls
                  filter={filter}
                  onChange={onFilterChange}
                  dataRange={dataRange}
                  sensorUnit={sensorUnit}
                />
              )}
              {filter.type === 'boolean' && (
                <BooleanFilterControls filter={filter} onChange={onFilterChange} />
              )}
              {filter.type === 'categorical' && (
                <CategoricalFilterControls filter={filter} onChange={onFilterChange} />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

// Numeric Filter Controls
function NumericFilterControls({
  filter,
  onChange,
  dataRange,
  sensorUnit,
}: {
  filter: NumericFilter;
  onChange: (filter: DataFilter) => void;
  dataRange?: { min: number; max: number };
  sensorUnit: string;
}) {
  const defaultMin = dataRange?.min ?? 0;
  const defaultMax = dataRange?.max ?? 100;

  return (
    <div className="space-y-3">
      {/* Operator Selection */}
      <div>
        <label className="text-slate-400 text-xs mb-1 block">Condition</label>
        <select
          value={filter.operator}
          onChange={(e) =>
            onChange({ ...filter, operator: e.target.value as NumericFilter['operator'] })
          }
          className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="between">Between</option>
          <option value="greater">Greater than</option>
          <option value="less">Less than</option>
          <option value="equal">Equal to</option>
        </select>
      </div>

      {/* Value Inputs */}
      {filter.operator === 'between' && (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-slate-400 text-xs mb-1 block">Min Value</label>
            <input
              type="number"
              value={filter.min ?? defaultMin}
              onChange={(e) => onChange({ ...filter, min: parseFloat(e.target.value) })}
              placeholder={`Min ${sensorUnit}`}
              className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-slate-400 text-xs mb-1 block">Max Value</label>
            <input
              type="number"
              value={filter.max ?? defaultMax}
              onChange={(e) => onChange({ ...filter, max: parseFloat(e.target.value) })}
              placeholder={`Max ${sensorUnit}`}
              className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {filter.operator === 'greater' && (
        <div>
          <label className="text-slate-400 text-xs mb-1 block">Threshold</label>
          <input
            type="number"
            value={filter.min ?? defaultMin}
            onChange={(e) => onChange({ ...filter, min: parseFloat(e.target.value) })}
            placeholder={`Value ${sensorUnit}`}
            className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {filter.operator === 'less' && (
        <div>
          <label className="text-slate-400 text-xs mb-1 block">Threshold</label>
          <input
            type="number"
            value={filter.max ?? defaultMax}
            onChange={(e) => onChange({ ...filter, max: parseFloat(e.target.value) })}
            placeholder={`Value ${sensorUnit}`}
            className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {filter.operator === 'equal' && (
        <div>
          <label className="text-slate-400 text-xs mb-1 block">Value</label>
          <input
            type="number"
            value={filter.min ?? defaultMin}
            onChange={(e) => onChange({ ...filter, min: parseFloat(e.target.value) })}
            placeholder={`Value ${sensorUnit}`}
            className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {/* Visual Range Indicator */}
      {dataRange && filter.operator === 'between' && (
        <div className="pt-2">
          <div className="h-2 bg-slate-700 rounded-full relative overflow-hidden">
            <div
              className="absolute h-full bg-blue-500 opacity-50"
              style={{
                left: `${((filter.min ?? defaultMin) / (dataRange.max - dataRange.min)) * 100}%`,
                right: `${100 - ((filter.max ?? defaultMax) / (dataRange.max - dataRange.min)) * 100}%`,
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>{dataRange.min.toFixed(1)}{sensorUnit}</span>
            <span>{dataRange.max.toFixed(1)}{sensorUnit}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Boolean Filter Controls
function BooleanFilterControls({
  filter,
  onChange,
}: {
  filter: BooleanFilter;
  onChange: (filter: DataFilter) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-slate-400 text-xs mb-2 block">Show Values</label>
      <div className="space-y-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filter.showTrue}
            onChange={(e) => onChange({ ...filter, showTrue: e.target.checked })}
            className="w-4 h-4 bg-slate-800 border-slate-700 rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-white text-sm">True / Active / On (1)</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filter.showFalse}
            onChange={(e) => onChange({ ...filter, showFalse: e.target.checked })}
            className="w-4 h-4 bg-slate-800 border-slate-700 rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-white text-sm">False / Inactive / Off (0)</span>
        </label>
      </div>
    </div>
  );
}

// Categorical Filter Controls
function CategoricalFilterControls({
  filter,
  onChange,
}: {
  filter: CategoricalFilter;
  onChange: (filter: DataFilter) => void;
}) {
  const toggleValue = (value: string) => {
    const newSelected = filter.selectedValues.includes(value)
      ? filter.selectedValues.filter((v) => v !== value)
      : [...filter.selectedValues, value];
    onChange({ ...filter, selectedValues: newSelected });
  };

  const selectAll = () => {
    onChange({ ...filter, selectedValues: [...filter.availableValues] });
  };

  const deselectAll = () => {
    onChange({ ...filter, selectedValues: [] });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-slate-400 text-xs">Show Categories</label>
        <div className="flex gap-2">
          <button
            onClick={selectAll}
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            All
          </button>
          <button
            onClick={deselectAll}
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            None
          </button>
        </div>
      </div>
      <div className="space-y-1.5 max-h-40 overflow-y-auto">
        {filter.availableValues.map((value) => (
          <label key={value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filter.selectedValues.includes(value)}
              onChange={() => toggleValue(value)}
              className="w-4 h-4 bg-slate-800 border-slate-700 rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-white text-sm">{value}</span>
          </label>
        ))}
      </div>
      <div className="text-xs text-slate-500 pt-1">
        {filter.selectedValues.length} of {filter.availableValues.length} selected
      </div>
    </div>
  );
}
