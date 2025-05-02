
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const newsItems = [
  {
    id: 1,
    title: 'New Digital Personal Data Protection Bill in Effect',
    source: 'Legal Today',
    time: '2 hours ago'
  },
  {
    id: 2,
    title: 'Supreme Court Announces New Guidelines for Virtual Hearings',
    source: 'Law Times',
    time: '5 hours ago'
  },
  {
    id: 3,
    title: 'Bar Council Revises Professional Conduct Rules',
    source: 'Advocate Weekly',
    time: '1 day ago'
  }
];

const LegalNews = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-serif">Legal News</CardTitle>
        <CardDescription>Personalized for you</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {newsItems.map((item) => (
          <div key={item.id} className="border-b pb-2 last:border-0 last:pb-0">
            <p className="font-medium text-sm">{item.title}</p>
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-muted-foreground">{item.source}</span>
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default LegalNews;
