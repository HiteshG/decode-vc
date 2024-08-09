import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function Cancellation() {
  return (
    <MaxWidthWrapper className="mb-8 mt-24 text-center max-w-5xl">
      <h1 className="text-4xl font-bold mb-8">Cancellation and Refund Policy for DecodeVC</h1>
      <div className="text-left">
        <p className="mb-4">Last updated: 2024-08-01</p>

        <h2 className="text-2xl font-semibold mb-4">1. No Refund Policy</h2>
        <p className="mb-4">
          At DecodeVC, we have a strict no-refund policy. Once a payment has been made for our services, we do not offer refunds under any circumstances.
        </p>

        <h2 className="text-2xl font-semibold mb-4">2. Cancellation of Service</h2>
        <p className="mb-4">
          You may cancel your subscription or use of our services at any time. However, please note that cancellation does not entitle you to a refund for any unused portion of the service period you have paid for.
        </p>

        <h2 className="text-2xl font-semibold mb-4">3. Billing Cycle</h2>
        <p className="mb-4">
          When you cancel your subscription, you will continue to have access to the service until the end of your current billing cycle. After that, your account will be deactivated, and you will no longer have access to our services.
        </p>

        <h2 className="text-2xl font-semibold mb-4">4. Exceptions</h2>
        <p className="mb-4">
          While we maintain a strict no-refund policy, we may consider exceptions in cases of unauthorized charges or technical errors on our part. These will be evaluated on a case-by-case basis.
        </p>

        <h2 className="text-2xl font-semibold mb-4">5. Service Interruptions</h2>
        <p className="mb-4">
          In the event of service interruptions or downtime, we do not provide refunds. Instead, we will make every effort to resolve issues promptly and may offer service credits at our discretion.
        </p>

        <h2 className="text-2xl font-semibold mb-4">6. Changes to This Policy</h2>
        <p className="mb-4">
          We reserve the right to modify this cancellation and refund policy at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after any changes to this policy constitutes your acceptance of such changes.
        </p>

        <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Cancellation and Refund Policy, please contact us at contact@decodevc.com
        </p>
      </div>
    </MaxWidthWrapper>
  );
}
