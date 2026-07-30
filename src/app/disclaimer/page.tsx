import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";

export const metadata: Metadata = { title: "Disclaimer | LoanPolicy.in" };

export default function DisclaimerPage() {
  return (
    <StaticPage title="Disclaimer">
      <p>
        LoanPolicy.in एक सूचना और शिक्षा उद्देश्य से बनाई गई वेबसाइट है। यहां
        दी गई सभी जानकारी (लोन ऐप्स, बैंक अकाउंट, क्रेडिट कार्ड, इंश्योरेंस
        आदि से जुड़ी) सिर्फ सामान्य जानकारी के लिए है।
      </p>

      <h2 className="pt-4 text-xl font-bold text-neutral-900">हम कोई बैंक या NBFC नहीं हैं</h2>
      <p>
        LoanPolicy.in किसी भी बैंक, NBFC, या लोन देने वाली कंपनी का आधिकारिक
        प्रतिनिधि नहीं है। यहां बताए गए किसी भी ऐप या प्रोडक्ट का इस्तेमाल करने
        से पहले, कृपया संबंधित कंपनी की ऑफिशियल वेबसाइट या ऐप पर जाकर पूरी
        जानकारी और नियम व शर्तें खुद वेरीफाई करें।
      </p>

      <h2 className="pt-4 text-xl font-bold text-neutral-900">कोई गारंटी नहीं</h2>
      <p>
        हम यह गारंटी नहीं देते कि यहां दी गई जानकारी हर समय 100% सटीक, पूर्ण
        या अप-टू-डेट होगी। ब्याज दरें, ऑफर, एलिजिबिलिटी शर्तें समय-समय पर
        बदलती रहती हैं — इसलिए फैसला लेने से पहले संबंधित संस्था से खुद पुष्टि
        करें।
      </p>

      <h2 className="pt-4 text-xl font-bold text-neutral-900">वित्तीय सलाह नहीं</h2>
      <p>
        इस साइट पर दी गई जानकारी को वित्तीय, कानूनी या निवेश सलाह न समझें। कोई
        भी लोन, क्रेडिट कार्ड या फाइनेंशियल प्रोडक्ट लेने से पहले अपनी स्थिति
        के अनुसार किसी योग्य सलाहकार से सलाह ज़रूर लें।
      </p>

      <h2 className="pt-4 text-xl font-bold text-neutral-900">विज्ञापन</h2>
      <p>
        इस साइट पर मौजूद विज्ञापन और प्रमोशन (जैसे "New Loan App" बैनर)
        तीसरे पक्ष के विज्ञापन नेटवर्क के ज़रिए दिखाए जाते हैं। इनमें दिखाए गए
        प्रोडक्ट्स का हम समर्थन (endorse) नहीं करते।
      </p>

      <p className="pt-6 text-xs text-neutral-400">
        Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
      </p>
    </StaticPage>
  );
}
