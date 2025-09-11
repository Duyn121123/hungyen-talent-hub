import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Users,
  UserPlus,
  UserCheck,
  Calendar,
  FileText,
  LogOut,
  User,
  Plus,
  Eye,
  Edit,
  Trash,
  Search,
  MapPin,
  Briefcase,
  GraduationCap,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Building2
} from "lucide-react";

const CommuneManagement = () => {
  const navigate = useNavigate();

  const communeStats = [
    {
      title: "Tổng số lao động đã đăng ký",
      value: "2,456",
      change: "+12",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Lao động thiếu việc làm",
      value: "189",
      change: "-8",
      icon: AlertCircle,
      color: "text-orange-600"
    },
    {
      title: "Đăng ký mới tuần này",
      value: "23",
      change: "+5",
      icon: UserPlus,
      color: "text-green-600"
    },
    {
      title: "Kết nối việc làm thành công",
      value: "145",
      change: "+18",
      icon: CheckCircle,
      color: "text-purple-600"
    }
  ];

  const workers = [
    {
      id: "NLD001",
      name: "Nguyễn Văn An",
      age: 28,
      phone: "0987654321",
      skills: "Thợ hàn điện tử",
      education: "Trung cấp nghề",
      status: "Thiếu việc làm",
      registrationDate: "15/12/2024"
    },
    {
      id: "NLD002", 
      name: "Trần Thị Bình",
      age: 25,
      phone: "0976543210",
      skills: "Kế toán",
      education: "Cao đẳng",
      status: "Đã có việc làm",
      registrationDate: "10/12/2024"
    },
    {
      id: "NLD003",
      name: "Lê Minh Cường",
      age: 32,
      phone: "0965432109",
      skills: "Lái xe, vận chuyển", 
      education: "Trung học phổ thông",
      status: "Thiếu việc làm",
      registrationDate: "08/12/2024"
    }
  ];

  const jobFairs = [
    {
      title: "Phiên giao dịch việc làm tháng 1/2025",
      date: "15/01/2025",
      location: "UBND Xã Đức Chính",
      companies: 12,
      jobs: 45,
      status: "Đang chuẩn bị"
    },
    {
      title: "Kết nối việc làm nông nghiệp",
      date: "28/12/2024",
      location: "Trung tâm văn hóa xã",
      companies: 8,
      jobs: 32,
      status: "Đã hoàn thành"
    }
  ];

  const pendingApplications = [
    {
      id: "HS001",
      name: "Phạm Văn Đức",
      submitDate: "20/12/2024",
      documents: ["CCCD", "Bằng cấp", "CV"],
      status: "Chờ xét duyệt",
      priority: "Cao"
    },
    {
      id: "HS002",
      name: "Hoàng Thị Em",
      submitDate: "18/12/2024", 
      documents: ["CCCD", "Chứng chỉ", "Sơ yếu lý lịch"],
      status: "Cần bổ sung",
      priority: "Thấp"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                UBND Xã Đức Chính - Quản lý Lao động Địa phương
              </h1>
              <p className="text-muted-foreground">Dashboard quản lý cấp xã</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>canbo@ducchinh.hungyen.gov.vn</span>
              </div>
              <Button variant="outline" className="flex items-center space-x-2" onClick={() => navigate("/")}>
                <LogOut className="w-4 h-4" />
                <span>Đăng xuất</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {communeStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={stat.change.startsWith('+') ? "text-green-600" : "text-red-600"}>
                    {stat.change}
                  </span> so với tuần trước
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="registration" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="registration">Hỗ trợ đăng ký NLĐ</TabsTrigger>
            <TabsTrigger value="management">Quản lý dữ liệu lao động</TabsTrigger>
            <TabsTrigger value="jobfairs">Phiên giao dịch việc làm</TabsTrigger>
            <TabsTrigger value="applications">Xử lý hồ sơ</TabsTrigger>
          </TabsList>

          {/* Hỗ trợ đăng ký NLĐ */}
          <TabsContent value="registration" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <UserPlus className="w-5 h-5" />
                    <span>Đăng ký lao động mới</span>
                  </CardTitle>
                  <CardDescription>
                    Hướng dẫn và hỗ trợ người lao động đăng ký hồ sơ
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full mb-4">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Đăng ký lao động mới
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Đăng ký thông tin người lao động</DialogTitle>
                        <DialogDescription>
                          Nhập thông tin cơ bản của người lao động
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="fullname">Họ và tên *</Label>
                          <Input id="fullname" placeholder="Nguyễn Văn A" />
                        </div>
                        <div>
                          <Label htmlFor="cccd">Số CCCD *</Label>
                          <Input id="cccd" placeholder="001234567890" />
                        </div>
                        <div>
                          <Label htmlFor="birthdate">Ngày sinh</Label>
                          <Input id="birthdate" type="date" />
                        </div>
                        <div>
                          <Label htmlFor="phone">Số điện thoại *</Label>
                          <Input id="phone" placeholder="0987654321" />
                        </div>
                        <div>
                          <Label htmlFor="education">Trình độ học vấn</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn trình độ" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="thpt">Trung học phổ thông</SelectItem>
                              <SelectItem value="college">Cao đẳng</SelectItem>
                              <SelectItem value="university">Đại học</SelectItem>
                              <SelectItem value="vocational">Trung cấp nghề</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="skills">Kỹ năng chính</Label>
                          <Input id="skills" placeholder="Ví dụ: Thợ hàn, Kế toán..." />
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor="address">Địa chỉ</Label>
                          <Textarea id="address" placeholder="Địa chỉ chi tiết" />
                        </div>
                        <div className="col-span-2 flex space-x-2">
                          <Button className="flex-1">Đăng ký</Button>
                          <Button variant="outline" className="flex-1">Hủy</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Thống kê đăng ký</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 border rounded">
                        <div className="text-lg font-bold">23</div>
                        <div className="text-sm text-muted-foreground">Tuần này</div>
                      </div>
                      <div className="text-center p-3 border rounded">
                        <div className="text-lg font-bold">89</div>
                        <div className="text-sm text-muted-foreground">Tháng này</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Hướng dẫn tư vấn nghề nghiệp</span>
                  </CardTitle>
                  <CardDescription>
                    Công cụ hỗ trợ tư vấn định hướng nghề nghiệp
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg bg-muted/50">
                      <h5 className="font-medium mb-2">Công cụ định hướng kỹ năng</h5>
                      <p className="text-sm text-muted-foreground mb-3">
                        Đánh giá kỹ năng hiện tại và đề xuất hướng phát triển
                      </p>
                      <Button size="sm" variant="outline">
                        <Search className="w-4 h-4 mr-2" />
                        Khởi chạy công cụ
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-medium">Tài liệu hướng dẫn</h5>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between p-2 border rounded text-sm">
                          <span>Hướng dẫn lập CV hiệu quả</span>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded text-sm">
                          <span>Kỹ năng phỏng vấn cơ bản</span>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded text-sm">
                          <span>Xu hướng nghề nghiệp 2025</span>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Quản lý dữ liệu lao động */}
          <TabsContent value="management" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Cơ sở dữ liệu lao động địa phương</span>
                </CardTitle>
                <CardDescription>
                  Quản lý thông tin người lao động tại xã
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <Input placeholder="Tìm kiếm theo tên, ID..." className="w-64" />
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        <SelectItem value="employed">Đã có việc làm</SelectItem>
                        <SelectItem value="unemployed">Thiếu việc làm</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline">
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Xuất báo cáo
                  </Button>
                </div>

                <div className="border rounded-lg">
                  <div className="grid grid-cols-8 gap-4 p-3 bg-muted/50 font-medium text-sm">
                    <div>ID</div>
                    <div>Họ tên</div>
                    <div>Tuổi</div>
                    <div>Liên hệ</div>
                    <div>Kỹ năng</div>
                    <div>Trình độ</div>
                    <div>Trạng thái</div>
                    <div>Hành động</div>
                  </div>
                  
                  {workers.map((worker) => (
                    <div key={worker.id} className="grid grid-cols-8 gap-4 p-3 border-t text-sm">
                      <div className="font-medium">{worker.id}</div>
                      <div>{worker.name}</div>
                      <div>{worker.age}</div>
                      <div>{worker.phone}</div>
                      <div>{worker.skills}</div>
                      <div>{worker.education}</div>
                      <div>
                        <Badge variant={worker.status === "Đã có việc làm" ? "default" : "destructive"}>
                          {worker.status}
                        </Badge>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Phiên giao dịch việc làm */}
          <TabsContent value="jobfairs" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Lên kế hoạch phiên giao dịch</span>
                  </CardTitle>
                  <CardDescription>
                    Tổ chức các phiên giao dịch việc làm địa phương
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full mb-4">
                        <Plus className="w-4 h-4 mr-2" />
                        Tạo phiên giao dịch mới
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Tạo phiên giao dịch việc làm</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="event-title">Tên sự kiện</Label>
                          <Input id="event-title" placeholder="Ví dụ: Phiên giao dịch việc làm tháng 2" />
                        </div>
                        <div>
                          <Label htmlFor="event-date">Ngày tổ chức</Label>
                          <Input id="event-date" type="date" />
                        </div>
                        <div>
                          <Label htmlFor="event-location">Địa điểm</Label>
                          <Input id="event-location" placeholder="Ví dụ: UBND Xã Đức Chính" />
                        </div>
                        <div>
                          <Label htmlFor="event-desc">Mô tả</Label>
                          <Textarea id="event-desc" placeholder="Mô tả chi tiết về sự kiện" />
                        </div>
                        <Button className="w-full">Tạo sự kiện</Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <div className="space-y-3">
                    <h4 className="font-medium">Thống kê hiệu quả</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 border rounded">
                        <div className="text-lg font-bold">145</div>
                        <div className="text-sm text-muted-foreground">Kết nối thành công</div>
                      </div>
                      <div className="text-center p-3 border rounded">
                        <div className="text-lg font-bold">89%</div>
                        <div className="text-sm text-muted-foreground">Tỷ lệ thành công</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>Phiên giao dịch sắp tới</span>
                  </CardTitle>
                  <CardDescription>
                    Danh sách các sự kiện đã lên kế hoạch
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {jobFairs.map((fair, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">{fair.title}</h5>
                          <Badge variant={fair.status === "Đã hoàn thành" ? "default" : "secondary"}>
                            {fair.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {fair.date}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {fair.location}
                          </div>
                          <div className="flex items-center">
                            <Building2 className="w-3 h-3 mr-1" />
                            {fair.companies} doanh nghiệp • {fair.jobs} việc làm
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-3">
                          <Button variant="outline" size="sm">
                            <Eye className="w-3 h-3 mr-1" />
                            Chi tiết
                          </Button>
                          {fair.status !== "Đã hoàn thành" && (
                            <Button variant="outline" size="sm">
                              <Edit className="w-3 h-3 mr-1" />
                              Chỉnh sửa
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Xử lý hồ sơ */}
          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Hồ sơ chờ xét duyệt</span>
                </CardTitle>
                <CardDescription>
                  Kiểm tra và xét duyệt hồ sơ lao động mới
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingApplications.map((app) => (
                    <div key={app.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h5 className="font-medium">{app.name}</h5>
                          <p className="text-sm text-muted-foreground">
                            Mã hồ sơ: {app.id} • Nộp ngày: {app.submitDate}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={app.priority === "Cao" ? "destructive" : "secondary"}>
                            {app.priority}
                          </Badge>
                          <Badge variant={app.status === "Chờ xét duyệt" ? "secondary" : "destructive"}>
                            {app.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-sm font-medium mb-1">Tài liệu đã nộp:</p>
                        <div className="flex flex-wrap gap-2">
                          {app.documents.map((doc, index) => (
                            <Badge key={index} variant="outline">{doc}</Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="default">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Phê duyệt
                        </Button>
                        <Button size="sm" variant="outline">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Yêu cầu bổ sung
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3 mr-1" />
                          Xem chi tiết
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Đang hiển thị 2 hồ sơ chờ xử lý
                  </p>
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Xem tất cả hồ sơ
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CommuneManagement;