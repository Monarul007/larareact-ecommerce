<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Invoice #{{ $order->id }}</title>
    <style>
        body {
            font-family: 'DejaVu Sans', Arial, Helvetica, sans-serif;
            color: #222;
            margin: 0;
            padding: 0;
        }
        .invoice-container {
            width: 700px;
            margin: 0 auto;
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.07);
            padding: 0;
        }
        .header-table {
            width: 100%;
            border-collapse: collapse;
            background:rgb(127, 169, 255);
            color: #fff;
            border-radius: 10px 10px 0 0;
            padding: 0 15px;
        }
        .header-table td {
            padding: 16px 0 16px 0;
            vertical-align: middle;
        }
        .logo {
            width: 120px;
        }
        .company-info {
            text-align: right;
            font-size: 0.95rem;
        }
        .invoice-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 4px;
        }
        .order-meta {
            margin: 18px 0 18px 0;
            font-size: 1rem;
        }
        .address-row {
            width: 100%;
            margin-bottom: 24px;
            overflow: hidden;
        }
        .address-box {
            width: 48%;
            float: left;
            background: #f1f5f9;
            border-radius: 8px;
            padding: 12px 18px 12px 18px;
            margin-right: 2%;
            margin-bottom: 0;
            min-height: 90px;
        }
        .address-box:last-child {
            margin-right: 0;
            float: right;
        }
        .address-box strong {
            color: #2563eb;
            display: block;
            margin-bottom: 4px;
        }
        .clear { clear: both; }
        .section-title {
            margin-top: 0;
            margin-bottom: 10px;
            color: #2563eb;
            font-size: 1.15rem;
        }
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 24px;
            margin-top: 10px;
        }
        .items-table th, .items-table td {
            border: 1px solid #e5e7eb;
            padding: 8px 6px;
            text-align: left;
            font-size: 0.97rem;
        }
        .items-table th {
            background: #f1f5f9;
            color: #222;
            font-weight: 600;
        }
        .items-table tr:nth-child(even) {
            background: #f9fafb;
        }
        .totals {
            width: 320px;
            background: #f1f5f9;
            border-radius: 8px;
            padding: 12px 18px 12px 18px;
            margin-top: 10px;
            margin-left: auto;
            margin-right: 0;
        }
        .totals-row {
            width: 100%;
            display: table;
            margin-bottom: 2px;
        }
        .totals-label, .totals-value {
            display: table-cell;
            text-align: right;
            padding: 2px 8px;
            font-size: 1rem;
        }
        .totals-label {
            color: #555;
            width: 70%;
        }
        .totals-value {
            font-weight: bold;
            width: 30%;
        }
        .totals-row.total .totals-value {
            color: #2563eb;
            font-size: 1.1rem;
        }
        .footer {
            margin-top: 40px;
            text-align: center;
            color: #888;
            font-size: 0.95rem;
        }
    </style>
</head>
<body>
    <div class="invoice-container">
        <table class="header-table">
            <tr>
                <td class="logo">
                    <img src="{{ public_path('logo.png') }}" alt="Laravel React" style="width:120px;height:auto;object-fit:contain;">
                </td>
                <td class="company-info">
                    <div class="invoice-title">Invoice #{{ $order->id }}</div>
                    <div>ECOMMERCE INC.</div>
                    <div>123 Business Rd, City, Country</div>
                    <div>Email: support@example.com</div>
                    <div>Phone: +1 234 567 8900</div>
                </td>
            </tr>
        </table>
        <div class="order-meta">
            <span><strong>Date:</strong> {{ $order->created_at->format('Y-m-d') }}</span>
            <span style="margin-left:24px;"><strong>Status:</strong> {{ ucfirst($order->status) }}</span>
        </div>
        <div class="address-row">
            <div class="address-box">
                <strong>Billing To</strong>
                {{ $order->billing_name }}<br>
                {{ $order->billing_address }}<br>
                {{ $order->billing_city }}, {{ $order->billing_country }} {{ $order->billing_postcode }}<br>
            </div>
            <div class="address-box">
                <strong>Shipping To</strong>
                {{ $order->shipping_name }}<br>
                {{ $order->shipping_address }}<br>
                {{ $order->shipping_city }}, {{ $order->shipping_country }} {{ $order->shipping_postcode }}<br>
            </div>
            <div class="clear"></div>
        </div>
        <h3 class="section-title">Order Items</h3>
        <table class="items-table">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
            @foreach ($order->items as $item)
                <tr>
                    <td>{{ $item->product ? $item->product->name : $item->name }}</td>
                    <td>{{ $item->quantity }}</td>
                    <td>${{ number_format($item->price, 2) }}</td>
                    <td>${{ number_format($item->price * $item->quantity, 2) }}</td>
                </tr>
            @endforeach
            </tbody>
        </table>
        <div class="totals">
            <div class="totals-row">
                <div class="totals-label">Subtotal:</div>
                <div class="totals-value">${{ number_format($order->subtotal ?? $order->total_amount, 2) }}</div>
            </div>
            <div class="totals-row">
                <div class="totals-label">Shipping:</div>
                <div class="totals-value">${{ number_format($order->shipping_cost ?? 0, 2) }}</div>
            </div>
            <div class="totals-row">
                <div class="totals-label">Tax:</div>
                <div class="totals-value">${{ number_format($order->tax ?? 0, 2) }}</div>
            </div>
            <div class="totals-row total">
                <div class="totals-label">Total:</div>
                <div class="totals-value">${{ number_format($order->total_amount, 2) }}</div>
            </div>
        </div>
        <div class="footer">
            Thank you for your purchase!<br>
            If you have any questions, contact us at <span style="color: #2563eb;">support@example.com</span>
        </div>
    </div>
</body>
</html> 