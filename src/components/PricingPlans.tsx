import { Check, Star, Zap, Building2, ArrowRight } from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  price: string;
  billingPeriod: string;
  description: string;
  features: string[];
  limitations?: string;
  cta: string;
  popular?: boolean;
  icon: any;
}

const PRICING_TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'For small facilities testing IoT',
    price: '$499',
    billingPeriod: '/month',
    description: 'Get started with essential monitoring and analytics',
    icon: Zap,
    features: [
      'Up to 50 devices',
      'Up to 500 sensors',
      '1GB data storage',
      '1 organization',
      'Basic dashboards',
      'Email alerts',
      'Standard support (email)',
      'Data retention: 30 days',
      'API access (100K calls/month)',
    ],
    limitations: 'Limited to 5 users',
    cta: 'Start Free Trial',
  },
  {
    id: 'professional',
    name: 'Professional',
    tagline: 'For growing operations',
    price: '$1,999',
    billingPeriod: '/month',
    description: 'Advanced analytics and team collaboration',
    icon: Star,
    popular: true,
    features: [
      'Up to 500 devices',
      'Up to 5,000 sensors',
      '100GB data storage',
      '3 organizations',
      'Custom dashboards (unlimited)',
      'Multi-channel alerts (SMS, Slack, Teams)',
      'Advanced analytics & OEE',
      'Energy analytics',
      'Team collaboration features',
      'Work order integration',
      'Mobile apps (iOS/Android)',
      'Priority support (phone + email)',
      'Data retention: 1 year',
      'API access (1M calls/month)',
      'SSO/SAML integration',
      'BI tool connectors',
      'Scheduled reports',
    ],
    cta: 'Start Free Trial',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'For large-scale operations',
    price: 'Custom',
    billingPeriod: 'pricing',
    description: 'Full platform with AI, edge computing, and white-label',
    icon: Building2,
    features: [
      'Unlimited devices & sensors',
      'Unlimited data storage',
      'Unlimited organizations',
      'Everything in Professional, plus:',
      'AI/ML predictive maintenance',
      'Real-time anomaly detection',
      'Process optimization engine',
      'Root cause analysis AI',
      'Edge computing & offline mode',
      'Closed-loop automation',
      'Visual workflow builder',
      '3D digital twins',
      'Video + sensor overlay',
      'AR maintenance guides',
      'White-label & custom branding',
      'On-premises deployment option',
      'Dedicated account manager',
      '99.99% SLA guarantee',
      'Custom integrations',
      'Advanced security (HSM, audit logs)',
      'Data residency options',
      'Unlimited API calls',
      'Custom ML model training',
      'Professional services included',
    ],
    cta: 'Contact Sales',
  },
];

const ADD_ONS = [
  { name: 'Additional User Seats', price: '$49/user/month' },
  { name: 'Extra Data Storage', price: '$0.10/GB/month' },
  { name: 'Additional Organizations', price: '$299/org/month' },
  { name: 'Premium Support (24/7)', price: '$999/month' },
  { name: 'Custom ML Model Development', price: 'Starting at $25,000' },
  { name: 'Professional Implementation', price: 'Starting at $15,000' },
  { name: 'Training & Onboarding', price: '$2,500/day' },
  { name: 'White-Label License', price: 'Contact for pricing' },
];

const VOLUME_DISCOUNTS = [
  { devices: '500-1,000', discount: '10%' },
  { devices: '1,000-5,000', discount: '20%' },
  { devices: '5,000-10,000', discount: '30%' },
  { devices: '10,000+', discount: '40%' },
];

export function PricingPlans() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-white text-3xl mb-3">Transparent, Predictable Pricing</h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          No hidden fees, no surprise bills. Scale confidently with our flexible pricing model.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-900/20 border border-green-700/30 rounded-lg">
          <Check className="w-5 h-5 text-green-400" />
          <span className="text-green-400">14-day free trial • No credit card required</span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {PRICING_TIERS.map((tier) => {
          const Icon = tier.icon;
          return (
            <div
              key={tier.id}
              className={`relative rounded-xl overflow-hidden ${
                tier.popular
                  ? 'bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-2 border-blue-500'
                  : 'bg-slate-800/50 border border-slate-700'
              }`}
            >
              {tier.popular && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
                  Most Popular
                </div>
              )}

              <div className="p-6">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    tier.popular ? 'bg-blue-600' : 'bg-slate-700'
                  }`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white text-xl">{tier.name}</h3>
                    <p className="text-slate-400 text-sm">{tier.tagline}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-white text-4xl">{tier.price}</span>
                    <span className="text-slate-400">{tier.billingPeriod}</span>
                  </div>
                  <p className="text-slate-400 text-sm mt-2">{tier.description}</p>
                </div>

                {/* CTA */}
                <button
                  className={`w-full py-3 px-4 rounded-lg transition-all mb-6 flex items-center justify-center gap-2 ${
                    tier.popular
                      ? 'bg-blue-600 hover:bg-blue-500 text-white'
                      : 'bg-slate-700 hover:bg-slate-600 text-white'
                  }`}
                >
                  {tier.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Features */}
                <div className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {tier.limitations && (
                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <p className="text-slate-500 text-xs">{tier.limitations}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add-ons */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-white text-xl mb-4">Add-ons & Extras</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {ADD_ONS.map((addon, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
              <span className="text-slate-300">{addon.name}</span>
              <span className="text-blue-400">{addon.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Volume Discounts */}
      <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-700/50 rounded-xl p-6">
        <h3 className="text-white text-xl mb-4">Volume Discounts</h3>
        <p className="text-slate-300 mb-4">
          Save more as you scale. Automatic discounts applied based on device count.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {VOLUME_DISCOUNTS.map((discount, index) => (
            <div key={index} className="text-center p-4 bg-slate-900/50 rounded-lg">
              <div className="text-slate-400 text-sm mb-1">{discount.devices} devices</div>
              <div className="text-green-400 text-2xl">{discount.discount}</div>
              <div className="text-slate-500 text-xs">off</div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ / Comparison */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* What's Included */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-white text-xl mb-4">All Plans Include</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-400 mt-0.5" />
              <span className="text-slate-300 text-sm">Real-time data ingestion (MQTT, CoAP, OPC-UA)</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-400 mt-0.5" />
              <span className="text-slate-300 text-sm">Built-in digital twin capabilities</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-400 mt-0.5" />
              <span className="text-slate-300 text-sm">Rule engine with threshold alerts</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-400 mt-0.5" />
              <span className="text-slate-300 text-sm">Role-based access control (RBAC)</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-400 mt-0.5" />
              <span className="text-slate-300 text-sm">99.9% uptime SLA</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-400 mt-0.5" />
              <span className="text-slate-300 text-sm">Free platform updates & new features</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-400 mt-0.5" />
              <span className="text-slate-300 text-sm">Data encryption (in transit & at rest)</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-400 mt-0.5" />
              <span className="text-slate-300 text-sm">Regular security audits</span>
            </div>
          </div>
        </div>

        {/* ROI Calculator Teaser */}
        <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-700/50 rounded-xl p-6">
          <h3 className="text-white text-xl mb-4">Typical ROI Scenario</h3>
          <div className="space-y-4">
            <div>
              <div className="text-slate-300 text-sm mb-1">Mid-size manufacturer (100 machines)</div>
              <div className="text-white text-lg">Professional Plan: $1,999/month</div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Reduced downtime (10% improvement)</span>
                <span className="text-green-400">+$50K/month</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Energy savings (15% reduction)</span>
                <span className="text-green-400">+$12K/month</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Improved OEE (5% increase)</span>
                <span className="text-green-400">+$30K/month</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Reduced manual reporting</span>
                <span className="text-green-400">+$5K/month</span>
              </div>
            </div>
            <div className="pt-4 border-t border-green-700/50">
              <div className="flex justify-between items-center">
                <span className="text-white">Net Monthly Benefit</span>
                <span className="text-green-400 text-2xl">$95K</span>
              </div>
              <div className="text-green-400 text-sm mt-2">
                ROI: 4,750% • Payback: 0.6 months
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enterprise CTA */}
      <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-700 rounded-xl p-8 text-center">
        <h3 className="text-white text-2xl mb-2">Need a custom solution?</h3>
        <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
          Our enterprise team will work with you to design a solution that fits your exact requirements, 
          scale, and budget. We offer flexible contracts, volume discounts, and multi-year commitments.
        </p>
        <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors inline-flex items-center gap-2">
          Schedule a Demo
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
