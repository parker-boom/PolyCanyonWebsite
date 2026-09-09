// Shared by the interactive policy and the generated HTML page.
export const policyDate = 'September 8, 2026';
export const policyIntroduction =
  'This policy covers the Poly Canyon mobile app and polycanyon.com, maintained by Parker Jones. We do not collect your location or activity data, require an account, or use advertising or analytics trackers.';
export const policySections = [
  {
    title: 'Location and data on your device',
    paragraphs: [
      [
        'With your permission, the app uses your location to show where you are and mark nearby structures as visited while you use the app. The app does not track location in the background. Location is processed on your device and is not sent to us. Preferences and visit progress are stored locally, not uploaded to our servers.',
      ],
      [
        'You can turn off location access in your device settings and still browse the structures. You can reset visit progress in the app or remove its local data by deleting the app.',
      ],
    ],
  },
  {
    title: 'Hosting and external services',
    paragraphs: [
      [
        'Our website host, ',
        { text: 'Netlify', href: 'https://www.netlify.com/privacy/' },
        ', processes technical request data, such as IP addresses, to deliver and protect the website. These operational logs are separate from the app’s locally stored data.',
      ],
      [
        'Map links open Google Maps. When you follow one, Google may process connection information and cookies under its ',
        { text: 'privacy policy', href: 'https://policies.google.com/privacy' },
        '. App stores and other external links are also governed by the respective service’s privacy policy.',
      ],
    ],
  },
  {
    title: 'Contact and deletion requests',
    paragraphs: [
      [
        'If you contact us, we receive your email address and the information you choose to send. We use it to respond and keep it only as long as needed to handle your request or meet legal obligations. We do not sell personal information or use your messages for marketing.',
      ],
      [
        'For privacy questions or to request deletion of correspondence, ',
        { text: 'contact us', contact: true },
        '.',
      ],
    ],
  },
  {
    title: 'Changes to this policy',
    paragraphs: [
      ['Any changes will be posted on this page with an updated date.'],
    ],
  },
];
