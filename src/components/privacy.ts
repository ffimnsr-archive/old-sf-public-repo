import m, { Vnode } from "mithril";
import showdown from "showdown";

import bg from "images/bg-1.jpg";
import logo from "images/sf-logo.png";

const privacyPolicy = `
### SmartFunding Pte. Ltd. Privacy Policy

SmartFunding Pte. Ltd. takes the privacy and confidentiality of Users of this website seriously. It is emphasised to the Users of this website that they read this privacy policy ("the Policy") carefully before using the services provided in this website. By accessing and using the services on our website, the Users acknowledges that they have read, understood and agreed to the contents written in this Policy.

1. Personal Data Collection
    1. During the course of using the services of our website, we may collect, store and use your personal information which includes, but not limited to, the following:
      (i) information about your computer, your visits and use of our website;
      (ii) information provided by you to us when registering with our website for any relevant purposes such as registration for website information, notifications and newsletters, registration of new user profile and/or publication of information on our website;
      (iii) information on any communication that you sent to us or through our website;
      (iv) any other personal information that you may choose to send to us in the course of using our website.

2. Usage of Personal Information
    1. Personal information provided to the website by you will be used for, but not limited to, the following purposes:
      (i) administer the website;
      (ii) enable you to use the services provided by the website;
      (iii) sending notifications through e-mail to you;
      (iv) sending marketing and non-marketing commercial communications to you;
      (v) sending notifications or e-mail newsletters if previously requested by you;
      (vi) to provide sufficient information on the website to identify you to Investors and/or Borrowers;
      (vii) to deal with any questions or complaints made by or about you in relation to our website;
      (viii) to be kept and stored to prevent fraud and to secure our website for our legal and compliance requirements;
      (ix) to verify your compliance with the terms and conditions governing the use of our website.
    2. Personal information submitted by you to us for the purposes of publication on the website will be used for the said purposes in accordance with the consent that you have given to us.
    3. We hereby give you a guarantee that without your express consent, we shall not supply any of your personal information to any unrelated third party for their own purposes unless it is required by law to do so.
    4. All financial transactions made between the Investor and Borrowers on the website shall be facilitated through SmartFundings escrow account. For smooth transactions between all parties, some information must be shared to the escrow agent which maintains the said escrow account. We will only provide sufficient information to the extent necessary for the escrow agent to ensure smooth transaction of funds. Transaction of funds include processing and refunding monies, fees, payments and/or refund as well as dealing with complaints and queries relating to such monies, fees, payments and/or refunds.

3.	Disclosing of Personal Information
    1. All your personal information provided to us may, if required, be processed by any of our employees, officers, professional advisers, agents ("authorised personnel") whether in or outside of Singapore. We guarantee that access to such personal information will only be released and used by the authorised personnel to fulfil any of their job requirements. It is further guaranteed that only necessary personal information shall be supplied to the authorised personnel depending on the job requirement at hand.
    2. We may from time to time disclose your personal information in the following situations:
      (i) to the extent we are required to do so by any law;
      (ii) when there are any ongoing or prospective legal proceedings;
      (iii) to establish and defend our legal rights when necessary;
      (iv) to any person where it is reasonably believed that the said person may apply or have applied to a court or other competent authority for an order to disclose personal information.

4.	Data Transfers
    1. Personal information submitted by you shall be collected, stored and processed by us and may be transferred to other countries outside of Singapore depending on the location of the server(s) to secure and safeguard your personal information which have been submitted to us.
    2. Personal information which is published by you or submitted by you for publication on our website may be available to the public in other parts of the world through the Internet. You acknowledge that we cannot prevent the use and/or misuse of your personal information by other parties.

5.	Retaining Personal Information
    1. Personal information which you provide to us for any purposes shall not be kept longer than necessary for that purposes.
    2. We will retain your personal information as long as may be necessary to protect the interests of SmartFunding and/or its authorised personnel as may be deemed necessary, or where it is required by the law.
    3. We will also retain your personal information if:
      (i) we are required by any existing laws to do so;
      (ii) we believe that the personal information may be relevant to any ongoing or prospective legal proceedings;
      (iii) it is to establish and defend our legal rights when necessary.

6.	Security of Personal Information
    1. We warrant and guarantee that we will take all reasonable steps and measures to prevent loss, misuse or alteration of your personal information by any unauthorised person.
    2. We further warrant and guarantee that all of your personal information submitted to us shall be stored in our secured servers.
    3. All electronic financial transactions entered and processed through our website will be protected by encryption technology.
    4. Notwithstanding clauses 6.2 and 6.3, it is understood that any information transmitted over the internet is inherently insecure. As such, you understand that we cannot give you a full guarantee on the security of any form of data sent over to us by you through the internet.
    5. When registering yourself on the website, you shall be asked to create your own personal password. You are responsible for keeping the password confidential. Except on instances when you want to log into our website, we will never ask for your password.

7.	Information Updates
    1. We understand that you will need to update or correct your information from time to time. When an information update is needed, please contact us and provide us the relevant details. We will help to update and/or correct your information for you if it is deemed reasonable to do so.

8.	Use of Cookies
    1. By visiting and using this website, you acknowledge that cookies may be installed in your computer. Cookies are files that records information such as browsing of the website from that computer or to collect Internet log information and visitor behaviour information. You may delete cookies installed on your computer at any time by configuring your browser software. Please take note that you may not benefit from some of the services on this website if cookies are uninstalled or prevented from being installed on your computer.

9.	Amendments
    1. You understand and acknowledge that there may be changes made to this privacy policy from time to time. When we do so, we will update and publish the latest version of this privacy policy on the website.
    2. You are advised to check this privacy policy from time to time to keep yourself updated with the latest changes in this privacy policy.
    3. We may notify you of the changes made to this privacy policy by way of e-mail to your registered e-mail address.

10.	Your Rights
    1. You may instruct us to provide you with your personal information which has been submitted to us provided that you supply us evidence as to your identity (identification card, passport or any other forms of documents which may proof the validity of your identity). You may also be required to make a payment for this service.
    2. Notwithstanding clause 10.1, we may still withhold any personal information that you may have requested to the extent as permitted by law.

11.	Exclusion of Liability
    1. You agree to not hold us liable for any violation, breach or non-compliance with any precepts of privacy or the protection of Personal Data in the following situations:
      (i) where an act of nature is involved or any unforeseeable circumstances has occurred, resulting in the malfunction, damage or destruction of any equipment and/or machinery which is used to secure, store or process personal data or information from the Users;
      (ii) where the personal data or information is already available or able to be found by the public before any personal data or information of such kind has been submitted to us;
      (iii) where after every reasonable effort and attempt has been made by us to verify, secure and safeguard any personal data and information submitted to us, there is unauthorised access, hacking, misuse, modification, alteration, tampering or abuse of such personal data and information caused by malicious, fraudulent or criminal acts of any kind or misconduct of a third party not being under our control or instruction.

12.	Contact Information
    1. If you have any questions about this privacy policy, or you would like to have access or make any ratification to your personal information, you may contact us at the contact details below:


      Attention		: Legal Department<br/>
      E-mail			: support@smartfunding.sg
`;

const converter = new showdown.Converter();
const page = converter.makeHtml(privacyPolicy);

export default {
  view(vnode: Vnode) {
    return m(".sf-root", [
      m(".accountbg", {
        style: {
          "background": `url(${bg})`,
          "background-size": "cover"
        }
      }),
      m(".wrapper-page.account-page-full", {
        style: {
          "overflow-y": "hidden"
        }
      }, [
        m(".card",
          m(".card-block",
            m(".account-box",
              m(".card-box.p-5", {
                style: {
                  "overflow-y": "scroll",
                  "height": "100vh"
                }
              }, [
                m("h2.text-uppercase.text-center.pb-4",
                  m("a.text-success[href='/']", { oncreate: m.route.link },
                    m("span", m("img[alt=''][height='26']", { src: logo }))
                  )
                ),
                m.trust(page),
                m("a.btn.btn-md.btn-block.btn-custom.waves-effect.waves-light.mt-3.mb-3[href='/']", { oncreate: m.route.link }, "Return Home")
              ])
            )
          )
        ),
      ])
    ]);
  }
} as m.Component;
