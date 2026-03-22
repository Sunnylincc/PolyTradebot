import { Agent } from "@/lib/core/types";
import { agentInputSchema } from "@/lib/schemas/domain";
import { state, uid } from "@/lib/store/state";

export const listAgents = () => state.agents;

export const createAgent = (raw: unknown): Agent => {
  const input = agentInputSchema.parse(raw);
  const now = new Date().toISOString();
  const agent: Agent = { id: uid("agent"), status: "idle", createdAt: now, updatedAt: now, ...input };
  state.agents.push(agent);
  return agent;
};

export const updateAgent = (id: string, patch: Partial<Agent>) => {
  const agent = state.agents.find((a) => a.id === id);
  if (!agent) return null;
  Object.assign(agent, patch, { updatedAt: new Date().toISOString() });
  return agent;
};

export const deleteAgent = (id: string) => {
  const idx = state.agents.findIndex((a) => a.id === id);
  if (idx < 0) return false;
  state.agents.splice(idx, 1);
  return true;
};

export const cloneAgent = (id: string) => {
  const src = state.agents.find((a) => a.id === id);
  if (!src) return null;
  const clone: Agent = { ...src, id: uid("agent"), name: `${src.name} Clone`, status: "idle", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  state.agents.push(clone);
  return clone;
};
