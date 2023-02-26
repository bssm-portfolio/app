import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import PortfolioComponent from "./Portfolio";
import { Portfolio } from "@/types/portfolio.interface";
import { MemberType } from "@/types/member.interface";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Common/Portfolio",
  component: PortfolioComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof PortfolioComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
function Template(args: any): ComponentStory<typeof PortfolioComponent> {
  console.log("args : ", args);
  return (<PortfolioComponent {...args} />) as any;
}

export const Primary = Template.bind({}) as any;
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  portfolio: {
    portfolioId: 76,
    writer: {
      memberId: 6,
      name: "홍지민",
      profileImageUrl:
        "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg",
      email: "jmhong101506@gmail.com",
    },
    title: "12311111",
    thumbnail: {
      fileName: "정규식이형.jpg",
      filePath: "/2023/2/25",
      fileUid: "604378cd-0c75-4bd2-a4c9-a656d067f3eb.jpg",
      fileSize: 88848,
    },
    skillList: [],
    contributorList: [],
    bookmarks: 1,
    bookmarkYn: false,
    views: 0,
    comments: 0,
    createdDate: new Date("2023-02-25T15:51:03"),
  },
  onClick: () => 0,
} as any;
