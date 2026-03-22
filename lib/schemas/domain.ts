import { z } from "zod";

export const agentInputSchema = z.object({
  name: z.string().min(2),
  mode: z.enum(["dry", "real"]).default("dry"),
  model: z.string(),
  riskProfile: z.enum(["low", "medium", "high"]),
  marketScope: z.array(z.string()).min(1),
  strategySeed: z.string().min(5),
  shortTermMemoryConfig: z.object({ windowSize: z.number().int().min(3).max(200), ttlSeconds: z.number().int().min(30) }),
  longTermMemoryConfig: z.object({ skillLimit: z.number().int().min(1).max(200), reflectionDepth: z.number().int().min(1).max(10) }),
});

export const decisionSchema = z.object({
  action: z.enum(["enter", "exit", "hold"]),
  side: z.enum(["yes", "no"]),
  size: z.number().positive(),
  confidence: z.number().min(0).max(1),
  reasoningSummary: z.string().min(5),
  supportingSignals: z.array(z.string()),
});

export const settingsSchema = z.object({
  defaultMode: z.enum(["dry", "real"]),
  allowRealTrading: z.boolean(),
  maxPositionSize: z.number().positive(),
  maxDailyLoss: z.number().positive(),
  perAgentRiskCap: z.number().min(0).max(1),
  modelProvider: z.enum(["openai", "mock"]),
  retentionDays: z.number().int().min(1),
});
