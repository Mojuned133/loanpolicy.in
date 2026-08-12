import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";

export const metadata: Metadata = { title: "Contact Us | LoanPolicy.in" };

export default function ContactUsPage() {
  return (
    <StaticPage title="Contact Us">
      <p>LoanPolicy.in में आपका स्वागत है।</p>

      <p>
        यदि आपके पास LoanPolicy.in से संबंधित कोई प्रश्न, सुझाव, शिकायत,
        correction request, partnership inquiry या किसी article से संबंधित
        जानकारी है, तो आप हमसे संपर्क कर सकते हैं।
      </p>

      <p>
        आप नीचे दिए गए Contact Form के माध्यम से हमें अपना संदेश भेज सकते हैं।
      </p>

      <h2 className="pt-4 text-xl font-bold text-neutral-900">Contact Form</h2>

      <p>Your Name</p>

      <p>Your Email</p>

      <p>Subject</p>

      <p>Your Message</p>

      <p>
        हम आपके संदेश की समीक्षा करने के बाद यथासंभव उचित समय में जवाब देने का
        प्रयास करेंगे।
      </p>

      <h2 className="pt-4 text-xl font-bold text-neutral-900">
        Email द्वारा संपर्क करें
      </h2>

      <p>
        यदि आप सीधे Email के माध्यम से हमसे संपर्क करना चाहते हैं, तो आप हमें इस
        Email पर लिख सकते हैं:
      </p>

      <p>
        Email:{" "}
        <a
          href="mailto:helploanpolicy@gmail.com"
          className="text-brand-green underline"
        >
          helploanpolicy@gmail.com
        </a>
      </p>

      <h2 className="pt-4 text-xl font-bold text-neutral-900">
        आप किन मामलों में हमसे संपर्क कर सकते हैं?
      </h2>

      <p>आप निम्नलिखित मामलों में हमसे संपर्क कर सकते हैं:</p>

      <ul className="list-inside list-disc space-y-1">
        <li>Website से संबंधित सामान्य प्रश्न</li>
        <li>किसी Article में correction या update की जानकारी</li>
        <li>गलत या outdated information की सूचना</li>
        <li>Copyright-related concern</li>
        <li>Privacy-related request</li>
        <li>Disclaimer से संबंधित प्रश्न</li>
        <li>Affiliate-related inquiry</li>
        <li>Business या partnership inquiry</li>
        <li>Advertisement inquiry</li>
        <li>Website feedback</li>
        <li>अन्य LoanPolicy.in से संबंधित प्रश्न</li>
      </ul>

      <h2 className="pt-4 text-xl font-bold text-neutral-900">Important</h2>

      <p>LoanPolicy.in एक informational and educational finance website है।</p>

      <p>
        हम Email या Contact Form के माध्यम से OTP, UPI PIN, ATM PIN,
        Debit/Credit Card PIN, Net Banking Password, UPI Password या अन्य
        sensitive banking credentials नहीं मांगते हैं।
      </p>

      <p>
        कृपया ऐसी sensitive information किसी भी व्यक्ति के साथ साझा न करें जो
        LoanPolicy.in के नाम पर आपसे इसकी मांग करे।
      </p>

      <p>
        Loan application, loan approval, credit card approval, interest rate,
        loan amount या अन्य financial product से संबंधित अंतिम जानकारी के लिए
        संबंधित bank, NBFC, lender, credit card issuer या financial service
        provider की official website/app पर जानकारी verify करें।
      </p>

      <h2 className="pt-4 text-xl font-bold text-neutral-900">
        Contact Information
      </h2>

      <p>Website: LoanPolicy.in</p>

      <p>
        Email:{" "}
        <a
          href="mailto:helploanpolicy@gmail.com"
          className="text-brand-green underline"
        >
          helploanpolicy@gmail.com
        </a>
      </p>
    </StaticPage>
  );
}
