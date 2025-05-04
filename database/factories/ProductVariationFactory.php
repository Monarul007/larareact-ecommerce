<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\ProductVariation;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductVariationFactory extends Factory
{
    protected $model = ProductVariation::class;

    public function definition(): array
    {
        return [
            'product_id' => Product::factory(),
            'name' => fake()->words(2, true),
            'sku' => fake()->unique()->regexify('[A-Z]{2}[0-9]{6}'),
            'price' => fake()->randomFloat(2, 10, 1000),
            'stock' => fake()->numberBetween(0, 100),
            'attributes' => [
                'color' => fake()->safeColorName(),
                'size' => fake()->randomElement(['S', 'M', 'L', 'XL']),
            ],
        ];
    }
}