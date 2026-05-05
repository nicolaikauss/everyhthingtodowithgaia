import { z } from "zod";

/** Brand asset paths — replace files under public/brand/ as needed (see public/brand/README.txt). */
export const brandAssets = z
  .object({
    capitalMarkLight: z.string(),
    capitalMarkDark: z.string(),
    labsMarkLight: z.string(),
    labsMarkDark: z.string()
  })
  .parse({
    capitalMarkLight: "/brand/gaia-capital-mark-light-v3.png",
    capitalMarkDark: "/brand/gaia-capital-mark-dark.png",
    labsMarkLight: "/brand/gaia-labs-mark-light-v2.png",
    labsMarkDark: "/brand/gaia-labs-mark-dark.png"
  });

export const capabilitiesByEntity = z
  .object({
    capital: z.array(z.string()),
    labs: z.array(z.string())
  })
  .parse({
    capital: [
      "Real estate investment & acquisitions",
      "Deal structuring & financing",
      "Asset repositioning & value creation",
      "Capital partnerships & co-investment",
      "Portfolio management"
    ],
    labs: [
      "Internal tools & automation systems",
      "Data analysis & opportunity sourcing",
      "Operational optimization platforms",
      "Digital product development",
      "Tech-enabled investment workflows"
    ]
  });

const sectorBaseSchema = z.object({
  num: z.string(),
  slug: z.string(),
  name: z.string(),
  tag: z.string(),
  lede: z.string(),
  capabilities: z.array(z.string())
});

const capitalSectorSchema = sectorBaseSchema.extend({
  subsidiary: z.literal(false)
});

const labsSectorSchema = sectorBaseSchema.extend({
  subsidiary: z.literal(true),
  logoSrc: z.string()
});

const sectorSchema = z.discriminatedUnion("subsidiary", [capitalSectorSchema, labsSectorSchema]);

export type Sector = z.infer<typeof sectorSchema>;

/** Portfolio page + shared sector facts */
export const sectors: Sector[] = sectorSchema.array().parse([
  {
    num: "01",
    slug: "real-estate",
    name: "Real estate",
    tag: "Capital · Real estate",
    lede:
      "Acquisition, repositioning, and portfolio-level judgment across real assets — where capital meets operational reality.",
    capabilities: [
      "Real estate investment & acquisitions",
      "Asset repositioning & value creation",
      "Portfolio management"
    ],
    subsidiary: false
  },
  {
    num: "02",
    slug: "financing",
    name: "Financing",
    tag: "Capital · Financing",
    lede:
      "Structuring and funding strategies for acquisitions and growth — built for clarity, durability, and aligned incentives.",
    capabilities: ["Deal structuring & financing", "Capital partnerships & co-investment", "Portfolio management"],
    subsidiary: false
  },
  {
    num: "03",
    slug: "gaia-labs",
    name: "Gaia Labs",
    tag: "Subsidiary · Technology",
    lede:
      "Separate subsidiary. Technology and digital product development under its own mandate — tools, products, and systems built for speed and precision.",
    capabilities: [...capabilitiesByEntity.labs],
    subsidiary: true,
    logoSrc: brandAssets.labsMarkLight
  }
]);

/** Keys resolved to lucide icons inside client `BentoGrid` only (RSC-safe). */
export const bentoIconKeys = ["building2", "landmark", "sparkles", "layers", "cpu"] as const;
export type BentoIconKey = (typeof bentoIconKeys)[number];

export type BentoSeedItem = {
  id: string;
  title: string;
  description: string;
  iconKey: BentoIconKey;
  status?: string;
  tags?: string[];
  meta?: string;
  cta?: string;
  href?: string;
  colSpan?: 1 | 2 | 3;
  hasPersistentHover?: boolean;
  logoSrc?: string;
};

function sectorBySlug(slug: string): Sector {
  const s = sectors.find((x) => x.slug === slug);
  if (!s) {
    throw new Error(`Unknown sector slug: ${slug}`);
  }
  return s;
}

export const portfolioBentoSeeds: BentoSeedItem[] = (() => {
  const re = sectorBySlug("real-estate");
  const fin = sectorBySlug("financing");
  const labs = sectorBySlug("gaia-labs");
  if (labs.subsidiary !== true) {
    throw new Error("Expected gaia-labs to be subsidiary sector");
  }
  return [
    {
      id: `portfolio-${re.slug}`,
      title: re.name,
      description: re.lede,
      iconKey: "building2",
      meta: re.num,
      status: "Capital",
      tags: [...re.capabilities],
      cta: "Scroll to sector",
      href: `#portfolio-${re.slug}`,
      colSpan: 2
    },
    {
      id: `portfolio-${fin.slug}`,
      title: fin.name,
      description: fin.lede,
      iconKey: "landmark",
      meta: fin.num,
      status: "Capital",
      tags: [...fin.capabilities],
      cta: "Scroll to sector",
      href: `#portfolio-${fin.slug}`,
      colSpan: 1
    },
    {
      id: `portfolio-${labs.slug}`,
      title: labs.name,
      description: labs.lede,
      iconKey: "sparkles",
      meta: labs.num,
      status: "Subsidiary",
      tags: [...labs.capabilities],
      logoSrc: labs.logoSrc,
      cta: "Learn more",
      href: `#portfolio-${labs.slug}`,
      colSpan: 3,
      hasPersistentHover: true
    }
  ];
})();

export const homeCopy = z
  .object({
    heroEyebrow: z.string(),
    heroHeadline: z.string(),
    heroSub: z.string(),
    heroPrimaryCta: z.object({ label: z.string(), href: z.string() }),
    heroSecondaryCta: z.object({ label: z.string(), href: z.string() }),
    heroImage: z.string().min(1),
    preHeroCaption: z.string(),
    preHeroLogoAlt: z.string()
  })
  .parse({
    heroEyebrow: "Real estate · Financing · Technology",
    heroHeadline: "Where capital gets built.",
    heroSub:
      "Gaia Capital invests in real estate and financing. Gaia Labs, a separate subsidiary, builds technology — three sectors, one parent firm.",
    heroPrimaryCta: { label: "View portfolio", href: "/portfolio" },
    heroSecondaryCta: { label: "Begin a conversation", href: "/#contact" },
    heroImage:
      "https://images.unsplash.com/photo-1759490902867-15cf6d82ab7e?auto=format&fit=crop&w=2200&q=80",
    preHeroCaption: "Real Estate · Financing · Technology",
    preHeroLogoAlt: "Gaia Capital"
  });

/** Re-export for backward compatibility — hero background URL lives in site content. */
export const HOME_HERO_BACKGROUND_IMAGE = homeCopy.heroImage;

export const portfolioCopy = z
  .object({
    eyebrow: z.string(),
    title: z.string(),
    lede: z.string()
  })
  .parse({
    eyebrow: "02 — Portfolio",
    title: "Three sectors of activity",
    lede:
      "Real estate and financing under Gaia Capital. Technology and digital products under Gaia Labs, a separate subsidiary. One parent firm."
  });

export const aboutCopy = z
  .object({
    eyebrow: z.string(),
    title: z.string(),
    lede: z.string(),
    introLead: z.string(),
    introSecondary: z.string(),
    orgCaption: z.string(),
    capitalLogoAlt: z.string(),
    labsLogoAlt: z.string()
  })
  .parse({
    eyebrow: "03 — About",
    title: "One parent firm. Three sectors.",
    lede:
      "Gaia Capital invests across real estate and financing. Gaia Labs is a separate technology subsidiary — parallel mandates under one structure.",
    introLead:
      "We operate with an execution posture — capital deployed with discipline, and technology built where it earns its place.",
    introSecondary:
      "This site reflects Gaia Capital as the parent firm. Gaia Labs has its own mandate and identity — mentioned here only as part of our structure, not as the headline.",
    orgCaption: "Parent firm · Separate subsidiary",
    capitalLogoAlt: "Gaia Capital",
    labsLogoAlt: "Gaia Labs"
  });

export const contactCopy = z
  .object({
    mailSubjectFallback: z.string(),
    eyebrow: z.string(),
    title: z.string(),
    body: z.string(),
    primaryButton: z.string(),
    secondaryLink: z.string(),
    footnote: z.string(),
    panelEyebrow: z.string(),
    labels: z.object({
      name: z.string(),
      email: z.string(),
      message: z.string()
    }),
    placeholders: z.object({
      name: z.string(),
      email: z.string(),
      message: z.string()
    }),
    submit: z.string(),
    submitHint: z.string()
  })
  .parse({
    mailSubjectFallback: "Private inquiry — Gaia Capital",
    eyebrow: "Contact",
    title: "Begin a Private Conversation",
    body:
      "We review inquiries with care. If your mandate aligns with our sectors and posture, we will continue the conversation in confidence.",
    primaryButton: "Contact Gaia Capital",
    secondaryLink: "View portfolio",
    footnote: "All inquiries are treated with discretion.",
    panelEyebrow: "Inquiry",
    labels: { name: "Name", email: "Email", message: "Message" },
    placeholders: {
      name: "Your name",
      email: "name@domain.com",
      message: "Share context in confidence."
    },
    submit: "Send via email",
    submitHint: "Opens your mail client — no data is stored on this page."
  });

export const footerCopy = z
  .object({
    tagline: z.string(),
    exploreLabel: z.string(),
    firmLabel: z.string(),
    discretionLabel: z.string(),
    discretionBody: z.string(),
    discretionMeta: z.string(),
    links: z.object({
      portfolio: z.string(),
      about: z.string(),
      contact: z.string()
    }),
    subsidiaryLabel: z.string(),
    bottomLinks: z.object({
      conversation: z.string(),
      whyGaia: z.string()
    }),
    labsLogoAlt: z.string(),
    capitalLogoAlt: z.string(),
    labsHref: z.string()
  })
  .parse({
    tagline: "Real estate, financing, and a technology subsidiary.",
    exploreLabel: "Explore",
    firmLabel: "Firm",
    discretionLabel: "Discretion",
    discretionBody:
      "Conversations are handled with care. This site is a quiet introduction — not a substitute for a private briefing.",
    discretionMeta: "Investment & technology perspective",
    links: { portfolio: "Portfolio", about: "About", contact: "Contact" },
    subsidiaryLabel: "Subsidiary",
    bottomLinks: { conversation: "Begin a conversation", whyGaia: "Why Gaia" },
    labsLogoAlt: "Gaia Labs",
    capitalLogoAlt: "Gaia Capital",
    labsHref: "/portfolio#portfolio-gaia-labs"
  });

export const ctaCopy = z
  .object({
    eyebrow: z.string(),
    title: z.string(),
    body: z.string(),
    primary: z.string(),
    secondary: z.string()
  })
  .parse({
    eyebrow: "Next step",
    title: "Begin in confidence",
    body: "If the fit is right, we will continue the conversation with discretion and care.",
    primary: "Open the contact form",
    secondary: "Return home"
  });

export const positioningIntroCopy = z
  .object({
    srHeading: z.string(),
    eyebrow: z.string(),
    title: z.string(),
    body: z.string()
  })
  .parse({
    srHeading: "Positioning and offerings",
    eyebrow: "Positioning",
    title: "Real estate, financing, and technology — one parent firm.",
    body:
      "Gaia Capital holds real estate and financing. Gaia Labs is a separate subsidiary focused on technology and digital products — parallel mandates, clear structure."
  });

/** Horizontal scrub section — four panels; layout unchanged in component */
export const positioningOffers = z
  .array(
    z.object({
      num: z.string(),
      title: z.string(),
      text: z.string()
    })
  )
  .parse([
    {
      num: "01",
      title: "Real\nestate",
      text:
        "Investment and ownership across real assets — acquisitions, repositioning, and portfolio discipline grounded in long-term value."
    },
    {
      num: "02",
      title: "Financing",
      text:
        "Capital structuring and funding strategies aligned with risk, governance, and the timeline of the underlying opportunity."
    },
    {
      num: "03",
      title: "Gaia\nLabs",
      text:
        "A separate subsidiary focused on technology — digital tools, products, and internal systems. Distinct mandate; same parent firm."
    },
    {
      num: "04",
      title: "How we\noperate",
      text:
        "Execution-led and long-term: we deploy capital and build systems — not slide decks. Judgment, process, and accountability stay in the same room."
    }
  ]);

export const whyGaiaSectionCopy = z
  .object({
    label: z.string(),
    title: z.string(),
    text: z.string()
  })
  .parse({
    label: "Why Gaia",
    title: "Built For Substance",
    text:
      "Three sectors under one parent structure — real estate, financing, and technology — with the posture of an operator, not a brochure."
  });

export const differentiators = z
  .array(z.object({ headline: z.string(), text: z.string() }))
  .parse([
    {
      headline: "Three sectors of activity",
      text:
        "Real estate investment and asset repositioning, structuring and financing for acquisitions and growth, and technology built where it earns its place — three mandates under one parent firm."
    },
    {
      headline: "Execution-driven",
      text:
        "We deploy capital and operate with accountability — supported by systems, data, and automation where they sharpen decisions (not where they replace judgment)."
    },
    {
      headline: "Long-term mindset",
      text:
        "We prioritize durability and downside awareness over short-term theater — built for outcomes measured in years, not quarters."
    }
  ]);

export const aboutPillars = z.array(z.object({ text: z.string() })).parse([
  {
    text:
      "Gaia Capital invests and allocates across real estate and financing — with structuring discipline and portfolio-level judgment."
  },
  {
    text:
      "Gaia Labs is a subsidiary with its own mandate: technology, digital products, and operational tooling — parallel to Capital, not a substitute for it."
  },
  {
    text:
      "Together, the structure reflects how we work: capital discipline on one side, technical execution on the other — one parent firm, clear boundaries."
  }
]);

export const aboutBentoSeeds: BentoSeedItem[] = [
  {
    id: "about-pillar-capital",
    title: "Capital side",
    description: aboutPillars[0]!.text,
    iconKey: "landmark",
    meta: "01",
    status: "Gaia Capital",
    tags: ["Real estate", "Financing"],
    colSpan: 1,
    cta: "Portfolio",
    href: "/portfolio"
  },
  {
    id: "about-pillar-labs",
    title: "Technology side",
    description: aboutPillars[1]!.text,
    iconKey: "cpu",
    meta: "02",
    status: "Gaia Labs",
    tags: ["Subsidiary", "Products"],
    colSpan: 1,
    cta: "Subsidiary",
    href: "/portfolio#portfolio-gaia-labs"
  },
  {
    id: "about-pillar-structure",
    title: "Clear boundaries",
    description: aboutPillars[2]!.text,
    iconKey: "layers",
    meta: "03",
    status: "Structure",
    tags: ["Governance", "Mandate"],
    colSpan: 1,
    cta: "Why Gaia",
    href: "/#why-gaia"
  },
  {
    id: "about-structure-recap",
    title: "One parent firm — three sectors",
    description:
      "Gaia Capital on real estate and financing; Gaia Labs as a separate subsidiary for technology and digital products. Same ownership signal, distinct operating mandates.",
    iconKey: "sparkles",
    meta: "Structure",
    status: "Parent firm · Subsidiary",
    tags: ["Capital", "Labs", "Portfolio"],
    colSpan: 3,
    hasPersistentHover: true,
    cta: "View portfolio",
    href: "/portfolio"
  }
];
