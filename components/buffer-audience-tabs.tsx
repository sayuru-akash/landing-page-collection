"use client";

import Image from "next/image";
import { startTransition, useState } from "react";

import { ChannelIcon, CheckIcon } from "@/components/buffer-icons";
import { audienceContent, type AudienceKey } from "@/lib/buffer-data";

const labels: Array<{ key: AudienceKey; label: string }> = [
  { key: "creators", label: "Creators" },
  { key: "smallBusinesses", label: "Small businesses" },
  { key: "agencies", label: "Agencies" },
];

const channelLabels = {
  x: "X",
  linkedin: "LinkedIn",
  instagram: "Instagram",
} as const;

export function BufferAudienceTabs() {
  const [activeTab, setActiveTab] = useState<AudienceKey>("creators");
  const content = audienceContent[activeTab];

  return (
    <section aria-label="Audience">
      <div className="max-inline-size-container-wide">
        <div className="VerticalsSection_contentContainer__FoiyE">
          <div className="VerticalsSection_tabsList__ePSu_" role="tablist" aria-label="Audience">
            {labels.map((tab) => (
              <button
                key={tab.key}
                className="VerticalsSection_tabTrigger__TAWSY"
                type="button"
                id={`verticals-tab-${tab.key}`}
                role="tab"
                aria-selected={activeTab === tab.key}
                aria-controls={`verticals-panel-${tab.key}`}
                data-theme={audienceContent[tab.key].theme}
                onClick={() =>
                  startTransition(() => {
                    setActiveTab(tab.key);
                  })
                }
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div
            className="VerticalsSection_content__ehRdn"
            data-theme={content.theme}
            id={`verticals-panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`verticals-tab-${activeTab}`}
          >
            <div className="VerticalsSection_contentLeading__vb3R_">
              <h3 className="VerticalsSection_contentLeadingHeading__xKagh">{content.heading}</h3>
              <p className="VerticalsSection_contentText__cLh7B">{content.text}</p>
              <ul className="VerticalsSection_contentList__pD9CJ">
                {content.bullets.map((bullet) => (
                  <li className="VerticalsSection_contentListItem__oTEwR" key={bullet}>
                    <CheckIcon className="VerticalsSection_contentListItemIcon__K9Cam" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="VerticalsSection_community__tFNJ0">
              <h4 className="text-eyebrow VerticalsSection_communityEyebrow__583_E">
                {content.communityHeading}
              </h4>
              <div className="VerticalsSection_communityMembers__moTcS">
                {content.people.map((person) => (
                  <div className="VerticalsSection_communityMember__jfNSG" key={person.name}>
                    <span className="VerticalsSection_communityMemberLeading__wsDnj">
                      <span className="VerticalsSection_communityMemberImageContainer__g4TpI">
                        <Image alt="" src={person.image} width={76} height={76} sizes="76px" />
                      </span>
                      <span
                        className="VerticalsSection_communityMemberChannel__lLH4J"
                        data-channel-theme={person.channel}
                      >
                        <ChannelIcon
                          channel={person.channel}
                          className="VerticalsSection_communityMemberChannelLogo__KRScb"
                        />
                        <span className="visually-hidden">Channel {channelLabels[person.channel]}</span>
                      </span>
                    </span>
                    <h5 className="VerticalsSection_communityMemberName__S6eSE">{person.name}</h5>
                    <dl className="VerticalsSection_communityMemberDetails__b1xIl">
                      <div>
                        <dt className="visually-hidden">Username</dt>
                        <dd className="VerticalsSection_communityMemberUsername__TMlv_">{person.username}</dd>
                      </div>
                      <div>
                        <dt className="visually-hidden">Followers</dt>
                        <dd className="VerticalsSection_communityMemberFollowers__K3HoJ">{person.followers}</dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
