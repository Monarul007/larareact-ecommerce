<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\NewsletterSubscription;

class NewsletterController extends Controller
{
    public function subscribe(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|max:255',
        ]);

        // Here you would typically:
        // 1. Store the email in your newsletter subscribers database
        // 2. Send to your email marketing service (e.g., Mailchimp)
        // For now, we'll just send a confirmation email

        Mail::to($validated['email'])
            ->send(new NewsletterSubscription($validated['email']));

        return back()->with('success', 'Thank you for subscribing to our newsletter!');
    }
}