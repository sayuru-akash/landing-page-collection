import Link from "next/link";

import { BufferLogo, ChannelIcon, ChevronDownIcon } from "@/components/buffer-icons";
import { footerGroups, footerSocials } from "@/lib/buffer-data";

export function BufferFooter() {
  return (
    <footer className="Footer_footer__4vzqH">
      <h2 className="visually-hidden">Buffer</h2>
      <div className="Footer_footerLinks__xuRtG">
        <div className="Footer_footerLinkGroups__rQWbn">
          {footerGroups.slice(0, 4).map((group) => (
            <FooterGroup group={group} key={group.title} />
          ))}
        </div>
        <div className="Footer_footerLinkGroups__rQWbn">
          {footerGroups.slice(4).map((group) => (
            <FooterGroup group={group} key={group.title} />
          ))}
        </div>
      </div>

      <div className="Footer_divider__07lwa" />

      <div className="Footer_trailingContent__Ug_0q">
        <Link className="Footer_linkLogo__Nfx3G" href="/" aria-label="Buffer">
          <BufferLogo className="Footer_logo__C9vo8" />
        </Link>

        <div className="Footer_bottomLinks__AMVW0">
          <details className="Details_details___T7cb Footer_languageSelector__QHvrN">
            <summary className="Details_summary__qBPqX">
              <span className="Details_summaryContent__gLcSg">
                <span>English</span>
                <ChevronDownIcon className="Details_summaryIcon__wNmIp" />
              </span>
            </summary>
            <div className="Details_content__awA0g">
              <ul className="Footer_footerLinkList__1qETO">
                <li>
                  <Link className="Footer_footerLink__VU733" href="/">
                    English
                  </Link>
                </li>
                <li>
                  <Link className="Footer_footerLink__VU733" href="/es">
                    Espa&ntilde;ol
                  </Link>
                </li>
              </ul>
            </div>
          </details>

          <div className="Footer_socialLinks__22g9N">
            <h3 className="Footer_footerLinkGroupHeading__pIYUm">Social media</h3>
            <ul className="Footer_socialLinkList__YR3Qy">
              {footerSocials.map(([label, href, channel]) => (
                <li key={label}>
                  <Link className="Footer_socialLink__N7mmd" href={href} aria-label={label}>
                    <ChannelIcon channel={channel} className="Footer_socialLinkLogo__Bqkq_" viewBox="0 0 24 24" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="Footer_footerLinkGroupHeading__pIYUm">Policies</h3>
            <div className="Footer_policies__h_I0e">
              <p>Copyright &copy; 2026 Buffer</p>
              <span>|</span>
              <p>
                <Link href="/legal#privacy-policy">Privacy</Link>
              </p>
              <span>|</span>
              <p>
                <Link href="/legal#terms">Terms</Link>
              </p>
              <span>|</span>
              <p>
                <Link href="/legal#security">Security</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterGroup({
  group,
}: {
  group: (typeof footerGroups)[number];
}) {
  return (
    <div>
      <h3 className="Footer_footerLinkGroupHeading__pIYUm">{group.title}</h3>
      <ul className="Footer_footerLinkList__1qETO">
        {group.links.map(([label, href]) => (
          <li key={label}>
            <Link className="Footer_footerLink__VU733" href={href}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
