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
  X,
  Minus,
  Maximize2
} from "lucide-react";

interface Message {
  id: number;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

const FloatingChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Xin chào! Tôi là NGSC AI GEN - Trợ lý AI của hệ thống quản lý nguồn nhân lực tỉnh Hưng Yên. Tôi có thể giúp bạn phân tích dữ liệu, tư vấn chính sách và hỗ trợ tìm kiếm thông tin. Bạn cần hỗ trợ gì hôm nay?",
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
      "Dựa trên dữ liệu hiện tại của tỉnh Hưng Yên, tôi có thể cung cấp thông tin chi tiết về vấn đề này. Theo phân tích từ hệ thống...",
      "Từ góc độ chính sách nhân lực, tôi khuyên bạn nên xem xét các yếu tố sau đây để có quyết định phù hợp nhất...",
      "Thống kê cho thấy xu hướng này đang diễn ra tích cực trong khu vực. Tôi sẽ phân tích sâu hơn cho bạn...",
      "Dựa trên machine learning model, tôi dự đoán rằng tình hình sẽ phát triển theo hướng tích cực trong thời gian tới...",
      "Theo dữ liệu mới nhất, tôi có thể giúp bạn đưa ra những khuyến nghị cụ thể cho vấn đề này..."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-glow shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <Bot className="w-6 h-6 text-white" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`bg-card/95 backdrop-blur-sm border shadow-2xl transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
      }`}>
        {/* Header */}
        <CardHeader className="p-4 border-b bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-sm font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  NGSC AI GEN
                </CardTitle>
                {!isMinimized && (
                  <p className="text-xs text-muted-foreground flex items-center space-x-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Trợ lý AI thông minh</span>
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="w-8 h-8 p-0"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            {/* Chat Area */}
            <CardContent className="p-0 flex flex-col h-[400px]">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-2 ${
                        message.isBot ? '' : 'flex-row-reverse space-x-reverse'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.isBot 
                          ? 'bg-gradient-to-br from-primary to-primary-glow' 
                          : 'bg-gradient-to-br from-secondary to-accent'
                      }`}>
                        {message.isBot ? (
                          <Bot className="w-3 h-3 text-white" />
                        ) : (
                          <User className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div className={`flex-1 ${message.isBot ? '' : 'text-right'}`}>
                        <div className={`inline-block max-w-[85%] p-2 rounded-lg text-xs ${
                          message.isBot 
                            ? 'bg-muted text-foreground rounded-tl-none' 
                            : 'bg-gradient-to-r from-primary to-primary-glow text-white rounded-tr-none'
                        }`}>
                          <p className="whitespace-pre-line">{message.content}</p>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1">
                          {message.timestamp.toLocaleTimeString('vi-VN')}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex items-start space-x-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                      <div className="bg-muted p-2 rounded-lg rounded-tl-none">
                        <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-100"></div>
                          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>

              {/* Input Area */}
              <div className="p-3 border-t bg-muted/20">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Nhập câu hỏi..."
                    className="flex-1 text-sm h-9"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    disabled={isTyping}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={isTyping || !inputValue.trim()}
                    size="sm"
                    className="px-3 h-9"
                  >
                    <Send className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};

export default FloatingChatBot;