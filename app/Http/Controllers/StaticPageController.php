<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;

class StaticPageController extends Controller
{
    protected function getCategories()
    {
        return Category::whereIsRoot()
            ->with(['children' => function ($query) {
                $query->where('is_active', true);
            }])
            ->where('is_active', true)
            ->get();
    }

    public function about()
    {
        return Inertia::render('static/about', [
            'categories' => $this->getCategories()
        ]);
    }

    public function contact()
    {
        return Inertia::render('static/contact', [
            'categories' => $this->getCategories(),
            'success' => session('success')
        ]);
    }

    public function careers()
    {
        return Inertia::render('static/careers', [
            'categories' => $this->getCategories()
        ]);
    }

    public function blog()
    {
        return Inertia::render('static/blog', [
            'categories' => $this->getCategories()
        ]);
    }

    public function shipping()
    {
        return Inertia::render('static/shipping', [
            'categories' => $this->getCategories()
        ]);
    }

    public function returns()
    {
        return Inertia::render('static/returns', [
            'categories' => $this->getCategories()
        ]);
    }

    public function faq()
    {
        return Inertia::render('static/faq', [
            'categories' => $this->getCategories()
        ]);
    }

    public function trackOrder()
    {
        return Inertia::render('static/track-order');
    }

    public function terms()
    {
        return Inertia::render('static/terms', [
            'categories' => $this->getCategories()
        ]);
    }

    public function privacy()
    {
        return Inertia::render('static/privacy', [
            'categories' => $this->getCategories()
        ]);
    }

    public function cookies()
    {
        return Inertia::render('static/cookies', [
            'categories' => $this->getCategories()
        ]);
    }
}