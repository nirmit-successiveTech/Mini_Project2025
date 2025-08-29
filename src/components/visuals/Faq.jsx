"use client";

export default function Faq() {
  const faqs = [
    {
      question: "What are the tech stacks this app use?",
      answer:
        "For frontend Nextjs, for backend ExpressJs and for database MongoDB",
    },
    {
      question: "How will the donor be informed about the requested food?",
      answer:
        "The donor will receive the mail via nodejs nodemailer about the user who requested food.",
    },
    {
      question: "Can we also buy food?",
      answer:
        "Yes the user can go to buy-food section from the navbar to access new food.",
    },
  ];
  return (
      <section className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center mb-8">
          App Related Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="border border-gray-200 rounded-2xl shadow-sm bg-white p-5 group open:shadow-md"
            >
              <summary className="cursor-pointer text-lg font-medium flex justify-between items-center">
                {faq.question}
                <span className="ml-2 transition-transform group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <p className="mt-3 text-gray-600 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
  );
}
