
import ListSvg from "~/components/atoms/ListSvg";
import {
  CopyrightInfringement,
  Prohibitedactivities,
  Disclaimerwarranties,
  Indemnification,
} from "~/utils/data/termsData";
import termsBg from "~/assets/termsBg.png";

export default function TermsCondition() {
  return (
    <div>
      <div>
        <img
          src={termsBg}
          alt="banner"
          className="w-full h-[285px] md:h-[500px] xl:h-[600px] absolute top-0 left-0 -z-10 object-cover"
        />
        <div className="container">
          <div className="flex items-center justify-center pt-[190px] pb-20 lg:pt-[300px] xl:pt-[390px] lg:pb-36  xl:pb-52 text-3xl lg:text-5xl xl:text-8xl heading-gradient">
            <h1>Terms and Conditions</h1>
          </div>

          {/* all policy content */}

          <div className="font-Poppins pb-28 max-w-5xl mx-auto flex flex-col gap-10 lg:gap-12">
            {/*================================== TERMS AND CONDITIONS ==============================*/}
            <div>
              <p className="text-xl lg:text-3xl font-medium text-primaryWhite pb-5">
                Welcome to AmmoBrowser!
              </p>
              <p className="text-base lg:text-xl text-[var(--gravelFint)] font-normal leading-8">
                AmmoBrowser is a registered trademark and is the exclusive
                property of Sol Legacies LLC. These are the terms and conditions
                for:
              </p>

              <div className="pt-5">
                <div className="flex items-center gap-2 lg:gap-4">
                  <ListSvg />{" "}
                  <a
                    href="https://sites.google.com/view/ammobrowser-com?usp=sharing"
                    target="_blank"
                    className="font-medium text-base lg:text-xl text-[var(--gravelFint)] hover:text-orange transition-colors duration-200 pt-1"
                  >
                    Ammobrowser.com
                  </a>
                </div>
                <p className="text-base lg:text-xl text-[var(--gravelFint)] font-normal leading-8 pt-6">
                  The following terms and conditions apply to the AmmoBrowser
                  website. By using the website you agree to be bound by these
                  terms and conditions and our privacy policy.
                </p>
                <p className="text-base lg:text-xl text-[var(--gravelFint)] font-normal leading-8 pt-6">
                  In these terms and conditions, the words "website" and
                  "platform", refer to the AmmoBrowser website, "we", "us",
                  "our", and "AmmoBrowser", refers to AmmoBrowser, and "user",
                  refers to you, the AmmoBrowser user.
                </p>
                <p className="text-base lg:text-xl text-primaryWhite font-semibold uppercase leading-8 pt-6">
                  PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY BEFORE USING
                  OR OBTAINING ANY INFORMATION OR SERVICES FROM AMMOBROWSER.
                </p>
              </div>
            </div>

            {/*================================= ACCEPTANCE OF TERMS ==============================*/}
            <div>
              <h4 className="pb-5 text-xl lg:text-3xl text-primaryWhite font-semibold">
                Acceptance of terms
              </h4>
              <p className="text-base lg:text-xl text-[var(--gravelFint)] font-normal">
                This agreement sets forth the legally binding terms for your use
                of the website and services offered by AmmoBrowser. By accessing
                and using the website and its services, you agree to abide by
                the provisions of this agreement. If you do not agree to these
                terms, you must refrain from using the website and services. We
                reserve the right to modify this agreement at any time, and such
                modifications shall be effective upon posting on the website. By
                continuing to use the website and services following the posting
                of any modifications, you agree to be bound by the updated
                terms; therefore, it is important that you review this agreement
                periodically. <br />
                <br />
                AmmoBrowser reserves the right, in its sole discretion, to
                refuse to provide services to any user or customer and to modify
                its eligibility criteria at any time. This provision shall be
                inapplicable in those jurisdictions where it is prohibited by
                law and, in such cases, the right to access the website and
                services will be revoked. <br />
                <br />
                By using the website and services, you represent and warrant
                that you have full power, authority and capacity to enter into
                this agreement and to perform all obligations hereunder. You
                further represent and warrant that you are not subject to any
                legal incapacity or contractual restriction that would prevent
                you from entering into this agreement.
              </p>
            </div>

            {/*================================= Notifications and newsletter ==============================*/}
            <div>
              <h4 className="pb-5 text-xl lg:text-3xl text-primaryWhite font-semibold">
                Notifications and newsletter
              </h4>
              <p className="text-base lg:text-xl text-[var(--gravelFint)] font-normal">
                By providing AmmoBrowser with your e-mail address, you agree
                that we may use your e-mail address to send you important
                notifications and communications about our services, news and
                special content. If you do not wish to receive these e-mails,
                you may opt-out of receiving them by sending us your request
                through our contact information or by using the "unsubscribe"
                option in the e-mails themselves. This option may prevent you
                from receiving emails about our services, important news and
                special content.
              </p>
            </div>

            {/*================================= Website Description ==============================*/}
            <div>
              <h4 className="pb-5 text-xl lg:text-3xl text-primaryWhite font-semibold">
                Website Description
              </h4>
              <p className="text-base lg:text-xl text-[var(--gravelFint)] font-normal">
                AmmoBrowser is an online platform that operates as a directory
                and search engine specializing in ammunition, allowing users to
                find and compare prices of different products offered by
                multiple retailers. The platform does not participate in the
                sale, processing, shipping or handling of ammunition in any way.
                Instead, it provides an indexing and referencing service that
                makes it easier for users to search for ammunition available on
                the market, redirecting them directly to the website of the
                corresponding retailer to complete the purchase. <br />
                <br />
                The purpose of AmmoBrowser is to optimize and simplify the
                experience of consumers in the acquisition of ammunition,
                providing a centralized resource that allows them to access
                up-to-date information on availability, prices and purchase
                options. The platform does not interfere in transactions between
                users and retailers, nor does it assume any responsibility for
                the quality, accuracy, availability or delivery of products
                advertised on third-party websites. All purchases and any
                questions related to products listed on the platform should be
                handled directly with the corresponding retailer.
              </p>
              <div className="flex flex-col gap-3 lg:gap-5 pt-10">
                {/* {consentData?.map((item, index) => (
                <div key={index} className="flex items-start gap-2 lg:gap-4">
                  <ListSvg className={"shrink-0 size-6 lg:size-8"} />
                  <p className="font-medium text-base lg:text-xl text-[var(--gravelFint)]">
                    <span className="text-primaryWhite">{item.action}</span>{" "}
                    {item.description}
                  </p>
                </div>
              ))} */}
              </div>
            </div>

            {/*================================= Sponsored Listings ==============================*/}
            <div>
              <h4 className="pb-5 text-xl lg:text-3xl text-primaryWhite font-semibold">
                Sponsored Listings
              </h4>
              <p className="text-base lg:text-xl text-[var(--gravelFint)] font-normal">
                Some of the ammunition listings available on AmmoBrowser may be
                sponsored by third-party providers or retailers who have
                contracted advertising services on the platform. These listings
                are distinguished by the label ‘Sponsored’ in order to provide
                transparency to users about the nature of the promotion. <br />
                <br />
                Sponsored listings may receive a prominent position in search
                results or in specific sections of the website, depending on the
                advertising agreements with each provider. However, the
                inclusion of a sponsored listing in AmmoBrowser does not imply a
                recommendation, endorsement or guarantee regarding the quality,
                availability, price, legality or suitability of the products
                offered by the corresponding retailer.
                <br />
                <br />
                AmmoBrowser does not participate in the sale, processing or
                delivery of the products listed on the platform, including those
                labelled as sponsored. All purchases and transactions must be
                made directly on the website of the relevant retailer, and any
                queries or complaints relating to a sponsored product should be
                addressed exclusively to the provider offering it <br /> <br />{" "}
                The order and visibility of listings on the platform may be
                influenced by various factors, including commercial agreements
                with advertisers, the relevance of products and other criteria
                determined by AmmoBrowser to improve the user experience. The
                presence of sponsored listings does not affect the impartiality
                of the presentation of the overall search results, and the
                platform strives to offer an objective and accessible comparison
                of the products available.
              </p>
            </div>

            {/*================================= Caliber Overview ==============================*/}
            <div>
              <h4 className="pb-5 text-xl lg:text-3xl text-primaryWhite font-semibold">
                “Caliber Overview” Section
              </h4>
              <p className="text-base lg:text-xl text-[var(--gravelFint)] font-normal">
                The information included in the “Caliber Overview” section of
                ammunition listings, which may contain data such as bullet type,
                velocity, energy, applications, and compatibility, is provided
                for informational purposes only and should not be considered
                definitive or comprehensive. AmmoBrowser does not guarantee the
                accuracy, currency, or suitability of such data for any specific
                use and assumes no responsibility for errors, omissions, or
                misinterpretations of the information published. <br />
                <br />
                It is the sole responsibility of the user to verify, prior to
                any purchase or use, the compatibility of the ammunition with
                their firearm and to comply with all manufacturer specifications
                and requirements, as well as applicable regulations. Misuse of
                incompatible ammunition may result in property damage, serious
                injury, or death, and AmmoBrowser recommends that users consult
                directly with the manufacturer or a qualified gunsmith to
                confirm the suitability of the product.
              </p>
            </div>

            {/*================================= Shipping Time and Cost Estimates ==============================*/}
            <div>
              <h4 className="pb-5 text-xl lg:text-3xl text-primaryWhite font-semibold">
                Shipping Time and Cost Estimates
              </h4>
              <p className="text-base lg:text-xl text-[var(--gravelFint)] font-normal">
                The information displayed on AmmoBrowser regarding estimated
                shipping times is provided for informational purposes only and
                is based on our own calculations derived from general
                information and past trends, not on data provided directly by
                retailers. These times are approximate and should not be
                interpreted as guarantees. AmmoBrowser does not control or
                participate in the shipping operations of retailers and
                therefore assumes no responsibility for delays or variations in
                delivery times. <br />
                <br />
                Similarly, any estimated shipping costs displayed on the
                platform are calculated by AmmoBrowser and are intended solely
                to provide users with an approximate reference. The final
                shipping cost will be determined and communicated exclusively by
                the retailer at the time of purchase. Users are advised to
                confirm shipping times and costs directly with the retailer
                before completing any transaction.
              </p>
            </div>

            {/*================================= Blog and Editorial Content ==============================*/}
            <div>
              <h4 className="pb-5 text-xl lg:text-3xl text-primaryWhite font-semibold">
                Blog and Editorial Content
              </h4>
              <p className="text-base lg:text-xl text-[var(--gravelFint)] font-normal">
                All articles, guides, comparisons, reviews, and other content
                published on the AmmoBrowser blog are provided for general
                informational and educational purposes only. While AmmoBrowser
                strives to provide useful and accurate information, blog content
                may contain errors, omissions, outdated information, estimates,
                opinions, or generalizations and should not be considered
                professional, technical, legal, or safety advice. AmmoBrowser
                makes no representation or warranty regarding the accuracy,
                completeness, reliability, or suitability of any blog content
                for a particular purpose. <br />
                <br />
                Information concerning ammunition, firearms, calibers,
                ballistics, compatibility, performance, intended applications,
                or similar subjects should not be relied upon as a substitute
                for the instructions, specifications, or recommendations
                provided by the applicable firearm, ammunition, or component
                manufacturer. Actual performance and suitability may vary based
                on the firearm, ammunition, environmental conditions, and other
                factors. <br />
                <br />
                Users are solely responsible for verifying all information
                before purchasing, handling, or using any firearm or ammunition
                and for ensuring compliance with manufacturer specifications and
                all applicable federal, state, and local laws and regulations.
                AmmoBrowser assumes no responsibility or liability for any loss,
                damage, injury, or other consequence resulting from reliance
                upon or use of information contained in its blog or other
                editorial content.
              </p>
            </div>

            {/*================================= Limitation of liability ==============================*/}
            <div>
              <h4 className="pb-5 text-xl lg:text-3xl text-primaryWhite font-semibold">
                Limitation of liability
              </h4>
              <p className="text-base lg:text-xl text-[var(--gravelFint)] font-normal">
                AmmoBrowser provides an online platform that acts solely as an
                ammunition directory and search engine, making it easy for users
                to search and compare prices between multiple retailers.
                AmmoBrowser does not sell, distribute, process, ship or handle
                ammunition in any way, nor does it participate in any
                transactions that users may enter into with retailers to which
                they are redirected through the platform. Consequently,
                AmmoBrowser assumes no responsibility for the quality,
                availability, accuracy, legality, suitability or any other
                aspect of the products offered by third parties through their
                respective websites. <br />
                <br />
                AmmoBrowser does not guarantee the accuracy, integrity or
                timeliness of the information presented on the platform,
                including prices, product descriptions, stock availability or
                any other details provided by retailers. The information
                contained on the website is compiled from third parties and may
                be subject to change without notice. AmmoBrowser is not
                responsible for any errors, omissions or inaccuracies in the
                information displayed, nor for any purchasing decisions made by
                users based on such information. It is recommended that users
                verify any details directly with retailers before making a
                purchase. <br />
                <br />
                AmmoBrowser does not guarantee the uninterrupted or error-free
                operation of the website, nor is it responsible for any
                interruption of service, technical failure, computer attack,
                loss of data or any other problem that may affect access to or
                use of the platform. Likewise, AmmoBrowser is not responsible
                for any damage, direct or indirect, incidental, special or
                consequential, that may arise from the use or inability to use
                the website, including, but not limited to, economic losses,
                damage to reputation, business interruptions or any other damage
                arising from interaction with the platform or with the retailers
                listed on it. <br /> <br />
                Links provided to third-party websites, including those of
                ammunition retailers, are for the convenience of the user only.
                AmmoBrowser does not control, endorse, or guarantee the content,
                privacy policies, terms of use, business practices, or
                transactions made on these websites. Any purchase or interaction
                made on an external website is exclusively between the user and
                the corresponding retailer, and AmmoBrowser assumes no
                responsibility for disputes, refunds, order fulfillment,
                warranty issues or any other matter arising from such
                transactions. <br /> <br />
                By using the platform, the user acknowledges and accepts that
                they do so at their own risk and that AmmoBrowser assumes no
                responsibility for the consequences arising from the use of the
                website or any transaction made with third-party retailers. To
                the fullest extent permitted by law, AmmoBrowser disclaims any
                express or implied warranties, including, but not limited to,
                warranties of merchantability, fitness for a particular purpose,
                and non-infringement.
              </p>
            </div>

            {/*================================= Copyright and trademark ==============================*/}
            <div>
              <h4 className="pb-5 text-xl lg:text-3xl text-primaryWhite font-semibold">
                Copyright and trademark
              </h4>
              <p className="text-base lg:text-xl text-[var(--gravelFint)] font-normal">
                AmmoBrowser is a registered trademark and is the exclusive
                property of Sol Legacies LLC. All rights to the name, logo,
                design, content and any other distinctive element of the
                platform are protected by applicable intellectual property laws.
                Any unauthorized use of the AmmoBrowser trademark, logos or
                materials without the prior written consent of Sol Legacies LLC
                is strictly prohibited.
              </p>
            </div>

            {/*================================= Copyright Infringement ==============================*/}
            <div>
              <h4 className="pb-5 text-xl lg:text-3xl text-primaryWhite font-semibold">
                Copyright Infringement
              </h4>
              <p className="text-base lg:text-xl text-[var(--gravelFint)] font-normal">
                AmmoBrowser will respond to all inquiries, complaints and claims
                regarding alleged infringement for failure to comply with or
                violation of the provisions contained in the Digital Millennium
                Copyright Act (DMCA). AmmoBrowser respects the intellectual
                property of others, and expects users to do the same. If you
                believe, in good faith, that any material provided on or in
                connection with the website infringes your copyright or other
                intellectual property right, please send us your copyright
                infringement request pursuant to Section 512 of the Digital
                Millennium Copyright Act (DMCA), via our contact information,
                with the following information:
              </p>
              <div className="flex flex-col gap-3 lg:gap-5 pt-10">
                {CopyrightInfringement?.map((item, index) => (
                  <div key={index} className="flex items-start gap-2 lg:gap-4">
                    <ListSvg className={"shrink-0 size-6 lg:size-8"} />
                    <p className="font-medium text-base lg:text-xl text-[var(--gravelFint)]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/*====================== Personal data ====================== */}
            <div>
              <h4 className="pb-5 text-xl lg:text-3xl text-primaryWhite font-semibold">
                Personal data
              </h4>
              <p className="text-base lg:text-xl text-[var(--gravelFint)] font-normal">
                Any personal information you submit in connection with your use
                of the website and our services will be used in accordance with
                our privacy policy. By using the website and our services, you
                consent to our collection and storage of your personal
                information. View our privacy policy.
              </p>
            </div>

            {/* =================== Prohibited activities  =============== */}
            <div>
              <h4 className="pb-5 text-xl lg:text-3xl text-primaryWhite font-semibold">
                Prohibited activities
              </h4>
              <p className="text-base lg:text-xl text-[var(--gravelFint)] font-normal">
                The following activities are prohibited:
              </p>
              <div className="flex flex-col gap-3 lg:gap-5 pt-10">
                {Prohibitedactivities?.map((item, index) => (
                  <div key={index} className="flex items-start gap-2 lg:gap-4">
                    <ListSvg className={"shrink-0 size-6 lg:size-8"} />
                    <p className="font-medium text-base lg:text-xl text-[var(--gravelFint)]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* ==================== Disclaimer of warranties ======================  */}
            <div>
              <h4 className="pb-5 text-xl lg:text-3xl text-primaryWhite font-semibold">
                Disclaimer of warranties
              </h4>
              <p className="text-base lg:text-xl text-[var(--gravelFint)] font-normal">
                Due to the nature of the Internet, AmmoBrowser provides and
                maintains the website on an "as is", "as available" basis and
                does not promise that use of the website will be uninterrupted
                or error free. We will not be liable to you if we are unable to
                provide the website or our services for any reason beyond our
                control. <br /> <br />
                Our website may from time to time contain links to other
                websites which are not under the control of and are not
                maintained by us. These links are provided for your convenience
                only and we are not responsible for the content of those sites.{" "}
                <br />
                <br />
                Except as provided above we can give no other warranties,
                conditions or other terms, express or implied, statutory or
                otherwise and all such terms are hereby excluded to the maximum
                extent permitted by law. <br /> <br />
                You will be responsible for any breach of these terms by you and
                if you use the website in breach of these terms you will be
                liable to and will reimburse AmmoBrowser for any loss or damage
                caused as a result. <br /> <br />
                AmmoBrowser shall not be liable in any amount for any failure to
                perform any obligation under this agreement if such failure is
                caused by the occurrence of any unforeseen event beyond its
                reasonable control, including, without limitation, Internet
                outages, communications outages, fire, flood, war or any
                uncontrollable act of nature. <br /> <br /> These terms do not
                affect your statutory rights as a consumer which are available
                to you <br /> <br /> Subject as aforesaid, to the maximum extent
                permitted by law, AmmoBrowser excludes liability for any loss or
                damage of any kind howsoever arising, including without
                limitation any direct, indirect or consequential loss whether or
                not such arises out of any problem you notify to AmmoBrowser and
                AmmoBrowser shall have no liability to pay any money by way of
                compensation, including without limitation all liability in
                relation to:
              </p>
              <div className="flex flex-col gap-3 lg:gap-5 pt-10">
                {Disclaimerwarranties?.map((item, index) => (
                  <div key={index} className="flex items-start gap-2 lg:gap-4">
                    <ListSvg className={"shrink-0 size-6 lg:size-8"} />
                    <p className="font-medium text-base lg:text-xl text-[var(--gravelFint)]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* ==================== Indemnification ============ */}
            <div>
              <h4 className="pb-5 text-xl lg:text-3xl text-primaryWhite font-semibold">
                Indemnification
              </h4>
              <p className="text-base lg:text-xl text-[var(--gravelFint)] font-normal">
                You agree to defend and indemnify AmmoBrowser from and against
                any claims, causes of action, demands, recoveries, losses,
                damages, fines, penalties or other costs or expenses of any kind
                or nature including but not limited to reasonable legal and
                accounting fees, brought by third parties as a result of:
              </p>
              <div className="flex flex-col gap-3 lg:gap-5 pt-10">
                {Indemnification?.map((item, index) => (
                  <div key={index} className="flex items-start gap-2 lg:gap-4">
                    <ListSvg className={"shrink-0 size-6 lg:size-8"} />
                    <p className="font-medium text-base lg:text-xl text-[var(--gravelFint)]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ================= Changes and termination =============== */}
            <div>
              <h4 className="pb-5 text-xl lg:text-3xl text-primaryWhite font-semibold">
                Changes and termination
              </h4>
              <p className="text-base lg:text-xl text-[var(--gravelFint)] font-normal">
                We may modify the website and these terms at any time, at our
                sole discretion and without notice. You are responsible for
                keeping yourself informed of these terms. Your continued use of
                the website constitutes your acceptance of any changes to these
                terms and any changes will supersede all previous versions of
                the terms. Unless otherwise specified, all changes to these
                terms apply to all users and customers. In addition, we may
                terminate our agreement with you under these terms at any time
                by notifying you in writing (including by email) or without
                notice.
              </p>
            </div>
            {/* ================= Integration clause =============== */}
            <div>
              <h4 className="pb-5 text-xl lg:text-3xl text-primaryWhite font-semibold">
                Integration clause
              </h4>
              <p className="text-base lg:text-xl text-[var(--gravelFint)] font-normal">
                This agreement together with the privacy policy and any other
                legal notices published by AmmoBrowser, shall constitute the
                entire agreement between you and AmmoBrowser concerning and
                governs your use of the website and the services.
              </p>
            </div>
            {/* ================= force majeure =============== */}
            <div>
              <h4 className="pb-5 text-xl lg:text-3xl capitalize text-primaryWhite font-semibold">
                Force majeure
              </h4>
              <p className="text-base lg:text-xl text-[var(--gravelFint)] font-normal">
                AmmoBrowser shall not be liable for any failure or
                non-performance of services due to causes beyond its reasonable
                control, including but not limited to acts of civil authorities,
                acts of military authorities, riots, acts of nature and natural
                disasters, and other acts which may be due to unforeseen
                circumstances and which may prevent the performance of our
                services.
              </p>
            </div>
            {/* ================= Dispute resolution =============== */}
            <div>
              <h4 className="pb-5 text-xl lg:text-3xl capitalize text-primaryWhite font-semibold">
                Dispute resolution
              </h4>
              <p className="text-base lg:text-xl text-[var(--gravelFint)] font-normal">
                Any dispute, claim or controversy arising between a user and
                AmmoBrowser in connection with these terms and conditions, the
                use of the website or the services provided, shall be resolved
                exclusively through alternative dispute resolution mechanisms,
                including mediation and arbitration, as detailed below. <br />{" "}
                <br /> First, both parties agree to use their best efforts to
                resolve any dispute informally. This includes direct
                communication between the parties involved to identify and
                address concerns or disagreements quickly and efficiently. Users
                may contact AmmoBrowser through designated support channels to
                raise any disputes. The company commits to respond within a
                reasonable period of time, providing an opportunity to resolve
                the issue without resorting to formal procedures. <br /> <br />{" "}
                If the parties fail to resolve the dispute informally within
                thirty (30) days of initial notification of the dispute, the
                dispute will be submitted to mediation. The mediation shall be
                conducted before a neutral mediator selected by mutual agreement
                of the parties. If the parties are unable to agree on a mediator
                within an additional fifteen (15) days, a mediator shall be
                appointed through a recognized mediation agency. The costs of
                the mediation shall be shared equally between the parties, and
                the mediation shall be conducted in English and at a mutually
                agreed location or, if both parties agree, through a virtual
                platform. <br /> <br /> If mediation does not result in a
                mutually satisfactory resolution, the dispute shall be resolved
                by binding arbitration in accordance with the commercial
                arbitration rules of the American Arbitration Association (AAA)
                or a similar internationally recognized body. The arbitration
                shall be conducted by a single neutral arbitrator, who shall be
                selected in accordance with the rules of the arbitration body.
                The place of arbitration shall be Sacramento, California. The
                language of the arbitration shall be English. <br /> <br />
                The arbitrator shall have exclusive authority to resolve the
                dispute, including determining the applicability and validity of
                these dispute resolution terms. The arbitrator's decision shall
                be final and binding on both parties, and may be entered as a
                judgment in any court of competent jurisdiction. Unless
                prohibited by applicable law, the parties agree to waive any
                right to bring the dispute in court or to participate in a class
                action. <br /> <br /> This dispute resolution clause does not
                preclude AmmoBrowser from seeking injunctive or equitable relief
                in the event of intellectual property rights infringement,
                misuse of the platform, or any act that may cause irreparable
                harm, in which case it may go directly to a court of competent
                jurisdiction without exhausting alternative dispute resolution
                mechanisms. <br /> <br /> By accepting these terms, users
                expressly waive any right to a jury trial and agree that all
                disputes will be resolved in accordance with the procedures set
                forth in this clause, with the objective of minimizing the costs
                and time associated with formal litigation. The parties assume
                their own costs associated with mediation and arbitration,
                unless otherwise agreed or specifically provided by the
                arbitrator.
              </p>
            </div>
            {/* ================= Applicable law and jurisdiction =============== */}
            <div>
              <h4 className="pb-5 text-xl lg:text-3xl capitalize text-primaryWhite font-semibold">
                Applicable law and jurisdiction
              </h4>
              <p className="text-base lg:text-xl text-[var(--gravelFint)] font-normal">
                Your use of our website and services is conditioned upon your
                acceptance of and compliance with all of the terms and
                conditions set forth. This authorization to use our services
                does not extend to jurisdictions where these provisions are not
                respected or applied. <br /> <br /> Our commitment to compliance
                with these terms is strictly governed by applicable laws and
                legal process. Importantly, these terms do not restrict our
                ability to comply with legal or governmental requirements,
                including but not limited to those related to law enforcement
                and the use of our website. Information provided or collected in
                connection with the use of the website will be subject to these
                requirements. <br /> <br /> In the event that any provision of
                these terms and conditions is declared invalid, illegal or
                unenforceable by a court or competent authority, such decision
                shall not affect the validity or enforceability of the remaining
                provisions. Failure or delay in enforcing any of these terms and
                conditions by us at any time shall not constitute a waiver of
                our rights to enforce such provision, or any other provision, in
                the future.
                <br /> <br /> We reserve all rights not expressly granted
                herein, while at all times maintaining the protection of and
                respect for our intellectual property rights and prerogatives.
              </p>
            </div>

            {/* ================== Contact INFORMATION ================== */}
            <div>
              <h4 className="pb-5 text-xl lg:text-3xl text-primaryWhite font-semibold">
                Contact information
              </h4>
              <p className="text-base lg:text-xl text-[var(--gravelFint)] font-normal">
                If you have questions or concerns about these terms, please
                contact us using the contact information below:
              </p>
              <div className="flex flex-col gap-3 lg:gap-5 pt-10">
                <div className="flex items-start gap-2 lg:gap-4">
                  <ListSvg className={"shrink-0 size-6 lg:size-8"} />
                  <p className="font-medium text-base lg:text-xl text-[var(--gravelFint)]">
                    <span className="text-primaryWhite">
                      Sol Legacies LLC - AmmoBrowser.
                    </span>{" "}
                  </p>
                </div>

                <div className="flex items-start gap-2 lg:gap-4">
                  <ListSvg className={"shrink-0 size-6 lg:size-8"} />
                  <p className="font-medium text-base lg:text-xl text-[var(--gravelFint)]">
                    2108 N St, Ste N, Sacramento, Ca 95816
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <ListSvg className={"shrink-0 size-6 lg:size-8"} />
                  <p className="font-medium text-base lg:text-xl text-[var(--gravelFint)]">
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
    </div>
  );
};
