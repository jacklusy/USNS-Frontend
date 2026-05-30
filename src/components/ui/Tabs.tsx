"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { TABS_COPY } from "@/constants/tabs.constants";
import { useTabsKeyboard } from "@/hooks/useTabsKeyboard";
import { useTabsUrlState } from "@/hooks/useTabsUrlState";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  items: readonly TabItem[];
  value: string;
  onChange: (id: string) => void;
  lazy?: boolean;
  urlParam?: string;
  className?: string;
}

interface TabsWithUrlProps extends Omit<TabsProps, "value" | "onChange"> {
  urlParam: string;
  defaultTabId?: string;
}

function TabsInner({
  items,
  value,
  onChange,
  lazy = true,
  className = "",
}: TabsProps) {
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activatedIds, setActivatedIds] = useState<Set<string>>(
    () => new Set([value]),
  );

  const disabledIds = new Set(
    items.filter((item) => item.disabled).map((item) => item.id),
  );

  const { handleKeyDown } = useTabsKeyboard({
    tabIds: items.map((item) => item.id),
    disabledIds,
    value,
    onChange: (id) => {
      setActivatedIds((prev) => new Set(prev).add(id));
      onChange(id);
    },
    tabRefs,
  });

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={TABS_COPY.tabListLabel}
        className="flex gap-1 border-b border-border"
        onKeyDown={handleKeyDown}
      >
        {items.map((item, index) => {
          const selected = item.id === value;
          const tabId = `${baseId}-tab-${item.id}`;
          const panelId = `${baseId}-panel-${item.id}`;
          return (
            <button
              key={item.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={tabId}
              aria-selected={selected}
              aria-controls={panelId}
              disabled={item.disabled}
              tabIndex={selected ? 0 : -1}
              onClick={() => {
                if (item.disabled) return;
                setActivatedIds((prev) => new Set(prev).add(item.id));
                onChange(item.id);
              }}
              className={`relative min-h-11 px-4 text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                selected
                  ? "text-brand"
                  : "text-muted-fg hover:text-foreground"
              }`}
            >
              {item.label}
              {selected ? (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand"
                  aria-hidden="true"
                />
              ) : null}
            </button>
          );
        })}
      </div>
      {items.map((item) => {
        const selected = item.id === value;
        const panelId = `${baseId}-panel-${item.id}`;
        const tabId = `${baseId}-tab-${item.id}`;
        const shouldRender = !lazy || activatedIds.has(item.id);
        if (!shouldRender) return null;

        return (
          <div
            key={item.id}
            role="tabpanel"
            id={panelId}
            aria-labelledby={tabId}
            hidden={!selected}
            tabIndex={0}
            className="pt-6 focus-visible:outline-none"
          >
            {selected ? item.content : null}
          </div>
        );
      })}
    </div>
  );
}

export function Tabs(props: TabsProps) {
  return <TabsInner {...props} />;
}

export function TabsWithUrl({
  items,
  urlParam,
  defaultTabId,
  lazy = true,
  className = "",
}: TabsWithUrlProps) {
  const fallbackId = defaultTabId ?? items[0]?.id ?? "";
  const { value, onChange } = useTabsUrlState({
    paramName: urlParam,
    tabIds: items.map((item) => item.id),
    defaultTabId: fallbackId,
  });

  return (
    <TabsInner
      items={items}
      value={value}
      onChange={onChange}
      lazy={lazy}
      className={className}
    />
  );
}
