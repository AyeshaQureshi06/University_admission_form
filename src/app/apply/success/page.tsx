"use client"

import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Download, Home } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const appId = searchParams.get('id') || 'GU-2025-XXXX';
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 rounded-full animate-bounce"
              style={{
                backgroundColor: ['#2d9a5f', '#1a472a', '#f0f7f4'][i % 3],
                left: `${Math.random() * 100}%`,
                top: `-10%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      )}

      <Card className="max-w-lg w-full text-center p-8 step-card animate-in zoom-in duration-500">
        <div className="botanical-bg" />
        <CardContent className="pt-6 space-y-6">
          <div className="flex justify-center">
            <div className="bg-success/10 p-4 rounded-full">
              <CheckCircle2 className="w-16 h-16 text-success animate-in slide-in-from-bottom duration-700" />
            </div>
          </div>
          
          <h2 className="text-4xl font-headline text-primary">Application Submitted!</h2>
          <p className="text-muted-foreground">
            Thank you for choosing Greenfield University. Your application has been received and is being processed.
          </p>

          <div className="bg-secondary p-6 rounded-lg border-2 border-dashed border-primary/30">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Application ID</p>
            <p className="text-3xl font-headline text-primary tracking-widest">{appId}</p>
          </div>

          <p className="text-sm text-muted-foreground italic">
            Please keep this ID safe for tracking your admission status. An email has been sent to your registered address with further instructions.
          </p>

          <div className="flex flex-col gap-4 pt-6">
            <Button className="pill-button bg-primary hover:bg-primary/90 h-12">
              <Download className="w-4 h-4 mr-2" /> Download Submission Copy
            </Button>
            <Button variant="outline" className="pill-button border-primary text-primary h-12" onClick={() => router.push('/')}>
              <Home className="w-4 h-4 mr-2" /> Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
