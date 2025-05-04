import React from 'react';
import { Head } from '@inertiajs/react';
import { MainLayout } from '@/layouts/MainLayout';

export default function Privacy() {
  return (
    <MainLayout>
      <Head title="Privacy Policy" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="lead">
            Your privacy is important to us. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you visit our website.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We collect information that you provide directly to us when you:
          </p>
          <ul>
            <li>Create an account</li>
            <li>Make a purchase</li>
            <li>Sign up for our newsletter</li>
            <li>Contact us</li>
            <li>Participate in surveys or promotions</li>
          </ul>

          <h3>Personal Information</h3>
          <p>
            This may include:
          </p>
          <ul>
            <li>Name and contact information</li>
            <li>Billing and shipping addresses</li>
            <li>Payment information</li>
            <li>Email address</li>
            <li>Phone number</li>
          </ul>

          <h3>Automatically Collected Information</h3>
          <p>
            When you visit our website, we automatically collect certain information,
            including:
          </p>
          <ul>
            <li>IP address</li>
            <li>Browser type</li>
            <li>Device information</li>
            <li>Usage data</li>
            <li>Cookies and similar technologies</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Process your orders and payments</li>
            <li>Communicate with you about orders and services</li>
            <li>Send marketing communications (with your consent)</li>
            <li>Improve our website and services</li>
            <li>Detect and prevent fraud</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>
            We may share your information with:
          </p>
          <ul>
            <li>Service providers who assist in our operations</li>
            <li>Payment processors</li>
            <li>Shipping carriers</li>
            <li>Legal authorities when required by law</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal
            information. However, no method of transmission over the Internet is
            100% secure, and we cannot guarantee absolute security.
          </p>

          <h2>Your Rights</h2>
          <p>
            You have the right to:
          </p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
            <li>Withdraw consent where applicable</li>
          </ul>

          <h2>Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to collect and track
            information about your browsing activities. You can control cookies
            through your browser settings.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not
            responsible for the privacy practices or content of these websites.
          </p>

          <h2>Children's Privacy</h2>
          <p>
            Our website is not intended for children under 13 years of age. We do
            not knowingly collect personal information from children under 13.
          </p>

          <h2>Changes to Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us
            through our contact page.
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