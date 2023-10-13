import type { FC } from "react";

// const SITE_URL = "https://hayakawasho.dev";
const SITE_URL = "https://hykwsho.dev";

const siteTitle = "Sho Hayakawa";
const description = "Fronted Engineer Sho Hayakawa 早川翔 portfolio site";

export const Seo: FC<{
  title: string;
  permalink: string;
  prepend?: React.ReactNode;
}> = (props) => {
  const title = props.title ? props.title + " - " + siteTitle : siteTitle;

  return (
    <>
      {props.prepend}
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <meta content="telephone=no" name="format-detection" />
      <title>{title}</title>
      <meta content={description} name="description" />
      <meta content={title} property="og:title" />
      <meta
        content={props.permalink ? "article" : "website"}
        property="og:type"
      />
      <meta content={description} property="og:description" />
      <meta content={SITE_URL + props.permalink} property="og:url" />
      <meta content={siteTitle} property="og:site_name" />
      <meta content={SITE_URL + "/ogp.jpg"} property="og:image" />
    </>
  );
};
