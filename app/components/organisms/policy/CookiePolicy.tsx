
import ListSvg from "~/components/atoms/ListSvg";
import { cookieSetting } from "~/utils/data/cookieData";
import cookieBg from "~/assets/cookieBg.png";

export default function CookiePolicy() {
  return (
    <>
      <div>
        <img
          src={cookieBg}
          alt="banner"
          className="w-full h-[285px] md:h-[500px] xl:h-[600px] absolute top-0 left-0 -z-10 object-cover"
        />
        <div className="container">
          <div className="flex items-center justify-center pt-[190px] pb-20 lg:pt-[300px] xl:pt-[390px] lg:pb-36  xl:pb-52 text-3xl lg:text-5xl xl:text-8xl heading-gradient">
            <h1>COOKIE POLICY</h1>
          </div>

          {/* all policy content */}

          <div className="font-Poppins pb-28 max-w-5xl mx-auto flex flex-col gap-10 lg:gap-12">
            {/*================================== TERMS AND CONDITIONS ==============================*/}
            <div>
              <h4 className="pb-5 text-xl lg:text-3xl text-primaryWhite font-semibold">
                Welcome to AmmoBrowser!
              </h4>
              <p className="text-base lg:text-xl text-gravelFint font-normal leading-8">
                AmmoBrowser is a registered trademark and is the exclusive
                property of Sol Legacies LLC.
              </p>

              <div className="pt-5">
                <div className="flex items-center gap-2 lg:gap-4">
                  <ListSvg />{" "}
                  <p className="font-medium text-base lg:text-xl text-gravelFint pt-1">
                    This cookie policy explains how and why cookies and other
                    similar technologies may be stored on and accessed from your
                    device when you use or visit:
                  </p>
                </div>
              </div>
            </div>

            {/*================================= Ammobrowser.com ==============================*/}
            <div>
              <h4 className="pb-5 text-xl lg:text-3xl text-primaryWhite font-semibold">
                Ammobrowser.com
              </h4>
              <p className="text-base lg:text-xl text-gravelFint font-normal">
                In this cookie policy, the words “website” refer to the
                AmmoBrowser website, “we”, “us”, “our”, and “AmmoBrowser” refers
                to AmmoBrowser, and “you” and “user” refers to you, the user and
                visitor of the AmmoBrowser website. <br />
                <br />
                This cookie policy should be read together with our privacy
                policy and our terms and conditions.
                <br />
                <br />
                By using the website, you accept the use of cookies by
                AmmoBrowser, in the terms contained in this policy.
              </p>
            </div>

            {/*============================= GENERAL INFORMATION ============================*/}

            <div>
              <h4 className="pb-5 text-xl lg:text-3xl text-primaryWhite font-semibold">
                GENERAL INFORMATION
              </h4>
              <p className="text-base lg:text-xl text-gravelFint font-normal">
                The information collected through cookies will be under
                responsibility and in charge of:
              </p>
              <div className="flex flex-col gap-3 lg:gap-5 pt-10">
                <div className="flex items-start gap-2 lg:gap-4">
                  <ListSvg className={"shrink-0 size-6 lg:size-8"} />
                  <p className="font-medium text-base lg:text-xl text-gravelFint">
                    <span className="text-primaryWhite">
                      Sol Legacies LLC - AmmoBrowser.
                    </span>{" "}
                  </p>
                </div>

                <div className="flex items-start gap-2 lg:gap-4">
                  <ListSvg className={"shrink-0 size-6 lg:size-8"} />
                  <p className="font-medium text-base lg:text-xl text-gravelFint">
                    2108 N St, Ste N, Sacramento, Ca 95816
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <ListSvg className={"shrink-0 size-6 lg:size-8"} />
                  <p className="font-medium text-base lg:text-xl text-gravelFint">
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

            {/*================================= WHAT ARE COOKIES? ====================*/}
            <div>
              <h4 className="pb-5 text-xl lg:text-3xl text-primaryWhite font-semibold">
                WHAT ARE COOKIES?
              </h4>
              <p className="text-base lg:text-xl text-gravelFint font-normal">
                Cookies are small text files placed on your computer or mobile
                device when you visit a website. These files enable the website
                to recognize your device and recall whether you have visited the
                site before. Cookies are a common technology on the web and have
                been used by most websites for many years. They play a crucial
                role in making websites function more effectively. Cookies help
                track which sections of the website users interact with and
                allow for a personalized browsing experience. Additionally,
                cookies provide valuable data that helps us monitor and enhance
                the website’s performance.
              </p>
            </div>

            {/*================================= CONSENT ==============================*/}
            <div>
              <h4 className="pb-5 text-xl lg:text-3xl text-primaryWhite font-semibold">
                CONSENT
              </h4>
              <p className="text-base lg:text-xl text-gravelFint font-normal">
                Along with this document, when you visit our website for the
                first time, you will be shown a notice or banner on the home
                page of the website, informing you about the use of cookies by
                our website, where you can accept or reject the use of cookies
                by the website. By clicking ‘Accept’ in this notice, you are
                giving your explicit consent to our use of cookies on your
                device. These cookies are used to enhance your browsing
                experience, personalize content, analyze site traffic and enable
                specific functionality related to our online operations. <br />
                <br />
                Your consent allows us to provide you with a more personalized
                and efficient user experience. If you decide to withdraw your
                consent at any time, you can do so by adjusting your browser's
                cookie settings. However, please note that refusing to use
                cookies or disabling certain cookies may reduce the
                functionality of the site and negatively impact your overall
                experience.
              </p>
            </div>

            {/*================================= LEGAL BASIS AND LEGITIMATE INTERESTS ==============================*/}
            <div>
              <h4 className="pb-5 text-xl lg:text-3xl text-primaryWhite font-semibold">
                LEGAL BASIS AND LEGITIMATE INTERESTS
              </h4>
              <p className="text-base lg:text-xl text-gravelFint font-normal">
                On our website, we use cookies based on our legitimate interests
                to provide the best possible user experience and to continuously
                enhance our site. These interests include optimizing our online
                services, personalizing content and advertising, and ensuring
                the security and efficiency of our website. <br />
                <br />
                Cookies enable us to gain insights into how users interact with
                our website, allowing us to tailor and improve our services and
                functionalities to better meet their needs and preferences.
                <br />
                <br />
                Although we believe that our legitimate interests in using
                cookies do not outweigh your fundamental rights and freedoms,
                you still have the choice to refuse or manage the use of cookies
                through your browser settings or by using the tools available on
                our website.
              </p>
            </div>

            {/*================================= WITHDRAWAL AND OBJECTION (OPT-OUT) ==============================*/}
            <div>
              <h4 className="pb-5 text-xl lg:text-3xl text-primaryWhite font-semibold">
                WITHDRAWAL AND OBJECTION (OPT-OUT)
              </h4>
              <p className="text-base lg:text-xl text-gravelFint font-normal">
                By accessing our website, you agree to the use of cookies that
                enhance the browsing experience and allow the personalization of
                content and advertisements. However, we understand and respect
                your right to privacy. If you wish to opt-out or exercise your
                choice to not participate (Opt-Out), you can set your browser to
                refuse all cookies or to indicate when a cookie is being sent.
                <br />
                <br />
                Please note that some features of the site may not function
                properly without the use of cookies. In addition, we provide
                links or tools on our site that allow you to specifically
                decline the use of certain cookies.
              </p>
            </div>

            {/*================================= STORAGE DURATION OF COOKIES ==============================*/}
            <div>
              <h4 className="pb-5 text-xl lg:text-3xl text-primaryWhite font-semibold">
                STORAGE DURATION OF COOKIES
              </h4>
              <p className="text-base lg:text-xl text-gravelFint font-normal">
                The cookies used on our website have different retention periods
                depending on their purpose. Necessary cookies, which are
                essential for the basic operation of the site, are stored only
                for the time necessary to provide the services requested, such
                as secure access to restricted areas or user authentication.
                These cookies cannot be disabled, as without them the website
                would not function properly. <br /> <br /> Functionality
                cookies, which allow us to remember your preferences, such as
                language or personalized site settings, may have a variable
                duration. Some of these cookies may be session cookies, meaning
                that they are deleted when you close your browser, while others
                may be stored for longer periods, up to several years, to
                provide a smooth and consistent user experience on repeat
                visits. <br /> <br /> Analytical cookies allow us to track
                activity on the website to improve its performance and the user
                experience. These cookies are kept for a maximum of 24 months
                before being automatically deleted. You can manage or delete
                these cookies at any time through your browser settings.
                However, by disabling or deleting these cookies, some
                functionality of the site may be limited, which could affect
                your browsing experience. <br /> <br /> In addition, there are
                cookies that can be classified in the ‘other’ category, which
                include those that do not fit directly into the above categories
                but are used for other specific purposes, such as improving
                security or analyzing the more detailed use of the website.
                These cookies have different durations and, like analytics
                cookies, can be managed or deleted at the user's discretion
                through browser settings. Please note that deleting or rejecting
                cookies may adversely affect the functionality of the site and
                may limit some features, impacting the overall experience when
                interacting with our website.
              </p>
            </div>

            {/*================================= COOKIE SETTINGS ==============================*/}
            <div>
              <h4 className="pb-5 text-xl lg:text-3xl text-primaryWhite font-semibold">
                COOKIE SETTINGS
              </h4>
              <p className="text-base lg:text-xl text-gravelFint font-normal">
                If you do not want cookies to be dropped on your device, you can
                adjust the setting of your Internet browser to reject the
                setting of all or some cookies and to alert you when a cookie is
                placed on your device. For further information about how to do
                so, please refer to your browser ‘help’, ‘tool’, or ‘edit’
                section. Please note that if you use your browser settings to
                block all cookies, including strictly necessary cookies, you may
                not be able to access or use all or parts of the functionalities
                of AmmoBrowser. <br /> <br /> If you want to remove
                previously-stored cookies, you can manually delete the cookies
                at any time. However, this will not prevent AmmoBrowser from
                placing further cookies on your device unless and until you
                adjust your Internet browser setting as described above. <br />{" "}
                <br /> We provide the links for the management and blocking of
                cookies depending on the browser you use:
              </p>
              <div className="flex flex-col gap-3 lg:gap-5 pt-10">
                {cookieSetting?.map((item, index) => (
                  <div key={index} className="flex items-start gap-2 lg:gap-4">
                    <ListSvg className={"shrink-0 size-6 lg:size-8"} />
                    <p className="font-medium text-base lg:text-xl text-orange">
                      <span className="text-primaryWhite">{item.action}</span>{" "}
                      <a
                        href={item.description}
                        target="_blank"
                        className="break-all"
                      >
                        {item.description}
                      </a>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/*====================== FIRST-PARTY COOKIES ====================== */}
            <div>
              <h4 className="pb-5 text-xl lg:text-3xl text-primaryWhite font-semibold">
                FIRST-PARTY COOKIES
              </h4>
              <p className="text-base lg:text-xl text-gravelFint font-normal">
                We use cookies to enhance the performance of our website and
                personalize your online experience. Cookies help us to collect
                information on how people use our website and which pages they
                visit. They enable us to monitor the number of visitors and to
                analyze website usage patterns and trends. We collect this
                information anonymously, so it does not identify anyone as an
                individual and no personal information is stored in our cookies.
                We always use cookie data in a responsible way.
              </p>
            </div>

            {/* =================== THIRD-PARTY COOKIES  =============== */}
            <div>
              <h4 className="pb-5 text-xl lg:text-3xl text-primaryWhite font-semibold">
                THIRD-PARTY COOKIES
              </h4>
              <p className="text-base lg:text-xl text-gravelFint font-normal">
                Third-party cookies may come from partners or third-party
                companies that provide functional web services or tools for our
                website and the optimal functioning and operation of our
                services. We use third party cookies responsibly and for the
                sole purpose of providing optimal functioning of the platform
                and services. You may opt out of these cookies by following the
                cookie removal information contained in this document or the
                technical information of the browser from which you access our
                website and services.
              </p>
            </div>
            {/* ==================== PURPOSES OF OUR COOKIES ======================  */}
            <div>
              <h4 className="pb-5 text-xl lg:text-3xl text-primaryWhite font-semibold">
                PURPOSES OF OUR COOKIES
              </h4>
              <p className="text-base lg:text-xl text-gravelFint font-normal">
                Our cookies are used for the following purposes:
              </p>

              <div className="flex flex-col gap-3 lg:gap-5 pt-10">
                <div className="flex items-start gap-2 lg:gap-4">
                  <ListSvg className={"shrink-0 size-6 lg:size-8"} />
                  <p className="font-medium text-base lg:text-xl text-gravelFint">
                    <span className="text-primaryWhite">Necessary: </span>{" "}
                    Necessary cookies are essential files that enable basic
                    functions on the website, such as navigation and security.
                    They do not collect personal information.
                  </p>
                </div>
                <div className="flex items-start gap-2 lg:gap-4">
                  <ListSvg className={"shrink-0 size-6 lg:size-8"} />
                  <p className="font-medium text-base lg:text-xl text-gravelFint">
                    <span className="text-primaryWhite">Functional: </span> We
                    use functional cookies to enhance your online experience by
                    remembering user preferences and settings and maintaining
                    consistency across the website, without tracking activities.
                  </p>
                </div>
                <div className="flex items-start gap-2 lg:gap-4">
                  <ListSvg className={"shrink-0 size-6 lg:size-8"} />
                  <p className="font-medium text-base lg:text-xl text-gravelFint">
                    <span className="text-primaryWhite">Analytics: </span> These
                    cookies help us understand how visitors use our website, by
                    collecting information showing which are the most visited
                    pages and other data regarding an analytical flow. We use
                    this information to create a better experience for all users
                    in our website.
                  </p>
                </div>
                <div className="flex items-start gap-2 lg:gap-4">
                  <ListSvg className={"shrink-0 size-6 lg:size-8"} />
                  <p className="font-medium text-base lg:text-xl text-gravelFint">
                    <span className="text-primaryWhite">Other: </span> Cookies
                    in the ‘other’ category include those that do not
                    specifically fit into the necessary, functional or
                    analytical categories. These cookies can fulfil various
                    functions, such as improving the security of the site or
                    providing advanced analysis of the use of the website.
                  </p>
                </div>
              </div>
            </div>

            {/* ================== Contact INFORMATION ================== */}
            <div>
              <h4 className="pb-5 text-xl lg:text-3xl text-primaryWhite font-semibold">
                Contact information
              </h4>
              <p className="text-base lg:text-xl text-gravelFint font-normal">
                If you have questions or concerns about these terms, please
                contact us using the contact information below:
              </p>
              <div className="flex flex-col gap-3 lg:gap-5 pt-10">
                <div className="flex items-start gap-2 lg:gap-4">
                  <ListSvg className={"shrink-0 size-6 lg:size-8"} />
                  <p className="font-medium text-base lg:text-xl text-gravelFint">
                    <span className="text-primaryWhite">
                      Sol Legacies LLC - AmmoBrowser.
                    </span>{" "}
                  </p>
                </div>

                <div className="flex items-start gap-2 lg:gap-4">
                  <ListSvg className={"shrink-0 size-6 lg:size-8"} />
                  <p className="font-medium text-base lg:text-xl text-gravelFint">
                    2108 N St, Ste N, Sacramento, Ca 95816
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <ListSvg className={"shrink-0 size-6 lg:size-8"} />
                  <p className="font-medium text-base lg:text-xl text-gravelFint">
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
    </>
  );
};


