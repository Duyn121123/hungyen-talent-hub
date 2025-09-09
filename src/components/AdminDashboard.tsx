import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HungYenLaborMap from "./HungYenLaborMap";
import DashboardCharts from "./DashboardCharts";
import NGSCAIBot from "./NGSCAIBot";
import { 
  BarChart3, 
  Users, 
  Building2, 
  TrendingUp, 
  FileText, 
  Settings,
  MapPin,
  Briefcase,
  Map,
  Bot
} from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Tổng số doanh nghiệp",
      value: "1,247",
      change: "+12%",
      icon: Building2,
      color: "text-primary"
    },
    {
      title: "Người lao động",
      value: "15,832",
      change: "+8%",
      icon: Users,
      color: "text-secondary"
    },
    {
      title: "Việc làm đang tuyển",
      value: "842",
      change: "+25%",
      icon: Briefcase,
      color: "text-accent"
    },
    {
      title: "Tỷ lệ việc làm",
      value: "94.2%",
      change: "+2.1%",
      icon: TrendingUp,
      color: "text-gov-green"
    }
  ];

  const quickActions = [
    {
      title: "Báo cáo thống kê",
      description: "Xem báo cáo tổng hợp nguồn nhân lực",
      icon: BarChart3,
      action: "Xem báo cáo"
    },
    {
      title: "Quản lý doanh nghiệp",
      description: "Tra cứu và phê duyệt thông tin doanh nghiệp",
      icon: Building2,
      action: "Quản lý"
    },
    {
      title: "Quản lý người dùng",
      description: "Phân quyền và giám sát hoạt động hệ thống",
      icon: Settings,
      action: "Cài đặt"
    },
    {
      title: "Thống kê theo khu vực",
      description: "Phân tích nguồn nhân lực theo địa bàn",
      icon: MapPin,
      action: "Xem chi tiết"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">HY</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">
                  Bảng điều khiển Quản trị viên
                </h1>
                <p className="text-sm text-muted-foreground">UBND Tỉnh Hưng Yên</p>
              </div>
            </div>
            <Button variant="outline">Đăng xuất</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Chào mừng, Quản trị viên
          </h2>
          <p className="text-muted-foreground">
            Tổng quan về tình hình nguồn nhân lực tỉnh Hưng Yên
          </p>
        </div>

        {/* Main Content with Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Tổng quan</span>
            </TabsTrigger>
            <TabsTrigger value="charts" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Biểu đồ</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center space-x-2">
              <Map className="w-4 h-4" />
              <span>Bản đồ</span>
            </TabsTrigger>
            <TabsTrigger value="ai-bot" className="flex items-center space-x-2">
              <Bot className="w-4 h-4" />
              <span>AI Bot</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.title} className="bg-gradient-to-br from-card to-muted/20 shadow-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                          <p className={`text-sm font-medium ${stat.color}`}>{stat.change}</p>
                        </div>
                        <Icon className={`w-8 h-8 ${stat.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Card key={action.title} className="group hover:shadow-elegant transition-all duration-300 cursor-pointer bg-gradient-to-br from-card to-muted/20">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{action.title}</CardTitle>
                          <CardDescription>{action.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        {action.action}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Recent Activity */}
            <Card className="bg-gradient-to-br from-card to-muted/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Hoạt động gần đây</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    "Công ty TNHH ABC đã đăng 3 tin tuyển dụng mới",
                    "Phê duyệt báo cáo lao động Q4/2024 từ Sở Lao động",
                    "Cập nhật thông tin 125 hồ sơ người lao động",
                    "Xác thực thông tin 8 doanh nghiệp mới đăng ký"
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <p className="text-sm text-foreground flex-1">{activity}</p>
                      <span className="text-xs text-muted-foreground">
                        {index + 1}h trước
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="charts" className="space-y-6">
            <DashboardCharts />
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <HungYenLaborMap />
          </TabsContent>

          <TabsContent value="ai-bot" className="space-y-6">
            <NGSCAIBot />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;