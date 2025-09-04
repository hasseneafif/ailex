// actionsdata.ts
export interface ActionData {
  id: number;
  responseKey: string;
  keywordsKeys: string[];
}

const actionsDataConfig: ActionData[] = [
  { id: 0, responseKey: "responses.downloadCV", keywordsKeys: ["keywords.cv", "keywords.resume", "keywords.CV"] },
  { id: 1, responseKey: "responses.showProjects", keywordsKeys: ["keywords.projects", "keywords.experience"] },
  { id: 2, responseKey: "responses.checkSkills", keywordsKeys: ["keywords.skills"] },
  { id: 3, responseKey: "responses.openLinkedIn", keywordsKeys: ["keywords.linkedin"] },
  { id: 4, responseKey: "responses.showContact", keywordsKeys: ["keywords.email", "keywords.phone", "keywords.contact"] },
];

// Generate translated actions with the given t()
export const getActionsData = (t: (key: string) => string) =>
  actionsDataConfig.map(action => ({
    id: action.id,
    response: t(action.responseKey),
    keywords: action.keywordsKeys.map(key => t(key))
  }));

// Match a message to an action
export const findMatchingAction = (
  message: string,
  t: (key: string) => string,
  minKeywords = 1
) => {
  const lowerMessage = message.toLowerCase();
  const actionsData = getActionsData(t);

  for (const action of actionsData) {
    const matchingKeywords = action.keywords.filter(keyword =>
      lowerMessage.includes(keyword.toLowerCase())
    ).length;

    if (matchingKeywords >= minKeywords) {
      return { id: action.id, response: action.response };
    }
  }
  return null;
};

export default actionsDataConfig;
