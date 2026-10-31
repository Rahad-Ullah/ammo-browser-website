interface CookieSettingItem {
  action: string;
  description: string;
}

export const cookieSetting: CookieSettingItem[] = [
  {
    action: "Microsoft Edge",
    description:
      "https://support.microsoft.com/en-us/office/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09?ui=en-us&rs=en-us&ad=us",
  },
  {
    action: "Firefox",
    description:
      "https://support.microsoft.com/en-us/office/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09?ui=en-us&rs=en-us&ad=us",
  },
  {
    action: "Chrome",
    description: "https://support.google.com/chrome/answer/95647?hl=en",
  },
  {
    action: "Safari",
    description:
      "https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac",
  },
  {
    action: "Opera",
    description: "https://help.opera.com/en/latest/web-preferences/",
  },
  {
    action: "Android",
    description: "https://support.google.com/answer/32050",
  },
  {
    action: "IOS",
    description: "https://support.apple.com/en-us/HT201265",
  },
];
