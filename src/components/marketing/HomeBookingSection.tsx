import { AvailabilityBar } from "@/components/shared/AvailabilityBar";
import type { HomeBookingPreviewContent } from "@/lib/cms/content";

type HomeBookingSectionProps = {
  content?: HomeBookingPreviewContent;
};

export function HomeBookingSection({ content }: HomeBookingSectionProps = {}) {
  return (
    <section className="home2-booking" aria-label={content?.sectionAriaLabel ?? "Booking preview"}>
      <AvailabilityBar
        action={content?.submitButtonURL}
        ariaLabel={content?.formAriaLabel}
        checkInLabel={content?.checkInLabel}
        checkOutLabel={content?.checkOutLabel}
        guestsLabel={content?.guestsLabel}
        promoHref={content?.promotionLinkURL}
        promoLabel={content?.promotionLinkLabel}
        submitLabel={content?.submitButtonLabel}
      />
    </section>
  );
}
