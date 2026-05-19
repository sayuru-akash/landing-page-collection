import Image from "next/image";
import Link from "next/link";

import { BufferAnimatedTile } from "@/components/buffer-animated-tile";
import { BufferAudienceTabs } from "@/components/buffer-audience-tabs";
import { BufferFooter } from "@/components/buffer-footer";
import { BufferHeader } from "@/components/buffer-header";
import { BufferHeroForm } from "@/components/buffer-hero-form";
import { ArrowRightIcon, ChannelIcon } from "@/components/buffer-icons";
import { BufferSocialProof } from "@/components/buffer-social-proof";
import {
  channels,
  coreFeatures,
  heroChannelTiles,
  heroEmojiTiles,
  moreFeatures,
  openCompanyMetrics,
  primaryCtaHref,
  resources,
} from "@/lib/buffer-data";

export default function Home() {
  return (
    <div className="home">
      <BufferHeader />

      <main>
        <h1 className="visually-hidden">Buffer</h1>

        <div className="HeroSection_hero__hFiuQ">
          <div aria-hidden="true">
            <div className="HeroSection_decorationGridContainer__0T4sD">
              <div className="HeroSection_decorationGrid___fIfz HeroSection_decorationGridLeading__UCbTP HeroSection_decorationGridEmojiTilesLeading__NybSt">
                {heroEmojiTiles.slice(0, 4).map((tile) => (
                  <BufferAnimatedTile
                    className={`HeroSection_tileContainer__exjNK ${tile.className}`}
                    key={tile.className}
                  >
                    <div
                      className="EmojiTile_tile__h7GqT HeroSection_emojiTile__ezjyh"
                      data-theme={tile.theme}
                      data-size="medium"
                    >
                      <span>{tile.emoji}</span>
                    </div>
                  </BufferAnimatedTile>
                ))}
              </div>

              <div className="HeroSection_decorationGrid___fIfz HeroSection_decorationGridEmojiTilesTrailing__A9Z8Y">
                {heroEmojiTiles.slice(4).map((tile) => (
                  <BufferAnimatedTile
                    className={`HeroSection_tileContainer__exjNK ${tile.className}`}
                    key={tile.className}
                  >
                    <div
                      className="EmojiTile_tile__h7GqT HeroSection_emojiTile__ezjyh"
                      data-theme={tile.theme}
                      data-size="medium"
                    >
                      <span>{tile.emoji}</span>
                    </div>
                  </BufferAnimatedTile>
                ))}
              </div>
            </div>

            <div className="HeroSection_decorationGridContainer__0T4sD">
              <div className="HeroSection_decorationGrid___fIfz HeroSection_decorationGridLeading__UCbTP">
                {heroChannelTiles.slice(0, 5).map((tile) => (
                  <BufferAnimatedTile
                    className={`HeroSection_tileContainer__exjNK ${tile.className}`}
                    key={tile.className}
                  >
                    <div className="HeroSection_channelTile__Tn_Op">
                      <ChannelIcon
                        channel={tile.slug}
                        className="HeroSection_channelTileLogo__0ux72"
                      />
                    </div>
                  </BufferAnimatedTile>
                ))}
              </div>

              <div className="HeroSection_decorationGrid___fIfz">
                {heroChannelTiles.slice(5).map((tile) => (
                  <BufferAnimatedTile
                    className={`HeroSection_tileContainer__exjNK ${tile.className}`}
                    key={tile.className}
                  >
                    <div className="HeroSection_channelTile__Tn_Op">
                      <ChannelIcon
                        channel={tile.slug}
                        className="HeroSection_channelTileLogo__0ux72"
                      />
                    </div>
                  </BufferAnimatedTile>
                ))}
              </div>
            </div>
          </div>

          <div className="max-inline-size-container HeroSection_contentContainer__UUvjw">
            <h2 className="HeroSection_heading__XfI9p">Your social media workspace</h2>
            <p className="HeroSection_text__TIwKO">Share consistently without the chaos</p>
            <div>
              <BufferHeroForm />
            </div>
          </div>
        </div>

        <BufferSocialProof />

        <section className="CoreFeaturesSection_section__ZeQHT" aria-labelledby="core-features-heading">
          <h2 className="visually-hidden" id="core-features-heading">
            Core features
          </h2>
          <div className="max-inline-size-container">
            <div className="CoreFeaturesSection_coreFeatures__SFGTy">
              {coreFeatures.map((feature) => (
                <div className="CoreFeatureCard_card___tTje" data-theme={feature.theme} key={feature.heading}>
                  <h3 className="text-eyebrow CoreFeatureCard_eyebrow__Ew_v3">{feature.eyebrow}</h3>
                  <div className="CoreFeatureCard_contentLeading__cPGW7">
                    <div className="CoreFeatureCard_contentLeadingContainer__5fg3O">
                      <p className="text-heading CoreFeatureCard_heading__VZnaW">{feature.heading}</p>
                      <div className="CoreFeatureCard_imageContainer__moIVo">
                        <Image
                          alt={feature.alt}
                          src={feature.image}
                          width={612}
                          height={342}
                          sizes="(max-width: 1024px) 100vw, 612px"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="CoreFeatureCard_contentTrailing__peaA2">
                    <p>{feature.text}</p>
                    <Link className="LinkButtonTertiary_link__ri3L7" href={feature.href}>
                      <span className="LinkButtonTertiary_linkContent__Szmgw">
                        <span>
                          Learn more
                          <span className="visually-hidden"> about {feature.eyebrow}</span>
                        </span>
                        <ArrowRightIcon className="LinkButtonTertiary_icon__gxeYa" />
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="MoreFeaturesSection_section__SYuQg" aria-labelledby="more-features-heading">
          <div className="max-inline-size-container MoreFeaturesSection_container__nCtj8">
            <h2 className="MoreFeaturesSection_heading__4JA52" id="more-features-heading">
              <span aria-hidden="true">…</span>and so much more!
            </h2>
            <div className="MoreFeaturesSection_features__G8v0z">
              {moreFeatures.map((feature) => (
                <div className="MoreFeaturesSection_featureCard__eQXl7" data-theme={feature.theme} key={feature.title}>
                  <div className="MoreFeaturesSection_featureCardContentLeading__ixU_m">
                    <div className="MoreFeaturesSection_featureCardImageContainer__P_ytz">
                      <Image
                        alt={feature.alt}
                        src={feature.image}
                        width={640}
                        height={512}
                        sizes="(max-width: 1024px) 100vw, 320px"
                      />
                    </div>
                  </div>
                  <div className="MoreFeaturesSection_featureCardContentTrailing__741hV">
                    <div>
                      <h3 className="MoreFeaturesSection_featureCardHeading__sC6j8">{feature.title}</h3>
                      <p>{feature.text}</p>
                    </div>
                    <Link className="LinkButtonTertiary_link__ri3L7" href={feature.href}>
                      <span className="LinkButtonTertiary_linkContent__Szmgw">
                        <span>
                          Learn more
                          <span className="visually-hidden"> about {feature.title}</span>
                        </span>
                        <ArrowRightIcon className="LinkButtonTertiary_icon__gxeYa" />
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ChannelsSection_section__3tkqV" aria-labelledby="channels-heading">
          <div className="max-inline-size-container">
            <div className="ChannelsSection_content__Divrs">
              <h2 className="ChannelsSection_heading__Qv9I6" id="channels-heading">
                Connect your favorite accounts
              </h2>
              <ul className="ChannelsSection_links__RAqeW">
                {channels.map((channel) => (
                  <li key={channel.slug} data-channel-theme={channel.slug}>
                    <Link className="ChannelsSection_link__OTgsR" href={channel.href}>
                      <span className="ChannelsSection_linkLogoContainer__eh6o4">
                        <span className="ChannelsSection_linkLogoContent__LO410">
                          <ChannelIcon channel={channel.slug} className="ChannelsSection_linkLogo__toCwB" />
                        </span>
                      </span>
                      <span className="visually-hidden">Buffer × {channel.label}</span>
                      <span className="ChannelsSection_linkContent__pW5T1" aria-hidden="true">
                        <span className="ChannelsSection_linkText__wpY5h">Buffer × {channel.label}</span>
                        <ArrowRightIcon className="ChannelsSection_linkIcon__ebgBu" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <BufferAudienceTabs />

        <section aria-labelledby="support-heading">
          <div className="max-inline-size-container-wide CustomerSupportSection_container__6tull">
            <div className="CustomerSupportSection_contentLeading__RyK4e">
              <h2 className="text-eyebrow CustomerSupportSection_eyebrow__L23tI" id="support-heading">
                Customer Support
              </h2>
              <p className="text-heading CustomerSupportSection_heading__r8_oa">Human support, worldwide</p>
              <p className="CustomerSupportSection_text__7ovuQ">
                Our global Customer Advocacy team is spread across time zones to make sure help is always nearby.
                Whether you have a quick question, need technical support, or just want to connect, we’re here for you
                — no bots, just real people who care.
              </p>
              <div className="CustomerSupportSection_ctas__6uMcs">
                <Link className="LinkButtonGhost_link__pzdZR" href="https://support.buffer.com/" data-size="default">
                  <span className="LinkButtonGhost_linkContent__QVeoO">
                    <span>Visit the Help Center</span>
                    <ArrowRightIcon className="LinkButtonGhost_icon__WUcQu" />
                  </span>
                </Link>
                <Link className="LinkButtonGhost_link__pzdZR" href="https://discord.gg/aQdKKr6kDY" data-size="default">
                  <span className="LinkButtonGhost_linkContent__QVeoO">
                    <span>Join Discord</span>
                    <ArrowRightIcon className="LinkButtonGhost_icon__WUcQu" />
                  </span>
                </Link>
              </div>
              <p className="CustomerSupportSection_text__7ovuQ">
                We prioritize customer connection as a company and you could end up speaking with a teammate in any role
                at Buffer, from Marketers to Engineers.
              </p>
              <Link className="CustomerSupportSection_learnMoreLink__lqE5b" href="/about">
                Learn more about our global team
              </Link>
            </div>

            <div className="CustomerSupportSection_contentTrailing__RP5Xw">
              <div className="CustomerSupportSection_imageContainer__xyoOe">
                <Image
                  className="CustomerSupportSection_image__IfZDE"
                  alt=""
                  src="/images/homepage/customer-support-team.webp"
                  width={750}
                  height={499}
                  sizes="(max-width: 1024px) 100vw, 750px"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="ResourcesSection_section__ktjrI" aria-labelledby="resources-heading">
          <div className="max-inline-size-container-wide">
            <div className="ResourcesSection_intro__sudFO">
              <div>
                <h2 className="text-eyebrow ResourcesSection_eyebrow__2RcAA" id="resources-heading">
                  Resources
                </h2>
                <p className="text-heading ResourcesSection_heading__7qXmw">Fuel your social media success</p>
              </div>
              <p className="ResourcesSection_text__XpW58">
                Everything you need to level up your social strategy—in one place.
              </p>
            </div>

            <div className="ResourcesSection_scrollContainer__QfQwg">
              <div className="ResourcesSection_scrollContent__GokBw">
                {resources.map((resource) => (
                  <div
                    className={`ResourcesSection_resourceContainer__FVTo0${
                      resource.horizontal ? " ResourcesSection_resourceHorizontal__6zrax" : ""
                    }`}
                    key={resource.title}
                  >
                    <div className="ResourcesSection_resource__f2ObX" data-theme={resource.theme}>
                      <div className="ResourcesSection_resourceContentLeading__pPrfz">
                        <h3 className="ResourcesSection_resourceHeading__KcTWs">
                          <Link className="ResourcesSection_resourceHeadingLink__ckWwT" href={resource.href}>
                            <span>{resource.title}</span>
                            <span className="ResourcesSection_resourceHeadingIconContainer__pwLvD">
                              <ArrowRightIcon className="ResourcesSection_resourceHeadingIcon__pPCRQ" />
                            </span>
                          </Link>
                        </h3>
                        <p className="ResourcesSection_resourceText__ADC7j">{resource.text}</p>
                      </div>
                      <div className="ResourcesSection_resourceContentTrailing__ophEy">
                        <div className="ResourcesSection_resourceImageSmall__ncTU5">
                          <Image alt="" src={resource.smallImage} width={320} height={224} sizes="320px" />
                        </div>
                        <div className="ResourcesSection_resourceImageLarge__ULXoS">
                          <Image alt="" src={resource.largeImage} width={384} height={265} sizes="384px" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="about-heading">
          <div className="max-inline-size-container-wide">
            <div className="OpenCompanySection_content__B3oGm">
              <div className="OpenCompanySection_contentLeading___a1MS">
                <div>
                  <h2 className="text-eyebrow OpenCompanySection_eyebrow__eU9aN" id="about-heading">
                    About us
                  </h2>
                  <p className="text-heading OpenCompanySection_heading__z9qiT">We are an open company</p>
                  <p className="OpenCompanySection_text__rlo_F">
                    Since 2013, we’ve shared Buffer’s finances, team salaries, and other key metrics openly. Our
                    commitment to transparency is rooted in our belief that it fosters trust, keeps us accountable, and
                    helps drive positive change within our industry.
                  </p>
                </div>
                <Link
                  className="LinkButtonGhost_link__pzdZR OpenCompanySection_contentLeadingCTA__mUNFb"
                  href="/open"
                  data-size="default"
                >
                  <span className="LinkButtonGhost_linkContent__QVeoO">
                    <span>Open dashboard</span>
                    <ArrowRightIcon className="OpenCompanySection_contentLeadingCTAIcon__YEOYX" />
                  </span>
                </Link>
              </div>

              <dl className="OpenCompanySection_metrics__vYGbD">
                {openCompanyMetrics.map((metric) => (
                  <div className="OpenCompanySection_metric__XDOpQ" key={metric.label}>
                    <dt className="OpenCompanySection_metricLabel__kaA6r">
                      <span className="text-heading">{metric.label}</span>
                      <span className="OpenCompanySection_metricSubtitle__8dOpI">{metric.subtitle}</span>
                    </dt>
                    <dd className="text-heading OpenCompanySection_metricValue__UXK_O">{metric.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="OpenCompanySection_contentTrailingCTAContainer__cx2pd">
                <Link className="LinkButtonGhost_link__pzdZR" href="/open" data-size="default">
                  <span className="LinkButtonGhost_linkContent__QVeoO">
                    <span>Open dashboard</span>
                    <ArrowRightIcon className="OpenCompanySection_contentLeadingCTAIcon__YEOYX" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="CTASection_section__FwFAm" data-theme="light" aria-labelledby="cta-heading">
          <div className="max-inline-size-container-wide">
            <div className="CTASection_contentContainer__pOouk">
              <div className="CTASection_content__GWvKY">
                <h2 className="CTASection_heading__uKUws" id="cta-heading">
                  Grow your social presence with confidence
                </h2>
                <Link
                  className="LinkButtonPrimary_link__8Gi9S"
                  href={primaryCtaHref}
                  data-size="large"
                  data-icon="true"
                  data-icon-orientation="right"
                >
                  <span className="LinkButtonPrimary_linkContent___QcFE">
                    <span>Get started for free</span>
                    <ArrowRightIcon className="LinkButtonPrimary_icon__VlMV8" />
                  </span>
                </Link>
                <p>No credit card needed. Free forever.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <BufferFooter />
    </div>
  );
}
