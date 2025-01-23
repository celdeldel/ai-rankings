import React, { useState } from 'react';

// UI Components
const Card = ({ children, className = '' }) => (
  <div className={`rounded-lg border bg-white shadow-sm ${className}`}>{children}</div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const CardTitle = ({ children }) => (
  <h3 className="text-2xl font-semibold text-center">{children}</h3>
);

const CardContent = ({ children }) => (
  <div className="p-6">{children}</div>
);

const Tabs = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <div data-active={activeTab}>
      {React.Children.map(children, child => child && React.cloneElement(child, { activeTab, setActiveTab }))}
    </div>
  );
};

const TabsList = ({ children, className = '' }) => (
  <div className={`flex border-b ${className}`}>{children}</div>
);

const TabsTrigger = ({ children, value, activeTab, setActiveTab }) => (
  <button 
    className={`px-4 py-2 ${activeTab === value ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
    onClick={() => setActiveTab(value)}
  >
    {children}
  </button>
);

const TabsContent = ({ children, value, activeTab }) => (
  activeTab === value ? <div>{children}</div> : null
);

// Data
const globalRankings = [
  { rank: 1, entity: "États-Unis", scores: { innovation: 94, infrastructure: 92, capital: 93, regulation: 85, startup: 95, adoption: 91 }, highlights: "Leader R&D, écosystème startup" },
  { rank: 2, entity: "Chine", scores: { innovation: 91, infrastructure: 89, capital: 88, regulation: 83, startup: 89, adoption: 90 }, highlights: "Investissements massifs" },
  { rank: 3, entity: "Union Européenne", scores: { innovation: 87, infrastructure: 86, capital: 85, regulation: 92, startup: 84, adoption: 82 }, highlights: "Leader régulation" },
  { rank: 4, entity: "Royaume-Uni", scores: { innovation: 86, infrastructure: 85, capital: 84, regulation: 87, startup: 86, adoption: 83 }, highlights: "Excellence académique" },
  { rank: 5, entity: "Israël", scores: { innovation: 88, infrastructure: 83, capital: 87, regulation: 81, startup: 91, adoption: 84 }, highlights: "R&D militaire" }
];

const euRankings = [
  { rank: 1, country: "France", scores: { innovation: 90, infrastructure: 87, capital: 85, regulation: 89, startup: 88, adoption: 84 }, highlights: "Plan IA national" },
  { rank: 2, country: "Allemagne", scores: { innovation: 89, infrastructure: 88, capital: 87, regulation: 88, startup: 85, adoption: 86 }, highlights: "Industrie 4.0" },
  { rank: 3, country: "Pays-Bas", scores: { innovation: 87, infrastructure: 89, capital: 84, regulation: 86, startup: 83, adoption: 85 }, highlights: "Recherche quantique" },
  { rank: 4, country: "Suède", scores: { innovation: 86, infrastructure: 90, capital: 88, regulation: 85, startup: 82, adoption: 87 }, highlights: "Innovation forte" },
  { rank: 5, country: "Finlande", scores: { innovation: 85, infrastructure: 88, capital: 89, regulation: 87, startup: 81, adoption: 84 }, highlights: "Formation IA" }
];

// Main component
export default function Home() {
  const ScoreBar = ({ score }) => (
    <div className="h-2 w-full bg-gray-200 rounded mt-1">
      <div className="h-2 bg-blue-600 rounded" style={{width: `${score}%`}} />
    </div>
  );

  const RankingCard = ({ data, type }) => (
    <div className="mb-6 p-4 rounded-lg border hover:shadow-md">
      <div className="flex items-center gap-4">
        <div className="text-3xl font-bold text-blue-600">#{data.rank}</div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{type === 'global' ? data.entity : data.country}</h3>
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(data.scores).map(([key, value]) => (
              <div key={key} className="text-sm">
                <span className="font-medium capitalize">{key}: {value}</span>
                <ScoreBar score={value} />
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-gray-600">{data.highlights}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <CardTitle>Classements IA 2024</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="global">
            <TabsList className="grid grid-cols-2 w-full mb-6">
              <TabsTrigger value="global">Classement Mondial</TabsTrigger>
              <TabsTrigger value="eu">Classement Européen</TabsTrigger>
            </TabsList>
            <TabsContent value="global">
              {globalRankings.map(item => <RankingCard key={item.rank} data={item} type="global" />)}
            </TabsContent>
            <TabsContent value="eu">
              {euRankings.map(item => <RankingCard key={item.rank} data={item} type="eu" />)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}