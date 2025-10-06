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
import DashboardCharts from "./DashboardCharts";
import {
  Users,
  Building2,
  BriefcaseIcon,
  TrendingUp,
  Settings,
  Database,
  BarChart3,
  Network,
  UserCheck,
  LogOut,
  User,
  Plus,
  Eye,
  Edit,
  Trash,
  FileText,
  MapPin,
  GraduationCap,
  Briefcase,
  Brain,
  Loader2
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ProvinceManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAIAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const laborData = {
        totalWorkers: 284567,
        totalCommunes: 162,
        totalEnterprises: 3245,
        activeJobs: 1893,
        unemploymentRate: 2.8,
        industries: categories.map(cat => ({
          name: cat.name,
          jobs: cat.jobs,
          workers: cat.workers
        }))
      };

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-labor-allocation`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            laborData,
            districts: communes.map(c => ({
              name: c.name,
              workers: c.workers,
              unemployed: c.unemployed,
              newRegistrations: c.newRegistrations
            }))
          })
        }
      );

      if (!response.ok) {
        throw new Error('Lỗi khi phân tích dữ liệu');
      }

      const data = await response.json();
      setAiAnalysis(data.analysis);
      
      toast({
        title: "Phân tích hoàn tất",
        description: "AI đã phân tích và đưa ra đề xuất phân bổ lao động",
      });
    } catch (error) {
      console.error('Error analyzing labor:', error);
      toast({
        title: "Lỗi phân tích",
        description: "Không thể thực hiện phân tích. Vui lòng thử lại sau.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const provinceStats = [
    {
      title: "Tổng số lao động toàn tỉnh",
      value: "284,567",
      change: "+5.2%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Số xã/phường quản lý",
      value: "162",
      change: "100%",
      icon: MapPin,
      color: "text-green-600"
    },
    {
      title: "Doanh nghiệp đã xác thực",
      value: "3,245",
      change: "+12.8%",
      icon: Building2,
      color: "text-purple-600"
    },
    {
      title: "Tin tuyển dụng đang hiệu lực",
      value: "1,893",
      change: "+18.3%",
      icon: BriefcaseIcon,
      color: "text-orange-600"
    }
  ];

  const categories = [
    {
      name: "Công nghệ thông tin",
      jobs: 245,
      workers: 1520,
      status: "Hoạt động"
    },
    {
      name: "Sản xuất - Chế tạo",
      jobs: 892,
      workers: 12450,
      status: "Hoạt động"
    },
    {
      name: "Dịch vụ - Du lịch",
      jobs: 156,
      workers: 3200,
      status: "Hoạt động"
    },
    {
      name: "Nông nghiệp",
      jobs: 78,
      workers: 25600,
      status: "Hoạt động"
    }
  ];

  const communes = [
    {
      name: "Phường Hiến Nam",
      workers: 2450,
      unemployed: 125,
      newRegistrations: 23,
      status: "Hoạt động tốt"
    },
    {
      name: "Xã Đức Chính",
      workers: 1890,
      unemployed: 89,
      newRegistrations: 15,
      status: "Hoạt động tốt"
    },
    {
      name: "Xã Tân Vinh",
      workers: 1650,
      unemployed: 156,
      newRegistrations: 31,
      status: "Cần hỗ trợ"
    }
  ];

  const reports = [
    {
      title: "Báo cáo tình hình lao động tháng 12/2024",
      date: "01/01/2025",
      status: "Đã hoàn thành",
      type: "Định kỳ"
    },
    {
      title: "Dự báo nhu cầu lao động quý I/2025",
      date: "28/12/2024",
      status: "Đang xử lý",
      type: "Dự báo"
    },
    {
      title: "Báo cáo hiệu quả kết nối việc làm",
      date: "25/12/2024",
      status: "Đã hoàn thành",
      type: "Chuyên đề"
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
                Sở Nội Vụ - Quản lý Lao động Việc làm Tỉnh Hưng Yên
              </h1>
              <p className="text-muted-foreground">Dashboard quản trị cấp tỉnh</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>giamdoc@noivuhungyen.gov.vn</span>
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
          {provinceStats.map((stat, index) => (
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
                  <span className="text-green-600">{stat.change}</span> so với tháng trước
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="system" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="system">Quản trị hệ thống</TabsTrigger>
            <TabsTrigger value="categories">Quản lý danh mục</TabsTrigger>
            <TabsTrigger value="reports">Báo cáo thống kê</TabsTrigger>
            <TabsTrigger value="monitoring">Giám sát kết nối</TabsTrigger>
            <TabsTrigger value="support">Điều phối hỗ trợ</TabsTrigger>
            <TabsTrigger value="ai-analysis">Phân tích AI</TabsTrigger>
          </TabsList>

          {/* Quản trị hệ thống */}
          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>Quản lý tài khoản người dùng</span>
                  </CardTitle>
                  <CardDescription>
                    Đăng ký và phân quyền tài khoản cho các cấp
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Tài khoản cấp tỉnh: <strong>12</strong></span>
                    <Badge variant="outline">Hoạt động</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Tài khoản cấp xã: <strong>162</strong></span>
                    <Badge variant="outline">Hoạt động</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Tài khoản doanh nghiệp: <strong>3,245</strong></span>
                    <Badge variant="outline">Hoạt động</Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Thêm tài khoản
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Tạo tài khoản mới</DialogTitle>
                          <DialogDescription>
                            Tạo tài khoản và phân quyền cho người dùng
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="email@example.com" />
                          </div>
                          <div>
                            <Label htmlFor="role">Vai trò</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn vai trò" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="province">Cấp tỉnh</SelectItem>
                                <SelectItem value="commune">Cấp xã</SelectItem>
                                <SelectItem value="enterprise">Doanh nghiệp</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="location">Địa bàn</Label>
                            <Input id="location" placeholder="Tên xã/phường (nếu có)" />
                          </div>
                          <Button className="w-full">Tạo tài khoản</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Xem tất cả
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="w-5 h-5" />
                    <span>Cấu hình hệ thống</span>
                  </CardTitle>
                  <CardDescription>
                    Thiết lập các tham số chung của hệ thống
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Chu kỳ báo cáo định kỳ</Label>
                    <Select defaultValue="monthly">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Hàng tuần</SelectItem>
                        <SelectItem value="monthly">Hàng tháng</SelectItem>
                        <SelectItem value="quarterly">Hàng quý</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Thời gian lưu trữ dữ liệu (năm)</Label>
                    <Input defaultValue="5" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email thông báo hệ thống</Label>
                    <Input defaultValue="admin@noivuhungyen.gov.vn" />
                  </div>
                  <Button>Lưu cấu hình</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Quản lý danh mục */}
          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Briefcase className="w-5 h-5" />
                    <span>Danh mục ngành nghề</span>
                  </CardTitle>
                  <CardDescription>
                    Quản lý danh sách các ngành nghề và vị trí việc làm
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categories.map((category, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{category.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {category.jobs} việc làm • {category.workers} lao động
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{category.status}</Badge>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Thêm ngành nghề
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Thêm ngành nghề mới</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="industry-name">Tên ngành nghề</Label>
                            <Input id="industry-name" placeholder="Ví dụ: Công nghệ thông tin" />
                          </div>
                          <div>
                            <Label htmlFor="industry-desc">Mô tả</Label>
                            <Textarea id="industry-desc" placeholder="Mô tả chi tiết về ngành nghề" />
                          </div>
                          <Button className="w-full">Thêm ngành nghề</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Xem tất cả
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <GraduationCap className="w-5 h-5" />
                    <span>Danh mục trình độ đào tạo</span>
                  </CardTitle>
                  <CardDescription>
                    Quản lý các mức độ trình độ và chứng chỉ
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Đại học</div>
                        <div className="text-sm text-muted-foreground">Bằng cử nhân trở lên</div>
                      </div>
                      <Badge variant="outline">Hoạt động</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Cao đẳng</div>
                        <div className="text-sm text-muted-foreground">Bằng cao đẳng</div>
                      </div>
                      <Badge variant="outline">Hoạt động</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Trung cấp nghề</div>
                        <div className="text-sm text-muted-foreground">Chứng chỉ trung cấp nghề</div>
                      </div>
                      <Badge variant="outline">Hoạt động</Badge>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Thêm trình độ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Báo cáo thống kê */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Biểu đồ phân tích đa chiều</span>
                  </CardTitle>
                  <CardDescription>
                    Phân tích dữ liệu theo ngành nghề, địa bàn, xu hướng
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DashboardCharts />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Báo cáo định kỳ</span>
                  </CardTitle>
                  <CardDescription>
                    Quản lý các báo cáo định kỳ và theo yêu cầu
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {reports.map((report, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{report.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {report.date} • {report.type}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={report.status === "Đã hoàn thành" ? "default" : "secondary"}>
                            {report.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Tạo báo cáo mới
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Giám sát kết nối */}
          <TabsContent value="monitoring" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Network className="w-5 h-5" />
                  <span>Theo dõi luồng thông tin cung - cầu lao động</span>
                </CardTitle>
                <CardDescription>
                  Giám sát hoạt động kết nối việc làm trên toàn tỉnh
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 border rounded-lg">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold">1,247</div>
                    <div className="text-sm text-muted-foreground">Kết nối thành công tháng này</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold">3,892</div>
                    <div className="text-sm text-muted-foreground">Lượt truy cập hệ thống</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Building2 className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <div className="text-2xl font-bold">156</div>
                    <div className="text-sm text-muted-foreground">Doanh nghiệp tham gia</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium">Hoạt động gần đây</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">Phiên giao dịch việc làm tại Xã Đức Chính</span>
                      <Badge variant="outline">15 kết nối</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">Doanh nghiệp ABC Company đăng 5 tin tuyển dụng</span>
                      <Badge variant="outline">Mới</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">127 hồ sơ lao động được cập nhật</span>
                      <Badge variant="outline">Hôm nay</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Điều phối hỗ trợ */}
          <TabsContent value="support" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <UserCheck className="w-5 h-5" />
                    <span>Hỗ trợ các xã/phường</span>
                  </CardTitle>
                  <CardDescription>
                    Theo dõi và hỗ trợ hoạt động của các cơ quan địa phương
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {communes.map((commune, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{commune.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {commune.workers} lao động • {commune.unemployed} thiếu việc làm • {commune.newRegistrations} đăng ký mới
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={commune.status === "Hoạt động tốt" ? "default" : "destructive"}>
                            {commune.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Lên kế hoạch hỗ trợ
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Hướng dẫn nghiệp vụ</span>
                  </CardTitle>
                  <CardDescription>
                    Tài liệu hướng dẫn và quy trình cho cán bộ xã
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Quy trình đăng ký lao động</div>
                        <div className="text-sm text-muted-foreground">Cập nhật: 15/12/2024</div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Hướng dẫn tổ chức phiên giao dịch việc làm</div>
                        <div className="text-sm text-muted-foreground">Cập nhật: 10/12/2024</div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Quy định pháp lý mới nhất</div>
                        <div className="text-sm text-muted-foreground">Cập nhật: 05/12/2024</div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Thêm tài liệu
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Phân tích AI */}
          <TabsContent value="ai-analysis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5" />
                  <span>Phân tích và đề xuất phân bổ lao động</span>
                </CardTitle>
                <CardDescription>
                  Sử dụng AI để phân tích dữ liệu lao động và đưa ra đề xuất phân bổ tối ưu
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Dữ liệu sẵn sàng để phân tích</p>
                    <p className="text-sm text-muted-foreground">
                      {provinceStats[0].value} lao động • {provinceStats[1].value} xã/phường • {categories.length} ngành nghề
                    </p>
                  </div>
                  <Button 
                    onClick={handleAIAnalysis} 
                    disabled={isAnalyzing}
                    size="lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Đang phân tích...
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4 mr-2" />
                        Bắt đầu phân tích
                      </>
                    )}
                  </Button>
                </div>

                {aiAnalysis && (
                  <div className="space-y-4">
                    <div className="border-t pt-4">
                      <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
                        <BarChart3 className="w-5 h-5" />
                        <span>Kết quả phân tích</span>
                      </h3>
                      <div className="prose prose-sm max-w-none bg-muted p-6 rounded-lg">
                        <div className="whitespace-pre-wrap">{aiAnalysis}</div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={handleAIAnalysis}>
                        <Brain className="w-4 h-4 mr-2" />
                        Phân tích lại
                      </Button>
                      <Button variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        Xuất báo cáo
                      </Button>
                    </div>
                  </div>
                )}

                {!aiAnalysis && !isAnalyzing && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Nhấn nút "Bắt đầu phân tích" để AI phân tích dữ liệu lao động</p>
                    <p className="text-sm mt-2">AI sẽ phân tích xu hướng, đề xuất phân bổ và dự báo nhu cầu</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProvinceManagement;