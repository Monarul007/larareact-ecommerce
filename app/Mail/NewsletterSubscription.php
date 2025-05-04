<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewsletterSubscription extends Mailable
{
    use Queueable, SerializesModels;

    public $email;

    public function __construct(string $email)
    {
        $this->email = $email;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Welcome to Our Newsletter!',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.newsletter-subscription',
            with: [
                'email' => $this->email,
            ],
        );
    }
}