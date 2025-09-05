import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { 
  Users, 
  Building2, 
  Briefcase, 
  TrendingUp,
  MapPin,
  BarChart3,
  PieChart as PieChartIcon,
  Activity
} from "lucide-react";

const HungYenLaborCharts = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  // Dữ liệu chi tiết cho các biểu đồ
  const districtData = [
    {
      name: "Hưng Yên",
      workers: 2850,
      companies: 145,
      jobs: 89,
      industry: "Công nghiệp",
      growth: 8.5,
      density: 95
    },
    {
      name: "Văn Lâm",
      workers: 1920,
      companies: 87,
      jobs: 45,
      industry: "Nông nghiệp",
      growth: 5.2,
      density: 72
    },
    {
      name: "Văn Giang",
      workers: 3150,
      companies: 198,
      jobs: 112,
      industry: "Dịch vụ",
      growth: 12.3,
      density: 88
    },
    {
      name: "Yên Mỹ",
      workers: 1650,
      companies: 72,
      jobs: 34,
      industry: "Thương mại",
      growth: 6.8,
      density: 65
    },
    {
      name: "Mỹ Hào",
      workers: 2200,
      companies: 98,
      jobs: 67,
      industry: "Sản xuất",
      growth: 9.1,
      density: 78
    }
  ];

  // Dữ liệu phân bố theo ngành
  const industryData = [
    { name: "Công nghiệp", value: 2850, percentage: 24.5, color: "#3b82f6" },
    { name: "Dịch vụ", value: 3150, percentage: 27.1, color: "#10b981" },
    { name: "Sản xuất", value: 2200, percentage: 18.9, color: "#f59e0b" },
    { name: "Nông nghiệp", value: 1920, percentage: 16.5, color: "#ef4444" },
    { name: "Thương mại", value: 1650, percentage: 14.2, color: "#8b5cf6" }
  ];

  // Dữ liệu xu hướng 6 tháng gần đây
  const trendData = [
    { month: "T7/2024", workers: 10200, jobs: 280, growth: 6.5 },
    { month: "T8/2024", workers: 10500, jobs: 295, growth: 7.2 },
    { month: "T9/2024", workers: 10800, jobs: 310, growth: 7.8 },
    { month: "T10/2024", workers: 11200, jobs: 325, growth: 8.1 },
    { month: "T11/2024", workers: 11500, jobs: 340, growth: 8.4 },
    { month: "T12/2024", workers: 11770, jobs: 347, growth: 8.7 }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border rounded-lg shadow-lg p-3">
          <p className="font-semibold text-foreground">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value?.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header với stats tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Tổng lao động</p>
                <p className="text-2xl font-bold text-primary">
                  {districtData.reduce((sum, item) => sum + item.workers, 0).toLocaleString()}
                </p>
                <p className="text-xs text-primary/70">+8.4% so với kỳ trước</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Building2 className="w-8 h-8 text-secondary" />
              <div>
                <p className="text-sm text-muted-foreground">Doanh nghiệp</p>
                <p className="text-2xl font-bold text-secondary">
                  {districtData.reduce((sum, item) => sum + item.companies, 0)}
                </p>
                <p className="text-xs text-secondary/70">+12% so với kỳ trước</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Briefcase className="w-8 h-8 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Việc làm</p>
                <p className="text-2xl font-bold text-accent">
                  {districtData.reduce((sum, item) => sum + item.jobs, 0)}
                </p>
                <p className="text-xs text-accent/70">+15% so với kỳ trước</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-gov-green/10 to-gov-green/5 border-gov-green/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-gov-green" />
              <div>
                <p className="text-sm text-muted-foreground">Tỷ lệ việc làm</p>
                <p className="text-2xl font-bold text-gov-green">94.2%</p>
                <p className="text-xs text-gov-green/70">Mục tiêu: 95%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Các biểu đồ chính */}
      <Tabs defaultValue="districts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="districts" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Theo địa bàn</span>
          </TabsTrigger>
          <TabsTrigger value="industries" className="flex items-center space-x-2">
            <PieChartIcon className="w-4 h-4" />
            <span>Theo ngành</span>
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center space-x-2">
            <Activity className="w-4 h-4" />
            <span>Xu hướng</span>
          </TabsTrigger>
          <TabsTrigger value="heatmap" className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>Bản đồ nhiệt</span>
          </TabsTrigger>
        </TabsList>

        {/* Biểu đồ theo địa bàn */}
        <TabsContent value="districts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Phân bố lao động theo địa bàn</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={districtData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="workers" fill="hsl(var(--primary))" name="Lao động" />
                    <Bar dataKey="companies" fill="hsl(var(--secondary))" name="Doanh nghiệp" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tỷ lệ tăng trưởng và mật độ</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={districtData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="growth" fill="hsl(var(--gov-green))" name="Tăng trưởng (%)" />
                    <Bar yAxisId="right" dataKey="density" fill="hsl(var(--accent))" name="Mật độ (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Bảng chi tiết */}
          <Card>
            <CardHeader>
              <CardTitle>Chi tiết theo địa bàn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      {["Địa bàn", "Lao động", "Doanh nghiệp", "Việc làm", "Ngành chính", "Tăng trưởng", "Mật độ"].map(header => (
                        <th key={header} className="text-left p-3 font-semibold">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {districtData.map((item) => (
                      <tr 
                        key={item.name} 
                        className={`border-b hover:bg-muted/50 cursor-pointer transition-colors ${
                          selectedDistrict === item.name ? 'bg-primary/10' : ''
                        }`}
                        onClick={() => setSelectedDistrict(item.name)}
                      >
                        <td className="p-3 font-medium">{item.name}</td>
                        <td className="p-3">{item.workers.toLocaleString()}</td>
                        <td className="p-3">{item.companies}</td>
                        <td className="p-3">{item.jobs}</td>
                        <td className="p-3">
                          <Badge variant="outline">{item.industry}</Badge>
                        </td>
                        <td className="p-3 text-gov-green font-medium">+{item.growth}%</td>
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary transition-all duration-500"
                                style={{ width: `${item.density}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{item.density}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Biểu đồ theo ngành */}
        <TabsContent value="industries" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Phân bố lao động theo ngành</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={industryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {industryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Thống kê chi tiết theo ngành</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {industryData.map((industry, index) => (
                    <div key={industry.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: COLORS[index] }}
                        ></div>
                        <div>
                          <p className="font-medium">{industry.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {industry.value.toLocaleString()} lao động
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{industry.percentage}%</p>
                        <p className="text-xs text-muted-foreground">tổng lực lượng</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Xu hướng */}
        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Xu hướng tăng trưởng 6 tháng gần đây</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="workers" 
                      stackId="1" 
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary))" 
                      fillOpacity={0.3}
                      name="Lao động"
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="growth" 
                      stroke="hsl(var(--gov-green))" 
                      strokeWidth={3}
                      name="Tỷ lệ tăng trưởng (%)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Bản đồ nhiệt */}
        <TabsContent value="heatmap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bản đồ nhiệt - Mật độ lao động</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-[400px] bg-gradient-to-br from-muted/30 to-muted/60 rounded-lg overflow-hidden">
                {/* Heatmap visualization */}
                <div className="absolute inset-0">
                  {districtData.map((district, index) => (
                    <div
                      key={district.name}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                      style={{
                        left: `${25 + index * 15}%`,
                        top: `${40 + Math.sin(index) * 20}%`
                      }}
                    >
                      <div className="relative">
                        {/* Heatmap circle */}
                        <div 
                          className="rounded-full border-4 border-white shadow-lg transition-all duration-300 group-hover:scale-125"
                          style={{
                            width: `${district.density * 0.8}px`,
                            height: `${district.density * 0.8}px`,
                            backgroundColor: `hsl(${120 - district.density}, 70%, 50%)`,
                            opacity: district.density / 100
                          }}
                        ></div>
                        
                        {/* Label */}
                        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-xs font-medium text-foreground whitespace-nowrap">
                          {district.name}
                        </div>
                        
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-12 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                          <div className="bg-card border rounded-lg shadow-lg p-3 text-sm whitespace-nowrap">
                            <div className="font-semibold text-foreground mb-1">{district.name}</div>
                            <div className="space-y-1 text-muted-foreground">
                              <div>Mật độ lao động: {district.density}%</div>
                              <div>Tổng lao động: {district.workers.toLocaleString()}</div>
                              <div>Tăng trưởng: +{district.growth}%</div>
                            </div>
                            <Badge variant="secondary" className="mt-2">
                              {district.industry}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Legend */}
                <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm border rounded-lg p-3">
                  <p className="text-xs font-semibold mb-2">Mật độ lao động</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs">Thấp</span>
                    <div className="w-20 h-2 bg-gradient-to-r from-red-400 to-green-400 rounded-full"></div>
                    <span className="text-xs">Cao</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HungYenLaborCharts;