import React from 'react';
import { Head } from '@inertiajs/react';
import { MainLayout } from '@/layouts/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Building2 } from 'lucide-react';

export default function Careers() {
  const openings = [
    {
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'We are looking for an experienced software engineer to join our team and help build the future of e-commerce.',
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'New York',
      type: 'Full-time',
      description: 'Join us as a Product Manager to help shape our product roadmap and drive innovation.',
    },
    {
      title: 'Customer Support Specialist',
      department: 'Support',
      location: 'Remote',
      type: 'Full-time',
      description: 'Help our customers succeed by providing exceptional support and solutions.',
    },
  ];

  return (
    <MainLayout>
      <Head title="Careers" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl text-muted-foreground">
            We're looking for passionate people to help us build the future of e-commerce.
            Join us in our mission to revolutionize online shopping.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Great Culture</h3>
              <p className="text-muted-foreground">
                Work with passionate people in an environment that promotes growth and innovation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Work-Life Balance</h3>
              <p className="text-muted-foreground">
                Flexible working hours and remote work options to help you maintain a healthy balance.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Global Team</h3>
              <p className="text-muted-foreground">
                Join a diverse team of talented individuals from around the world.
              </p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
        
        <div className="space-y-4">
          {openings.map((job, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <Badge variant="secondary">{job.type}</Badge>
                    </div>
                    <p className="mt-3">{job.description}</p>
                  </div>
                  <Button>Apply Now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}