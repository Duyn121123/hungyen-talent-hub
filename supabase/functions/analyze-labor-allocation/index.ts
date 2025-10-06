import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { laborData, districts } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Analyzing labor allocation for districts:', districts?.length || 0);

    const systemPrompt = `Bạn là chuyên gia phân tích thị trường lao động của tỉnh Hưng Yên. 
Nhiệm vụ của bạn là phân tích dữ liệu lao động và đề xuất chiến lược phân bổ lao động hiệu quả.

Hãy cung cấp phân tích chi tiết bao gồm:
1. Đánh giá tổng quan về tình hình lao động hiện tại
2. Xác định các khu vực thừa/thiếu lao động
3. Phân tích xu hướng theo ngành nghề
4. Đề xuất cụ thể về phân bổ lao động giữa các huyện/xã
5. Khuyến nghị về đào tạo và phát triển kỹ năng
6. Dự báo nhu cầu lao động trong 6-12 tháng tới

Trả lời bằng tiếng Việt, sử dụng số liệu cụ thể và đưa ra các đề xuất khả thi.`;

    const userPrompt = `Dữ liệu lao động hiện tại:
${JSON.stringify(laborData, null, 2)}

Danh sách các huyện/xã:
${JSON.stringify(districts, null, 2)}

Hãy phân tích và đưa ra đề xuất phân bổ lao động.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const analysis = data.choices[0].message.content;

    console.log('Analysis completed successfully');

    return new Response(
      JSON.stringify({ analysis }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in analyze-labor-allocation:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});