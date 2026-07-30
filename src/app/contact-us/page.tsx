import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";

export const metadata: Metadata = { title: "Contact Us | LoanPolicy.in" };

export default function ContactUsPage() {
  return (
    <StaticPage title="Contact Us">
      <p>
        कोई सवाल, सुझाव या करेक्शन (जैसे कोई जानकारी पुरानी हो गई हो) बताना हो,
        तो नीचे दिए ईमेल पर हमसे संपर्क करें:
      </p>

      <div className="rounded-lg border border-neutral-200 bg-white p-6">
        <p className="text-sm text-neutral-500">Email</p>
        <a
          href="mailto:contact@loanpolicy.in"
          className="text-lg font-semibold text-brand-green hover:underline"
        >
          contact@loanpolicy.in
        </a>
      </div>

      <p className="text-sm text-neutral-500">
        कृपया ध्यान दें: हम लोन देने वाली कंपनी नहीं हैं, इसलिए लोन अप्रूवल,
        डिस्बर्समेंट या EMI से जुड़े सवालों के लिए सीधे संबंधित बैंक/ऐप के
        कस्टमर सपोर्ट से संपर्क करें।
      </p>
    </StaticPage>
  );
}
