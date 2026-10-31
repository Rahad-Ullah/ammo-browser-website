
import ListSvg from "~/components/atoms/ListSvg";

import {
  legitimateData,
  protectionInfo,
  consentData,
  infoCollectionData,
  shareInfoData,
} from "~/utils/data/privacyData";
import privacyBanner from "~/assets/privacy_banner.png";

export default function PrivacyPolicy() {
  return (
    <div>
      <img
        src={privacyBanner}
        alt="banner"
        className="w-full h-[285px] md:h-[500px] xl:h-[600px] absolute top-0 left-0 -z-10 object-cover"
      />
      <div className="container">
        <div className="flex items-center justify-center pt-[190px] pb-20 lg:pt-[300px] xl:pt-[390px] lg:pb-36  xl:pb-52 text-3xl lg:text-5xl xl:text-8xl heading-gradient">
          <h1>PRIVACY POLICY</h1>
        </div>

        {/* all policy content */}

        <div className="font-Poppins pb-28">
          {/*================================== Welcome to AmmoBrowser! ==============================*/}
          <div>
            <h4 className="pb-5 text-2xl lg:text-5xl text-primaryWhite font-semibold">
              Welcome to AmmoBrowser!
            </h4>
            <p className="text-base lg:text-2xl text-gravelFint font-normal leading-6">
              AmmoBrowser is a registered trademark and is the exclusive
              property of Sol Legacies LLC. <br /> AmmoBrowser deeply values
              your privacy and the protection of your personal data. This
              privacy policy details the information we collect, the methods we
              use to obtain it, the purposes for which we use it, the process by
              which we obtain your consent, the period for which we retain it in
              our databases and, if necessary, with whom we share it. <br />{" "}
              <br /> In this privacy policy, the words "website" and "platform",
              refer to the AmmoBrowser website, "we", "us", "our", and
              "AmmoBrowser", refers to AmmoBrowser, and "user", refers to you,
              the AmmoBrowser user. <br />
              <br />
              By using the website and our services, you accept the practices
              described in this privacy policy. Your use of the website and our
              services is also subject to our terms and conditions. This privacy
              policy may change from time to time. Your continued use of the
              website and our services after we make changes to this privacy
              policy is deemed to be acceptance of those changes, so please
              check this policy periodically for updates. <br /> <br /> This
              privacy policy has been developed and is maintained in accordance
              with all applicable national and international privacy and data
              protection laws and regulations and specifically, the California
              Consumer Privacy Act (CCPA).
            </p>
            {/* general Information */}
            <div className="pt-10 pb-24">
              <h5 className="text-xl lg:text-3xl font-semibold text-primaryWhite">
                General Information
              </h5>
              <p className="text-lg lg:text-2xl font-normal text-primaryWhite py-5">
                The personal data of users that are collected and processed
                through:
              </p>
              <div className="flex items-center gap-2 lg:gap-4">
                <ListSvg />{" "}
                <a
                  href="https://sites.google.com/view/ammobrowser-com?usp=sharing"
                  target="_blank"
                  className="font-medium text-base lg:text-2xl text-gravelFint hover:text-orange transition-colors duration-200 pt-1"
                >
                  Ammobrowser.com
                </a>
              </div>
              <div className="pt-7">
                <p className="text-lg lg:text-2xl font-normal text-primaryWhite py-5">
                  The personal data of users that are collected and processed
                  through:
                </p>
                <div className="flex flex-col gap-3 lg:gap-5">
                  <div className="flex items-center gap-2 lg:gap-4">
                    <ListSvg className={"shrink-0"} />
                    <p className="font-medium text-base lg:text-2xl text-gravelFint hover:text-orange transition-colors duration-200 pt-1">
                      Sol Legacies LLC - AmmoBrowser
                    </p>
                  </div>
                  <div className="flex items-center gap-2 lg:gap-4">
                    <ListSvg className={"shrink-0"} />
                    <p className="font-medium text-base lg:text-2xl text-gravelFint hover:text-orange transition-colors duration-200 pt-1">
                      2108 N St, Ste N, Sacramento, Ca 95816
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <ListSvg />{" "}
                    <a
                      href="mailto:support@ammobrowser.com"
                      className="font-medium text-base lg:text-2xl text-gravelFint pt-1 underline"
                    >
                      Support@ammobrowser.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*================================= HOW WE OBTAIN YOUR CONSENT ==============================*/}
          <div>
            <h4 className="pb-5 text-2xl lg:text-5xl text-primaryWhite font-semibold">
              How we obtain your constent
            </h4>
            <p className="text-base lg:text-2xl text-gravelFint font-normal">
              Use of our website, AmmoBrowser, implies acceptance of and consent
              to our data collection and processing practices as described in
              our Privacy Policy. By performing any of the following actions,
              the user gives their express consent for the collection, use and
              processing of their information in accordance with applicable law,
              including the California Consumer Privacy Act (CCPA) and other
              data privacy regulations in the United States.
            </p>
            <div className="flex flex-col gap-3 lg:gap-5 pt-10">
              {consentData?.map((item, index) => (
                <div key={index} className="flex items-start gap-2 lg:gap-4">
                  <ListSvg className={"shrink-0 size-6 lg:size-8"} />
                  <p className="font-medium text-base lg:text-2xl text-gravelFint">
                    <span className="text-primaryWhite">{item.action}</span>{" "}
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/*========================== TYPES OF INFORMATION COLLECTED ================================*/}
          <div className="py-16 lg:py-24">
            <h4 className="pb-5 text-2xl lg:ext-5xl text-primaryWhite font-semibold">
              Types of information collected
            </h4>
            <h5 className="text-xl lg:text-3xl font-semibold text-primaryWhite pt-2">
              Types of Data Collected
            </h5>
            <p className="text-base lg:text-2xl font-normal text-gravelFint py-5">
              AmmoBrowser collects and processes different types of information
              based on user interaction with the platform. The information
              collected is categorized as follows:
            </p>
            {/* Personal Data Provided by the User */}
            {infoCollectionData?.map((item, index) => (
              <div key={index} className="py-10">
                <h4 className="pb-5 text-xl lg:text-3xl text-primaryWhite font-semibold">
                  {item.category}
                </h4>
                <p className="font-normal text-base lg:text-2xl text-gravelFint">
                  {item.description}
                </p>
                <div className="flex flex-col gap-3 lg:gap-5 pt-10">
                  {item.dataCollected.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 lg:gap-4"
                    >
                      <ListSvg className={"shrink-0 size-6 lg:size-8"} />
                      <p className="font-medium text-base lg:text-2xl text-gravelFint">
                        <span className="text-primaryWhite">
                          {item.type + ": "}
                        </span>
                        {item.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* ============================ HOW LONG WE KEEP YOUR DATA ================================ */}
          <div className="pb-16 lg:pb-24">
            <h4 className="pb-5 text-2xl lg:text-5xl text-primaryWhite font-medium">
              How long we keep your data
            </h4>
            <p className="text-base lg:text-2xl text-gravelFint font-normal">
              The personal data provided by our users through our website will
              be kept for the time necessary to fulfill the legitimate purposes
              described in this policy in section 5 or until the user
              unsubscribes from our newsletter or requests the deletion of their
              data. AmmoBrowser may retain personal data for a longer period
              provided that the user has consented to such processing, as long
              as such consent is not withdrawn. In addition, AmmoBrowser may be
              obliged to retain personal data for a longer period provided that
              this is required for compliance with a legal obligation or by
              order of an authority. Once the retention period has expired, the
              personal data will be deleted. Therefore, the right of access, the
              right of deletion, the right of rectification and the right to
              data portability cannot be asserted after the retention period has
              expired.
            </p>
          </div>

          {/* =========================== HOW WE USE YOUR INFORMATION  =============================== */}
          <div className="pb-16 lg:pb-24">
            <h4 className="pb-5 text-2xl lg:text-5xl text-primaryWhite font-medium">
              How we use your information (legitimate purposes)
            </h4>
            <p className="text-base lg:text-2xl text-gravelFint font-normal">
              The personal data provided by our users through our website will
              be kept for the time necessary to fulfill the legitimate purposes
              described in this policy in section 5 or until the user
              unsubscribes from our newsletter or requests the deletion of their
              data. AmmoBrowser may retain personal data for a longer period
              provided that the user has consented to such processing, as long
              as such consent is not withdrawn. In addition, AmmoBrowser may be
              obliged to retain personal data for a longer period provided that
              this is required for compliance with a legal obligation or by
              order of an authority. Once the retention period has expired, the
              personal data will be deleted. Therefore, the right of access, the
              right of deletion, the right of rectification and the right to
              data portability cannot be asserted after the retention period has
              expired.
            </p>

            {legitimateData?.map((item, index) => (
              <div key={index} className="py-10">
                <h4 className="pb-5 text-xl lg:text-3xl text-primaryWhite font-semibold">
                  {item.category}
                </h4>
                <p className="font-normal text-base lg:text-2xl text-gravelFint">
                  {item.description}
                </p>
                <div className="flex flex-col gap-3 lg:gap-5 pt-10">
                  {item.purposes.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 lg:gap-4"
                    >
                      <ListSvg className={"shrink-0 size-6 lg:size-8"} />
                      <p className="font-medium text-base lg:text-2xl text-gravelFint">
                        <span className="text-primaryWhite">
                          {item.purpose}
                        </span>{" "}
                        {item.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ======================== HOW WE SHARE INFORMATION =============================== */}
          <div className="pb-4 lg:pb-24">
            <h4 className="pb-5 text-2xl lg:text-5xl text-primaryWhite font-medium">
              How we share information
            </h4>
            <p className="text-base lg:text-2xl text-gravelFint font-normal">
              Information about our clients is an important part of our
              business, and we are not in the business of selling it to others.
              We share client information only as described below.
            </p>
            <div className="flex flex-col gap-5 pt-10">
              {shareInfoData?.map((item, index) => (
                <div key={index} className="flex items-start gap-2 lg:gap-4">
                  <ListSvg className={"shrink-0 size-6 lg:size-8"} />
                  <p className="font-medium text-base lg:text-2xl text-gravelFint">
                    <span className="text-primaryWhite">
                      {item.category + ": "}
                    </span>{" "}
                    {item.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ====================== Data BREACH NOTIFICATIONS =========================*/}
          <div className="py-6 lg:py-24">
            <h4 className="pb-5 text-2xl lg:text-5xl text-primaryWhite font-medium">
              Data breach notification
            </h4>
            <p className="text-base lg:text-2xl text-gravelFint font-normal">
              In the event of a security breach that compromises the
              confidentiality of the personal data of our users, AmmoBrowser
              undertakes to notify those affected in a timely manner. This
              notification will be made through the means of contact that have
              been provided by the user on our website. We will take all
              reasonable measures to protect the information and remedy any
              situation that compromises the security of your data.
            </p>
          </div>

          {/*================================ International DATA TRANSFER ================*/}
          <div className="pb-24">
            <h4 className="pb-5 text-2xl lg:text-5xl text-primaryWhite font-medium">
              International data transfer
            </h4>
            <p className="text-base lg:text-2xl text-gravelFint font-normal">
              AmmoBrowser may transfer users' personal data outside of their
              home country due to the use of hosting, storage and processing
              services provided by third parties operating servers located in
              different countries. These transfers are necessary to ensure the
              continued operation of the website. Although AmmoBrowser is based
              in the United States, the technological infrastructure used may
              involve data being stored or processed in jurisdictions with data
              protection laws other than the United States or your home country.
              <br />
              <br />
              AmmoBrowser is committed to ensuring that all international
              transfers of personal data comply with applicable data protection
              regulations, including appropriate security measures to safeguard
              user information. This includes, among other things, the
              application of standard contractual clauses, assessment of the
              adequacy of data protection in the receiving country, and
              compliance with applicable privacy rules on third party services.
              <br />
              <br />
              By using AmmoBrowser's services, users consent to the transfer,
              storage and processing of their data on servers located outside
              their country of residence, acknowledging that such transfers are
              necessary for the operation of the website and our services.
              AmmoBrowser undertakes to take all reasonable steps to protect the
              integrity and security of personal data during such international
              transfers..
            </p>
          </div>

          {/*====================== PROTECTION OF YOUR INFORMATION ====================== */}
          <div>
            <h4 className="pb-5 text-2xl lg:text-5xl text-primaryWhite font-semibold">
              Protection of your information
            </h4>
            <p className="text-base lg:text-2xl text-gravelFint font-normal">
              We grant access to your personal information only to those outside
              persons or services that have a legitimate need to know it and in
              accordance with our privacy policy. We adhere to industry
              recognized security standards to protect your personal
              information, both during transmission and in storage. However, it
              is important to note that no method of transmission over the
              Internet or electronic storage is foolproof and 100% secure.
              Therefore, while we at AmmoBrowser strive to implement
              commercially viable data protection methods, we cannot ensure
              absolute security of your personal information. We undertake not
              to sell, distribute or transfer your personal data to unauthorized
              third parties, unless we have your explicit consent or are
              required by law to do so.
            </p>
            <div className="flex flex-col gap-3 lg:gap-5 pt-10">
              {protectionInfo?.map((item, index) => (
                <div key={index} className="flex items-start gap-2 lg:gap-4">
                  <ListSvg className={"shrink-0 size-6 lg:size-8"} />
                  <p className="font-medium text-base lg:text-2xl text-gravelFint">
                    <span className="text-primaryWhite">{item.title}:</span>{" "}
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* =================== PROTECTION OF CHILDREN'S ONLINE PRIVACY  =============== */}
          <div className="py-4 lg:py-24">
            <h4 className="pb-5 text-2xl lg:text-5xl text-primaryWhite font-medium">
              Protection of children's online privacy
            </h4>
            <p className="text-base lg:text-2xl text-gravelFint font-normal">
              We comply with the requirements of national and international data
              protection regulations regarding the protection of personal data
              of minors. We do not collect any information from children under
              the age of 13 (minimum age allowed to collect and process
              information without parental or legal guardian consent). If we
              become aware that a child under the age of 13 has provided us with
              personal information, we will take steps to delete such
              information.
            </p>
          </div>
          {/* ==================== Third PARTIES ======================  */}
          <div className="pb-4 lg:pb-24">
            <h4 className="pb-5 text-2xl lg:text-5xl text-primaryWhite font-medium">
              Third parties
            </h4>
            <p className="text-base lg:text-2xl text-gravelFint font-normal">
              Except as expressly included in this privacy policy, this document
              only addresses the use and disclosure of information that
              AmmoBrowser collects from you. If you disclose your information to
              third parties, different rules may apply to their use or
              disclosure of the information you disclose to them. AmmoBrowser
              does not control the privacy policies of third parties, and you
              are subject to the privacy policies of such third parties where
              applicable. AmmoBrowser is not responsible for the privacy or
              security practices of third parties, including those linked to or
              from the website. Please refer to the privacy policies of any
              third-party websites or services you access through the website.
            </p>
          </div>
          {/* ==================== Changes TO PRIVACY POLICY ============ */}
          <div className="pb-4 lg:pb-24">
            <h4 className="pb-5 text-2xl lg:text-5xl text-primaryWhite font-medium">
              Changes to privacy policy
            </h4>
            <p className="text-base lg:text-2xl text-gravelFint font-normal">
              We reserve the right to change our privacy policy at any time.
              Changes will be promptly notified to our users and posted on the
              website. Your continued use of our website following such changes
              will signify your acceptance of the changes.
            </p>
          </div>

          {/* ================== Contact INFORMATION ================== */}
          <div>
            <h4 className="pb-5 text-2xl lg:text-5xl text-primaryWhite font-semibold">
              Contact information
            </h4>
            <p className="text-base lg:text-2xl text-gravelFint font-normal">
              If you have questions or concerns about this privacy policy and
              the treatment and security of your data, please contact us using
              the contact information below:
            </p>
            <div className="flex flex-col gap-3 lg:gap-5 pt-10">
              <div className="flex items-start gap-2 lg:gap-4">
                <ListSvg className={"shrink-0 size-6 lg:size-8"} />
                <p className="font-medium text-base lg:text-2xl text-gravelFint">
                  <span className="text-primaryWhite">
                    Sol Legacies LLC - AmmoBrowser.
                  </span>{" "}
                </p>
              </div>

              <div className="flex items-start gap-2 lg:gap-4">
                <ListSvg className={"shrink-0 size-6 lg:size-8"} />
                <p className="font-medium text-base lg:text-2xl text-gravelFint">
                  <span className="text-primaryWhite">
                    Rectification, restriction, limitation and deletion:
                  </span>{" "}
                  You may also rectify, restrict, limit or delete much of your
                  information.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <ListSvg className={"shrink-0 size-6 lg:size-8"} />
                <p className="font-medium text-base lg:text-2xl text-gravelFint">
                  <a
                    href="mailto:support@ammobrowser.com"
                    className="text-primaryWhite underline hover:text-orange transition-colors duration-200"
                  >
                    Support@ammobrowser.com
                  </a>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


