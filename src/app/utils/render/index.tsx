import { createElement } from "react";

export type ComponentType = (props: any) => JSX.Element | null;
export type HTMLElementType = keyof HTMLElementTagNameMap;
export type JSXJsonChildren = JSXJson | JSXJson[] | string;
export interface JSXJson {
  type: ComponentType | HTMLElementType;
  props?: Record<string, any>;
  children?: JSXJsonChildren;
}

export function json2react(
  input: JSXJsonChildren | undefined,
  key?: number | string
): JSX.Element {
  let result: JSX.Element = <></>;
  if (input) {
    // check input type
    if (typeof input === "string") {
      // string type, return string
      result = <>{input}</>;
    } else if (Array.isArray(input)) {
      // JSXJson array
      result = <>{input.map((data, index) => json2react(data, index))}</>;
    } else {
      // JSXJson
      const { type, props = {}, children } = input;
      // check input.type
      if (typeof type === "string") {
        // HTMLElementType
        result = createElement(type, { key, ...props }, json2react(children));
      } else {
        // ComponentType
        const Component: any = type;
        result = (
          <Component key={key} {...props}>
            {json2react(children)}
          </Component>
        );
      }
    }
  }
  return result;
}
