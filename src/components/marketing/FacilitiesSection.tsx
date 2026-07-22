import { facilities } from "@/data/facilities";

export function FacilitiesSection() {
  return (
    <section className="section facilities" id="facilities">
      <div>
        <p className="eyebrow">Facilities</p>
        <h2>Designed around what travelers look for first.</h2>
      </div>
      <div className="facility-list">
        {facilities.map((facility) => (
          <span key={facility}>{facility}</span>
        ))}
      </div>
    </section>
  );
}
