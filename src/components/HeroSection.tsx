import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, UserCheck, MapPin, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  
  const userTypes = [
    {
      title: "Quản trị viên",
      subtitle: "UBND Tỉnh & Cơ quan quản lý",
      description: "Xem báo cáo tổng hợp, thống kê nguồn nhân lực toàn tỉnh",
      icon: UserCheck,
      variant: "admin" as const,
      route: "/admin"
    },
    {
      title: "Sở Nội Vụ",
      subtitle: "Quản lý cấp tỉnh",
      description: "Quản trị hệ thống, danh mục, báo cáo và điều phối hỗ trợ",
      icon: Building2,
      variant: "province" as const,
      route: "/province"
    },
    {
      title: "UBND Xã/Phường",
      subtitle: "Quản lý cấp xã",
      description: "Hỗ trợ đăng ký NLĐ, tổ chức phiên giao dịch việc làm",
      icon: Home,
      variant: "commune" as const,
      route: "/commune"
    },
    {
      title: "Doanh nghiệp",
      subtitle: "Đơn vị tuyển dụng",
      description: "Đăng tin tuyển dụng, tìm kiếm ứng viên phù hợp",
      icon: MapPin,
      variant: "enterprise" as const,
      route: "/enterprise"
    },
    {
      title: "Người lao động",
      subtitle: "Ứng viên tìm việc",
      description: "Tạo hồ sơ, tìm việc làm và cơ hội nghề nghiệp",
      icon: Users,
      variant: "worker" as const,
      route: "/worker"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">HY</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Hệ thống Nguồn Nhân lực
                </h1>
                <p className="text-sm text-muted-foreground">Tỉnh Hưng Yên</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Hệ thống Quản lý Nguồn Nhân lực
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Tỉnh Hưng Yên
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Nền tảng tích hợp quản lý thông tin lao động, tuyển dụng và phát triển 
            nguồn nhân lực trên địa bàn tỉnh Hưng Yên
          </p>
        </div>

        {/* User Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {userTypes.map((userType) => {
            const Icon = userType.icon;
            return (
              <Card
                key={userType.variant}
                className="group hover:shadow-elegant transition-all duration-300 cursor-pointer transform hover:-translate-y-1 bg-gradient-to-br from-card to-muted/30"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      {userType.title}
                    </h3>
                    <p className="text-xs font-medium text-primary mb-2">
                      {userType.subtitle}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {userType.description}
                    </p>
                  </div>
                  <Button 
                    variant="default"
                    size="sm"
                    onClick={() => navigate(userType.route)}
                    className="w-full bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Đăng nhập
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Statistics Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-8">
            Thống kê hệ thống
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-card p-6 rounded-lg shadow-card">
              <div className="text-3xl font-bold text-primary mb-2">1,247</div>
              <div className="text-sm text-muted-foreground">Doanh nghiệp</div>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-card">
              <div className="text-3xl font-bold text-secondary mb-2">15,832</div>
              <div className="text-sm text-muted-foreground">Người lao động</div>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-card">
              <div className="text-3xl font-bold text-accent mb-2">842</div>
              <div className="text-sm text-muted-foreground">Việc làm</div>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-card">
              <div className="text-3xl font-bold text-gov-green mb-2">2,156</div>
              <div className="text-sm text-muted-foreground">Kết nối thành công</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p className="mb-2">
              © 2024 Ủy ban Nhân dân Tỉnh Hưng Yên. Bản quyền thuộc về nhà phát triển.
            </p>
            <p className="text-sm">
              Hỗ trợ kỹ thuật: support@hungyenhr.gov.vn | Hotline: 0321.xxx.xxx
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HeroSection;