import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <MaxWidthWrapper>
        <div className="flex flex-col sm:flex-row items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <Link href="/privacy-policy" className="text-sm text-gray-500 hover:text-gray-700">
              Privacy Policy
            </Link>
            <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-700">
              Contact Us
            </Link>
            <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-700">
              Terms
            </Link>
            <Link href="/cancellation" className="text-sm text-gray-500 hover:text-gray-700">
              Cancellation
            </Link>
          </div>
          <div className="mt-4 sm:mt-0">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} DecodeVC. All rights reserved.
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;