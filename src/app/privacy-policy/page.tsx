import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";

export const metadata: Metadata = { title: "Privacy Policy | LoanPolicy.in" };

export default function PrivacyPolicyPage() {
  return (
    <StaticPage title="Privacy Policy">
      <p>
        LoanPolicy.in ("हम", "हमारा", "साइट") पर आपकी प्राइवेसी हमारे लिए
        महत्वपूर्ण है। यह पॉलिसी बताती है कि हम आपकी जानकारी कैसे इकट्ठा करते हैं,
        उसका इस्तेमाल कैसे करते हैं और उसकी सुरक्षा कैसे करते हैं।
      </p>

      <h2 className="pt-4 text-xl font-bold text-neutral-900">हम कौन सी जानकारी इकट्ठा करते हैं</h2>
      <p>
        जब आप हमारी साइट पर आते हैं, तो हम आपका ब्राउज़र टाइप, डिवाइस की जानकारी,
        IP एड्रेस, और आप किन पेजों पर गए इसकी जानकारी अपने आप इकट्ठा कर सकते हैं।
        अगर आप कॉन्टैक्ट फॉर्म भरते हैं, तो आपका नाम, ईमेल और मैसेज भी हमारे पास
        आता है।
      </p>

      <h2 className="pt-4 text-xl font-bold text-neutral-900">कुकीज़ और विज्ञापन</h2>
      <p>
        हमारी साइट पर Google AdSense जैसे थर्ड-पार्टी विज्ञापन नेटवर्क कुकीज़ का
        इस्तेमाल कर सकते हैं ताकि आपकी पिछली विजिट के आधार पर विज्ञापन दिखाए जा
        सकें। आप Google के{" "}
        <a
          href="https://adssettings.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-green underline"
        >
          Ads Settings
        </a>{" "}
        पेज पर जाकर पर्सनलाइज़्ड विज्ञापन बंद कर सकते हैं।
      </p>

      <h2 className="pt-4 text-xl font-bold text-neutral-900">जानकारी का इस्तेमाल</h2>
      <p>
        हम आपकी जानकारी का इस्तेमाल साइट को बेहतर बनाने, कंटेंट पर्सनलाइज़ करने,
        और आपके सवालों का जवाब देने के लिए करते हैं। हम आपकी व्यक्तिगत जानकारी
        किसी थर्ड पार्टी को नहीं बेचते।
      </p>

      <h2 className="pt-4 text-xl font-bold text-neutral-900">थर्ड-पार्टी लिंक</h2>
      <p>
        हमारी साइट पर लोन ऐप्स, बैंकों और फाइनेंस प्रोडक्ट्स के बाहरी लिंक हो
        सकते हैं। उन साइट्स की अपनी अलग प्राइवेसी पॉलिसी होती है, हम उनके कंटेंट
        या प्रैक्टिसेस के लिए ज़िम्मेदार नहीं हैं।
      </p>

      <h2 className="pt-4 text-xl font-bold text-neutral-900">बदलाव</h2>
      <p>
        हम समय-समय पर इस पॉलिसी को अपडेट कर सकते हैं। किसी भी बदलाव को इसी पेज
        पर अपडेट कर दिया जाएगा।
      </p>

      <h2 className="pt-4 text-xl font-bold text-neutral-900">संपर्क करें</h2>
      <p>
        अगर आपके कोई सवाल हैं, तो हमें{" "}
        <a href="/contact-us" className="text-brand-green underline">
          Contact Us
        </a>{" "}
        पेज के ज़रिए संपर्क करें।
      </p>

      <p className="pt-6 text-xs text-neutral-400">
        Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
      </p>
    </StaticPage>
  );
}
