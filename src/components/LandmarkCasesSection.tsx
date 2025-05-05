
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface LandmarkCase {
  id: string;
  title: string;
  citation: string;
  court: string;
  date: string;
  category: string;
  summary: string;
}

const LANDMARK_CASES = [
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
  },
  {
    id: "shreya-singhal",
    title: "Shreya Singhal vs Union of India",
    citation: "(2015) 5 SCC 1",
    court: "Supreme Court",
    date: "March 24, 2015",
    category: "Constitutional",
    summary: "The Supreme Court struck down Section 66A of the Information Technology Act, which criminalized sending offensive messages through communication services, as unconstitutional for violating the right to freedom of speech and expression."
  },
  {
    id: "navtej-johar",
    title: "Navtej Singh Johar vs Union of India",
    citation: "(2018) 10 SCC 1",
    court: "Supreme Court",
    date: "September 6, 2018",
    category: "Constitutional",
    summary: "The Supreme Court decriminalized consensual homosexual acts by declaring Section 377 of the Indian Penal Code unconstitutional as it violated the right to privacy, dignity, and equality."
  },
  {
    id: "maneka-gandhi",
    title: "Maneka Gandhi vs Union of India",
    citation: "AIR 1978 SC 597",
    court: "Supreme Court",
    date: "January 25, 1978",
    category: "Constitutional",
    summary: "This case expanded the interpretation of Article 21 of the Constitution, holding that the right to life and personal liberty includes a bundle of rights that makes life meaningful and not merely animal existence."
  },
  {
    id: "indra-sawhney",
    title: "Indra Sawhney vs Union of India",
    citation: "AIR 1993 SC 477",
    court: "Supreme Court",
    date: "November 16, 1992",
    category: "Constitutional",
    summary: "The Supreme Court upheld the implementation of the Mandal Commission recommendations, establishing the ceiling of 50% on reservations and excluding the 'creamy layer' from reservation benefits."
  },
  {
    id: "olga-tellis",
    title: "Olga Tellis vs Bombay Municipal Corporation",
    citation: "(1985) 3 SCC 545",
    court: "Supreme Court",
    date: "July 10, 1985",
    category: "Constitutional",
    summary: "The Court held that the right to livelihood is an integral part of the right to life under Article 21, recognizing that evicting pavement dwellers without alternative accommodation violates their fundamental rights."
  },
  {
    id: "triple-talaq",
    title: "Shayara Bano vs Union of India",
    citation: "(2017) 9 SCC 1",
    court: "Supreme Court",
    date: "August 22, 2017",
    category: "Family",
    summary: "The Supreme Court declared the practice of triple talaq (instant divorce) in Islamic personal law unconstitutional by a 3:2 majority, protecting the rights of Muslim women in India."
  },
  {
    id: "mohori-bibee",
    title: "Mohori Bibee vs Dharmodas Ghose",
    citation: "(1903) ILR 30 Cal 539",
    court: "Privy Council",
    date: "March 18, 1903",
    category: "Contract",
    summary: "This landmark case established that a contract with a minor is void ab initio (invalid from the beginning) and cannot be enforced, setting a significant precedent in contract law."
  }
];

const LandmarkCasesSection = () => {
  const [landmarkCases, setLandmarkCases] = useState<LandmarkCase[]>(LANDMARK_CASES);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // You could fetch from supabase here if you want to store these in the database
    // For now, we're using the hardcoded data
    setLandmarkCases(LANDMARK_CASES);
  }, []);

  return (
    <div id="landmark-cases" className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-serif font-bold mb-2">Landmark Cases</h2>
            <p className="text-muted-foreground">Historic and influential court rulings that shaped Indian law</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {landmarkCases.map((caseData) => (
            <Card key={caseData.id} className="overflow-hidden">
              <div className="h-1.5 bg-primary"></div>
              <div className="p-4">
                <div className="mb-3">
                  <h3 className="font-serif font-semibold text-lg">{caseData.title}</h3>
                  <p className="text-xs text-muted-foreground">{caseData.citation}</p>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs">
                    <span className="text-muted-foreground">{caseData.court}</span>
                    <span className="mx-1.5">•</span>
                    <span className="text-muted-foreground">{caseData.date}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">{caseData.category}</Badge>
                </div>
                
                <p className="text-sm line-clamp-3">{caseData.summary}</p>
                
                <div className="mt-4 flex justify-end">
                  <Button size="sm" asChild>
                    <Link to={`/case/${caseData.id}`}>View Case</Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandmarkCasesSection;
