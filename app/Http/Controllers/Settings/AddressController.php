<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Address;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AddressController extends Controller
{
    public function index()
    {
        return Inertia::render('settings/addresses', [
            'addresses' => auth()->user()->addresses
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'street' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'postcode' => 'required|string|max:20',
            'is_default' => 'boolean'
        ]);

        $address = auth()->user()->addresses()->create($validated);

        if ($validated['is_default']) {
            auth()->user()->addresses()->where('id', '!=', $address->id)
                ->update(['is_default' => false]);
        }

        return back()->with('success', 'Address added successfully');
    }

    public function update(Request $request, Address $address)
    {
        $this->authorize('update', $address);

        $validated = $request->validate([
            'street' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'postcode' => 'required|string|max:20',
            'is_default' => 'boolean'
        ]);

        $address->update($validated);

        if ($validated['is_default']) {
            auth()->user()->addresses()->where('id', '!=', $address->id)
                ->update(['is_default' => false]);
        }

        return back()->with('success', 'Address updated successfully');
    }

    public function destroy(Address $address)
    {
        $this->authorize('delete', $address);
        
        $address->delete();
        
        return back()->with('success', 'Address deleted successfully');
    }
}