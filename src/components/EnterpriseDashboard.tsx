import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import JobPostingForm from "./JobPostingForm";
import { 
  Plus, 
  Search, 
  Users, 
  Eye,
  Edit,
  Calendar,
  MapPin,
  DollarSign,
  Building2,
  Mail,
  FileText
} from "lucide-react";

const EnterpriseDashboard = () => {
  const companyStats = [
    {
      title: "Tin tuyển dụng đang đăng",
      value: "12",
      icon: FileText,
      color: "text-primary"
    },
    {
      title: "Ứng viên quan tâm",
      value: "84",
      icon: Users,
      color: "text-secondary"
    },
    {
      title: "Hồ sơ đã nhận",
      value: "156",
      icon: Mail,
      color: "text-accent"
    },
    {
      title: "Đã tuyển dụng",
      value: "23",
      icon: Building2,
      color: "text-gov-green"
    }
  ];

  const jobPostings = [
    {
      title: "Kỹ sư phần mềm",
      location: "Hưng Yên",
      salary: "15-25 triệu",
      status: "Đang tuyển",
      applications: 45,
      postedDate: "2024-01-15"
    },
    {
      title: "Nhân viên kinh doanh",
      location: "Hưng Yên",
      salary: "8-15 triệu",
      status: "Sắp hết hạn",
      applications: 32,
      postedDate: "2024-01-10"
    },
    {
      title: "Kế toán trưởng",
      location: "Hưng Yên",
      salary: "20-30 triệu",
      status: "Đang tuyển",
      applications: 18,
      postedDate: "2024-01-20"
    }
  ];

  const recentApplications = [
    {
      name: "Nguyễn Văn A",
      position: "Kỹ sư phần mềm",
      experience: "3 năm",
      status: "Chờ phỏng vấn"
    },
    {
      name: "Trần Thị B",
      position: "Nhân viên kinh doanh",
      experience: "2 năm",
      status: "Đã phỏng vấn"
    },
    {
      name: "Lê Văn C",
      position: "Kế toán trưởng",
      experience: "5 năm",
      status: "Mới nộp"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">
                  Cổng Doanh nghiệp
                </h1>
                <p className="text-sm text-muted-foreground">Công ty TNHH ABC</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <JobPostingForm />
              <Button variant="outline">Đăng xuất</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Chào mừng đến với Cổng Doanh nghiệp
          </h2>
          <p className="text-muted-foreground">
            Quản lý tuyển dụng và tìm kiếm nhân tài cho doanh nghiệp của bạn
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {companyStats.map((stat) => {
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Job Postings */}
          <Card className="bg-gradient-to-br from-card to-muted/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Tin tuyển dụng của bạn</CardTitle>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Xem tất cả
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobPostings.map((job, index) => (
                  <div key={index} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{job.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {job.location}
                          </span>
                          <span className="flex items-center">
                            <DollarSign className="w-3 h-3 mr-1" />
                            {job.salary}
                          </span>
                        </div>
                      </div>
                      <Badge variant={job.status === "Đang tuyển" ? "default" : "destructive"}>
                        {job.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {job.applications} ứng viên
                      </span>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-3 h-3 mr-1" />
                          Sửa
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3 mr-1" />
                          Xem
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Applications */}
          <Card className="bg-gradient-to-br from-card to-muted/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Ứng viên mới nhất</CardTitle>
                <Button variant="outline" size="sm">
                  <Search className="w-4 h-4 mr-2" />
                  Tìm ứng viên
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((application, index) => (
                  <div key={index} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-foreground">{application.name}</h4>
                        <p className="text-sm text-muted-foreground">{application.position}</p>
                        <p className="text-xs text-muted-foreground">Kinh nghiệm: {application.experience}</p>
                      </div>
                      <Badge variant="secondary">{application.status}</Badge>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <Button variant="outline" size="sm">
                        <Eye className="w-3 h-3 mr-1" />
                        Xem hồ sơ
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="w-3 h-3 mr-1" />
                        Liên hệ
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-foreground mb-4">Thao tác nhanh</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <JobPostingForm 
              trigger={
                <Card className="group hover:shadow-elegant transition-all duration-300 cursor-pointer bg-gradient-to-br from-card to-muted/20">
                  <CardContent className="p-6 text-center">
                    <Plus className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <h4 className="font-semibold text-foreground mb-2">Đăng tin mới</h4>
                    <p className="text-sm text-muted-foreground">Tạo tin tuyển dụng mới</p>
                  </CardContent>
                </Card>
              }
            />
            
            <Card className="group hover:shadow-elegant transition-all duration-300 cursor-pointer bg-gradient-to-br from-card to-muted/20">
              <CardContent className="p-6 text-center">
                <Search className="w-12 h-12 mx-auto mb-4 text-secondary" />
                <h4 className="font-semibold text-foreground mb-2">Tìm ứng viên</h4>
                <p className="text-sm text-muted-foreground">Tìm kiếm nhân tài phù hợp</p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-elegant transition-all duration-300 cursor-pointer bg-gradient-to-br from-card to-muted/20">
              <CardContent className="p-6 text-center">
                <FileText className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h4 className="font-semibold text-foreground mb-2">Báo cáo</h4>
                <p className="text-sm text-muted-foreground">Xem báo cáo tuyển dụng</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseDashboard;