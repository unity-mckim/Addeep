type Item = {
  label: string;
  href: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

type HelpItem = {
  id: string;
  label: string;
  content: React.ReactNode;
};

interface HelpAccordionProps {
  title?: string;
  items: HelpItem[];
  type?: "single" | "multiple";
  defaultOpenIds?: string[];
}
