import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const data = [
  { name: 'Lun', scans: 400, produits: 240, utilisateurs: 140 },
  { name: 'Mar', scans: 300, produits: 139, utilisateurs: 221 },
  { name: 'Mer', scans: 500, produits: 380, utilisateurs: 229 },
  { name: 'Jeu', scans: 278, produits: 190, utilisateurs: 200 },
  { name: 'Ven', scans: 890, produits: 480, utilisateurs: 318 },
  { name: 'Sam', scans: 1239, produits: 380, utilisateurs: 250 },
  { name: 'Dim', scans: 1450, produits: 430, utilisateurs: 310 },
];

export function ActivityChart() {
  const [timeRange, setTimeRange] = useState("7j");
  const [chartType, setChartType] = useState<"line" | "area">("area");

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-3 rounded-lg shadow-lg border border-border">
          <p className="text-sm font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Activité de la plateforme</CardTitle>
            <CardDescription>Vue d'ensemble des métriques clés</CardDescription>
          </div>
          <div className="flex gap-2">
            <Select value={chartType} onValueChange={(value: "line" | "area") => setChartType(value)}>
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="area">Zone</SelectItem>
                <SelectItem value="line">Ligne</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7j">7 jours</SelectItem>
                <SelectItem value="30j">30 jours</SelectItem>
                <SelectItem value="3m">3 mois</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          {chartType === "area" ? (
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorProduits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(47, 96%, 53%)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(47, 96%, 53%)" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorUtilisateurs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(200, 95%, 65%)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(200, 95%, 65%)" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="scans" 
                stroke="hsl(142, 76%, 36%)" 
                fillOpacity={1} 
                fill="url(#colorScans)" 
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="produits" 
                stroke="hsl(47, 96%, 53%)" 
                fillOpacity={1} 
                fill="url(#colorProduits)" 
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="utilisateurs" 
                stroke="hsl(200, 95%, 65%)" 
                fillOpacity={1} 
                fill="url(#colorUtilisateurs)" 
                strokeWidth={2}
              />
            </AreaChart>
          ) : (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="scans" 
                stroke="hsl(142, 76%, 36%)" 
                strokeWidth={2}
                dot={{ fill: 'hsl(142, 76%, 36%)' }}
              />
              <Line 
                type="monotone" 
                dataKey="produits" 
                stroke="hsl(47, 96%, 53%)" 
                strokeWidth={2}
                dot={{ fill: 'hsl(47, 96%, 53%)' }}
              />
              <Line 
                type="monotone" 
                dataKey="utilisateurs" 
                stroke="hsl(200, 95%, 65%)" 
                strokeWidth={2}
                dot={{ fill: 'hsl(200, 95%, 65%)' }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}