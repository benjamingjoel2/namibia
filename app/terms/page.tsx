import { LegalPage } from "@/components/ui/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Booking terms", description: "The terms that apply when Namib Light plans and arranges a tailor-made Namibia journey for you.", path: "/terms" });

export default function Page() {
  return (
    <LegalPage title="Booking terms" updated="30 October 2026" placeholder={false}>
      <h2>About these terms</h2>
      <p>These terms apply to the tailor-made travel arrangements that Namib Light, of The Hub Initiative HQ, Unit 10, Pietan Park, 13 Reger Street, Windhoek, Namibia (“we”, “us”), plans for you. Please read them before you confirm a booking. When you confirm a booking you accept them on behalf of everyone in your party, and you confirm that you are at least 18 and have their authority to do so.</p>
      <p>These are general principles. The quote and booking confirmation we send you set out the specific arrangements, deposit, balance due date and cancellation charges for your trip, and they form part of your contract with us.</p>
      <h2>Enquiries and quotes</h2>
      <p>Sending us an enquiry through the website, by email or any other way does not commit you to anything. We will reply with ideas and, when you are ready, a written quote.</p>
      <p>Quotes are based on availability and supplier rates at the time we write them. Nothing is held for you until you confirm and we confirm back in writing. We will always tell you if anything in a quote changes before you book.</p>
      <h2>Booking, deposit and balance</h2>
      <p>Your booking is confirmed when you accept our quote, we receive the deposit stated in it, and we send you a written booking confirmation. Your contract with us starts from that point.</p>
      <p>The balance is due by the date shown in your quote and booking confirmation. If it is not paid on time, we may treat the booking as cancelled by you and apply the cancellation charges below.</p>
      <p>Some suppliers (for example certain lodges, flights and permits) need full payment when they are booked. Where this applies we will tell you before you confirm.</p>
      <h2>Prices</h2>
      <p>Prices on this website are guide prices that read “From”: the lowest price per person sharing, in US dollars, for the journey described. Conversions into other currencies are approximate and for convenience only. The price of your trip is the one confirmed in your written quote and booking confirmation.</p>
      <p>The price of your trip is the price in your booking confirmation. We will only change it after confirmation if a cost outside our control changes, such as government taxes, park or conservation fees, or fuel surcharges set by a carrier, and we will show you how any change is worked out. If a change is significant, you may cancel without paying cancellation charges.</p>
      <h2>Self-drive journeys</h2>
      <p>If your journey includes a rental vehicle, the driver must hold a valid licence accepted in Namibia and keep to the rental company’s own terms, which we send you before you book. Gravel roads need care and lower speeds; please follow the driving notes we give you.</p>
      <h2>Changes you ask for</h2>
      <p>We will always try to help if you want to change your trip after booking. Changes depend on availability and on the suppliers’ own terms, and any extra cost they charge will be passed on to you, together with any reasonable administration cost we tell you about in advance.</p>
      <h2>If you cancel</h2>
      <p>To cancel, tell us in writing. Cancellation charges depend on how close to departure you cancel and on the charges our suppliers make to us. They are set out in your quote and booking confirmation. We will always try to keep them as low as we can, and we will refund anything we are able to recover.</p>
      <h2>If we change or cancel your trip</h2>
      <p>Occasionally we have to make changes, for example when a camp or flight is no longer available. If we make a significant change before you travel, we will tell you as soon as possible and offer you a choice of accepting it, taking a comparable alternative, or cancelling with a full refund of what you have paid us.</p>
      <p>We may need to cancel or change arrangements because of events outside anyone’s control, such as extreme weather, natural disasters, epidemics, civil unrest or official travel advice against travel. In that case we will help you rearrange, and refund what we are able to recover from suppliers.</p>
      <h2>Travel insurance</h2>
      <p>Comprehensive travel insurance is a condition of travelling with us. It must cover cancellation, medical treatment, emergency evacuation and repatriation, and any activities you plan to do. Please arrange it when you book so you are covered if you have to cancel.</p>
      <h2>Passports, visas and health</h2>
      <p>You are responsible for having a valid passport, any visas or electronic travel authorisations, and any vaccinations or health certificates required for your journey, including for transit countries. We are happy to share general guidance, but entry rules change, so please check them with the relevant embassy or official government source and with a travel-health professional well before you travel.</p>
      <h2>Our responsibility to you</h2>
      <p>We will plan your trip with reasonable skill and care, and we choose our suppliers carefully. Many services are provided by independent suppliers under their own terms and the laws of the country where they operate.</p>
      <p>We are not responsible for any loss, injury or damage caused by you or anyone in your party, by a third party not connected with the arrangements we provide, or by events outside our control. Where the law allows, our liability is limited to the price of your trip. Nothing in these terms limits liability that cannot legally be limited, such as liability for death or personal injury caused by our negligence.</p>
      <p>Wildlife is wild and outdoor activities carry some risk. Please follow the advice of your guides and lodge staff at all times.</p>
      <h2>Your responsibilities</h2>
      <p>Please give us accurate information, including the names on your passports and any medical, dietary or accessibility needs that affect your trip. Please respect local laws, customs and the rules of the parks and places you visit.</p>
      <h2>Complaints</h2>
      <p>If something is not right while you are travelling, tell your guide, the property or us straight away so it can be put right on the spot. If it cannot be resolved, write to us at <a href="mailto:namiblight@tourground.com">namiblight@tourground.com</a> within 28 days of your return and we will reply in full.</p>
      <h2>Governing law</h2>
      <p>These terms and any dispute connected with them are governed by the law that applies to your contract with us. Nothing in them affects your rights as a consumer under the law of the country where you live.</p>
    </LegalPage>
  );
}
