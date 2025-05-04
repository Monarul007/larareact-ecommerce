<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductVariation;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);

        // Create categories with hierarchy
        $categories = [
            'Electronics' => [
                'Smartphones',
                'Laptops',
                'Accessories',
            ],
            'Fashion' => [
                'Men\'s Clothing',
                'Women\'s Clothing',
                'Kids & Baby',
                'Shoes',
            ],
            'Home & Living' => [
                'Furniture',
                'Decor',
                'Kitchen',
                'Bedding',
            ],
            'Sports & Outdoors' => [
                'Exercise Equipment',
                'Outdoor Recreation',
                'Sports Gear',
            ],
        ];

        foreach ($categories as $main => $subs) {
            $mainCat = Category::create([
                'name' => $main,
                'slug' => str($main)->slug(),
                'description' => fake()->paragraph(),
                'is_active' => true,
                'image' => 'categories/' . fake()->numberBetween(1, 10) . '.jpg',
            ]);

            foreach ($subs as $sub) {
                Category::create([
                    'name' => $sub,
                    'slug' => str($sub)->slug(),
                    'description' => fake()->paragraph(),
                    'is_active' => true,
                    'image' => 'categories/' . fake()->numberBetween(1, 10) . '.jpg',
                    'parent_id' => $mainCat->id,
                ]);
            }
        }

        // Create brands
        $brands = Brand::factory(10)->create();

        // Create products with variations
        $allCategories = Category::all();
        
        $brands->each(function ($brand) use ($allCategories) {
            Product::factory(2)->create(['brand_id' => $brand->id])
                ->each(function ($product) use ($allCategories) {
                    // Attach 1-2 random categories
                    $product->categories()->attach(
                        $allCategories->random(rand(1, 2))->pluck('id')->toArray()
                    );

                    // Create 2-4 variations per product
                    ProductVariation::factory(rand(2, 4))->create([
                        'product_id' => $product->id
                    ]);
                });
        });
    }
}
