"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  MoreHorizontal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

const MOCK_APPLICATIONS = [
  { id: '1', appId: 'GU-2025-4122', name: 'Zainab Fatima', program: 'BS CS', faculty: 'Computing', status: 'Under Review', date: '2024-10-20' },
  { id: '2', appId: 'GU-2025-8321', name: 'Ahmed Hassan', program: 'BBA', faculty: 'Business', status: 'Accepted', date: '2024-10-19' },
  { id: '3', appId: 'GU-2025-1029', name: 'Sana Khan', program: 'BS SE', faculty: 'Computing', status: 'Rejected', date: '2024-10-18' },
  { id: '4', appId: 'GU-2025-5521', name: 'Hamza Malik', program: 'BS EE', faculty: 'Engineering', status: 'Submitted', date: '2024-10-18' },
  { id: '5', appId: 'GU-2025-9982', name: 'Nimra Sheikh', program: 'BS Psychology', faculty: 'Liberal Arts', status: 'Under Review', date: '2024-10-17' },
];

export default function ApplicationsPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search applications..." 
            className="pl-10 h-10 border-border"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary/5 pill-button h-10">
            <Filter className="w-4 h-4" /> Filter
          </Button>
          <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary/5 pill-button h-10">
            <Download className="w-4 h-4" /> Export
          </Button>
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-secondary/50">
              <TableRow>
                <TableHead className="font-headline text-primary">Application ID</TableHead>
                <TableHead className="font-headline text-primary">Applicant Name</TableHead>
                <TableHead className="font-headline text-primary">Program</TableHead>
                <TableHead className="font-headline text-primary">Status</TableHead>
                <TableHead className="font-headline text-primary">Date Applied</TableHead>
                <TableHead className="text-right font-headline text-primary">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_APPLICATIONS.map((app) => (
                <TableRow key={app.id} className="hover:bg-secondary/20 transition-colors">
                  <TableCell className="font-mono text-xs">{app.appId}</TableCell>
                  <TableCell className="font-medium">{app.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm">{app.program}</span>
                      <span className="text-[10px] text-muted-foreground uppercase">{app.faculty}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase",
                      app.status === 'Accepted' ? "bg-success/15 text-success border border-success/30" : 
                      app.status === 'Rejected' ? "bg-destructive/15 text-destructive border border-destructive/30" :
                      app.status === 'Submitted' ? "bg-primary/15 text-primary border border-primary/30" :
                      "bg-highlight/15 text-highlight border border-highlight/30"
                    )}>
                      {app.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{app.date}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/applications/${app.id}`} className="flex items-center gap-2">
                            <Eye className="w-4 h-4" /> View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-success">Accept</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Reject</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="p-4 flex items-center justify-between border-t bg-secondary/10">
            <p className="text-xs text-muted-foreground">Showing 5 of 1,284 results</p>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8 border-border" disabled>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 border-border">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
