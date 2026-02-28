import Link from "next/link";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-xl md:text-2xl uppercase tracking-tight text-brand-white mt-12 mb-4">
      {children}
    </h2>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-display text-body uppercase tracking-wider text-brand-white mt-8 mb-3">
      {children}
    </h3>
  );
}

function Blockquote({ children, cite }: { children: React.ReactNode; cite?: string }) {
  return (
    <blockquote className="border-l-2 border-brand-gold pl-4 my-6 text-brand-silver italic">
      {children}
      {cite && (
        <footer className="mt-2 text-caption text-brand-silver-dark not-italic">
          &mdash; {cite}
        </footer>
      )}
    </blockquote>
  );
}

function FactRow({ claim, status, detail }: { claim: string; status: "verified" | "unverified" | "false"; detail: string }) {
  const statusLabel = {
    verified: "Verified",
    unverified: "Unverified",
    false: "False (as of now)",
  }[status];

  const statusColor = {
    verified: "text-green-400",
    unverified: "text-brand-gold",
    false: "text-red-400",
  }[status];

  return (
    <tr className="border-b border-brand-border">
      <td className="py-3 pr-4 text-body-sm text-brand-silver align-top">{claim}</td>
      <td className={`py-3 pr-4 text-body-sm font-display tracking-wider uppercase align-top whitespace-nowrap ${statusColor}`}>
        {statusLabel}
      </td>
      <td className="py-3 text-body-sm text-brand-silver-dark align-top">{detail}</td>
    </tr>
  );
}

export function PeptideRegulationContent() {
  return (
    <div className="text-body-sm text-brand-silver leading-relaxed max-w-none">
      <p className="text-body text-brand-silver-light mb-6">
        A social media firestorm erupted in late February 2026 after HHS Secretary Robert F. Kennedy Jr.
        appeared on <em>The Joe Rogan Experience</em> (#2461) and made pointed remarks about the FDA&apos;s
        regulation of peptide therapies. LinkedIn posts, Reddit threads, and wellness forums quickly
        claimed that &quot;14 peptides are being moved from Category 2 back to Category 1&quot; &mdash; implying
        they would soon be legally prescribable through compounding pharmacies again.
      </p>
      <p className="mb-6">
        The reality is more nuanced. Here is what Secretary Kennedy actually said, what the regulatory
        record shows, and what it means for providers and patients navigating the peptide landscape today.
      </p>

      <SectionHeading>What RFK Jr. Actually Said</SectionHeading>

      <p className="mb-4">
        On the February 27, 2026 episode of <em>The Joe Rogan Experience</em>, Joe Rogan asked directly:
        &quot;Where are we at right now on peptides and getting them regulated and making sure it&apos;s not
        this weird gray area?&quot;
      </p>

      <p className="mb-4">Secretary Kennedy responded with several specific claims:</p>

      <Blockquote cite="Robert F. Kennedy Jr., Joe Rogan Experience #2461 (Feb 27, 2026)">
        <p className="mb-3">
          &quot;There were 19 peptides that were widely formulated by compounding pharmacies. During the
          Biden administration, they illegally moved those to category two, which says do not formulate.
          It was illegal because they&apos;re not supposed to do that unless there&apos;s a safety signal. And
          they didn&apos;t have a safety signal.&quot;
        </p>
      </Blockquote>

      <Blockquote cite="Robert F. Kennedy Jr., Joe Rogan Experience #2461 (Feb 27, 2026)">
        <p className="mb-3">
          &quot;I&apos;m very anxious to move &mdash; probably not all of those peptides, some of them are in
          litigation &mdash; but about 14 of them back to making them more accessible. And FDA is in the
          middle of &mdash; I think within a couple of weeks we will have announced some kind of new action.&quot;
        </p>
      </Blockquote>

      <p className="mb-4">
        He also described the unintended consequence of the restrictions:
      </p>

      <Blockquote cite="Robert F. Kennedy Jr., Joe Rogan Experience #2461 (Feb 27, 2026)">
        <p className="mb-3">
          &quot;There was huge demand for peptides. And so a black market came out. And the black market is
          run by companies that say that they&apos;re making the peptides for animal use or for research
          purposes. [...] With the gray market, you have no idea. And a lot of this stuff that we&apos;ve
          looked at is very, very substandard.&quot;
        </p>
      </Blockquote>

      <p className="mb-4">
        Rogan agreed, noting: &quot;We created the black market. Which we do with everything.&quot;
      </p>

      <SectionHeading>Fact Check: What Is Verified vs. What Is Not</SectionHeading>

      <p className="mb-4">
        It is important to separate what Secretary Kennedy said from what has actually been enacted as
        regulatory policy. As of the date of this article, no official FDA or HHS press release has
        confirmed a reclassification of peptides.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-brand-border">
              <th className="text-left py-3 pr-4 font-display text-caption tracking-wider uppercase text-brand-white">Claim</th>
              <th className="text-left py-3 pr-4 font-display text-caption tracking-wider uppercase text-brand-white">Status</th>
              <th className="text-left py-3 font-display text-caption tracking-wider uppercase text-brand-white">Detail</th>
            </tr>
          </thead>
          <tbody>
            <FactRow
              claim="RFK Jr. said he wants peptides moved back"
              status="verified"
              detail="Direct quotes from the Joe Rogan transcript confirm this."
            />
            <FactRow
              claim="He suggested ~14 peptides may be reclassified"
              status="verified"
              detail='He said "about 14 of them" — some are in litigation and excluded.'
            />
            <FactRow
              claim="FDA action expected 'within a couple of weeks'"
              status="unverified"
              detail="This was an expression of intent, not an official timeline. No Federal Register notice has been published."
            />
            <FactRow
              claim="Category 2 move was 'illegal'"
              status="unverified"
              detail="A political characterization. No court has ruled the FDA's action illegal. The FDA has broad statutory authority under 503A."
            />
            <FactRow
              claim="14 peptides are now legal to prescribe again"
              status="false"
              detail="No official reclassification has occurred. Category 2 restrictions remain in effect."
            />
          </tbody>
        </table>
      </div>

      <SectionHeading>Regulatory Background: How Peptide Compounding Works</SectionHeading>

      <p className="mb-4">
        Under <strong className="text-brand-white">Section 503A</strong> of the Federal Food, Drug, and
        Cosmetic Act, the FDA maintains a Bulk Drug Substance list that determines whether a compound can
        be legally compounded for therapeutic use by licensed pharmacies.
      </p>

      <SubHeading>Category 1</SubHeading>
      <p className="mb-4">
        The substance meets safety criteria and <strong className="text-brand-white">can be legally
        compounded</strong> by 503A pharmacies with a valid prescription. Examples that remain in Category 1
        include NAD+ and Vasoactive Intestinal Peptide (VIP).
      </p>

      <SubHeading>Category 2</SubHeading>
      <p className="mb-4">
        The FDA has determined there is insufficient safety data or potential risk.
        These substances <strong className="text-brand-white">cannot be compounded for human use</strong>.
        Many popular peptides were placed here in late 2023 and 2024, including BPC-157, CJC-1295,
        Ipamorelin, AOD-9604, Thymosin Alpha-1, TB-500, and MOTS-c.
      </p>

      <SubHeading>Research-Only Compounds</SubHeading>
      <p className="mb-4">
        Peptides sold as &quot;for research purposes only&quot; remain legal to acquire but
        cannot be marketed or administered as therapies for human use.
      </p>

      <p className="mb-4">
        Secretary Kennedy&apos;s assertion that the Biden-era FDA moved peptides to Category 2 &quot;illegally&quot;
        reflects his interpretation that the agency lacked a safety signal to justify the restriction.
        Under the statute, the FDA evaluates safety, need, regulatory status, and public health
        concerns &mdash; it is not limited exclusively to safety signals. Whether the action exceeded the
        agency&apos;s authority is a matter of ongoing legal and political debate, not settled law.
      </p>

      <SectionHeading>The Black Market Problem</SectionHeading>

      <p className="mb-4">
        On this point, Secretary Kennedy&apos;s analysis aligns with what providers, patients, and
        industry observers have witnessed firsthand. When the FDA restricted compounding of popular
        peptides, demand did not disappear &mdash; it shifted to unregulated channels.
      </p>

      <ul className="list-disc pl-6 space-y-2 mb-6 text-brand-silver">
        <li>&quot;Research use only&quot; vendors proliferated online, marketing directly to consumers</li>
        <li>Overseas suppliers with no FDA oversight entered the market</li>
        <li>Quality control became unreliable &mdash; purity, potency, and sterility were no longer guaranteed</li>
        <li>Patients were left choosing between no access and unverified products</li>
      </ul>

      <p className="mb-4">
        As Kennedy put it: &quot;We created the black market.&quot; The compounding pharmacies that previously
        produced these peptides sourced their ingredients from FDA-inspected facilities. The gray market
        that replaced them offers no such assurances.
      </p>

      <SectionHeading>What This Means for Patients and Providers</SectionHeading>

      <p className="mb-4">
        We are currently in a <strong className="text-brand-white">regulatory transition window</strong>.
        The HHS Secretary has publicly signaled a desire to make peptides more accessible through
        legitimate compounding channels. But signals are not policy, and hope is not enacted law.
      </p>

      <p className="mb-4">Until an official action is published, the practical reality remains:</p>

      <ul className="list-disc pl-6 space-y-2 mb-6 text-brand-silver">
        <li>Category 2 peptides <strong className="text-brand-white">cannot</strong> legally be compounded for patient use</li>
        <li>Category 1 peptides (including NAD+) remain available through licensed compounding pharmacies</li>
        <li>FDA-approved peptide drugs remain available with a valid prescription</li>
        <li>Research-only peptides are legal to purchase but not to administer as therapy</li>
      </ul>

      <p className="mb-4">
        If the FDA does reclassify some or all of the 14 peptides Kennedy referenced, compounding
        pharmacies would once again be able to legally produce them. This could restore access through
        quality-controlled, pharmacy-grade channels &mdash; the outcome Kennedy explicitly advocated for.
      </p>

      <SectionHeading>AW Therapeutics&apos; Position</SectionHeading>

      <p className="mb-4">
        At AW Therapeutics, our approach is built on three principles:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        <div className="border border-brand-border p-5">
          <h4 className="font-display text-caption tracking-widest uppercase text-brand-gold mb-2">
            Compliance First
          </h4>
          <p className="text-body-sm text-brand-silver">
            We operate strictly within FDA and state regulatory guidelines.
            Every product in our catalog is sourced from licensed, inspected pharmacies.
          </p>
        </div>
        <div className="border border-brand-border p-5">
          <h4 className="font-display text-caption tracking-widest uppercase text-brand-gold mb-2">
            Physician-Guided
          </h4>
          <p className="text-body-sm text-brand-silver">
            Every order undergoes physician review before fulfillment.
            No exceptions, no shortcuts.
          </p>
        </div>
        <div className="border border-brand-border p-5">
          <h4 className="font-display text-caption tracking-widest uppercase text-brand-gold mb-2">
            Regulatory Awareness
          </h4>
          <p className="text-body-sm text-brand-silver">
            Our team actively monitors FDA and HHS announcements.
            When the landscape changes, we adapt &mdash; responsibly.
          </p>
        </div>
      </div>

      <p className="mb-4">
        We will not market or sell peptides that are not currently authorized for compounding.
        If and when FDA policy changes, we will update our catalog accordingly and communicate
        those changes transparently.
      </p>

      <SectionHeading>What to Watch For</SectionHeading>

      <p className="mb-4">
        Secretary Kennedy&apos;s remarks suggest that an announcement could come within weeks. The
        indicators that a real policy change has occurred would include:
      </p>

      <ul className="list-disc pl-6 space-y-2 mb-6 text-brand-silver">
        <li>A <strong className="text-brand-white">Federal Register notice</strong> updating the Bulk Drug Substance list</li>
        <li>An official <strong className="text-brand-white">FDA.gov or HHS.gov press release</strong></li>
        <li>Updated guidance from the <strong className="text-brand-white">FDA Center for Drug Evaluation and Research (CDER)</strong></li>
        <li>Communication from <strong className="text-brand-white">state pharmacy boards</strong> to compounding pharmacies</li>
      </ul>

      <p className="mb-4">
        Until one or more of these occurs, statements made in interviews &mdash; even by the HHS
        Secretary &mdash; should be understood as policy direction, not regulatory action.
      </p>

      <SectionHeading>Sources</SectionHeading>

      <ul className="list-none space-y-3 mb-6">
        <li>
          <a
            href="https://open.spotify.com/episode/2EMhiBlQv3ck1ohBjyFdf4"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-gold hover:text-brand-gold-light transition-colors underline underline-offset-2"
          >
            The Joe Rogan Experience #2461 &mdash; Robert F. Kennedy, Jr. (Spotify)
          </a>
        </li>
        <li>
          <a
            href="https://singjupost.com/joe-rogan-podcast-2461-with-robert-f-kennedy-jr-transcript/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-gold hover:text-brand-gold-light transition-colors underline underline-offset-2"
          >
            Full Episode Transcript (The Singju Post)
          </a>
        </li>
        <li className="text-brand-silver-dark">
          FDA Bulk Drug Substance List &mdash; Section 503A, Federal Food, Drug, and Cosmetic Act
        </li>
      </ul>

      <div className="border border-brand-border bg-brand-grey-900/30 p-6 mt-10">
        <p className="font-display text-caption tracking-widest uppercase text-brand-gold mb-2">
          Disclaimer
        </p>
        <p className="text-caption text-brand-silver-dark leading-relaxed">
          This article is for informational purposes only and does not constitute medical or legal advice.
          Regulatory information is current as of February 28, 2026. The peptide regulatory landscape is
          evolving; consult official FDA and HHS sources for the latest guidance. All therapeutic decisions
          should be made in consultation with a licensed healthcare provider.
        </p>
      </div>

      <div className="mt-10 pt-8 border-t border-brand-border">
        <p className="text-body-sm text-brand-silver mb-4">
          Interested in peptide therapies that are currently available through compliant channels?
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 font-display tracking-wider uppercase text-brand-gold hover:text-brand-gold-light transition-colors text-body-sm"
        >
          Browse Our Catalog &rarr;
        </Link>
      </div>
    </div>
  );
}
