"use client"

import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  User, 
  BookOpen, 
  School, 
  Paperclip, 
  Sparkles,
  CheckCircle,
  XCircle,
  Clock,
  Printer
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { adminApplicationIntelligentSummary, AdminApplicationIntelligentSummaryOutput } from '@/ai/flows/admin-application-intelligent-summary';

export default function ApplicationDetailPage() {
  const { id } = useParams();
  const [aiSummary, setAiSummary] = useState<AdminApplicationIntelligentSummaryOutput | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const mockApp = {
    id: id,
    appId: 'GU-2025-4122',
    first_name: 'Zainab',
    last_name: 'Fatima',
    father_name: 'Ahmed Hassan',
    cnic: '42101-1234567-8',
    email: 'zainab.fatima@example.com',
    phone: '+92 300 1234567',
    qualification: 'Intermediate',
    board_institute: 'BISE Lahore',
    passing_year: 2024,
    obtained_marks: 1020,
    total_marks: 1100,
    percentage: 92.7,
    faculty: 'Computing',
    program: 'BS Computer Science',
    extra_activities: 'Led the high school robotics club to national finals. Voluntary work at local animal shelter for 2 years.',
    status: 'under_review'
  };

  useEffect(() => {
    const fetchAiSummary = async () => {
      setIsAiLoading(true);
      try {
        const result = await adminApplicationIntelligentSummary({
          first_name: mockApp.first_name,
          last_name: mockApp.last_name,
          qualification: mockApp.qualification,
          board_institute: mockApp.board_institute,
          passing_year: mockApp.passing_year,
          obtained_marks: mockApp.obtained_marks,
          total_marks: mockApp.total_marks,
          percentage: mockApp.percentage,
          extra_activities: mockApp.extra_activities,
          faculty: mockApp.faculty,
          program: mockApp.program,
        });
        setAiSummary(result);
      } catch (error) {
        console.error("AI Summary failed", error);
      } finally {
        setIsAiLoading(false);
      }
    };

    fetchAiSummary();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Link href="/admin/applications">
          <Button variant="ghost" className="text-primary hover:bg-primary/5 gap-2 pill-button">
            <ArrowLeft className="w-4 h-4" /> Back to List
          </Button>
        </Link>
        <div className="flex gap-3">
          <Button variant="outline" className="pill-button border-primary text-primary h-10">
            <Printer className="w-4 h-4 mr-2" /> Print PDF
          </Button>
          <Button className="pill-button bg-success hover:bg-success/90 h-10">
            <CheckCircle className="w-4 h-4 mr-2" /> Accept
          </Button>
          <Button className="pill-button bg-destructive hover:bg-destructive/90 h-10">
            <XCircle className="w-4 h-4 mr-2" /> Reject
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Header Card */}
          <Card className="border-0 shadow-sm border-l-4 border-l-primary overflow-hidden">
            <div className="bg-gradient-to-r from-primary/5 to-transparent p-8">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-2xl bg-white shadow-md border-2 border-primary/20 flex items-center justify-center overflow-hidden">
                   <img src={`https://picsum.photos/seed/${id}/200/200`} alt="Applicant" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-3xl font-headline text-primary">{mockApp.first_name} {mockApp.last_name}</h2>
                  <p className="text-muted-foreground font-medium mb-3">{mockApp.program}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 uppercase tracking-tighter text-[10px]">{mockApp.appId}</Badge>
                    <Badge variant="outline" className="border-highlight text-highlight uppercase tracking-tighter text-[10px] flex gap-1 items-center">
                      <Clock className="w-3 h-3" /> {mockApp.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Personal Info */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="border-b bg-secondary/30">
              <CardTitle className="font-headline text-lg text-primary flex items-center gap-2">
                <User className="w-5 h-5" /> Personal Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
              <div>
                <p className="text-[10px] uppercase text-muted-foreground font-bold">Father's Name</p>
                <p className="font-medium">{mockApp.father_name}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-muted-foreground font-bold">CNIC Number</p>
                <p className="font-medium">{mockApp.cnic}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-muted-foreground font-bold">Email Address</p>
                <p className="font-medium">{mockApp.email}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-muted-foreground font-bold">Phone Number</p>
                <p className="font-medium">{mockApp.phone}</p>
              </div>
            </CardContent>
          </Card>

          {/* Academic Info */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="border-b bg-secondary/30">
              <CardTitle className="font-headline text-lg text-primary flex items-center gap-2">
                <School className="w-5 h-5" /> Academic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                <div>
                  <p className="text-[10px] uppercase text-muted-foreground font-bold">Qualification</p>
                  <p className="font-medium">{mockApp.qualification}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-muted-foreground font-bold">Board / Institute</p>
                  <p className="font-medium">{mockApp.board_institute}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-muted-foreground font-bold">Passing Year</p>
                  <p className="font-medium">{mockApp.passing_year}</p>
                </div>
              </div>
              <div className="bg-secondary/30 p-4 rounded-xl border border-primary/10 flex justify-between items-center">
                <div>
                  <p className="text-[10px] uppercase text-muted-foreground font-bold">Merit Statistics</p>
                  <p className="text-xl font-headline text-primary">{mockApp.obtained_marks} / {mockApp.total_marks}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase text-muted-foreground font-bold">Percentage</p>
                  <p className="text-3xl font-headline text-highlight">{mockApp.percentage}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="border-b bg-secondary/30">
              <CardTitle className="font-headline text-lg text-primary flex items-center gap-2">
                <Paperclip className="w-5 h-5" /> Attached Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {['CNIC Front/Back', 'Matric Certificate', 'Inter Marksheet', 'Paid Challan'].map(doc => (
                <div key={doc} className="p-3 bg-secondary/20 rounded-lg flex items-center justify-between group hover:bg-secondary/50 transition-colors border border-transparent hover:border-primary/20">
                  <span className="text-sm font-medium">{doc}</span>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10 text-[10px] uppercase tracking-widest font-bold">View File</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* AI Sidebar */}
        <div className="space-y-8">
          <Card className="border-0 shadow-lg bg-[#1a472a] text-white relative overflow-hidden group">
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
             <CardHeader className="pb-2">
               <CardTitle className="font-headline text-xl flex items-center gap-2">
                 <Sparkles className="w-5 h-5 text-accent" /> AI Insight Summary
               </CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
               {isAiLoading ? (
                 <div className="py-12 flex flex-col items-center justify-center space-y-4">
                    <Clock className="w-8 h-8 animate-spin opacity-50" />
                    <p className="text-xs text-white/60 tracking-widest uppercase">Analyzing Profile...</p>
                 </div>
               ) : aiSummary ? (
                 <div className="space-y-4">
                   <p className="text-sm leading-relaxed text-white/80 border-l-2 border-accent pl-4">
                     {aiSummary.summary}
                   </p>
                   <div>
                     <p className="text-[10px] uppercase tracking-widest font-bold text-accent mb-2">Key Highlights</p>
                     <ul className="space-y-2">
                       {aiSummary.key_strengths.map((strength, i) => (
                         <li key={i} className="text-xs flex items-start gap-2">
                           <CheckCircle className="w-3 h-3 text-accent mt-0.5 shrink-0" />
                           <span className="text-white/80">{strength}</span>
                         </li>
                       ))}
                     </ul>
                   </div>
                 </div>
               ) : (
                 <p className="text-xs text-white/60">No AI insight available for this profile.</p>
               )}
             </CardContent>
          </Card>

          <Card className="border-0 shadow-sm border-l-4 border-l-highlight">
            <CardHeader className="pb-2 bg-secondary/30">
              <CardTitle className="font-headline text-lg text-primary flex items-center gap-2">
                <BookOpen className="w-5 h-5" /> Activity Logs
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
               {[
                 { action: 'Reviewed Documents', user: 'admin_1', time: 'Oct 20, 10:20 AM' },
                 { action: 'Application Submitted', user: 'applicant', time: 'Oct 19, 04:15 PM' },
                 { action: 'Account Created', user: 'system', time: 'Oct 19, 03:50 PM' }
               ].map((log, i) => (
                 <div key={i} className="flex flex-col gap-0.5 border-b border-border/50 pb-2 last:border-0 last:pb-0">
                    <p className="text-sm font-semibold text-primary">{log.action}</p>
                    <div className="flex justify-between text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                      <span>{log.user}</span>
                      <span>{log.time}</span>
                    </div>
                 </div>
               ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
