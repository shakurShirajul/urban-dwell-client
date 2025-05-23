import logo from "../assets/images/logo/urbanDwell.png";
const Footer = () => {
  return (
    <div className="border-t font-mulish">
      <footer className="footer p-10 bg-base-200 text-base-content">
        <aside className="flex justify-center flex-col items-center gap-0">
          <img src={logo} className="w-12 h-12" alt="" />
          <p className="text-xl font-extrabold text-gray-800 dark:text-gray-400">
            Urban Dwell
          </p>
        </aside>
        <nav>
          <h6 className="text-lg font-bold">Services</h6>
          <a className="link link-hover text-base font-medium">Branding</a>
          <a className="link link-hover text-base font-medium">Design</a>
          <a className="link link-hover text-base font-medium">Marketing</a>
          <a className="link link-hover text-base font-medium">Advertisement</a>
        </nav>
        <nav>
          <h6 className="text-lg font-bold">Company</h6>
          <a className="link link-hover text-base font-medium">About us</a>
          <a className="link link-hover text-base font-medium">Contact</a>
          <a className="link link-hover text-base font-medium">Jobs</a>
          <a className="link link-hover text-base font-medium">Press kit</a>
        </nav>
        <nav>
          <h6 className="text-lg font-bold">Legal</h6>
          <a className="link link-hover text-base font-medium">Terms of use</a>
          <a className="link link-hover text-base font-medium">
            Privacy policy
          </a>
          <a className="link link-hover text-base font-medium">Cookie policy</a>
        </nav>
      </footer>
      <footer className="footer footer-center p-2 bg-base-200 text-base-content rounded border-t">
        <aside className="text-sm font-bold">
          <p>Copyright © 2025 - All right reserved by Urban Dwell</p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
