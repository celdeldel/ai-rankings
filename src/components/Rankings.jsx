import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { globalRankings, euRankings } from '../data/rankings';

export default function Rankings() {
  const ScoreBar = ({ score }) => (
    <div className="h-2 w-full bg-gray-200 rounded mt-1">
      <div className="h-2 bg-blue-600 rounded" style={{width: `${score}%`}} />
    </div>
  );

  const RankingCard = ({ data, type }) => (
    <div className="mb-6 p-4 rounded-lg border hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="text-3xl font-bold text-blue-600">
          #{data.rank}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">
            {type === 'global' ? data.entity : data.country}
          </h3>
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
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <CardTitle className="text-2xl font-bold text-center">
          Classements IA 2024
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="global">
          <TabsList className="grid grid-cols-2 w-full mb-6">
            <TabsTrigger value="global">Classement Mondial</TabsTrigger>
            <TabsTrigger value="eu">Classement Européen</TabsTrigger>
          </TabsList>
          <TabsContent value="global">
            {globalRankings.map((item) => (
              <RankingCard key={item.rank} data={item} type="global" />
            ))}
          </TabsContent>
          <TabsContent value="eu">
            {euRankings.map((item) => (
              <RankingCard key={item.rank} data={item} type="eu" />
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}