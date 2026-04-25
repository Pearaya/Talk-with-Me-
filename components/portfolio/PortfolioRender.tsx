import { Portfolio } from "@/lib/portfolio-types";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { BoldTemplate } from "./templates/BoldTemplate";
import { ModernTemplate } from "./templates/ModernTemplate";

export function PortfolioRender({ portfolio }: { portfolio: Portfolio }) {
  switch (portfolio.templateId) {
    case "bold":
      return <BoldTemplate p={portfolio} />;
    case "modern":
      return <ModernTemplate p={portfolio} />;
    case "minimal":
    default:
      return <MinimalTemplate p={portfolio} />;
  }
}
