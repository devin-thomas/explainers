export type AzureContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "bullets" | "ordered"; items: string[] }
  | { type: "code"; text: string }
  | { type: "subheading"; text: string };

export interface AzureResponsibilityGroup { title: string | null; items: string[]; }
export interface AzureFailure { title: string; detail: string; }
export interface AzurePortalGroup { title: string | null; items: string[]; }
export interface AzureSource { label: string; url: string; }
export interface AzureSection { title: string; blocks: AzureContentBlock[]; }
export interface AzureCloudTopic {
  key: string; route: string; title: string; shortTitle: string; summary: string;
  mentalModel: AzureContentBlock[]; flowTitle: string; flow: string[]; sections: AzureSection[];
  azureManages: AzureResponsibilityGroup[]; youManage: AzureResponsibilityGroup[];
  failures: AzureFailure[]; portal: AzurePortalGroup[]; checklist: string[]; sources: AzureSource[];
}

import { topic01 } from "./01-docker-image-registry-container-app";
import { topic02 } from "./02-static-web-apps-vs-container-apps";
import { topic03 } from "./03-dns-custom-domains-https";
import { topic04 } from "./04-scale-to-zero-cold-starts";
import { topic05 } from "./05-github-actions-revisions-rollback";
import { topic06 } from "./06-environment-variables-secrets";
import { topic07 } from "./07-stateless-storage-firebase-sqlite";
import { topic08 } from "./08-health-probes";
import { topic09 } from "./09-observability-troubleshooting";
import { topic10 } from "./10-costs-credits-resource-groups";
import { topic11 } from "./11-multiple-container-apps";
import { topic12 } from "./12-docker-compose-to-cloud";

export const azureCloudTopics: AzureCloudTopic[] = [topic01, topic02, topic03, topic04, topic05, topic06, topic07, topic08, topic09, topic10, topic11, topic12];

export function getAzureCloudTopicByRoute(route: string): AzureCloudTopic {
  const topic = azureCloudTopics.find((entry) => entry.route === route);
  if (!topic) throw new Error(`Unknown Azure cloud route: ${route}`);
  return topic;
}
