@component('mail::message')
# New Contact Form Submission

**From:** {{ $name }} ({{ $email }})

**Message:**
{{ $messageContent }}

Thanks,<br>
{{ config('app.name') }}
@endcomponent