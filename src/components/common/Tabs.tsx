import React from "react";

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: "default" | "pills" | "underline";
  fullWidth?: boolean;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = "default",
  fullWidth = false,
}) => {
  const variantClasses = {
    default: {
      container: "border-b border-github-border",
      tab: (isActive: boolean) => `
        px-4 py-2 text-sm font-medium
        ${
          isActive
            ? "text-white border-b-2 border-orange-500 -mb-px"
            : "text-gray-400 hover:text-gray-300 border-b-2 border-transparent"
        }
      `,
    },
    pills: {
      container: "bg-github-darker p-1 rounded-lg inline-flex",
      tab: (isActive: boolean) => `
        px-4 py-2 text-sm font-medium rounded-md transition-colors
        ${
          isActive
            ? "bg-gray-800 text-white"
            : "text-gray-400 hover:text-gray-300"
        }
      `,
    },
    underline: {
      container: "border-b border-github-border",
      tab: (isActive: boolean) => `
        px-4 py-3 text-sm font-medium
        ${
          isActive
            ? "text-white border-b-2 border-orange-500 -mb-px"
            : "text-gray-400 hover:text-gray-300 border-b-2 border-transparent"
        }
      `,
    },
  };

  const containerClasses = `${variantClasses[variant].container} ${fullWidth ? "w-full" : ""}`;
  const tabWidthClass = fullWidth ? "flex-1 text-center" : "";

  return (
    <div className={containerClasses}>
      <div className={`flex ${fullWidth ? "w-full" : ""}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              ${variantClasses[variant].tab(activeTab === tab.id)}
              ${tabWidthClass}
              flex items-center justify-center gap-2
              transition-colors
            `}
          >
            {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className="px-2 py-0.5 bg-gray-800 rounded-full text-xs">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
