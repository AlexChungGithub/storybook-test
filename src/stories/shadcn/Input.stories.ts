import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "../../components/ui/input";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Shadcn/Input",
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    className: "text-black",
    type: "text",
    placeholder: "Text",
  },
};
export const Email: Story = {
  args: {
    className: "text-black",
    placeholder: "Email",
    type: "email",
  },
};
export const File: Story = {
  args: {
    className: "text-black",
    type: "file",
  },
};
export const Password: Story = {
  args: {
    className: "text-black",
    placeholder: "Password",
    type: "password",
  },
};
