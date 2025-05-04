import React from 'react';
import { Head } from '@inertiajs/react';
import { MainLayout } from '@/layouts/MainLayout';
import { Card, CardContent } from '@/components/ui/card';

export default function Cookies() {
  return (
    <MainLayout>
      <Head title="Cookie Policy" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="lead">
            This Cookie Policy explains how we use cookies and similar tracking technologies
            on our website. By using our website, you agree to our use of cookies as
            described in this policy.
          </p>

          <h2>What Are Cookies?</h2>
          <p>
            Cookies are small text files that are stored on your device when you visit
            a website. They are widely used to make websites work more efficiently and
            provide useful information to website owners.
          </p>

          <h2>How We Use Cookies</h2>
          <div className="grid gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Essential Cookies</h3>
                <p className="text-muted-foreground">
                  These cookies are necessary for the website to function properly.
                  They enable core functionality such as security, account authentication,
                  and shopping cart management. You cannot opt out of these cookies.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Performance Cookies</h3>
                <p className="text-muted-foreground">
                  These cookies help us understand how visitors interact with our website
                  by collecting and reporting information anonymously. This helps us
                  improve our website's performance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Functionality Cookies</h3>
                <p className="text-muted-foreground">
                  These cookies enable enhanced functionality and personalization, such
                  as remembering your preferences and settings. The website may not
                  function properly if you disable these cookies.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Marketing Cookies</h3>
                <p className="text-muted-foreground">
                  These cookies track your online activity to help advertisers deliver
                  more relevant advertising or to limit how many times you see an ad.
                  These cookies can share information with other organizations or
                  advertisers.
                </p>
              </CardContent>
            </Card>
          </div>

          <h2>Managing Cookies</h2>
          <p>
            Most web browsers allow you to control cookies through their settings.
            You can:
          </p>
          <ul>
            <li>View cookies stored on your device</li>
            <li>Allow, block, or delete cookies</li>
            <li>Set browser preferences for future cookie usage</li>
            <li>Enable "private" or "incognito" browsing mode</li>
          </ul>

          <h2>Third-Party Cookies</h2>
          <p>
            We may use third-party services that also set cookies on our website.
            These services include:
          </p>
          <ul>
            <li>Analytics (e.g., Google Analytics)</li>
            <li>Payment processing</li>
            <li>Social media integration</li>
            <li>Advertising networks</li>
          </ul>

          <h2>Cookie Duration</h2>
          <p>
            Cookies can be:
          </p>
          <ul>
            <li>
              <strong>Session cookies:</strong> These are temporary and expire when
              you close your browser
            </li>
            <li>
              <strong>Persistent cookies:</strong> These remain on your device until
              they expire or you delete them
            </li>
          </ul>

          <h2>Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time. Any changes will be
            posted on this page with a revised effective date.
          </p>

          <div className="mt-8 p-4 bg-muted rounded-lg text-sm">
            <p>
              Last updated: May 4, 2025
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}