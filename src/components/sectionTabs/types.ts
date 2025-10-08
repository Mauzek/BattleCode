interface SectionTab {
  label: string;
  path: string;
}

export interface SectionTabsProps {
  tabs: SectionTab[];
  label?: string;
}