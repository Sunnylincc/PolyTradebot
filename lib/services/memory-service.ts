import { Reflection, ShortTermMemoryItem, Skill } from "@/lib/core/types";
import { state, uid } from "@/lib/store/state";

export const getShortTermMemory = (agentId?: string) => state.shortTermMemory.filter((i) => !agentId || i.agentId === agentId);
export const resetShortTermMemory = (agentId: string) => {
  state.shortTermMemory = state.shortTermMemory.filter((m) => m.agentId !== agentId);
};

export const appendShortTermMemory = (item: Omit<ShortTermMemoryItem, "id" | "timestamp">) => {
  const row: ShortTermMemoryItem = { ...item, id: uid("stm"), timestamp: new Date().toISOString() };
  state.shortTermMemory.unshift(row);
  const agent = state.agents.find((a) => a.id === item.agentId);
  const max = agent?.shortTermMemoryConfig.windowSize ?? 20;
  const mine = state.shortTermMemory.filter((s) => s.agentId === item.agentId);
  if (mine.length > max) {
    const trimmed = mine.slice(0, max).map((s) => s.id);
    state.shortTermMemory = state.shortTermMemory.filter((s) => s.agentId !== item.agentId || trimmed.includes(s.id));
  }
};

export const addReflection = (payload: Omit<Reflection, "id" | "timestamp">) => {
  const r: Reflection = { ...payload, id: uid("refl"), timestamp: new Date().toISOString() };
  state.reflections.unshift(r);
  return r;
};

export const upsertSkillFromReflection = (reflection: Reflection): Skill | null => {
  if (reflection.confidence < 0.6) return null;
  const existing = state.skills.find((s) => s.sourceAgentId === reflection.agentId && s.title.includes(reflection.tags[0] ?? ""));
  if (existing) {
    existing.usageCount += 1;
    existing.confidence = Math.min(0.95, (existing.confidence + reflection.confidence) / 2);
    return existing;
  }
  const skill: Skill = {
    id: uid("skill"),
    title: `${reflection.tags[0] ?? "General"} Protocol`,
    description: reflection.summary,
    structuredRule: {
      trigger: reflection.whatWorked,
      action: reflection.hypothesisUpdate,
      constraints: "Must pass risk guardrails",
    },
    sourceAgentId: reflection.agentId,
    sourceReflectionIds: [reflection.id],
    usageCount: 1,
    winRateEstimate: reflection.confidence,
    confidence: reflection.confidence,
    createdAt: new Date().toISOString(),
  };
  state.skills.unshift(skill);
  return skill;
};
