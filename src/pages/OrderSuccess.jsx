import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, Package, Truck, ArrowRight, ShieldCheck, MapPin, Calendar } from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import { useRegion } from '../context/RegionContext.jsx';

export default function OrderSuccess() {
  const { state } = useLocation();
  const { formatAmount } = useRegion();

  const order = state?.order || {
    id: 'MJR-982104',
    date: new Date().toISOString(),
    status: 'Confirmed',
    total: 16470,
    paymentMethod: 'Cash on Delivery',
    carrier: 'MUJER Express Logistics',
    estimatedDelivery: '2–3 business days',
    shippingAddress: {
      fullName: 'Ayesha Malik',
      phone: '+92 300 8472910',
      street: 'House 42-B, Street 14, Phase 5, DHA',
      city: 'Lahore',
      country: 'Pakistan',
      postalCode: '54792'
    },
    items: [
      {
        name: 'Lumière Radiance Botanical Elixir',
        variant: '30ml / 1.0 fl oz',
        quantity: 1,
        price: 11500,
        image: '/src/assets/images/product_serum_elixir_1792565254298.jpg'
      }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Success Hero Card */}
      <div className="bg-white p-8 sm:p-12 rounded-lg border border-neutral-200 text-center shadow-xs space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#FDF2F4] text-[#5A0E24] flex items-center justify-center mx-auto border border-[#F7D6DE]">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-xs uppercase tracking-widest font-semibold text-[#8B263E] block">
          Order Placed Successfully
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-neutral-900">
          Thank you for your order, {order.shippingAddress.fullName.split(' ')[0]}
        </h1>

        <p className="text-xs sm:text-sm text-neutral-600 max-w-lg mx-auto leading-relaxed">
          Your order reference is <strong className="font-mono text-neutral-900">{order.id}</strong>. A verification summary and tracking details have been dispatched to your mobile.
        </p>

        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <Link
            to="/account"
            className="px-6 py-2.5 bg-[#5A0E24] hover:bg-[#781533] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors"
          >
            Track in My Account
          </Link>
          <Link
            to="/shop"
            className="px-6 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold uppercase tracking-wider rounded transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>

      {/* Order Breakdown Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Shipping & Delivery Details */}
        <div className="bg-white p-6 rounded-md border border-neutral-200 space-y-4">
          <h3 className="font-serif text-base font-semibold text-neutral-900 flex items-center gap-2 border-b border-neutral-100 pb-3">
            <Truck className="w-4 h-4 text-[#5A0E24]" />
            <span>Delivery & Courier Logistics</span>
          </h3>

          <div className="space-y-3 text-xs text-neutral-600">
            <div>
              <span className="font-semibold text-neutral-800 block">Courier Carrier:</span>
              <span>{order.carrier || 'MUJER Express Logistics (Insured & Temperature Shielded)'}</span>
            </div>
            <div>
              <span className="font-semibold text-neutral-800 block">Estimated Delivery Window:</span>
              <span className="text-[#5A0E24] font-medium">{order.estimatedDelivery || '2–3 Business Days'}</span>
            </div>
            <div>
              <span className="font-semibold text-neutral-800 block">Shipping Destination:</span>
              <p className="mt-0.5 leading-relaxed text-neutral-700">
                {order.shippingAddress.fullName}<br />
                {order.shippingAddress.street}<br />
                {order.shippingAddress.city}, {order.shippingAddress.country} {order.shippingAddress.postalCode}<br />
                Phone: {order.shippingAddress.phone}
              </p>
            </div>
            <div>
              <span className="font-semibold text-neutral-800 block">Payment Method:</span>
              <span className="font-medium text-neutral-800">{order.paymentMethod}</span>
            </div>
          </div>
        </div>

        {/* Ordered Formulations Breakdown */}
        <div className="bg-white p-6 rounded-md border border-neutral-200 space-y-4">
          <h3 className="font-serif text-base font-semibold text-neutral-900 flex items-center gap-2 border-b border-neutral-100 pb-3">
            <Package className="w-4 h-4 text-[#5A0E24]" />
            <span>Formulation Inventory</span>
          </h3>

          <div className="divide-y divide-neutral-100 max-h-56 overflow-y-auto space-y-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="pt-2 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded bg-neutral-100" />
                  <div>
                    <p className="font-serif font-semibold text-neutral-900">{item.name}</p>
                    <p className="text-[11px] text-neutral-500">{item.variant} × {item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-200 flex items-center justify-between text-sm font-semibold text-neutral-900">
            <span>Total Value</span>
            <span className="font-mono text-xl text-[#5A0E24] font-bold">
              {formatAmount(order.total)}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
