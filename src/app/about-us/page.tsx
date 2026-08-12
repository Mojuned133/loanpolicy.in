import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";

export const metadata: Metadata = { title: "About Us | LoanPolicy.in" };

export default function AboutUsPage() {
  return (
    <StaticPage title="About Us">
      <h2 className="pt-4 text-xl font-bold text-neutral-900">
        Welcome to LoanPolicy.in
      </h2>

      <p>
        LoanPolicy.in एक informational and educational finance website है, जिसका
        उद्देश्य loans, credit cards, banking और financial products से जुड़ी
        जानकारी को आसान और समझने योग्य भाषा में लोगों तक पहुंचाना है।
      </p>

      <p>
        आज के समय में loan या financial product चुनना कई लोगों के लिए मुश्किल हो
        सकता है। अलग-अलग banks, NBFCs, loan apps और financial institutions की
        eligibility, interest rates, fees, documents और terms अलग-अलग हो सकती
        हैं।
      </p>

      <p>
        हमारा उद्देश्य इन विषयों से जुड़ी महत्वपूर्ण जानकारी को सरल तरीके से
        प्रस्तुत करना है, ताकि readers किसी भी financial product को समझने और
        उसके बारे में बेहतर निर्णय लेने से पहले आवश्यक जानकारी प्राप्त कर सकें।
      </p>

      <h2 className="pt-4 text-xl font-bold text-neutral-900">What We Cover</h2>

      <p>
        LoanPolicy.in पर हम मुख्य रूप से निम्नलिखित topics को cover करते हैं:
      </p>

      <ul className="list-inside list-disc space-y-1">
        <li>Personal Loan</li>
        <li>Instant Loan</li>
        <li>Loan Apps</li>
        <li>Bank Loan</li>
        <li>Home Loan</li>
        <li>Business Loan</li>
        <li>Student Loan</li>
        <li>Education Loan</li>
        <li>Gold Loan</li>
        <li>Vehicle Loan</li>
        <li>Government Loan Schemes</li>
        <li>Credit Cards</li>
        <li>Banking Services</li>
        <li>Finance</li>
        <li>NBFCs और Lending Platforms</li>
        <li>अन्य Loan और Financial Products</li>
      </ul>

      <p>
        हम eligibility, interest rates, fees, loan amount, tenure, features,
        application process और अन्य महत्वपूर्ण जानकारी को आसान भाषा में समझाने
        का प्रयास करते हैं।
      </p>

      <h2 className="pt-4 text-xl font-bold text-neutral-900">Our Mission</h2>

      <p>
        LoanPolicy.in का उद्देश्य financial information को simple, useful और
        accessible बनाना है।
      </p>

      <p>
        हम चाहते हैं कि readers किसी loan या financial product के लिए आवेदन करने
        से पहले उसके बारे में महत्वपूर्ण जानकारी को समझ सकें:
      </p>

      <ul className="list-inside list-disc space-y-1">
        <li>Eligibility</li>
        <li>Interest Rate</li>
        <li>Fees &amp; Charges</li>
        <li>Required Documents</li>
        <li>Loan Amount</li>
        <li>Repayment Tenure</li>
        <li>Application Process</li>
        <li>Important Terms &amp; Conditions</li>
      </ul>

      <p>
        हमारा प्रयास रहता है कि complicated financial topics को आम users के लिए
        आसान भाषा में प्रस्तुत किया जाए।
      </p>

      <h2 className="pt-4 text-xl font-bold text-neutral-900">
        Research and Information
      </h2>

      <p>
        हम अपने articles तैयार करते समय उपलब्ध relevant information और sources
        का अध्ययन करने का प्रयास करते हैं।
      </p>

      <p>
        जहाँ संभव हो, financial products से संबंधित महत्वपूर्ण जानकारी को
        संबंधित bank, NBFC, lender, credit card issuer, financial institution या
        अन्य relevant official sources से verify करने का प्रयास किया जाता है।
      </p>

      <p>
        हालांकि financial products की interest rates, fees, eligibility
        criteria, offers और terms समय के साथ बदल सकते हैं।
      </p>

      <p>
        इसलिए हम readers को सलाह देते हैं कि किसी भी financial product के लिए
        आवेदन करने से पहले संबंधित provider की official website या official
        application पर latest information अवश्य verify करें।
      </p>

      <h2 className="pt-4 text-xl font-bold text-neutral-900">
        Loan Apps and Financial Services
      </h2>

      <p>
        LoanPolicy.in पर विभिन्न loan apps, lenders, banks, NBFCs और financial
        services के बारे में informational articles प्रकाशित किए जा सकते हैं।
      </p>

      <p>
        किसी loan app या financial service का हमारे Website पर उल्लेख होना यह
        नहीं दर्शाता कि हम उस service की approval, safety, suitability या
        performance की guarantee देते हैं।
      </p>

      <p>
        किसी भी loan app या financial service का इस्तेमाल करने से पहले users को
        उसके:
      </p>

      <ul className="list-inside list-disc space-y-1">
        <li>Actual lender</li>
        <li>Bank/NBFC details</li>
        <li>Interest rate</li>
        <li>Processing fees</li>
        <li>Repayment terms</li>
        <li>Privacy Policy</li>
        <li>Terms &amp; Conditions</li>
        <li>App permissions</li>
        <li>Customer support details</li>
      </ul>

      <p>
        किसी भी व्यक्ति या platform को OTP, UPI PIN, ATM PIN, Card PIN, Net
        Banking Password या अन्य sensitive banking credentials साझा न करें।
      </p>

      <h2 className="pt-4 text-xl font-bold text-neutral-900">
        We Are Not a Bank or Lender
      </h2>

      <p>
        LoanPolicy.in स्वयं कोई bank, NBFC, lender, credit bureau या loan
        approval authority नहीं है, जब तक किसी specific page पर स्पष्ट रूप से
        अलग जानकारी न दी गई हो।
      </p>

      <p>
        हम मुख्य रूप से financial information और educational content provide
        करते हैं।
      </p>

      <p>
        Loan approval, credit card approval, loan amount, interest rate, credit
        limit और disbursement का final decision संबंधित bank, NBFC, lender या
        financial institution का होता है।
      </p>

      <h2 className="pt-4 text-xl font-bold text-neutral-900">
        No Guaranteed Loan Approval
      </h2>

      <p>
        LoanPolicy.in किसी भी loan, credit card या financial product के approval
        की guarantee नहीं देता।
      </p>

      <p>
        किसी user की eligibility और application का final assessment संबंधित
        lender या financial institution द्वारा किया जाता है।
      </p>

      <p>
        Eligibility criteria पूरा करने के बावजूद application approve या reject
        हो सकता है।
      </p>

      <h2 className="pt-4 text-xl font-bold text-neutral-900">
        Affiliate Disclosure
      </h2>

      <p>
        LoanPolicy.in कुछ मामलों में affiliate links या referral links का उपयोग
        कर सकता है।
      </p>

      <p>
        यदि कोई user हमारे affiliate link के माध्यम से किसी product या service
        पर qualifying action करता है, तो हमें commission या अन्य compensation
        मिल सकता है।
      </p>

      <p>इससे user को सामान्यतः कोई अतिरिक्त cost नहीं लगती।</p>

      <p>
        हालांकि affiliate relationship को किसी financial product की personal
        recommendation या approval guarantee नहीं समझा जाना चाहिए। Users को किसी
        भी financial product को चुनने से पहले स्वयं research करनी चाहिए और
        official provider से जानकारी verify करनी चाहिए।
      </p>

      <h2 className="pt-4 text-xl font-bold text-neutral-900">Advertising</h2>

      <p>LoanPolicy.in पर third-party advertisements दिखाई जा सकती हैं।</p>

      <p>
        किसी advertisement का Website पर दिखाई देना यह जरूरी नहीं है कि
        LoanPolicy.in उस product या service को officially recommend या guarantee
        करता है।
      </p>

      <p>
        Advertisement से संबंधित terms, offers और services के लिए users को
        संबंधित advertiser की official information देखनी चाहिए।
      </p>

      <h2 className="pt-4 text-xl font-bold text-neutral-900">
        Content Updates
      </h2>

      <p>Financial information समय के साथ बदल सकती है।</p>

      <p>
        Interest rates, fees, eligibility criteria, government schemes, credit
        card benefits, loan products और lender policies में बदलाव हो सकते हैं।
      </p>

      <p>
        इसीलिए हम आवश्यकता के अनुसार पुराने articles को update करने का प्रयास
        करते हैं।
      </p>

      <p>
        फिर भी किसी article में पुरानी या बदल चुकी information रह जाने की
        संभावना हो सकती है।
      </p>

      <p>
        किसी महत्वपूर्ण financial decision से पहले latest information संबंधित
        official source से verify करना आवश्यक है।
      </p>

      <h2 className="pt-4 text-xl font-bold text-neutral-900">
        Your Financial Decisions
      </h2>

      <p>
        LoanPolicy.in पर उपलब्ध information केवल general informational and
        educational purposes के लिए है।
      </p>

      <p>
        हम personalized financial, investment, legal, tax या professional advice
        provide नहीं करते।
      </p>

      <p>
        किसी loan, credit card या अन्य financial product के लिए आवेदन करने या
        financial decision लेने से पहले अपनी financial situation के अनुसार उचित
        research करें और आवश्यकता होने पर qualified professional से सलाह लें।
      </p>

      <h2 className="pt-4 text-xl font-bold text-neutral-900">
        Our Commitment
      </h2>

      <p>हमारा प्रयास है कि LoanPolicy.in पर प्रकाशित content:</p>

      <ul className="list-inside list-disc space-y-1">
        <li>सरल भाषा में हो</li>
        <li>उपयोगी हो</li>
        <li>Relevant information provide करे</li>
        <li>समय-समय पर update किया जाए</li>
        <li>Readers को financial products समझने में मदद करे</li>
      </ul>

      <p>
        अगर आपको किसी article में गलत, outdated या incomplete information दिखाई
        देती है, तो आप हमें contact करके इसकी जानकारी दे सकते हैं।
      </p>

      <p>
        हम उचित review के बाद आवश्यक correction या update करने का प्रयास करेंगे।
      </p>

      <h2 className="pt-4 text-xl font-bold text-neutral-900">Contact Us</h2>

      <p>
        यदि आपके पास LoanPolicy.in के बारे में कोई सवाल, सुझाव, correction
        request, business inquiry या अन्य feedback है, तो आप हमसे संपर्क कर सकते
        हैं।
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

      <p>Website: LoanPolicy.in</p>

      <h2 className="pt-4 text-xl font-bold text-neutral-900">Thank You</h2>

      <p>LoanPolicy.in पर आने और हमारी जानकारी पढ़ने के लिए आपका धन्यवाद।</p>

      <p>
        हमारा उद्देश्य है कि loans, credit cards, banking और finance से जुड़ी
        जानकारी को आसान भाषा में आपके लिए समझना आसान बनाया जा सके।
      </p>
    </StaticPage>
  );
}
