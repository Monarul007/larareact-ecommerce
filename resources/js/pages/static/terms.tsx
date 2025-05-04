import React from 'react';
import { Head } from '@inertiajs/react';
import { MainLayout } from '@/layouts/MainLayout';

export default function Terms() {
  return (
    <MainLayout>
      <Head title="Terms of Service" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="lead">
            Please read these terms of service carefully before using our website.
            By accessing or using our website, you agree to be bound by these terms.
          </p>

          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing our website, you agree to be bound by these Terms of Service
            and all applicable laws and regulations. If you do not agree with any
            of these terms, you are prohibited from using or accessing this site.
          </p>

          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials
            (information or software) on our website for personal, non-commercial
            transitory viewing only.
          </p>

          <h2>3. Account Registration</h2>
          <p>
            To access certain features of the website, you may be required to register
            for an account. You agree to provide accurate and complete information
            during registration and to update such information to keep it accurate
            and current.
          </p>

          <h2>4. Product Information</h2>
          <p>
            We strive to display accurate product information, including prices
            and availability. However, we reserve the right to correct any errors,
            inaccuracies, or omissions and to change or update information at any
            time without prior notice.
          </p>

          <h2>5. Pricing and Payment</h2>
          <p>
            All prices are subject to change without notice. We reserve the right
            to modify or discontinue any product without notice. We are not liable
            to you or any third party for any modification, price change, suspension,
            or discontinuance of products.
          </p>

          <h2>6. Shipping and Delivery</h2>
          <p>
            Shipping times and costs may vary based on location and selected shipping
            method. We are not responsible for delays caused by customs, weather,
            or other circumstances beyond our control.
          </p>

          <h2>7. Returns and Refunds</h2>
          <p>
            Our return and refund policy is outlined in detail in our Returns Policy
            section. By making a purchase, you agree to these terms.
          </p>

          <h2>8. Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, images,
            and software, is our property or the property of our licensors and is
            protected by copyright and other intellectual property laws.
          </p>

          <h2>9. User Conduct</h2>
          <p>
            You agree not to:
          </p>
          <ul>
            <li>Use the website for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to any portion of the website</li>
            <li>Interfere with the proper working of the website</li>
            <li>Make any unauthorized use of the website</li>
          </ul>

          <h2>10. Privacy Policy</h2>
          <p>
            Your use of our website is also governed by our Privacy Policy. Please
            review our Privacy Policy to understand our practices.
          </p>

          <h2>11. Limitation of Liability</h2>
          <p>
            We shall not be liable for any direct, indirect, incidental, special,
            or consequential damages resulting from the use or inability to use
            our services.
          </p>

          <h2>12. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will
            be effective immediately upon posting on the website. Your continued
            use of the website constitutes acceptance of the modified terms.
          </p>

          <h2>13. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact
            us through our contact page.
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