interface ConsentDataItem {
  action: string;
  description: string;
}

interface DataCollectedItem {
  type: string;
  details: string;
}

interface InfoCollectionItem {
  category: string;
  description: string;
  dataCollected: DataCollectedItem[];
}

interface PurposeItem {
  purpose: string;
  details: string;
}

interface LegitimateDataItem {
  category: string;
  description: string;
  purposes: PurposeItem[];
}

interface ProtectionInfoItem {
  title: string;
  description: string;
}

interface ShareInfoDataItem {
  category: string;
  details: string;
}

export const consentData: ConsentDataItem[] = [
  {
    action: "Visiting the website",
    description:
      "By accessing and browsing AmmoBrowser, users automatically consent to the collection of certain data through cookies, tracking technologies, and server logs, in accordance with our information collection practices.",
  },
  {
    action: "Subscribing to our newsletter",
    description:
      "By providing an email address and confirming a subscription, users explicitly consent to receiving marketing communications, promotions, and updates. This consent can be withdrawn at any time using the unsubscribe options provided in each communication.",
  },
  {
    action: "Communicating with us",
    description:
      "By contacting us via email, contact forms, or other provided means, users acknowledge that we may collect and use their information to respond to inquiries and improve our services.",
  },
  {
    action: "CCPA compliance",
    description:
      "AmmoBrowser complies with the California Consumer Privacy Act (CCPA), which grants California residents the right to know what personal data is collected, how it is used, and with whom it is shared. Users also have the right to withdraw consent at any time, requesting the deletion or restriction of their data as outlined in our privacy policy.",
  },
  {
    action: "Non-agreement with data practices",
    description:
      "If users do not agree with our data collection and processing practices, we recommend that they refrain from using our website and services.",
  },
];

export const infoCollectionData: InfoCollectionItem[] = [
  {
    category: "Personal Data Provided by the User",
    description:
      "The user may voluntarily provide certain personal data when interacting with AmmoBrowser, including, but not limited to:",
    dataCollected: [
      {
        type: "Contact details",
        details:
          "Name, email address, and any other information provided when subscribing to our newsletter or when communicating with us.",
      },
      {
        type: "Communication information",
        details:
          "Data included in queries sent through our contact form or through other communication channels available on the website.",
      },
    ],
  },
  {
    category: "Automatically Collected Data",
    description:
      "When the user accesses and browses the website, certain data may be collected automatically using technologies such as cookies and server logs.",
    dataCollected: [
      {
        type: "Device and connection information",
        details:
          "IP address, browser type, Internet service provider (ISP), operating system, and language settings.",
      },
      {
        type: "Website usage data",
        details:
          "Pages visited, time spent, links clicked, and other site interaction metrics.",
      },
      {
        type: "Online identifiers",
        details:
          "Cookies, pixel tags, and similar technologies that allow the user to be recognized on future visits.",
      },
    ],
  },
  {
    category: "Analytical Data",
    description:
      "AmmoBrowser uses analytics tools to better understand how users interact with the platform and improve its functionality.",
    dataCollected: [
      {
        type: "Browsing patterns",
        details:
          "Information on the most visited sections, average time on the site, and user behavior on the platform.",
      },
      {
        type: "Website performance",
        details:
          "Data related to loading speed, technical errors, and optimization of the user experience.",
      },
      {
        type: "Communication information",
        details:
          "Cookies, pixel tags, and similar technologies that allow the user to be recognized on future visits.",
      },
    ],
  },
  {
    category: "Data Collected through Communications",
    description:
      "When a user communicates with AmmoBrowser through the available means of contact, we may collect and store the information provided for the purpose of responding to queries and improving our services.",
    dataCollected: [
      {
        type: "Content of the message",
        details:
          "Information contained in emails, contact forms, and other communications sent by the user.",
      },
      {
        type: "Additional data provided",
        details:
          "Any additional information voluntarily shared by the user in the context of an enquiry or interaction with our team.",
      },
      {
        type: "Communication information",
        details:
          "Cookies, pixel tags, and similar technologies that allow the user to be recognized on future visits.",
      },
    ],
  },
];

export const legitimateData: LegitimateDataItem[] = [
  {
    category: "Personal Data Provided by the User",
    description:
      "Personal information provided voluntarily is collected for the following purposes:",
    purposes: [
      {
        purpose: "Subscription to the newsletter",
        details:
          "To send updates, promotions, and communications related to AmmoBrowser services.",
      },
      {
        purpose: "Responding to queries and user support",
        details:
          "To manage requests for information, answer questions, and provide assistance related to the use of the platform.",
      },
      {
        purpose: "Communication with users",
        details:
          "To send administrative messages, alerts about changes to the privacy policy or terms of use, and relevant notifications about the services.",
      },
    ],
  },
  {
    category: "Automatically Collected Data",
    description:
      "Data collected through technologies such as cookies and server logs are used for the following purposes:",
    purposes: [
      {
        purpose: "Improving the functionality of the website",
        details:
          "To ensure the proper functioning of the platform, optimize browsing, and solve technical problems.",
      },
      {
        purpose: "Customizing the user experience",
        details:
          "To remember preferences and settings and improve interaction with the platform.",
      },
      {
        purpose:
          "Detection and prevention of fraudulent or malicious activities",
        details:
          "To protect the security of the website and prevent misuse of the platform.",
      },
    ],
  },
  {
    category: "Analytical Data",
    description:
      "The data collected through analysis tools is used for the following purposes:",
    purposes: [
      {
        purpose: "Evaluation of website performance",
        details:
          "To measure traffic, identify usage patterns, and evaluate the effectiveness of the platform.",
      },
      {
        purpose: "Optimization of user experience",
        details:
          "To analyze user interaction with the site and improve accessibility and usability.",
      },
      {
        purpose: "Development and improvement of services",
        details:
          "To better understand the preferences and needs of users, enabling continuous improvements to the platform.",
      },
    ],
  },
  {
    category: "Data Collected through Communications",
    description:
      "The data provided in queries and messages sent through our contact channels is used to:",
    purposes: [
      {
        purpose: "Respond to queries and requests for information",
        details:
          "To offer support, resolve concerns, and attend to any needs raised by users.",
      },
    ],
  },
];

export const protectionInfo: ProtectionInfoItem[] = [
  {
    title: "Access and Portability",
    description:
      "To access and know what information is stored on our servers, you can send us your request through our contact information.",
  },
  {
    title: "Rectification, Restriction, Limitation, and Deletion",
    description:
      "You may also rectify, restrict, limit, or delete much of your information.",
  },
  {
    title: "Right to be Informed",
    description:
      "Users of our website will be informed, upon request, about what data we collect, how it is used, how long it is kept, and whether it is shared with third parties.",
  },
  {
    title: "Object",
    description:
      "Where we process your data based on our legitimate interests, as explained above, or in the public interest, you may object to this processing in certain circumstances. In such cases, we will stop processing your information unless we have legitimate grounds to continue processing it or where necessary for legal reasons.",
  },
  {
    title: "Withdraw Consent",
    description:
      "Where you have previously given your consent, for example to allow us to process and store your personal information, you have the right to withdraw your consent to the processing and storage of your information at any time. For example, you can withdraw your consent by updating your settings. In certain cases, we may continue to process your information after you have withdrawn your consent if we have a lawful basis for doing so or if your withdrawal of consent was limited to certain processing activities.",
  },
  {
    title: "Complaint",
    description:
      "If you wish to lodge a complaint about our use of your information (and without prejudice to any other rights you may have), you have the right to do so with your local supervisory authority. Users may exercise all of these rights by contacting us via the contact information or contact page.",
  },
  {
    title: "Rights Related to Automated Decision-Making, Including Profiling",
    description:
      "Users may request that we provide them with a copy of the automated processing activities we conduct if they believe that data is being unlawfully processed.",
  },
  {
    title: "Exercising Your Rights",
    description:
      "Users or holders of personal data provided through the website may exercise these rights over their personal data at any time and without limitation by sending their request through our contact information. The request to exercise your rights will be attended and answered within a reasonable period of time.",
  },
];

export const shareInfoData: ShareInfoDataItem[] = [
  {
    category: "Third-Party Service Providers",
    details:
      "We use third-party services to perform certain functions on our website. Some of these functions and services include website hosting, email delivery, and data analysis. These third-party services and tools may have access to personal information needed to perform their functions, but may not use that information for other purposes. Information shared with these third-party services will be treated and stored in accordance with their respective privacy policies and our privacy policy.",
  },
  {
    category: "Communications and Third Party Providers",
    details:
      "By providing your email address through our contact information, you consent to the use of your contact information to send you electronic communications, which may include offers about AmmoBrowser and special content related to our website. AmmoBrowser may send you emails with promotions, updates, and other relevant information. You will have the option to stop receiving these communications at any time by using the 'unsubscribe' feature included in each email or by sending us a request through our contact info.",
  },
  {
    category: "Business Transfers",
    details:
      "In the event AmmoBrowser creates, merges with, or is acquired by another entity, your information will likely be transferred. AmmoBrowser will send you an email or post a prominent notice on our website before your information becomes subject to another privacy policy.",
  },
  {
    category: "Protection of AmmoBrowser and Others",
    details:
      "We release personal information when we believe release is appropriate to comply with the law, enforce or apply our terms and conditions and other agreements, or protect the rights, property, or safety of AmmoBrowser, our users, or others. This includes exchanging information with other companies and organizations for fraud protection and credit risk reduction.",
  },
];
