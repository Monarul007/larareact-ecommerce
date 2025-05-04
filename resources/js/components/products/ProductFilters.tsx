import React from 'react';
import { router } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FilterGroup {
  name: string;
  options: Array<{
    value: string;
    label: string;
    count: number;
  }>;
}

interface ProductFiltersProps {
  filters: {
    brands: FilterGroup;
    categories: FilterGroup;
    attributes: Record<string, FilterGroup>;
  };
  priceRange: {
    min: number;
    max: number;
    current: [number, number];
  };
  selectedFilters: Record<string, string[]>;
}

export default function ProductFilters({
  filters,
  priceRange,
  selectedFilters,
}: ProductFiltersProps) {
  const updateFilters = (key: string, value: string, checked: boolean) => {
    const currentValues = selectedFilters[key] || [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);

    router.get(
      window.location.pathname,
      {
        ...selectedFilters,
        [key]: newValues,
      },
      {
        preserveState: true,
        preserveScroll: true,
      }
    );
  };

  const updatePriceRange = (values: [number, number]) => {
    router.get(
      window.location.pathname,
      {
        ...selectedFilters,
        price_min: values[0],
        price_max: values[1],
      },
      {
        preserveState: true,
        preserveScroll: true,
      }
    );
  };

  return (
    <Card className="p-4">
      <Accordion type="multiple" defaultValue={['price', 'brands', 'categories']}>
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="px-2 pt-4 space-y-4">
              <Slider
                min={priceRange.min}
                max={priceRange.max}
                step={1}
                value={priceRange.current}
                onValueChange={updatePriceRange}
              />
              <div className="flex justify-between text-sm">
                <span>${priceRange.current[0]}</span>
                <span>${priceRange.current[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brands">
          <AccordionTrigger>Brands</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {filters.brands.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${option.value}`}
                    checked={(selectedFilters.brands || []).includes(option.value)}
                    onCheckedChange={(checked) =>
                      updateFilters('brands', option.value, checked as boolean)
                    }
                  />
                  <Label htmlFor={`brand-${option.value}`}>
                    {option.label} ({option.count})
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {filters.categories.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${option.value}`}
                    checked={(selectedFilters.categories || []).includes(
                      option.value
                    )}
                    onCheckedChange={(checked) =>
                      updateFilters('categories', option.value, checked as boolean)
                    }
                  />
                  <Label htmlFor={`category-${option.value}`}>
                    {option.label} ({option.count})
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {Object.entries(filters.attributes).map(([key, group]) => (
          <AccordionItem key={key} value={key}>
            <AccordionTrigger>{group.name}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {group.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${key}-${option.value}`}
                      checked={(selectedFilters[key] || []).includes(option.value)}
                      onCheckedChange={(checked) =>
                        updateFilters(key, option.value, checked as boolean)
                      }
                    />
                    <Label htmlFor={`${key}-${option.value}`}>
                      {option.label} ({option.count})
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
}