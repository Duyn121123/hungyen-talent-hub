import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  TrendingUp, 
  Brain, 
  Calendar, 
  Loader2, 
  RefreshCw,
  BarChart3,
  Users,
  Building2,
  Briefcase
} from "lucide-react";

const LaborForecast = () => {
  const { toast } = useToast();
  const [forecast, setForecast] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleForecast = async () => {
    setIsAnalyzing(true);
    try {
      // Simulate labor data
      const laborData = {
        currentEmployment: 15832,
        totalEnterprises: 1247,
        openPositions: 842,
        employmentRate: 94.2,
        sectors: [
          { name: "Sản xuất", workers: 6200, growth: 12 },
          { name: "Dịch vụ", workers: 4500, growth: 18 },
          { name: "Nông nghiệp", workers: 3100, growth: -5 },
          { name: "Xây dựng", workers: 2032, growth: 25 }
        ],
        districts: [
          { name: "Hưng Yên", workers: 4200, enterprises: 350 },
          { name: "Văn Lâm", workers: 2800, enterprises: 180 },
          { name: "Văn Giang", workers: 2500, enterprises: 220 },
          { name: "Yên Mỹ", workers: 2100, enterprises: 160 },
          { name: "Mỹ Hào", workers: 1900, enterprises: 140 },
          { name: "Ân Thi", workers: 1332, enterprises: 120 },
          { name: "Khoái Châu", workers: 1000, enterprises: 77 }
        ]
      };

      const { data, error } = await supabase.functions.invoke('analyze-labor-allocation', {
        body: {
          laborData,
          districts: laborData.districts,
          analysisType: 'forecast'
        }
      });

      if (error) throw error;

      setForecast(data.analysis);
      toast({
        title: "Dự báo hoàn tất",
        description: "Đã tạo dự báo nhu cầu lao động 6-12 tháng tới",
      });
    } catch (error) {
      console.error('Forecast error:', error);
      toast({
        title: "Lỗi dự báo",
        description: "Không thể tạo dự báo. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const keyMetrics = [
    {
      title: "Dự kiến tuyển dụng",
      value: "+1,200",
      period: "6 tháng tới",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Doanh nghiệp mới",
      value: "+85",
      period: "Quý tới",
      icon: Building2,
      color: "text-secondary"
    },
    {
      title: "Nhu cầu tuyển dụng",
      value: "+950",
      period: "3 tháng tới",
      icon: Briefcase,
      color: "text-accent"
    },
    {
      title: "Tăng trưởng việc làm",
      value: "+15%",
      period: "Năm 2025",
      icon: TrendingUp,
      color: "text-gov-green"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary-glow/10 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">Dự báo nhu cầu lao động</CardTitle>
                <CardDescription>Phân tích xu hướng và dự báo nhu cầu lao động cấp tỉnh</CardDescription>
              </div>
            </div>
            <Button
              onClick={handleForecast}
              disabled={isAnalyzing}
              className="gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang phân tích...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4" />
                  Tạo dự báo AI
                </>
              )}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title} className="bg-gradient-to-br from-card to-muted/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                  <Icon className={`w-5 h-5 ${metric.color}`} />
                </div>
                <p className="text-2xl font-bold text-foreground mb-1">{metric.value}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>{metric.period}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Forecast Result */}
      {!forecast ? (
        <Card className="bg-gradient-to-br from-card to-muted/20">
          <CardContent className="p-12">
            <div className="text-center space-y-4">
              <div className="p-4 bg-muted/50 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                <BarChart3 className="w-10 h-10 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  Chưa có dự báo
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Nhấn nút "Tạo dự báo AI" để hệ thống phân tích dữ liệu và tạo dự báo nhu cầu lao động cho 6-12 tháng tới
                </p>
              </div>
              <Button
                onClick={handleForecast}
                disabled={isAnalyzing}
                variant="outline"
                className="gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Đang phân tích...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4" />
                    Bắt đầu dự báo
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-gradient-to-br from-card to-muted/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Kết quả dự báo</CardTitle>
                  <CardDescription>Dự báo được tạo bởi AI dựa trên dữ liệu thực tế</CardDescription>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleForecast}
                disabled={isAnalyzing}
                className="gap-2"
              >
                {isAnalyzing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                Làm mới
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-sm leading-relaxed bg-muted/30 p-6 rounded-lg border">
                {forecast}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LaborForecast;
