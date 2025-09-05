import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  MapPin, 
  Users, 
  Building2, 
  Briefcase, 
  TrendingUp,
  Search,
  Filter,
  Download,
  RefreshCw
} from "lucide-react";
import HungYenLaborCharts from "./HungYenLaborCharts";

const HungYenLaborMap = () => {
  const [mapboxToken, setMapboxToken] = useState('');
  const [activeView, setActiveView] = useState<'dashboard' | 'map'>('map');

  // Dữ liệu mẫu cho các địa điểm trên bản đồ Hưng Yên
  const laborData = [
    {
      id: 1,
      location: "Hưng Yên",
      coordinates: [106.0515, 20.6464],
      workers: 2850,
      companies: 145,
      jobs: 89,
      industry: "Công nghiệp",
      growth: "+8.5%"
    },
    {
      id: 2,
      location: "Văn Lâm",
      coordinates: [106.0234, 20.6789],
      workers: 1920,
      companies: 87,
      jobs: 45,
      industry: "Nông nghiệp",
      growth: "+5.2%"
    },
    {
      id: 3,
      location: "Văn Giang",
      coordinates: [105.9876, 20.7123],
      workers: 3150,
      companies: 198,
      jobs: 112,
      industry: "Dịch vụ",
      growth: "+12.3%"
    },
    {
      id: 4,
      location: "Yên Mỹ",
      coordinates: [106.1234, 20.5456],
      workers: 1650,
      companies: 72,
      jobs: 34,
      industry: "Thương mại",
      growth: "+6.8%"
    },
    {
      id: 5,
      location: "Mỹ Hào",
      coordinates: [106.0789, 20.5890],
      workers: 2200,
      companies: 98,
      jobs: 67,
      industry: "Sản xuất",
      growth: "+9.1%"
    }
  ];

  const totalStats = {
    workers: laborData.reduce((sum, item) => sum + item.workers, 0),
    companies: laborData.reduce((sum, item) => sum + item.companies, 0),
    jobs: laborData.reduce((sum, item) => sum + item.jobs, 0),
    growth: "+8.4%"
  };

  const MapContent = () => {
    if (mapboxToken) {
      return (
        <div className="relative w-full h-[600px] bg-muted/20 rounded-lg overflow-hidden">
          {/* Mapbox integration would go here */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <MapPin className="w-16 h-16 text-primary mx-auto" />
              <p className="text-lg font-semibold">Bản đồ Mapbox đang tải...</p>
              <p className="text-sm text-muted-foreground">Token: {mapboxToken.substring(0, 20)}...</p>
            </div>
          </div>
          
          {/* Overlay với các điểm đánh dấu */}
          <div className="absolute inset-0">
            {laborData.map((location) => (
              <div
                key={location.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{
                  left: `${20 + (location.id * 15)}%`,
                  top: `${30 + (location.id * 10)}%`
                }}
              >
                <div className="relative">
                  <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg group-hover:scale-125 transition-transform duration-200"></div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-card border rounded-lg shadow-lg p-3 text-sm whitespace-nowrap">
                      <div className="font-semibold text-foreground">{location.location}</div>
                      <div className="text-muted-foreground">
                        <div>Lao động: {location.workers.toLocaleString()}</div>
                        <div>DN: {location.companies}</div>
                        <div>Việc làm: {location.jobs}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Token Input */}
        <Card className="border-2 border-dashed border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>Cấu hình Mapbox Token</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Mapbox Public Token</label>
              <Input
                type="password"
                placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJjbGl..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Lấy token tại{' '}
                <a 
                  href="https://mapbox.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary hover:underline"
                >
                  mapbox.com
                </a>
                {' '}→ Account → Tokens
              </p>
            </div>
            <Button 
              onClick={() => {/* Validate token */}}
              disabled={!mapboxToken}
              className="w-full"
            >
              Kích hoạt bản đồ
            </Button>
          </CardContent>
        </Card>

        {/* Enhanced Charts Visualization */}
        <HungYenLaborCharts />
      </div>
    );
  };

  const DashboardContent = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Tổng lao động</p>
                <p className="text-xl font-bold">{totalStats.workers.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Building2 className="w-8 h-8 text-secondary" />
              <div>
                <p className="text-sm text-muted-foreground">Doanh nghiệp</p>
                <p className="text-xl font-bold">{totalStats.companies}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Briefcase className="w-8 h-8 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Việc làm</p>
                <p className="text-xl font-bold">{totalStats.jobs}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-gov-green" />
              <div>
                <p className="text-sm text-muted-foreground">Tăng trưởng</p>
                <p className="text-xl font-bold text-gov-green">{totalStats.growth}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle>Chi tiết theo địa bàn</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Địa bàn</th>
                  <th className="text-left p-2">Lao động</th>
                  <th className="text-left p-2">Doanh nghiệp</th>
                  <th className="text-left p-2">Việc làm</th>
                  <th className="text-left p-2">Ngành chính</th>
                  <th className="text-left p-2">Tăng trưởng</th>
                </tr>
              </thead>
              <tbody>
                {laborData.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium">{item.location}</td>
                    <td className="p-2">{item.workers.toLocaleString()}</td>
                    <td className="p-2">{item.companies}</td>
                    <td className="p-2">{item.jobs}</td>
                    <td className="p-2">
                      <Badge variant="outline">{item.industry}</Badge>
                    </td>
                    <td className="p-2 text-gov-green font-medium">{item.growth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-foreground">
              Bản đồ thị trường lao động Hưng Yên
            </h1>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Xuất dữ liệu
              </Button>
              <Button size="sm" className="bg-gov-green hover:bg-gov-green/90">
                <RefreshCw className="w-4 h-4 mr-2" />
                Trực tiếp
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <Tabs value={activeView} onValueChange={(value) => setActiveView(value as 'dashboard' | 'map')} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center space-x-2 bg-primary text-white data-[state=active]:bg-primary data-[state=active]:text-white">
              <MapPin className="w-4 h-4" />
              <span>Bản đồ trực quan</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardContent />
          </TabsContent>

          <TabsContent value="map">
            <MapContent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HungYenLaborMap;