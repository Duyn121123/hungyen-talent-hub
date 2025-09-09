import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Send, 
  User, 
  Sparkles,
  MessageCircle,
  Brain,
  Zap
} from "lucide-react";

interface Message {
  id: number;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

const NGSCAIBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Xin chào! Tôi là NGSC AI GEN - Trợ lý AI của hệ thống quản lý nguồn nhân lực tỉnh Hưng Yên. Tôi có thể giúp bạn:",
      isBot: true,
      timestamp: new Date()
    },
    {
      id: 2,
      content: "• Phân tích dữ liệu thị trường lao động\n• Tư vấn chính sách nhân lực\n• Hỗ trợ tìm kiếm thông tin doanh nghiệp\n• Dự báo xu hướng tuyển dụng\n\nBạn cần hỗ trợ gì hôm nay?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      content: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        content: generateAIResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAIResponse = (userInput: string): string => {
    const responses = [
      "Dựa trên dữ liệu hiện tại của tỉnh Hưng Yên, tôi có thể cung cấp thông tin chi tiết về vấn đề này. Theo phân tích...",
      "Từ góc độ chính sách nhân lực, tôi khuyên bạn nên xem xét các yếu tố sau đây để có quyết định phù hợp...",
      "Thống kê cho thấy xu hướng này đang diễn ra tích cực. Tôi sẽ phân tích sâu hơn cho bạn...",
      "Dựa trên machine learning model, tôi dự đoán rằng tình hình sẽ phát triển theo hướng..."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const quickQuestions = [
    "Thống kê lao động theo ngành",
    "Dự báo nhu cầu tuyển dụng",
    "Phân tích doanh nghiệp FDI",
    "Xu hướng thị trường lao động"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Card className="mb-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center shadow-glow">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  NGSC AI GEN
                </CardTitle>
                <p className="text-muted-foreground flex items-center space-x-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Trợ lý AI thông minh cho quản lý nguồn nhân lực</span>
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col bg-gradient-to-br from-card to-muted/20">
              <CardHeader className="flex-shrink-0 border-b">
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <span>Trò chuyện với AI</span>
                  <Badge variant="secondary" className="ml-auto">
                    <Zap className="w-3 h-3 mr-1" />
                    Đang hoạt động
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 p-4 overflow-hidden">
                <ScrollArea className="h-full pr-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex items-start space-x-3 ${
                          message.isBot ? '' : 'flex-row-reverse space-x-reverse'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.isBot 
                            ? 'bg-gradient-to-br from-primary to-primary-glow' 
                            : 'bg-gradient-to-br from-secondary to-accent'
                        }`}>
                          {message.isBot ? (
                            <Bot className="w-4 h-4 text-white" />
                          ) : (
                            <User className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div className={`flex-1 ${message.isBot ? '' : 'text-right'}`}>
                          <div className={`inline-block max-w-[80%] p-3 rounded-lg ${
                            message.isBot 
                              ? 'bg-muted text-foreground rounded-tl-none' 
                              : 'bg-gradient-to-r from-primary to-primary-glow text-white rounded-tr-none'
                          }`}>
                            <p className="whitespace-pre-line text-sm">{message.content}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {message.timestamp.toLocaleTimeString('vi-VN')}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-muted p-3 rounded-lg rounded-tl-none">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div ref={messagesEndRef} />
                </ScrollArea>
              </CardContent>

              <div className="p-4 border-t bg-muted/20">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Nhập câu hỏi của bạn..."
                    className="flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    disabled={isTyping}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={isTyping || !inputValue.trim()}
                    className="px-4"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-card to-muted/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <span>Câu hỏi thông dụng</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start h-auto p-3 hover:bg-primary/5"
                    onClick={() => setInputValue(question)}
                  >
                    <div className="text-sm">{question}</div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-muted/20">
              <CardHeader>
                <CardTitle className="text-lg">Khả năng AI</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Brain className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Phân tích dữ liệu</p>
                    <p className="text-sm text-muted-foreground">Xử lý và phân tích dữ liệu lớn</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium">Dự đoán xu hướng</p>
                    <p className="text-sm text-muted-foreground">Machine Learning tốt nhất</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">Tư vấn chính sách</p>
                    <p className="text-sm text-muted-foreground">Hỗ trợ ra quyết định</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGSCAIBot;