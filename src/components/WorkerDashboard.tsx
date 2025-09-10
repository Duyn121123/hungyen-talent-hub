import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  User, 
  Bell,
  BookOpen,
  TrendingUp,
  MapPin,
  DollarSign,
  Clock,
  FileText,
  Heart,
  Send,
  Eye,
  Building2,
  Brain,
  LogOut
} from "lucide-react";
import CVAnalyzer from "./CVAnalyzer";

const WorkerDashboard = () => {
  const userStats = [
    {
      title: "Hồ sơ đã nộp",
      value: "8",
      icon: Send,
      color: "text-primary"
    },
    {
      title: "Việc làm quan tâm",
      value: "24",
      icon: Heart,
      color: "text-secondary"
    },
    {
      title: "Lời mời phỏng vấn",
      value: "3",
      icon: Bell,
      color: "text-accent"
    },
    {
      title: "Hồ sơ được xem",
      value: "156",
      icon: Eye,
      color: "text-gov-green"
    }
  ];

  const recommendedJobs = [
    {
      title: "Kỹ sư phần mềm Frontend",
      company: "Công ty TNHH Tech ABC",
      location: "Hưng Yên",
      salary: "18-25 triệu",
      postedDate: "2 ngày trước",
      match: "95%"
    },
    {
      title: "Nhà phát triển Full-stack",
      company: "Công ty CP Phần mềm XYZ",
      location: "Hưng Yên",
      salary: "20-30 triệu",
      postedDate: "1 tuần trước",
      match: "88%"
    },
    {
      title: "Product Manager",
      company: "Startup Digital DEF",
      location: "Hưng Yên",
      salary: "25-35 triệu",
      postedDate: "3 ngày trước",
      match: "82%"
    }
  ];

  const applicationStatus = [
    {
      company: "Công ty TNHH Tech ABC",
      position: "Kỹ sư phần mềm",
      status: "Chờ phỏng vấn",
      appliedDate: "15/01/2024",
      statusColor: "bg-yellow-100 text-yellow-800"
    },
    {
      company: "Công ty CP Software XYZ",
      position: "Frontend Developer",
      status: "Đang xem xét",
      appliedDate: "12/01/2024",
      statusColor: "bg-blue-100 text-blue-800"
    },
    {
      company: "Startup AI GHI",
      position: "Data Scientist",
      status: "Đã từ chối",
      appliedDate: "08/01/2024",
      statusColor: "bg-red-100 text-red-800"
    }
  ];

  const marketInsights = [
    {
      title: "Ngành IT",
      demand: "Cao",
      avgSalary: "20-35 triệu",
      growth: "+15%"
    },
    {
      title: "Marketing",
      demand: "Trung bình",
      avgSalary: "12-20 triệu",
      growth: "+8%"
    },
    {
      title: "Kế toán",
      demand: "Ổn định",
      avgSalary: "10-18 triệu",
      growth: "+3%"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-secondary rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">
                  Cổng Người lao động
                </h1>
                <p className="text-sm text-muted-foreground">Nguyễn Văn A</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button>
                <Search className="w-4 h-4 mr-2" />
                Tìm việc làm
              </Button>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>nguyenvana@email.com</span>
              </div>
              <Button variant="outline" className="flex items-center space-x-2">
                <LogOut className="w-4 h-4" />
                <span>Đăng xuất</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Xin chào, Nguyễn Văn A
          </h2>
          <p className="text-muted-foreground">
            Khám phá cơ hội nghề nghiệp và phát triển sự nghiệp của bạn
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {userStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="bg-gradient-to-br from-card to-muted/20 shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CV Analyzer Section */}
        <div className="mb-8">
          <CVAnalyzer />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recommended Jobs */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-card to-muted/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Việc làm phù hợp với bạn</CardTitle>
                  <Button variant="outline" size="sm">
                    <Search className="w-4 h-4 mr-2" />
                    Tìm thêm
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedJobs.map((job, index) => (
                    <div key={index} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-foreground">{job.title}</h4>
                            <Badge variant="secondary">{job.match} phù hợp</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{job.company}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {job.location}
                            </span>
                            <span className="flex items-center">
                              <DollarSign className="w-3 h-3 mr-1" />
                              {job.salary}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {job.postedDate}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm">
                          <Send className="w-3 h-3 mr-1" />
                          Ứng tuyển
                        </Button>
                        <Button variant="outline" size="sm">
                          <Heart className="w-3 h-3 mr-1" />
                          Lưu
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3 mr-1" />
                          Chi tiết
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Application Status */}
          <div>
            <Card className="bg-gradient-to-br from-card to-muted/20 mb-6">
              <CardHeader>
                <CardTitle>Trạng thái ứng tuyển</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {applicationStatus.map((app, index) => (
                    <div key={index} className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs text-muted-foreground">{app.appliedDate}</div>
                        <Badge className={app.statusColor}>{app.status}</Badge>
                      </div>
                      <h5 className="font-medium text-sm text-foreground">{app.position}</h5>
                      <p className="text-xs text-muted-foreground">{app.company}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Market Insights */}
            <Card className="bg-gradient-to-br from-card to-muted/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Thị trường lao động</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {marketInsights.map((insight, index) => (
                    <div key={index} className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="font-medium text-sm text-foreground">{insight.title}</h5>
                        <Badge variant={insight.demand === "Cao" ? "default" : "secondary"}>
                          {insight.demand}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>Lương TB: {insight.avgSalary}</div>
                        <div>Tăng trưởng: {insight.growth}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-foreground mb-4">Hành động nhanh</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="group hover:shadow-elegant transition-all duration-300 cursor-pointer bg-gradient-to-br from-card to-muted/20">
              <CardContent className="p-6 text-center">
                <FileText className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h4 className="font-semibold text-foreground mb-2">Cập nhật hồ sơ</h4>
                <p className="text-sm text-muted-foreground">Hoàn thiện thông tin</p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-elegant transition-all duration-300 cursor-pointer bg-gradient-to-br from-card to-muted/20">
              <CardContent className="p-6 text-center">
                <Search className="w-12 h-12 mx-auto mb-4 text-secondary" />
                <h4 className="font-semibold text-foreground mb-2">Tìm việc</h4>
                <p className="text-sm text-muted-foreground">Khám phá cơ hội mới</p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-elegant transition-all duration-300 cursor-pointer bg-gradient-to-br from-card to-muted/20">
              <CardContent className="p-6 text-center">
                <Brain className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h4 className="font-semibold text-foreground mb-2">Phân tích CV</h4>
                <p className="text-sm text-muted-foreground">AI phân tích & đề xuất</p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-elegant transition-all duration-300 cursor-pointer bg-gradient-to-br from-card to-muted/20">
              <CardContent className="p-6 text-center">
                <Building2 className="w-12 h-12 mx-auto mb-4 text-gov-green" />
                <h4 className="font-semibold text-foreground mb-2">Khảo sát</h4>
                <p className="text-sm text-muted-foreground">Tham gia khảo sát</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;