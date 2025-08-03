import { orionAgent } from '@/agents/orion';
import { lunaAgent } from '@/agents/luna';
import { phoenixAgent, cosmosAgent, stellarAgent, novaAgent, vegaAgent } from '@/agents/index';
import { promptEngine } from '@/lib/promptEngine';
import type { PromptTemplate } from '@/lib/types';

// Core Prompt Templates for the System
export const systemPrompts: PromptTemplate[] = [
  {
    id: 'agent-introduction',
    name: 'Agent Introduction Template',
    description: 'Standard introduction template for all agents',
    category: 'communication',
    template: `Hello! I'm {{agent_name}}, your {{agent_title}} from the LifeLine Agents constellation. 

{{agent_description}}

I specialize in:
{{#each abilities}}
- {{this}}
{{/each}}

How can I assist you today with {{primary_focus}}?`,
    variables: [
      { name: 'agent_name', type: 'string', description: 'Name of the agent', required: true },
      { name: 'agent_title', type: 'string', description: 'Agent title/role', required: true },
      { name: 'agent_description', type: 'string', description: 'Agent description', required: true },
      { name: 'abilities', type: 'array', description: 'List of agent abilities', required: true },
      { name: 'primary_focus', type: 'string', description: 'Primary area of focus', required: true }
    ]
  },

  {
    id: 'collaborative-response',
    name: 'Multi-Agent Collaboration',
    description: 'Template for when multiple agents need to collaborate',
    category: 'communication',
    template: `**Constellation Collaboration on: {{topic}}**

**Lead Agent: {{lead_agent}}**
Primary expertise: {{lead_expertise}}

**Supporting Agents:**
{{#each supporting_agents}}
- {{name}}: {{contribution}}
{{/each}}

**Collaborative Analysis:**
{{collaborative_content}}

**Integrated Recommendations:**
{{recommendations}}

The constellation has aligned to provide you with comprehensive guidance. Which aspect would you like to explore further?`,
    variables: [
      { name: 'topic', type: 'string', description: 'Topic requiring collaboration', required: true },
      { name: 'lead_agent', type: 'string', description: 'Primary agent leading the response', required: true },
      { name: 'lead_expertise', type: 'string', description: 'Lead agent expertise area', required: true },
      { name: 'supporting_agents', type: 'array', description: 'Other agents contributing', required: true },
      { name: 'collaborative_content', type: 'string', description: 'Collaborative analysis content', required: true },
      { name: 'recommendations', type: 'string', description: 'Integrated recommendations', required: true }
    ]
  },

  {
    id: 'escalation-template',
    name: 'Issue Escalation Between Agents',
    description: 'Template for escalating issues between agents',
    category: 'communication',
    template: `**Constellation Escalation Notice**

**From:** {{from_agent}} ({{from_specialty}})
**To:** {{to_agent}} ({{to_specialty}})
**Regarding:** {{escalation_topic}}

**Context:**
{{context}}

**Escalation Reason:**
{{escalation_reason}}

**Previous Analysis:**
{{previous_analysis}}

**Recommended Focus:**
{{recommended_focus}}

{{to_agent}}, your specialized expertise in {{to_specialty}} is needed to provide deeper guidance on this matter.`,
    variables: [
      { name: 'from_agent', type: 'string', description: 'Agent initiating escalation', required: true },
      { name: 'from_specialty', type: 'string', description: 'Escalating agent specialty', required: true },
      { name: 'to_agent', type: 'string', description: 'Agent receiving escalation', required: true },
      { name: 'to_specialty', type: 'string', description: 'Receiving agent specialty', required: true },
      { name: 'escalation_topic', type: 'string', description: 'Topic being escalated', required: true },
      { name: 'context', type: 'string', description: 'Background context', required: true },
      { name: 'escalation_reason', type: 'string', description: 'Why escalation is needed', required: true },
      { name: 'previous_analysis', type: 'string', description: 'Analysis already conducted', required: false },
      { name: 'recommended_focus', type: 'string', description: 'Suggested focus areas', required: false }
    ]
  }
];

// Specialized prompt templates by category
export const strategicPrompts: PromptTemplate[] = [
  {
    id: 'swot-analysis',
    name: 'SWOT Analysis Framework',
    description: 'Comprehensive SWOT analysis template',
    category: 'strategic',
    template: `**SWOT Analysis: {{analysis_subject}}**

**Strengths (Internal Positives):**
{{#each strengths}}
- {{this}}
{{/each}}

**Weaknesses (Internal Challenges):**
{{#each weaknesses}}
- {{this}}
{{/each}}

**Opportunities (External Positives):**
{{#each opportunities}}
- {{this}}
{{/each}}

**Threats (External Challenges):**
{{#each threats}}
- {{this}}
{{/each}}

**Strategic Implications:**
1. **Leverage Strengths to capture Opportunities**
2. **Address Weaknesses that could amplify Threats**
3. **Mitigate Threats using our Strengths**
4. **Transform Weaknesses into future Strengths**

**Recommended Actions:**
{{recommended_actions}}`,
    variables: [
      { name: 'analysis_subject', type: 'string', description: 'Subject of SWOT analysis', required: true },
      { name: 'strengths', type: 'array', description: 'Internal strengths', required: true },
      { name: 'weaknesses', type: 'array', description: 'Internal weaknesses', required: true },
      { name: 'opportunities', type: 'array', description: 'External opportunities', required: true },
      { name: 'threats', type: 'array', description: 'External threats', required: true },
      { name: 'recommended_actions', type: 'string', description: 'Strategic recommendations', required: false }
    ]
  }
];

export const emotionalPrompts: PromptTemplate[] = [
  {
    id: 'emotion-wheel-exploration',
    name: 'Emotion Wheel Exploration',
    description: 'Deep exploration of emotions using the emotion wheel',
    category: 'emotional',
    template: `**Emotional Exploration: {{emotion_context}}**

Let's explore your emotions using the emotion wheel approach:

**Primary Emotion:** {{primary_emotion}}
**Secondary Emotions:** {{secondary_emotions}}
**Physical Sensations:** {{physical_sensations}}

**Emotional Layers:**
1. **Surface Level:** What you immediately feel
2. **Deeper Level:** What might be underneath
3. **Core Level:** The fundamental need or value

**Emotional Intelligence Questions:**
- What triggered this emotional response?
- What is this emotion trying to tell you?
- How might this emotion be serving you?
- What do you need to feel supported right now?

**Supportive Strategies:**
{{supportive_strategies}}

Remember, all emotions are valid and carry important information. Let's honor what you're feeling while finding healthy ways to process and respond.`,
    variables: [
      { name: 'emotion_context', type: 'string', description: 'Context for emotional exploration', required: true },
      { name: 'primary_emotion', type: 'string', description: 'Main emotion being experienced', required: true },
      { name: 'secondary_emotions', type: 'string', description: 'Additional emotions present', required: false },
      { name: 'physical_sensations', type: 'string', description: 'Physical manifestations of emotions', required: false },
      { name: 'supportive_strategies', type: 'string', description: 'Suggested coping strategies', required: false }
    ]
  }
];

// Initialize the prompt library
export function initializePromptLibrary() {
  // Register all agents with the prompt engine
  const agents = [orionAgent, lunaAgent, phoenixAgent, cosmosAgent, stellarAgent, novaAgent, vegaAgent];
  
  agents.forEach(agent => {
    // Register agent's templates
    agent.prompts.templates.forEach(template => {
      promptEngine.registerTemplate(template, agent.id);
    });
  });

  // Register system templates
  systemPrompts.forEach(template => {
    promptEngine.registerTemplate(template);
  });

  // Register specialized templates
  strategicPrompts.forEach(template => {
    promptEngine.registerTemplate(template);
  });

  emotionalPrompts.forEach(template => {
    promptEngine.registerTemplate(template);
  });

  console.log('Prompt library initialized with all agents and templates');
}

// Export the configuration
export const promptLibraryConfig = {
  agents: [orionAgent, lunaAgent, phoenixAgent, cosmosAgent, stellarAgent, novaAgent, vegaAgent],
  systemPrompts,
  strategicPrompts,
  emotionalPrompts,
  engine: promptEngine
};