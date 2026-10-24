# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: seo.spec.ts >> seo >> sitemap contains only published content with hreflang
- Location: tests/e2e/seo.spec.ts:11:7

# Error details

```
Error: expect(received).not.toContain(expected) // indexOf

Expected substring: not "/guides/blue-card"
Received string:        "<?xml version=\"1.0\" encoding=\"UTF-8\"?>
<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:xhtml=\"http://www.w3.org/1999/xhtml\">
<url>
<loc>http://localhost:3200/tr</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr\" />
</url>
<url>
<loc>http://localhost:3200/de</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr\" />
</url>
<url>
<loc>http://localhost:3200/en</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr\" />
</url>
<url>
<loc>http://localhost:3200/tr/roadmap</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/roadmap\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/roadmap\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/roadmap\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/roadmap\" />
</url>
<url>
<loc>http://localhost:3200/de/roadmap</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/roadmap\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/roadmap\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/roadmap\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/roadmap\" />
</url>
<url>
<loc>http://localhost:3200/en/roadmap</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/roadmap\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/roadmap\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/roadmap\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/roadmap\" />
</url>
<url>
<loc>http://localhost:3200/tr/timeline</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/timeline\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/timeline\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/timeline\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/timeline\" />
</url>
<url>
<loc>http://localhost:3200/de/timeline</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/timeline\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/timeline\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/timeline\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/timeline\" />
</url>
<url>
<loc>http://localhost:3200/en/timeline</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/timeline\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/timeline\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/timeline\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/timeline\" />
</url>
<url>
<loc>http://localhost:3200/tr/glossary</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/glossary\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/glossary\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/glossary\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/glossary\" />
</url>
<url>
<loc>http://localhost:3200/de/glossary</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/glossary\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/glossary\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/glossary\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/glossary\" />
</url>
<url>
<loc>http://localhost:3200/en/glossary</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/glossary\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/glossary\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/glossary\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/glossary\" />
</url>
<url>
<loc>http://localhost:3200/tr/tools</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/tools\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/tools\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/tools\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/tools\" />
</url>
<url>
<loc>http://localhost:3200/de/tools</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/tools\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/tools\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/tools\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/tools\" />
</url>
<url>
<loc>http://localhost:3200/en/tools</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/tools\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/tools\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/tools\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/tools\" />
</url>
<url>
<loc>http://localhost:3200/tr/blog</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/blog\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/blog\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/blog\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/blog\" />
</url>
<url>
<loc>http://localhost:3200/de/blog</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/blog\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/blog\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/blog\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/blog\" />
</url>
<url>
<loc>http://localhost:3200/en/blog</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/blog\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/blog\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/blog\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/blog\" />
</url>
<url>
<loc>http://localhost:3200/tr/channels</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/channels\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/channels\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/channels\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/channels\" />
</url>
<url>
<loc>http://localhost:3200/de/channels</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/channels\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/channels\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/channels\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/channels\" />
</url>
<url>
<loc>http://localhost:3200/en/channels</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/channels\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/channels\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/channels\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/channels\" />
</url>
<url>
<loc>http://localhost:3200/tr/tools/lid</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/tools/lid\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/tools/lid\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/tools/lid\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/tools/lid\" />
</url>
<url>
<loc>http://localhost:3200/de/tools/lid</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/tools/lid\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/tools/lid\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/tools/lid\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/tools/lid\" />
</url>
<url>
<loc>http://localhost:3200/en/tools/lid</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/tools/lid\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/tools/lid\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/tools/lid\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/tools/lid\" />
</url>
<url>
<loc>http://localhost:3200/tr/tools/holidays</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/tools/holidays\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/tools/holidays\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/tools/holidays\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/tools/holidays\" />
</url>
<url>
<loc>http://localhost:3200/de/tools/holidays</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/tools/holidays\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/tools/holidays\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/tools/holidays\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/tools/holidays\" />
</url>
<url>
<loc>http://localhost:3200/en/tools/holidays</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/tools/holidays\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/tools/holidays\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/tools/holidays\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/tools/holidays\" />
</url>
<url>
<loc>http://localhost:3200/tr/tools/insurance-quiz</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/tools/insurance-quiz\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/tools/insurance-quiz\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/tools/insurance-quiz\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/tools/insurance-quiz\" />
</url>
<url>
<loc>http://localhost:3200/de/tools/insurance-quiz</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/tools/insurance-quiz\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/tools/insurance-quiz\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/tools/insurance-quiz\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/tools/insurance-quiz\" />
</url>
<url>
<loc>http://localhost:3200/en/tools/insurance-quiz</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/tools/insurance-quiz\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/tools/insurance-quiz\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/tools/insurance-quiz\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/tools/insurance-quiz\" />
</url>
<url>
<loc>http://localhost:3200/tr/tools/rental-application</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/tools/rental-application\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/tools/rental-application\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/tools/rental-application\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/tools/rental-application\" />
</url>
<url>
<loc>http://localhost:3200/de/tools/rental-application</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/tools/rental-application\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/tools/rental-application\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/tools/rental-application\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/tools/rental-application\" />
</url>
<url>
<loc>http://localhost:3200/en/tools/rental-application</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/tools/rental-application\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/tools/rental-application\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/tools/rental-application\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/tools/rental-application\" />
</url>
<url>
<loc>http://localhost:3200/tr/tools/letters</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/tools/letters\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/tools/letters\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/tools/letters\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/tools/letters\" />
</url>
<url>
<loc>http://localhost:3200/de/tools/letters</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/tools/letters\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/tools/letters\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/tools/letters\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/tools/letters\" />
</url>
<url>
<loc>http://localhost:3200/en/tools/letters</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/tools/letters\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/tools/letters\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/tools/letters\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/tools/letters\" />
</url>
<url>
<loc>http://localhost:3200/tr/tools/pdf</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/tools/pdf\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/tools/pdf\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/tools/pdf\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/tools/pdf\" />
</url>
<url>
<loc>http://localhost:3200/de/tools/pdf</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/tools/pdf\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/tools/pdf\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/tools/pdf\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/tools/pdf\" />
</url>
<url>
<loc>http://localhost:3200/en/tools/pdf</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/tools/pdf\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/tools/pdf\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/tools/pdf\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/tools/pdf\" />
</url>
<url>
<loc>http://localhost:3200/tr/about</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/about\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/about\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/about\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/about\" />
</url>
<url>
<loc>http://localhost:3200/de/about</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/about\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/about\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/about\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/about\" />
</url>
<url>
<loc>http://localhost:3200/en/about</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/about\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/about\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/about\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/about\" />
</url>
<url>
<loc>http://localhost:3200/tr/contact</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/contact\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/contact\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/contact\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/contact\" />
</url>
<url>
<loc>http://localhost:3200/de/contact</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/contact\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/contact\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/contact\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/contact\" />
</url>
<url>
<loc>http://localhost:3200/en/contact</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/contact\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/contact\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/contact\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/contact\" />
</url>
<url>
<loc>http://localhost:3200/tr/links</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/links\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/links\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/links\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/links\" />
</url>
<url>
<loc>http://localhost:3200/de/links</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/links\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/links\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/links\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/links\" />
</url>
<url>
<loc>http://localhost:3200/en/links</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/links\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/links\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/links\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/links\" />
</url>
<url>
<loc>http://localhost:3200/tr/impressum</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/impressum\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/impressum\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/impressum\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/impressum\" />
</url>
<url>
<loc>http://localhost:3200/de/impressum</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/impressum\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/impressum\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/impressum\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/impressum\" />
</url>
<url>
<loc>http://localhost:3200/en/impressum</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/impressum\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/impressum\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/impressum\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/impressum\" />
</url>
<url>
<loc>http://localhost:3200/tr/datenschutz</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/datenschutz\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/datenschutz\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/datenschutz\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/datenschutz\" />
</url>
<url>
<loc>http://localhost:3200/de/datenschutz</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/datenschutz\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/datenschutz\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/datenschutz\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/datenschutz\" />
</url>
<url>
<loc>http://localhost:3200/en/datenschutz</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/datenschutz\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/datenschutz\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/datenschutz\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/datenschutz\" />
</url>
<url>
<loc>http://localhost:3200/tr/haftungsausschluss</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/haftungsausschluss\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/haftungsausschluss\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/haftungsausschluss\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/haftungsausschluss\" />
</url>
<url>
<loc>http://localhost:3200/de/haftungsausschluss</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/haftungsausschluss\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/haftungsausschluss\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/haftungsausschluss\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/haftungsausschluss\" />
</url>
<url>
<loc>http://localhost:3200/en/haftungsausschluss</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/haftungsausschluss\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/haftungsausschluss\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/haftungsausschluss\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/haftungsausschluss\" />
</url>
<url>
<loc>http://localhost:3200/tr/modules/pre-arrival</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/modules/pre-arrival\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/modules/pre-arrival\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/modules/pre-arrival\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/modules/pre-arrival\" />
</url>
<url>
<loc>http://localhost:3200/de/modules/pre-arrival</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/modules/pre-arrival\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/modules/pre-arrival\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/modules/pre-arrival\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/modules/pre-arrival\" />
</url>
<url>
<loc>http://localhost:3200/en/modules/pre-arrival</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/modules/pre-arrival\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/modules/pre-arrival\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/modules/pre-arrival\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/modules/pre-arrival\" />
</url>
<url>
<loc>http://localhost:3200/tr/modules/health-insurance</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/modules/health-insurance\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/modules/health-insurance\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/modules/health-insurance\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/modules/health-insurance\" />
</url>
<url>
<loc>http://localhost:3200/de/modules/health-insurance</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/modules/health-insurance\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/modules/health-insurance\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/modules/health-insurance\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/modules/health-insurance\" />
</url>
<url>
<loc>http://localhost:3200/en/modules/health-insurance</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/modules/health-insurance\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/modules/health-insurance\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/modules/health-insurance\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/modules/health-insurance\" />
</url>
<url>
<loc>http://localhost:3200/tr/modules/language-exams</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/modules/language-exams\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/modules/language-exams\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/modules/language-exams\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/modules/language-exams\" />
</url>
<url>
<loc>http://localhost:3200/de/modules/language-exams</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/modules/language-exams\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/modules/language-exams\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/modules/language-exams\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/modules/language-exams\" />
</url>
<url>
<loc>http://localhost:3200/en/modules/language-exams</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/modules/language-exams\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/modules/language-exams\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/modules/language-exams\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/modules/language-exams\" />
</url>
<url>
<loc>http://localhost:3200/tr/modules/first-six-months</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/modules/first-six-months\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/modules/first-six-months\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/modules/first-six-months\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/modules/first-six-months\" />
</url>
<url>
<loc>http://localhost:3200/de/modules/first-six-months</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/modules/first-six-months\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/modules/first-six-months\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/modules/first-six-months\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/modules/first-six-months\" />
</url>
<url>
<loc>http://localhost:3200/en/modules/first-six-months</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/modules/first-six-months\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/modules/first-six-months\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/modules/first-six-months\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/modules/first-six-months\" />
</url>
<url>
<loc>http://localhost:3200/tr/modules/residence-citizenship</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/modules/residence-citizenship\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/modules/residence-citizenship\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/modules/residence-citizenship\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/modules/residence-citizenship\" />
</url>
<url>
<loc>http://localhost:3200/de/modules/residence-citizenship</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/modules/residence-citizenship\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/modules/residence-citizenship\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/modules/residence-citizenship\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/modules/residence-citizenship\" />
</url>
<url>
<loc>http://localhost:3200/en/modules/residence-citizenship</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/modules/residence-citizenship\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/modules/residence-citizenship\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/modules/residence-citizenship\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/modules/residence-citizenship\" />
</url>
<url>
<loc>http://localhost:3200/tr/modules/turkey-specific</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/modules/turkey-specific\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/modules/turkey-specific\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/modules/turkey-specific\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/modules/turkey-specific\" />
</url>
<url>
<loc>http://localhost:3200/de/modules/turkey-specific</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/modules/turkey-specific\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/modules/turkey-specific\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/modules/turkey-specific\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/modules/turkey-specific\" />
</url>
<url>
<loc>http://localhost:3200/en/modules/turkey-specific</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/modules/turkey-specific\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/modules/turkey-specific\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/modules/turkey-specific\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/modules/turkey-specific\" />
</url>
<url>
<loc>http://localhost:3200/tr/guides/ausbildung-basics</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/guides/ausbildung-basics\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/guides/ausbildung-basics\" />
<lastmod>2026-10-24T00:00:00.000Z</lastmod>
</url>
<url>
<loc>http://localhost:3200/tr/guides/opportunity-card</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/guides/opportunity-card\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/guides/opportunity-card\" />
<lastmod>2026-10-24T00:00:00.000Z</lastmod>
</url>
<url>
<loc>http://localhost:3200/tr/guides/life-in-germany-test</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/guides/life-in-germany-test\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/guides/life-in-germany-test\" />
<lastmod>2026-10-24T00:00:00.000Z</lastmod>
</url>
<url>
<loc>http://localhost:3200/tr/guides/work-visa-18b</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/guides/work-visa-18b\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/guides/work-visa-18b\" />
<lastmod>2026-10-24T00:00:00.000Z</lastmod>
</url>
<url>
<loc>http://localhost:3200/tr/guides/family-reunion-spouse</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/guides/family-reunion-spouse\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/guides/family-reunion-spouse\" />
<lastmod>2026-10-24T00:00:00.000Z</lastmod>
</url>
<url>
<loc>http://localhost:3200/tr/guides/integration-course-refund</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/guides/integration-course-refund\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/guides/integration-course-refund\" />
<lastmod>2026-10-24T00:00:00.000Z</lastmod>
</url>
<url>
<loc>http://localhost:3200/tr/guides/rundfunkbeitrag</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/guides/rundfunkbeitrag\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/guides/rundfunkbeitrag\" />
<lastmod>2026-10-24T00:00:00.000Z</lastmod>
</url>
<url>
<loc>http://localhost:3200/tr/guides/dual-citizenship-turkey</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/guides/dual-citizenship-turkey\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/guides/dual-citizenship-turkey\" />
<lastmod>2026-10-24T00:00:00.000Z</lastmod>
</url>
<url>
<loc>http://localhost:3200/tr/guides/turkish-documents-apostille</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/guides/turkish-documents-apostille\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/guides/turkish-documents-apostille\" />
<lastmod>2026-10-24T00:00:00.000Z</lastmod>
</url>
<url>
<loc>http://localhost:3200/tr/guides/blue-card-permanent-residence</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/guides/blue-card-permanent-residence\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/guides/blue-card-permanent-residence\" />
<lastmod>2026-10-24T00:00:00.000Z</lastmod>
</url>
<url>
<loc>http://localhost:3200/tr/guides/sworn-translation</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/guides/sworn-translation\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/guides/sworn-translation\" />
<lastmod>2026-10-24T00:00:00.000Z</lastmod>
</url>
<url>
<loc>http://localhost:3200/de/guides/anmeldung</loc>
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/guides/anmeldung\" />
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/guides/anmeldung\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/guides/anmeldung\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/guides/anmeldung\" />
<lastmod>2026-10-24T19:40:24.043Z</lastmod>
</url>
<url>
<loc>http://localhost:3200/tr/guides/anmeldung</loc>
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/guides/anmeldung\" />
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/guides/anmeldung\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/guides/anmeldung\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/guides/anmeldung\" />
<lastmod>2026-10-24T19:40:24.043Z</lastmod>
</url>
<url>
<loc>http://localhost:3200/en/guides/anmeldung</loc>
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/guides/anmeldung\" />
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/guides/anmeldung\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/guides/anmeldung\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/guides/anmeldung\" />
<lastmod>2026-10-24T19:40:24.043Z</lastmod>
</url>
<url>
<loc>http://localhost:3200/tr/guides/health-insurance-basics</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/guides/health-insurance-basics\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/guides/health-insurance-basics\" />
<lastmod>2026-10-24T00:00:00.000Z</lastmod>
</url>
<url>
<loc>http://localhost:3200/tr/guides/driving-licence-exchange</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/guides/driving-licence-exchange\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/guides/driving-licence-exchange\" />
<lastmod>2026-10-24T00:00:00.000Z</lastmod>
</url>
<url>
<loc>http://localhost:3200/tr/guides/housing-search</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/guides/housing-search\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/guides/housing-search\" />
<lastmod>2026-10-24T00:00:00.000Z</lastmod>
</url>
<url>
<loc>http://localhost:3200/tr/guides/naturalization-requirements</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/guides/naturalization-requirements\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/guides/naturalization-requirements\" />
<lastmod>2026-10-24T00:00:00.000Z</lastmod>
</url>
<url>
<loc>http://localhost:3200/tr/guides/permanent-residence-overview</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/guides/permanent-residence-overview\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/guides/permanent-residence-overview\" />
<lastmod>2026-10-24T00:00:00.000Z</lastmod>
</url>
<url>
<loc>http://localhost:3200/tr/guides/integration-course</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/guides/integration-course\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/guides/integration-course\" />
<lastmod>2026-10-24T00:00:00.000Z</lastmod>
</url>
<url>
<loc>http://localhost:3200/tr/guides/choose-krankenkasse</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/guides/choose-krankenkasse\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/guides/choose-krankenkasse\" />
<lastmod>2026-10-24T00:00:00.000Z</lastmod>
</url>
<url>
<loc>http://localhost:3200/tr/guides/doctors-and-emergencies</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/guides/doctors-and-emergencies\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/guides/doctors-and-emergencies\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/guides/doctors-and-emergencies\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/guides/doctors-and-emergencies\" />
<lastmod>2026-10-24T00:00:00.000Z</lastmod>
</url>
<url>
<loc>http://localhost:3200/de/guides/doctors-and-emergencies</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/guides/doctors-and-emergencies\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/guides/doctors-and-emergencies\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/guides/doctors-and-emergencies\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/guides/doctors-and-emergencies\" />
<lastmod>2026-10-24T00:00:00.000Z</lastmod>
</url>
<url>
<loc>http://localhost:3200/en/guides/doctors-and-emergencies</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/guides/doctors-and-emergencies\" />
<xhtml:link rel=\"alternate\" hreflang=\"de\" href=\"http://localhost:3200/de/guides/doctors-and-emergencies\" />
<xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"http://localhost:3200/en/guides/doctors-and-emergencies\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/guides/doctors-and-emergencies\" />
<lastmod>2026-10-24T00:00:00.000Z</lastmod>
</url>
<url>
<loc>http://localhost:3200/tr/guides/blue-card</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/guides/blue-card\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/guides/blue-card\" />
<lastmod>2026-10-24T00:00:00.000Z</lastmod>
</url>
<url>
<loc>http://localhost:3200/tr/guides/tax-id-and-tax-classes</loc>
<xhtml:link rel=\"alternate\" hreflang=\"tr\" href=\"http://localhost:3200/tr/guides/tax-id-and-tax-classes\" />
<xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"http://localhost:3200/tr/guides/tax-id-and-tax-classes\" />
<lastmod>2026-10-24T00:00:00.000Z</lastmod>
</url>
</urlset>
"
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | 
  3  | test.describe("seo", () => {
  4  |   test("robots.txt hides admin and search and points to the sitemap", async ({ request }) => {
  5  |     const body = await (await request.get("/robots.txt")).text();
  6  |     expect(body).toContain("Disallow: /admin");
  7  |     expect(body).toContain("Disallow: /*/search");
  8  |     expect(body).toContain("Sitemap:");
  9  |   });
  10 | 
  11 |   test("sitemap contains only published content with hreflang", async ({ request }) => {
  12 |     const xml = await (await request.get("/sitemap.xml")).text();
  13 |     expect(xml).toContain("/tr/guides/anmeldung");
  14 |     expect(xml).toContain('hreflang="x-default"');
> 15 |     expect(xml).not.toContain("/guides/blue-card");
     |                     ^ Error: expect(received).not.toContain(expected) // indexOf
  16 |     expect(xml).not.toContain("/admin");
  17 |   });
  18 | 
  19 |   test("pages declare canonical, hreflang and share image", async ({ page }) => {
  20 |     await page.goto("/de/guides/anmeldung");
  21 |     await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/de\/guides\/anmeldung$/);
  22 |     expect(await page.locator('link[rel="alternate"][hreflang]').count()).toBeGreaterThanOrEqual(4);
  23 |     await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /opengraph-image/);
  24 |     const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
  25 |     expect(ld.join("")).toContain("Article");
  26 |   });
  27 | 
  28 |   test("search results are not indexed", async ({ page }) => {
  29 |     await page.goto("/tr/search?q=anmeld");
  30 |     await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  31 |   });
  32 | 
  33 |   test("generated share image is a PNG", async ({ request }) => {
  34 |     const res = await request.get("/tr/guides/anmeldung/opengraph-image");
  35 |     expect(res.status()).toBe(200);
  36 |     expect(res.headers()["content-type"]).toContain("image/png");
  37 |   });
  38 | });
  39 | 
  40 | test.describe("security headers", () => {
  41 |   test("responses carry CSP with a nonce and the basic hardening headers", async ({ request }) => {
  42 |     const res = await request.get("/tr");
  43 |     const h = res.headers();
  44 |     expect(h["content-security-policy"]).toMatch(/script-src 'self' 'nonce-[^']+' 'strict-dynamic'/);
  45 |     expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
  46 |     expect(h["x-content-type-options"]).toBe("nosniff");
  47 |     expect(h["x-frame-options"]).toBe("DENY");
  48 |     expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  49 |   });
  50 | 
  51 |   test("a page loads without Content Security Policy violations", async ({ page }) => {
  52 |     const violations: string[] = [];
  53 |     page.on("console", (m) => {
  54 |       if (/Content Security Policy|Refused to/i.test(m.text())) violations.push(m.text());
  55 |     });
  56 |     for (const path of ["/tr", "/tr/guides/anmeldung", "/tr/roadmap", "/admin/login"]) {
  57 |       await page.goto(path);
  58 |       await page.waitForLoadState("networkidle");
  59 |     }
  60 |     expect(violations).toEqual([]);
  61 |   });
  62 | });
  63 | 
```