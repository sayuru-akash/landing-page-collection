import Link from "next/link";

import { BufferLogo, ChannelIcon } from "@/components/buffer-icons";
import { footerGroups, footerSocials } from "@/lib/buffer-data";

export function BufferFooter() {
  return (
    <div style={{ backgroundColor: "var(--color-neutral-050)" }}>
      <footer className="Footer_footer__4vzqH">
        <h2 className="visually-hidden">Buffer</h2>
        <div className="Footer_footerLinks__xuRtG">
          <div className="Footer_footerLinkGroups__rQWbn">
            {footerGroups.slice(0, 4).map((group) => (
              <div key={group.title}>
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
            ))}
          </div>
          <div className="Footer_footerLinkGroups__rQWbn">
            {footerGroups.slice(4).map((group) => (
              <div key={group.title}>
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
            ))}
          </div>
        </div>

        <div className="Footer_trailingContent__Ug_0q">
          <Link className="Footer_linkLogo__Nfx3G" href="/" aria-label="Buffer">
            <BufferLogo className="Footer_logo__C9vo8" />
          </Link>

          <div className="Footer_bottomLinks__AMVW0">
            <div className="Footer_socialLinks__22g9N">
              <h3 className="visually-hidden">Social media</h3>
              <ul className="Footer_socialLinkList__YR3Qy">
                {footerSocials.map(([label, href, channel]) => (
                  <li key={label}>
                    <Link className="Footer_socialLink__N7mmd" href={href} aria-label={label}>
                      <ChannelIcon
                        channel={channel}
                        className="Footer_socialLinkLogo__Bqkq_"
                        viewBox="0 0 24 24"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="Footer_policies__h_I0e">
              <p>Copyright © Buffer | All Rights Reserved</p>
              <p>
                <Link href="/privacy">Privacy</Link>
              </p>
              <p>
                <Link href="/terms">Terms</Link>
              </p>
              <p>
                <Link href="/security">Security</Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
