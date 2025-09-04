"use client";

import { useLocale } from "next-intl";

export const useActionsLogic = () => {
  const locale = useLocale();

  const downloadCV = async () => {
    try {
      // Pick correct file depending on locale
      const fileSuffix = locale === "fr" ? "_FR" : "";
      const pdfUrl = `/cvs/Hassene_Afif_CV${fileSuffix}.pdf`;

      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = `Hassene_Afif_CV${fileSuffix}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log(`PDF download initiated: ${pdfUrl}`);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  const scrollToComponent = (componentId: string) => {
    try {
      const element = document.getElementById(componentId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        console.log(`Scrolled to component: ${componentId}`);
      } else {
        console.warn(`Component with ID "${componentId}" not found`);
      }
    } catch (error) {
      console.error(`Error scrolling to component ${componentId}:`, error);
    }
  };

  const navigateToSkills = () => {
    scrollToComponent("projects");
  };

  const navigateToHero = () => {
    scrollToComponent("skills");
  };

  const executeAction = async (actionId: number): Promise<void> => {
    switch (actionId) {
      case 0:
        await downloadCV();
        break;
      case 1:
        navigateToSkills();
        break;
      case 2:
        navigateToHero();
        break;
      default:
        console.warn(`Unknown action ID: ${actionId}`);
        break;
    }
  };

  return { executeAction };
};

export default useActionsLogic;
