import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap, Search, FileText } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Banner */}
      <div className="h-[60px] w-full bg-gradient-to-r from-[#1a472a] to-[#2d9a5f] shadow-md flex items-center justify-center">
        <h1 className="text-white font-headline text-2xl tracking-widest uppercase">Greenfield University</h1>
      </div>

      <main className="flex-1 container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <div className="mb-8 p-4 bg-white rounded-full shadow-lg border-2 border-primary/20">
          <GraduationCap className="w-16 h-16 text-primary" />
        </div>
        
        <h2 className="text-5xl md:text-7xl font-headline text-primary mb-6">Verdant Admissions</h2>
        <p className="max-w-2xl text-lg text-muted-foreground mb-12 font-body leading-relaxed">
          Embark on a transformative journey with one of the most prestigious academic institutions. 
          Our portal simplifies your journey to excellence.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg">
          <Link href="/apply" className="flex-1">
            <Button className="w-full h-16 pill-button bg-primary hover:bg-primary/90 text-lg">
              Start New Application
            </Button>
          </Link>
          <Link href="/track" className="flex-1">
            <Button variant="outline" className="w-full h-16 pill-button border-primary text-primary hover:bg-primary/5 text-lg">
              Track Status
            </Button>
          </Link>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <div className="p-8 bg-white border-l-4 border-primary shadow-sm rounded-lg text-left">
            <FileText className="w-8 h-8 text-highlight mb-4" />
            <h3 className="text-xl font-headline text-primary mb-2">Step 1: Apply</h3>
            <p className="text-muted-foreground text-sm">Fill out the comprehensive online form with your details.</p>
          </div>
          <div className="p-8 bg-white border-l-4 border-primary shadow-sm rounded-lg text-left">
            <Search className="w-8 h-8 text-highlight mb-4" />
            <h3 className="text-xl font-headline text-primary mb-2">Step 2: Review</h3>
            <p className="text-muted-foreground text-sm">Our admissions committee reviews your profile thoroughly.</p>
          </div>
          <div className="p-8 bg-white border-l-4 border-primary shadow-sm rounded-lg text-left">
            <GraduationCap className="w-8 h-8 text-highlight mb-4" />
            <h3 className="text-xl font-headline text-primary mb-2">Step 3: Join</h3>
            <p className="text-muted-foreground text-sm">Receive your acceptance and begin your academic career.</p>
          </div>
        </div>
      </main>

      <footer className="py-8 border-t bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Greenfield University Admissions. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
