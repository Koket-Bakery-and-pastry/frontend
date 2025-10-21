function VisitUsCard() {
  return (
    <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 max-w-lg mx-auto">
      <div className="space-y-6 text-center">
        <div>
          <h3 className="font-semibold text-foreground mb-2">Address:</h3>
          <p className="text-muted-foreground text-sm">123 Bakery Street</p>
          <p className="text-muted-foreground text-sm">Sweet City, SC 12345</p>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-2">Phone:</h3>
          <p className="text-muted-foreground text-sm">(251) 123-4567</p>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-2">Email:</h3>
          <p className="text-muted-foreground text-sm">
            hello@sweetdelights.com
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-2">Hours:</h3>
          <p className="text-muted-foreground text-sm">
            Monday - Saturday: 9:00 AM - 6:00 PM
          </p>
          <p className="text-muted-foreground text-sm">
            Sunday: 10:00 AM - 4:00 PM
          </p>
        </div>
      </div>
    </div>
  );
}

export default VisitUsCard;
