import React from 'react';
import { Head } from '@inertiajs/react';
import { MainLayout } from '@/layouts/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Truck, Clock, Globe2, ShieldCheck } from 'lucide-react';

export default function Shipping() {
  const shippingMethods = [
    {
      name: 'Standard Shipping',
      duration: '3-5 business days',
      cost: 'Free on orders over $50',
      description: 'Best for non-urgent deliveries',
    },
    {
      name: 'Express Shipping',
      duration: '2-3 business days',
      cost: '$9.99',
      description: 'Faster delivery for your orders',
    },
    {
      name: 'Next Day Delivery',
      duration: '1 business day',
      cost: '$14.99',
      description: 'Get your items the next business day',
    },
    {
      name: 'International Shipping',
      duration: '7-14 business days',
      cost: 'Varies by location',
      description: 'Available for select countries',
    },
  ];

  return (
    <MainLayout>
      <Head title="Shipping Information" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4">Shipping Information</h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about our shipping policies and delivery options
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Free Shipping</h3>
                  <p className="text-sm text-muted-foreground">On orders over $50</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Fast Delivery</h3>
                  <p className="text-sm text-muted-foreground">Next day available</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Globe2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">International</h3>
                  <p className="text-sm text-muted-foreground">Worldwide shipping</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Secure</h3>
                  <p className="text-sm text-muted-foreground">Package protection</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold mb-6">Shipping Methods</h2>
            <div className="space-y-4">
              {shippingMethods.map((method, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{method.name}</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>Duration: {method.duration}</p>
                      <p>Cost: {method.cost}</p>
                      <p>{method.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I track my order?</AccordionTrigger>
                <AccordionContent>
                  Once your order ships, you'll receive a tracking number via email.
                  You can use this number to track your package on our website or
                  the carrier's website.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Which countries do you ship to?</AccordionTrigger>
                <AccordionContent>
                  We currently ship to most countries worldwide. Shipping costs and
                  delivery times vary by location. Enter your address at checkout
                  to see available shipping options.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How is shipping cost calculated?</AccordionTrigger>
                <AccordionContent>
                  Shipping costs are calculated based on the weight of your items,
                  your location, and your chosen shipping method. Orders over $50
                  qualify for free standard shipping within the continental US.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>What if my package is damaged?</AccordionTrigger>
                <AccordionContent>
                  All packages are insured. If your package arrives damaged,
                  please take photos and contact our customer service team
                  immediately. We'll send a replacement or issue a refund.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}