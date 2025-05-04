<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class StaticPageController extends Controller
{
    public function about()
    {
        return Inertia::render('static/about');
    }

    public function contact()
    {
        return Inertia::render('static/contact', [
            'success' => session('success'),
        ]);
    }

    public function careers()
    {
        return Inertia::render('static/careers');
    }

    public function blog()
    {
        return Inertia::render('static/blog');
    }

    public function shipping()
    {
        return Inertia::render('static/shipping');
    }

    public function returns()
    {
        return Inertia::render('static/returns');
    }

    public function faq()
    {
        return Inertia::render('static/faq');
    }

    public function trackOrder()
    {
        return Inertia::render('static/track-order', [
            'order' => session('order'),
        ]);
    }

    public function terms()
    {
        return Inertia::render('static/terms');
    }

    public function privacy()
    {
        return Inertia::render('static/privacy');
    }

    public function cookies()
    {
        return Inertia::render('static/cookies');
    }
}