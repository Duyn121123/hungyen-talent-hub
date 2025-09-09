import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import {
  Upload,
  FileText,
  Brain,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Star,
  Zap,
  Sparkles
} from "lucide-react";

interface SkillRecommendation {
  skill: string;
  priority: "Cao" | "Trung bình" | "Thấp";
  reason: string;
  matchPercentage: number;
  courses?: string[];
}

interface AnalysisResult {
  overallMatch: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: SkillRecommendation[];
  experienceGap: string[];
}

const CVAnalyzer = () => {
  const { toast } = useToast();
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [selectedJobTemplate, setSelectedJobTemplate] = useState("");

  const jobTemplates = [
    {
      title: "Kỹ sư phần mềm Frontend",
      description: "Tuyển dụng Frontend Developer với 2+ năm kinh nghiệm React, TypeScript, Next.js. Yêu cầu thành thạo HTML, CSS, JavaScript, có kinh nghiệm với Git, responsive design. Ưu tiên có kinh nghiệm với Tailwind CSS, API integration."
    },
    {
      title: "Data Scientist",
      description: "Tuyển Data Scientist với kiến thức sâu về Python, SQL, Machine Learning. Yêu cầu kinh nghiệm với pandas, scikit-learn, TensorFlow. Cần có kỹ năng phân tích dữ liệu, visualization tools như Tableau, PowerBI."
    },
    {
      title: "Digital Marketing Manager",
      description: "Tuyển Digital Marketing Manager với 3+ năm kinh nghiệm. Yêu cầu thành thạo Google Ads, Facebook Ads, SEO/SEM. Cần có kiến thức về Analytics, Content Marketing, Social Media Strategy, Email Marketing."
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf" || file.name.endsWith('.docx')) {
        setCvFile(file);
        toast({
          title: "Tải lên thành công",
          description: `Đã tải lên file CV: ${file.name}`,
        });
      } else {
        toast({
          title: "Lỗi định dạng file",
          description: "Vui lòng tải lên file PDF hoặc DOCX",
          variant: "destructive",
        });
      }
    }
  };

  const simulateAIAnalysis = async (): Promise<AnalysisResult> => {
    // Simulate AI analysis with realistic data
    return {
      overallMatch: 78,
      strengths: [
        "Có kinh nghiệm với React và JavaScript",
        "Hiểu biết tốt về HTML/CSS",
        "Có dự án thực tế với Git",
        "Kỹ năng giao tiếp tốt"
      ],
      weaknesses: [
        "Thiếu kinh nghiệm với TypeScript",
        "Chưa có kinh nghiệm với Next.js",
        "Thiếu kiến thức về Testing",
        "Chưa thành thạo Tailwind CSS"
      ],
      recommendations: [
        {
          skill: "TypeScript",
          priority: "Cao",
          reason: "Yêu cầu bắt buộc trong JD, sẽ tăng 15% cơ hội được tuyển",
          matchPercentage: 90,
          courses: ["TypeScript từ cơ bản đến nâng cao", "React với TypeScript"]
        },
        {
          skill: "Next.js",
          priority: "Cao",
          reason: "Framework được ưu tiên, có thể thay thế React thuần",
          matchPercentage: 85,
          courses: ["Next.js 14 Complete Course", "Full-stack với Next.js"]
        },
        {
          skill: "Testing (Jest, Cypress)",
          priority: "Trung bình",
          reason: "Kỹ năng quan trọng cho developer chất lượng cao",
          matchPercentage: 70,
          courses: ["Unit Testing với Jest", "E2E Testing với Cypress"]
        },
        {
          skill: "Tailwind CSS",
          priority: "Trung bình",
          reason: "Framework CSS hiện đại, giúp tăng tốc độ phát triển",
          matchPercentage: 65,
          courses: ["Tailwind CSS Mastery", "Responsive Design với Tailwind"]
        },
        {
          skill: "GraphQL",
          priority: "Thấp",
          reason: "Công nghệ mới nổi, tăng cạnh tranh trong tương lai",
          matchPercentage: 40,
          courses: ["GraphQL với React", "Apollo Client Tutorial"]
        }
      ],
      experienceGap: [
        "Cần thêm 6 tháng kinh nghiệm với TypeScript",
        "Nên có ít nhất 1 dự án với Next.js",
        "Thiếu chứng chỉ hoặc certification liên quan"
      ]
    };
  };

  const handleAnalyze = async () => {
    if (!cvFile || !jobDescription.trim()) {
      toast({
        title: "Thông tin không đầy đủ",
        description: "Vui lòng tải lên CV và nhập mô tả công việc",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setProgress(0);
    setAnalysisResult(null);

    // Simulate progress
    const progressSteps = [
      { step: 20, message: "Đang đọc CV..." },
      { step: 40, message: "Phân tích JD..." },
      { step: 60, message: "So sánh kỹ năng..." },
      { step: 80, message: "Tạo đề xuất..." },
      { step: 100, message: "Hoàn thành!" }
    ];

    for (const { step, message } of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProgress(step);
      toast({
        title: "Đang phân tích",
        description: message,
      });
    }

    const result = await simulateAIAnalysis();
    setAnalysisResult(result);
    setIsAnalyzing(false);

    toast({
      title: "Phân tích hoàn thành",
      description: `Độ phù hợp: ${result.overallMatch}%. Có ${result.recommendations.length} kỹ năng được đề xuất.`,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Cao": return "bg-red-100 text-red-800";
      case "Trung bình": return "bg-yellow-100 text-yellow-800";
      case "Thấp": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const selectJobTemplate = (template: typeof jobTemplates[0]) => {
    setJobDescription(template.description);
    setSelectedJobTemplate(template.title);
    toast({
      title: "Đã chọn mẫu JD",
      description: `Sử dụng mẫu: ${template.title}`,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-card to-muted/20">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">Phân tích CV với AI</CardTitle>
              <CardDescription>
                Tải lên CV và JD để nhận phân tích chi tiết và đề xuất kỹ năng từ AI
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* CV Upload Section */}
          <div className="space-y-4">
            <Label htmlFor="cv-upload" className="text-base font-semibold flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Tải lên CV của bạn</span>
            </Label>
            <div className="border-2 border-dashed border-muted rounded-lg p-6 hover:border-primary/50 transition-colors">
              <div className="text-center">
                <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <Label htmlFor="cv-upload" className="cursor-pointer">
                  <div className="text-sm text-muted-foreground mb-2">
                    Kéo thả file hoặc click để chọn
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Hỗ trợ PDF, DOCX (tối đa 5MB)
                  </div>
                </Label>
                <Input
                  id="cv-upload"
                  type="file"
                  accept=".pdf,.docx"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
              {cvFile && (
                <div className="mt-4 flex items-center justify-center space-x-2 bg-green-50 p-3 rounded-lg">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{cvFile.name}</span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
              )}
            </div>
          </div>

          {/* Job Description Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Mô tả công việc (JD)</span>
              </Label>
              <Button variant="outline" size="sm" onClick={() => setJobDescription("")}>
                Xóa
              </Button>
            </div>
            
            {/* Job Templates */}
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Chọn mẫu JD có sẵn hoặc nhập thủ công:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {jobTemplates.map((template) => (
                  <Button
                    key={template.title}
                    variant="outline"
                    size="sm"
                    className="text-left justify-start h-auto p-3 hover:bg-primary/5"
                    onClick={() => selectJobTemplate(template)}
                  >
                    <div>
                      <div className="font-medium text-sm">{template.title}</div>
                      <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {template.description.slice(0, 80)}...
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <Textarea
              placeholder="Nhập mô tả công việc bạn muốn ứng tuyển..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-[120px]"
            />
            {selectedJobTemplate && (
              <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                ✓ Đang sử dụng mẫu: {selectedJobTemplate}
              </div>
            )}
          </div>

          {/* Analysis Button */}
          <div className="border-t pt-6">
            <div className="text-center space-y-4">
              {isAnalyzing && (
                <div className="space-y-3">
                  <Progress value={progress} className="w-full max-w-md mx-auto" />
                  <p className="text-sm text-muted-foreground">
                    Đang phân tích... {progress}%
                  </p>
                </div>
              )}
              
              <Button
                onClick={handleAnalyze}
                disabled={!cvFile || !jobDescription.trim() || isAnalyzing}
                size="lg"
                className="w-full max-w-md bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              >
                <Brain className="w-4 h-4 mr-2" />
                {isAnalyzing ? "Đang phân tích..." : "Bắt đầu phân tích với AI"}
              </Button>
              
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                AI sẽ so sánh CV của bạn với yêu cầu công việc và đưa ra các đề xuất kỹ năng cụ thể
              </p>
            </div>
          </div>

          {/* Results Section */}
          {analysisResult && (
            <div className="border-t pt-6 space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Kết quả phân tích</h3>
              </div>

              {/* Overall Score */}
              <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">
                      {analysisResult.overallMatch}%
                    </div>
                    <p className="text-lg font-semibold mb-1">Độ phù hợp tổng thể</p>
                    <p className="text-muted-foreground">
                      {analysisResult.overallMatch >= 80 ? "Rất phù hợp" : 
                       analysisResult.overallMatch >= 60 ? "Khá phù hợp" : "Cần cải thiện"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Strengths & Weaknesses */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-600">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Điểm mạnh
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysisResult.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-orange-600">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Cần cải thiện
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysisResult.weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Skill Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Kỹ năng được đề xuất học
                  </CardTitle>
                  <CardDescription>
                    Các kỹ năng sẽ giúp bạn cạnh tranh tốt hơn cho vị trí này
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysisResult.recommendations.map((rec, index) => (
                      <div key={index} className="p-4 bg-muted/50 rounded-lg border">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-semibold">{rec.skill}</h4>
                              <Badge className={getPriorityColor(rec.priority)}>
                                {rec.priority}
                              </Badge>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Star className="w-3 h-3 mr-1" />
                                {rec.matchPercentage}% impact
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{rec.reason}</p>
                            
                            {rec.courses && (
                              <div className="space-y-2">
                                <p className="text-xs font-medium text-muted-foreground flex items-center">
                                  <BookOpen className="w-3 h-3 mr-1" />
                                  Khóa học đề xuất:
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {rec.courses.map((course, courseIndex) => (
                                    <Badge key={courseIndex} variant="outline" className="text-xs">
                                      {course}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Experience Gap */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-600">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Khoảng cách kinh nghiệm
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysisResult.experienceGap.map((gap, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm">{gap}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Action Button */}
              <div className="text-center pt-4">
                <Button 
                  onClick={() => {
                    setAnalysisResult(null);
                    setCvFile(null);
                    setJobDescription("");
                    setSelectedJobTemplate("");
                  }}
                  variant="outline"
                  className="w-full max-w-md"
                >
                  Phân tích CV khác
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CVAnalyzer;