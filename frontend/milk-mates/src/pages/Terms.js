import React from "react";
import "assets/styles/Terms.scss";
import PublicWrapper from "components/global/PublicWrapper";
import useDocumentTitle from "services/DocumentTitle";

export default function Terms(props) {
  useDocumentTitle(props.title)

  return (
    <PublicWrapper header="Terms of Service">
      <p className="intro">
        Welcome to our Terms of Service. Please read these terms carefully
        before using MilkMates, as they set forth important legal rights and
        obligations. By using MilkMates, you agree to be bound by these terms of
        service, which govern your access to and use of MilkMates. These terms
        include eligibility requirements, user conduct guidelines, disclaimers,
        and limitations of liability. If you do not agree to these terms, you
        should not use MilkMates.
      </p>
      <hr></hr>
      <div className="tos">
        <div className="scroll-links">
          <div className="sticky-div">
            <a href="#t1">1. Eligibility</a>
            <a href="#t2">2. User Account</a>
            <a href="#t3">3. Breastmilk Sharing</a>
            <a href="#t4">4. Tracking Features</a>
            <a href="#t5">5. User Conduct</a>
            <a href="#t6">6. Disclaimer of Warranties</a>
            <a href="#t7">7. Limitation of Liability</a>
            <a href="#t8">8. Indemnification</a>
            <a href="#t9">9. Governing Law and Dispute Resolution</a>
            <a href="#t10">10. Changes to Terms of Use</a>
          </div>
        </div>
        <div className="terms">
          <div className="term" id="t1">
            <h2>1. Eligibility</h2>
            <p>
              To use our app, you must be at least 18 years old and be a parent
              or legal guardian of a child who is breastfeeding. By using the
              app, you represent and warrant that you meet these eligibility
              requirements.
            </p>
          </div>
          <div className="term" id="t2">
            <h2>2. User Account</h2>
            <p>
              To use our app, you must create a user account. You are solely
              responsible for maintaining the confidentiality of your login
              credentials and for any activity that occurs under your account.
              You agree to notify us immediately if you become aware of any
              unauthorized access to your account.
            </p>
          </div>
          <div className="term" id="t3">
            <h2>3. Breastmilk Sharing</h2>
            <p>
              Our app is designed to facilitate the sharing of breastmilk
              between parents who are willing and able to do so. However, we do
              not endorse, recommend, or guarantee the quality, safety, or
              efficacy of any breastmilk shared through our app. You are solely
              responsible for deciding whether to share breastmilk and for
              ensuring the safety and quality of any breastmilk that you
              receive.
            </p>
          </div>
          <div className="term" id="t4">
            <h2>4. Tracking Features</h2>
            <p>
              Our app provides tracking features for your pumping, experience,
              and batch status. However, these features are provided for
              informational purposes only and are not intended to diagnose,
              treat, or cure any medical condition. You should always consult
              with your healthcare provider if you have any questions or
              concerns about your breastfeeding experience.
            </p>
          </div>
          <div className="term" id="t5">
            <h2>5. User Conduct</h2>
            <p>
              You agree to use our app in a lawful and responsible manner. You
              will not use our app to:
            </p>
            <br></br>
            <ul>
              <li>Engage in any illegal or fraudulent activity</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Impersonate any person or entity</li>
              <li>
                Post or share any content that is obscene, offensive, or
                infringes on the intellectual property rights of others
              </li>
              <li>
                Attempt to circumvent our security measures or access any
                account or information that does not belong to you
              </li>
            </ul>
          </div>

          <div className="term" id="t6">
            <h2>6. Disclaimer of Warranties</h2>
            <p>
              Our app is provided on an "as is" and "as available" basis,
              without any warranty of any kind, express or implied. We do not
              warrant that our app will be uninterrupted or error-free, that
              defects will be corrected, or that our app or the servers that
              make it available are free of viruses or other harmful components.
              We disclaim all warranties, including but not limited to
              warranties of merchantability, fitness for a particular purpose,
              and non-infringement.
            </p>
          </div>
          <div className="term" id="t7">
            <h2>7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, we will not be liable for
              any indirect, incidental, punitive, or consequential damages
              arising out of or related to your use of our app. Our total
              liability in connection with your use of our app, whether in
              contract, tort, or otherwise, will not exceed the amount paid by
              you, if any, to use our app.
            </p>
          </div>
          <div className="term" id="t8">
            <h2>8. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold us harmless from any
              claim or demand, including reasonable attorneys' fees, arising out
              of your use of our app, your breach of these terms of use, or your
              violation of any law or the rights of any third party.
            </p>
          </div>
          <div className="term" id="t9">
            <h2>9. Governing Law and Dispute Resolution</h2>
            <p>
              These terms of use will be governed by and construed in accordance
              with the laws of the State in which you reside. Any dispute
              arising out of or relating to these terms of use or your use of
              our app will be resolved exclusively in the state or federal
              courts located in [insert county], and you consent to the
              jurisdiction of such courts.
            </p>
          </div>
          <div className="term" id="t10">
            <h2>10. Changes to Terms of Use</h2>
            <p>
              We reserve the right to modify these terms of use at any time,
              without prior notice.
            </p>
          </div>
        </div>
      </div>
    </PublicWrapper>
  );
}
