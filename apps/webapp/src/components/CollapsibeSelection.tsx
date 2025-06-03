import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Checkbox,
  Label,
} from '@repo/ui/components';
import React from 'react';

export const TEMP_ITEMS: { name: string; description: string }[] = [
  ...[
    'teeth-whitening',
    'veneers',
    'implants',
    'crowns-bridges',
    'dental-bonding',
    'inlays-onlays',
    'dental-filling',
    'gum-recontouring',
    'smile-design',
    'teeth-contouring',
  ]
    .slice(0, 15)
    .map((type) => ({
      name: type,
      description: type
        .replace(/-/g, ' ')
        .replace(
          /\w\S*/g,
          (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
        ),
    })),
];

type Props = {
  name: string;
  label: string;
  items: { name: string; description: string }[];
  selections: string[];
  onSelect: (name: string, selected: boolean) => void;
};

export const CollapsibeSelection: React.FC<Props> = ({
  name,
  label,
  items,
  selections,
  onSelect,
}) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="border border-border rounded-lg"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="px-4 hover:no-underline flex items-center">
          <div className="flex gap-2">
            <span className="h-[22px]">{label}</span>
            {selections.length !== 0 && (
              <Badge
                variant="default"
                className="bg-gray-300 text-gray-500 capitalize rounded-sm text-xs font-medium"
              >
                {selections.length} Selected
              </Badge>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent className="border-t border-border pb-0">
          {items.map((item) => {
            return (
              <Label
                key={`${name}-${item.name}`}
                htmlFor={`${name}-${item.name}`}
                className="flex items-center gap-2 px-3 py-4 not-[:last-child]:border-b border-border cursor-pointer font-medium"
              >
                <Checkbox
                  id={`${name}-${item.name}`}
                  checked={selections.includes(item.name)}
                  onCheckedChange={(selected) =>
                    onSelect(item.name, selected as boolean)
                  }
                  className="size-5"
                />
                {item.description}
              </Label>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
