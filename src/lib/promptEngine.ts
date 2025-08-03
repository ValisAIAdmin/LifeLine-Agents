import type { PromptTemplate, PromptVariable, PromptCategory } from './types';

export class PromptEngine {
  private templates: Map<string, PromptTemplate> = new Map();
  private categories: Map<PromptCategory, PromptTemplate[]> = new Map();
  private agentTemplates: Map<string, PromptTemplate[]> = new Map();

  constructor() {
    this.initializeCategories();
  }

  private initializeCategories() {
    const categories: PromptCategory[] = [
      'strategic', 'emotional', 'crisis', 'research', 
      'communication', 'creative', 'analytical'
    ];
    
    categories.forEach(category => {
      this.categories.set(category, []);
    });
  }

  registerTemplate(template: PromptTemplate, agentId?: string): void {
    this.templates.set(template.id, template);
    
    // Add to category
    const categoryTemplates = this.categories.get(template.category) || [];
    categoryTemplates.push(template);
    this.categories.set(template.category, categoryTemplates);

    // Add to agent if specified
    if (agentId) {
      const agentTemplates = this.agentTemplates.get(agentId) || [];
      agentTemplates.push(template);
      this.agentTemplates.set(agentId, agentTemplates);
    }
  }

  renderTemplate(templateId: string, variables: Record<string, string | number | boolean | string[]>): string {
    const template = this.templates.get(templateId);
    if (!template) {
      throw new Error(`Template ${templateId} not found`);
    }

    if (!this.validateVariables(template, variables)) {
      throw new Error(`Invalid variables for template ${templateId}`);
    }

    return this.interpolateTemplate(template.template, variables);
  }

  private interpolateTemplate(template: string, variables: Record<string, string | number | boolean | string[]>): string {
    return template.replace(/\{\{(\w+)\}\}/g, (match, varName) => {
      const value = variables[varName];
      if (value === undefined) return match;
      if (Array.isArray(value)) return value.join(', ');
      return String(value);
    });
  }

  validateVariables(template: PromptTemplate, variables: Record<string, string | number | boolean | string[]>): boolean {
    for (const variable of template.variables) {
      if (variable.required && !(variable.name in variables)) {
        return false;
      }

      if (variable.name in variables) {
        const value = variables[variable.name];
        if (!this.validateVariableType(value, variable.type)) {
          return false;
        }
      }
    }
    return true;
  }

  private validateVariableType(value: string | number | boolean | string[], type: PromptVariable['type']): boolean {
    switch (type) {
      case 'string':
        return typeof value === 'string';
      case 'number':
        return typeof value === 'number';
      case 'boolean':
        return typeof value === 'boolean';
      case 'array':
        return Array.isArray(value);
      default:
        return false;
    }
  }

  getTemplatesByCategory(category: PromptCategory): PromptTemplate[] {
    return this.categories.get(category) || [];
  }

  getTemplatesByAgent(agentId: string): PromptTemplate[] {
    return this.agentTemplates.get(agentId) || [];
  }

  getAllTemplates(): PromptTemplate[] {
    return Array.from(this.templates.values());
  }

  getTemplate(templateId: string): PromptTemplate | undefined {
    return this.templates.get(templateId);
  }
}

// Global prompt engine instance
export const promptEngine = new PromptEngine();