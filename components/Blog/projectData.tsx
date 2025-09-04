import { Project } from "@/types/blog";
import { useTranslations } from "next-intl";

export const projectData = (): Project[] => {
  const t = useTranslations("projects");

  return [
    {
      id: 1,
      title: t("n8nWorkflows.title"),
      paragraph: t("n8nWorkflows.paragraph"),
      tags: [t("tags.automation"), t("tags.ai"), t("tags.workflows")],
      publishDate: "2024-01-01",
      link: null
    },
    {
      id: 2,
      title: t("aiStockPrediction.title"),
      paragraph: t("aiStockPrediction.paragraph"),
      tags: [t("tags.ai"), t("tags.stocks")],
      publishDate: "2024-01-01",
      link: "https://vestr.pro"
    },
    {
      id: 3,
      title: t("dataGeneration.title"),
      paragraph: t("dataGeneration.paragraph"),
      tags: [t("tags.data"), t("tags.generation"), t("tags.clean")],
      publishDate: "2024-01-01",
      link: "https://app.delib.pro"
    },
    {
      id: 4,
      title: t("aiSecurityAnalyzer.title"),
      paragraph: t("aiSecurityAnalyzer.paragraph"),
      tags: [t("tags.ai"), t("tags.security")],
      publishDate: "2024-01-01",
      link: "https://analyze.codes"
    },
    {
      id: 5,
      title: t("aiSizing.title"),
      paragraph: t("aiSizing.paragraph"),
      tags: [t("tags.ai"), t("tags.sizing")],
      publishDate: "2024-01-01",
      link: "https://www.weefizz.com"
    },
    {
      id: 6,
      title: t("linkedinAutomation.title"),
      paragraph: t("linkedinAutomation.paragraph"),
      tags: [t("tags.ai"), t("tags.linkedin")],
      publishDate: "2024-01-01",
      link: null
    },
    {
      id: 7,
      title: t("tMobilePartner.title"),
      paragraph: t("tMobilePartner.paragraph"),
      tags: [t("tags.mobile"), t("tags.operator")],
      publishDate: "2024-01-01",
      link: "https://fliggsmobile.com"
    },
    {
      id: 8,
      title: t("fintechBlockchain.title"),
      paragraph: t("fintechBlockchain.paragraph"),
      tags: [t("tags.finance"), t("tags.crypto")],
      publishDate: "2024-01-01",
      link: null
    }
  ];
};
export default projectData;
