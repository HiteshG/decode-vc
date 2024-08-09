import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function Contact() {
  return (
    <MaxWidthWrapper className="mb-8 mt-24 text-center max-w-5xl">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <div className="text-left">
        <p className="mb-4">
          We&apos;d love to hear from you. Please feel free to contact us using the information below:
        </p>

        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
        <p className="mb-2">
          <strong>Email:</strong> contact@decodevc.com
        </p>
        <p className="mb-2">
          <strong>Phone:</strong> +91-9891695066
        </p>
        <p className="mb-4">
          <strong>Address:</strong> New Delhi, India, 110017
        </p>

        <h2 className="text-2xl font-semibold mb-4">Business Hours</h2>
        <p className="mb-4">Monday - Friday: 9:00 AM - 5:00 PM (GMT)</p>

        <h2 className="text-2xl font-semibold mb-4">Support</h2>
        <p className="mb-4">For technical support, please email: support@decodevc.com</p>

        <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
        <p className="mb-4">
          We value your feedback. If you have any suggestions or comments, please let us know at feedback@decodevc.com
        </p>
        <br>
        </br>


      </div>
    </MaxWidthWrapper>
  );
}
