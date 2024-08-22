"use client";

import React from 'react';
import { Loader2 } from "lucide-react";

interface EnrichmentDisplayProps {
  enrichmentStatus: 'loading' | 'complete' | null;
  enrichmentData: any;
}

const EnrichmentDisplay: React.FC<EnrichmentDisplayProps> = ({ enrichmentStatus, enrichmentData }) => {
  if (enrichmentStatus === 'loading') {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!enrichmentData) {
    return <div className="text-white p-4">No enrichment data available.</div>;
  }

  const data = typeof enrichmentData === 'string' ? JSON.parse(enrichmentData) : enrichmentData;
  const { data_json } = data;

  const renderValue = (value: any): string => {
    if (value === null || value === undefined) return 'Not specified';
    if (typeof value === 'string' || typeof value === 'number') return value.toString();
    if (Array.isArray(value)) return value.join(', ');
    if (typeof value === 'object') return JSON.stringify(value);
    return 'Not specified';
  };

  const InfoBox = ({ title, items }: { title: string, items: { label: string, value: any }[] }) => (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold mb-2">{title}</h3>
      {items.map((item, index) => (
        <div key={index} className="mb-1">
          <span className="font-medium">{item.label}: </span>
          <br></br>
          <span>{renderValue(item.value)}</span>
        </div>
      ))}
    </div>
  );

  const TeamBox = ({ team }: { team: any[] }) => (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold mb-2">Team</h3>
      {team.map((member, index) => (
        <div key={index} className="mb-4">
          <p className="font-medium">{member.name} - {member.position}</p>
          <ul className="list-disc pl-5 text-sm">
            {member.experience.map((exp: string, expIndex: number) => (
              <li key={expIndex}>{exp}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  const formatFundingType = (fundingType) => {
    if (!fundingType) return '';
    return fundingType
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const MarketOverviewBox = ({ marketOverview }: { marketOverview: any }) => {
    const renderMarketItem = (label: string, value: any) => {
      if (value === "NA" || value === undefined) return null;
      return (
        <div className="mb-2">
          <span className="font-medium">{label}: </span>
          <span>{value}</span>
        </div>
      );
    };
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold mb-2">Market Overview</h3>
        {renderMarketItem("Total Addressable Market", marketOverview.total_addressable_market)}
        {renderMarketItem("Serviceable Available Market", marketOverview.serviceable_available_market)}
        {renderMarketItem("Serviceable Obtainable Market", marketOverview.serviceable_obtainable_market)}
        {renderMarketItem("Growth Rate", marketOverview.growth_rate)}
        {marketOverview.key_trends && marketOverview.key_trends.length > 0 && (
          <div>
            <span className="font-medium">Key Trends:</span>
            <ul className="list-disc pl-5 mt-1">
              {marketOverview.key_trends.map((trend: string, index: number) => (
                <li key={index}>{trend}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const BusinessModelBox = ({ businessModel }: { businessModel: any }) => (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold mb-2">Business Model</h3>
      <div className="space-y-2">
        <p><span className="font-medium">Revenue Streams:</span> {businessModel.revenue_streams.join(', ')}</p>
        <p><span className="font-medium">Pricing Strategy:</span> {businessModel.pricing_strategy}</p>
        <p><span className="font-medium">Customer Acquisition Strategy:</span> {businessModel.customer_acquisition_strategy}</p>
      </div>
    </div>
  );

  const TractionBox = ({ traction }: { traction: any }) => (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold mb-2">Traction</h3>
      <div className="space-y-2">
        <div>
          <span className="font-medium">Key Metrics:</span>
          <ul className="list-disc pl-5 mt-1">
            {traction.key_metrics.map((metric: any, index: number) => (
              <li key={index}>{metric.metric_name}: {metric.value}</li>
            ))}
          </ul>
        </div>
        {traction.notable_clients && traction.notable_clients.length > 0 && (
          <p><span className="font-medium">Notable Clients:</span> {traction.notable_clients.join(', ')}</p>
        )}
        {traction.partnerships && traction.partnerships[0] !== "NA" && (
          <p><span className="font-medium">Partnerships:</span> {traction.partnerships.join(', ')}</p>
        )}
      </div>
    </div>
  );

  const RisksAndMitigationsBox = ({ risksAndMitigations }: { risksAndMitigations: any }) => (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold mb-2">Risks and Mitigations</h3>
      {Array.isArray(risksAndMitigations) ? (
        <ul className="list-disc pl-5">
          {risksAndMitigations.map((item, index) => (
            <li key={index}>
              <span className="font-medium">Risk:</span> {item.risk}
              <br />
              <span className="font-medium">Mitigation:</span> {item.mitigation}
            </li>
          ))}
        </ul>
      ) : (
        <p>No risks and mitigations data available.</p>
      )}
    </div>
  );

  const FinancialsBox = ({ financials }: { financials: any }) => (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold mb-2">Financials</h3>
      {financials.projections && financials.projections.length > 0 ? (
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Year</th>
              <th className="text-left">Revenue</th>
              <th className="text-left">Profit/Loss</th>
            </tr>
          </thead>
          <tbody>
            {financials.projections.map((item, index) => (
              <tr key={index}>
                <td>{item.year}</td>
                <td>{item.revenue}</td>
                <td>{item.profit_loss}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No financial projections available.</p>
      )}
    </div>
  );

  const FundingBox = ({ funding, investors }: { funding: any, investors: any }) => (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold mb-2">Funding</h3>
      <div className="space-y-2">
        <p><span className="font-medium">Total Funding:</span> {funding.total_funding.amount} {funding.total_funding.currency}</p>
        <p><span className="font-medium">Last Funding Type:</span> {formatFundingType(data.data_json.funding.last_funding_type) }</p>
        <p><span className="font-medium">Last Funding Date:</span> {funding.last_funding_date}</p>
        <p><span className="font-medium">Number of Funding Rounds:</span> {funding.num_funding_rounds}</p>
        
        <h4 className="font-semibold mt-4">Funding Rounds:</h4>
        {funding.funding_rounds.map((round, index) => (
          <div key={index} className="ml-4">
            <p><span className="font-medium">{round.round_name}</span></p>
            <p>Amount: {round.amount} {round.currency}</p>
            <p>Date: {round.announced_date}</p>
            <p>Lead Investor: {round.lead_investor_list}</p>
          </div>
        ))}
        
        <h4 className="font-semibold mt-4">Investors:</h4>
        <p>Number of Investors: {investors.num_investors}</p>
        <p>Number of Lead Investors: {investors.num_lead_investors}</p>
        <ul className="list-disc pl-5">
          {investors.investor_list.map((investor, index) => (
            <li key={index}>{investor.name} {investor.is_lead_investor ? '(Lead)' : ''}</li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center mb-6">{data_json?.company_name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InfoBox title="Company Info" items={[
          { label: "About", value: data_json?.short_description },
          { label: "Location", value: data_json?.location && `${data_json.location.city}, ${data_json.location.country}, ${data_json.location.continent}` },
          { label: "Founded on", value: data_json?.company_info?.founded_on },
          { label: "Last funding type", value: formatFundingType(data_json?.funding?.last_funding_type) },
          { label: "Website", value: data_json?.company_info?.website },
          { label: "Categories", value: data_json?.categories },
        ]} />
        
        {data_json?.team && <TeamBox team={data_json.team} />}
        
        <InfoBox title="Fundraising" items={[
          { label: "Total Funding", value: data_json?.funding?.total_funding && `$${data_json.funding.total_funding.amount} ${data_json.funding.total_funding.currency}` },
          { label: "Amount to raise", value: data_json?.funding_details?.current_round_ask },
          { label: "Use of funds", value: data_json?.funding_details?.use_of_funds?.map((u: any) => `${u.category}: ${u.percentage}%`) },
          { label: "Growth strategy", value: data_json?.growth_strategy },
        ]} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(data_json?.problem_statement || data_json?.solution) && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold mb-2">Company Overview</h3>
            <div className="space-y-2">
              {data_json?.problem_statement && <p><span className="font-medium">Problem:</span> {data_json.problem_statement}</p>}
              {data_json?.solution && <p><span className="font-medium">Solution:</span> {data_json.solution}</p>}
            </div>
          </div>
        )}
        {data_json?.market_overview && <MarketOverviewBox marketOverview={data_json.market_overview} />}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          {data_json?.business_model && <BusinessModelBox businessModel={data_json.business_model} />}
          <br />
          {data_json?.traction && <TractionBox traction={data_json.traction} />}
          <br />
          {data_json?.financials && <FinancialsBox financials={data_json.financials} />}
        </div>
        {(data_json?.funding || data_json?.investors) && 
          <FundingBox 
            funding={data_json.funding} 
            investors={data_json.investors} 
          />
        }
      </div>
    </div>
  );
};

export default EnrichmentDisplay;