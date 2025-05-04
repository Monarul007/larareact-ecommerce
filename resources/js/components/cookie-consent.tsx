import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAcceptedCookies = localStorage.getItem('cookie-consent');
    if (!hasAcceptedCookies) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <Card className="mx-auto max-w-4xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Cookie Notice</h3>
              <p className="text-muted-foreground text-sm">
                We use cookies to enhance your browsing experience, serve personalized
                ads or content, and analyze our traffic. By clicking "Accept All",
                you consent to our use of cookies.{' '}
                <Link
                  href={route('cookies')}
                  className="text-primary hover:underline"
                >
                  Read our Cookie Policy
                </Link>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsVisible(false)}
              >
                Decline
              </Button>
              <Button
                size="sm"
                onClick={acceptCookies}
              >
                Accept All
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 sm:hidden"
                onClick={() => setIsVisible(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}