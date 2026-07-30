import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";

export const metadata: Metadata = { title: "About Us | LoanPolicy.in" };

export default function AboutUsPage() {
  return (
    <StaticPage title="About Us">
      <p>
        LoanPolicy.in पर आपका स्वागत है — एक हिंदी भाषा की वेबसाइट जो लोन
        ऐप्स, बैंक अकाउंट ओपनिंग, क्रेडिट कार्ड और पर्सनल फाइनेंस से जुड़ी
        जानकारी आसान भाषा में देती है।
      </p>

      <h2 className="pt-4 text-xl font-bold text-neutral-900">हम क्या करते हैं</h2>
      <p>
        हमारी टीम रोज़ नए लोन ऐप्स, बैंकिंग ऑफर और फाइनेंस से जुड़ी जानकारी
        रिसर्च करके आसान, स्टेप-बाय-स्टेप गाइड के रूप में पब्लिश करती है —
        ताकि आम पाठक बिना किसी टेक्निकल जार्गन के सही फैसला ले सके।
      </p>

      <h2 className="pt-4 text-xl font-bold text-neutral-900">हमारी कैटेगरी</h2>
      <ul className="list-inside list-disc space-y-1">
        <li>Bank Loan — बैंकों के होम, बिज़नेस और अन्य लोन प्रोडक्ट्स</li>
        <li>Personal Loan — इंस्टेंट पर्सनल लोन ऐप्स की जानकारी</li>
        <li>Credit Card — क्रेडिट कार्ड अप्लाई और फीचर्स</li>
        <li>Finance — बैंक अकाउंट ओपनिंग और सेविंग्स से जुड़े टिप्स</li>
        <li>Insurance — इंश्योरेंस प्रोडक्ट्स की बेसिक जानकारी</li>
      </ul>

      <h2 className="pt-4 text-xl font-bold text-neutral-900">ज़रूरी सूचना</h2>
      <p>
        हम कोई बैंक, NBFC या लोन देने वाली संस्था नहीं हैं — सिर्फ जानकारी देने
        वाली एक इंडिपेंडेंट वेबसाइट हैं। ज़्यादा जानकारी के लिए हमारा{" "}
        <a href="/disclaimer" className="text-brand-green underline">
          Disclaimer
        </a>{" "}
        पेज देखें।
      </p>

      <p>
        कोई सुझाव या सवाल हो तो{" "}
        <a href="/contact-us" className="text-brand-green underline">
          Contact Us
        </a>{" "}
        पेज से हमसे जुड़ें।
      </p>
    </StaticPage>
  );
}
