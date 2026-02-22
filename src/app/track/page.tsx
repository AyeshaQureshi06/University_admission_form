"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, Loader2, CheckCircle2, Clock, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TrackPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'found' | 'error'>('idle');
  
  // Mock tracking data
  const mockData = {
    id: 'GU-2025-8421',
    name: 'Ayesha Khan',
    program: 'BS Computer Science',
    faculty: 'Computing',
    currentStatus: 'under_review',
    timeline: [
      { date: 'Oct 15, 2024', status: 'Submitted', active: true, desc: 'Application received' },
      { date: 'Oct 16, 2024', status: 'Documents Verified', active: true, desc: 'Academic records checked' },
      { date: 'Oct 18, 2024', status: 'Under Review', active: true, desc: 'Assigned to reviewer' },
      { date: '-', status: 'Final Decision', active: false, desc: 'Pending' }
    ]
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('found');
    }, 1500);
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="h-[60px] w-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
        <h1 className="text-white font-headline text-xl tracking-widest uppercase">Application Status Tracker</h1>
      </div>

      <main className="max-w-3xl mx-auto px-4 mt-12">
        <Card className="shadow-lg border-0">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-3xl font-headline text-primary">Check Status</CardTitle>
            <p className="text-sm text-muted-foreground">Enter your Application ID or CNIC to track your progress</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-2 mb-8">
              <div className="flex-1">
                <Input 
                  placeholder="GU-YYYY-XXXX or 00000-0000000-0"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-12 text-center text-lg tracking-wider"
                />
              </div>
              <Button type="submit" className="h-12 pill-button bg-primary px-8" disabled={status === 'loading'}>
                {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              </Button>
            </form>

            {status === 'found' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-secondary/50 p-6 rounded-lg border border-primary/10">
                  <div>
                    <Label className="text-xs uppercase text-muted-foreground">Applicant Name</Label>
                    <p className="font-headline text-xl text-primary">{mockData.name}</p>
                  </div>
                  <div>
                    <Label className="text-xs uppercase text-muted-foreground">Application ID</Label>
                    <p className="font-headline text-xl text-primary">{mockData.id}</p>
                  </div>
                  <div className="md:col-span-2 mt-4 pt-4 border-t border-primary/10">
                    <Label className="text-xs uppercase text-muted-foreground">Selected Program</Label>
                    <p className="font-medium">{mockData.program} ({mockData.faculty})</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="font-headline text-xl text-primary flex items-center gap-2">
                    <Clock className="w-5 h-5 text-highlight" /> Progress Timeline
                  </h4>
                  <div className="space-y-4 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                    {mockData.timeline.map((item, i) => (
                      <div key={i} className="flex gap-4 relative">
                        <div className={cn(
                          "w-9 h-9 rounded-full flex items-center justify-center z-10 border-2",
                          item.active ? "bg-primary border-primary text-white shadow-md" : "bg-white border-border text-muted-foreground"
                        )}>
                          {item.active ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                        </div>
                        <div className="flex-1 pt-1">
                          <div className="flex justify-between items-start">
                            <h5 className={cn("font-medium", item.active ? "text-primary" : "text-muted-foreground")}>{item.status}</h5>
                            <span className="text-[10px] text-muted-foreground uppercase">{item.date}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary">
                  <h4 className="font-headline text-lg text-primary flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5" /> Admission Remarks
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Your documents have been successfully verified. The academic committee is currently reviewing your merit based on previous qualifications. 
                    Expect a final decision by the end of next week.
                  </p>
                </div>
              </div>
            )}

            {status === 'idle' && (
              <div className="py-20 text-center text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-10" />
                <p>Waiting for search query...</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
