import { Navbar } from "@/components/landing/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  TrendingUp, 
  BarChart3, 
  Target, 
  DollarSign, 
  PieChart, 
  LineChart,
  Briefcase,
  CheckCircle,
  ArrowRight,
  Layers,
  Shield,
  Zap
} from "lucide-react";

export default function StrategicFinancialEngineering() {
  const impactResults = [
    {
      title: "Bankability",
      description: "Transformed a technical roadmap into a formal Business Plan, leading to the successful structuring of the fundraising round.",
      icon: Briefcase
    },
    {
      title: "Strategic Clarity",
      description: "Enabled management to pivot from a pure service model to a scalable SaaS/DaaS infrastructure based on financial insights.",
      icon: Target
    },
    {
      title: "Operational Readiness",
      description: "Provided a 36-month execution bridge, ensuring liquidity management during the critical deployment phase.",
      icon: Shield
    }
  ];

  const technicalAreas = [
    {
      title: "Investment-Ready Financial Modeling",
      items: [
        "3-Year Integrated Forecasts: Engineered a comprehensive financial model including P&L, Balance Sheet, and Cash Flow statements.",
        "Unit Economics: Isolated key drivers such as Customer Acquisition Cost (CAC) and Lifetime Value (LTV) to validate the scalability of the \"Data-as-a-Service\" model."
      ],
      icon: LineChart
    },
    {
      title: "Strategic Stress-Testing & Scenarios",
      items: [
        "Sensitivity Analysis: Developed multi-layered scenarios (Best, Base, and Worst-case) to quantify market risks and adoption volatility.",
        "Breakeven Optimization: Identified the critical volume of NFC tags and subscriptions required to reach operational profitability."
      ],
      icon: BarChart3
    },
    {
      title: "Fundraising Advisory & Investor Alignment",
      items: [
        "KPI Framework: Established a strategic dashboard focusing on Burn Rate, Runway, and Gross Margin, aligning the founders' roadmap with Venture Capital (VC) standards.",
        "Capital Allocation: Structured the use of proceeds to ensure maximum ROI on the 32M FCFA investment."
      ],
      icon: PieChart
    }
  ];

  const tags = [
    "#PreSeed",
    "#AgTech",
    "#FinancialModeling",
    "#VentureCapital",
    "#BlockchainFinance",
    "#CôtedIvoire"
  ];

  return (
    <div className="min-h-screen bg-secondary/30">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <DollarSign className="w-3 h-3 mr-1" />
              Financial Engineering
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Strategic Financial Engineering
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              NaturaLink Pre-Seed Fundraising & Financial Structuring
            </p>
          </div>

          {/* Executive Overview */}
          <Card className="mb-12 border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-primary" />
                Executive Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="text-lg italic text-muted-foreground border-l-2 border-muted pl-4">
                "In the context of the Ivorian AgTech emergence, I led the financial engineering for NaturaLink, 
                a blockchain-based traceability platform. My mission was to bridge the gap between complex technology 
                and investor requirements, securing a <span className="font-semibold text-primary">32M FCFA pre-seed round</span> through 
                institutional-grade modeling."
              </blockquote>
            </CardContent>
          </Card>

          {/* Technical Deep Dive */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg nature-gradient flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Technical Deep Dive</h2>
            </div>

            <div className="space-y-6">
              {technicalAreas.map((area, index) => (
                <Card key={index} className="hover:shadow-medium transition-smooth">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <area.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-lg">{index + 1}. {area.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {area.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <ArrowRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* The "Deloitte" Impact */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg accent-gradient flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">The "Deloitte" Impact</h2>
              <Badge variant="secondary">Results</Badge>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {impactResults.map((result, index) => (
                <Card key={index} className="text-center hover:shadow-medium transition-smooth">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-14 h-14 rounded-full nature-gradient mx-auto mb-4 flex items-center justify-center">
                      <result.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3">{result.title}</h3>
                    <p className="text-sm text-muted-foreground">{result.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Funding Highlight */}
          <Card className="mb-12 nature-gradient text-white overflow-hidden">
            <CardContent className="py-10 text-center">
              <DollarSign className="w-12 h-12 mx-auto mb-4 opacity-90" />
              <p className="text-5xl font-bold mb-2">32M FCFA</p>
              <p className="text-lg opacity-90">Pre-Seed Round Successfully Structured</p>
              <div className="flex justify-center gap-4 mt-6">
                <Badge className="bg-white/20 text-white border-white/30">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Investment Ready
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  VC Aligned
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Separator className="my-12" />

          {/* Metadata & Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Metadata & Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Expertise</p>
                <p className="text-foreground">
                  Corporate Finance, M&A Advisory, Financial Modeling (Big Four Standards)
                </p>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-3">Keywords</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-primary border-primary/30">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
