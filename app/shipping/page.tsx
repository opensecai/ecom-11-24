export default function ShippingPage() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Shipping Information</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Shipping Policy</h2>
          <div className="prose prose-invert max-w-none">
            <p>
              We strive to deliver your handcrafted items safely and promptly. All orders are processed within 1-2 business days.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Delivery Times</h2>
          <div className="grid gap-4">
            <div className="p-4 rounded-lg bg-card">
              <h3 className="font-semibold mb-2">Standard Shipping</h3>
              <p className="text-muted-foreground">5-7 business days</p>
              <p className="text-sm text-muted-foreground mt-1">Free for orders over ₹1000</p>
            </div>

            <div className="p-4 rounded-lg bg-card">
              <h3 className="font-semibold mb-2">Express Shipping</h3>
              <p className="text-muted-foreground">2-3 business days</p>
              <p className="text-sm text-muted-foreground mt-1">Additional ₹250</p>
            </div>

            <div className="p-4 rounded-lg bg-card">
              <h3 className="font-semibold mb-2">International Shipping</h3>
              <p className="text-muted-foreground">7-14 business days</p>
              <p className="text-sm text-muted-foreground mt-1">Rates calculated at checkout</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Tracking Your Order</h2>
          <div className="prose prose-invert max-w-none">
            <p>
              Once your order ships, you'll receive a tracking number via email. You can use this number to track your package's journey to you.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Shipping Restrictions</h2>
          <div className="prose prose-invert max-w-none">
            <ul>
              <li>We currently ship to most countries worldwide</li>
              <li>Some restrictions may apply for fragile items</li>
              <li>Additional customs fees may apply for international orders</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Returns & Exchanges</h2>
          <div className="prose prose-invert max-w-none">
            <p>
              If you're not completely satisfied with your purchase, you can return it within 30 days for a full refund. Please note that custom orders cannot be returned unless damaged during shipping.
            </p>
          </div>
        </section>

        <section className="bg-card p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
          <p className="text-muted-foreground mb-4">
            If you have any questions about shipping or delivery, please don't hesitate to contact our customer service team.
          </p>
          <div className="space-y-2">
            <p className="text-sm">Email: shipping@artisancrafts.com</p>
            <p className="text-sm">Phone: +1 (555) 123-4567</p>
            <p className="text-sm">Hours: Monday-Friday, 9:00 AM - 6:00 PM</p>
          </div>
        </section>
      </div>
    </div>
  );
}