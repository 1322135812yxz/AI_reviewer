import axios from 'axios';

// AI面试官专项训练服务的基础URL
const API_BASE_URL = 'http://localhost:3000';

/**
 * AI面试官专项训练聊天接口参数类型
 */
export interface DeepSeekChatParams {
  messages: Array<{ role: string; content: string }>;
  model?: string;
  stream?: boolean;
  temperature?: number;
  max_tokens?: number;
  [key: string]: any;
}

/**
 * AI面试官专项训练推理接口参数类型
 */
export interface DeepSeekReasonerParams {
  messages: Array<{ role: string; content: string }>;
  stream?: boolean;
  temperature?: number;
  [key: string]: any;
}

/**
 * AI面试官专项训练服务类
 */
class DeepSeekService {
  /**
   * 调用AI面试官专项训练聊天模型
   * @param params 聊天参数
   * @returns 返回聊天完成结果
   */
  async chat(params: DeepSeekChatParams) {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/chat`, params);
      return response.data;
    } catch (error) {
      console.error('AI面试官专项训练聊天API调用失败:', error);
      throw error;
    }
  }

  /**
   * 调用AI面试官专项训练聊天模型（流式输出）
   * @param params 聊天参数
   * @param onData 数据回调函数
   * @param onComplete 完成回调函数
   */
  async chatStream(
    params: DeepSeekChatParams,
    onData: (content: string) => void,
    onComplete: () => void
  ) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...params, stream: true }),
      });

      if (!response.body) {
        throw new Error('响应体为空');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.trim() !== '');

        for (const line of lines) {
          if (line.includes('[DONE]')) {
            onComplete();
            return;
          }

          if (line.startsWith('data: ')) {
            try {
              const jsonStr = line.slice(6);
              const data = JSON.parse(jsonStr);
              if (data.content) {
                onData(data.content);
              }
            } catch (e) {
              console.error('解析流数据失败:', e);
            }
          }
        }
      }

      onComplete();
    } catch (error) {
      console.error('AI面试官专项训练流式聊天API调用失败:', error);
      throw error;
    }
  }

  /**
   * 调用AI面试官专项训练推理模型
   * @param params 推理参数
   * @returns 返回推理结果
   */
  async reason(params: DeepSeekReasonerParams) {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/reasoner`, params);
      return response.data;
    } catch (error) {
      console.error('AI面试官专项训练推理API调用失败:', error);
      throw error;
    }
  }

  /**
   * 调用AI面试官专项训练推理模型（流式输出）
   * @param params 推理参数
   * @param onData 数据回调函数
   * @param onComplete 完成回调函数
   */
  async reasonStream(
    params: DeepSeekReasonerParams,
    onData: (content: string) => void,
    onComplete: () => void
  ) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/reasoner`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...params, stream: true }),
      });

      if (!response.body) {
        throw new Error('响应体为空');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.trim() !== '');

        for (const line of lines) {
          if (line.includes('[DONE]')) {
            onComplete();
            return;
          }

          if (line.startsWith('data: ')) {
            try {
              const jsonStr = line.slice(6);
              const data = JSON.parse(jsonStr);
              if (data.content) {
                onData(data.content);
              }
            } catch (e) {
              console.error('解析流数据失败:', e);
            }
          }
        }
      }

      onComplete();
    } catch (error) {
      console.error('AI面试官专项训练流式推理API调用失败:', error);
      throw error;
    }
  }

  /**
   * 生成面试评分的优缺点分析
   * @param question 面试问题
   * @param answer 用户回答
   * @returns 包含优点和缺点的分析结果
   */
  async generateInterviewAnalysis(question: string, answer: string) {
    try {
      const prompt = `作为一名专业的面试评估专家，请分析以下面试问题和回答，并给出优点和缺点分析。

问题：${question}

回答：${answer}

请从以下三个方面进行分析：
1. 回答与题目的相关性
2. 回答的流畅度
3. 问题解决能力

请以JSON格式返回分析结果，格式如下：
{
  "strengths": ["优点1", "优点2", "优点3"],
  "weaknesses": ["缺点1", "缺点2"]
}`;

      const response = await this.chat({
        messages: [
          { role: "system", content: "你是一名专业的面试评估专家，擅长分析面试回答的优缺点。" },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      // 解析返回的内容
      const content = response.choices[0].message.content;
      try {
        // 尝试解析JSON
        return JSON.parse(content);
      } catch (e) {
        // 如果解析失败，尝试从文本中提取JSON部分
        const jsonMatch = content.match(/\{[\s\S]*\}/m);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
        // 如果仍然无法解析，返回默认结构
        return {
          strengths: ["回答与问题相关", "表达流畅"],
          weaknesses: ["可以提供更多具体例子", "部分专业知识有待加强"]
        };
      }
    } catch (error) {
      console.error('生成面试评分分析失败:', error);
      // 返回默认结构
      return {
        strengths: ["回答与问题相关", "表达流畅"],
        weaknesses: ["可以提供更多具体例子", "部分专业知识有待加强"]
      };
    }
  }

  /**
   * 根据期望职业和面试官类型生成面试问题
   * @param desiredPosition 期望职业
   * @param interviewerType 面试官类型：'hr型'、'技术型'、'综合型'、'随机'
   * @returns 返回生成的面试问题数组
   */
  async generateInterviewQuestions(desiredPosition: string, interviewerType: string = '综合型') {
    try {
      // 根据面试官类型定制提示词
      let typeSpecificPrompt = '';
      
      switch (interviewerType) {
        case 'hr型':
          typeSpecificPrompt = `
作为HR面试官，请重点关注以下方面：
- 个人品格和职业素养
- 团队合作能力和沟通技巧
- 职业规划和发展意愿
- 企业文化适应性
- 抗压能力和学习能力
问题应该更多关注候选人的软技能、人格魅力和职场适应能力。`;
          break;
        case '技术型':
          typeSpecificPrompt = `
作为技术面试官，请重点关注以下方面：
- 专业技术能力和知识深度
- 实际项目经验和技术应用
- 问题解决思路和技术方案设计
- 技术学习能力和技术趋势了解
- 代码质量和最佳实践
问题应该更多关注候选人的硬技能、技术能力和实战经验。`;
          break;
        case '综合型':
          typeSpecificPrompt = `
作为综合面试官，请平衡关注以下方面：
- 技术能力与软技能并重
- 既考察专业知识，也关注个人素养
- 结合技术问题和行为问题
- 评估候选人的综合素质
问题应该涵盖技术能力、个人品格、团队协作等多个维度。`;
          break;
        case '随机':
          // 随机选择一种类型
          const types = ['hr型', '技术型', '综合型'];
          const randomType = types[Math.floor(Math.random() * types.length)];
          return this.generateInterviewQuestions(desiredPosition, randomType);
        default:
          typeSpecificPrompt = `
作为综合面试官，请平衡关注技术能力和软技能。`;
      }

      const prompt = `作为一名专业的${interviewerType}面试官，请根据以下期望职业生成3-4个专业的面试问题。

期望职业：${desiredPosition}
面试官类型：${interviewerType}

${typeSpecificPrompt}

请生成针对该职位的面试问题，问题应该：
1. 符合${interviewerType}面试官的特点和关注重点
2. 涵盖该职位的相关技能和知识点
3. 难度适中，适合面试场景
4. 问题具体且有针对性
5. 以英文方式交流

请以JSON格式返回问题列表，格式如下：
{
  "questions": [
    {
      "id": 1,
      "question": "问题内容1",
      "question_type": "technical/behavioral/general",
      "interviewer_focus": "${interviewerType}关注重点"
    },
    {
      "id": 2,
      "question": "问题内容2",
      "question_type": "technical/behavioral/general",
      "interviewer_focus": "${interviewerType}关注重点"
    }
  ]
}`;

      const response = await this.chat({
        messages: [
          { role: "system", content: `你是一名专业的${interviewerType}面试官，擅长根据不同职位和面试官类型设计合适的面试问题。` },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1500
      });

      // 解析返回的内容
      const content = response.choices[0].message.content;
      try {
        // 尝试解析JSON
        const result = JSON.parse(content);
        return result.questions || [];
      } catch (e) {
        // 如果解析失败，尝试从文本中提取JSON部分
        const jsonMatch = content.match(/\{[\s\S]*\}/m);
        if (jsonMatch) {
          const result = JSON.parse(jsonMatch[0]);
          return result.questions || [];
        }
        // 如果仍然无法解析，返回默认问题
        return this.getDefaultQuestions(desiredPosition, interviewerType);
      }
    } catch (error) {
      console.error('生成面试问题失败:', error);
      // 返回默认问题
      return this.getDefaultQuestions(desiredPosition, interviewerType);
    }
  }

  /**
   * 获取默认面试问题（当AI生成失败时使用）
   * @param desiredPosition 期望职业
   * @param interviewerType 面试官类型
   * @returns 默认问题数组
   */
  private getDefaultQuestions(desiredPosition: string, interviewerType: string = '综合型') {
    const baseQuestions = {
      'hr型': [
        {
          id: 1,
          question: `请简单介绍一下自己，包括您的个人特点和职业目标。`,
          question_type: "behavioral",
          interviewer_focus: "个人品格和职业素养"
        },
        {
          id: 2,
          question: `您如何看待团队合作？请举例说明您在团队中的角色。`,
          question_type: "behavioral",
          interviewer_focus: "团队合作能力"
        },
        {
          id: 3,
          question: `您的职业规划是什么？为什么选择我们公司？`,
          question_type: "general",
          interviewer_focus: "职业规划和企业适应性"
        },
        {
          id: 4,
          question: `请描述一次您面对压力或挫折时的经历，以及您是如何处理的。`,
          question_type: "behavioral",
          interviewer_focus: "抗压能力和应变能力"
        }
      ],
      '技术型': [
        {
          id: 1,
          question: `请详细介绍您在${desiredPosition}领域的技术经验和核心技能。`,
          question_type: "technical",
          interviewer_focus: "专业技术能力"
        },
        {
          id: 2,
          question: `请描述一个您参与的技术项目，包括您使用的技术栈和解决的关键问题。`,
          question_type: "technical",
          interviewer_focus: "实际项目经验"
        },
        {
          id: 3,
          question: `在${desiredPosition}工作中，您认为最重要的技术能力是什么？为什么？`,
          question_type: "technical",
          interviewer_focus: "技术理解深度"
        },
        {
          id: 4,
          question: `请描述一个您遇到的技术难题，以及您的解决思路和方案。`,
          question_type: "technical",
          interviewer_focus: "问题解决能力"
        }
      ],
      '综合型': [
        {
          id: 1,
          question: `请简单介绍一下您对${desiredPosition}这个职位的理解和相关经验。`,
          question_type: "general",
          interviewer_focus: "职位理解和综合素质"
        },
        {
          id: 2,
          question: `您认为${desiredPosition}需要具备哪些核心技能？您在这些方面有什么优势？`,
          question_type: "technical",
          interviewer_focus: "技术能力和自我认知"
        },
        {
          id: 3,
          question: `请描述一个您在工作或学习中遇到的挑战，以及您是如何与团队协作解决的。`,
          question_type: "behavioral",
          interviewer_focus: "问题解决和团队协作"
        },
        {
          id: 4,
          question: `您为什么选择${desiredPosition}这个职业方向？您的长期职业规划是什么？`,
          question_type: "general",
          interviewer_focus: "职业规划和发展意愿"
        }
      ]
    };

    return baseQuestions[interviewerType] || baseQuestions['综合型'];
  }
}

// 导出单例实例
export const deepseekService = new DeepSeekService();