
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface FeaturedCase {
  id: string;
  title: string;
  citation: string;
  court: string;
  date: string;
  category: string;
  summary: string;
}

const FEATURED_CASES: FeaturedCase[] = [
  {
    id: "kesavananda-bharati",
    title: "Kesavananda Bharati vs State of Kerala",
    citation: "AIR 1973 SC 1461",
    court: "Supreme Court",
    date: "April 24, 1973",
    category: "Constitutional",
    summary: "The Supreme Court established the doctrine of the 'basic structure' of the Constitution, ruling that Parliament cannot amend the Constitution in a way that destroys its basic or essential features."
  },
  {
    id: "vishaka",
    title: "Vishaka vs State of Rajasthan",
    citation: "AIR 1997 SC 3011",
    court: "Supreme Court",
    date: "August 13, 1997",
    category: "Labor & Employment",
    summary: "This landmark judgment laid down guidelines to prevent sexual harassment of women at workplaces, which later formed the basis for the Sexual Harassment of Women at Workplace Act, 2013."
  },
  {
    id: "puttaswamy",
    title: "Justice K.S. Puttaswamy vs Union of India",
    citation: "AIR 2017 SC 4161",
    court: "Supreme Court",
    date: "August 24, 2017",
    category: "Constitutional",
    summary: "The Supreme Court recognized the right to privacy as a fundamental right under Article 21 of the Indian Constitution, with significant implications for data protection and personal liberty."
  }
];

const FeaturedCases = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-serif">Featured Cases</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {FEATURED_CASES.map((caseData) => (
          <Card key={caseData.id} className="bg-white rounded-lg shadow-sm border border-border p-4">
            <div className="mb-3">
              <h3 className="font-serif font-semibold">{caseData.title}</h3>
              <p className="text-xs text-muted-foreground">{caseData.citation}</p>
            </div>
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs">
                <span className="text-muted-foreground">{caseData.court}</span>
                <span className="mx-1">•</span>
                <span className="text-muted-foreground">{caseData.date}</span>
              </div>
              <Badge variant="outline" className="text-xs">{caseData.category}</Badge>
            </div>
            <p className="text-sm line-clamp-3">{caseData.summary}</p>
            <div className="mt-4">
              <Button size="sm" variant="default" className="w-full" asChild>
                <Link to={`/case/${caseData.id}`}>View Case</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCases;
