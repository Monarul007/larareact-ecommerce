@component('mail::message')
# Welcome to Our Newsletter!

Thank you for subscribing to our newsletter. You'll now receive the latest updates about our products, special offers, and news.

Your email address: {{ $email }}

You can unsubscribe at any time by clicking the unsubscribe link in any of our emails.

Thanks,<br>
{{ config('app.name') }}
@endcomponent