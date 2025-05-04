import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { MainLayout } from '@/layouts/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mail,
  MessageSquare,
  Phone,
  MapPin,
  Clock,
} from 'lucide-react';

export default function Contact() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('contact.send'), {
      onSuccess: () => reset(),
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'support@yourstore.com',
      link: 'mailto:support@yourstore.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '1-800-123-4567',
      link: 'tel:18001234567',
    },
    {
      icon: MapPin,
      title: 'Address',
      value: '123 Commerce St, Suite 100, New York, NY 10001',
      link: 'https://maps.google.com/?q=123+Commerce+St,+New+York,+NY+10001',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      value: 'Monday - Friday: 9:00 AM - 6:00 PM EST',
    },
  ];

  return (
    <MainLayout>
      <Head title="Contact Us" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground">
            Have a question? We'd love to hear from you. Send us a message
            and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        error={errors.name}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive mt-1">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your email"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        error={errors.email}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="How can we help?"
                      value={data.subject}
                      onChange={e => setData('subject', e.target.value)}
                      error={errors.subject}
                    />
                    {errors.subject && (
                      <p className="text-sm text-destructive mt-1">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Your message"
                      rows={6}
                      value={data.message}
                      onChange={e => setData('message', e.target.value)}
                      error={errors.message}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive mt-1">{errors.message}</p>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={processing}>
                    {processing ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {contactInfo.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-none">
                      <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      {item.link ? (
                        <a
                          href={item.link}
                          target={item.link.startsWith('http') ? '_blank' : undefined}
                          rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-primary hover:underline"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="mt-12">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-none">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Need Immediate Help?</h3>
                <p className="text-muted-foreground">
                  Our customer service team is available Monday through Friday
                  from 9:00 AM to 6:00 PM EST. For faster service, please include
                  your order number if your inquiry is about an existing order.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}