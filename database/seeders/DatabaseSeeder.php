<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Order;
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

        // Create regular users
        User::factory(10)->create(['role' => 'customer']);

        // Create categories with hierarchy
        $categories = [
            'Electronics' => [
                'Smartphones' => ['Apple Phones', 'Samsung Phones', 'Google Phones', 'OnePlus Phones'],
                'Laptops' => ['Gaming Laptops', 'Business Laptops', 'Ultrabook Laptops'],
                'Accessories' => ['Headphones', 'Chargers', 'Device Cases'],
            ],
            'Fashion' => [
                'Men\'s Clothing' => ['Men\'s T-Shirts', 'Men\'s Jeans', 'Men\'s Jackets', 'Men\'s Formal Wear'],
                'Women\'s Clothing' => ['Women\'s Dresses', 'Women\'s Tops', 'Women\'s Jeans', 'Women\'s Activewear'],
                'Kids & Baby' => ['Boys Clothing', 'Girls Clothing', 'Infant Wear'],
                'Shoes' => ['Casual Sneakers', 'Formal Shoes', 'Sports Shoes'],
            ],
            'Home & Living' => [
                'Furniture' => ['Living Room Furniture', 'Bedroom Furniture', 'Office Furniture'],
                'Decor' => ['Wall Art Decor', 'Home Lighting', 'Decorative Mirrors'],
                'Kitchen' => ['Kitchen Cookware', 'Kitchen Appliances', 'Kitchen Utensils'],
                'Bedding' => ['Bed Sheet Sets', 'Pillow Collection', 'Comforter Sets'],
            ],
            'Sports & Outdoors' => [
                'Exercise Equipment' => ['Cardio Equipment', 'Weight Training', 'Yoga Gear'],
                'Outdoor Recreation' => ['Camping Gear', 'Hiking Equipment', 'Cycling Gear'],
                'Sports Gear' => ['Basketball Equipment', 'Soccer Equipment', 'Tennis Equipment'],
            ],
        ];

        // Create brands with real names
        $brandNames = [
            'Electronics' => ['Apple', 'Samsung', 'Sony', 'LG', 'Dell', 'HP', 'Asus'],
            'Fashion' => ['Zara', 'H&M', 'Levis', 'Gap', 'Uniqlo', 'Puma'],
            'Home & Living' => ['IKEA', 'Ashley', 'Crate & Barrel', 'West Elm', 'Pottery Barn'],
            'Sports' => ['Nike', 'Adidas', 'Under Armour', 'Wilson', 'Spalding', 'Reebok']
        ];

        // Predefined product templates by brand
        $productTemplates = [
            'Apple' => [
                [
                    'name' => 'iPhone 14 Pro',
                    'description' => 'Experience the latest iPhone with a stunning 6.1-inch Super Retina XDR display, A16 Bionic chip, and an advanced camera system with 48MP main camera. Dynamic Island adapts fluidly to show important alerts and Live Activities.',
                    'attributes' => [
                        'Storage' => ['128GB', '256GB', '512GB', '1TB'],
                        'Color' => ['Space Black', 'Silver', 'Gold', 'Deep Purple'],
                    ],
                    'price_range' => [999, 1499]
                ],
                [
                    'name' => 'MacBook Pro 16"',
                    'description' => 'The most powerful MacBook Pro ever with M2 Pro or M2 Max chip for unprecedented performance and battery life. Features a stunning 16-inch Liquid Retina XDR display, up to 96GB unified memory, and advanced connectivity.',
                    'attributes' => [
                        'Storage' => ['512GB', '1TB', '2TB', '4TB'],
                        'Color' => ['Space Gray', 'Silver'],
                        'RAM' => ['16GB', '32GB', '64GB', '96GB']
                    ],
                    'price_range' => [2499, 3499]
                ]
            ],
            'Samsung' => [
                [
                    'name' => 'Galaxy S23 Ultra',
                    'description' => 'Samsung\'s flagship smartphone featuring a 6.8-inch Dynamic AMOLED display, built-in S Pen, and a revolutionary camera system with 200MP main sensor. Powered by Snapdragon 8 Gen 2 for exceptional performance.',
                    'attributes' => [
                        'Storage' => ['256GB', '512GB', '1TB'],
                        'Color' => ['Phantom Black', 'Cream', 'Green', 'Lavender'],
                        'RAM' => ['8GB', '12GB']
                    ],
                    'price_range' => [1199, 1599]
                ]
            ],
            'Nike' => [
                [
                    'name' => 'Air Zoom Pegasus 39',
                    'description' => 'The Nike Air Zoom Pegasus 39 continues the legacy of the trusted, tried-and-true trainer. Offering comfort and durability with responsive cushioning and breathable mesh upper perfect for everyday running.',
                    'attributes' => [
                        'Size' => ['7', '8', '9', '10', '11', '12'],
                        'Color' => ['Black/White', 'Pure Platinum', 'University Red', 'Royal Blue']
                    ],
                    'price_range' => [120, 160]
                ]
            ],
            'IKEA' => [
                [
                    'name' => 'MALM Bed Frame',
                    'description' => 'A modern bed frame with clean lines and a timeless design. Features two large drawers for storage underneath. Made from durable materials with a versatile finish that matches any bedroom décor.',
                    'attributes' => [
                        'Size' => ['Queen', 'King'],
                        'Color' => ['Black-Brown', 'White', 'Oak veneer']
                    ],
                    'price_range' => [299, 399]
                ]
            ],
            'Zara' => [
                [
                    'name' => 'Premium Denim Jacket',
                    'description' => 'Classic denim jacket with a modern fit. Features premium cotton denim, metal buttons, and multiple pockets. Perfect for layering in any season.',
                    'attributes' => [
                        'Size' => ['S', 'M', 'L', 'XL'],
                        'Color' => ['Light Blue', 'Dark Blue', 'Black']
                    ],
                    'price_range' => [79, 99]
                ]
            ]
        ];

        $brands = collect();
        foreach ($brandNames as $category => $names) {
            foreach ($names as $name) {
                $brands->push(Brand::create([
                    'name' => $name,
                    'slug' => str($name)->slug(),
                    'description' => match($name) {
                        'Apple' => 'Leading technology company known for innovative consumer electronics, software, and services.',
                        'Samsung' => 'Global technology leader in mobile devices, home electronics, and digital solutions.',
                        'Nike' => 'World\'s largest athletic apparel company, known for innovative sportswear and equipment.',
                        'IKEA' => 'International furniture retailer offering modern, affordable home furnishing solutions.',
                        'Zara' => 'Leading fashion retailer known for trendy, quality clothing at accessible prices.',
                        default => 'Quality products for modern living.'
                    },
                    'is_active' => true,
                    'logo' => 'brands/' . str($name)->slug() . '.jpg',
                ]));
            }
        }

        // Create main categories and subcategories
        $categoryModels = [];
        foreach ($categories as $main => $subs) {
            $mainCat = Category::create([
                'name' => $main,
                'slug' => str($main)->slug(),
                'description' => match($main) {
                    'Electronics' => 'Latest technology products including smartphones, laptops, and accessories.',
                    'Fashion' => 'Trendy clothing and accessories for men, women, and children.',
                    'Home & Living' => 'Quality furniture and home decor for modern living spaces.',
                    'Sports & Outdoors' => 'Sports equipment and outdoor gear for active lifestyles.',
                    default => 'Quality products for your lifestyle.'
                },
                'is_active' => true,
                'image' => 'categories/' . str($main)->slug() . '.jpg',
            ]);

            foreach ($subs as $sub => $items) {
                $subCat = Category::create([
                    'name' => $sub,
                    'slug' => str($sub)->slug(),
                    'description' => "Quality {$sub} products for our customers.",
                    'is_active' => true,
                    'image' => 'categories/' . str($sub)->slug() . '.jpg',
                    'parent_id' => $mainCat->id,
                ]);

                foreach ($items as $item) {
                    $categoryModels[] = Category::create([
                        'name' => $item,
                        'slug' => str($item)->slug(),
                        'description' => "Premium {$item} collection.",
                        'is_active' => true,
                        'image' => 'categories/' . str($item)->slug() . '.jpg',
                        'parent_id' => $subCat->id,
                    ]);
                }
            }
        }

        // Create products for each brand using templates
        $brands->each(function ($brand) use ($categoryModels, $productTemplates) {
            $templates = $productTemplates[$brand->name] ?? [];
            
            foreach ($templates as $template) {
                $product = Product::create([
                    'name' => $template['name'],
                    'description' => $template['description'],
                    'is_active' => true,
                    'brand_id' => $brand->id,
                ]);

                // Attach relevant categories
                $relevantCategories = collect($categoryModels)->filter(function ($category) use ($product) {
                    return str_contains(strtolower($category->name), strtolower(explode(' ', $product->name)[0])) ||
                           str_contains(strtolower($product->name), strtolower(explode(' ', $category->name)[0]));
                })->pluck('id')->toArray();

                if (empty($relevantCategories)) {
                    $relevantCategories = collect($categoryModels)->random(1)->pluck('id')->toArray();
                }

                $product->categories()->attach($relevantCategories);

                // Create variations based on template attributes
                $attributes = $template['attributes'];
                foreach ($attributes['Color'] as $color) {
                    foreach ($attributes['Size'] ?? ['Standard'] as $size) {
                        $storage = $attributes['Storage'] ?? ['Standard'];
                        foreach ($storage as $storageSize) {
                            if ($storageSize === 'Standard' && isset($attributes['Storage'])) continue;
                            
                            $attrs = [
                                'Color' => $color,
                                'Size' => $size
                            ];
                            
                            if (isset($attributes['Storage'])) {
                                $attrs['Storage'] = $storageSize;
                            }
                            if (isset($attributes['RAM'])) {
                                $attrs['RAM'] = collect($attributes['RAM'])->random();
                            }

                            $basePrice = rand($template['price_range'][0], $template['price_range'][1]);
                            // Adjust price based on attributes
                            if (isset($attrs['Storage'])) {
                                $basePrice += match($attrs['Storage']) {
                                    '256GB' => 100,
                                    '512GB' => 200,
                                    '1TB' => 400,
                                    '2TB' => 600,
                                    '4TB' => 1000,
                                    default => 0
                                };
                            }
                            if (isset($attrs['RAM'])) {
                                $basePrice += match($attrs['RAM']) {
                                    '16GB' => 200,
                                    '32GB' => 400,
                                    '64GB' => 800,
                                    '96GB' => 1200,
                                    default => 0
                                };
                            }

                            ProductVariation::create([
                                'product_id' => $product->id,
                                'name' => $product->name . ' - ' . implode(' ', array_values($attrs)),
                                'sku' => strtoupper(
                                    str($product->name)->slug() . '-' . 
                                    str($color)->slug() . '-' . 
                                    str($size)->slug() . 
                                    (isset($attrs['Storage']) ? '-' . str($attrs['Storage'])->slug() : '') .
                                    (isset($attrs['RAM']) ? '-' . str($attrs['RAM'])->slug() : '')
                                ),
                                'price' => $basePrice,
                                'stock' => rand(5, 100),
                                'attributes' => $attrs
                            ]);
                        }
                    }
                }
            }
        });

        // Create orders with realistic order status progression
        $users = User::where('role', 'customer')->get();
        $products = Product::with('variations')->get();
        $orderStatuses = ['pending', 'processing', 'shipped', 'delivered'];

        $users->each(function ($user) use ($products, $orderStatuses) {
            // Create 1-3 orders per user
            $numOrders = rand(1, 3);
            
            for ($i = 0; $i < $numOrders; $i++) {
                $orderItems = [];
                $totalAmount = 0;
                
                // Add 1-5 items per order
                $numItems = rand(1, 5);
                $orderProducts = $products->random($numItems);
                
                foreach ($orderProducts as $product) {
                    $variation = $product->variations->random();
                    $quantity = rand(1, 3);
                    $price = $variation->price;
                    
                    $orderItems[] = [
                        'product_id' => $product->id,
                        'name' => $variation->name,
                        'quantity' => $quantity,
                        'price' => $price
                    ];
                    
                    $totalAmount += ($price * $quantity);
                }

                $order = Order::create([
                    'user_id' => $user->id,
                    'status' => $orderStatuses[array_rand($orderStatuses)],
                    'total_amount' => $totalAmount,
                    'billing_name' => $user->name,
                    'billing_email' => $user->email,
                    'billing_address' => '123 Main Street, Apt 4B',
                    'billing_city' => 'New York',
                    'billing_country' => 'United States',
                    'billing_postcode' => '10001',
                    'shipping_name' => $user->name,
                    'shipping_address' => '123 Main Street, Apt 4B',
                    'shipping_city' => 'New York',
                    'shipping_country' => 'United States',
                    'shipping_postcode' => '10001',
                ]);

                // Create order items
                foreach ($orderItems as $item) {
                    $order->items()->create($item);
                }
            }
        });
    }
}
