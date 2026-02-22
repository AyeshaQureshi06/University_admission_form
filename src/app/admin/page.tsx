"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Users, 
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const stats = [
  { label: 'Total Applications', value: '1,284', icon: FileText, color: 'text-primary', bg: 'bg-primary/10', trend: '+12%' },
  { label: 'Under Review', value: '452', icon: Clock, color: 'text-highlight', bg: 'bg-highlight/10', trend: '+5%' },
  { label: 'Accepted', value: '185', icon: CheckCircle, color: 'text-success', bg: 'bg-success/10', trend: '+18%' },
  { label: 'Rejected', value: '92', icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10', trend: '-2%' },
];

const barData = [
  { name: 'Computing', count: 420 },
  { name: 'Engineering', count: 300 },
  { name: 'Business', count: 350 },
  { name: 'Arts', count: 214 },
];

const pieData = [
  { name: 'Accepted', value: 185 },
  { name: 'Rejected', value: 92 },
  { name: 'Waitlisted', value: 50 },
  { name: 'Under Review', value: 452 },
];

const COLORS = ['#1a472a', '#c0392b', '#5a7a65', '#2d9a5f'];

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm border-l-4 border-l-primary hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={cn("p-3 rounded-xl", stat.bg)}>
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
                <div className="flex items-center gap-1 text-success text-xs font-bold">
                  <TrendingUp className="w-3 h-3" />
                  {stat.trend}
                </div>
              </div>
              <p className="text-3xl font-headline text-primary mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <Card className="lg:col-span-2 shadow-sm border-0">
          <CardHeader>
            <CardTitle className="font-headline text-xl text-primary">Applications by Faculty</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: '#f0f7f4' }} />
                  <Bar dataKey="count" fill="#1a472a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card className="shadow-sm border-0">
          <CardHeader>
            <CardTitle className="font-headline text-xl text-primary">Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" align="center" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="shadow-sm border-0">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-headline text-xl text-primary">Recent Applications</CardTitle>
          <Button variant="link" className="text-primary gap-1">View All <ArrowUpRight className="w-3 h-3" /></Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'Sarah Ahmed', program: 'BS Software Engineering', time: '2 mins ago', status: 'Draft' },
              { name: 'Ali Raza', program: 'MBA Finance', time: '15 mins ago', status: 'Submitted' },
              { name: 'Mariam Zehra', program: 'BS Data Science', time: '1 hour ago', status: 'Under Review' },
              { name: 'Usman Ghani', program: 'BBA', time: '3 hours ago', status: 'Accepted' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={`https://picsum.photos/seed/${i}/40/40`} />
                    <AvatarFallback>{item.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-primary">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.program}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">{item.time}</p>
                  <span className={cn(
                    "text-[10px] px-2 py-1 rounded-full font-bold uppercase",
                    item.status === 'Accepted' ? "bg-success/20 text-success" : 
                    item.status === 'Submitted' ? "bg-primary/20 text-primary" :
                    "bg-highlight/20 text-highlight"
                  )}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
