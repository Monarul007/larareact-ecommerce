import React from 'react';
import { Head } from '@inertiajs/react';
import { MainLayout } from '@/layouts/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { RefreshCw, ShieldCheck, Clock, AlertCircle } from 'lucide-react';

export default function Returns() {
  const steps = [
    {
      title: 'Start Your Return',
      description: 'Sign in to your account and go to your orders. Select the item you want to return and follow the prompts.',
    },
    {
      title: 'Pack Your Items',
      description: 'Pack the items securely in their original packaging if possible. Include all tags, accessories, and documentation.',
    },
    {
      title: 'Print Label & Ship',
      description: 'Print the prepaid return label and attach it to your package. Drop it off at any authorized shipping location.',
    },
    {
      title: 'Get Your Refund',
      description: 'Once we receive and inspect your return, we'll process your refund within 3-5 business days.',
    },
  ];

  return (
    <MainLayout>
      <Head title="Returns & Refunds" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4">Returns & Refunds</h1>
          <p className="text-xl text-muted-foreground">
            Easy returns within 30 days of purchase
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">30-Day Returns</h3>
              <p className="text-muted-foreground">
                Return any item within 30 days of delivery for a full refund
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Free Returns</h3>
              <p className="text-muted-foreground">
                We provide free return shipping on all orders
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Quick Refunds</h3>
              <p className="text-muted-foreground">
                Refunds are processed within 3-5 business days
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">How to Return</h2>
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-none">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      {index + 1}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button className="mt-8">
              Start a Return
            </Button>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Return Policy FAQs</h2>
            <Card>
              <CardContent className="p-6">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What items can I return?</AccordionTrigger>
                    <AccordionContent>
                      Most items can be returned within 30 days of delivery. Items must be
                      unused and in their original packaging with all tags attached. Some
                      items, like undergarments and customized products, are not eligible
                      for return.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>How long do refunds take?</AccordionTrigger>
                    <AccordionContent>
                      Once we receive your return, we'll inspect it and process your refund
                      within 3-5 business days. The time it takes for the money to appear
                      in your account depends on your payment method and bank.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>Can I exchange an item?</AccordionTrigger>
                    <AccordionContent>
                      Yes, you can exchange items for a different size or color. Start a
                      return and select "Exchange" as your return reason. Once we receive
                      your return, we'll ship out your exchange item.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>What if my item is damaged?</AccordionTrigger>
                    <AccordionContent>
                      If you receive a damaged item, please contact our customer service
                      team immediately. Take photos of the damage and we'll help you with
                      a return or replacement right away.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="bg-primary/5 border-primary/10">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-none">
                <AlertCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Important Note</h3>
                <p className="text-muted-foreground">
                  Some items have special return conditions. Please check the product
                  page or your order confirmation email for specific return policy
                  information. If you have any questions, our customer service team
                  is here to help.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}