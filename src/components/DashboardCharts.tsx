import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, PieChart, TrendingUp, Users } from "lucide-react";

const DashboardCharts = () => {
  // Sample data for charts
  const industryData = [
    { name: "Công nghệ thông tin", workers: 3200, companies: 156, growth: 15 },
    { name: "Sản xuất", workers: 4800, companies: 234, growth: 8 },
    { name: "Dịch vụ", workers: 2900, companies: 189, growth: 12 },
    { name: "Nông nghiệp", workers: 2100, companies: 98, growth: 3 },
    { name: "Giáo dục", workers: 1800, companies: 67, growth: 6 },
    { name: "Y tế", workers: 1200, companies: 45, growth: 9 }
  ];

  const monthlyData = [
    { month: "T1", employed: 14200, unemployed: 580 },
    { month: "T2", employed: 14350, unemployed: 560 },
    { month: "T3", employed: 14580, unemployed: 520 },
    { month: "T4", employed: 14720, unemployed: 490 },
    { month: "T5", employed: 14890, unemployed: 470 },
    { month: "T6", employed: 15020, unemployed: 450 }
  ];

  const ageGroupData = [
    { range: "18-25", count: 3200, percentage: 20.2 },
    { range: "26-35", count: 5800, percentage: 36.6 },
    { range: "36-45", count: 4200, percentage: 26.5 },
    { range: "46-55", count: 2100, percentage: 13.3 },
    { range: "56+", count: 532, percentage: 3.4 }
  ];

  return (
    <div className="space-y-6">
      {/* Industry Distribution Chart */}
      <Card className="bg-gradient-to-br from-card to-muted/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>Phân bố theo ngành nghề</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {industryData.map((industry, index) => {
              const maxWorkers = Math.max(...industryData.map(i => i.workers));
              const percentage = (industry.workers / maxWorkers) * 100;
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{industry.name}</span>
                    <div className="flex items-center space-x-4 text-muted-foreground">
                      <span>{industry.workers.toLocaleString()} người</span>
                      <span>{industry.companies} DN</span>
                      <span className={`font-medium ${industry.growth > 10 ? 'text-gov-green' : industry.growth > 5 ? 'text-accent' : 'text-muted-foreground'}`}>
                        +{industry.growth}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-primary-glow h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Employment Trend */}
        <Card className="bg-gradient-to-br from-card to-muted/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Xu hướng việc làm 6 tháng</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gov-green rounded-full"></div>
                  <span>Có việc làm</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-destructive rounded-full"></div>
                  <span>Thất nghiệp</span>
                </div>
              </div>
              
              <div className="relative h-48 flex items-end space-x-2">
                {monthlyData.map((data, index) => {
                  const maxTotal = Math.max(...monthlyData.map(d => d.employed + d.unemployed));
                  const employedHeight = (data.employed / maxTotal) * 180;
                  const unemployedHeight = (data.unemployed / maxTotal) * 180;
                  
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center space-y-1">
                      <div className="flex flex-col items-center w-full">
                        <div 
                          className="w-full bg-destructive rounded-t"
                          style={{ height: `${unemployedHeight}px` }}
                        ></div>
                        <div 
                          className="w-full bg-gov-green"
                          style={{ height: `${employedHeight}px` }}
                        ></div>
                      </div>
                      <span className="text-xs text-muted-foreground font-medium">{data.month}</span>
                    </div>
                  );
                })}
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                <div className="text-center">
                  <div className="text-lg font-bold text-gov-green">15,020</div>
                  <div className="text-xs text-muted-foreground">Có việc làm</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-destructive">450</div>
                  <div className="text-xs text-muted-foreground">Thất nghiệp</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Age Group Distribution */}
        <Card className="bg-gradient-to-br from-card to-muted/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Phân bố theo độ tuổi</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Pie chart representation */}
              <div className="relative w-40 h-40 mx-auto">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-secondary to-accent opacity-20"></div>
                <div className="absolute inset-2 rounded-full bg-card flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">15.8K</div>
                    <div className="text-xs text-muted-foreground">Tổng số</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                {ageGroupData.map((group, index) => {
                  const colors = [
                    'bg-primary',
                    'bg-secondary', 
                    'bg-accent',
                    'bg-gov-green',
                    'bg-muted-foreground'
                  ];
                  
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${colors[index]}`}></div>
                        <span className="text-sm font-medium text-foreground">{group.range} tuổi</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-foreground">{group.count.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">{group.percentage}%</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills Gap Analysis */}
      <Card className="bg-gradient-to-br from-card to-muted/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PieChart className="w-5 h-5" />
            <span>Phân tích kỹ năng thiếu hụt</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Kỹ năng thiếu nhất</h4>
              <div className="space-y-2">
                {[
                  { skill: "Lập trình AI/ML", gap: 89 },
                  { skill: "DevOps", gap: 76 },
                  { skill: "Data Analytics", gap: 68 },
                  { skill: "Cloud Computing", gap: 64 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{item.skill}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 bg-muted rounded-full h-1.5">
                        <div 
                          className="bg-destructive h-1.5 rounded-full"
                          style={{ width: `${item.gap}%` }}
                        ></div>
                      </div>
                      <span className="text-destructive font-medium">{item.gap}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Kỹ năng dư thừa</h4>
              <div className="space-y-2">
                {[
                  { skill: "MS Office", surplus: 23 },
                  { skill: "Kế toán cơ bản", surplus: 18 },
                  { skill: "Bán hàng truyền thống", surplus: 15 },
                  { skill: "Thư ký văn phòng", surplus: 12 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{item.skill}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 bg-muted rounded-full h-1.5">
                        <div 
                          className="bg-gov-green h-1.5 rounded-full"
                          style={{ width: `${item.surplus}%` }}
                        ></div>
                      </div>
                      <span className="text-gov-green font-medium">+{item.surplus}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Đề xuất đào tạo</h4>
              <div className="space-y-2 text-sm">
                <div className="p-3 bg-primary/10 rounded-lg border-l-4 border-primary">
                  <div className="font-medium text-primary">Khóa AI/ML cơ bản</div>
                  <div className="text-muted-foreground">500 suất học</div>
                </div>
                <div className="p-3 bg-secondary/10 rounded-lg border-l-4 border-secondary">
                  <div className="font-medium text-secondary">DevOps Foundation</div>
                  <div className="text-muted-foreground">300 suất học</div>
                </div>
                <div className="p-3 bg-accent/10 rounded-lg border-l-4 border-accent">
                  <div className="font-medium text-accent">Data Analysis</div>
                  <div className="text-muted-foreground">400 suất học</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCharts;