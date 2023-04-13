import React from 'react';
import "assets/styles/Terms.scss";
import PublicWrapper from "components/global/PublicWrapper";
import useDocumentTitle from 'services/DocumentTitle'

export default function Privacy(props) {
  useDocumentTitle(props.title)
  return (
    <PublicWrapper header="Privacy Policy">
    <div>
    <p className="intro">
    This Privacy Policy describes how we collect, use, and disclose personal information that we obtain from users of our app, which is designed to connect parents who are seeking to share breastmilk. This app also allows you to track your pumping, experience, and determine the status of your milk batch.
      </p>
      <hr></hr>
      <div className="tos">
        <div className="scroll-links">
          <div className="sticky-div">
            <a href="#t1">1. Information We Collect</a>
            <a href="#t2">2. How We Use Your Information</a>
            <a href="#t3">3. How We Share Your Information</a>
            <a href="#t4">4. Security of Your Information</a>
            <a href="#t5">5. Children's Privacy</a>
            <a href="#t6">6. Changes to this Privacy Policy</a>
            <a href="#t7">7. Prohibited List</a>
            <a href="#t8">8. Report Abusers</a>
            <a href="#t9">9. Contact Us</a>
          </div>
        </div>
        <div className="terms">
          <div className="term" id="t1">
            <h2>1. Information We Collect</h2>
            <p>
              We may collect the following types of personal information from you:
            </p>
            <br></br>
            <ul>
              <li>Contact information, such as your name, email address, and phone number</li>
              <li>Profile information, such as your username and password</li>
              <li>Health-related information, such as your breastfeeding experience, pumping frequency, and milk batch status</li>
            </ul>
            <br></br>
            <p>
              We may collect this information directly from you or from third-party sources, such as social media platforms, if you choose to link your account with these platforms. 
            </p>
          </div>
          <div className="term" id="t2">
            <h2>2. How We Use Your Information</h2>
            <p>
              We may use your personal information for the following purposes:
            </p>
            <br></br>
            <ul>
              <li>To provide our app and its features to you</li>
              <li>To facilitate breastmilk sharing between parents</li>
              <li>To track your pumping, experience, and batch status </li>
              <li>To communicate with you about our app and its features </li>
              <li>To comply with legal obligations and respond to requests from law enforcement agencies </li>
            </ul>
          </div>
          <div className="term" id="t3">
            <h2>3. How we Share Your Information</h2>
            <p>
              We may share your personal information with the following types of third parties:
            </p>
            <br></br>
            <ul>
              <li>Other users of our app, if you choose to share breastmilk with them</li>
              <li>Service providers who help us operate our app and provide our features, such as hosting and data storage providers</li>
              <li>Legal authorities, if required by law or to protecgt our rights or the rights of others </li>
            </ul>
            <br></br>
            <p> 
                We do not sell or rent your personal information to third parties.
            </p>
          </div>
          <div className="term" id="t4">
            <h2>4. Security of Your Information</h2>
            <p>
              We take reasonable measures to protect your personal information from unauthorized access, use, and disclosure. However, no method of transmission over the internet or method of electronic storage is completely secure, and we cannot guarantee the absolute security of your personal information.
            </p>
          </div>
          <div className="term" id="t5">
            <h2>5. Children's Privacy</h2>
            <p>
            Our app is not intended for use by children under the age of 18. We do not knowingly collect personal information from children under the age of 18, and if we become aware that we have collected such information, we will take reasonable steps to delete it.
            </p>
          </div>

          <div className="term" id="t6">
            <h2>6. Changes to this Privacy Policy</h2>
            <p>
            We may update this Privacy Policy from time to time by posting a new version on our app. We will notify you of any material changes to this Privacy Policy by email or through our app. Your continued use of our app after any such changes will constitute your consent to such changes.
            </p>
          </div>
          <div className="term" id="t7">
            <h2>7. Prohibited List</h2>
            <p>
              The following items are prohibited from being shared on our app:
            </p>
            <br></br>
            <ul>
              <li>Breastmilk that is not fresh or properly stored</li>
              <li>Breastmilk that has been previously frozen or thawed</li>
              <li>Breastmilk that is not from the person claiming to be the donor </li>
              <li>Breastmilk that has been mixed with formula, water, or other substances </li>
              <li>Breastmilk that has expired or is past its recommended use-by date </li>
              <li>Breastmilk that has been contaminated with bacteria or viruses </li>
              <li>Any items that are illegal or could be harmful to others </li>
            </ul>
            <br></br>
            <p>
              We reserve the right to remove any content or suspend any user account that violates our Prohibited Items policy. Users who repeatedly violate this policy may be permanently banned from using our app.
            </p>
          </div>
          <div className="term" id="t8">
            <h2>8. Report Abusers</h2>
            <p>
              Please report those who do not abide by our terms and conditions to milkmatesadmin@gmail.com
            </p>
          </div>
          <div className="term" id="t9">
            <h2>9. Contact Us</h2>
            <p>
              If you have any other questions please email milkmatesadmin@gmail.com and an admin will respond to you within 48 business hours. 
            </p>
          </div>
        </div>
      </div>
    </div>
    </PublicWrapper>
  );
}


