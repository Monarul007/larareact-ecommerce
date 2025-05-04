import React from 'react';
import { Head } from '@inertiajs/react';
import { MainLayout } from '@/layouts/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Search } from 'lucide-react';

export default function FAQ() {
  const faqs = {
    'Orders & Shipping': [
      {
        question: 'How do I track my order?',
        answer: 'Once your order ships, you\'ll receive a tracking number via email. You can use this to track your package on our website or the carrier\'s website.',
      },
      {
        question: 'What shipping methods are available?',
        answer: 'We offer standard shipping (3-5 business days), express shipping (2-3 business days), and next-day delivery options. International shipping is also available for most countries.',
      },
      {
        question: 'Do you ship internationally?',
        answer: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. Enter your address at checkout to see available options.',
      },
    ],
    'Returns & Refunds': [
      {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy for most items. Products must be unused and in their original packaging. Some items, like personalized products, cannot be returned.',
      },
      {
        question: 'How do I start a return?',
        answer: 'Log into your account, go to your orders, and select the item you want to return. Follow the prompts to generate a return label and instructions.',
      },
      {
        question: 'When will I receive my refund?',
        answer: 'Refunds are processed within 3-5 business days after we receive your return. The time it takes for the money to appear in your account depends on your payment method.',
      },
    ],
    'Product Information': [
      {
        question: 'Are your products authentic?',
        answer: 'Yes, all products sold on our platform are 100% authentic. We work directly with brands and authorized distributors to ensure authenticity.',
      },
      {
        question: 'What if a product is out of stock?',
        answer: 'You can sign up for email notifications when out-of-stock items become available. Click the "Notify Me" button on the product page.',
      },
      {
        question: 'Do you offer product warranties?',
        answer: 'Product warranties vary by manufacturer. Specific warranty information can be found on individual product pages.',
      },
    ],
    'Payment & Security': [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, PayPal, and various digital payment methods. All payments are processed securely.',
      },
      {
        question: 'Is my payment information secure?',
        answer: 'Yes, we use industry-standard encryption to protect your payment information. We never store your full credit card details.',
      },
      {
        question: 'Do you charge sales tax?',
        answer: 'Sales tax is charged based on your location and local tax laws. The exact amount will be calculated at checkout.',
      },
    ],
  };

  return (
    <MainLayout>
      <Head title="Frequently Asked Questions" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Find answers to common questions about our products and services
          </p>

          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Search FAQs..." 
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {Object.entries(faqs).map(([category, questions]) => (
            <Card key={category}>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">{category}</h2>
                <Accordion type="single" collapsible>
                  {questions.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-12">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find the answer you're looking for? We're here to help.
            </p>
            <Button asChild>
              <a href={route('contact')}>Contact Support</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}