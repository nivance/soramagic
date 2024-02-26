import {getRequestConfig} from 'next-intl/server';
import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import {languages} from "~/config";

export default getRequestConfig(async ({locale}) => ({
  messages: (
    await (locale === 'en'
      ? // When using Turbopack, this will enable HMR for `default`
        import('../messages/en.json')
      : import(`../messages/${locale}.json`))
  ).default
}));

const localeDict = languages.map((language) => language.lang);

function initLocale(locale: string) {
  if (["zh-CN", "zh-TW", "zh-HK"].includes(locale)) {
    locale = "zh";
  }

  if (!Object.keys(localeDict).includes(locale)) {
    locale = "en";
  }

  unstable_setRequestLocale(locale);
  return locale;
}

export const getIndexPageText = async (locale: string) => {
  locale = initLocale(locale);

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
  return indexLanguageText;
};

export const getVideosPageText = async (locale: string) => {
  locale = initLocale(locale);

  const tVideosPage = await getTranslations('videosPage');
  const videosLanguageText = {
    title: tVideosPage('title'),
    description: tVideosPage('description'),
    relatedVideos: tVideosPage('relatedVideos'),
  }
  return videosLanguageText;
};
