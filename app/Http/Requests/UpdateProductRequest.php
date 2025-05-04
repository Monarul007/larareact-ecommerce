<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('products')->ignore($this->route('product')),
            ],
            'description' => ['nullable', 'string'],
            'is_active' => ['required', 'boolean'],
            'variations' => ['required', 'array', 'min:1'],
            'variations.*.id' => ['sometimes', 'exists:product_variations,id'],
            'variations.*.name' => ['required', 'string', 'max:255'],
            'variations.*.sku' => [
                'required',
                'string',
                'max:255',
                Rule::unique('product_variations')->ignore(
                    optional($this->input('variations.*.id')),
                ),
            ],
            'variations.*.price' => ['required', 'numeric', 'min:0'],
            'variations.*.stock' => ['required', 'integer', 'min:0'],
            'variations.*.attributes' => ['required', 'array'],
        ];
    }
}