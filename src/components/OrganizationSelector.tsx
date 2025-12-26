import { useState } from 'react';
import { Building2, ChevronDown, Check } from 'lucide-react';

interface Organization {
  id: string;
  name: string;
  plan: string;
}

const mockOrganizations: Organization[] = [
  { id: 'org-001', name: 'Acme Manufacturing', plan: 'enterprise' },
  { id: 'org-002', name: 'TechCorp Industries', plan: 'professional' },
  { id: 'org-003', name: 'Global Logistics Inc', plan: 'enterprise' },
  { id: 'org-004', name: 'Smart Factory Solutions', plan: 'starter' },
];

interface Props {
  selectedOrg: Organization;
  onSelectOrg: (org: Organization) => void;
}

export function OrganizationSelector({ selectedOrg, onSelectOrg }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Building2 className="w-4 h-4 text-white" />
        </div>
        <div className="text-left">
          <p className="text-white text-sm">{selectedOrg.name}</p>
          <p className="text-slate-400 text-xs capitalize">{selectedOrg.plan} Plan</p>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-80 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50">
            <div className="p-3 border-b border-slate-700">
              <p className="text-slate-400 text-xs uppercase tracking-wider">Select Organization</p>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {mockOrganizations.map((org) => (
                <button
                  key={org.id}
                  onClick={() => {
                    onSelectOrg(org);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700/50 transition-colors ${
                    selectedOrg.id === org.id ? 'bg-slate-700/30' : ''
                  }`}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-white text-sm truncate">{org.name}</p>
                    <p className="text-slate-400 text-xs capitalize">{org.plan} Plan</p>
                  </div>
                  {selectedOrg.id === org.id && (
                    <Check className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
