"use client";

import Link from "next/link";
import { startTransition, useState } from "react";

import { channels, navMenus, primaryCtaHref } from "@/lib/buffer-data";
import {
  BufferLogo,
  ChannelIcon,
  ChevronDownIcon,
  CloseIcon,
  MenuIcon,
} from "@/components/buffer-icons";

type MenuKey = "features" | "channels" | "madeFor" | "resources" | null;

export function BufferHeader() {
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMenu = (key: Exclude<MenuKey, null>) => {
    startTransition(() => {
      setOpenMenu((current) => (current === key ? null : key));
    });
  };

  const closeAll = () => {
    startTransition(() => {
      setOpenMenu(null);
      setMobileOpen(false);
    });
  };

  return (
    <header className="Nav_header__CIQ1w" data-theme="light">
      <nav className="max-inline-size-container-wide Nav_nav__W3s5_" aria-label="Top navigation">
        <div className="Nav_content__6PY3c">
          <div className="Nav_contentLeading__sZSG9">
            <Link className="Nav_logoLink__xSVf_" href="/" aria-label="Buffer">
              <BufferLogo className="BufferLogo_logo__ZlBPi Nav_logo__zClE7" />
            </Link>
          </div>

          <div className="Nav_contentMiddle__NEWMQ">
            <DesktopMenu
              label="Features"
              isOpen={openMenu === "features"}
              onToggle={() => toggleMenu("features")}
            >
              <ul className="Nav_menuItem__t80LV">
                {navMenus.features.map((item) => (
                  <li key={item.title}>
                    <Link className="Nav_menuItemLink__vkTf0" href={item.href} onClick={closeAll}>
                      <span className="Nav_menuItemText__B1O7e">
                        <span className="Nav_menuItemTextLeading__bdmiY">
                          <span className="text-heading Nav_menuItemTitle__gsQC9">
                            {item.title}
                          </span>
                        </span>
                        <span className="Nav_menuItemDescription___2r1C">
                          {item.description}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </DesktopMenu>

            <DesktopMenu
              label="Channels"
              isOpen={openMenu === "channels"}
              onToggle={() => toggleMenu("channels")}
            >
              <ul className="Nav_channels__uyURn">
                {channels.map((channel) => (
                  <li key={channel.slug}>
                    <Link className="Nav_channelLink__nv757" href={channel.href} onClick={closeAll}>
                      <span
                        className="Nav_channelLinkLogoContainer__WMUBt"
                        data-channel-theme={channel.slug}
                      >
                        <ChannelIcon
                          channel={channel.slug}
                          className="Nav_channelLinkLogo__33P5Z"
                        />
                      </span>
                      <span className="Nav_channelLinkText__X3PBu">
                        <span>{channel.label}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </DesktopMenu>

            <DesktopMenu
              label="Made for"
              isOpen={openMenu === "madeFor"}
              onToggle={() => toggleMenu("madeFor")}
            >
              <ul className="Nav_menuItem__t80LV">
                {navMenus.madeFor.map((item) => (
                  <li key={item.title}>
                    <Link className="Nav_menuItemLink__vkTf0" href={item.href} onClick={closeAll}>
                      <span className="Nav_menuItemText__B1O7e">
                        <span className="Nav_menuItemTextLeading__bdmiY">
                          <span className="text-heading Nav_menuItemTitle__gsQC9">
                            {item.title}
                          </span>
                        </span>
                        <span className="Nav_menuItemDescription___2r1C">
                          {item.description}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </DesktopMenu>

            <DesktopMenu
              label="Resources"
              isOpen={openMenu === "resources"}
              onToggle={() => toggleMenu("resources")}
            >
              <ul className="Nav_menuItem__t80LV">
                {navMenus.resources.map((item) => (
                  <li key={item.title}>
                    <Link className="Nav_menuItemLink__vkTf0" href={item.href} onClick={closeAll}>
                      <span className="Nav_menuItemText__B1O7e">
                        <span className="Nav_menuItemTextLeading__bdmiY">
                          <span className="text-heading Nav_menuItemTitle__gsQC9">
                            {item.title}
                          </span>
                        </span>
                        <span className="Nav_menuItemDescription___2r1C">
                          {item.description}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </DesktopMenu>

            <Link className="Nav_navLink___7VKG" href="/pricing">
              Pricing
            </Link>
          </div>

          <div className="Nav_contentTrailing__bPmdC">
            <Link className="Nav_navLink___7VKG Nav_loginLink__WsxT8" href="https://login.buffer.com/login">
              Log in
            </Link>
            <Link
              className="LinkButtonBrand_link__PpJkx Nav_signupLink__h_e36"
              href={primaryCtaHref}
              data-size="default"
              data-icon-orientation="right"
            >
              <span className="LinkButtonBrand_linkContent__WZVou">Get started for free</span>
            </Link>
            <button
              type="button"
              className="NavigationMenu_trigger__tEQeR Nav_menuTrigger__l9gmL"
              aria-expanded={mobileOpen}
              aria-label="Navigation menu"
              onClick={() => setMobileOpen((value) => !value)}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div className="Nav_menuContentPanel__R3KkS">
            <div className="Nav_menuContentLeading__8I7_1">
              <Link className="Nav_logoLink__xSVf_" href="/" aria-label="Buffer" onClick={closeAll}>
                <BufferLogo className="BufferLogo_logo__ZlBPi Nav_logo__zClE7" />
              </Link>
              <button
                type="button"
                className="NavigationMenu_trigger__tEQeR Nav_menuClose__YW9vB"
                aria-label="Close navigation menu"
                onClick={closeAll}
              >
                <CloseIcon />
              </button>
            </div>
            <div className="Nav_menuContent__ujZ8C">
              <MobileGroup title="Features" items={navMenus.features} onNavigate={closeAll} />
              <MobileGroup
                title="Channels"
                items={channels.map((item) => ({
                  title: item.label,
                  href: item.href,
                }))}
                onNavigate={closeAll}
              />
              <MobileGroup title="Made for" items={navMenus.madeFor} onNavigate={closeAll} />
              <MobileGroup title="Resources" items={navMenus.resources} onNavigate={closeAll} />
              <div className="Nav_menuCTAs__2b6Zj">
                <Link className="Nav_navLink___7VKG Nav_menuNavLink__aJ5jU" href="/pricing" onClick={closeAll}>
                  Pricing
                </Link>
                <Link
                  className="Nav_navLink___7VKG Nav_menuNavLink__aJ5jU"
                  href="https://login.buffer.com/login"
                  onClick={closeAll}
                >
                  Log in
                </Link>
                <Link
                  className="LinkButtonBrand_link__PpJkx"
                  href={primaryCtaHref}
                  data-size="large"
                  onClick={closeAll}
                >
                  <span className="LinkButtonBrand_linkContent__WZVou">Get started for free</span>
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}

function DesktopMenu({
  label,
  isOpen,
  onToggle,
  children,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="NavigationMenu_menu__05DPv" data-position="start" data-size="default" data-theme="light">
      <button
        className="NavigationMenu_trigger__tEQeR"
        type="button"
        aria-expanded={isOpen}
        data-state={isOpen ? "open" : "closed"}
        onClick={onToggle}
      >
        <span>{label}</span>
        <span className="NavigationMenu_triggerIconContainer__PZTla">
          <ChevronDownIcon className="NavigationMenu_triggerIcon__5Gtv5 NavigationMenu_triggerIconDown__IWizP" />
        </span>
      </button>
      {isOpen ? (
        <div className="NavigationMenu_content__lo8BS" role="dialog" data-state="open">
          {children}
        </div>
      ) : null}
    </div>
  );
}

function MobileGroup({
  title,
  items,
  onNavigate,
}: {
  title: string;
  items: Array<{ title: string; href: string }>;
  onNavigate: () => void;
}) {
  return (
    <div>
      <h3 className="Footer_footerLinkGroupHeading__pIYUm">{title}</h3>
      <ul className="Nav_menuContentList__FaB0t">
        {items.map((item) => (
          <li className="Nav_menuContentListItem__GRXp0" key={item.title}>
            <Link className="Nav_navLink___7VKG Nav_menuNavLink__aJ5jU" href={item.href} onClick={onNavigate}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
