 function BookingHoursSidebar() {
  const hours = [
    { day: "Daily except", time: "" },
    { day: "Sundays", time: "" },
    { day: "Mon-Fri", time: "9am - 6pm" },
    { day: "Sat", time: "10am - 4pm" },
  ]

  return (
    <div className="bg-gradient-to-b from-orange-400 to-pink-400 text-white p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Booking Hours</h3>
      <div className="space-y-2">
        {hours.map((item, index) => (
          <div key={index} className="text-sm">
            <p className="font-medium">{item.day}</p>
            {item.time && <p className="text-white/90">{item.time}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
export default BookingHoursSidebar;