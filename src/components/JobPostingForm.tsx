import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { 
  CalendarIcon, 
  Plus, 
  MapPin, 
  DollarSign, 
  Clock, 
  Users, 
  GraduationCap,
  Building2,
  Mail,
  Phone,
  FileText,
  Star,
  CheckCircle,
  X
} from "lucide-react";

interface JobPostingFormProps {
  trigger?: React.ReactNode;
}

const JobPostingForm = ({ trigger }: JobPostingFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    benefits: "",
    salaryMin: "",
    salaryMax: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    educationLevel: "",
    contactEmail: "",
    contactPhone: "",
    companyDescription: "",
    skills: [] as string[],
    deadline: undefined as Date | undefined,
  });

  const [currentSkill, setCurrentSkill] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const jobTypes = [
    { value: "full-time", label: "Toàn thời gian" },
    { value: "part-time", label: "Bán thời gian" },
    { value: "contract", label: "Hợp đồng" },
    { value: "internship", label: "Thực tập" },
    { value: "freelance", label: "Tự do" }
  ];

  const experienceLevels = [
    { value: "fresher", label: "Mới tốt nghiệp" },
    { value: "1-2-years", label: "1-2 năm" },
    { value: "3-5-years", label: "3-5 năm" },
    { value: "5-10-years", label: "5-10 năm" },
    { value: "10-plus-years", label: "Trên 10 năm" }
  ];

  const educationLevels = [
    { value: "high-school", label: "Trung học phổ thông" },
    { value: "vocational", label: "Trung cấp/Cao đẳng" },
    { value: "bachelor", label: "Đại học" },
    { value: "master", label: "Thạc sĩ" },
    { value: "phd", label: "Tiến sĩ" }
  ];

  const provinces = [
    "Hưng Yên", "Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", 
    "Bắc Ninh", "Bắc Giang", "Vĩnh Phúc", "Thái Nguyên"
  ];

  const handleAddSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()]
      }));
      setCurrentSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Job posting data:", formData);
    // Here you would typically send the data to your backend
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Đăng tin tuyển dụng
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center text-xl">
            <FileText className="w-5 h-5 mr-2 text-primary" />
            Đăng tin tuyển dụng mới
          </SheetTitle>
          <SheetDescription>
            Tạo tin tuyển dụng chi tiết để thu hút ứng viên phù hợp
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Thông tin cơ bản */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Building2 className="w-4 h-4 mr-2" />
                Thông tin công việc
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Tiêu đề công việc *</Label>
                <Input
                  id="title"
                  placeholder="VD: Kỹ sư phần mềm Frontend"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="jobType">Loại hình công việc *</Label>
                  <Select value={formData.jobType} onValueChange={(value) => setFormData(prev => ({ ...prev, jobType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại hình" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location">Địa điểm làm việc *</Label>
                  <Select value={formData.location} onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn tỉnh/thành" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map(province => (
                        <SelectItem key={province} value={province}>
                          {province}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="salaryMin">Mức lương tối thiểu (triệu VNĐ)</Label>
                  <Input
                    id="salaryMin"
                    type="number"
                    placeholder="15"
                    value={formData.salaryMin}
                    onChange={(e) => setFormData(prev => ({ ...prev, salaryMin: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="salaryMax">Mức lương tối đa (triệu VNĐ)</Label>
                  <Input
                    id="salaryMax"
                    type="number"
                    placeholder="25"
                    value={formData.salaryMax}
                    onChange={(e) => setFormData(prev => ({ ...prev, salaryMax: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label>Hạn nộp hồ sơ</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.deadline && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.deadline ? format(formData.deadline, "dd/MM/yyyy") : "Chọn ngày hết hạn"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.deadline}
                      onSelect={(date) => setFormData(prev => ({ ...prev, deadline: date }))}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>

          {/* Mô tả công việc */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Mô tả chi tiết
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="description">Mô tả công việc *</Label>
                <Textarea
                  id="description"
                  placeholder="Mô tả chi tiết về công việc, trách nhiệm, môi trường làm việc..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="requirements">Yêu cầu ứng viên *</Label>
                <Textarea
                  id="requirements"
                  placeholder="Kinh nghiệm, kỹ năng, bằng cấp yêu cầu..."
                  value={formData.requirements}
                  onChange={(e) => setFormData(prev => ({ ...prev, requirements: e.target.value }))}
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="benefits">Quyền lợi & Phúc lợi</Label>
                <Textarea
                  id="benefits"
                  placeholder="Lương thưởng, bảo hiểm, chế độ nghỉ phép, đào tạo..."
                  value={formData.benefits}
                  onChange={(e) => setFormData(prev => ({ ...prev, benefits: e.target.value }))}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Yêu cầu ứng viên */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Tiêu chí tuyển dụng
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Kinh nghiệm làm việc</Label>
                  <Select value={formData.experienceLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, experienceLevel: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn kinh nghiệm" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map(level => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Trình độ học vấn</Label>
                  <Select value={formData.educationLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, educationLevel: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trình độ" />
                    </SelectTrigger>
                    <SelectContent>
                      {educationLevels.map(level => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Kỹ năng yêu cầu</Label>
                <div className="flex space-x-2 mb-2">
                  <Input
                    placeholder="VD: React, TypeScript, Node.js..."
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                  />
                  <Button type="button" onClick={handleAddSkill} variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <X
                        className="w-3 h-3 cursor-pointer hover:text-destructive"
                        onClick={() => handleRemoveSkill(skill)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Thông tin liên hệ */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Thông tin liên hệ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactEmail">Email liên hệ *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    placeholder="hr@company.com"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contactPhone">Số điện thoại</Label>
                  <Input
                    id="contactPhone"
                    placeholder="0123456789"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="companyDescription">Giới thiệu công ty</Label>
                <Textarea
                  id="companyDescription"
                  placeholder="Mô tả ngắn về công ty, văn hóa làm việc, tầm nhìn..."
                  value={formData.companyDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, companyDescription: e.target.value }))}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Hủy bỏ
            </Button>
            <Button variant="secondary" type="button">
              <FileText className="w-4 h-4 mr-2" />
              Lưu nháp
            </Button>
            <Button type="submit">
              <CheckCircle className="w-4 h-4 mr-2" />
              Đăng tin tuyển dụng
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default JobPostingForm;