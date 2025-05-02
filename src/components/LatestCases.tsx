
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const caseUpdates = [
  {
    id: 1,
    title: 'Sharma vs. State of Maharashtra',
    court: 'Supreme Court',
    date: 'May 2, 2025',
    category: 'Criminal',
  },
  {
    id: 2,
    title: 'Tech Solutions Ltd. vs. Data Corp',
    court: 'Delhi High Court',
    date: 'May 1, 2025',
    category: 'IP',
  },
  {
    id: 3,
    title: 'R.K. Industries vs. Union of India',
    court: 'Supreme Court',
    date: 'Apr 29, 2025',
    category: 'Constitutional',
  },
];

const LatestCases = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-serif">Latest Cases</CardTitle>
        <CardDescription>Recently updated judgments</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {caseUpdates.map((item) => (
          <div key={item.id} className="border-b pb-2 last:border-0 last:pb-0">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-sm">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.court} • {item.date}</p>
              </div>
              <Badge variant="outline" className="text-xs">{item.category}</Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default LatestCases;
