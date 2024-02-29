import PageComponent from "./PageComponent";
import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import { randomVideos } from "~/lib/video";

export default async function Videos({params: {locale = ''}}) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  const tIndex = await getTranslations('IndexPage');
  const indexLanguageText = {
    title: tIndex('title'),
    description: tIndex('description'),
    loadingText: tIndex('loadingText'),
    generateText: tIndex('generateText'),
    buttonText: tIndex('buttonText'),
    placeholderText: tIndex('placeholderText'),
    h1Text: tIndex('h1Text'),
    pDescription: tIndex('pDescription'),
    soraVideoExample: tIndex('soraVideoExample'),
    prompt: tIndex('prompt'),
    moreExample: tIndex('moreExample'),
  };

  const tVideosPage = await getTranslations('videosPage');
  const videosLanguageText = {
    title: tVideosPage('title'),
    description: tVideosPage('description'),
  }

  const initVideoList = await randomVideos(48);

  return (
    <PageComponent
      locale={locale}
      videosLanguageText={videosLanguageText}
      initVideoList={initVideoList}
      indexLanguageText={indexLanguageText}
    />
  )
}
