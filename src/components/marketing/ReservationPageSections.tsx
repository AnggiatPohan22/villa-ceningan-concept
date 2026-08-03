import Image from "next/image";
import Link from "next/link";
import { BookingInquiryPanel } from "@/components/booking/BookingInquiryPanel";
import { ReservationAvailabilitySearch } from "@/components/marketing/ReservationAvailabilitySearch";
import { property } from "@/data/property";
import { reservationOverview, reservationRoomDetails } from "@/data/reservation";
import { rooms, type RoomItem } from "@/data/rooms";
import type { CmsPageHeroContent } from "@/lib/cms/content";

type ReservationRoomDetails = typeof reservationRoomDetails;
type ReservationOverview = typeof reservationOverview;

type ReservationPageSectionsProps = {
  items?: RoomItem[];
  hero?: CmsPageHeroContent;
  roomDetails?: ReservationRoomDetails;
  overview?: ReservationOverview;
};

function getRoomDetail(details: ReservationRoomDetails, slug: string) {
  return details[slug as keyof ReservationRoomDetails];
}

export function ReservationPageSections({
  items = rooms,
  hero,
  roomDetails = reservationRoomDetails,
  overview = reservationOverview
}: ReservationPageSectionsProps = {}) {
  return (
    <main className="reservation-page">
      <section className="reservation-hero" aria-labelledby="reservation-title">
        <h1 id="reservation-title">{hero?.heading ?? "Reservation"}</h1>
        {hero?.description ? <p>{hero.description}</p> : null}
        <nav aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true" />
          <strong>Reservation</strong>
        </nav>
      </section>

      <ReservationAvailabilitySearch />

      <section className="reservation-rooms" id="reservation-rooms" aria-labelledby="reservation-rooms-title">
        <h2 id="reservation-rooms-title">Rooms available for you</h2>
        <div className="reservation-room-list">
          {items.map((room) => {
            const detail = getRoomDetail(roomDetails, room.slug);

            return (
              <article className="reservation-room-card" key={room.slug}>
                <div className="reservation-room-card__media">
                  {detail?.badge ? <span>{detail.badge}</span> : null}
                  <Image src={room.image} alt={`${room.name} available room preview`} fill sizes="(min-width: 900px) 34vw, 100vw" />
                </div>
                <div className="reservation-room-card__body">
                  <div className="reservation-room-card__info">
                    <div className="reservation-room-card__rating" aria-label={`Five star room, ${detail?.reviews ?? "guest reviews"}`}>
                      <span aria-hidden="true">*****</span>
                      <small>{detail?.reviews}</small>
                    </div>
                    <h3>{room.name}</h3>
                    <dl>
                      <div>
                        <dt>Status:</dt>
                        <dd className={detail?.badge ? "is-limited" : undefined}>{detail?.status}</dd>
                      </div>
                      <div>
                        <dt>Deposit:</dt>
                        <dd>{detail?.deposit}</dd>
                      </div>
                      <div>
                        <dt>Beds:</dt>
                        <dd>{detail?.beds}</dd>
                      </div>
                      <div>
                        <dt>Passenger:</dt>
                        <dd>{detail?.passenger}</dd>
                      </div>
                    </dl>
                  </div>
                  <div className="reservation-room-card__rate">
                    <small>Starting from:</small>
                    <strong>{room.startingRate}</strong>
                    <span>{room.rateNote}</span>
                    <p>Includes Breakfast: {detail?.breakfast}</p>
                    <Link className={detail?.selected ? "is-selected" : undefined} href="#reservation-confirm">
                      {detail?.selected ? "Selected" : "Select Room"}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="reservation-overview" aria-labelledby="reservation-overview-title">
        <h2 id="reservation-overview-title">Your booking overview</h2>
        <div className="reservation-overview__panel">
          <div className="reservation-overview__dates">
            <p>
              Arrival date: <strong>{overview.arrival}</strong>
            </p>
            <p>
              Departure date: <strong>{overview.departure}</strong>
            </p>
          </div>
          <div className="reservation-overview__items">
            {overview.items.map((item) => {
              const room = items.find((entry) => entry.slug === item.slug);

              if (!room) {
                return null;
              }

              return (
                <article className="reservation-overview-item" key={item.slug}>
                  <Image src={room.image} alt={`${room.name} overview thumbnail`} width={88} height={88} />
                  <div>
                    <h3>{room.name}</h3>
                    <p>
                      Includes Breakfast <span>Deposit: {getRoomDetail(roomDetails, room.slug)?.deposit}</span>
                      <span>Rooms: {item.roomCount}</span>
                      <span>Passenger: {item.passenger}</span>
                    </p>
                  </div>
                  <strong>{item.subtotal}</strong>
                </article>
              );
            })}
          </div>
          <div className="reservation-overview__total">
            <label>
              <span>Coupon Code</span>
              <input placeholder="Enter code" type="text" />
              <button type="button">Apply</button>
            </label>
            <div>
              <span>Total Price</span>
              <strong>{overview.total}</strong>
            </div>
            <p> This Function can work if you have Payment Gateway or Booking Engine. Please contact us for more information.</p>
          </div>
        </div>
      </section>

      <section className="reservation-confirm" id="reservation-confirm" aria-labelledby="reservation-confirm-title">
        <div className="reservation-confirm__heading">
          <p className="eyebrow">Direct Villa Inquiry</p>
          <h2 id="reservation-confirm-title">Confirm your reservation</h2>
          <p>
            Share your details with {property.name}. Our team will prepare the availability
            reply through WhatsApp before any payment step is introduced.
          </p>
        </div>
        <div className="reservation-confirm__panel">
          <BookingInquiryPanel />
        </div>
      </section>
    </main>
  );
}
