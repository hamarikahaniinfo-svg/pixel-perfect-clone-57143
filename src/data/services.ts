export type Plan = { name: string; note: string; price: string; features: string[]; featured?: boolean };

export type ServicePage = {
  slug: string;
  title: string;
  heading: string;
  intro: string;
  metaTitle: string;
  metaDesc: string;
  plans: Plan[];
  pricingLabel?: string;
  priceSuffix?: string;
};

const mark = (plans: Plan[]): Plan[] => plans.map((p, i) => ({ ...p, featured: i === 1 }));

export const services: ServicePage[] = [
  {
    slug: "website-development",
    title: "Website Development",
    heading: "Website Development",
    metaTitle: "Website Development — NFS Tech",
    metaDesc: "Professional website development services with modern tech, clean code, and performance optimization.",
    intro: "We provide professional website development services designed to help businesses establish a strong and impactful online presence. Our websites are built with modern technologies, clean coding standards, and performance optimization to ensure speed, security, and scalability.",
    pricingLabel: "Website Development Packages",
    plans: mark([
      { name: "Basic Plan", note: "Save 10%", price: "125", features: ["Logo Design","Up to 5 Pages","Responsive Design","Contact Form","Basic SEO Setup","Social Media Integration","Speed Optimization","1 Year Single Hosting","Domain Registration (.com / .xyz / .pro)","Free Business Email","7 Days Delivery","1 Month Free Support"] },
      { name: "Standard Plan", note: "Save 15%", price: "250", features: ["Logo Design","Up to 10 Pages","Custom Design Layout","Blog Setup","Advanced On-Page SEO","Performance Optimization","Google Analytics Integration","1 Year Single Hosting","Domain Registration (.com / .pk)","Free Business Email","14 Days Delivery","2 Months Free Support"] },
      { name: "Premium Plan", note: "Save 20%", price: "465", features: ["Logo Design","Up to 20 Pages","Fully Custom Design","eCommerce / Booking System","Payment Gateway Integration","Advanced SEO Optimization","CRM / Email Integration","1 Year Single Hosting","Domain Registration (.com / .pk)","Free Business Email","21 Days Delivery","3 Months Free Support"] },
    ]),
  },
  {
    slug: "wordpress-development",
    title: "WordPress Development",
    heading: "WordPress Development",
    metaTitle: "WordPress Development — NFS Tech",
    metaDesc: "Modern, fast-loading, SEO-friendly WordPress websites tailored to your brand.",
    intro: "We design and develop modern, high-performance WordPress websites tailored to help your business grow online. From startups to established companies, we create fully responsive, fast-loading, and SEO-friendly websites that reflect your brand identity and convert visitors into customers.",
    pricingLabel: "WordPress Development Packages",
    plans: mark([
      { name: "Basic Plan", note: "Save 10%", price: "90", features: ["Logo Design","1 Page Website","Responsive Design","WordPress Setup","Free SSL","Free Hosting (1 Year / Without cPanel)","Domain Registration (.com / .xyz / .pro)","Free Business Email"] },
      { name: "Standard Plan", note: "Save 15%", price: "140", features: ["Logo Design","5 Pages Website","Responsive & UX Design","WordPress Setup","Free SSL","Free Hosting (1 Year / Without cPanel)","Domain Registration (.com / .pk)","Free Business Email"] },
      { name: "Premium Plan", note: "Save 20%", price: "190", features: ["Logo Design","15 Pages Website","Premium UX/UI Design","WordPress Setup","Free SSL","Free Hosting (1 Year / Without cPanel)","Domain Registration (.com / .net / .org / .edu)","Free Business Email"] },
    ]),
  },
  {
    slug: "shopify-store",
    title: "Shopify Store",
    heading: "Shopify Store",
    metaTitle: "Shopify Store Development — NFS Tech",
    metaDesc: "Fully functional Shopify stores built to boost sales, engage customers, and grow your brand.",
    intro: "We create fully functional Shopify stores that are designed to boost sales, engage customers, and grow your brand online. Whether you're a startup, small business, or established brand, we provide end-to-end Shopify solutions including store setup, custom design, product integration, payment gateway setup, and ongoing support.",
    pricingLabel: "Shopify Store Packages",
    plans: mark([
      { name: "Basic Plan", note: "Save 10%", price: "125", features: ["Logo Design","Up to 10 Products","Pre-built Shopify Theme Setup","Basic Store Customization","Payment Gateway Integration","Shipping & Tax Setup","Contact Form","Domain Registration (.com / .xyz / .pro)","7 Days Delivery"] },
      { name: "Standard Plan", note: "Save 15%", price: "250", features: ["Logo Design","Up to 50 Products","Custom Theme Design","Product & Category Setup","Payment & Shipping Setup","Basic SEO Optimization","Social Media Integration","Newsletter / Email Integration","Domain Registration (.com / .pk)","14 Days Delivery"] },
      { name: "Premium Plan", note: "Save 20%", price: "465", features: ["Logo Design","Unlimited Products","Fully Custom Shopify Theme","Advanced Features (Discounts, Loyalty, Wishlist)","Payment Gateway & Shipping Rules","App Integrations (Marketing, Analytics, Chatbots)","SEO & Speed Optimization","Social Media & Email Marketing Integration","Domain Registration (.com / .net / .org / .edu)","21 Days Delivery"] },
    ]),
  },
  {
    slug: "app-development",
    title: "App Development",
    heading: "Mobile App Development",
    metaTitle: "Mobile App Development — NFS Tech",
    metaDesc: "Powerful, user-friendly, scalable mobile apps for Android and iOS tailored to your goals.",
    intro: "We provide professional mobile app development services designed to help businesses connect with customers anytime, anywhere. From startup ideas to full-scale business applications, we build powerful, user-friendly, and scalable mobile apps tailored to your goals.",
    pricingLabel: "Mobile App Development Packages",
    plans: mark([
      { name: "Basic Plan", note: "Save 10%", price: "430", features: ["Android App (Single Platform)","Basic UI/UX Design","Contact / Inquiry Form","Social Media Integration","Push Notifications","Basic Admin Panel","15 Days Delivery"] },
      { name: "Standard Plan", note: "Save 15%", price: "895", features: ["Android + iOS (Cross-Platform)","Custom UI/UX Design","User Registration / Login System","API Integration","Push Notifications","Admin Dashboard","Google Analytics / Firebase Integration","25 Days Delivery"] },
      { name: "Premium Plan", note: "Save 20%", price: "1610", features: ["Android + iOS (Cross-Platform)","Advanced Custom UI/UX","Payment Gateway Integration","eCommerce / Booking System","Real-Time Notifications","Advanced Admin Panel","API & Third-Party Integrations","Performance & Security Optimization","40 Days Delivery"] },
    ]),
  },
  {
    slug: "software-development",
    title: "Software Development",
    heading: "Software Development",
    metaTitle: "Custom Software Development — NFS Tech",
    metaDesc: "Custom software development to streamline operations, improve efficiency and accelerate growth.",
    intro: "We provide custom software development services designed to streamline operations, improve efficiency, and accelerate business growth. Our solutions are tailored to meet specific business requirements, ensuring scalability, security, and long-term performance.",
    pricingLabel: "Software Development Packages",
    plans: mark([
      { name: "Basic Plan", note: "Save 10%", price: "650", features: ["Custom Web-Based Software","Up to 5 Core Modules","Basic Admin Panel","User Login System","Dashboard Overview","Basic Reporting","Database Setup","20 Days Delivery"] },
      { name: "Standard Plan", note: "Save 15%", price: "1250", features: ["Custom Web-Based Software","Up to 10 Modules","Advanced Admin Dashboard","Role-Based Access Control","Advanced Reports & Analytics","API Integration","Security Optimization","35 Days Delivery"] },
      { name: "Premium Plan", note: "Save 20%", price: "2325", features: ["Fully Custom Software Solution","Unlimited Modules","Advanced User Roles & Permissions","ERP / CRM Integration","Third-Party API Integrations","Automation Features","Advanced Security & Data Protection","Performance Optimization","Dedicated Project Consultation","60 Days Delivery"] },
    ]),
  },
  {
    slug: "e-commerce-store",
    title: "E-Commerce Store",
    heading: "E-Commerce Store",
    metaTitle: "E-Commerce Store Development — NFS Tech",
    metaDesc: "Powerful eCommerce stores that help businesses sell products online and increase conversions.",
    intro: "We design and develop powerful eCommerce stores that help businesses sell products online effortlessly. Our stores are built to provide an amazing shopping experience, increase conversions, and grow your brand.",
    pricingLabel: "E-commerce Store Packages",
    plans: mark([
      { name: "Basic Plan", note: "Save 10%", price: "90", features: ["Logo Design","1 Page Website","Responsive Design","WordPress Setup","Free SSL","Free Hosting (1 Year / Without cPanel)","Domain Registration (.com / .xyz / .pro)","Free Business Email"] },
      { name: "Standard Plan", note: "Save 15%", price: "140", features: ["Logo Design","5 Pages Website","Responsive & UX Design","WordPress Setup","Free SSL","Free Hosting (1 Year / Without cPanel)","Domain Registration (.com / .pk)","Free Business Email"] },
      { name: "Premium Plan", note: "Save 20%", price: "190", features: ["Logo Design","15 Pages Website","Premium UX/UI Design","WordPress Setup","Free SSL","Free Hosting (1 Year / Without cPanel)","Domain Registration (.com / .net / .org / .edu)","Free Business Email"] },
    ]),
  },
  {
    slug: "seo",
    title: "SEO",
    heading: "SEO — Search Engine Optimization",
    metaTitle: "SEO Services — NFS Tech",
    metaDesc: "Boost visibility, attract organic traffic, and increase revenue with professional SEO services.",
    intro: "We provide professional SEO services designed to boost your website's visibility, attract more organic traffic, and increase your business revenue. Our strategies include on-page optimization, keyword research, content optimization, link building, and technical SEO, ensuring your website ranks higher on search engines like Google.",
    pricingLabel: "SEO Packages",
    priceSuffix: "/monthly",
    plans: mark([
      { name: "Basic Plan", note: "Save 10%", price: "180", features: ["On-Page SEO Optimization","Keyword Research (10 Keywords)","Meta Tags & Title Optimization","Basic Content Optimization","Google Search Console Setup","Monthly Performance Report","1 Month SEO Management"] },
      { name: "Standard Plan", note: "Save 15%", price: "325", features: ["Advanced On-Page SEO","Keyword Research (25 Keywords)","Competitor Analysis","Content Optimization","Backlink Building (Basic)","Google Analytics Setup","Monthly Performance Report","1 Month SEO Management"] },
      { name: "Premium Plan", note: "Save 20%", price: "540", features: ["Complete SEO Optimization","Keyword Research (50+ Keywords)","Advanced Backlink Strategy","Technical SEO Audit","Content Strategy & Blog Writing","Conversion Rate Optimization","Detailed Monthly Report","1 Month SEO Management"] },
    ]),
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    heading: "Digital Marketing",
    metaTitle: "Digital Marketing Services — NFS Tech",
    metaDesc: "Data-driven digital marketing that drives traffic, generates leads, and increases sales.",
    intro: "We provide comprehensive digital marketing services tailored to help your business grow online. From SEO and social media marketing to paid ads, email campaigns, and content marketing, we create strategies that drive traffic, generate leads, and increase sales.",
    pricingLabel: "Digital Marketing Packages",
    priceSuffix: "/monthly",
    plans: mark([
      { name: "Basic Plan", note: "Save 10%", price: "215", features: ["SEO Basics","Social Media (2 Platforms)","8 Posts / Month","Basic Ad Setup","Monthly Report","1 Month Management"] },
      { name: "Standard Plan", note: "Save 15%", price: "395", features: ["SEO + On-page Optimization","Social Media (3 Platforms)","12 Posts / Month","Google & Meta Ads Setup","Content Strategy","Detailed Monthly Report","1 Month Management"] },
      { name: "Premium Plan", note: "Save 20%", price: "720", features: ["Full-Funnel Strategy","SEO + Content Marketing","4 Platforms Management","20 Posts / Month","Advanced Ad Campaigns","Email Marketing Setup","Analytics & ROI Report","1 Month Management"] },
    ]),
  },
  {
    slug: "google-ads",
    title: "Google Ads",
    heading: "Google Ads Management",
    metaTitle: "Google Ads Management — NFS Tech",
    metaDesc: "Result-driven Google Ads management to generate high-quality leads, traffic, and sales.",
    intro: "We provide result-driven Google Ads management services designed to generate high-quality leads, increase website traffic, and boost sales. Our team creates targeted campaigns using advanced keyword research, competitor analysis, and conversion tracking to ensure your ads reach the right audience at the right time.",
    pricingLabel: "Google Ads Packages",
    priceSuffix: "/monthly",
    plans: mark([
      { name: "Basic Plan", note: "Save 10%", price: "110", features: ["1 Search Campaign Setup","Keyword Research (10–15 Keywords)","Ad Copy Creation","Basic Conversion Tracking","Campaign Monitoring","Monthly Performance Report","1 Month Management"] },
      { name: "Standard Plan", note: "Save 15%", price: "215", features: ["Up to 3 Campaigns","Advanced Keyword Research","Ad Copy Variations (A/B Testing)","Conversion & Analytics Setup","Competitor Analysis","Ongoing Optimization","Detailed Monthly Report","1 Month Management"] },
      { name: "Premium Plan", note: "Save 20%", price: "360", features: ["Multiple Campaigns","Advanced Keyword & Market Research","Conversion Tracking & Remarketing Setup","Full Funnel Strategy","Advanced Bid Optimization","Weekly Performance Monitoring","Detailed Analytics & ROI Report","1 Month Management"] },
    ]),
  },
  {
    slug: "meta-ads",
    title: "Meta Ads",
    heading: "Meta Ads Management",
    metaTitle: "Meta Ads Management — NFS Tech",
    metaDesc: "Highly targeted Facebook & Instagram advertising to generate leads and grow brand awareness.",
    intro: "We provide professional Meta Ads management services to help your business generate leads, increase sales, and grow brand awareness through highly targeted Facebook and Instagram advertising. Our campaigns are strategically designed to reach the right audience, optimize ad performance, and maximize your return on investment (ROI).",
    pricingLabel: "Meta Ads Packages",
    priceSuffix: "/monthly",
    plans: mark([
      { name: "Basic Plan", note: "Save 10%", price: "95", features: ["1 Ad Campaign Setup","Audience Research","Basic Ad Creatives","Pixel Setup","Campaign Monitoring","Monthly Report","1 Month Management"] },
      { name: "Standard Plan", note: "Save 15%", price: "180", features: ["Up to 3 Campaigns","Advanced Audience Research","Multiple Ad Creatives","A/B Testing","Conversion Tracking","Ongoing Optimization","Detailed Monthly Report","1 Month Management"] },
      { name: "Premium Plan", note: "Save 20%", price: "320", features: ["Multiple Campaigns","Advanced Audience & Lookalike","Premium Creatives & Reels","Full Funnel Strategy","Retargeting Setup","Weekly Optimization","Detailed Analytics & ROI Report","1 Month Management"] },
    ]),
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    heading: "Social Media Marketing",
    metaTitle: "Social Media Marketing — NFS Tech",
    metaDesc: "Strategic social media marketing to grow your brand, engagement, and real business results.",
    intro: "We provide strategic Social Media Marketing services designed to grow your brand, increase engagement, and generate real business results. Our approach focuses on creating high-quality content, building a strong online presence, and connecting your brand with the right audience across platforms like Facebook, Instagram, LinkedIn, and more.",
    pricingLabel: "Social Media Management Packages",
    priceSuffix: "/monthly",
    plans: mark([
      { name: "Basic Plan", note: "Save 10%", price: "72", features: ["2 Platforms (Facebook & Instagram)","8 Posts per Month","Basic Graphic Design","Caption Writing","Hashtag Research","Monthly Report","1 Month Management"] },
      { name: "Standard Plan", note: "Save 15%", price: "144", features: ["3 Platforms Management","12 Posts per Month","Professional Graphic Design","Caption & Hashtag Strategy","Story Posting (8 per month)","Audience Engagement","Monthly Performance Report","1 Month Management"] },
      { name: "Premium Plan", note: "Save 20%", price: "250", features: ["3–4 Platforms Management","20 Posts per Month","Premium Graphics & Reels Content","Advanced Content Strategy","Daily Story Posting","Audience Engagement & Community Management","Competitor Analysis","Detailed Analytics & Growth Report","1 Month Management"] },
    ]),
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    heading: "Graphic Design",
    metaTitle: "Graphic Design Services — NFS Tech",
    metaDesc: "High-impact, professional graphic design that helps your brand communicate with clarity.",
    intro: "We deliver high-impact, professional graphic design solutions that help your brand communicate with clarity, confidence, and creativity. In today's competitive market, strong visuals are essential — and we design graphics that not only look stunning but also align perfectly with your brand identity and business goals.",
    pricingLabel: "Graphic Design Packages",
    plans: mark([
      { name: "Basic Plan", note: "Save 10%", price: "60", features: ["Logo Design (2 Concepts)","Business Card Design","Social Media Post (3 Designs)","Basic Brand Colors","2 Revisions","3 Days Delivery"] },
      { name: "Standard Plan", note: "Save 15%", price: "120", features: ["Logo Design (5 Concepts)","Business Card + Letterhead","Social Media Kit (10 Designs)","Brand Color Palette","5 Revisions","7 Days Delivery"] },
      { name: "Premium Plan", note: "Save 20%", price: "220", features: ["Complete Brand Identity","Logo + Full Stationery","Social Media Kit (20 Designs)","Brand Guidelines","Unlimited Revisions","14 Days Delivery"] },
    ]),
  },
  {
    slug: "domain-hosting",
    title: "Domain & Hosting",
    heading: "Domain & Hosting",
    metaTitle: "Domain & Hosting — NFS Tech",
    metaDesc: "Reliable, secure domain registration and web hosting for websites that run smoothly 24/7.",
    intro: "We provide reliable and secure domain registration and web hosting services to ensure your website runs smoothly, loads fast, and stays online 24/7. From registering your brand's domain name to setting up high-performance hosting, we handle everything so you can focus on growing your business.",
    pricingLabel: "Domain & Hosting Packages",
    priceSuffix: "/yearly",
    plans: mark([
      { name: "Basic Plan", note: "Save 10%", price: "35", features: ["1 Domain Registration (.com)","5 GB SSD Hosting","Free SSL Certificate","5 Business Emails","24/7 Support"] },
      { name: "Standard Plan", note: "Save 15%", price: "75", features: ["1 Domain Registration (.com / .pk)","20 GB SSD Hosting","Free SSL Certificate","Unlimited Business Emails","Daily Backups","24/7 Priority Support"] },
      { name: "Premium Plan", note: "Save 20%", price: "150", features: ["1 Domain Registration (.com / .net / .org)","100 GB SSD Hosting","Free SSL Certificate","Unlimited Business Emails","Daily Backups","CDN Integration","24/7 Priority Support"] },
    ]),
  },
];

export const getService = (slug: string) => services.find(s => s.slug === slug);
