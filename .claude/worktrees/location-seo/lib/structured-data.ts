/**
 * Schema.org Structured Data for Arena Boxing
 * Improves SEO and rich snippets in search results
 */

export interface StructuredDataProps {
  url?: string;
  title?: string;
  description?: string;
  image?: string;
}

/**
 * Organization Schema - Main business entity
 */
export function getOrganizationSchema(baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    '@id': `${baseUrl}#organization`,
    name: 'Arena Boxing Bondi',
    alternateName: 'Arena Boxing',
    url: baseUrl,
    logo: `${baseUrl}/images/icon/icon-cream.svg`,
    image: `${baseUrl}/images/og-image.jpg`,
    description: "Bondi's premier combat sports experience. Gothic fight culture meets boutique boxing. Those who dare, enter the arena.",
    slogan: 'Those Who Dare',

    // Contact Information
    telephone: '+61-2-XXXX-XXXX', // TODO: Add real phone number
    email: 'info@arenaboxing.com.au',

    // Address
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Campbell Parade', // TODO: Add real address
      addressLocality: 'Bondi Beach',
      addressRegion: 'NSW',
      postalCode: '2026',
      addressCountry: 'AU',
    },

    // Geographic coordinates
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -33.890542, // TODO: Add real coordinates
      longitude: 151.274856,
    },

    // Opening Hours
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '06:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],

    // Price Range
    priceRange: '$$',

    // Social Media
    sameAs: [
      'https://www.instagram.com/arenaboxing',
      'https://www.facebook.com/arenaboxing',
      // Add more social profiles
    ],

    // Services Offered
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Boxing Classes',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'WORK - High-Intensity Boxing',
            description: '10 brutal rounds. No mercy. No excuses. High-intensity conditioning that builds the engine.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'CRAFT - Technical Boxing',
            description: 'Precision. Form. The sweet science. Technical mastery through focused pad work and combination drills.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SPAR - Sparring Sessions',
            description: 'Controlled sparring sessions with experienced coaches. Advanced level only.',
          },
        },
      ],
    },
  };
}

/**
 * Local Business Schema for better local SEO
 */
export function getLocalBusinessSchema(baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ExerciseGym',
    '@id': `${baseUrl}#gym`,
    name: 'Arena Boxing Bondi',
    url: baseUrl,
    image: `${baseUrl}/images/og-image.jpg`,
    description: "Bondi's premier boutique boxing gym. Gothic fight culture meets high-intensity training.",

    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Campbell Parade',
      addressLocality: 'Bondi Beach',
      addressRegion: 'NSW',
      postalCode: '2026',
      addressCountry: 'AU',
    },

    geo: {
      '@type': 'GeoCoordinates',
      latitude: -33.890542,
      longitude: 151.274856,
    },

    telephone: '+61-2-XXXX-XXXX',
    priceRange: '$$',

    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Boxing Rings',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Heavy Bags',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Speed Bags',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Changing Rooms',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Showers',
        value: true,
      },
    ],
  };
}

/**
 * WebSite Schema for site search and navigation
 */
export function getWebSiteSchema(baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}#website`,
    url: baseUrl,
    name: 'Arena Boxing Bondi',
    description: "Bondi's premier combat sports experience. Those who dare, enter the arena.",
    publisher: {
      '@id': `${baseUrl}#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Breadcrumb Schema for page hierarchy
 */
export function getBreadcrumbSchema(baseUrl: string, items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}

/**
 * Service Schema for individual class types
 */
export function getServiceSchema(baseUrl: string, classType: 'work' | 'craft' | 'spar') {
  const services = {
    work: {
      name: 'WORK - High-Intensity Boxing',
      description: '10 brutal rounds. No mercy. No excuses. High-intensity conditioning that builds the engine through heavy bag work, speed drills, and relentless rounds.',
    },
    craft: {
      name: 'CRAFT - Technical Boxing',
      description: 'Precision. Form. The sweet science. Technical mastery through focused pad work, combination drills, and footwork fundamentals.',
    },
    spar: {
      name: 'SPAR - Sparring Sessions',
      description: 'Controlled sparring sessions with experienced coaches. Light contact, full contact, and ring work. Advanced level only - requires coach approval.',
    },
  };

  const service = services[classType];

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Boxing Training',
    name: service.name,
    description: service.description,
    provider: {
      '@id': `${baseUrl}#organization`,
    },
    areaServed: {
      '@type': 'City',
      name: 'Sydney',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${baseUrl}/booking`,
      servicePhone: '+61-2-XXXX-XXXX',
    },
  };
}
