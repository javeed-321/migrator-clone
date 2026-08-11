mintlify-scrape section <url>
        │
        ▼
┌─────────────────────────────────────────────────────────────┐
│ scrapeSite()                                                │
│  1. htmlToHast(html)              HTML ──► HAST             │
│  2. detectFramework(hast)         <meta name="readme-deploy">│
│                                   └─► vendor = 'readme'      │
│  3. retrieveRootNavElement()      find sidebar element       │
│  4. retrieveNavItems(sidebar)     HAST ──► nested nav tree   │
│  5. iterateOverNavItems()         ──► flat URL list          │
│  6. split  external │ internal │ root                        │
│  7. scrapePageGroup()   ──┐  chunked + parallel              │
│  8. traverse(navItems)    │  rewrite links, drop dead pages  │
│  9. favicon/colors/logo/title (puppeteer for ReadMe logos)   │
│ 10. emit mint.json {name, logo, colors, navigation, tabs}    │
└───────────────────────────┼─────────────────────────────────┘
                            │  per page
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ scrapePage()                                                │
│  htmlToHast → removeHastComments → detectFramework          │
│  retrieveRootContent()   readme ─► <article class="rm-Article">│
│                                                             │
│  ══ ONE unified() PIPELINE ══                               │
│                                                             │
│  ┌ HAST cleanup ─────────────────────────────┐              │
│  │ removeBreaks · removeBreadCrumbs          │              │
│  │ removeTableOfContents · removeCopyButtons │              │
│  └───────────────────────────────────────────┘              │
│  ┌ component detection (still HAST) ─────────┐              │
│  │ createCard      createAccordion           │              │
│  │ createFrame     createCallout             │              │
│  │ createCardGroup createAccordionGroup      │              │
│  │ createCodeGroup createTabs                │              │
│  │   each → switch(vendor) → readmeScrapeX() │              │
│  └───────────────────────────────────────────┘              │
│  ┌ more HAST cleanup ────────────────────────┐              │
│  │ removeClassNames · removeEmptyParagraphs  │              │
│  └───────────────────────────────────────────┘              │
│                                                             │
│  ══ selectiveRehypeRemark()  HAST ──► MDAST ══              │
│     hast-util-to-mdast + custom handlers that turn          │
│     component tagNames into mdxJsxFlowElement               │
│                                                             │
│  ┌ MDAST cleanup ────────────────────────────┐              │
│  │ convertHeaderLinksToText · removeNestedRoots│            │
│  │ spaceListsOut · removeBottomMetadata       │             │
│  │ removeUpdatedAt · formatEmphasis           │             │
│  │ removeCodeBlocksInCells                    │             │
│  └───────────────────────────────────────────┘              │
│                                                             │
│  downloadImagesFromFile()  ─► local assets                  │
│  getTitleFromHeading / getDescriptionFromRoot               │
│  remarkMdx + remarkGfm + remarkStringify ──► MDX string     │
│  writePage(url, title, description, mdx)                    │
└─────────────────────────────────────────────────────────────┘
