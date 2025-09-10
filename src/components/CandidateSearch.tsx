import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  User, 
  Star, 
  Award, 
  Target, 
  Heart,
  Brain,
  Users,
  TrendingUp,
  MapPin,
  GraduationCap,
  Briefcase,
  Phone,
  Mail,
  Filter
} from "lucide-react";

const CandidateSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Mock data for candidates with 4-pillar assessment
  const candidates = [
    {
      id: 1,
      name: "Nguyễn Văn An",
      position: "Kỹ sư phần mềm",
      experience: "5 năm",
      location: "Hưng Yên",
      education: "Đại học Công nghệ",
      phone: "0123456789",
      email: "an@email.com",
      avatar: "👨‍💻",
      assessment: {
        professional: { score: 85, details: "Thạc sĩ CNTT, 5 năm kinh nghiệm fullstack, chứng chỉ AWS" },
        social: { score: 78, details: "3 dự án mã nguồn mở, đào tạo sinh viên, tình nguyện IT" },
        personal: { score: 82, details: "Lãnh đạo nhóm 8 người, giao tiếp tốt, sáng tạo trong giải pháp" },
        strategic: { score: 90, details: "Chuyên môn phù hợp chuyển đổi số, cam kết lâu dài với Hưng Yên" }
      },
      overallScore: 84
    },
    {
      id: 2,
      name: "Trần Thị Bình",
      position: "Chuyên viên Marketing",
      experience: "4 năm",
      location: "Hưng Yên",
      education: "Đại học Kinh tế",
      phone: "0987654321",
      email: "binh@email.com",
      avatar: "👩‍💼",
      assessment: {
        professional: { score: 80, details: "Cử nhân Marketing, 4 năm kinh nghiệm digital marketing" },
        social: { score: 88, details: "Tổ chức 5 chiến dịch từ thiện, quảng bá sản phẩm địa phương" },
        personal: { score: 85, details: "Khả năng thuyết phục cao, làm việc nhóm tốt, tư duy sáng tạo" },
        strategic: { score: 83, details: "Hiểu biết thị trường địa phương, định hướng phát triển thương hiệu" }
      },
      overallScore: 84
    },
    {
      id: 3,
      name: "Lê Minh Cường",
      position: "Kỹ sư nông nghiệp",
      experience: "3 năm",
      location: "Hưng Yên",
      education: "Đại học Nông nghiệp",
      phone: "0369852147",
      email: "cuong@email.com",
      avatar: "👨‍🌾",
      assessment: {
        professional: { score: 87, details: "Kỹ sư nông nghiệp, chuyên công nghệ cao, IoT farming" },
        social: { score: 92, details: "Hướng dẫn 50+ hộ nông dân, dự án cây trồng sạch" },
        personal: { score: 80, details: "Kiên nhẫn, tỉ mỉ, khả năng thích ứng cao với môi trường" },
        strategic: { score: 95, details: "Đúng định hướng nông nghiệp công nghệ cao của tỉnh" }
      },
      overallScore: 89
    },
    {
      id: 4,
      name: "Phạm Thu Hương",
      position: "Chuyên viên tài chính",
      experience: "6 năm",
      location: "Hưng Yên",
      education: "Đại học Kinh tế Quốc dân",
      phone: "0567891234",
      email: "huong@email.com",
      avatar: "👩‍💼",
      assessment: {
        professional: { score: 88, details: "CPA, 6 năm kinh nghiệm tài chính doanh nghiệp, phân tích đầu tư" },
        social: { score: 75, details: "Tư vấn tài chính miễn phí cho doanh nghiệp nhỏ" },
        personal: { score: 86, details: "Tỉ mỉ, trách nhiệm cao, khả năng phân tích tốt" },
        strategic: { score: 81, details: "Hiểu biết chính sách thuế, hỗ trợ phát triển doanh nghiệp" }
      },
      overallScore: 83
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600 bg-green-50";
    if (score >= 70) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 85) return "Xuất sắc";
    if (score >= 70) return "Tốt";
    return "Cần cải thiện";
  };

  const filteredCandidates = candidates.filter(candidate => 
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <Card className="bg-gradient-to-br from-card to-muted/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="w-5 h-5 mr-2 text-primary" />
            Tìm kiếm nhân tài Hưng Yên
          </CardTitle>
          <CardDescription>
            Hệ thống đánh giá nhân tài dựa trên 4 trụ cột: Năng lực chuyên môn, Đóng góp xã hội, Kỹ năng cá nhân, Phù hợp chiến lược
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Tìm kiếm theo tên hoặc vị trí..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedPosition} onValueChange={setSelectedPosition}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Vị trí" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả vị trí</SelectItem>
                <SelectItem value="engineer">Kỹ sư</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="finance">Tài chính</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Địa điểm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toàn tỉnh</SelectItem>
                <SelectItem value="hungyen">TP Hưng Yên</SelectItem>
                <SelectItem value="vanlan">Văn Lâm</SelectItem>
                <SelectItem value="vanbinh">Văn Bình</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Filter className="w-4 h-4 mr-2" />
              Lọc
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Candidates List */}
      <div className="grid gap-6">
        {filteredCandidates.map((candidate) => (
          <Card key={candidate.id} className="bg-gradient-to-br from-card to-muted/20 shadow-card">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Basic Info */}
                <div className="lg:w-1/3">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{candidate.avatar}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground">{candidate.name}</h3>
                      <p className="text-primary font-medium">{candidate.position}</p>
                      <div className="space-y-2 mt-3 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-2" />
                          {candidate.experience}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {candidate.location}
                        </div>
                        <div className="flex items-center">
                          <GraduationCap className="w-4 h-4 mr-2" />
                          {candidate.education}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 mt-4">
                        <Button variant="outline" size="sm">
                          <Phone className="w-3 h-3 mr-1" />
                          Gọi
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="w-3 h-3 mr-1" />
                          Email
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Assessment Details */}
                <div className="lg:w-2/3">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-foreground">Đánh giá 4 trụ cột</h4>
                    <div className="flex items-center space-x-2">
                      <Badge className={`px-3 py-1 ${getScoreColor(candidate.overallScore)}`}>
                        <Star className="w-3 h-3 mr-1" />
                        {candidate.overallScore}/100 - {getScoreLabel(candidate.overallScore)}
                      </Badge>
                    </div>
                  </div>

                  <Tabs defaultValue="professional" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="professional" className="text-xs">
                        <Brain className="w-3 h-3 mr-1" />
                        Chuyên môn
                      </TabsTrigger>
                      <TabsTrigger value="social" className="text-xs">
                        <Heart className="w-3 h-3 mr-1" />
                        Xã hội
                      </TabsTrigger>
                      <TabsTrigger value="personal" className="text-xs">
                        <Users className="w-3 h-3 mr-1" />
                        Cá nhân
                      </TabsTrigger>
                      <TabsTrigger value="strategic" className="text-xs">
                        <Target className="w-3 h-3 mr-1" />
                        Chiến lược
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="professional" className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Năng lực chuyên môn</span>
                        <span className="text-sm font-bold">{candidate.assessment.professional.score}/100</span>
                      </div>
                      <Progress value={candidate.assessment.professional.score} className="h-2" />
                      <p className="text-sm text-muted-foreground">{candidate.assessment.professional.details}</p>
                    </TabsContent>

                    <TabsContent value="social" className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Đóng góp xã hội</span>
                        <span className="text-sm font-bold">{candidate.assessment.social.score}/100</span>
                      </div>
                      <Progress value={candidate.assessment.social.score} className="h-2" />
                      <p className="text-sm text-muted-foreground">{candidate.assessment.social.details}</p>
                    </TabsContent>

                    <TabsContent value="personal" className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Kỹ năng và phẩm chất</span>
                        <span className="text-sm font-bold">{candidate.assessment.personal.score}/100</span>
                      </div>
                      <Progress value={candidate.assessment.personal.score} className="h-2" />
                      <p className="text-sm text-muted-foreground">{candidate.assessment.personal.details}</p>
                    </TabsContent>

                    <TabsContent value="strategic" className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Phù hợp chiến lược tỉnh</span>
                        <span className="text-sm font-bold">{candidate.assessment.strategic.score}/100</span>
                      </div>
                      <Progress value={candidate.assessment.strategic.score} className="h-2" />
                      <p className="text-sm text-muted-foreground">{candidate.assessment.strategic.details}</p>
                    </TabsContent>
                  </Tabs>

                  <div className="flex justify-end space-x-3 mt-6">
                    <Button variant="outline">
                      <User className="w-4 h-4 mr-2" />
                      Xem hồ sơ đầy đủ
                    </Button>
                    <Button>
                      <Award className="w-4 h-4 mr-2" />
                      Mời phỏng vấn
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Results Summary */}
      <Card className="bg-gradient-to-br from-muted/20 to-card">
        <CardContent className="p-6 text-center">
          <TrendingUp className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Tìm thấy {filteredCandidates.length} ứng viên phù hợp
          </h3>
          <p className="text-muted-foreground">
            Đánh giá dựa trên hệ thống 4 trụ cột toàn diện của tỉnh Hưng Yên
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CandidateSearch;