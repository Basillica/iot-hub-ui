import { useState } from 'react';
import { EnterpriseFeatures } from './EnterpriseFeatures';
import { PricingPlans } from './PricingPlans';
import { TechnicalRoadmap } from './TechnicalRoadmap';
import { Sparkles, DollarSign, Code, FileText } from 'lucide-react';

type Tab = 'features' | 'pricing' | 'technical' | 'strategy';

export function PlatformOverview() {
  const [activeTab, setActiveTab] = useState<Tab>('features');

  const tabs = [
    { id: 'features' as Tab, label: 'Features & Roadmap', icon: Sparkles },
    { id: 'pricing' as Tab, label: 'Pricing & Plans', icon: DollarSign },
    { id: 'technical' as Tab, label: 'Technical Stack', icon: Code },
    { id: 'strategy' as Tab, label: 'GTM Strategy', icon: FileText },
  ];

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-2">
        <div className="flex gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'features' && <EnterpriseFeatures />}
        {activeTab === 'pricing' && <PricingPlans />}
        {activeTab === 'technical' && <TechnicalRoadmap />}
        {activeTab === 'strategy' && <StrategyOverview />}
      </div>
    </div>
  );
}

function StrategyOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-purple-900/30 border border-purple-700 rounded-xl p-8 text-center">
        <h2 className="text-white text-3xl mb-3">Go-to-Market Strategy</h2>
        <p className="text-slate-300 text-lg max-w-3xl mx-auto">
          A comprehensive business strategy to compete with industry leaders and capture significant market share
        </p>
      </div>

      {/* Key Differentiators */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-700/50 rounded-xl p-6 text-center">
          <div className="text-4xl text-green-400 mb-2">50-70%</div>
          <div className="text-white mb-1">Lower Cost</div>
          <div className="text-slate-400 text-sm">vs Palantir & AWS IoT</div>
        </div>
        <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-700/50 rounded-xl p-6 text-center">
          <div className="text-4xl text-blue-400 mb-2">2-4 weeks</div>
          <div className="text-white mb-1">Deployment Time</div>
          <div className="text-slate-400 text-sm">vs 6-12 months competitors</div>
        </div>
        <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-700/50 rounded-xl p-6 text-center">
          <div className="text-4xl text-purple-400 mb-2">300-500%</div>
          <div className="text-white mb-1">First Year ROI</div>
          <div className="text-slate-400 text-sm">6-9 month payback</div>
        </div>
        <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border border-orange-700/50 rounded-xl p-6 text-center">
          <div className="text-4xl text-orange-400 mb-2">70+</div>
          <div className="text-white mb-1">Enterprise Features</div>
          <div className="text-slate-400 text-sm">AI, Edge, Security</div>
        </div>
      </div>

      {/* Target Markets */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-white text-xl mb-4">Target Markets & Verticals</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-blue-400 mb-3">Primary Markets</h4>
            <div className="space-y-3">
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <div className="text-white mb-1">Discrete Manufacturing</div>
                <div className="text-slate-400 text-sm">Automotive, aerospace, electronics, machinery</div>
                <div className="text-green-400 text-sm mt-2">TAM: $12B globally</div>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <div className="text-white mb-1">Process Manufacturing</div>
                <div className="text-slate-400 text-sm">Food & beverage, pharma, chemicals, materials</div>
                <div className="text-green-400 text-sm mt-2">TAM: $8B globally</div>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <div className="text-white mb-1">Utilities & Energy</div>
                <div className="text-slate-400 text-sm">Power generation, water treatment, renewables</div>
                <div className="text-green-400 text-sm mt-2">TAM: $6B globally</div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-purple-400 mb-3">Secondary Markets</h4>
            <div className="space-y-3">
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <div className="text-white mb-1">Building Management</div>
                <div className="text-slate-400 text-sm">Smart buildings, HVAC, facilities management</div>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <div className="text-white mb-1">Oil & Gas</div>
                <div className="text-slate-400 text-sm">Upstream, midstream operations, refineries</div>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <div className="text-white mb-1">Mining & Resources</div>
                <div className="text-slate-400 text-sm">Remote asset monitoring, predictive maintenance</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Strategy */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-white text-xl mb-4">Sales Channels</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-400">Direct Sales</span>
                <span className="text-slate-400 text-sm">Enterprise, Fortune 500</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: '40%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-400">Channel Partners</span>
                <span className="text-slate-400 text-sm">System integrators, OEMs</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-purple-400">Online Self-Service</span>
                <span className="text-slate-400 text-sm">SMB customers</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500" style={{ width: '20%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-yellow-400">Marketplace</span>
                <span className="text-slate-400 text-sm">AWS, Azure marketplaces</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-white text-xl mb-4">Success Metrics (Target)</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
              <span className="text-slate-300">Time to First Value</span>
              <span className="text-green-400">&lt;2 weeks</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
              <span className="text-slate-300">User Adoption Rate</span>
              <span className="text-green-400">&gt;70% weekly active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
              <span className="text-slate-300">Customer NPS</span>
              <span className="text-green-400">&gt;50</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
              <span className="text-slate-300">Annual Churn Rate</span>
              <span className="text-green-400">&lt;5%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
              <span className="text-slate-300">Net Revenue Retention</span>
              <span className="text-green-400">&gt;120%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Acquisition Strategy */}
      <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-700 rounded-xl p-6">
        <h3 className="text-white text-xl mb-4">Customer Acquisition Funnel</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-slate-900/50 rounded-lg p-4 border-l-4 border-blue-500">
            <div className="text-blue-400 mb-2">1. Awareness</div>
            <div className="text-sm text-slate-300 space-y-1">
              <div>• Industry conferences</div>
              <div>• Webinars & demos</div>
              <div>• Content marketing</div>
              <div>• LinkedIn, YouTube ads</div>
            </div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border-l-4 border-green-500">
            <div className="text-green-400 mb-2">2. Trial</div>
            <div className="text-sm text-slate-300 space-y-1">
              <div>• 14-day free trial</div>
              <div>• Interactive demo</div>
              <div>• ROI calculator</div>
              <div>• Case studies</div>
            </div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border-l-4 border-purple-500">
            <div className="text-purple-400 mb-2">3. Pilot</div>
            <div className="text-sm text-slate-300 space-y-1">
              <div>• 60-day POC</div>
              <div>• Implementation support</div>
              <div>• Training sessions</div>
              <div>• Success criteria</div>
            </div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border-l-4 border-yellow-500">
            <div className="text-yellow-400 mb-2">4. Expansion</div>
            <div className="text-sm text-slate-300 space-y-1">
              <div>• Add devices/sensors</div>
              <div>• New facilities</div>
              <div>• Advanced features</div>
              <div>• Enterprise upgrade</div>
            </div>
          </div>
        </div>
      </div>

      {/* Competitive Positioning */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-white text-xl mb-4">Competitive Positioning Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-slate-400">Feature</th>
                <th className="text-center py-3 px-4 text-blue-400">Our Platform</th>
                <th className="text-center py-3 px-4 text-slate-400">Palantir</th>
                <th className="text-center py-3 px-4 text-slate-400">AWS IoT</th>
                <th className="text-center py-3 px-4 text-slate-400">ThingWorx</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-b border-slate-700/50">
                <td className="py-3 px-4">Deployment Time</td>
                <td className="text-center text-green-400">2-4 weeks</td>
                <td className="text-center text-red-400">6-12 months</td>
                <td className="text-center text-yellow-400">3-6 months</td>
                <td className="text-center text-yellow-400">4-8 months</td>
              </tr>
              <tr className="border-b border-slate-700/50">
                <td className="py-3 px-4">Annual Cost (500 devices)</td>
                <td className="text-center text-green-400">$24K</td>
                <td className="text-center text-red-400">$80K+</td>
                <td className="text-center text-yellow-400">$50K+</td>
                <td className="text-center text-yellow-400">$60K+</td>
              </tr>
              <tr className="border-b border-slate-700/50">
                <td className="py-3 px-4">No-Code Workflows</td>
                <td className="text-center text-green-400">✓ Visual</td>
                <td className="text-center text-red-400">✗ Code only</td>
                <td className="text-center text-yellow-400">~ Limited</td>
                <td className="text-center text-yellow-400">~ Basic</td>
              </tr>
              <tr className="border-b border-slate-700/50">
                <td className="py-3 px-4">Edge Computing</td>
                <td className="text-center text-green-400">✓ Offline capable</td>
                <td className="text-center text-red-400">✗ Cloud only</td>
                <td className="text-center text-yellow-400">~ Limited</td>
                <td className="text-center text-green-400">✓ Yes</td>
              </tr>
              <tr className="border-b border-slate-700/50">
                <td className="py-3 px-4">Pre-trained AI Models</td>
                <td className="text-center text-green-400">✓ Industry-specific</td>
                <td className="text-center text-yellow-400">~ Generic</td>
                <td className="text-center text-yellow-400">~ Generic</td>
                <td className="text-center text-red-400">✗ None</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Modern UI/UX</td>
                <td className="text-center text-green-400">✓ React</td>
                <td className="text-center text-yellow-400">~ Angular</td>
                <td className="text-center text-yellow-400">~ Mixed</td>
                <td className="text-center text-red-400">✗ Legacy</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-700 rounded-xl p-8 text-center">
        <h3 className="text-white text-2xl mb-3">Ready to Transform Your Operations?</h3>
        <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
          Join hundreds of manufacturing leaders who are already using our platform to achieve operational excellence.
          Start your free trial today and see results in weeks, not months.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors">
            Start Free Trial
          </button>
          <button className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
            Schedule Demo
          </button>
          <button className="px-8 py-3 border border-slate-600 hover:border-slate-500 text-white rounded-lg transition-colors">
            Download Datasheet
          </button>
        </div>
      </div>
    </div>
  );
}
