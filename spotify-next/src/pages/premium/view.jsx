import Image from "next/image";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import Input from "src/components/UI/Input";
import Button from "src/components/UI/Button";
import logo from "../../img/logo.svg";
import { FaCheckCircle } from "react-icons/fa";
import { GoDash } from "react-icons/go";
import Navbar from "src/components/Navbar";

const Premium = () => {
  return (
    <>
      <Navbar/>
      <div className="vip">
        <div className="premium">
          <div className="container">
            <article className="text-center text-light pt-5">
              <div>
                <header className="header">
                  <h1 className="fw-bolder">Experience the difference</h1>
                  <h3 className="mb-5">
                    Go Premium and enjoy full control of your listening. Cancel
                    anytime.
                  </h3>
                </header>
                <table className="text-center premium-details mb-5">
                  <thead>
                    <tr>
                      <th>What you'll get</th>
                      <th>
                        Spotify's
                        <br />
                        Free plan
                      </th>
                      <th>Premium</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th><span>Ad-free music listening</span></th>
                      <td><GoDash /></td>
                      <td><FaCheckCircle /></td>
                    </tr>
                    <tr>
                      <th><span>Download to listen offline</span></th>
                      <td><GoDash /></td>
                      <td><FaCheckCircle /></td>
                    </tr>
                    <tr>
                      <th><span>Play songs in any order</span></th>
                      <td><GoDash /></td>
                      <td><FaCheckCircle /></td>
                    </tr>
                    <tr>
                      <th><span>High audio quality</span></th>
                      <td><GoDash /></td>
                      <td><FaCheckCircle /></td>
                    </tr>
                    <tr>
                      <th><span>Listen with friends in real time</span></th>
                      <td><GoDash /></td>
                      <td><FaCheckCircle /></td>
                    </tr>
                    <tr>
                      <th><span>Organize listening queue</span></th>
                      <td><GoDash /></td>
                      <td><FaCheckCircle /></td>
                    </tr>
                    <tr>
                      <th><span>Ad-free music listening</span></th>
                      <td><GoDash /></td>
                      <td><FaCheckCircle /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            <div className="card mb-5 card-horizontal">
              <div className="card-body me-5">
                <div className="card-batch-student">
                  <ul>
                    <li>
                      <span>₹59 for 2 months</span>
                    </li>
                  </ul>
                  <div className="card-logo">
                    <Image src={logo} alt="name" width={100} height={50} />
                    <h3 className="card-title-student">Student</h3>
                    <p>₹59 for 2 months</p>
                    <p className="premium-payment">₹59 / month after</p>
                  </div>
                </div>
                <hr />
                <ul className="terms-list">
                  <li><p>1 verified Premium account</p></li>
                  <li><p>Discount for eligible students</p></li>
                  <li><p>Cancel anytime</p></li>
                </ul>
                <div className="card-link">
                  <Link href="/premium/student">Get Premium Student</Link>
                </div>
                <p className="card-text">
                  ₹59 for 2 months, then ₹59 per month after. Offer available
                  only to students at an accredited higher education institution
                  and if you haven't tried Premium before.
                </p>
              </div>

              <div className="card-body me-5">
                <div className="card-batch">
                  <ul>
                    <li><span>₹119 for 2 months</span></li>
                  </ul>
                  <div className="card-logo">
                    <Image src={logo} alt="name" width={100} height={50} />
                    <h3 className="card-title">Individual</h3>
                    <p>₹119 for 2 months</p>
                    <p className="premium-payment">₹119 / month after</p>
                  </div>
                </div>
                <hr />
                <ul className="terms-list">
                  <li><p>1 Premium account</p></li>
                  <li><p>Cancel anytime</p></li>
                  <li><p>Subscribe or one-time payment</p></li>
                </ul>
                <Link href="/premium/individual">Get Premium Individual</Link>
                <p className="card-text">
                  ₹119 for 2 months, then ₹119 per month after. Offer only
                  available if you haven't tried Premium before.
                </p>
              </div>

              <div className="card-body me-5">
                <div className="card-batch-family">
                  <ul>
                    <li><span>₹179 for 2 months</span></li>
                  </ul>
                  <div className="card-logo">
                    <Image src={logo} alt="name" width={100} height={50} />
                    <h3 className="card-title-family">Family</h3>
                    <p>₹179 for 2 months</p>
                    <p className="premium-payment">₹179 / month after</p>
                  </div>
                </div>
                <hr />
                <ul className="terms-list">
                  <li><p>Up to 6 Premium accounts</p></li>
                  <li><p>Subscribe or one-time payment</p></li>
                  <li><p>Cancel anytime</p></li>
                </ul>
                <div className="card-link-family">
                  <Link href="/premium/family" className="">
                    Get Premium Family
                  </Link>
                </div>
                <p className="card-text">
                  ₹179 for 2 months, then ₹179 per month after. Offer only
                  available if you haven't tried Premium before. For up to 6
                  family members residing at the same address.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Premium;
