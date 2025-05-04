<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:products'],
            'description' => ['nullable', 'string'],
            'is_active' => ['required', 'boolean'],
            'variations' => ['required', 'array', 'min:1'],
            'variations.*.name' => ['required', 'string', 'max:255'],
            'variations.*.sku' => ['required', 'string', 'max:255', 'unique:product_variations'],
            'variations.*.price' => ['required', 'numeric', 'min:0'],
            'variations.*.stock' => ['required', 'integer', 'min:0'],
            'variations.*.attributes' => ['required', 'array'],
        ];
    }
}