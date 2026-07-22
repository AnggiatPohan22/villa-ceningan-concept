import { getWhatsappUrl } from "@/data/property";

type BookingInquiryPanelProps = {
  variant?: "default" | "hero";
};

export function BookingInquiryPanel({ variant = "default" }: BookingInquiryPanelProps) {
  return (
    <section className={`booking-panel booking-panel--${variant}`} aria-label="Booking inquiry">
      {variant === "hero" ? (
        <div className="booking-panel__header">
          <span>Set your preferences</span>
          <small>Find your cozy island stay</small>
        </div>
      ) : null}
      <label>
        <span>Check In</span>
        <input type="date" name="checkin" />
      </label>
      <label>
        <span>Check Out</span>
        <input type="date" name="checkout" />
      </label>
      <label>
        <span>Guests</span>
        <select name="guests" defaultValue="2">
          <option value="1">1 guest</option>
          <option value="2">2 guests</option>
          <option value="3">3 guests</option>
          <option value="4">4 guests</option>
        </select>
      </label>
      <a className="button button-primary" href={getWhatsappUrl()} target="_blank" rel="noreferrer">
        Search
      </a>
    </section>
  );
}
