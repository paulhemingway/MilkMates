import React from 'react'
import { Link } from "react-router-dom";
import "assets/styles/global.scss"
import "assets/styles/HelpPage.scss"; 
import "assets/styles/TermsOfService.scss"

import MilkMatesLogo from "assets/images/logo/logo-pink.png";

import "assets/styles/Layout.scss";


export default function Terms() {
  return (
    <div className="landing">
        <div className="top-bar">
          <div className="logo">
            <div className="logo-circle"></div>
            <img src={MilkMatesLogo} alt="MilkMates logo" />
          </div>

          <h1>Terms of Service</h1>
          <div className="help-container">
            <Link to="/" className="link">
              Back to Home
          </Link>


          </div>
        </div>
        <br></br>
        <h2 className = "header">Welcome to our app, which is designed to connect parents who are seeking to share breastmilk. This app also allows you to track your pumping, experience, and determine the status of your milk batch. By using our app, you agree to the following terms of service:</h2>
        <br></br>
        <br></br>
        <h3 className = "headerThree">1. Eligibility</h3>
        <p className = "paragraph">To use our app, you must be at least 18 years old and be a parent or legal guardian of a child who is breastfeeding. By using the app, you represent and warrant that you meet these eligibility requirements.</p>

        <br></br>
        <br></br>
        <h3 className = "headerThree">2. User Account</h3>
        <p className = "paragraph">To use our app, you must create a user account. You are solely responsible for maintaining the confidentiality of your login credentials and for any activity that occurs under your account. You agree to notify us immediately if you become aware of any unauthorized access to your account.</p>

        <br></br>
        <br></br>
        <h3 className = "headerThree">3. Breastmilk Sharing</h3>
        <p className = "paragraph">Our app is designed to facilitate the sharing of breastmilk between parents who are willing and able to do so. However, we do not endorse, recommend, or guarantee the quality, safety, or efficacy of any breastmilk shared through our app. You are solely responsible for deciding whether to share breastmilk and for ensuring the safety and quality of any breastmilk that you receive.</p>

        <br></br>
        <br></br>
        <h3 className = "headerThree">4. Tracking Features</h3>
        <p className = "paragraph">Our app provides tracking features for your pumping, experience, and batch status. However, these features are provided for informational purposes only and are not intended to diagnose, treat, or cure any medical condition. You should always consult with your healthcare provider if you have any questions or concerns about your breastfeeding experience.</p>

        <br></br>
        <br></br>
        <h3 className = "headerThree">5. User Conduct</h3>
        <p className = "paragraph">You agree to use our app in a lawful and responsible manner. You will not use our app to:</p>
        <br></br>
        <ul className = "paragraph"> &#x2022; Engage in any illegal or fraudulent activity</ul>
        <ul className = "paragraph"> &#x2022; Harass, abuse, or harm other users</ul>
        <ul className = "paragraph"> &#x2022; Impersonate any person or entity</ul>
        <ul className = "paragraph"> &#x2022; Post or share any content that is obscene, offensive, or infringes on the intellectual property rights of others</ul>
        <ul className = "paragraph"> &#x2022; Attempt to circumvent our security measures or access any account or information that does not belong to you</ul>
        

        <br></br>
        <br></br>
        <h3 className = "headerThree">6. Disclaimer of Warranties</h3>
        <p className = "paragraph">Our app is provided on an "as is" and "as available" basis, without any warranty of any kind, express or implied. We do not warrant that our app will be uninterrupted or error-free, that defects will be corrected, or that our app or the servers that make it available are free of viruses or other harmful components. We disclaim all warranties, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>

        <br></br>
        <br></br>
        <h3 className = "headerThree">7. Limitation of Liability</h3>
        <p className = "paragraph">To the fullest extent permitted by law, we will not be liable for any indirect, incidental, punitive, or consequential damages arising out of or related to your use of our app. Our total liability in connection with your use of our app, whether in contract, tort, or otherwise, will not exceed the amount paid by you, if any, to use our app.</p>

        <br></br>
        <br></br>
        <h3 className = "headerThree">8. Indemnification</h3>
        <p className = "paragraph">You agree to indemnify, defend, and hold us harmless from any claim or demand, including reasonable attorneys' fees, arising out of your use of our app, your breach of these terms of use, or your violation of any law or the rights of any third party.</p>

        <br></br>
        <br></br>
        <h3 className = "headerThree">9. Governing Law and Dispute Resolution</h3>
        <p className = "paragraph">These terms of use will be governed by and construed in accordance with the laws of the State in which you reside. Any dispute arising out of or relating to these terms of use or your use of our app will be resolved exclusively in the state or federal courts located in [insert county], and you consent to the jurisdiction of such courts.</p>

        <br></br>
        <br></br>
        <h3 className = "headerThree">10. Changes to Terms of Use</h3>
        <p className = "paragraph">We reserve the right to modify these terms of use at any time, without prior notice.</p>
        <br></br>
    </div>
  )
}
