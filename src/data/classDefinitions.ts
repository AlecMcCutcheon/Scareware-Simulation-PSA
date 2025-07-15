import { ClassDefinition } from '../types/ClassFramework';

export const classDefinitions: ClassDefinition[] = [
  {
    id: 'fake-branding',
    name: 'Fake Branding',
    description: 'Scareware uses fake branding to appear legitimate and trustworthy.',
    icon: '🏢',
    color: '#ef4444',
    notes: [
      {
        id: 'fake-branding-basics',
        title: 'What is Fake Branding?',
        description: 'Scareware creators copy legitimate security software branding, logos, colors, and design elements to trick users into believing their software is legitimate.',
        category: 'Deception',
        severity: 'danger',
        examples: [
          'Copying Norton, McAfee, or Malwarebytes logos and colors',
          'Using similar font styles and layouts',
          'Creating fake company names that sound legitimate',
          'Using official-looking seals and certifications'
        ],
        tips: [
          'Always verify software from official websites',
          'Check the URL in your browser address bar',
          'Look for spelling errors or slight variations in branding',
          'Be suspicious of unsolicited security warnings'
        ],
        externalLinks: [
          {
            label: 'FTC Guide to Spotting Fake Security Software',
            url: 'https://www.consumer.ftc.gov/articles/0009-computer-security'
          }
        ]
      }
    ]
  },
  {
    id: 'urgency-pressure',
    name: 'Urgency & Pressure',
    description: 'Scareware creates false urgency to pressure users into immediate action.',
    icon: '⏰',
    color: '#f59e0b',
    notes: [
      {
        id: 'urgency-tactics',
        title: 'Urgency Tactics',
        description: 'Scareware uses countdown timers, flashing warnings, and threatening language to create panic and pressure users into making hasty decisions.',
        category: 'Psychological Manipulation',
        severity: 'warning',
        examples: [
          'Countdown timers showing "system will be destroyed in X minutes"',
          'Flashing red warnings and alerts',
          'Threatening language about data loss or identity theft',
          'Limited-time "discounts" on fake security software'
        ],
        tips: [
          'Take a moment to pause and think before acting',
          'Legitimate security software doesn\'t pressure you with countdowns',
          'Close the browser window if you feel pressured',
          'Contact a trusted IT professional if concerned'
        ]
      }
    ]
  },
  {
    id: 'fake-scan-results',
    name: 'Fake Scan Results',
    description: 'Scareware displays fake virus scan results to create fear and urgency.',
    icon: '🔍',
    color: '#dc2626',
    notes: [
      {
        id: 'fake-scan-basics',
        title: 'Fake Scan Detection',
        description: 'Scareware runs fake scans that always find "threats" regardless of your system\'s actual security status. These results are completely fabricated.',
        category: 'Technical Deception',
        severity: 'danger',
        examples: [
          'Scans that find threats on every system',
          'Generic threat names like "Trojan.Generic" or "Malware.Generic"',
          'Impossible threat counts (thousands of threats)',
          'Threats that appear instantly without real scanning'
        ],
        tips: [
          'Legitimate scans take time and show real file paths',
          'Real threats have specific names and locations',
          'Use trusted antivirus software from official sources',
          'Don\'t trust scans from popup windows'
        ]
      }
    ]
  },
  {
    id: 'browser-hijacking',
    name: 'Browser Hijacking',
    description: 'Scareware can hijack your browser to prevent you from closing or navigating away.',
    icon: '🌐',
    color: '#7c3aed',
    notes: [
      {
        id: 'browser-hijacking-basics',
        title: 'Browser Hijacking Tactics',
        description: 'Scareware uses JavaScript and browser APIs to prevent normal browser navigation, making it difficult to close tabs or navigate away from the scam.',
        category: 'Technical Manipulation',
        severity: 'danger',
        examples: [
          'Preventing browser back/forward buttons',
          'Disabling right-click context menus',
          'Creating endless popup windows',
          'Fullscreen mode that\'s hard to exit'
        ],
        tips: [
          'Use Ctrl+W to close tabs',
          'Use Alt+F4 to close browser windows',
          'Use Task Manager to force-close browser if needed',
          'Disable JavaScript temporarily if necessary'
        ]
      }
    ]
  },
  {
    id: 'fake-payment',
    name: 'Fake Payment Forms',
    description: 'Scareware presents fake payment forms to steal credit card information.',
    icon: '💳',
    color: '#059669',
    notes: [
      {
        id: 'fake-payment-basics',
        title: 'Payment Form Red Flags',
        description: 'Scareware payment forms often have poor security, ask for unnecessary information, or redirect to suspicious payment processors.',
        category: 'Financial Fraud',
        severity: 'danger',
        examples: [
          'Asking for credit card info to "remove threats"',
          'Poor SSL security or missing security indicators',
          'Unusual payment processors or currencies',
          'Requests for additional personal information'
        ],
        tips: [
          'Never enter payment info on security warning pages',
          'Check for HTTPS and security certificates',
          'Use virtual credit cards for online purchases',
          'Contact your bank if you suspect fraud'
        ]
      }
    ]
  },
  {
    id: 'social-proof',
    name: 'Fake Social Proof',
    description: 'Scareware uses fake testimonials, reviews, and user counts to appear legitimate.',
    icon: '👥',
    color: '#0891b2',
    notes: [
      {
        id: 'social-proof-basics',
        title: 'Fake Social Proof Tactics',
        description: 'Scareware displays fake user testimonials, download counts, and reviews to create a false sense of legitimacy and popularity.',
        category: 'Social Manipulation',
        severity: 'warning',
        examples: [
          'Fake user testimonials with stock photos',
          'Impossible download counts (millions in minutes)',
          'Generic positive reviews without specifics',
          'Fake security certifications and awards'
        ],
        tips: [
          'Look for specific, detailed reviews',
          'Check if user photos are stock images',
          'Verify certifications with official sources',
          'Be skeptical of overly positive reviews'
        ]
      }
    ]
  },
  {
    id: 'fake-browser-bar',
    name: 'Fake Browser Bar',
    description: 'Scareware creates fake browser address bars to make malicious sites appear legitimate.',
    icon: '🌐',
    color: '#dc2626',
    notes: [
      {
        id: 'fake-browser-bar-basics',
        title: 'Fake Browser Bar Tactics',
        description: 'Scareware creates fake browser address bars that look like real browser UI to trick users into thinking they\'re on a legitimate website.',
        category: 'Technical Deception',
        severity: 'danger',
        examples: [
          'Fake address bars that look like Chrome, Firefox, or Safari',
          'Fake security indicators and SSL certificates',
          'Fake navigation buttons (back, forward, refresh)',
          'Fake favicons and site icons'
        ],
        tips: [
          'Check if you can actually navigate using the browser controls',
          'Look for inconsistencies in the browser UI design',
          'Try to access browser settings or bookmarks',
          'Check if the address bar responds to keyboard shortcuts'
        ],
        externalLinks: [
          {
            label: 'How to Spot Fake Browser Bars',
            url: 'https://www.consumer.ftc.gov/articles/0009-computer-security'
          }
        ]
      }
    ]
  },
  {
    id: 'fake-url',
    name: 'Fake URL',
    description: 'Scareware displays fake URLs to deceive users into thinking they\'re on a legitimate website.',
    icon: '🔗',
    color: '#7c3aed',
    notes: [
      {
        id: 'fake-url-basics',
        title: 'Fake URL Deception',
        description: 'Scareware shows fake URLs in browser bars that look like legitimate websites but don\'t actually go anywhere. They\'re designed to create false legitimacy.',
        category: 'Visual Deception',
        severity: 'danger',
        examples: [
          'Showing "https://norton.com" when not actually on Norton\'s site',
          'Displaying "https://microsoft.com" in fake browser bars',
          'Fake URLs that appear to be from trusted security companies',
          'URLs that look legitimate but are just text/images'
        ],
        tips: [
          'Try clicking on the URL - fake URLs often don\'t respond',
          'Check if you can actually navigate to the URL',
          'Real browser address bars are interactive and functional',
          'Look for inconsistencies in the URL display',
          'Try typing a different URL to see if it responds'
        ],
        externalLinks: [
          {
            label: 'FTC Guide to Spotting Fake URLs',
            url: 'https://www.consumer.ftc.gov/articles/0009-computer-security'
          }
        ]
      }
    ]
  },
  {
    id: 'fake-security-indicator',
    name: 'Fake Security Indicator',
    description: 'Scareware displays fake security indicators to make sites appear legitimate and secure.',
    icon: '🔒',
    color: '#dc2626',
    notes: [
      {
        id: 'fake-security-indicator-basics',
        title: 'Fake Security Indicators',
        description: 'Scareware shows fake security locks, SSL indicators, and trust badges to make users believe they\'re on a legitimate, secure website.',
        category: 'Visual Deception',
        severity: 'danger',
        examples: [
          'Fake security lock icons in browser address bars',
          'Fake SSL certificate indicators',
          'Fake "Secure" badges and trust seals',
          'Fake security company logos and certifications'
        ],
        tips: [
          'Real security indicators are part of your browser, not website content',
          'Check if the lock icon is actually in your browser\'s address bar',
          'Real SSL indicators can\'t be copied or faked by websites',
          'Look for inconsistencies in security indicator placement',
          'Try clicking on security badges - real ones don\'t respond to clicks'
        ],
        externalLinks: [
          {
            label: 'Understanding Browser Security Warnings',
            url: 'https://support.google.com/chrome/answer/99020'
          }
        ]
      }
    ]
  },
  {
    id: 'verification-trap',
    name: 'Verification Trap',
    description: 'Scareware demands verification to steal personal information and create false legitimacy.',
    icon: '✅',
    color: '#0891b2',
    notes: [
      {
        id: 'verification-trap-basics',
        title: 'Verification Trap Tactics',
        description: 'Scareware demands account verification, identity confirmation, or security checks to collect personal information and create a false sense of urgency.',
        category: 'Information Theft',
        severity: 'danger',
        examples: [
          'Demanding email and password verification',
          'Requesting phone number for "security codes"',
          'Asking for personal information to "verify identity"',
          'Creating fake verification processes that steal data'
        ],
        tips: [
          'Never enter credentials on security warning pages',
          'Legitimate companies don\'t ask for verification via popups',
          'Check the actual website URL before entering information',
          'Contact the company directly through official channels'
        ]
      },
      {
        id: 'email-verification-trap',
        title: 'Email Verification Red Flags',
        description: 'Scareware asks for email addresses to send fake verification codes or to establish contact for further scams.',
        category: 'Information Theft',
        severity: 'danger',
        examples: [
          'Email fields on security warning pages',
          'Requests for "verification email" on popup windows',
          'Email fields that appear after fake virus scans',
          'Demands for email to "activate security software"'
        ],
        tips: [
          'Never enter your email on security warning popups',
          'Legitimate security software doesn\'t require email verification',
          'Your email will be used for spam and further scams',
          'Close the popup and run a real antivirus scan instead'
        ]
      },
      {
        id: 'password-verification-trap',
        title: 'Password Verification Dangers',
        description: 'Scareware requests passwords to steal account credentials and gain access to your accounts.',
        category: 'Information Theft',
        severity: 'danger',
        examples: [
          'Password fields on security warning pages',
          'Requests for "account verification" passwords',
          'Password fields that appear after fake scans',
          'Demands for passwords to "remove threats"'
        ],
        tips: [
          'Never enter passwords on security warning pages',
          'Legitimate companies never ask for passwords via popups',
          'Your password will be stolen and used maliciously',
          'Change your password immediately if you entered it',
          'Enable two-factor authentication on your accounts'
        ]
      },
      {
        id: 'phone-verification-trap',
        title: 'Phone Number Verification Scams',
        description: 'Scareware requests phone numbers to send fake verification codes or to establish contact for phone scams.',
        category: 'Information Theft',
        severity: 'danger',
        examples: [
          'Phone number fields on security warning pages',
          'Requests for "SMS verification codes"',
          'Phone fields that appear after fake virus scans',
          'Demands for phone numbers to "activate protection"'
        ],
        tips: [
          'Never enter your phone number on security warning pages',
          'Your number will be used for spam calls and SMS scams',
          'Legitimate security software doesn\'t require phone verification',
          'Block unknown numbers if you already entered your phone',
          'Report spam calls to your phone carrier'
        ]
      },
      {
        id: 'credit-card-verification-trap',
        title: 'Credit Card Verification Fraud',
        description: 'Scareware requests credit card information under the guise of verification or payment for fake security software.',
        category: 'Financial Fraud',
        severity: 'danger',
        examples: [
          'Credit card fields on security warning pages',
          'Requests for "verification charges" or "test payments"',
          'Card fields that appear after fake virus scans',
          'Demands for card info to "activate protection"'
        ],
        tips: [
          'Never enter credit card info on security warning pages',
          'Your card will be charged for fake services',
          'Contact your bank immediately if you entered card details',
          'Cancel the card and request a new one',
          'Monitor your account for unauthorized charges'
        ]
      },
      {
        id: 'personal-info-verification-trap',
        title: 'Personal Information Theft',
        description: 'Scareware requests personal information like names, addresses, and birth dates to steal identities.',
        category: 'Information Theft',
        severity: 'danger',
        examples: [
          'Name and address fields on security warning pages',
          'Requests for "identity verification" information',
          'Personal info fields that appear after fake scans',
          'Demands for personal details to "verify account"'
        ],
        tips: [
          'Never enter personal information on security warning pages',
          'Your information will be used for identity theft',
          'Legitimate companies don\'t ask for personal info via popups',
          'Monitor your credit reports for suspicious activity',
          'Consider freezing your credit if you entered personal info'
        ]
      }
    ]
  },
  {
    id: 'fake-payment-button',
    name: 'Fake Payment Button',
    description: 'Scareware uses fake payment buttons to steal financial information.',
    icon: '💳',
    color: '#dc2626',
    notes: [
      {
        id: 'fake-payment-button-basics',
        title: 'Fake Payment Button Tactics',
        description: 'Scareware creates fake payment buttons that look legitimate but are designed to steal credit card information or trick users into making payments.',
        category: 'Financial Fraud',
        severity: 'danger',
        examples: [
          'Buttons that say "Pay Now" or "Renew Subscription"',
          'Fake payment forms that steal card details',
          'Buttons that redirect to fake payment processors',
          'Urgent payment demands with flashing buttons'
        ],
        tips: [
          'Never click payment buttons on security warning pages',
          'Check if the payment form is secure (HTTPS)',
          'Verify the company through official channels',
          'Be suspicious of urgent payment demands'
        ]
      }
    ]
  },
  {
    id: 'urgency-payment-combo',
    name: 'Urgency + Payment Combo',
    description: 'Scareware combines urgency tactics with payment demands for maximum pressure.',
    icon: '⏰💳',
    color: '#f59e0b',
    notes: [
      {
        id: 'urgency-payment-combo-basics',
        title: 'Urgency + Payment Combination',
        description: 'Scareware combines countdown timers, urgent warnings, and payment demands to create maximum pressure for users to act quickly without thinking.',
        category: 'Psychological Manipulation',
        severity: 'danger',
        examples: [
          'Countdown timers with payment buttons',
          'Flashing "Pay Now" buttons with urgent warnings',
          'Limited-time offers that pressure immediate payment',
          'Urgent system warnings that demand payment to "fix"'
        ],
        tips: [
          'This is a classic scareware technique - don\'t fall for it',
          'Take time to think before making any payments',
          'Legitimate companies don\'t pressure you with countdowns',
          'Close the browser and contact official support if concerned'
        ]
      }
    ]
  },
  {
    id: 'fake-system-warning',
    name: 'Fake System Warning',
    description: 'Scareware displays fake system warnings to create fear and urgency.',
    icon: '⚠️',
    color: '#dc2626',
    notes: [
      {
        id: 'fake-system-warning-basics',
        title: 'Fake System Warning Tactics',
        description: 'Scareware creates fake system warnings, error messages, and alerts that look like they come from your operating system to create fear and urgency.',
        category: 'Technical Deception',
        severity: 'danger',
        examples: [
          'Fake Windows error messages',
          'Fake system scan warnings',
          'Fake registry corruption alerts',
          'Fake virus detection popups'
        ],
        tips: [
          'Real system warnings don\'t appear in web browsers',
          'Check if you can close the warning normally',
          'Real warnings come from your operating system, not websites',
          'Don\'t click on warning popups from websites'
        ]
      }
    ]
  },
  {
    id: 'email-input-trap',
    name: 'Email Input Trap',
    description: 'Scareware asks for email addresses to send fake verification codes or establish contact for further scams.',
    icon: '📧',
    color: '#0891b2',
    notes: [
      {
        id: 'email-input-trap-basics',
        title: 'Email Input Dangers',
        description: 'Scareware requests email addresses under the guise of verification, but they\'re actually collecting contact information for spam and further scams.',
        category: 'Information Theft',
        severity: 'danger',
        examples: [
          'Email fields on security warning pages',
          'Requests for "verification email" on popup windows',
          'Email fields that appear after fake virus scans',
          'Demands for email to "activate security software"'
        ],
        tips: [
          'Never enter your email on security warning popups',
          'Legitimate security software doesn\'t require email verification',
          'Your email will be used for spam and further scams',
          'Close the popup and run a real antivirus scan instead',
          'Use a disposable email if you must test the form'
        ]
      }
    ]
  },
  {
    id: 'password-input-trap',
    name: 'Password Input Trap',
    description: 'Scareware requests passwords to steal account credentials and gain access to your accounts.',
    icon: '🔐',
    color: '#dc2626',
    notes: [
      {
        id: 'password-input-trap-basics',
        title: 'Password Input Dangers',
        description: 'Scareware requests passwords under the guise of account verification, but they\'re actually stealing your login credentials.',
        category: 'Information Theft',
        severity: 'danger',
        examples: [
          'Password fields on security warning pages',
          'Requests for "account verification" passwords',
          'Password fields that appear after fake scans',
          'Demands for passwords to "remove threats"'
        ],
        tips: [
          'Never enter passwords on security warning pages',
          'Legitimate companies never ask for passwords via popups',
          'Your password will be stolen and used maliciously',
          'Change your password immediately if you entered it',
          'Enable two-factor authentication on your accounts',
          'Use a password manager to avoid entering passwords manually'
        ]
      }
    ]
  },
  {
    id: 'phone-input-trap',
    name: 'Phone Input Trap',
    description: 'Scareware requests phone numbers to send fake verification codes or establish contact for phone scams.',
    icon: '📱',
    color: '#0891b2',
    notes: [
      {
        id: 'phone-input-trap-basics',
        title: 'Phone Input Dangers',
        description: 'Scareware requests phone numbers under the guise of SMS verification, but they\'re actually collecting contact information for spam calls and SMS scams.',
        category: 'Information Theft',
        severity: 'danger',
        examples: [
          'Phone number fields on security warning pages',
          'Requests for "SMS verification codes"',
          'Phone fields that appear after fake virus scans',
          'Demands for phone numbers to "activate protection"'
        ],
        tips: [
          'Never enter your phone number on security warning pages',
          'Your number will be used for spam calls and SMS scams',
          'Legitimate security software doesn\'t require phone verification',
          'Block unknown numbers if you already entered your phone',
          'Report spam calls to your phone carrier',
          'Use a virtual phone number if you must test the form'
        ]
      }
    ]
  },
  {
    id: 'credit-card-input-trap',
    name: 'Credit Card Input Trap',
    description: 'Scareware requests credit card information under the guise of verification or payment for fake security software.',
    icon: '💳',
    color: '#dc2626',
    notes: [
      {
        id: 'credit-card-input-trap-basics',
        title: 'Credit Card Input Dangers',
        description: 'Scareware requests credit card information under the guise of verification charges or payment for fake security software.',
        category: 'Financial Fraud',
        severity: 'danger',
        examples: [
          'Credit card fields on security warning pages',
          'Requests for "verification charges" or "test payments"',
          'Card fields that appear after fake virus scans',
          'Demands for card info to "activate protection"'
        ],
        tips: [
          'Never enter credit card info on security warning pages',
          'Your card will be charged for fake services',
          'Contact your bank immediately if you entered card details',
          'Cancel the card and request a new one',
          'Monitor your account for unauthorized charges',
          'Use virtual credit cards for online purchases'
        ]
      }
    ]
  },
  {
    id: 'personal-info-input-trap',
    name: 'Personal Info Input Trap',
    description: 'Scareware requests personal information like names, addresses, and birth dates to steal identities.',
    icon: '👤',
    color: '#0891b2',
    notes: [
      {
        id: 'personal-info-input-trap-basics',
        title: 'Personal Info Input Dangers',
        description: 'Scareware requests personal information under the guise of identity verification, but they\'re actually collecting data for identity theft.',
        category: 'Information Theft',
        severity: 'danger',
        examples: [
          'Name and address fields on security warning pages',
          'Requests for "identity verification" information',
          'Personal info fields that appear after fake scans',
          'Demands for personal details to "verify account"'
        ],
        tips: [
          'Never enter personal information on security warning pages',
          'Your information will be used for identity theft',
          'Legitimate companies don\'t ask for personal info via popups',
          'Monitor your credit reports for suspicious activity',
          'Consider freezing your credit if you entered personal info',
          'Use fake information if you must test the form'
        ]
      }
    ]
  },
  {
    id: 'norton-browser-bar',
    name: 'Fake Browser Bar',
    description: 'Scareware creates fake browser address bars to deceive users in fullscreen mode.',
    icon: '🌐',
    color: '#dc2626',
    notes: [
      {
        id: 'norton-browser-bar-basics',
        title: 'Fake Browser Bar Deception',
        description: 'Scareware creates fake browser address bars that appear when the page goes fullscreen, making users believe they\'re still in their normal browser interface.',
        category: 'Visual Deception',
        severity: 'danger',
        examples: [
          'Fake address bars that appear in fullscreen mode',
          'Fake navigation buttons (back, forward, refresh)',
          'Fake browser tabs and window controls',
          'Fake browser branding and logos'
        ],
        tips: [
          'Press F11 to exit fullscreen mode and see your real browser',
          'Try using Alt+Tab to switch between windows',
          'Check if browser controls actually work when clicked',
          'Look for inconsistencies in the browser UI design',
          'Real browser bars don\'t appear/disappear with fullscreen'
        ],
        externalLinks: [
          {
            label: 'How to Spot Fake Browser Bars',
            url: 'https://www.consumer.ftc.gov/articles/0009-computer-security'
          }
        ]
      }
    ]
  },
  {
    id: 'fake-legal-threat',
    name: 'Fake Legal Threat',
    description: 'Scareware uses fake legal threats and terms of service violations to create fear.',
    icon: '⚖️',
    color: '#dc2626',
    notes: [
      {
        id: 'fake-legal-threat-basics',
        title: 'Fake Legal Threat Tactics',
        description: 'Scareware references fake legal documents, terms of service violations, and legal consequences to create fear and urgency.',
        category: 'Legal Deception',
        severity: 'danger',
        examples: [
          'Fake "Microsoft Services Agreement" violations',
          'Threats of account deletion for "violations"',
          'References to legal documents that don\'t exist',
          'Fake legal consequences for inaction'
        ],
        tips: [
          'Real companies don\'t threaten account deletion via popups',
          'Check if the legal document links actually work',
          'Legitimate legal notices come through official channels',
          'Don\'t click on links in security warning popups',
          'Contact the company directly through official websites'
        ]
      }
    ]
  },
  {
    id: 'account-deletion-threat',
    name: 'Account Deletion Threat',
    description: 'Scareware threatens account deletion to create urgency and fear.',
    icon: '🗑️',
    color: '#dc2626',
    notes: [
      {
        id: 'account-deletion-threat-basics',
        title: 'Account Deletion Threat Tactics',
        description: 'Scareware threatens to delete user accounts unless immediate action is taken, creating panic and urgency.',
        category: 'Psychological Manipulation',
        severity: 'danger',
        examples: [
          'Threats of "irreversible loss of access"',
          'Warnings about "account deletion"',
          'Claims of "permanent loss" of accounts',
          'Urgent demands to "prevent deletion"'
        ],
        tips: [
          'Real companies don\'t threaten account deletion via popups',
          'Legitimate account issues are communicated through official channels',
          'Check your email for real account notifications',
          'Don\'t panic - take time to verify the threat',
          'Contact the company directly through official websites'
        ]
      }
    ]
  },
  {
    id: 'fake-verification-timer',
    name: 'Fake Verification Timer',
    description: 'Scareware uses countdown timers to create false urgency for verification.',
    icon: '⏰',
    color: '#f59e0b',
    notes: [
      {
        id: 'fake-verification-timer-basics',
        title: 'Fake Verification Timer Tactics',
        description: 'Scareware displays countdown timers claiming verification is required within a limited time to create panic and pressure.',
        category: 'Psychological Manipulation',
        severity: 'danger',
        examples: [
          'Countdown timers for "verification required within"',
          'Flashing timers with urgent warnings',
          'Threats of consequences if timer expires',
          'Pressure to act before time runs out'
        ],
        tips: [
          'Real companies don\'t pressure you with countdown timers',
          'Legitimate verification processes don\'t have arbitrary deadlines',
          'Take time to think before acting on urgent demands',
          'Close the popup and contact the company directly',
          'Don\'t let fake timers create panic'
        ]
      }
    ]
  },
  {
    id: 'fake-identity-verification',
    name: 'Fake Identity Verification',
    description: 'Scareware demands identity verification to steal personal information.',
    icon: '🆔',
    color: '#0891b2',
    notes: [
      {
        id: 'fake-identity-verification-basics',
        title: 'Fake Identity Verification Tactics',
        description: 'Scareware demands identity verification under false pretenses to collect personal information and credentials.',
        category: 'Information Theft',
        severity: 'danger',
        examples: [
          'Demands to "confirm your identity"',
          'Requests for verification to "prevent account loss"',
          'Fake identity verification processes',
          'Claims that verification is required for "security"'
        ],
        tips: [
          'Real companies don\'t demand identity verification via popups',
          'Legitimate verification happens through official channels',
          'Don\'t enter personal information on security warning pages',
          'Contact the company directly through official websites',
          'Check if the verification process is actually secure'
        ]
      }
    ]
  },
  {
    id: 'fake-ransomware-threat',
    name: 'Fake Ransomware Threat',
    description: 'Scareware claims files are encrypted and demands cryptocurrency payment.',
    icon: '🔒',
    color: '#dc2626',
    notes: [
      {
        id: 'fake-ransomware-threat-basics',
        title: 'Fake Ransomware Threat Tactics',
        description: 'Scareware claims your files are encrypted and demands cryptocurrency payment to "decrypt" them, even though no actual encryption has occurred.',
        category: 'Financial Fraud',
        severity: 'danger',
        examples: [
          'Claims that "all files are encrypted"',
          'Demands Bitcoin or cryptocurrency payment',
          'Threatens to destroy decryption keys',
          'Shows fake file counts and encryption status'
        ],
        tips: [
          'Real ransomware actually encrypts files - check if files are actually inaccessible',
          'Don\'t pay cryptocurrency to unknown sources',
          'Real ransomware doesn\'t appear in web browsers',
          'Contact cybersecurity professionals if you suspect real ransomware',
          'Never pay ransom demands from web popups'
        ]
      }
    ]
  },
  {
    id: 'fake-cryptocurrency-demand',
    name: 'Fake Cryptocurrency Demand',
    description: 'Scareware demands cryptocurrency payments for fake services or threats.',
    icon: '₿',
    color: '#f59e0b',
    notes: [
      {
        id: 'fake-cryptocurrency-demand-basics',
        title: 'Fake Cryptocurrency Demand Tactics',
        description: 'Scareware demands cryptocurrency payments (Bitcoin, etc.) for fake services, threats, or "decryption" of files that were never actually encrypted.',
        category: 'Financial Fraud',
        severity: 'danger',
        examples: [
          'Demands Bitcoin payment for "file decryption"',
          'Requests cryptocurrency for "legal settlements"',
          'Claims cryptocurrency is required for "security services"',
          'Threatens consequences if cryptocurrency isn\'t paid'
        ],
        tips: [
          'Never pay cryptocurrency to unknown sources',
          'Real companies don\'t demand cryptocurrency payments',
          'Cryptocurrency payments are irreversible and untraceable',
          'Contact authorities if you receive cryptocurrency demands',
          'Don\'t send cryptocurrency to addresses from popup windows'
        ]
      }
    ]
  },
  {
    id: 'fake-scan-progress',
    name: 'Fake Scan Progress',
    description: 'Scareware shows fake scan progress bars and timing to create false legitimacy.',
    icon: '📊',
    color: '#0891b2',
    notes: [
      {
        id: 'fake-scan-progress-basics',
        title: 'Fake Scan Progress Tactics',
        description: 'Scareware displays fake progress bars, scan times, and item counts to make the scan appear legitimate and create urgency.',
        category: 'Technical Deception',
        severity: 'warning',
        examples: [
          'Progress bars that always show threats being found',
          'Fake scan times that increase rapidly',
          'Impossible item counts (millions scanned instantly)',
          'Progress bars that change color during "escalation"'
        ],
        tips: [
          'Real scans don\'t always find threats',
          'Legitimate scan times are consistent and realistic',
          'Check if the progress bar behavior is suspicious',
          'Real security software doesn\'t change progress colors dramatically',
          'Don\'t trust scans that always find problems'
        ]
      }
    ]
  },
  {
    id: 'fake-scan-timing',
    name: 'Fake Scan Timing',
    description: 'Scareware uses fake scan times and item counts to create false urgency.',
    icon: '⏱️',
    color: '#f59e0b',
    notes: [
      {
        id: 'fake-scan-timing-basics',
        title: 'Fake Scan Timing Tactics',
        description: 'Scareware displays fake scan times, item counts, and timing information to make the scan appear legitimate and create pressure.',
        category: 'Technical Deception',
        severity: 'warning',
        examples: [
          'Scan times that increase too quickly',
          'Item counts that jump by thousands instantly',
          'Timing that doesn\'t match real scan behavior',
          'Counters that always show increasing threats'
        ],
        tips: [
          'Real scans have consistent, realistic timing',
          'Legitimate item counts increase gradually',
          'Check if the timing seems artificially accelerated',
          'Real security software doesn\'t show impossible scan speeds',
          'Don\'t trust scans with suspicious timing patterns'
        ]
      }
    ]
  },
  {
    id: 'fake-terminal-output',
    name: 'Fake Terminal Output',
    description: 'Scareware displays fake terminal output to appear legitimate and technical.',
    icon: '💻',
    color: '#0891b2',
    notes: [
      {
        id: 'fake-terminal-output-basics',
        title: 'Fake Terminal Output Tactics',
        description: 'Scareware creates fake terminal output, log messages, and technical jargon to make the scan appear legitimate and professional.',
        category: 'Technical Deception',
        severity: 'warning',
        examples: [
          'Fake log messages with technical terms',
          'Simulated terminal output with threats',
          'Fake file paths and system messages',
          'Technical jargon to appear legitimate'
        ],
        tips: [
          'Real terminal output comes from actual system processes',
          'Legitimate scans show real file paths and system information',
          'Check if the technical terms are accurate',
          'Real security software doesn\'t generate fake terminal output',
          'Don\'t trust technical-looking output from web pages'
        ]
      }
    ]
  },
  {
    id: 'fake-version-info',
    name: 'Fake Version Info',
    description: 'Scareware displays fake version information to appear legitimate.',
    icon: '📋',
    color: '#0891b2',
    notes: [
      {
        id: 'fake-version-info-basics',
        title: 'Fake Version Info Tactics',
        description: 'Scareware shows fake version numbers, "Web Version" labels, and other technical details to make the software appear legitimate and up-to-date.',
        category: 'Technical Deception',
        severity: 'warning',
        examples: [
          'Fake version numbers like "4.5.32"',
          '"Web Version" labels that don\'t exist',
          'Fake build numbers and release dates',
          'Technical version information that looks official'
        ],
        tips: [
          'Real security software doesn\'t have "Web Version" labels',
          'Check if the version number matches official releases',
          'Legitimate software shows real version information',
          'Don\'t trust version info from security warning popups',
          'Verify software versions on official websites'
        ]
      }
    ]
  },
  {
    id: 'browser-hijacking-warning',
    name: 'Browser Hijacking Warning',
    description: 'Scareware warns users not to close the window to prevent escape.',
    icon: '🚫',
    color: '#dc2626',
    notes: [
      {
        id: 'browser-hijacking-warning-basics',
        title: 'Browser Hijacking Warning Tactics',
        description: 'Scareware displays warnings like "Do not close this window" to prevent users from escaping the scam and to create a false sense of urgency.',
        category: 'Browser Manipulation',
        severity: 'danger',
        examples: [
          '"Do not close this window before upgrading"',
          '"Scan is running. Do not close this window"',
          'Warnings about interrupting the scan process',
          'Threats of system vulnerability if window is closed'
        ],
        tips: [
          'Real security software doesn\'t prevent you from closing windows',
          'Legitimate scans can be safely interrupted',
          'This is a classic scareware technique to trap users',
          'Close the browser immediately if you see these warnings',
          'Use Task Manager to force-close if necessary'
        ]
      }
    ]
  },
  {
    id: 'fake-upgrade-demand',
    name: 'Fake Upgrade Demand',
    description: 'Scareware demands upgrades to premium versions to extract payment.',
    icon: '💳',
    color: '#dc2626',
    notes: [
      {
        id: 'fake-upgrade-demand-basics',
        title: 'Fake Upgrade Demand Tactics',
        description: 'Scareware demands upgrades to premium versions claiming the free version cannot remove threats, when in reality no threats exist.',
        category: 'Financial Fraud',
        severity: 'danger',
        examples: [
          '"Free version cannot remove these threats"',
          '"Upgrade to Premium now" buttons',
          'Claims that free software is insufficient',
          'Urgent demands to upgrade for protection'
        ],
        tips: [
          'Real free security software can remove actual threats',
          'Legitimate companies don\'t pressure upgrades with fake threats',
          'Check if threats are actually real before upgrading',
          'Don\'t pay for protection from non-existent threats',
          'Use trusted free antivirus software instead'
        ]
      }
    ]
  },
  {
    id: 'fake-threat-count',
    name: 'Fake Threat Count',
    description: 'Scareware displays fake threat counts to create urgency and fear.',
    icon: '🔢',
    color: '#dc2626',
    notes: [
      {
        id: 'fake-threat-count-basics',
        title: 'Fake Threat Count Tactics',
        description: 'Scareware displays fake threat counts that increase over time to create urgency and pressure users into taking action.',
        category: 'Psychological Manipulation',
        severity: 'danger',
        examples: [
          'Threat counts that increase rapidly',
          'Impossible threat numbers (thousands)',
          'Threat counts that change during escalation',
          'Generic threat names with high counts'
        ],
        tips: [
          'Real threat counts are specific and don\'t change dramatically',
          'Legitimate scans show real file paths and specific threats',
          'Don\'t trust scans that always find increasing threats',
          'Real security software doesn\'t show impossible threat counts'
        ]
      }
    ]
  },
  {
    id: 'fake-expiration-date',
    name: 'Fake Expiration Date',
    description: 'Scareware uses fake expiration dates to create urgency.',
    icon: '📅',
    color: '#f59e0b',
    notes: [
      {
        id: 'fake-expiration-date-basics',
        title: 'Fake Expiration Date Tactics',
        description: 'Scareware displays fake expiration dates (often "yesterday") to create urgency and pressure users into immediate action.',
        category: 'Psychological Manipulation',
        severity: 'warning',
        examples: [
          'Subscription expired "yesterday"',
          'Fake expiration dates that create urgency',
          'Claims of immediate action required',
          'Threats based on expired subscriptions'
        ],
        tips: [
          'Check your actual subscription status',
          'Real companies don\'t pressure with fake expiration dates',
          'Legitimate software doesn\'t show "yesterday" expiration',
          'Contact the company directly to verify status'
        ]
      }
    ]
  },
  {
    id: 'fake-renewal-demand',
    name: 'Fake Renewal Demand',
    description: 'Scareware demands immediate renewal to restore protection.',
    icon: '🔄',
    color: '#dc2626',
    notes: [
      {
        id: 'fake-renewal-demand-basics',
        title: 'Fake Renewal Demand Tactics',
        description: 'Scareware demands immediate renewal claiming protection has been disabled, when in reality the subscription may still be active.',
        category: 'Financial Fraud',
        severity: 'danger',
        examples: [
          '"Renew immediately to restore protection"',
          'Claims that protection is disabled',
          'Urgent renewal demands',
          'Threats based on expired protection'
        ],
        tips: [
          'Check your actual subscription status',
          'Real companies don\'t disable protection immediately',
          'Legitimate software provides grace periods',
          'Contact the company directly to verify'
        ]
      }
    ]
  },
  {
    id: 'fake-special-offer',
    name: 'Fake Special Offer',
    description: 'Scareware uses fake special offers and discounts to pressure payment.',
    icon: '🎁',
    color: '#f59e0b',
    notes: [
      {
        id: 'fake-special-offer-basics',
        title: 'Fake Special Offer Tactics',
        description: 'Scareware creates fake special offers, discounts, and limited-time deals to pressure users into making immediate payments.',
        category: 'Financial Fraud',
        severity: 'warning',
        examples: [
          'Limited-time offers with countdown timers',
          'Fake discounts (70% off, etc.)',
          'Special offers that expire soon',
          'Urgent discount demands'
        ],
        tips: [
          'Real companies don\'t pressure with fake deadlines',
          'Legitimate offers don\'t require immediate action',
          'Check if the discount is actually real',
          'Don\'t let fake urgency force a decision'
        ]
      }
    ]
  },
  {
    id: 'fake-security-activity-link',
    name: 'Fake Security Activity Link',
    description: 'Scareware displays fake security activity links to appear legitimate.',
    icon: '🔗',
    color: '#0891b2',
    notes: [
      {
        id: 'fake-security-activity-link-basics',
        title: 'Fake Security Activity Link Tactics',
        description: 'Scareware displays fake links to security activity pages to make the scam appear more legitimate and official.',
        category: 'Visual Deception',
        severity: 'warning',
        examples: [
          'Fake "myaccount.google.com/notifications" links',
          'Fake security activity pages',
          'Links that don\'t actually work',
          'Official-looking URLs that are just text'
        ],
        tips: [
          'Real security links work when clicked',
          'Check if the link actually navigates',
          'Don\'t trust links in security warning popups',
          'Visit official websites directly'
        ]
      }
    ]
  },
  {
    id: 'fake-suspicious-login-count',
    name: 'Fake Suspicious Login Count',
    description: 'Scareware displays fake suspicious login attempt counts.',
    icon: '🔐',
    color: '#dc2626',
    notes: [
      {
        id: 'fake-suspicious-login-count-basics',
        title: 'Fake Suspicious Login Count Tactics',
        description: 'Scareware displays fake counts of suspicious login attempts to create fear and urgency about account security.',
        category: 'Psychological Manipulation',
        severity: 'danger',
        examples: [
          'Fake suspicious login attempt counts',
          'Impossible login attempt numbers',
          'Counts that increase over time',
          'Generic "suspicious activity" claims'
        ],
        tips: [
          'Real suspicious activity is specific and detailed',
          'Check your actual account security settings',
          'Don\'t trust generic suspicious activity claims',
          'Contact the company directly to verify'
        ]
      }
    ]
  },
  {
    id: 'fake-case-number',
    name: 'Fake Case Number',
    description: 'Scareware uses fake case numbers to appear official.',
    icon: '📋',
    color: '#0891b2',
    notes: [
      {
        id: 'fake-case-number-basics',
        title: 'Fake Case Number Tactics',
        description: 'Scareware displays fake case numbers, reference numbers, and official-looking identifiers to make threats appear legitimate.',
        category: 'Visual Deception',
        severity: 'warning',
        examples: [
          'Fake FBI case numbers',
          'Fake legal reference numbers',
          'Official-looking case identifiers',
          'Fake tracking numbers'
        ],
        tips: [
          'Real case numbers can be verified with authorities',
          'Don\'t trust case numbers in popup windows',
          'Contact official agencies directly',
          'Real legal notices don\'t come via popups'
        ]
      }
    ]
  },
  {
    id: 'fake-legal-consequences',
    name: 'Fake Legal Consequences',
    description: 'Scareware threatens fake legal consequences to create fear.',
    icon: '⚖️',
    color: '#dc2626',
    notes: [
      {
        id: 'fake-legal-consequences-basics',
        title: 'Fake Legal Consequences Tactics',
        description: 'Scareware threatens fake legal consequences like fines, imprisonment, and prosecution to create fear and urgency.',
        category: 'Legal Deception',
        severity: 'danger',
        examples: [
          'Threats of $250,000 fines',
          'Threats of 5 years imprisonment',
          'Fake prosecution warnings',
          'Immediate legal action threats'
        ],
        tips: [
          'Real legal notices don\'t come via popup windows',
          'Contact legal authorities directly',
          'Don\'t pay settlements to popup threats',
          'Real legal processes have specific procedures'
        ]
      }
    ]
  },
  {
    id: 'fake-settlement-offer',
    name: 'Fake Settlement Offer',
    description: 'Scareware offers fake settlements to extract payment.',
    icon: '💰',
    color: '#dc2626',
    notes: [
      {
        id: 'fake-settlement-offer-basics',
        title: 'Fake Settlement Offer Tactics',
        description: 'Scareware offers fake legal settlements to avoid prosecution, when no actual legal action exists.',
        category: 'Financial Fraud',
        severity: 'danger',
        examples: [
          'Fake settlement offers to avoid prosecution',
          'Limited-time settlement deals',
          'Urgent settlement demands',
          'Fake legal settlement amounts'
        ],
        tips: [
          'Real settlements don\'t come via popup windows',
          'Contact legal authorities directly',
          'Don\'t pay settlements to unknown sources',
          'Real legal processes have official channels'
        ]
      }
    ]
  },
  {
    id: 'fake-tech-support-claim',
    name: 'Fake Tech Support Claim',
    description: 'Scareware claims to be official tech support.',
    icon: '🖥️',
    color: '#dc2626',
    notes: [
      {
        id: 'fake-tech-support-claim-basics',
        title: 'Fake Tech Support Claim Tactics',
        description: 'Scareware claims to be official tech support from companies like Microsoft to gain trust and access.',
        category: 'Social Engineering',
        severity: 'danger',
        examples: [
          'Claims to be Microsoft Technical Support',
          'Fake tech support phone numbers',
          'Claims of official company support',
          'Fake support team availability'
        ],
        tips: [
          'Real tech support doesn\'t contact you via popups',
          'Contact companies through official channels',
          'Don\'t trust unsolicited tech support offers',
          'Real support has official verification methods'
        ]
      }
    ]
  },
  {
    id: 'fake-system-error',
    name: 'Fake System Error',
    description: 'Scareware displays fake system errors to create urgency.',
    icon: '💻',
    color: '#dc2626',
    notes: [
      {
        id: 'fake-system-error-basics',
        title: 'Fake System Error Tactics',
        description: 'Scareware displays fake system errors, registry corruption warnings, and technical problems to create urgency.',
        category: 'Technical Deception',
        severity: 'danger',
        examples: [
          'Fake Windows registry corruption',
          'Fake system error messages',
          'Fake virus infection warnings',
          'Fake system failure alerts'
        ],
        tips: [
          'Real system errors don\'t appear in web browsers',
          'Check your actual system status',
          'Don\'t trust system warnings from websites',
          'Use legitimate system diagnostic tools'
        ]
      }
    ]
  },
  {
    id: 'fake-file-count',
    name: 'Fake File Count',
    description: 'Scareware displays fake file counts to create urgency.',
    icon: '📁',
    color: '#dc2626',
    notes: [
      {
        id: 'fake-file-count-basics',
        title: 'Fake File Count Tactics',
        description: 'Scareware displays fake counts of encrypted or affected files to create urgency and fear.',
        category: 'Psychological Manipulation',
        severity: 'danger',
        examples: [
          'Fake encrypted file counts',
          'Impossible file numbers (thousands)',
          'File counts that increase over time',
          'Generic file type claims'
        ],
        tips: [
          'Check if files are actually inaccessible',
          'Real ransomware actually encrypts files',
          'Don\'t trust file counts from popup windows',
          'Use legitimate file recovery tools'
        ]
      }
    ]
  },
  {
    id: 'fake-deadline-threat',
    name: 'Fake Deadline Threat',
    description: 'Scareware uses fake deadlines to create urgency.',
    icon: '⏰',
    color: '#f59e0b',
    notes: [
      {
        id: 'fake-deadline-threat-basics',
        title: 'Fake Deadline Threat Tactics',
        description: 'Scareware creates fake deadlines and time limits to pressure users into immediate action.',
        category: 'Psychological Manipulation',
        severity: 'danger',
        examples: [
          '24-hour ransom deadlines',
          'Decryption key destruction threats',
          'Limited-time settlement offers',
          'Immediate action deadlines'
        ],
        tips: [
          'Real companies don\'t pressure with fake deadlines',
          'Don\'t let artificial urgency force decisions',
          'Take time to verify threats',
          'Contact authorities for real threats'
        ]
      }
    ]
  },
  {
    id: 'fake-account-creation-link',
    name: 'Fake Account Creation Link',
    description: 'Scareware displays fake account creation links to appear legitimate.',
    icon: '👤',
    color: '#0891b2',
    notes: [
      {
        id: 'fake-account-creation-link-basics',
        title: 'Fake Account Creation Link Tactics',
        description: 'Scareware displays fake "Create account" links that don\'t actually work, designed to make the sign-in page appear legitimate.',
        category: 'Visual Deception',
        severity: 'warning',
        examples: [
          'Fake "Create one!" links on sign-in pages',
          'Non-functional account creation buttons',
          'Links that appear to offer account setup',
          'Fake registration options'
        ],
        tips: [
          'Real account creation links work when clicked',
          'Check if the link actually navigates to a registration page',
          'Don\'t trust links in security warning popups',
          'Visit official websites directly for account creation'
        ]
      }
    ]
  },
  {
    id: 'fake-account-access-link',
    name: 'Fake Account Access Link',
    description: 'Scareware displays fake account access recovery links.',
    icon: '🔓',
    color: '#0891b2',
    notes: [
      {
        id: 'fake-account-access-link-basics',
        title: 'Fake Account Access Link Tactics',
        description: 'Scareware displays fake "Can\'t access your account?" links that don\'t actually work, designed to make the sign-in page appear legitimate.',
        category: 'Visual Deception',
        severity: 'warning',
        examples: [
          'Fake "Can\'t access your account?" links',
          'Non-functional account recovery options',
          'Links that appear to offer account help',
          'Fake support links'
        ],
        tips: [
          'Real account recovery links work when clicked',
          'Check if the link actually navigates to a recovery page',
          'Don\'t trust links in security warning popups',
          'Visit official websites directly for account recovery'
        ]
      }
    ]
  },
  {
    id: 'fake-signin-options-link',
    name: 'Fake Sign-in Options Link',
    description: 'Scareware displays fake sign-in options links.',
    icon: '🔐',
    color: '#0891b2',
    notes: [
      {
        id: 'fake-signin-options-link-basics',
        title: 'Fake Sign-in Options Link Tactics',
        description: 'Scareware displays fake "Sign-in options" links that don\'t actually work, designed to make the sign-in page appear legitimate.',
        category: 'Visual Deception',
        severity: 'warning',
        examples: [
          'Fake "Sign-in options" links',
          'Non-functional authentication options',
          'Links that appear to offer alternative sign-in methods',
          'Fake security option links'
        ],
        tips: [
          'Real sign-in option links work when clicked',
          'Check if the link actually navigates to options page',
          'Don\'t trust links in security warning popups',
          'Visit official websites directly for sign-in options'
        ]
      }
    ]
  },
  {
    id: 'fake-password-recovery-link',
    name: 'Fake Password Recovery Link',
    description: 'Scareware displays fake password recovery links.',
    icon: '🔑',
    color: '#0891b2',
    notes: [
      {
        id: 'fake-password-recovery-link-basics',
        title: 'Fake Password Recovery Link Tactics',
        description: 'Scareware displays fake "Forgot my password" links that don\'t actually work, designed to make the sign-in page appear legitimate.',
        category: 'Visual Deception',
        severity: 'warning',
        examples: [
          'Fake "Forgot my password" links',
          'Non-functional password recovery options',
          'Links that appear to offer password help',
          'Fake reset password links'
        ],
        tips: [
          'Real password recovery links work when clicked',
          'Check if the link actually navigates to a recovery page',
          'Don\'t trust links in security warning popups',
          'Visit official websites directly for password recovery'
        ]
      }
    ]
  },
  {
    id: 'fake-payment-cancel-button',
    name: 'Fake Payment Cancel Button',
    description: 'Scareware uses fake cancel buttons to appear legitimate.',
    icon: '❌',
    color: '#6c757d',
    notes: [
      {
        id: 'fake-payment-cancel-button-basics',
        title: 'Fake Payment Cancel Button Tactics',
        description: 'Scareware includes fake cancel buttons in payment forms to make them appear legitimate and give users a false sense of control.',
        category: 'Visual Deception',
        severity: 'warning',
        examples: [
          'Cancel buttons in fake payment forms',
          'Non-functional cancel options',
          'Buttons that appear to offer escape',
          'Fake payment form controls'
        ],
        tips: [
          'Real payment forms have working cancel buttons',
          'Check if the cancel button actually closes the form',
          'Don\'t trust payment forms in security warning popups',
          'Close the browser window instead of using cancel buttons'
        ]
      }
    ]
  },
  {
    id: 'fake-payment-close-button',
    name: 'Fake Payment Close Button',
    description: 'Scareware uses fake close buttons to appear legitimate.',
    icon: '❌',
    color: '#6c757d',
    notes: [
      {
        id: 'fake-payment-close-button-basics',
        title: 'Fake Payment Close Button Tactics',
        description: 'Scareware includes fake close buttons in payment error modals to make them appear legitimate and give users a false sense of control.',
        category: 'Visual Deception',
        severity: 'warning',
        examples: [
          'Close buttons in fake payment error modals',
          'Non-functional close options',
          'Buttons that appear to offer escape',
          'Fake modal controls'
        ],
        tips: [
          'Real payment error modals have working close buttons',
          'Check if the close button actually closes the modal',
          'Don\'t trust payment modals in security warning popups',
          'Close the browser window instead of using close buttons'
        ]
      }
    ]
  },
  {
    id: 'fake-payment-retry-button',
    name: 'Fake Payment Retry Button',
    description: 'Scareware uses fake retry buttons to pressure payment.',
    icon: '🔄',
    color: '#f59e0b',
    notes: [
      {
        id: 'fake-payment-retry-button-basics',
        title: 'Fake Payment Retry Button Tactics',
        description: 'Scareware includes fake "Try Different Card" buttons to pressure users into attempting payment again with different cards.',
        category: 'Financial Fraud',
        severity: 'danger',
        examples: [
          '"Try Different Card" buttons in fake payment forms',
          'Retry payment options',
          'Buttons that pressure multiple payment attempts',
          'Fake payment retry mechanisms'
        ],
        tips: [
          'Real companies don\'t pressure multiple payment attempts',
          'Don\'t try multiple cards on security warning popups',
          'Your card information will be stolen',
          'Close the browser and contact your bank if concerned'
        ]
      }
    ]
  },
  {
    id: 'fake-product-pricing',
    name: 'Fake Product Pricing',
    description: 'Scareware displays fake product pricing to appear legitimate.',
    icon: '💰',
    color: '#0891b2',
    notes: [
      {
        id: 'fake-product-pricing-basics',
        title: 'Fake Product Pricing Tactics',
        description: 'Scareware displays fake product pricing and subscription costs to make the payment form appear legitimate.',
        category: 'Financial Fraud',
        severity: 'warning',
        examples: [
          'Fake subscription prices (Norton 360 Premium $89.99)',
          'Fake product names and descriptions',
          'Pricing that matches real products',
          'Fake annual subscription costs'
        ],
        tips: [
          'Real companies don\'t sell products via security warning popups',
          'Check if the pricing matches official websites',
          'Don\'t trust payment forms in security warning popups',
          'Visit official websites directly for legitimate purchases'
        ]
      }
    ]
  },
  {
    id: 'fake-total-pricing',
    name: 'Fake Total Pricing',
    description: 'Scareware displays fake total pricing to pressure payment.',
    icon: '💳',
    color: '#dc2626',
    notes: [
      {
        id: 'fake-total-pricing-basics',
        title: 'Fake Total Pricing Tactics',
        description: 'Scareware displays fake total pricing with discounts to make the payment appear more attractive and pressure users into paying.',
        category: 'Financial Fraud',
        severity: 'danger',
        examples: [
          'Fake total prices after "discounts"',
          'Pricing that changes based on urgency',
          'Fake final payment amounts',
          'Pricing that escalates with threats'
        ],
        tips: [
          'Real companies don\'t pressure payment via security warning popups',
          'Don\'t pay for protection from non-existent threats',
          'Your payment information will be stolen',
          'Close the browser and use legitimate security software'
        ]
      }
    ]
  },
  {
    id: 'fake-login-next-button',
    name: 'Fake Login Next Button',
    description: 'Scareware uses fake "Next" buttons in login forms to appear legitimate.',
    icon: '➡️',
    color: '#0891b2',
    notes: [
      {
        id: 'fake-login-next-button-basics',
        title: 'Fake Login Next Button Tactics',
        description: 'Scareware includes fake "Next" buttons in login forms to make them appear legitimate and guide users through the credential theft process.',
        category: 'Visual Deception',
        severity: 'warning',
        examples: [
          'Next buttons in fake Microsoft login forms',
          'Buttons that advance through fake login steps',
          'Fake form progression controls',
          'Buttons that appear to validate email addresses'
        ],
        tips: [
          'Real login forms have working Next buttons',
          'Check if the button actually validates the email',
          'Don\'t trust login forms in security warning popups',
          'Visit official websites directly for login'
        ]
      }
    ]
  },
  {
    id: 'fake-login-submit-button',
    name: 'Fake Login Submit Button',
    description: 'Scareware uses fake "Sign in" buttons to steal credentials.',
    icon: '🔐',
    color: '#dc2626',
    notes: [
      {
        id: 'fake-login-submit-button-basics',
        title: 'Fake Login Submit Button Tactics',
        description: 'Scareware includes fake "Sign in" buttons in login forms to steal user credentials and account information.',
        category: 'Information Theft',
        severity: 'danger',
        examples: [
          'Sign in buttons in fake Microsoft login forms',
          'Buttons that submit stolen credentials',
          'Fake authentication controls',
          'Buttons that appear to validate passwords'
        ],
        tips: [
          'Real login forms don\'t appear in security warning popups',
          'Never enter credentials on security warning pages',
          'Your login information will be stolen',
          'Visit official websites directly for login',
          'Enable two-factor authentication on your accounts'
        ]
      }
    ]
  },
  {
    id: 'fake-verification-back-button',
    name: 'Fake Verification Back Button',
    description: 'Scareware uses fake "Back" buttons to appear legitimate.',
    icon: '⬅️',
    color: '#0891b2',
    notes: [
      {
        id: 'fake-verification-back-button-basics',
        title: 'Fake Verification Back Button Tactics',
        description: 'Scareware includes fake "Back" buttons in verification forms to make them appear legitimate and give users a false sense of control.',
        category: 'Visual Deception',
        severity: 'warning',
        examples: [
          'Back buttons in fake Google verification forms',
          'Buttons that appear to offer navigation',
          'Fake form navigation controls',
          'Buttons that seem to allow escape'
        ],
        tips: [
          'Real verification forms have working Back buttons',
          'Check if the button actually navigates back',
          'Don\'t trust verification forms in security warning popups',
          'Close the browser window instead of using Back buttons'
        ]
      }
    ]
  },
  {
    id: 'fake-verification-submit-button',
    name: 'Fake Verification Submit Button',
    description: 'Scareware uses fake "Submit" buttons to steal personal information.',
    icon: '📝',
    color: '#dc2626',
    notes: [
      {
        id: 'fake-verification-submit-button-basics',
        title: 'Fake Verification Submit Button Tactics',
        description: 'Scareware includes fake "Submit" buttons in verification forms to steal personal information and identity data.',
        category: 'Information Theft',
        severity: 'danger',
        examples: [
          'Submit buttons in fake Google verification forms',
          'Buttons that submit stolen personal information',
          'Fake verification controls',
          'Buttons that appear to validate identity'
        ],
        tips: [
          'Real verification forms don\'t appear in security warning popups',
          'Never enter personal information on security warning pages',
          'Your personal data will be stolen',
          'Visit official websites directly for verification',
          'Contact the company through official channels'
        ]
      }
    ]
  }
];

export function getClassDefinition(classId: string): ClassDefinition | undefined {
  return classDefinitions.find(cd => cd.id === classId);
}

export function getAllClassDefinitions(): ClassDefinition[] {
  return classDefinitions;
} 