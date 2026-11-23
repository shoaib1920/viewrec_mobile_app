export type Customer = {
  id: string;
  name: string;
  job: string;
  date: string;
  reason: string;
  status: 'suggested' | 'approved' | 'invited' | 'recorded' | 'skipped';
};

export const customers: Customer[] = [
  { id: '1', name: 'Sarah Mitchell', job: 'Roof replacement', date: '12 days ago', reason: 'Recent job, replied to your last email', status: 'suggested' },
  { id: '2', name: 'Daniel Okafor', job: 'Gutter repair', date: '3 weeks ago', reason: 'Left a 5-star Google review', status: 'suggested' },
  { id: '3', name: 'Priya Nair', job: 'Full re-roof', date: '1 month ago', reason: 'Repeat customer', status: 'approved' },
  { id: '4', name: 'Tom Hendricks', job: 'Chimney flashing', date: '5 weeks ago', reason: 'Recent job', status: 'invited' },
  { id: '5', name: 'Lena Fischer', job: 'Skylight install', date: '6 weeks ago', reason: 'Referred two neighbours', status: 'recorded' },
  { id: '6', name: 'Marcus Webb', job: 'Storm damage repair', date: '2 months ago', reason: 'Job went badly - dispute open', status: 'skipped' },
];

export type Video = {
  id: string;
  name: string;
  job: string;
  duration: string;
  quote: string;
  status: 'pending' | 'approved' | 'published';
  views: number;
  hue: string;
  platforms: string[];
};

export const videos: Video[] = [
  { id: 'v1', name: 'Lena Fischer', job: 'Skylight install', duration: '1:48', quote: 'They turned up when they said they would, cleaned up after themselves, and the roof has been perfect since.', status: 'pending', views: 0, hue: '#3b2a6b', platforms: [] },
  { id: 'v2', name: 'Priya Nair', job: 'Full re-roof', duration: '2:03', quote: 'Honestly the easiest builder I have ever dealt with. Fixed price, no surprises.', status: 'published', views: 1243, hue: '#1f4a5c', platforms: ['Google', 'Website', 'Facebook'] },
  { id: 'v3', name: 'James Carter', job: 'Gutter replacement', duration: '1:32', quote: 'Quick, tidy and fair. I told my whole street about them.', status: 'approved', views: 312, hue: '#5c2a3b', platforms: ['Website'] },
  { id: 'v4', name: 'Aisha Rahman', job: 'Flat roof repair', duration: '1:55', quote: 'Three other firms never called back. These guys fixed the leak in a day.', status: 'published', views: 874, hue: '#2a5c3f', platforms: ['Instagram', 'YouTube'] },
];

export const platforms = [
  { id: 'google', name: 'Google Business Profile', icon: 'logo-google' },
  { id: 'web', name: 'Your website', icon: 'globe-outline' },
  { id: 'fb', name: 'Facebook', icon: 'logo-facebook' },
  { id: 'ig', name: 'Instagram', icon: 'logo-instagram' },
  { id: 'yt', name: 'YouTube', icon: 'logo-youtube' },
  { id: 'tt', name: 'TikTok', icon: 'logo-tiktok' },
  { id: 'li', name: 'LinkedIn', icon: 'logo-linkedin' },
  { id: 'pin', name: 'Pinterest', icon: 'logo-pinterest' },
] as const;

export const plans = [
  { id: 'std', name: 'Standard', price: '$49', blurb: 'Start collecting video reviews.', features: ['Unlimited video testimonials', 'Review page and free public listing', 'Email and text invitations', 'One reminder after 3 days', 'Show reviews on your website'] },
  { id: 'pro', name: 'Pro', price: '$149', recommended: true, blurb: 'More customers, not just more reviews.', features: ['Everything in Standard', 'Your logo on invitations', 'Up to 5 reminders', 'Facebook and Instagram posting', 'Embeds, wall and subtitles', 'Avatar mode for camera-shy customers'] },
  { id: 'plus', name: 'Pro Plus', price: '$299', blurb: 'Marketing on more automation.', features: ['Everything in Pro', 'Posting on 11 platforms', 'Plan a month of posts at once', 'Discount coupons for reviewers', 'Customer loyalty rewards', 'Setup call with our team'] },
];

export const script = [
  'They turned up when they said they would,',
  'cleaned up after themselves,',
  'and the roof has been perfect since.',
];
